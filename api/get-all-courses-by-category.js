// http://localhost:1337/api/categories?filters[Slug][$eq]=technical-writing&populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters

import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllCoursesByCategory = async (slug) => {
  // console.log("in fun", slug);
  let allCourses = await axios.get(
    `${BackEndApi}/api/categories?filters[Slug][$eq]=${slug}&populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters,Category,Testimonials`,
    config
  );
  // console.log("cat course", allCourses.data.data);
  return allCourses?.data?.data[0]?.attributes?.Course_Details?.data || [];
};
