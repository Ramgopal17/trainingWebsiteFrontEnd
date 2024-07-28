import SEO from "@/src/common/seo";
import Checkout from "@/src/components/payment/checkout";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import React from "react";

function index() {
  return (
    <>
      {/* <SEO pageTitle={"Gencio"} /> */}
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      {/* <AllCoursesDropdown /> */}
      {/* <HomeOne /> */}
      {/* <Footer /> */}
      <Checkout />
      <Footer />
    </>
  );
}

export default index;
