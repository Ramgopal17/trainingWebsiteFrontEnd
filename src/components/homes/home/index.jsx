import React, { useEffect } from "react";

import CertificationCourses from "./certification-courses";
import LearningExperience from "./learning-experience";
import Faq from "./faq";
import Newsletter from "./newsletter";
import TopBanner from "./top-banner";
import { useRouter } from "next/router";

import Swal from "sweetalert2";

const HomeOne = () => {
  const router = useRouter();
  useEffect(() => {
    // console.log("subcr", router.query.subscribed);
    if (router.query.subscribed == "true") {
      Swal.fire({
        icon: "success",
        title: "successfully subscribed",
        text: "Stay with us for new updates",
        confirmButtonText: "OK",
      });
    }
  }, [router.query]);
  return (
    <>
      <TopBanner />
      <CertificationCourses />
      <LearningExperience />
      <Faq />
      {/* <Newsletter /> */}
    </>
  );
};

export default HomeOne;
