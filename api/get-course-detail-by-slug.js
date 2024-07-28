import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getCourseDetailBySlug = async (slug = "") => {
  let courseDetail = await axios.get(
    `${BackEndApi}/api/course-details?filters[Slug][$eq]=${slug}&populate[Full_Syllabus][populate]=Title,Syllabus_Chapters&populate[FAQs][populate]=*&populate[Course_Image][populate]=*&populate[About_Course][populate]=*`,
    config
  );
  // console.log("details courses", courseDetail.data.data[0]);
  return courseDetail?.data?.data[0] || {};
};
