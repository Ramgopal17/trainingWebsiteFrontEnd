import SEO from "@/src/common/seo";
import ForgotPassword from "@/src/components/forgot-password/forgot-password";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import React from "react";

function forgotPassword() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <ForgotPassword />
      <Footer />
    </>
  );
}

export default forgotPassword;
