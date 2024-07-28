import React, { useEffect, useState } from "react";
import Courses from "./courses";
import { hideDropdown, showDropdown } from "./all-functions";
import findHeaderHeight from "@/hooks/find-header-height";
import CustomButton from "@/src/components/custom/custom-button";
import Link from "next/link";

function AllCoursesDropdown({ allCategories, setActiveCourse, activeCourse }) {
  // const [activeCourse, setActiveCourse] = useState({});
  const [headerHeight, setHeaderHeight] = useState(110);
  // const [allCategories, setAllCategories] = useState([]);

  // const router = useRouter();
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
    // console.log("rendering");
    //   const fetchCategory = async () => {
    //     const categories = await getAllCategories();
    //     setAllCategories(categories);
    //     setActiveCourse({
    //       title: categories[0].attributes.Title,
    //       slug: categories[0].attributes.Slug,
    //       courses: categories[0].attributes.Course_Details.data,
    //     });
    //     console.log(categories[0].attributes.Course_Details.data);
    //   };
    //   fetchCategory();
  }, []);
  return (
    <>
      <style jsx global>
        {`
          .allCoursesDropdown {
            background-color: white;
            position: fixed;
            left: 50%;
            top: ${headerHeight};
            transform: translateX(-50%);
            width: min(100%, 700px);
            margin: 0 auto;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: rgba(149, 157, 165, 0.4) 0px 0px 24px;
            z-index: 100;
            display: none;
            height: min(60vh, 550px);
          }
          @media (max-width: 991px) {
            .allCoursesDropdown {
              display: none !important;
            }
          }
        `}
      </style>

      <div
        className="allCoursesDropdown"
        id="allCoursesDropdown"
        onMouseLeave={hideDropdown}
        onMouseOver={showDropdown}
      >
        <div className="courseList">
          <p className="courseCat">COURSE CATEGORIES</p>
          {/* ================================dummy================================ */}
          {/* <ul>
            {Courses.map((course, i) => {
              return (
                <li
                  key={i}
                  className={`${activeCourse == course ? "active" : ""}`}
                  onMouseOver={() => setActiveCourse(course)}
                >
                  {course}
                </li>
              );
            })}
          </ul> */}
          {/* ===============================strapi================================ */}
          <ul>
            {allCategories.map((course, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    activeCourse.title == course.attributes.Title
                      ? "active"
                      : ""
                  }`}
                  onMouseOver={() =>
                    setActiveCourse({
                      title: course.attributes.Title,
                      slug: course.attributes.Slug,
                      courses: course.attributes.Course_Details.data,
                    })
                  }
                >
                  {course.attributes.Title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="description">
          <p className="courseCat ps-0">COURSES</p>
          <div className="popularCourses">
            {/* =============================dummy============================ */}
            {/* <Link href={"/courses/course-name"}>
              <div className="singleCourse">
                <p className="courseName">Basic Technical Writing</p>
                <ul>
                  <li>Introduction to Technical Writing</li>
                  <li>Importance of Language and Grammar</li>
                  <li>Technical Writing Tools and Techniques</li>
                  <li>Handling Technical Documentation Work</li>
                  <li>Planning of a project</li>
                </ul>
              </div>
            </Link>
            <Link href={"/courses/course-name"}>
              <div className="singleCourse">
                <p className="courseName">Basic Technical Writing</p>
                <ul>
                  <li>Introduction to Technical Writing</li>
                  <li>Importance of Language and Grammar</li>
                  <li>Technical Writing Tools and Techniques</li>
                  <li>Handling Technical Documentation Work</li>
                  <li>Planning of a project</li>
                </ul>
              </div>
            </Link>
            <Link href={"/courses/course-name"}>
              <div className="singleCourse">
                <p className="courseName">Basic Technical Writing</p>
                <ul>
                  <li>Introduction to Technical Writing</li>
                  <li>Importance of Language and Grammar</li>
                  <li>Technical Writing Tools and Techniques</li>
                  <li>Handling Technical Documentation Work</li>
                  <li>Planning of a project</li>
                </ul>
              </div>
            </Link> */}
            {/* ===========================straping ==================== */}
            {activeCourse?.courses?.map((course, i) => {
              {
                /* console.log("hre", course); */
              }
              let SyllabusChapters =
                course?.attributes?.Full_Syllabus?.data?.attributes
                  ?.Syllabus_Chapters?.data;

              return (
                <Link
                  key={i}
                  href={`/courses?coursename=${course.attributes.Slug}&category=${activeCourse.slug}`}
                >
                  <div className="singleCourse">
                    <p className="courseName"> {course.attributes.Title}</p>

                    <ul>
                      {SyllabusChapters?.map((chapter, i) => {
                        return <li key={i}>{chapter.attributes.Title}</li>;
                      })}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* =============================dummy============================ */}
          {/* <div className="category-btn d-flex justify-content-end pt-30">
            <CustomButton
              url="/category/course-cat"
              text="Explore the category"
            />
          </div> */}
          {/* ==================================strapi================================ */}
          <div className="category-btn d-flex justify-content-end pt-30">
            <CustomButton
              url={`/category/coursecategory?coursecategory=${activeCourse.slug}`}
              text="Explore the category"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AllCoursesDropdown;
