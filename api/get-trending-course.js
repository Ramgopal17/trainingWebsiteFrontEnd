import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getTrendingCourses = async () => {
  let newCourses = await axios.get(
    `${BackEndApi}/api/course-details?populate=*`,
    config
  );
  // console.log("trending courses", newCourses.data.data.slice(0, 6));

  let sortedByUserLength = newCourses?.data?.data?.slice(0, 6).sort((a, b) => {
    const lengthA = a?.attributes?.User?.data?.length;
    // console.log(lengthA);
    const lengthB = b?.attributes?.User?.data?.length;
    return lengthB - lengthA;
  });
  // console.log("trending courses a ", a);

  return sortedByUserLength || [];
};
