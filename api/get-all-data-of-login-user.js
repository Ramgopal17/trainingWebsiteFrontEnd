import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllDataOfLoginUsers = async (id) => {
  let users = [];
  users = await axios.get(`${BackEndApi}/api/users/${id}?populate=*`, config);
  // console.log("Dfsd login user", users.data);
  return users?.data;
};
