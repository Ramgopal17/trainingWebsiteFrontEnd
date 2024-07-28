import React, { useEffect, useState } from "react";
import CourseCard from "../course-card/course-card";
import { colorGroup } from "@/utils/color-code";
import { getAllCourses } from "@/api/get-all-courses";
import { getAllCategories } from "@/api/get-all-categories";
import { getAllCoursesByCategory } from "@/api/get-all-courses-by-category";
import Pagination from "@/src/common/pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
function AllCourses() {
  let colorIndex = 0;
  const [allCourses, setAllCourses] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  // =====================pagination=========================

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  // // ...

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  let currentCourses = allCourses?.slice(indexOfFirstCourse, indexOfLastCourse);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(allCourses?.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // =====================pagination=========================
  const fetchAllCourses = async () => {
    // console.log("Fetching all courses");
    const allCoursesTemp = await getAllCourses();
    setAllCourses(allCoursesTemp);
    setLoading(false);
  };
  const fetchAllCategory = async () => {
    const categories = await getAllCategories();
    setAllCategories(categories);
  };
  const coursesByCategory = async (slug) => {
    const courses = await getAllCoursesByCategory(slug);
    setAllCourses(courses);
    // console.log("currentCourses", currentCourses);
    setLoading(false);
  };
  const setCoursesRelatedToCategory = async (e) => {
    // console.log(e.target.value);
    setAllCourses([]);
    setLoading(true);
    const categoryName = e.target.value;
    if (categoryName == "all") {
      fetchAllCourses();
    } else {
      coursesByCategory(categoryName);
    }
    setCurrentPage(1);
    // setLoading(false);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchAllCategory();
  }, []);
  return (
    <>
      <div className="">
        <div className="container pt-25 pb-25 ">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <h2 className="tp-section__title mb-10">
                    Certification courses
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" tp-section text-center">
            <p
              className="pb-20 wow tpfadeUp mb-0"
              data-wow-delay=".4s"
              style={{ color: "var(--tp-grey-3)" }}
            >
              Get certified by certification bodies and deepen your expertise
            </p>
          </div>
          <div
            className="it-cta-form row justify-content-end"
            style={{ marginTop: "0" }}
          >
            <div className="input-item col-xxl-3 col-lg-4 col-md-6 col-sm-8  ">
              <span>
                <i className="fas fa-book"></i>
              </span>
              <select
                name=""
                id=""
                style={{ paddingLeft: "30px", backgroundColor: "white" }}
                onChange={setCoursesRelatedToCategory}
                defaultValue={"Select"}
              >
                <option value="Select" disabled>
                  Select Category
                </option>
                <option value="all">All</option>
                {allCategories.map((category, i) => {
                  return (
                    <option key={i} value={category?.attributes?.Slug}>
                      {category?.attributes?.Title}
                    </option>
                  );
                })}
                {/* <option value="">Confluence Basic</option>
                <option value="">Oxygen XML Author</option>
                <option value="">Advanced Technical Writing - API</option> */}
              </select>
            </div>
          </div>
          {allCourses.length > 0 ? (
            <div className="row justify-content-center">
              {currentCourses?.map((course, i) => {
                if (colorIndex < colorGroup.length - 1) {
                  colorIndex++;
                } else {
                  colorIndex = 0;
                }
                return (
                  <CourseCard
                    key={i}
                    color={colorGroup[colorIndex - 1]}
                    course={course}
                  />
                );
              })}
            </div>
          ) : !loading ? (
            <div className="row pt-30">
              <h5 className="text-center">
                Sorry! No courses found related to this category
              </h5>
            </div>
          ) : (
            ""
          )}

          <Pagination
            dataPerPage={coursesPerPage}
            totalData={allCourses?.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        </div>
      </div>
    </>
  );
}

export default AllCourses;

{
  /* <div className="row">
  <div className="col-md-4 pb-30">
    <Skeleton height={300} />
  </div>
  <div className="col-md-4 pb-30">
    <Skeleton height={300} />
  </div>
  <div className="col-md-4 pb-30">
    <Skeleton height={300} />
  </div>
</div> */
}
