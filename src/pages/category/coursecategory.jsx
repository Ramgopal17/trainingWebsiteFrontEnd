import React from "react";
import SEO from "../../common/seo";
import Header from "../../layout/headers/header-12";
import { useRouter } from "next/router";
import CourseCategory from "../../components/course-category";
import Footer from "@/src/layout/footers/footer-12";

function courseCategory() {
  // const router = useRouter();
  // console.log(router.query);
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <CourseCategory />
      <Footer />
    </>
  );
}

export default courseCategory;
