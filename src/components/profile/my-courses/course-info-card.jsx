import { BackEndApi } from "@/src/data/auth_token";
import { calculateCourseTime } from "@/utils/calculate-course-time";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import ReactStars from "react-rating-stars-component";
function CourseInfoCard({ course, progressTemp }) {
  // console.log("cou", course);
  const [rating, setRating] = useState(3);
  const [courseTime, setCourseTime] = useState("");
  const [progress, setProgress] = useState(0);
  // let progress = 0;

  const setProgressOfCourse = () => {
    // course?.Course_Progress_Status?.map((course_progress) => {
    //   // console.log("cor pro", course_progress);
    //   if (course_progress?.Course_Title == course?.Title) {
    //     setProgress(course_progress?.Progress.slice(1));
    //     // progress = course_progress?.Progress?.slice(1);
    //     console.log(
    //       course_progress?.Course_Title,
    //       course_progress?.Progress.slice(1)
    //     );
    //   }
    // });
    setProgress((progressTemp?.Progress).slice(1));
  };
  useEffect(() => {
    setCourseTime(
      calculateCourseTime(
        course?.Course_Durations,
        course?.Course_Time_On_Week_Days,
        course?.Course_Time_On_Week_End,
        course?.publishedAt
      )
    );
    setProgressOfCourse();
  }, []);
  return (
    <>
      <div className=" col-md-6">
        <Link
          href={`/user/course/lecture?name=${course?.Title}&slug=${course?.Slug}&courseid=${course?.id}&progress=${progress}`}
        >
          <div style={{ height: "100%", paddingBottom: "20px" }}>
            <div className="courseInfoCard ">
              <img
                src={`${BackEndApi}${course?.Course_Image[0]?.formats?.thumbnail?.url}`}
                alt={course?.Title}
              />
              <div className="infoDiv tp-section">
                <h4>{course?.Title}</h4>
                <p>Valid Till: {courseTime}</p>
                {/* <p>Lorem, ipsum dolor sit amet conse</p> */}
                <div className="ratingBarDiv">
                  <div
                    className="ratingBar"
                    style={{
                      // width: `${(course?.Course_Progress_Status[0]?.Progress).slice(
                      //   1
                      // )}%`,
                      width: `${progress}%`,
                    }}
                  ></div>
                </div>
                <div className="ratingInfo d-flex justify-content-between">
                  <p className="pt-5">
                    {/* {(course?.Course_Progress_Status[0]?.Progress).slice(1)} % */}
                    {progress}% completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default CourseInfoCard;

/* <div>
                  <ReactStars
                    count={5}
                    value={rating}
                    size={20}
                    activeColor="#f47f20"
                    onChange={(value) => {
                      setRating((prev) => (prev = value));
                    }}
                  />
                  <p>leave a rating</p>
                  {/* <p>Your rating</p> 
                </div> */
