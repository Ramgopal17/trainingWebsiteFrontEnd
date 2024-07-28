import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllUserCourses = async (uuid) => {
  let courses = await axios.get(
    `${BackEndApi}/api/users?filters[Uuid][$eq]=${uuid}&populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters,Course_Image,Testimonials,Course_Progress_Status`,
    // `${BackEndApi}/api/users?filters[Uuid][$eq]=${uuid}&populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters,Course_Image,Testimonials,Course_Progress_Status`,
    // `${BackEndApi}/api/users?filters[Uuid][$eq]=${uuid}&populate=*`,
    config
  );
  // console.log("user course", courses);
  // console.log("user course", courses?.data[0]?.Course_Details);
  return courses?.data[0]?.Course_Details || [];
};
