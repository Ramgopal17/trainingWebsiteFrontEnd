import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const postUserWorkExperience = async (data) => {
  // console.log(data);
  try {
    let result = await axios.post(
      `${BackEndApi}/api/work-experience-of-users`,
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
