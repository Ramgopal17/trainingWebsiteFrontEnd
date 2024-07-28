import { getUserProcesses } from "@/api/get-user-progresses";
import { postUserCourseProgress } from "@/api/post-user-course-progress";
import { useAuthContext } from "@/context/Auth-context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SaveProgress({ course, setReRender, reRender, progressCourse }) {
  const { user } = useAuthContext();
  const router = useRouter();
  // console.log("lecture ", progressCourse);
  // const [progressCourse, setProgressCourse] = useState({});
  const progress = [0, 0, 0, 0, 0];
  const [progressUser, setProgress] = useState(router?.query?.progress);

  // const setProgressCourseCall = () => {
  //   course?.Course_Progress_Status?.map((course_progress) => {
  //     if (course_progress?.Course_Title == course?.Title) {
  //       setProgressCourse(course_progress);
  //     }
  //   });
  // };

  const setChecked = (i, value) => {
    // course?.Course_Progress_Status &&
    // (course?.Course_Progress_Status[0]?.Progress).slice(1) >= (i + 1) * 20
    // progressCourse &&

    // if (progressCourse?.Progress?.slice(1) >= (i + 1) * 20) {
    if (progressUser >= (i + 1) * 20) {
      progress[i] = 1;
      // setProgress((i + 1) * 20);
      // console.log("checked", progressUser);
      // let value = (i + 1) * 20;
      // router.replace({
      //   query: { ...router.query, progress: value },
      // });
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
    // console.log(
    //   "progess in ",
    //   e.target.value,
    //   (course?.Course_Progress_Status[0]?.Progress).slice(1),
    //   e.target.value >= (course?.Course_Progress_Status[0]?.Progress).slice(1),
    //   e.target.value > progressCourse?.Progress?.slice(1)
    // );
    if (isPrevComplete) {
      // setProgress((prog) =>
      //   prog.map((value, index) => (i == index ? 1 : value))
      // );
      // (course?.Course_Progress_Status[0]?.Progress).slice(1) ||
      // e.target.value > progressCourse?.Progress?.slice(1) ||
      if (e.target.value > router?.query?.progress || e.target.value == 100) {
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
        setProgress(60);
        // postUserCourseProgress(course?.Course_Progress_Status[0]?.id, data);

        setReRender(!reRender);
      } else {
        Swal.fire({
          icon: "warning",
          title: "cannot undone progress  ",
          text: "Please complete the previous progress first",
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
  // const getProcesses = async () => {
  //   const processes = await getUserProcesses(user?.id);
  //   let progress = await processes?.filter(
  //     (Pros) => Pros?.Course_Title == course?.Title
  //   );
  //   console.log("prLecture", progress[0]);
  //   setProgressCourse(progress[0]);
  // };
  useEffect(() => {
    // console.log("ready", course);
    // setProgressCourseCall();
    // getProcesses();
  }, [reRender]);
  return (
    <div className="col-lg-4 checkboxContainer">
      <h4 className="mb-20">Save Your Progress</h4>

      {progress?.map((p, i) => {
        return (
          <div key={i} className="d-flex align-items-center mb-10">
            <input
              type="checkbox"
              name=""
              id=""
              value={(i + 1) * 20}
              // checked={`${progress[i] ? "checked" : ""}`}
              // checked={`${setChecked(i, (i + 1) * 20)}`}
              onChange={(e) => savePr(e, i)}
            />
            <p className="mb-0 pl-10">20% completed </p>
          </div>
        );
      })}
    </div>
  );
}

export default SaveProgress;
