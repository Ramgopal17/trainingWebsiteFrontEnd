import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const postProgress = async (userId, courseId, courseName) => {
  // console.log(userId, courseId, courseName);
  let data = {
    data: {
      Progress: "P0",
      Course_Title: courseName,
      User: {
        connect: [userId],
      },
      Course_Detail: {
        connect: [courseId],
      },
    },
  };

  try {
    let result = await axios.post(
      `${BackEndApi}/api/course-progress-statuses?populate=*`,
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
