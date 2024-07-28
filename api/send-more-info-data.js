import { BackEndApi, config } from "@/src/data/auth_token";
import axios from "axios";

export const sendMoreInfoData = async (e) => {
  const data = {
    Name: e.target.Name.value,
    Email: e.target.Email.value,
    Phone: e.target.Phone.value,
    Inquire: e.target.Inquire.value,
    Message: e.target.Message.value,
  };
  // console.log(data);
  try {
    let result = await axios.post(
      `${BackEndApi}/api/more-info-forms`,
      { data },
      config
    );
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // console.log(error.Message);
    return false;
  }
  // console.log("new courses", newCourses.data.data.slice(0, 6));
  // return newCourses.data.data.slice(0, 6) || [];
};
