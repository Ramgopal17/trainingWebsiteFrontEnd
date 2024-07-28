import { getAllCategories } from "@/api/get-all-categories";
import { getNewCourses } from "@/api/get-new-courses";
import { getTrendingCourses } from "@/api/get-trending-course";
import React, { useState } from "react";
import MobileCourseList from "./mobile-course-list";
import {
  hideDropdownCourseMobile,
  passDataToShowDesc,
  showCategory,
  showCategoryPage,
} from "../all-functions";
import MobileCourseCategory from "./mobile-course-category";

function MobileDropdown() {
  const [activeCourseCategory, setActiveCourseCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [newCourses, setNewCourse] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState({});

  const showCourses = (activeCategoryCourses, isCategory = false) => {
    console.log(isCategory);
    const cat = document.querySelector(".showCatMobile");
    if (isCategory == true) {
      cat.classList.add("showCategoryBtn");
    } else {
      cat.classList.remove("showCategoryBtn");
    }
    // const courseList = document.getElementById("coursesList");
    // courseList.style.display = "block";
    setActiveCourseCategory(activeCategoryCourses);
    // console.log(activeCourseCategory);
  };

  const fetchData = async () => {
    const categories = await getAllCategories();
    // console.log(categories);
    setAllCategories(categories);
    const newCourses = await getNewCourses();
    setNewCourse(newCourses);
    const trendingCourse = await getTrendingCourses();
    setTrendingCourses(trendingCourse);
  };

  useState(() => {
    fetchData();
  }, []);
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

        <ul className="dropdownCourses">
          <li
            onClick={() => {
              showCourses(trendingCourses);
              passDataToShowDesc();
            }}
          >
            Trending Courses
          </li>
          <li
            onClick={() => {
              showCourses(newCourses);
              passDataToShowDesc();
            }}
          >
            New Courses
          </li>
          <li onClick={showCategoryPage}>Course Categories</li>
        </ul>
      </div>
      <MobileCourseList
        courses={activeCourseCategory}
        activeCourse={activeCourse}
      />
      <MobileCourseCategory
        showCourses={showCourses}
        setActiveCourse={setActiveCourse}
      />
    </>
  );
}

export default MobileDropdown;
