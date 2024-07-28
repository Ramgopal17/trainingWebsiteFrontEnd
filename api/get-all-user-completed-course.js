import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";
import { getAllUserCourses } from "./get-all-user-course";
import { getAllUserCoursesWithProcess } from "./get-all-user-courses-with-progess";

export const getAllUserCompletedCourse = async (id) => {
  // console.log("in fun", slug);
  let allCoursesTemp = await getAllUserCoursesWithProcess(id);
  let allCourses = allCoursesTemp?.Course_Details;
  let progressTemp = allCoursesTemp?.Course_Progress_Status;
  // console.log("progress course", allCourses, progressTemp);

  let progressCourse = [];

  let tempCoursesData = [];

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
  return progressCourse || [];
};
