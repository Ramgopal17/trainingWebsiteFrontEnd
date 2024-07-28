import React from "react";
import SEO from "../common/seo";
import Header from "../layout/headers/header-12";
import AllCourses from "../components/all-courses";
import Footer from "../layout/footers/footer-12";

function allCourses() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <AllCourses />
      <Footer />
    </>
  );
}

export default allCourses;
