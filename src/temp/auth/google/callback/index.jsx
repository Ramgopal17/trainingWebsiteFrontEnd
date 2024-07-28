import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import axios from "axios";
import { setToken } from "@/api/manage-session";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "@/context/Auth-context";
import {
  BackEndApi,
  authentication_token,
  config,
} from "@/src/data/auth_token";
function index({}) {
  const { setUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    let [first, ...rest] = router.asPath.split("=");
    rest = rest.join("=");
    // console.log(rest);
    axios({
      method: "GET",
      url: `https://training-appadmin.techpubconnect.org/api/auth/google/callback?id_token=${rest}`,
    })
      .then(async (res) => {
        // res.data;
        let resUserData = res?.data;
        // let userData ={}
        // console.log(resUserData);
        if (!resUserData?.user?.Uuid) {
          try {
            let result = await axios.put(
              `${BackEndApi}/api/users/${resUserData?.user?.id}?populate=*`,
              {
                Uuid: uuidv4(),
              },
              config
            );
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: "Please try again",
              confirmButtonText: "OK",
            });
            router.push("/");
          }
        }

        if (resUserData?.user?.isActive) {
          try {
            setToken(resUserData?.jwt);
            setUser(resUserData?.user);
            router.push(`/user/profile?id=${resUserData?.user?.Uuid}`);
          } catch (error) {
            // alert("password incorrect");
            // console.log("inopass", error);
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: "Please try again",
              confirmButtonText: "OK",
            });
            router.push("/");
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Deleted Account",
            text: "This account has been deleted",
            confirmButtonText: "OK",
          });
          router.push("/user/login");
        }
      })
      .catch((error) => {
        // console.log(error?.response?.data?.error?.message);
        // console.log(error);
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.error?.name || "Something went wrong",
          text: error?.response?.data?.error?.message || "Please try again",
          confirmButtonText: "OK",
        });
        router.push("/");
      });
  }, []);

  return <div></div>;
}

export default index;
