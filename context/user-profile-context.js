import { createContext, useEffect, useReducer, useState } from "react";
import {
  initialState,
  userProfileReducer,
} from "@/reducer/user-profile-reducer";
import { useAuthContext } from "./Auth-context";
import { getAllDataOfLoginUsers } from "@/api/get-all-data-of-login-user";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(userProfileReducer, initialState);
  const AddPersonalInfo = (e) => {
    // console.log("in AddPersonalInfo", e.target);
    dispatch({
      type: "personalInfo",
      fieldName: e.target.name,
      payload: e.target.value,
    });
  };

  const value = {
    First_Name: state?.First_Name || user?.First_Name,
    Last_Name: state?.Last_Name || user?.Last_Name,
    email: state?.email || user?.email,
    Country_Code: state?.Country_Code || user?.Country_Code,
    Phone: state?.Phone,
    Time_Zone: state?.Time_Zone || user?.Time_Zone,
    Gender: state?.Gender || user?.Gender,
    Date_of_Birth: state?.Date_of_Birth || user?.Date_of_Birth,
    Linkedin_Url: state?.Linkedin_Url || user?.Linkedin_Url,
    Blog_Profile_Url: state?.Blog_Profile_Url || user?.Blog_Profile_Url,
    Facebook_Profile_Url:
      state?.Facebook_Profile_Url || user?.Facebook_Profile_Url,
    Your_Website_Link: state?.Your_Website_Link || user?.Your_Website_Link,
    Twitter_Profile_Url:
      state?.Twitter_Profile_Url || user?.Twitter_Profile_Url,
    Any_Other_Web_Url: state?.Any_Other_Web_Url || user?.Any_Other_Web_Url,
    Work_Experience: [
      // {
      //   Designation: "",
      //   Company: "",
      //   Department: "",
      //   From_Month: "",
      //   From_Year: "",
      //   To_Month: "",
      //   To_Year: "",
      //   Current: "",
      // },
    ],
    Academics: [
      // {
      //   Qualification: "",
      //   College: "",
      //   Specialization: "",
      //   From_Month: "",
      //   From_Year: "",
      //   To_Month: "",
      //   To_Year: "",
      //   Current: "",
      // },
    ],
    Interests: [],
    Objective_of_Training:
      state?.Objective_of_Training || user?.Objective_of_Training,
    Training_Funded_By: state?.Training_Funded_By || user?.Training_Funded_By,
    AddPersonalInfo,
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};
