import { getAllUserCourses } from "./get-all-user-course";

export const getParticularUserCourse = async (Uuid, courseId) => {
  const allCourses = await getAllUserCourses(Uuid);
  const course = allCourses?.find((course) => course?.id == courseId) || {};
  // console.log(course);
  return course;
};
