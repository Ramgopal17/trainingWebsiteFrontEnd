import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getUserProcesses = async (id) => {
  let courses = await axios.get(
    `${BackEndApi}/api/users/${id}?populate=Course_Progress_Status`,
    config
  );
  // console.log("user course", courses);
  // console.log("user all progess", courses?.data?.Course_Progress_Status);
  return courses?.data?.Course_Progress_Status || [];
};
