import React, { useEffect, useState } from "react";
import TopDetailBanner from "./top-detail-banner";
import MoreDetails from "./more-details";
import Faq from "../custom/faq";
import RelatedCourses from "./related-courses";
import Testimonial from "./testimonial";
import { useRouter } from "next/router";
import { getCourseDetailBySlug } from "@/api/get-course-detail-by-slug";
import { getAllTestimonialsRelatedToCourse } from "@/api/get-all-testimonials-retated-to-course";
import PopupCourseInfo from "./course-purchase/popup-course-Info";
import Swal from "sweetalert2";
import { displayPopup } from "@/utils/popup";
import { useAuthContext } from "@/context/Auth-context";

function CourseDetail() {
  const [activeCourse, setActiveCourse] = useState({});
  const [backColor, setBackColor] = useState("white");
  const [rating, setRating] = useState({});
  const router = useRouter();
  const courseName = router.query.coursename;
  const [testimonials, setTestimonials] = useState([]);
  const getTestimonials = async () => {
    let testimonialData = await getAllTestimonialsRelatedToCourse(courseName);
    // console.log("testimonials", testimonialData);
    setTestimonials(testimonialData);
    // calculateRating(testimonials);
  };
  const getCourseDetail = async () => {
    const courseDetail = await getCourseDetailBySlug(courseName);
    // if (!courseDetail?.id) {
    //   // console.error("not present");
    //   Swal.fire({
    //     icon: "error",
    //     title: "Course not found",
    //     text: "this course is not available",
    //     confirmButtonText: "OK",
    //   });
    //   router.back();
    // }
    setActiveCourse(courseDetail);
    // console.log("courseDetail", courseDetail);
  };

  const { user } = useAuthContext();

  const checkUserLogin = () => {
    if (user) {
      displayPopup("popupContainer");
    } else {
      Swal.fire({
        title: "Please login",
        icon: "warning",
        text: "You need to login to enroll this course",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/user/login");
        }
      });
    }
  };

  useEffect(() => {
    // console.log("query change", router.query);
    getCourseDetail();
    getTestimonials();
    // console.log("activeCourse", activeCourse);
    // setRating(calculateRating());
  }, [router.query]);
  return (
    // <>
    //   {activeCourse.id ? (
    <>
      <TopDetailBanner
        key={activeCourse?.id}
        activeCourse={activeCourse}
        testimonials={testimonials}
        rating={rating}
        checkUserLogin={checkUserLogin}
      />
      <MoreDetails
        key={activeCourse?.attributes?.Slug}
        activeCourse={activeCourse}
        checkUserLogin={checkUserLogin}
      />
      <Faq faq={activeCourse?.attributes?.FAQs?.data} />
      <RelatedCourses setBackColor={setBackColor} />
      {/* <Testimonial testimonials={testimonials} backColor={backColor} /> */}
      <PopupCourseInfo activeCourse={activeCourse} />
    </>
    // ) : (
    //   <div className="container pt-50 pb-50 text-center">
    //     <h5>This course is not available</h5>
    //   </div>
    // )}
    // </>
  );
}

export default CourseDetail;
