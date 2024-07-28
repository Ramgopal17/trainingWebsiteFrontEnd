import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const postUserCourseProgress = async (id, data) => {
  // console.log(data);
  try {
    let result = await axios.put(
      `${BackEndApi}/api/course-progress-statuses/${id}?populate=*`,
      data,
      config
    );
    if (result) {
      // console.log(result);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
