import { getAllUsers } from "@/api/get-all-users";

import {
  fetchLoggedInUser,
  getEmailLocalStorage,
  setEmailLocalStorage,
  setLocalUser,
  setToken,
  verifyToken,
} from "@/api/manage-session";
import { useAuthContext } from "@/context/Auth-context";
import findHeaderHeight from "@/hooks/find-header-height";
import {
  BackEndApi,
  authentication_token,
  config,
} from "@/src/data/auth_token";
import {
  clearError,
  isFormValid,
  userEmailValidation,
  userPasswordValidation,
} from "@/utils/FormValidation";
import { showHidePassword } from "@/utils/toggle-sidebar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OtpGenerator from "./otp-generator/otp-generator";
import { authenticator, totp } from "otplib";
import Swal from "sweetalert2";
import { AddOTPInputsFun } from "@/public/assets/js/otp-script";
function SignIn() {
  const [tempUser, setTempUser] = useState({});
  const hideOtpBtn = () => {
    const email = document.getElementById("emailInp");
    const pass = document.getElementById("passInp");
    if (email.value.length > 0 && pass.value.length > 0) {
      const ErrorMsg = document.getElementsByClassName("errorMessage");
      let count = 0;
      for (let ele of ErrorMsg) {
        if (ele.style.display == "block") count++;
      }
      if (count == 0) {
        const verifyBtn = document.getElementById("verify-btn");

        const otpInputsDiv = document.getElementById("otp-form-div");
        const otpSendButton = document.getElementById("sendOTPBtn");
        const passInpDiv = document.getElementById("passInpDiv");
        // console.log("otpSendButton", otpSendButton);
        // e.target.style.display = "none";
        otpSendButton.style.display = "none";
        otpSendButton.setAttribute("type", "button");
        email.style.display = "none";
        pass.style.display = "none";
        passInpDiv.style.display = "none";
        verifyBtn.style.display = "block";
        otpInputsDiv.style.display = "flex";
        generateOTP();
      }
    } else {
      // alert("Enter email & password");
      Swal.fire({
        icon: "error",
        title: "Enter email & password",
        confirmButtonText: "OK",
      });
    }
  };
  const router = useRouter();
  const { user, isLoading, setUser } = useAuthContext();
  const [headerHeight, setHeaderHeight] = useState(110);
  const [userEmail, setUserEmail] = useState("");

  // =================otp functions========================
  const [otpTimestamp, setOTPTimestamp] = useState(null);
  const [otp, setOTP] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [otpVerified, setOTPVerified] = useState(false);
  const [message, setMessage] = useState("");
  const generateOTP = () => {
    const secret = "Meta@1234"; // Replace with your secret key
    const generatedOTP = totp.generate(secret);
    setOTP(generatedOTP);
    setOTPTimestamp(Date.now()); // Record the OTP creation timestamp

    // Send OTP via email
    sendEmail(generatedOTP);
  };

  const sendEmail = async (otp) => {
    let config = {
      // Host: "smtp.elasticemail.com",
      // Username: "jobs@metapercept.com",
      // Password: "0F563091426DC166D1601E5583DDC627B290",
      // To: "omkar.s@metapercept.com",
      // From: `jobs@metapercept.com`,
      Host: "smtp.elasticemail.com",
      Username: "ram.gk@metapercept.com",
      Password: "7E5A1F5255064ED8921CE7F994F0EE89CC52",
      To: userEmail,
      From: `ram.gk@metapercept.com`,
      Subject: `OTP for login  `,
      // Body: `your otp  ${otp}`,
      Body: `
        <p>Hi,</p>
        <p>Thank you for connecting with Metapercept Technology Services LLP. </p>
        <p>Use the following OTP to complete your Sign In procedure.</p>
        <p>OTP is valid for 5 minutes.</p>
       
          <button style="color:#324da0; background-color:#fee4a9; padding:5px 10px; font-size:20px; border:none; outline:none; border-radius:8px">${otp}</button>
        
        <br />
        <p>Regards,</p>
        <p>Metapercept Technology Services LLP</p>
      `,
    };
    // console.log(otp);
    if (window.Email) {
      await window.Email.send(config)
        .then(() => {
          // console.log("Email sent");
          Swal.fire({
            icon: "success",
            title: "OTP sent",
            text: "OTP sent successfully to your email address",
            confirmButtonText: "OK",
          });
          return "email sent succesfully";
        })
        .catch(() => {
          // console.log("Email unsent");
          Swal.fire({
            icon: "error",
            title: "OTP not sent",
            text: "Something went wrong in sending OTP",
            confirmButtonText: "OK",
          });
          return "email failed";
        });
    }
  };

  const getuserOTP = () => {
    var emailOtpInputs = document.querySelectorAll(".email-otp-input");
    // console.log(emailOtpInputs);
    let otpValue = "";

    emailOtpInputs.forEach(function (input) {
      // console.log(input.value);
      otpValue += input.value;
    });
    // console.log(otpValue);
    return otpValue;
  };

  const handleVerifyOTP = () => {
    const userOtpINP = getuserOTP();
    // console.log("otp", otp);
    // console.log("userotp", userOtpINP);

    if (otp.length == 6 && otp === userOtpINP) {
      setOTPVerified(true);
      setMessage("OTP is correct!");
      setToken(tempToken);
      setUser(tempUser);

      // setLocalUser(tempUser);
      router.push(`/user/profile?id=${tempUser?.Uuid}`);
      return true;
    } else {
      setOTPVerified(false);
      setMessage("OTP is incorrect. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Incorrect OTP",
        text: "Please enter correct OTP",
        confirmButtonText: "OK",
      });
      return false;
    }
  };
  // =================otp functions========================

  useEffect(() => {
    // cookies.set("my-cookie", "my-value");
    console.log("cookies");
    // getuserOTP();
    setHeaderHeight(findHeaderHeight());
    AddOTPInputsFun();
    const localEmail = getEmailLocalStorage();
    if (localEmail) {
      setUserEmail(localEmail);
    }
    // console.log("load", user);
    const checkValidity = () => {
      if (otpTimestamp) {
        const currentTime = Date.now();
        const timeDifference = (currentTime - otpTimestamp) / 1000; // Convert to seconds
        if (timeDifference >= 600) {
          // OTP is valid for 10 minutes (600 seconds)
          setOTP("");
          setOTPTimestamp(null);
          setOTPVerified(false);
          setMessage("");
        }
      }
    };

    const intervalId = setInterval(checkValidity, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [otpTimestamp]);
  // console.log(headerHeight);
  const userSignIn = async (e) => {
    // console.log(e);
    e.preventDefault();
    try {
      let isUserPresent = false;
      let userData = {};
      const isValid = isFormValid(e);

      if (isValid) {
        // Request Body
        const body = {
          identifier: e.target.identifier.value,
          password: e.target.password.value,
        };
        const users = await getAllUsers();

        for (const user of users) {
          if (user?.email == body.identifier) {
            isUserPresent = true;
            userData = user;
            // console.log("check for felte", user);
            setTempUser(user);

            break;
          }
        }
        // console.log(isUserPresent);
        if (isUserPresent) {
          if (userData?.isActive) {
            try {
              // =================checkotp=============

              // if (handleVerifyOTP()) {
              const response = await axios.post(
                `${BackEndApi}/api/auth/local`,
                body,
                config
              );
              // console.log("resp", response);
              if (response) {
                // console.log("successful login", response);
                // setToken(response.data.jwt);
                // console.log("successful login token", response.data.jwt);
                setTempToken(response.data.jwt);
                setEmailLocalStorage(body.identifier);
                // router.push("/");
                // setUser(userData);
                hideOtpBtn();
              }
              // } else {
              //   alert("otp verification failed");
              // }
              // =================checkotp=============
            } catch (error) {
              // alert("password incorrect");
              // console.log("inopass", error);
              Swal.fire({
                icon: "error",
                title: "Incorrect Password",
                text: "Please enter correct password",
                confirmButtonText: "OK",
              });
            }
          } else {
            Swal.fire({
              icon: "error",
              title: "Deleted Account",
              text: "This account has been deleted",
              confirmButtonText: "OK",
            });
          }
        } else {
          // alert("this email is not registered");
          Swal.fire({
            icon: "error",
            title: "This email is not registered",
            text: "Please enter correct Email or create a new account",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error(error);
      // setError(error?.message ?? "Something went wrong!");
    }
    // finally {
    //   setIsLoading(false);
    // }
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
              onSubmit={userSignIn}
              className="formValidate"
              name="signInWithOTP"
              id="signInWithOTPForm"
            >
              <h2 className="tp-section__title">Sign In</h2>
              <div className="social-container">
                {/* <a href="#" className="social google">
                  <i className="fab fa-google-plus-g"></i>
                </a> */}
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
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                name="identifier"
                errordiv="errorSignUpEMAIL"
                onBlur={(event) =>
                  userEmailValidation(event, "errorSignUpEMAIL")
                }
                onFocus={() => clearError("errorSignUpEMAIL")}
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                id="emailInp"
              />
              <p className="errorMessage" id="errorSignUpEMAIL">
                error div
              </p>
              <div className="passShowHideDiv" id="passInpDiv">
                <i
                  className="fa-solid fa-eye-slash"
                  onClick={showHidePassword}
                  isshow="false"
                ></i>
                <input
                  type="password"
                  id="passInp"
                  placeholder="Password"
                  name="password"
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
              <OtpGenerator generateOTP={generateOTP} />
              <button
                className="mt-20"
                id="verify-btn"
                type="button"
                onClick={handleVerifyOTP}
              >
                Verify & Sign In
              </button>
              <button type="submit" className="mt-20" id="sendOTPBtn">
                Send OTP
              </button>
              <Link href="/user/forgot-password" className="redirectLink">
                Forgot your password?
              </Link>
              <p className="">
                Don't have an account?{" "}
                <Link href="/user/signup" className="redirectLink">
                  Sign Up
                </Link>
              </p>
              {/* <button onClick={handleVerifyOTP} type="button">
                Verify OTP
              </button>
              <p>{message}</p>
              {otpVerified && <p>OTP is correct!</p>} */}
            </form>
          </div>
          <div className="imgDiv col-7 d-none d-lg-block">
            {/* <img
              src="/assets/img/about-us/industries/edu.jpg"
              alt=""
              style={{ width: "100%" }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
