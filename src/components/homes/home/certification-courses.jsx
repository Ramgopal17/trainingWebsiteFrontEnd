import React, { useEffect, useState } from "react";
import CourseCard from "../../course-card/course-card";
import CustomButton from "../../custom/custom-button";
import { colorGroup } from "@/utils/color-code";
import { getAllCourses } from "@/api/get-all-courses";
import AllCourses from "../../all-courses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function CertificationCourses() {
  let colorIndex = 0;
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const allCoursesTemp = await getAllCourses();
      setAllCourses(allCoursesTemp);
    };
    fetchData();
  }, []);
  return (
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
        <div className="row">
          {allCourses.length > 0 ? (
            allCourses?.slice(0, 6).map((course, i) => {
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
            })
          ) : (
            <>
              <div className="col-md-4 pb-30">
                <Skeleton height={300} />
              </div>
              <div className="col-md-4 pb-30">
                <Skeleton height={300} />
              </div>
              <div className="col-md-4 pb-30">
                <Skeleton height={300} />
              </div>
            </>
          )}
          {/* <CourseCard color={colorGroup[1]} />
          <CourseCard color={colorGroup[2]} />
          <CourseCard color={colorGroup[3]} />
          <CourseCard color={colorGroup[4]} />
          <CourseCard color={colorGroup[5]} /> */}
        </div>
        <div className="row justify-content-end">
          <div className=" d-flex justify-content-end">
            <CustomButton url={"/all-courses"} text={"View More"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificationCourses;
