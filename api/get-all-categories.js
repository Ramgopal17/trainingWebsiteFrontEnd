import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const getAllCategories = async () => {
  let categories = await axios.get(
    `${BackEndApi}/api/categories?populate[Course_Details][populate]=Full_Syllabus.Syllabus_Chapters,Category`,
    config
  );
  // console.log("Dfsd", categories.data.data);
  return categories?.data?.data || [];
};
