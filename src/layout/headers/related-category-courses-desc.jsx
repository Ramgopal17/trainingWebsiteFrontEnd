import React from "react";
import Courses from "./courses";
import { backToCoursesMobile } from "./all-functions";
import Link from "next/link";

function RelatedCategoryCoursesDesc({ activeCourse }) {
  return (
    <>
      <style jsx global>
        {`
          .RelatedCategoryCoursesDesc {
            position: fixed;
            z-index: 998;
            top: 0;
            width: 100%;
            height: 100vh;
            background-color: white;
            display: none;
            overflow-y: auto;
          }
          @media (min-width: 992px) {
            .RelatedCategoryCoursesDesc {
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
          .category-btn-normal {
            margin-top: 50px;
            display: flex;
            justify-content: center;
          }
          .category-btn-normal a {
            padding: 10px 50px 10px 20px;
            border: 1px solid #324da0;
            border-radius: 8px;
            position: relative;
          }
          .category-btn-normal ::after {
            content: "";
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            background: url(/assets/img/right-arrow2.png);
            background-size: cover;
            margin-left: 10px;
          }
          .descriptionMobile {
            width: 100%;
            position: relative;
            padding: 30px 40px;
          }
          @media (max-width: 425px) {
            .descriptionMobile {
              padding: 30px 20px;
            }
            .allCourseTitle i {
              left: 0px;
            }
          }
        `}
      </style>
      <div
        className="RelatedCategoryCoursesDesc"
        id="RelatedCategoryCoursesDesc"
      >
        <div className="allCourseTitle">
          <i
            className="fa-solid fa-arrow-left"
            onClick={backToCoursesMobile}
          ></i>
          <h6 className="mb-0">Basic Technical Writing</h6>
        </div>
        <div
          className="descriptionMobile mt-50"
          // style={{ padding: "30px 40px" }}
        >
          <p className="courseCat ps-0">COURSES</p>
          <div className="popularCourses" style={{ maxHeight: "1000px" }}>
            {/* =================dummy================= */}
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
            {/* ================strapi================================ */}
            {activeCourse?.courses?.map((course, i) => {
              let SyllabusChapters =
                course?.attributes?.Full_Syllabus?.data?.attributes
                  ?.Syllabus_Chapters?.data;
              return (
                <Link
                  key={i}
                  href={`/courses?coursename=${course.attributes.Slug}&category=${activeCourse.slug}`}
                >
                  <div className="singleCourse">
                    <p className="courseName">{course.attributes.Title}</p>
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

          {/* <div className="category-btn-normal">
            <Link href="/category/course-cat">Explore the category</Link>
          </div> */}
          <div className="category-btn-normal">
            <Link
              href={`/category/coursecategory?coursecategory=${activeCourse.slug}`}
            >
              Explore the category
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatedCategoryCoursesDesc;
