import { showSidebar } from "@/utils/toggle-sidebar";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import findHeaderHeight from "@/hooks/find-header-height";
import {
  clearError,
  isFormValid,
  userPasswordConfValidation,
  userPasswordValidation,
} from "@/utils/FormValidation";
import { BackEndApi, config } from "@/src/data/auth_token";
import { getToken, removeToken } from "@/api/manage-session";
import { useAuthContext } from "@/context/Auth-context";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function ChangePassword() {
  const router = useRouter();
  const [headerHeight, setHeaderHeight] = useState(110);
  const { setUser, user } = useAuthContext();
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
    // console.log("user", user);
  });
  const userChangePassword = async (e) => {
    e.preventDefault();

    try {
      const isValid = isFormValid(e);
      if (isValid) {
        // Request Body

        const body = {
          currentPassword: e.target.currentPassword.value,
          password: e.target.password.value,
          passwordConfirmation: e.target.passwordConfirmation.value,
        };
        const response = await axios.post(
          `${BackEndApi}/api/auth/change-password`,
          body,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        // console.log("resp", response);
        if (response) {
          // console.log("Password reset successful.");
          Swal.fire({
            icon: "success",
            title: "Password change successful",
            text: "Please login again to see your profile.",
            confirmButtonText: "OK",
          });
          removeToken();

          setUser(null);
          router.push("/user/login");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <style jsx global>
        {`
          .adjustMinHeight {
            min-height: calc(100vh - ${headerHeight});
          }
        `}
      </style>
      <div className="profileDiv">
        <i
          className="fa-solid fa-bars sidebarOpenBtn d-lg-none"
          onClick={showSidebar}
        ></i>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-0 adjustMinHeight">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className="InfoDiv tp-section it-cta-form mt-0">
                <form onSubmit={userChangePassword} className="formValidate">
                  <div className="row">
                    <div className="col-12 ">
                      <div className="row input-item align-items-center">
                        <div className="col-md-4 ">
                          <p className="mb-0">Old Password</p>
                        </div>
                        <div className="col-md-8 ">
                          <input
                            type="password"
                            className="textInp"
                            name="currentPassword"
                            errordiv="errorChangePasswordOld"
                            onBlur={(event) =>
                              userPasswordValidation(
                                event,
                                "errorChangePasswordOld"
                              )
                            }
                            onFocus={() => clearError("errorChangePasswordOld")}
                          />
                          <p
                            className="errorMessage"
                            id="errorChangePasswordOld"
                          >
                            error div
                          </p>
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-md-4 ">
                          <p className="mb-0">New Password</p>
                        </div>
                        <div className="col-md-8 ">
                          <input
                            type="password"
                            className="textInp"
                            id="ChangePasswordNew"
                            name="password"
                            errordiv="errorChangePasswordNew"
                            onBlur={(event) =>
                              userPasswordValidation(
                                event,
                                "errorChangePasswordNew"
                              )
                            }
                            onFocus={() => clearError("errorChangePasswordNew")}
                          />
                          <p
                            className="errorMessage"
                            id="errorChangePasswordNew"
                          >
                            error div
                          </p>
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-md-4 ">
                          <p className="mb-0">Confirm Password</p>
                        </div>
                        <div className="col-md-8 ">
                          <input
                            type="password"
                            className="textInp"
                            name="passwordConfirmation"
                            errordiv="errorChangeConfPassword"
                            onBlur={(event) =>
                              userPasswordConfValidation(
                                event,
                                "errorChangeConfPassword",
                                "ChangePasswordNew"
                              )
                            }
                            onFocus={() =>
                              clearError("errorChangeConfPassword")
                            }
                          />

                          <p
                            className="errorMessage"
                            id="errorChangeConfPassword"
                          >
                            error div
                          </p>
                        </div>
                      </div>
                      <div className="row input-item newsletterForm mt-50">
                        <div className="col-md-4">
                          <button type="submit">Change Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;

// return (
//   <div className="profileDiv">
//     <i
//       className="fa-solid fa-bars sidebarOpenBtn d-lg-none"
//       onClick={showSidebar}
//     ></i>
//     <div className="container ">
//       <div className="row">
//         <div className="col-lg-3 col-0">
//           <Sidebar />
//         </div>
//         <div className="col-lg-9">
//           <div className="InfoDiv tp-section it-cta-form mt-0">
//             <form action="">
//               <div className="row">

//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );
