import React from "react";
import Wrapper from "../../layout/wrapper";
import SEO from "../../common/seo";
import Header from "../../layout/headers/header-12";
import SignIn from "../../components/sign-in/sign-in";
import Footer from "@/src/layout/footers/footer-12";

function login() {
  return (
    <>
      {/* <SEO pageTitle={"Gencio"} /> */}
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      {/* <AllCoursesDropdown /> */}
      {/* <HomeOne /> */}
      {/* <Footer /> */}
      <SignIn />
      <Footer />
    </>
  );
}

export default login;
