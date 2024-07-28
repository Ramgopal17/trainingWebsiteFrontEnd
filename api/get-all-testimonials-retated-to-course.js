import Testimonial from "@/src/components/course-detail/testimonial";
import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllTestimonialsRelatedToCourse = async (courseName = "") => {
  let allTestimonials = await axios.get(
    `${BackEndApi}/api/testimonials?filters[Rating][$gte]=3&populate[Course_Detail][populate]=Testimonials&populate[User][populate]=*`,
    config
  );
  // console.log("all testimonial", allTestimonials.data.data);
  // console.log("slug", courseName);
  let testimonialsRelatedToCourse = allTestimonials?.data?.data?.filter(
    (Testimonial) =>
      Testimonial?.attributes?.Course_Detail?.data?.attributes?.Slug ==
      courseName
  );
  // console.log("rel", testimonialsRelatedToCourse || []);
  return testimonialsRelatedToCourse || [];
};
