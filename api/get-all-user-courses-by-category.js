import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";
import { getAllUserCourses } from "./get-all-user-course";
import { getAllUserCoursesWithProcess } from "./get-all-user-courses-with-progess";

export const getAllUserCoursesByCategory = async (id, progress) => {
  // console.log("in fun", slug);
  let allCoursesTemp = await getAllUserCoursesWithProcess(id);
  let allCourses = allCoursesTemp?.Course_Details;
  let progressTemp = allCoursesTemp?.Course_Progress_Status;
  // console.log("progress course", allCourses, progressTemp);
  // return allCourses?.data?.data[0]?.attributes?.Course_Details?.data || [];   [0].Course_Progress_Status[0].Progress

  let progressCourse = [];

  let tempCoursesData = [];

  if (progress == "completed") {
    progressTemp.map((data) => {
      // console.log("data", data?.Progress.slice(1));
      if (data?.Progress.slice(1) == 100) {
        tempCoursesData.push(data?.Course_Title);
      }
      // console.log(tempCoursesData);
    });

    progressCourse = allCourses.filter(
      // (course) => (course?.Course_Progress_Status[0]?.Progress).slice(1) == 100
      (course) => tempCoursesData.includes(course?.Title)
    );
  } else if (progress == "inprogess") {
    progressTemp.map((data) => {
      // console.log("data", data?.Progress.slice(1));
      if (data?.Progress.slice(1) > 0 && data?.Progress.slice(1) < 100) {
        tempCoursesData.push(data?.Course_Title);
      }
      // console.log(tempCoursesData);
    });
    progressCourse = allCourses.filter(
      // (course) =>
      //   (course?.Course_Progress_Status[0]?.Progress).slice(1) > 0 &&
      //   (course?.Course_Progress_Status[0]?.Progress).slice(1) < 100
      (course) => tempCoursesData.includes(course?.Title)
    );
  } else if (progress == "notstarted") {
    progressTemp.map((data) => {
      // console.log("data", data?.Progress.slice(1));
      if (data?.Progress.slice(1) == 0) {
        tempCoursesData.push(data?.Course_Title);
      }
      // console.log(tempCoursesData);
    });
    progressCourse = allCourses.filter(
      // (course) => (course?.Course_Progress_Status[0]?.Progress).slice(1) == 0
      (course) => tempCoursesData.includes(course?.Title)
    );
  }

  // console.log(progressCourse);
  return progressCourse || [];
};
