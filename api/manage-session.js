import { useAuthContext } from "@/context/Auth-context";
import { useRouter } from "next/router";
import { BackEndApi } from "@/src/data/auth_token";
var jwt = require("jsonwebtoken");

export const setToken = (token) => {
  sessionStorage.setItem("auth_token", token);
};

export const getToken = () => {
  return sessionStorage.getItem("auth_token");
};

export const removeToken = () => {
  sessionStorage.removeItem("auth_token");
};

// export const fetchLoggedInUser = async (token) => {
//   // setIsLoading(true);
//   try {
//     const response = await fetch(`${BackEndApi}/api/users/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     console.log(data);
//     // setUserData(data);
//   } catch (error) {
//     console.error(error);
//     message.error("Error While Getting Logged In User Details");
//   }
// };

export const setEmailLocalStorage = (email) => {
  localStorage.setItem("email", email);
};

export const getEmailLocalStorage = () => {
  return localStorage.getItem("email");
};

export const setLocalUser = (user) => {
  sessionStorage.setItem("user", user);
};

export const getLocalUser = () => {
  return localStorage.getItem("user");
};
