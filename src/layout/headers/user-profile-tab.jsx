import { removeToken } from "@/api/manage-session";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/Auth-context";
import Swal from "sweetalert2";
import { BackEndApi } from "@/src/data/auth_token";
function UserProfileTab() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  // console.log("User", user);
  const toggleMenu = () => {
    const menu = document.getElementById("userProfileDropDown");
    menu.classList.toggle("showProfileDropDown");
  };
  const logOut = () => {
    Swal.fire({
      title: "Log Out",
      icon: "warning",
      text: "Are you sure to log out",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        removeToken();
        // console.log("token removed");
        setUser(null);
        router.push("/");
      }
    });
  };

  // useEffect(() => {
  //   console.log("header", user);
  // });

  return (
    <>
      <style jsx global>
        {`
          .userProfileTab {
            position: relative;
            display: flex;
          }
          .userProfileTab .profileImg {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            border: 1px solid #e7e7e7;
          }
          .userProfileTab .dropDown {
            z-index: 500;
            display: none;
            min-width: 100px;
            position: absolute;
            bottom: 0;
            left: 0%;
            transform: translateY(100%);
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            overflow: hidden;
          }
          .showProfileDropDown {
            display: block !important;
          }
          .userProfileTab .dropDown ul li {
            margin-right: 0 !important;
          }
          .userProfileTab .dropDown ul li a {
            padding: 0 !important;
            width: 100%;
            text-transform: capitalize;
          }
          .userProfileTab .dropDown ul li p {
            margin: 0;
            padding: 10px;
            text-align: center;
            cursor: pointer;
          }
          .userProfileTab .dropDown ul li p:hover {
            background-color: #e6ecef;
          }
        `}
      </style>
      <div
        className="userProfileTab "
        // onMouseLeave={(e) => {
        //   document
        //     .getElementById("userProfileDropDown")
        //     .classList.remove("showProfileDropDown");
        // }}
      >
        <div
          className="d-flex align-items-center"
          onClick={toggleMenu}
          style={{ cursor: "pointer" }}
        >
          <img
            // src="/assets/img/profile-picture.png"
            src={`${
              user?.User_Image &&
              BackEndApi + user?.User_Image[0]?.formats?.thumbnail?.url
            }`}
            // src={tempUserProfile}
            onError={({ currentTarget }) => {
              currentTarget.src = "/assets/img/profile-picture.png";
            }}
            alt="user profile"
            className="profileImg"
          />
          <h5 className="pl-10 mb-0">{user?.First_Name || user?.username}</h5>
        </div>
        <div className="dropDown tp-section" id="userProfileDropDown">
          <ul
            className="d-flex flex-column "
            style={{ paddingLeft: 0, float: "none" }}
          >
            <li>
              <Link href={`/user/profile?id=${user?.Uuid}`}>
                <p>Profile</p>
              </Link>
            </li>
            <li onClick={logOut}>
              <p>Log Out</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserProfileTab;
