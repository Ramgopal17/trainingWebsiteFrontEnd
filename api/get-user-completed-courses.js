const { getAllUserCourses } = require("./get-all-user-course");

export const getUserAllCompletedCourses = async (uuid) => {
  let allCourses = await getAllUserCourses(uuid);
  // console.log("completed all course", allCourses);
  let completedCourse = allCourses?.filter(
    (course) => course?.Course_Progress_Status[0]?.Progress == "P100"
  );
  // console.log("completed course", completedCourse);
  return completedCourse || [];
};
