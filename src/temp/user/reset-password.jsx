import SEO from "@/src/common/seo";
import ResetPassword from "@/src/components/reset-password/reset-password";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import React from "react";

function resetPassword() {
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <ResetPassword />
      <Footer />
    </>
  );
}

export default resetPassword;
