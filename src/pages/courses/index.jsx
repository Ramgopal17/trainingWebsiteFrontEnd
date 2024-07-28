import React from "react";
import { useRouter } from "next/router";
import SEO from "@/src/common/seo";
import Header from "@/src/layout/headers/header-12";
import CourseDetail from "@/src/components/course-detail/course-detail";
import Footer from "@/src/layout/footers/footer-12";

function CourseName() {
  const router = useRouter();
  // console.log(router.query);
  return (
    <>
      <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
      <Header />
      <CourseDetail />
      <Footer />
    </>
  );
}

export default CourseName;
