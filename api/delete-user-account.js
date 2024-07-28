import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const deleteUserAccount = async (userId) => {
  // console.log("hhhhhhhhhhhh", userId);
  const data = {
    isActive: "false",
  };
  try {
    let result = await axios.put(
      `${BackEndApi}/api/users/${userId}`,
      data,
      config
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error.Message);
    return false;
  }
};
