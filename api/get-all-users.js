import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllUsers = async () => {
  let users = [];
  users = await axios.get(`${BackEndApi}/api/users?populate=*`, config);
  // console.log("Dfsd", users.data);
  return users?.data;
};
