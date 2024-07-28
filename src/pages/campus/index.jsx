import SEO from "@/src/common/seo";
import ForCampus from "@/src/components/for-campus/for-campus";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import React from "react";

function index() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header forName="For Campus" />
      <ForCampus />
      <Footer />
    </>
  );
}

export default index;
