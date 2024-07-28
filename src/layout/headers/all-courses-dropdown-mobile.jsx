import React, { useEffect, useState } from "react";
import Courses from "./courses";
import { hideDropdownCourseMobile, passDataToShowDesc } from "./all-functions";
import { getAllCategories } from "@/api/get-all-categories";

function AllCoursesDropdownMobile({ allCategories, setActiveCourse }) {
  return (
    <>
      <style jsx global>
        {`
          .AllCoursesDropdownMobile {
            position: fixed;
            z-index: 999;
            top: 0;
            width: 100%;
            height: 100vh;
            background-color: white;
            display: none;
            overflow-y: auto;
          }
          @media (min-width: 992px) {
            .AllCoursesDropdownMobile {
              display: none !important;
            }
          }
          .allCourseTitle {
            background-color: #ebf1f8;
            border: 1px solid #dde6ed;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 9999;

            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .allCourseTitle i {
            width: 50px;
            height: 50px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 20px;
            cursor: pointer;
          }
          .dropdownCourses {
            margin-top: 50px;
            padding: 20px 0px;
          }
          .dropdownCourses li {
            padding: 10px 40px;
            position: relative;
            cursor: pointer;
          }
          .dropdownCourses li:hover {
            background-color: #ebf1f8;
          }
          .dropdownCourses li::after {
            content: "";
            width: 15px;
            height: 15px;
            background: url(assets/img/right-arrow.png);
            background-size: cover;
            position: absolute;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
          }
          @media (max-width: 425px) {
            .dropdownCourses li {
              padding: 10px 20px;
            }
            .allCourseTitle i {
              left: 0px;
            }
            .dropdownCourses li::after {
              right: 20px;
            }
          }
        `}
      </style>
      <div className="AllCoursesDropdownMobile" id="AllCoursesDropdownMobile">
        <div className="allCourseTitle">
          <i
            className="fa-solid fa-arrow-left"
            onClick={hideDropdownCourseMobile}
          ></i>
          <h6 className="mb-0">All Courses</h6>
        </div>
        {/* ========================dummy=========================== */}
        {/* <ul className="dropdownCourses">
          {Courses.map((course, i) => {
            return (
              <li key={i} onClick={passDataToShowDesc}>
                {course}
              </li>
            );
          })}
        </ul> */}
        {/* ==========================strapi======================= */}
        <ul className="dropdownCourses">
          {allCategories.map((course, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  // console.log("onclick me");
                  passDataToShowDesc();
                  setActiveCourse({
                    title: course.attributes.Title,
                    slug: course.attributes.Slug,
                    courses: course.attributes.Course_Details.data,
                  });
                }}
              >
                {course.attributes.Title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default AllCoursesDropdownMobile;
