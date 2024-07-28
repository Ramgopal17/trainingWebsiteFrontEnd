import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllUserCoursesWithProcess = async (id) => {
  let courses = await axios.get(
    `${BackEndApi}/api/users/${id}?populate[Course_Details][populate]=*&populate[Course_Progress_Status][populate]=Course_Title`,
    config
  );
  // console.log("user course", courses);
  // console.log("user course with progess", courses?.data);
  return courses?.data || [];
};
