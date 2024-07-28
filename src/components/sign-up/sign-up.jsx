import { getAllUsers } from "@/api/get-all-users";
import { setEmailLocalStorage } from "@/api/manage-session";
import findHeaderHeight from "@/hooks/find-header-height";
import { v4 as uuidv4 } from "uuid";
import { BackEndApi, config } from "@/src/data/auth_token";
import {
  clearError,
  firstNameValidation,
  isFormValid,
  lastNameValidation,
  phoneValidation,
  userEmailValidation,
  userNameValidation,
  userPasswordConfValidation,
  userPasswordValidation,
} from "@/utils/FormValidation";
import { showHidePassword } from "@/utils/toggle-sidebar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { eslint } from "@/next.config";

function SignUp() {
  const googleAuth = async () => {
    // "https://training-appadmin.techpubconnect.org/api/connect/google",
    const result = await axios.get(
      "http://localhost:1372/api/connect/google",
      // {
      //   headers: {
      //     "Access-Control-Allow-Origin": [
      //       "http://localhost:3000",
      //       "https://training-appadmin.techpubconnect.org",
      //     ],
      //     "Access-Control-Allow-Methods": "GET",
      //   },
      // }
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
    if (result) {
      // console.log(result);
    } else {
      // console.log("errrrrrrr");
    }
  };

  const router = useRouter();
  const [headerHeight, setHeaderHeight] = useState(110);
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
  }, []);

  const UserSignUp = async (e) => {
    e.preventDefault();
    let isUserPresent = false;
    const isValid = isFormValid(e);
    if (isValid) {
      // Request Body
      let userId = Math.floor(Math.random() * 10000 + 1);
      const body = {
        username: e.target.First_Name.value + userId,
        First_Name: e.target.First_Name.value,
        Last_Name: e.target.Last_Name.value,
        email: e.target.email.value,
        Phone: e.target.Phone.value,
        password: e.target.password.value,
        Uuid: uuidv4(),
      };
      // console.log(body);
      const users = await getAllUsers();

      for (const user of users) {
        if (user?.username == body.username) {
          // alert("username already exists");
          Swal.fire({
            icon: "warning",
            title: "username already exists",
            text: "This username already exists, please try another username.",
            confirmButtonText: "OK",
          });
          isUserPresent = true;
          break;
        }
      }
      for (const user of users) {
        if (user?.email == body.email) {
          // alert("email id already exists");
          Swal.fire({
            icon: "warning",
            title: "email id already exists",
            text: "This email already exists, please try another email.",
            confirmButtonText: "OK",
          });
          isUserPresent = true;
          break;
        }
      }
      if (!isUserPresent) {
        axios
          .post(`${BackEndApi}/api/auth/local/register`, body, config)
          .then((res) => {
            setEmailLocalStorage(body.email);
            Swal.fire({
              icon: "success",
              title: "Account created Successfully",
              text: "Please login to view your profile.",
              confirmButtonText: "OK",
            });
            router.push("/user/login");
            // console.log("res", res);
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Something went wrong",
              text: "Please try again.",
              confirmButtonText: "OK",
            });
            // console.log("err", err);
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: "Please fill the form correctly before registration",
        confirmButtonText: "OK",
      });
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
            <form
              onSubmit={UserSignUp}
              className="formValidate"
              name="signUpForm"
            >
              <h2 className="tp-section__title">Register</h2>
              <div className="social-container">
                {/* <a
                  // href="https://training-appadmin.techpubconnect.org/api/connect/google"
                  href="#"
                  className="social google"
                > */}
                <div
                  className="social google googleLoginDiv"
                  // onClick={googleAuth}
                  onClick={() =>
                    (window.location =
                      "https://training-appadmin.techpubconnect.org/api/connect/google")
                  }
                >
                  <i className="fab fa-google-plus-g"></i>
                </div>
                {/* </a> */}
                {/* <a href="#" className="social linkedin">
                  <i className="fab fa-linkedin-in"></i>
                </a> */}
              </div>
              <span>or fill up the information below to create an account</span>
              {/* <input
                name="username"
                type="text"
                placeholder="User Name"
                errordiv="errorSignUpUsername"
                onBlur={(event) =>
                  userNameValidation(event, "errorSignUpUsername")
                }
                onFocus={() => clearError("errorSignUpUsername")}
              />
              <p
                className="errorMessage text-start mt-0"
                id="errorSignUpUsername"
              >
                error div
              </p> */}
              <div className="d-flex firstLastName flex-column flex-md-row ">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="First_Name"
                    errordiv="errorFIRSTNAME"
                    onBlur={firstNameValidation}
                    onFocus={() => clearError("errorFIRSTNAME")}
                  />
                  <p className="errorMessage " id="errorFIRSTNAME">
                    error div
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    errordiv="errorLASTNAME"
                    name="Last_Name"
                    onBlur={lastNameValidation}
                    onFocus={() => clearError("errorLASTNAME")}
                  />
                  <p className="errorMessage " id="errorLASTNAME">
                    error div
                  </p>
                </div>
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                errordiv="errorSignUpEMAIL"
                onBlur={(event) =>
                  userEmailValidation(event, "errorSignUpEMAIL")
                }
                onFocus={() => clearError("errorSignUpEMAIL")}
              />
              <p className="errorMessage" id="errorSignUpEMAIL">
                error div
              </p>
              <input
                type="text"
                name="Phone"
                id=""
                placeholder="Mobile Number"
                inputMode="numeric"
                errordiv="errorMOBILE"
                onBlur={phoneValidation}
                onFocus={() => clearError("errorMOBILE")}
              />
              <p className="errorMessage" id="errorMOBILE">
                error div
              </p>

              <div className="passShowHideDiv">
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={showHidePassword}
                  isshow="false"
                ></i>
                <input
                  name="password"
                  type="password"
                  id="signUpPassword"
                  placeholder="Password"
                  errordiv="errorSignUpPassword"
                  onBlur={(event) =>
                    userPasswordValidation(event, "errorSignUpPassword")
                  }
                  onFocus={() => clearError("errorSignUpPassword")}
                />
              </div>
              <p className="errorMessage" id="errorSignUpPassword">
                error div
              </p>
              <div className="passShowHideDiv">
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={showHidePassword}
                  isshow="false"
                ></i>
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  errordiv="errorSignUpConfPassword"
                  onBlur={(event) =>
                    userPasswordConfValidation(
                      event,
                      "errorSignUpConfPassword",
                      "signUpPassword"
                    )
                  }
                  onFocus={() => clearError("errorSignUpConfPassword")}
                />
              </div>
              <p className="errorMessage" id="errorSignUpConfPassword">
                error div
              </p>
              <button type="submit" className="mt-20">
                Sign Up
              </button>
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

export default SignUp;
