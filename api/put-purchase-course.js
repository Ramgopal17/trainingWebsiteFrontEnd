import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";
import { postUserCourseProgress } from "./post-user-course-progress";
import { postProgress } from "./post-progress";
import { getAllDataOfLoginUsers } from "./get-all-data-of-login-user";

export const putPurchaseCourse = async (userId, courseId) => {
  // console.log("hhhhhhhhhhhh", userId);
  const data = {
    User: { connect: [userId] },
  };
  try {
    let result = await axios.put(
      `${BackEndApi}/api/course-details/${courseId}?populate=*`,
      { data },
      config
    );
    if (result) {
      // console.log(result);

      let res = await postProgress(
        userId,
        result.data.data.id,
        result.data.data.attributes.Title
      );

      if (res) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error.Message);
    return false;
  }
};
