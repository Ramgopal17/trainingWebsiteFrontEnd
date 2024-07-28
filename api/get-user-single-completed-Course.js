import { getAllUserCompletedCourse } from "./get-all-user-completed-course";
import { getUserAllCompletedCourses } from "./get-user-completed-courses";

export const getUserSingleCompletedCourse = async (id, courseId) => {
  // console.log(uuid, courseId);
  let allCourses = await getAllUserCompletedCourse(id);
  // let allCourses = await getUserAllCompletedCourses(uuid);
  // console.log("singlecourse", allCourses);
  let singleCourse = allCourses.find((c) => c?.id == courseId) || {};
  // console.log("singlecourse2", singleCourse);
  return singleCourse;
};
