import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import CourseCard from "../course-card/course-card";
import { colorGroup } from "@/utils/color-code";
import { getAllCourses } from "@/api/get-all-courses";
import Pagination from "@/src/common/pagination";
import Loader from "@/src/common/loader";

function Search() {
  let colorIndex = 0;
  // const [searchParam, setSearchParam] = useState("");
  const [matchCourses, setMatchCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // let searchParam = "";
  let searchParam = router.query.course;

  // =====================pagination=========================

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);

  // // ...

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = matchCourses?.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(matchCourses?.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // =====================pagination=========================

  useEffect(() => {
    // console.log("query", router.query.course);
    // console.log("searparam", searchParam);
    let tempCourses = [];

    const fetchAllCourses = async () => {
      setLoading(true);
      const allCourses = await getAllCourses();
      allCourses.map((course) => {
        // console.log(
        //   course.attributes.Title.toLowerCase().includes(searchParam)
        // );
        // console.log(searchParam);
        if (
          course.attributes.Title.toLowerCase().includes(
            searchParam?.toLowerCase()
          )
        ) {
          tempCourses.push(course);
        }
      });
      setMatchCourses(tempCourses);
      setCurrentPage(1);
      setLoading(false);
    };
    fetchAllCourses();

    // console.log(tempCourses);
  }, [router.query]);
  // console.log(matchCourses);
  return (
    <>
      <style jsx global>
        {`
          .tp-job-item:hover p {
            color: white;
          }
          .tp-job-item {
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.07);
          }
        `}
      </style>
      <div className="container pt-25 pb-25">
        {loading ? (
          <div className="d-flex justify-content-center pt-50 pb-50">
            <Loader />
          </div>
        ) : (
          <>
            <div className="totalResults">
              {matchCourses.length > 0 ? (
                searchParam.length > 0 ? (
                  <h5>
                    {matchCourses.length} Search results found for "
                    {searchParam}"
                  </h5>
                ) : (
                  <h5>All courses</h5>
                )
              ) : (
                <h5>No search results found for "{searchParam}"</h5>
              )}
            </div>

            <div className="row pt-20">
              {currentCourses.map((course, i) => {
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
            <Pagination
              dataPerPage={coursesPerPage}
              totalData={matchCourses?.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              previousPage={previousPage}
              nextPage={nextPage}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Search;

{
  /* <div key={i} className="col-lg-6 wow tpfadeUp">
              <div className="tp-job-item white-bg">
                <div className="row align-items-center">
                  <div className="col-lg-9">
                    <div className="tp-job-item__info tp-section">
                      <h3 className="tp-job-item__title">
                        <a href="#">{item.title}</a>
                      </h3>
                      <p className="mb-0">
                        This course focuses to ensure your documentation-type
                        content is easy to manage and consume.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="tp-job-item__btn text-lg-end">
                      <Link href="/">
                        Read More
                        <span>
                          <i className="fal fa-long-arrow-right"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            
            </div> */
}
