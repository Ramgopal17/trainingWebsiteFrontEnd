import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllCourses = async () => {
  let allCourses = await axios.get(
    `${BackEndApi}/api/course-details?populate[Full_Syllabus][populate]=Title,Syllabus_Chapters&populate[Category][populate]=Slug&populate[Testimonials][populate]=*`,
    config
  );
  // console.log("Dfsd", allCourses.data.data);
  return allCourses?.data?.data || [];
};
