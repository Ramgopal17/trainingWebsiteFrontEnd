import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getNewCourses = async () => {
  let newCourses = await axios.get(
    `${BackEndApi}/api/course-details?sort[0]=createdAt:desc&populate=*`,
    config
  );
  // console.log("new courses", newCourses.data.data.slice(0, 6));
  return newCourses?.data?.data?.slice(0, 6) || [];
};
