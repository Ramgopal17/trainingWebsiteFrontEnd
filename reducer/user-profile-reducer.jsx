export const initialState = {
  First_Name: "",
  Last_Name: "",
  email: "",
  Country_Code: "",
  Phone: "",
  Time_Zone: "",
  Gender: "",
  Date_of_Birth: "",
  Linkedin_Url: "",
  Blog_Profile_Url: "",
  Facebook_Profile_Url: "",
  Your_Website_Link: "",
  Twitter_Profile_Url: "",
  Any_Other_Web_Url: "",
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
  Objective_of_Training: "",
  Training_Funded_By: "",
};

// Twitter_Profile_Url Any_Other_Web_Url

export const userProfileReducer = (state, action) => {
  // console.log("in reducer");
  switch (action.type) {
    case "personalInfo":
      // console.log(
      //   "user profilennnnnnnnnnnnnnnnnnnnn",
      //   [action.fieldName],
      //   action.payload,
      //   state
      // );
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
