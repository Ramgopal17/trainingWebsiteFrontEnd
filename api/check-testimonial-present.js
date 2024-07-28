import { getAllDataOfLoginUsers } from "./get-all-data-of-login-user";

export const checkTestimonialPresent = async (id, courseName) => {
  let userData = await getAllDataOfLoginUsers(id);

  // console.log("user testimonial present", userData);

  let testimonial = userData?.Testimonials?.filter(
    (testimonial) => testimonial?.Course_Title == courseName
  );

  return testimonial.length ? true : false;
};
