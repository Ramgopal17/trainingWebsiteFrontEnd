import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const deleteUserWorkExperience = async (id) => {
  try {
    let result = await axios.delete(
      `${BackEndApi}/api/work-experience-of-users/${id}`,

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
