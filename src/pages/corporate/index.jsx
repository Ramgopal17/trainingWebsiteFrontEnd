import SEO from "@/src/common/seo";
import ForCorporate from "@/src/components/for-corporate/for-corporate";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import React from "react";

function index() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header forName="For Corporate" />
      <ForCorporate />
      <Footer />
    </>
  );
}

export default index;
