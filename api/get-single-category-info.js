// http://localhost:1337/api/categories?filters[Slug][$eq]=technical-writing&populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters

import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getSingleCategoryInfo = async (slug) => {
  // console.log("in fun", slug);
  let categoryInfo = await axios.get(
    `${BackEndApi}/api/categories?filters[Slug][$eq]=${slug}&populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters,Category,Testimonials`,
    config
  );
  // console.log("cat info", categoryInfo.data.data[0]);
  return categoryInfo?.data?.data[0] || [];
};
