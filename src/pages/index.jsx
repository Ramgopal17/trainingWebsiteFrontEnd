import React from "react";
import SEO from "../common/seo";
import HomeOne from "../components/homes/home";
import Wrapper from "../layout/wrapper";
import Header from "../layout/headers/header-12";
import Footer from "../layout/footers/footer-12";
import AllCoursesDropdown from "../layout/headers/all-courses-dropdown";
import AllCoursesDropdownMobile from "../layout/headers/all-courses-dropdown-mobile";
import SignIn from "../components/sign-in/sign-in";

const Home = () => {
  return (
    <>
      {/* <SEO pageTitle={"Gencio"} /> */}
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      {/* <AllCoursesDropdown /> */}
      <HomeOne />
      <Footer />
      {/* <SignIn /> */}
    </>
  );
};

export default Home;
