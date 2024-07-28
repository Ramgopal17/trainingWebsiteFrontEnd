import { getAllUsers } from "@/api/get-all-users";
import { getEmailLocalStorage } from "@/api/manage-session";
import findHeaderHeight from "@/hooks/find-header-height";
import Loader from "@/src/common/loader";
import { BackEndApi, config } from "@/src/data/auth_token";
import {
  clearError,
  isFormValid,
  userEmailValidation,
} from "@/utils/FormValidation";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [headerHeight, setHeaderHeight] = useState(110);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
    const localEmail = getEmailLocalStorage();
    if (localEmail) {
      setUserEmail(localEmail);
    }
  }, []);
  const userForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let isUserPresent = false;
      const isValid = isFormValid(e);
      if (isValid) {
        // Request Body
        // console.log("valid forgot");
        const body = {
          email: e.target.email.value,
        };
        const users = await getAllUsers();
        for (const user of users) {
          if (user?.email == body.email) {
            isUserPresent = true;
            // console.log("user present");
            break;
          }
        }
        if (isUserPresent) {
          const response = await axios.post(
            `${BackEndApi}/api/auth/forgot-password`,
            body,
            config
          );
          // console.log("resp", response);
          if (response) {
            // alert("Password reset link sent to email.");
            Swal.fire({
              icon: "success",
              title: "Password reset link sent to email.",
              text: "Please check your email to reset your password",
              confirmButtonText: "OK",
            });
          }
        } else {
          // alert("this email is not registered");
          Swal.fire({
            icon: "error",
            title: "This email is not registered",
            text: "Please enter correct email address",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error?.response?.data?.error?.message,
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <style jsx global>
        {`
          .insideContainer {
            min-height: calc(100vh - ${headerHeight});
          }
        `}
      </style>
      <div className="container-fluid loginFormDiv">
        <div className="insideContainer row">
          <div className="formDiv d-flex justify-content-center pt-50 col-lg-5 col-12 tp-section">
            <form onSubmit={userForgotPassword} className="formValidate">
              <h2 className="pb-20 tp-section__title">Forgot your Password?</h2>
              <p>
                Don’t worry, resetting your password is easy. <br /> Enter your
                email address to receive a password reset link.
              </p>

              <input
                type="email"
                name="email"
                placeholder="Email"
                errordiv="errorForgotPassEmail"
                onBlur={(event) =>
                  userEmailValidation(event, "errorForgotPassEmail")
                }
                onFocus={() => clearError("errorForgotPassEmail")}
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
              />
              <p className="errorMessage" id="errorForgotPassEmail">
                error div
              </p>

              {loading ? (
                <Loader />
              ) : (
                <button className="mt-20">Send Link</button>
              )}
              <p className="pt-20 pb-20">
                Already have an account?{" "}
                <Link href="/user/login" className="redirectLink">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
          <div className="imgDiv col-7 d-none d-lg-block"></div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
