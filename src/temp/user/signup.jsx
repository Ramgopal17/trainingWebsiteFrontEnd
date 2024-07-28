import React from "react";
import SEO from "../../common/seo";
import Header from "../../layout/headers/header-12";
import SignUp from "../../components/sign-up/sign-up";
import Footer from "@/src/layout/footers/footer-12";

function signup() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <SignUp />
      <Footer />
    </>
  );
}

export default signup;
