import findHeaderHeight from "@/hooks/find-header-height";
import {
  clearError,
  isFormValid,
  userPasswordConfValidation,
  userPasswordValidation,
} from "@/utils/FormValidation";
import { showHidePassword } from "@/utils/toggle-sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";
import Swal from "sweetalert2";
function ResetPassword() {
  const router = useRouter();
  const [headerHeight, setHeaderHeight] = useState(110);
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
  }, []);
  const userResetPassword = async (e) => {
    e.preventDefault();
    // console.log(router.query);
    try {
      const isValid = isFormValid(e);
      if (isValid) {
        // Request Body

        const body = {
          code: router.query?.code,
          password: e.target.password.value,
          passwordConfirmation: e.target.passwordConfirmation.value,
        };
        // console.log("reset body", body);
        const response = await axios.post(
          `${BackEndApi}/api/auth/reset-password`,
          body,
          config
        );
        // console.log("resp", response);
        if (response) {
          // console.log("Password reset successful.");
          Swal.fire({
            icon: "success",
            title: "Password reset successful",
            text: "Now you have login with your new password",
            confirmButtonText: "OK",
          });
          router.push("/user/login");
        }
      }
    } catch (error) {
      console.error(error);
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
            <form onSubmit={userResetPassword} className="formValidate">
              <h2 className="pb-20 tp-section__title">Reset Password</h2>
              <p>Enter and confirm a new password for your account</p>
              <div className="passShowHideDiv">
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={showHidePassword}
                  isshow="false"
                ></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="resetMainPassword"
                  errordiv="errorResetPassword"
                  onBlur={(event) =>
                    userPasswordValidation(event, "errorResetPassword")
                  }
                  onFocus={() => clearError("errorResetPassword")}
                />
              </div>
              <p className="errorMessage" id="errorResetPassword">
                error div
              </p>
              <div className="passShowHideDiv">
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={showHidePassword}
                  isshow="false"
                ></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConfirmation"
                  errordiv="errorResetConfPassword"
                  onBlur={(event) =>
                    userPasswordConfValidation(
                      event,
                      "errorResetConfPassword",
                      "resetMainPassword"
                    )
                  }
                  onFocus={() => clearError("errorResetConfPassword")}
                />
              </div>
              <p className="errorMessage" id="errorResetConfPassword">
                error div
              </p>

              <button type="submit" className="mt-20">
                Reset
              </button>
            </form>
          </div>
          <div className="imgDiv col-7 d-none d-lg-block"></div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
