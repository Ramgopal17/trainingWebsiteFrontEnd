import { showSidebar } from "@/utils/toggle-sidebar";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import findHeaderHeight from "@/hooks/find-header-height";
import ViewCertificateCard from "./view-certificate-card";
import Pagination from "@/src/common/pagination";
import { useAuthContext } from "@/context/Auth-context";
import { getAllUserCourses } from "@/api/get-all-user-course";
import Loader from "@/src/common/loader";
import { getUserAllCompletedCourses } from "@/api/get-user-completed-courses";
import { getAllUserCompletedCourse } from "@/api/get-all-user-completed-course";

function Certificates() {
  const [completedCourse, setCompletedCourse] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(110);

  // ================user course progress==============
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const getUserCompletedCourses = async () => {
    setLoading(true);
    // const coursesTemp = await getUserAllCompletedCourses(user?.Uuid);
    const coursesTemp = await getAllUserCompletedCourse(user?.id);
    setCompletedCourse(coursesTemp.reverse());
    setLoading(false);
  };

  // ================user course progress==============

  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
    getUserCompletedCourses();
  }, []);
  // =====================pagination=========================

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);

  // // ...

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = completedCourse.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(completedCourse.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // =====================pagination=========================

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
              {/* <div className="InfoDiv tp-section">
                <p>You haven’t unlocked any certificates yet.</p>
              </div> */}

              {completedCourse.length > 0 ? (
                <>
                  <div className="InfoDiv tp-section">
                    {currentCourses.map((course, i) => {
                      return <ViewCertificateCard key={i} course={course} />;
                    })}
                  </div>
                  <Pagination
                    dataPerPage={coursesPerPage}
                    totalData={completedCourse.length}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    previousPage={previousPage}
                    nextPage={nextPage}
                  />
                </>
              ) : loading ? (
                <div className="d-flex justify-content-center pt-50 pb-50">
                  <Loader />
                </div>
              ) : (
                <>
                  <div className=" InfoDiv tp-section ">
                    <p>
                      Looks like you have no purchase any course at the moment.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Certificates;
