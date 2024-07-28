import React, { useEffect, useState } from "react";
import Link from "next/link";
// import menu_data from "./menu-data";
import menu_data from "./menu-data-new";
import { showDropdownCourseMobile } from "./all-functions";
import { useAuthContext } from "@/context/Auth-context";
import { useRouter } from "next/router";
import { removeToken } from "@/api/manage-session";
import Swal from "sweetalert2";
import GoogleLangPicker from "./google-lang-picker";
import { BackEndApi } from "@/src/data/auth_token";
import GoogleLangPickerWithFlag from "./google-lang-picker-with-flag";
// internal

const MobileMenus = ({ isActive }) => {
  const router = useRouter();

  const { user, setUser } = useAuthContext();
  // console.log("in mob view", user);
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
    // removeToken();
    // // console.log("token removed");
    // setUser(null);
    // router.push("/");
  };
  const passValueToSearch = (e) => {
    e.preventDefault();
    // console.log(e.target.elements[0].value);
    router.push(`/search?course=${e.target.elements[0].value}`);
  };

  // const { isFallback, events } = useRouter();

  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: "true",
  //       includedLanguages: "en,es,de,fr",
  //       layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
  //     },
  //     "google_translate_element2"
  //   );
  // };
  // useEffect(() => {
  //   if (isActive) {
  //     console.log("IN USE");
  //     const id = "google-translate-script";

  //     const addScript = () => {
  //       const s = document.createElement("script");
  //       s.setAttribute(
  //         "src",
  //         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //       );
  //       s.setAttribute("id", id);
  //       const q = document.getElementById(id);
  //       if (!q) {
  //         document.body.appendChild(s);
  //         window.googleTranslateElementInit = googleTranslateElementInit;
  //       }
  //     };

  //     const removeScript = () => {
  //       const q = document.getElementById(id);
  //       if (q) q.remove();
  //       const w = document.getElementById("google_translate_element2");
  //       console.log("first", w);
  //       if (w) w.innerHTML = "";
  //     };

  //     isFallback || addScript();

  //     // removeScript();
  //     // addScript();
  //     events.on("routeChangeStart", removeScript);
  //     events.on("routeChangeComplete", addScript);
  //     return () => {
  //       events.off("routeChangeStart", removeScript);
  //       events.off("routeChangeComplete", addScript);
  //     };
  //   }
  // }, []);
  // useEffect(() => {
  // Get the element
  // var elem = document.querySelector("#google_translate_element");
  // console.log(elem.style.display);
  // console.log(getComputedStyle(elem).display);
  // if (getComputedStyle(elem).display == "none") {
  //   elem.className = "d-block";
  //   elem.style.position = "static";
  //   elem.style.margin = "0  0 20px 0px";
  //   console.log("added");
  //   document.querySelector("#google_translate_element2").appendChild(elem);
  // }
  // Get the element
  // var elem = document.querySelector("#selectpicker");
  // // console.log(elem.style.display);
  // // console.log(getComputedStyle(elem).display);
  // if (getComputedStyle(elem).display == "none") {
  //   elem.className = "d-block";
  //   document.querySelector("#google_translate_element2").appendChild(elem);
  // elem.style.position = "static";
  // elem.style.margin = "0  0 20px 0px";
  // console.log("added");
  // }
  // }, []);

  return (
    <>
      <div id="google_translate_element2" className="">
        {/* <GoogleLangPicker /> */}
        <GoogleLangPickerWithFlag />
      </div>
      <nav className="mean-nav">
        <ul>
          <li className="search_topbar d-block">
            {/* <div className="search_topbar d-flex align-items-center">
            <span className="s_icon toogle-search-icon"></span>
            <div className="search" id="homepage-search-form"> */}
            <form
              name="homepage-search-tag "
              onSubmit={passValueToSearch}
              className="d-flex align-items-center"
              // style={{ padding: "20px 0" }}
            >
              <input
                type="search"
                id="header_srch2"
                autoComplete="off"
                aria-label="Search"
                className="form-control input-search-field "
                name="course"
                placeholder="What do you want to learn?"
                style={{ boxShadow: "none" }}
              />
              <button type="submit" className="input-search-btn" title="search">
                <span className="search_icon input-search-icon"></span>
              </button>
            </form>
            {/* </div>
          </div> */}
          </li>
          <li>
            <Link href="/">home</Link>
          </li>
          <li onClick={showDropdownCourseMobile} style={{ cursor: "pointer" }}>
            <Link href="#" style={{ pointerEvents: "none" }}>
              all courses
            </Link>
            {/* all courses */}
          </li>
          <li>
            <Link href="/corporate">For Corporate</Link>
          </li>
          <li>
            <Link href="/campus">For Campus</Link>
          </li>
          {/* {user ? (
            <>
              <li>
                <Link href={`/user/profile?id=${user?.Uuid}`}>
                  Profile{" "}
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
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginLeft: "20px",
                      border: "1px solid #e7e7e7",
                    }}
                  />
                </Link>
              </li>
              <li onClick={logOut} style={{ cursor: "pointer" }}>
                <Link href="#" style={{ pointerEvents: "none" }}>
                  Log Out
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user/login">log in</Link>
              </li>
              <li>
                <Link href="/user/signup">join free</Link>
              </li>
            </>
          )} */}
        </ul>
      </nav>
    </>
  );
};

export default MobileMenus;
