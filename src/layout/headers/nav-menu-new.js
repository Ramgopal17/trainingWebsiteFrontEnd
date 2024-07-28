import Link from "next/link";
import React, { useRef, useState } from "react";
import menu_data from "./menu-data-new";
import AllCoursesDropdown from "./all-courses-dropdown";
import { hideDropdown, showDropdown } from "./all-functions";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/Auth-context";
import UserProfileTab from "./user-profile-tab";
import DesktopDropdown from "./course-dropdown/desktop-dropdown";
import GoogleLangPicker from "./google-lang-picker";
import GoogleLangPickerWithFlag from "./google-lang-picker-with-flag";
const NavMenu = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  // console.log("hesd ", router.asPath);
  const passValueToSearch = (e) => {
    e.preventDefault();
    // console.log(e.target.elements[0].value);
    router.push(`/search?course=${e.target.elements[0].value}`);
  };
  return (
    <>
      <style jsx global>
        {`
          .search_topbar {
            width: 300px;
          }

          .allCoursesTag {
            font-size: 16px;
            font-weight: 400;
            text-transform: uppercase;
            cursor: pointer;
          }
          .allCoursesTag:hover {
            color: var(--tp-theme-redical);
          }
          .search_topbar form {
            box-shadow: none;
            margin-top: 13px;
            position: relative;
            background-clip: padding-box;
            display: inline-block;
            width: 100%;
          }
          .search_topbar input {
            border-radius: 4px;
            border: 1px solid #118aef;
            height: 38px;
            font-size: 14px;
            color: #118aef;
            font-weight: 400;
            padding-left: 50px;
            background: 0 0;
            width: 100%;
            float: left;
            outline: 0;
          }
          .search_topbar input {
            margin-bottom: 0;
          }
          .search_topbar button {
            position: absolute;
            left: 0;
            height: 38px;
            background: 0 0;
            border: 0;
            box-shadow: none;
            width: 52px;
            cursor: pointer;
            padding: 6px 12px;
            user-select: none;
          }
          .search_topbar button span {
            text-indent: -9999px;
            width: 25px;
            height: 23px;
            display: inline-block;
            background: url(/assets/img/header/header-new.svgz) no-repeat;
            background-position: -66px -20px !important;
            margin: -1px 5px;
          }
          .authBtn {
            display: flex !important;
            align-items: center;
            justify-content: end;
            gap: 15px;
          }
          .authBtn li {
            margin-right: 0 !important;
          }
          .isHome {
            color: var(--tp-theme-redical) !important;
            font-weight: 600 !important;
          }
          .authBtn a {
            padding: 8px 10px !important;
            border-radius: 8px;
            font-size: 13px !important;
            text-transform: capitalize !important;
          }

          .headerTabBtns {
            --tp-common-white: rgb(108, 96, 254);
            color: white !important;
            padding: 12px 15px;
            font-size: 13px;

            max-width: 100px !important;
            overflow: hidden;

            max-height: 51px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          @media (max-width: 1320px) {
            .search_topbar {
              width: 150px;
            }
          }
        `}
      </style>

      <ul>
        <li style={{ "--tp-theme-redical": "rgb(12,84,173)" }}>
          <Link
            href="/"
            className={`${router.asPath == "/" && !isDropDownOpen && "isHome"}`}
          >
            home
          </Link>
        </li>

        <li
          style={{
            "--tp-theme-redical": "rgb(12,84,173)",
            height: "100%",
            position: "relative",
          }}
          onMouseOver={() => {
            showDropdown();
            setIsDropDownOpen(true);
          }}
          onMouseLeave={() => {
            hideDropdown();
            setIsDropDownOpen(false);
          }}
        >
          <p className={`${isDropDownOpen && "isHome"} allCoursesTag`}>
            all courses{" "}
            <i
              className="fa-solid fa-chevron-down"
              style={{ fontSize: "20px" }}
            ></i>
          </p>
          {/* <img src="assets/img/right-arrow.png" alt="" className="courseImg" /> */}
          <DesktopDropdown />
        </li>
        <li style={{ "--tp-theme-redical": "rgb(12,84,173)" }}>
          <Link
            href="/corporate"
            className={`${
              (router.asPath == "/corporate/" ||
                router.asPath == "/corporate/#corporate-contact") &&
              !isDropDownOpen &&
              "isHome"
            }`}
          >
            For Corporate
          </Link>
        </li>
        <li style={{ "--tp-theme-redical": "rgb(12,84,173)" }}>
          <Link
            href="/campus"
            className={`${
              (router.asPath == "/campus/" ||
                router.asPath == "/campus/#campus-contact") &&
              !isDropDownOpen &&
              "isHome"
            }`}
          >
            For Campus
          </Link>
        </li>
        {/* <li className="search_topbar " style={{ marginRight: "0" }}> */}
        <li className="search_topbar search_topbarDesktop ">
          <form
            name="homepage-search-tag "
            onSubmit={passValueToSearch}
            className="d-flex align-items-center"
          >
            <input
              type="search"
              id="header_srch"
              autoComplete="off"
              aria-label="Search"
              className="form-control input-search-field "
              name="tag"
              placeholder="What do you want to learn?"
              style={{ boxShadow: "none" }}
            />
            <button type="submit" className="input-search-btn" title="search">
              <span className="search_icon input-search-icon"></span>
            </button>
          </form>
        </li>
        <li className="me-0 ">
          <GoogleLangPickerWithFlag />
        </li>
      </ul>
      {/* {user ? (
        <UserProfileTab />
      ) : (
        <ul className="authBtn">
          <li>
            <Link
              href="/user/login"
              className="tp-white-btn headerTabBtns"
              aria-label="read more"
            >
              LOG IN
            </Link>
          </li>
          <li>
            <Link
              href="/user/signup"
              className="tp-white-btn headerTabBtns"
              aria-label="read more"
            >
              JOIN FREE
            </Link>
          </li>
        </ul>
      )} */}
    </>
  );
};

export default NavMenu;

{
  /* <ul className="authBtn">
          <li>
            <Link
              href="/user/login"
              style={{
                "--tp-common-white": "rgb(108,96,254)",
                color: "white",
                padding: "12px 15px",
                fontSize: "13px",
              }}
              className="tp-white-btn"
              aria-label="read more"
            >
              Log Out
            </Link>
          </li>
        </ul> */
}
