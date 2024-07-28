import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const deleteUserAcademic = async (id) => {
  try {
    let result = await axios.delete(
      `${BackEndApi}/api/academics-of-users/${id}`,

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
