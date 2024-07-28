import { getAllCategories } from "@/api/get-all-categories";
import { getNewCourses } from "@/api/get-new-courses";
import { getTrendingCourses } from "@/api/get-trending-course";
import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const showSecondChild = () => {
  const courseList = document.getElementById("coursesList");
  courseList.style.display = "none";
  // console.log("in showSecondChild");
  const secondChild = document.getElementById("secondChild");
  secondChild.style.display = "block";
};
const hideSecondChild = () => {
  // console.log("in showSecondChild");
  const secondChild = document.getElementById("secondChild");
  secondChild.style.display = "none";
};

function DesktopDropdown() {
  const [activeMainType, setActiveMainType] = useState("");
  const [activeCourseCategory, setActiveCourseCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [newCourses, setNewCourse] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);

  // console.log(activeMainType);
  const [activeCategory, setActiveCategory] = useState({});
  const showCourses = (activeCategoryCourses, disProp = "none") => {
    // console.log(activeCategoryCourses);
    const secondChild = document.getElementById("secondChild");
    secondChild.style.display = disProp;
    const courseList = document.getElementById("coursesList");
    courseList.style.display = "block";
    setActiveCourseCategory(activeCategoryCourses);
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
    // <div className=" pt-100 pl-100 ">
    <div className="dropdownContainer" id="allCoursesDropdown">
      <div className="mainTypes">
        <div className="paddingWrapper">
          <p
            className={`${activeMainType == "Trending Courses" && "active"}`}
            onMouseOver={() => {
              setActiveMainType("Trending Courses");
              showCourses(trendingCourses);
            }}
          >
            Trending Courses
          </p>
          <p
            className={`${activeMainType == "New Courses" && "active"}`}
            onMouseOver={() => {
              setActiveMainType("New Courses");
              showCourses(newCourses);
            }}
          >
            New Courses
          </p>
          <p
            className={`${activeMainType == "Course Categories" && "active"}`}
            onMouseOver={() => {
              setActiveMainType("Course Categories");
              setActiveCategory({});
              showSecondChild();
            }}
          >
            Course Categories
          </p>
        </div>
      </div>
      <div className="secondChild" id="secondChild">
        <div className="paddingWrapper">
          <h6 className="pl-10 pt-10 pb-10">Categories</h6>

          {allCategories.length > 0 ? (
            allCategories.map((category, i) => {
              return (
                <Link
                  key={i}
                  href={`/category/coursecategory?coursecategory=${category?.attributes?.Slug}`}
                >
                  <p
                    key={i}
                    className={`${
                      activeCategory.title == category?.attributes?.Title &&
                      "active"
                    }`}
                    onMouseOver={() => {
                      setActiveCategory({
                        title: category.attributes.Title,
                        slug: category.attributes.Slug,
                      });
                      showCourses(
                        category?.attributes?.Course_Details?.data,
                        "block"
                      );
                    }}
                  >
                    {category?.attributes?.Title}
                  </p>
                </Link>
              );
            })
          ) : (
            <div className="row pl-20 pr-20">
              <Skeleton count={6} />
            </div>
          )}
        </div>
      </div>
      <div className="coursesList " id="coursesList">
        <div className="paddingWrapper">
          <h6 className="pl-10 pt-10 pb-10">Courses</h6>

          {activeCourseCategory.length > 0 ? (
            activeCourseCategory?.map((course, i) => {
              return (
                <Link
                  key={i}
                  href={`/courses?coursename=${course?.attributes?.Slug}&category=${course?.attributes?.Category?.data?.attributes?.Slug}`}
                >
                  <p
                  // className={`${activeCoursesList == course && "active"}`}
                  // onMouseOver={() => {
                  //   setActiveCoursesList(course);
                  // }}
                  >
                    {course?.attributes?.Title}
                  </p>
                </Link>
              );
            })
          ) : (
            <div className="row pl-20 pr-20">
              <Skeleton count={6} />
            </div>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
}

export default DesktopDropdown;
