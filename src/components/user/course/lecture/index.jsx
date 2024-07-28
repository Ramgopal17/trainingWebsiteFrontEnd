import { getParticularUserCourse } from "@/api/get-perticular-user-course";
import { postUserTestimonial } from "@/api/post-user-testimonial";
import { useAuthContext } from "@/context/Auth-context";
import { BackEndApi } from "@/src/data/auth_token";
import { avgRatingCourse } from "@/utils/avg-rating-course";
import { avgRatingMyCourse } from "@/utils/avg-rating-my-course";
import { calculateCourseTime, startDate } from "@/utils/calculate-course-time";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Swal from "sweetalert2";
import { checkAboveCheckBox } from "@/utils/progress-temp";
// import SaveProgress from "./save-progress";
import { getUserProcesses } from "@/api/get-user-progresses";
import { postUserCourseProgress } from "@/api/post-user-course-progress";
import CustomButton from "@/src/components/custom/custom-button";
import findHeaderHeight from "@/hooks/find-header-height";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Lecture() {
  const [userRating, setUserRating] = useState(0);
  const { user } = useAuthContext();
  const router = useRouter();
  const [course, setCourse] = useState({});
  const [reRender, setReRender] = useState(true);
  const [progressCourse, setProgressCourse] = useState({});
  const [headerHeight, setHeaderHeight] = useState(110);
  const progress = [0, 0, 0, 0, 0];
  const postTestimonial = async (e) => {
    e.preventDefault();

    if (e.target.review.value.length) {
      const data = {
        data: {
          Review: e.target.review.value,
          Course_Title: router?.query?.name,
          User: {
            connect: [user?.id],
          },
          Course_Detail: {
            connect: [parseInt(router?.query?.courseid)],
          },
          Rating: userRating,
        },
      };
      const result = await postUserTestimonial(data);
      if (result) {
        setUserRating(0);
        e.target.review.value = "";
        Swal.fire({
          icon: "success",
          title: "Review submitted successfully",
          text: "Your review was submitted successfully ",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: "Please try again",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Empty review",
        text: "Please enter review first",
        confirmButtonText: "OK",
      });
    }
  };

  const ToggleOpenClass = (e) => {
    const allSingleSyl = document.getElementsByClassName("singleSyl");
    let parentDiv = "";
    if (e.target.className === "title") {
      parentDiv = e.target.parentElement;
    } else {
      parentDiv = e.target.parentElement.parentElement;
    }
    for (const singleSyl of allSingleSyl) {
      if (singleSyl != parentDiv) {
        singleSyl.classList.remove("open");
        // const arrow = singleSyl.getElementsByClassName("rotateArrow")[0];
        // arrow.style.transform = "translateY(-50%) rotate(-90deg)";
      }
      // else {
      //   const arrow = singleSyl.getElementsByClassName("rotateArrow")[0];
      //   if (arrow.style.transform == "translateY(-50%) rotate(-90deg)") {
      //     arrow.style.transform = "translateY(-50%) rotate(0deg)";
      //   } else {
      //     arrow.style.transform = "translateY(-50%) rotate(-90deg)";
      //   }
      // }
    }
    parentDiv.classList.toggle("open");
  };

  const fetchData = async () => {
    const courseTemp = await getParticularUserCourse(
      user?.Uuid,
      router?.query?.courseid
    );
    // console.log(user?.Uuid, router?.query?.courseid);
    // console.log("courseTemp", courseTemp);
    setCourse(courseTemp);
  };
  const getProcesses = async () => {
    const processes = await getUserProcesses(user?.id);
    let progress = processes?.filter(
      (Pros) => Pros?.Course_Title == course?.Title
    );
    // console.log("prLecture", progress);
    setProgressCourse(progress);
  };

  const setChecked = (i) => {
    // console.log(progressCourse[0] && (progressCourse[0]?.Progress).slice(1));
    if (
      progressCourse[0] &&
      (progressCourse[0]?.Progress).slice(1) >= (i + 1) * 20
    ) {
      progress[i] = 1;

      // console.log("checked", progressCourse);

      return "checked";
    } else {
      return "";
    }
  };

  const savePr = async (e, i) => {
    let isPrevComplete = true;
    progress.forEach((value, index) => {
      if (index < i && value == 0) {
        isPrevComplete = false;
      }
    });

    if (isPrevComplete) {
      if (
        e.target.value > (progressCourse[0]?.Progress).slice(1) ||
        e.target.value == 100
      ) {
        // console.log(
        //   "fgdfgd",
        //   e.target.value,
        //   (progressCourse[0]?.Progress).slice(1)
        // );
        progress[i] = 1;

        let data = {
          action: "update",
          data: {
            Progress: `P${e.target.value}`,
            Course_Title: course?.Title,
            User: {
              connect: [user?.id],
            },
            Course_Detail: {
              connect: [course?.id],
            },
          },
        };
        let res = await postUserCourseProgress(progressCourse[0]?.id, data);
        // console.log("dfgdfgdfg", res);
        // setProgress(60);
        // postUserCourseProgress(course?.Course_Progress_Status[0]?.id, data);

        setReRender(!reRender);
      } else {
        Swal.fire({
          icon: "warning",
          title: "cannot undone progress  ",
          text: "cannot undone progress once completed",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "progress not saved",
        text: "Please complete the previous progress first",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchData();
    getProcesses();
    setHeaderHeight(findHeaderHeight());
    // console.log("parent Rerender");
  }, [progressCourse]);
  // return <>dfsd</>;
  return (
    <div className="lecture tp-section">
      <div className="top-info pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              {course?.Title ? (
                <h2 className="tp-section__title ">{course?.Title}</h2>
              ) : (
                <Skeleton height={30} className="mb-30" />
              )}
              {course.Description ? (
                <p>{course.Description}</p>
              ) : (
                <>
                  <Skeleton count={5} />
                  <Skeleton count={1} className="mb-30" />
                </>
              )}
              <div className="mb-2">
                <ReactStars
                  key={avgRatingMyCourse(course?.Testimonials)}
                  color={"#d3d3d0"}
                  count={5}
                  value={avgRatingMyCourse(course?.Testimonials)}
                  size={24}
                  edit={false}
                  activeColor="#f47f20"
                />
              </div>
              <div className="row course-Info-div">
                <p className="col-md-4 col-6">
                  Course Fee: ₹ {course?.Program_Fee}
                </p>
                <p className="col-md-4 col-6">
                  Start Date: {startDate(course?.publishedAt)}
                </p>
                <p className="col-md-4 col-6">
                  Valid till:
                  {calculateCourseTime(
                    course?.Course_Durations,
                    course?.Course_Time_On_Week_Days,
                    course?.Course_Time_On_Week_End,
                    course?.publishedAt
                  )}
                </p>
                <p className="col-md-4 col-6">level: {course?.Course_For}</p>
                <p className="col-md-4 col-6">
                  Progress:
                  {progressCourse && progressCourse[0]?.Progress.slice(1)}
                </p>
              </div>
            </div>
            <div className="col-lg-5 d-flex justify-content-center">
              {course?.Course_Image &&
              course?.Course_Image[0]?.formats?.small?.url ? (
                <div>
                  <img
                    src={
                      course?.Course_Image &&
                      `${BackEndApi}${course?.Course_Image[0]?.formats?.small?.url}`
                    }
                    alt={course?.Title}
                  />
                </div>
              ) : (
                <div style={{ width: "min(500px, 100%)" }}>
                  <Skeleton height={250} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="what-learn pt-50 pb-50 tp-section">
        <div className="container">
          <div className="row pb-30 ">
            <div className="section-title-wraper text-center ">
              <div className="tp-section">
                <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
                  what you will learn
                </span>
                <h2 className="tp-section__title mb-md-40 mb-20">
                  What you will learn
                </h2>
              </div>
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col-lg-7">
              <div className="tp-section fullSyllabusDiv">
                {course?.Full_Syllabus?.Syllabus_Chapters.map((Syllabus, i) => {
                  return (
                    <div
                      className={`singleSyl ${i == 0 ? "open" : ""}`}
                      key={i}
                    >
                      <div className="title" onClick={ToggleOpenClass}>
                        <h5>{Syllabus?.Title}</h5>
                        <i
                          className="fa-solid fa-chevron-down rotateArrow"
                          id="rotateArrow"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </div>
                      <div className="desc mb-2 ">
                        <ul>
                          <ReactMarkdown
                            children={Syllabus?.Description}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            className="markdown"
                          />
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {progressCourse && progressCourse[0]?.Progress.slice(1) != 100 ? (
              <div className="col-lg-4 pt-lg-0 pt-4 checkboxContainer">
                <h4 className="mb-20">Save Your Progress</h4>

                {progress?.map((p, i) => {
                  return (
                    <div key={i} className="d-flex align-items-center mb-10">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        value={(i + 1) * 20}
                        checked={`${setChecked(i)}`}
                        onChange={(e) => savePr(e, i)}
                      />
                      <p className="mb-0 pl-10">20% completed </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="col-lg-4 pt-lg-0 pt-4 checkboxContainer">
                <h4 className="mb-20">Great work</h4>
                <p>you have successfully completed course</p>
                <CustomButton
                  text={"download Certificate"}
                  url={`/user/profile/certificates/courseid?courseid=${course?.id}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="user-review pt-50 pb-50 tp-section theme-bg-7"
        id="review"
        style={{
          scrollMarginBlockStart: headerHeight,
        }}
      >
        <div className="container">
          <div className="row pb-30">
            <div className="section-title-wraper text-center">
              <div className="tp-section">
                <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
                  Review
                </span>
                <h2 className="tp-section__title mb-md-40 mb-20">
                  Leave your experience
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 d-flex flex-row justify-content-center ">
              <form
                onSubmit={postTestimonial}
                className="review-form newsletterForm"
              >
                <textarea
                  name="review"
                  id=""
                  placeholder="Share details of your own experience"
                ></textarea>
                <div className="mb-2 d-flex align-items-center mb-10 justify-content-center">
                  <p className="mb-0 pe-3">Rate us: </p>
                  <ReactStars
                    key={userRating}
                    color={"#d3d3d0"}
                    count={5}
                    value={userRating}
                    size={24}
                    // edit={false}
                    activeColor="#ffa940"
                    onChange={(value) => {
                      setUserRating((prev) => (prev = value));
                    }}
                  />
                </div>
                <div className=" d-flex  justify-content-center">
                  <button type="submit" style={{ width: "150px" }}>
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lecture;
