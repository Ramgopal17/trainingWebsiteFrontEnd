import { avgRatingCourse } from "@/utils/avg-rating-course";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
const colorGroup = [
  {
    leftSide: "#f36d74",
    rightSide: "#fcd6d8",
    Dark: "#ec1c24",
  },
  {
    leftSide: "#0fd06a",
    rightSide: "#cffce4",
    Dark: "#086d38",
  },
  {
    leftSide: "#5b78cc",
    rightSide: "#d3dbf1",
    Dark: "#324da0",
  },
  {
    leftSide: "#f7a059",
    rightSide: "#fde2cc",
    Dark: "#f47f20",
  },
  {
    leftSide: "#fdca53",
    rightSide: "#fef1d3",
    Dark: "#fcb713",
  },
  {
    leftSide: "#3dcde9",
    rightSide: "#b8ecf6",
    Dark: "#0d8da7",
  },
];

function CourseCard({
  color = {
    leftSide: "#3dcde9",
    rightSide: "#b8ecf6",
    dark: "#0d8da7",
  },
  classes = "col-xl-4 col-md-6 mb-20",
  course = {},
  minHeight = "405px",
  adjustHeight = false,
}) {
  const [fullWidth, setFullWidth] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const moveImage = (e) => {
    const parentDiv = document.getElementsByClassName("infoWrapperNew")[0];
    setFullWidth(getComputedStyle(parentDiv).getPropertyValue("width"));
  };
  useEffect(() => {
    setAvgRating(course?.attributes?.Testimonials?.data?.attributes?.Rating);
  }, []);
  return (
    <>
      <style jsx global>
        {`
          .singleCourseCard .infoWrapperNew:hover .topColor .bar .circle {
            left: calc(${fullWidth} - 140px);
          }
          .adjustCardHeight {
            height: 400px;
            display: block;
          }
        `}
      </style>
      <div
        className={`singleCourseCard ${classes}`}
        style={{ minHeight: "100%" }}
      >
        <Link
          href={`/courses?coursename=${course?.attributes?.Slug}&category=${course?.attributes?.Category?.data?.attributes?.Slug}`}
          className={`${adjustHeight ? "adjustCardHeight" : ""}`}
        >
          <div
            className="infoWrapperNew"
            onMouseOver={moveImage}
            style={{ minHeight: "100%" }}
          >
            <div
              className="topColor"
              style={{
                background: `linear-gradient(to right,rgb(211, 219, 241), rgb(158, 183, 255) 50%)`,
                // background: `linear-gradient(to right, ${color.rightSide} , ${color.leftSide} 50%)`,
              }}
            >
              <h4 className="courseName p-3 pb-0">
                {course?.attributes?.Title}{" "}
              </h4>
              {/* <div className="ps-3">
                <ReactStars
                  count={5}
                  value={avgRatingCourse(
                    course?.attributes?.Testimonials?.data
                  )}
                  size={24}
                  edit={false}
                  color={"#d3d3d0"}
                  activeColor="#f47f20"
                  // onChange={(value) => {
                  //   setRating((prev) => (prev = value));
                  // }}
                />
              </div> */}

              {/* <div className="bar" style={{ backgroundColor: color.dark }}> */}
              <div className="bar" style={{ backgroundColor: "#324da0" }}>
                <div
                  className="circle d-flex align-items-center justify-content-center"
                  // style={{ backgroundColor: color.dark }}
                  style={{ backgroundColor: "#324da0" }}
                >
                  <div className="imgDiv d-flex align-items-center justify-content-center">
                    <img
                      src="/assets/img/contract.png"
                      alt={course?.attributes?.Title}
                      width={45}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="description tp-section">
              <ul>
                <li>Introduction to Technical Writing</li>
                <li>Importance of Language and Grammar</li>
                <li>Technical Writing Tools and Techniques</li>
                <li>Handling Technical Documentation Work</li>
                <li>Planning of a project</li>
              </ul>
            </div> */}
            <div className="description tp-section">
              <ul>
                {course?.attributes?.Full_Syllabus?.data?.attributes?.Syllabus_Chapters?.data
                  ?.slice(0, 6)
                  .map((chapter, i) => {
                    return <li key={i}>{chapter?.attributes?.Title}</li>;
                  })}
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default CourseCard;
