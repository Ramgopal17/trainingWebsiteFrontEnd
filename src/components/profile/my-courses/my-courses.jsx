import findHeaderHeight from "@/hooks/find-header-height";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import { showSidebar } from "@/utils/toggle-sidebar";
import { useAuthContext } from "@/context/Auth-context";
import { getAllUserCourses } from "@/api/get-all-user-course";
import { colorGroup } from "@/utils/color-code";
import CourseCard from "../../course-card/course-card";
import CourseInfoCard from "./course-info-card";
import Pagination from "@/src/common/pagination";
import Loader from "@/src/common/loader";
import { getAllUserCoursesByCategory } from "@/api/get-all-user-courses-by-category";
import { getAllUserCoursesWithProcess } from "@/api/get-all-user-courses-with-progess";

function MyCourses() {
  let colorIndex = 0;
  const [headerHeight, setHeaderHeight] = useState(110);
  const [courses, setCourses] = useState([]);
  const [courseProgresses, setCourseProgresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Looks like you have no purchase any course at the moment."
  );

  const { user } = useAuthContext();
  const fetchCourse = async () => {
    setLoading(true);
    // const coursesTemp = await getAllUserCourses(user?.Uuid);
    const coursesTemp = await getAllUserCoursesWithProcess(user?.id);
    // console.log("cour temps", coursesTemp?.Course_Details);
    setCourses(coursesTemp?.Course_Details.reverse());
    setCourseProgresses(coursesTemp?.Course_Progress_Status);
    setMessage("Looks like you have no purchase any course at the moment.");
    setLoading(false);
  };

  const getProgress = (courseName) => {
    let progress = courseProgresses?.filter(
      (courseProgress) => courseProgress?.Course_Title == courseName
    );
    // console.log("pr", progress[0]);
    return progress[0];
  };

  // =====================pagination=========================

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);

  // // ...

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  let currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(courses?.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // =====================pagination=========================

  const coursesByProgress = async (progress) => {
    const courses = await getAllUserCoursesByCategory(user?.id, progress);
    setCourses(courses);
    // console.log("currentCourses", currentCourses);
    setMessage("no courses available for this progress");
    setLoading(false);
  };

  const getCourseRelatedToProgress = (e) => {
    setCourses([]);
    setLoading(true);
    const progress = e.target.value;
    if (progress == "all") {
      fetchCourse();
    } else {
      coursesByProgress(progress);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
    // console.log("vourse list", courses);
    fetchCourse();
  }, []);
  return (
    <>
      <style jsx global>
        {`
          .adjustMinHeight {
            min-height: calc(100vh - ${headerHeight});
          }
        `}
      </style>
      <div className="profileDiv">
        <i
          className="fa-solid fa-bars sidebarOpenBtn d-lg-none"
          onClick={showSidebar}
        ></i>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-0 adjustMinHeight">
              <Sidebar />
            </div>

            <div className="col-lg-9">
              <div className="InfoDiv">
                <div
                  className="it-cta-form row justify-content-end"
                  style={{ marginTop: "0" }}
                >
                  <div className="input-item col-xl-4 col-lg-5 col-md-6 col-sm-8  ">
                    <span>
                      <i className="fas fa-book"></i>
                    </span>
                    <select
                      name=""
                      id=""
                      defaultValue="progress"
                      onChange={getCourseRelatedToProgress}
                    >
                      <option value="progress" disabled>
                        Select Progress
                      </option>
                      <option value="all">All</option>
                      <option value="completed">Completed</option>
                      <option value="inprogess">In Progress</option>
                      <option value="notstarted">Not Started</option>
                    </select>
                  </div>
                </div>
                {courses.length > 0 ? (
                  <>
                    <div className="row  myCoursesList mb-30">
                      {currentCourses.map((course, i) => {
                        return (
                          <CourseInfoCard
                            course={course}
                            key={i}
                            progressTemp={getProgress(course?.Title)}
                          />
                        );
                      })}
                    </div>
                    <Pagination
                      dataPerPage={coursesPerPage}
                      totalData={courses?.length}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      previousPage={previousPage}
                      nextPage={nextPage}
                    />
                  </>
                ) : loading ? (
                  <div className="d-flex justify-content-center pt-50">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <div className=" InfoDiv tp-section ">
                      <p>{message}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourses;
