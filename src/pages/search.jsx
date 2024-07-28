import React from "react";
import SEO from "../common/seo";
import Header from "../layout/headers/header-12";
import Search from "../components/search";
import Footer from "../layout/footers/footer-12";

function search() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <Search />
      <Footer />
    </>
  );
}

export default search;
