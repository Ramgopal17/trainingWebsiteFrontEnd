import React from "react";
import {
  backToCoursesMobile,
  hideAllCoursesAndCategories,
  hideDropdownCourseMobile,
} from "../all-functions";
import Link from "next/link";
import CustomButton from "@/src/components/custom/custom-button";
import { useRouter } from "next/router";

function MobileCourseList({ courses, activeCourse }) {
  const router = useRouter();
  // console.log(courses);
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
          .showCatMobile {
            display: none;
          }
          .showCategoryBtn {
            display: block !important;
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
      <div className="AllCoursesDropdownMobile" id="RelatedCategoryCoursesDesc">
        <div className="allCourseTitle">
          <i
            className="fa-solid fa-arrow-left"
            onClick={backToCoursesMobile}
          ></i>
          <h6 className="mb-0">Courses</h6>
        </div>

        <ul className="dropdownCourses">
          {courses?.map((course, i) => {
            return (
              <Link
                key={i}
                onClick={hideAllCoursesAndCategories}
                href={`/courses?coursename=${course.attributes.Slug}&category=${activeCourse.slug}`}
              >
                {" "}
                <li key={i}>{course?.attributes?.Title}</li>
              </Link>
            );
          })}
        </ul>
        <div
          className="category-btn  pt-20 pl-30 showCatMobile"
          onClick={hideAllCoursesAndCategories}
        >
          <CustomButton
            url={`/category/coursecategory?coursecategory=${activeCourse.slug}`}
            text="Explore the category"
          />
        </div>
      </div>
    </>
  );
}

export default MobileCourseList;
