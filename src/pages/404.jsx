import Link from "next/link";
import React from "react";
import SEO from "../common/seo";
import Footer from "../layout/footers/footer-12";
import Header from "../layout/headers/header-12";
import CustomButton from "../components/custom/custom-button";

const Error = () => {
  return (
    <>
      <SEO pageTitle={"404 page not found"} />
      <Header />
      <div className="container">
        <div className="error_page pb-50">
          <img
            style={{ width: "100%" }}
            src="/assets/img/404.jpg"
            alt="error image"
          ></img>
          {/* <Link href="/">
            <button className="tp-btn tp-btn-hover">Go To Home</button>
          </Link> */}
          <CustomButton url={"/"} text={"Go To Home"} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Error;
