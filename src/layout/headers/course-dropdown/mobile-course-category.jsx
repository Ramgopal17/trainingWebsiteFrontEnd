import { getAllCategories } from "@/api/get-all-categories";
import React, { useEffect, useState } from "react";
import {
  backToMainFromCategory,
  passDataToShowCatCourse,
  passDataToShowDesc,
} from "../all-functions";
import CustomButton from "@/src/components/custom/custom-button";

function MobileCourseCategory({ showCourses, setActiveCourse }) {
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getAllCategories();
      // console.log("categories", categories);
      setAllCategories(categories);
      setActiveCourse({
        title: categories[0]?.attributes?.Title,
        slug: categories[0]?.attributes?.Slug,
        courses: categories[0]?.attributes?.Course_Details?.data,
      });
      // console.log(categories[0]?.attributes?.Course_Details?.data);
    };
    fetchCategory();
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
      <div className="AllCoursesDropdownMobile" id="AllCategoryMobile">
        <div className="allCourseTitle">
          <i
            className="fa-solid fa-arrow-left"
            onClick={backToMainFromCategory}
          ></i>
          <h6 className="mb-0">Categories</h6>
        </div>

        <ul className="dropdownCourses">
          {allCategories?.map((category, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  setActiveCourse({
                    title: category?.attributes?.Title,
                    slug: category?.attributes?.Slug,
                    courses: category?.attributes?.Course_Details?.data,
                  });
                  showCourses(category?.attributes?.Course_Details?.data, true);
                  passDataToShowCatCourse();
                }}
              >
                {category?.attributes?.Title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MobileCourseCategory;
