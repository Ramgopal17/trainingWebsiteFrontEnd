import React, { use, useContext, useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar";
import { showSidebar } from "@/utils/toggle-sidebar";
import { useAuthContext } from "@/context/Auth-context";
import { useRouter } from "next/router";
import { UserProfileContext } from "@/context/user-profile-context";
import {
  BackEndApi,
  authentication_token,
  config,
} from "@/src/data/auth_token";
import {
  addAcademics,
  addInterest,
  addWorkExperience,
  removeChildOfParent,
} from "@/utils/user-profile-info";
import { getAllDataOfLoginUsers } from "@/api/get-all-data-of-login-user";
import axios from "axios";
import Swal from "sweetalert2";
import { postUserWorkExperience } from "@/api/post-user-work-exp";
import { deleteUserWorkExperience } from "@/api/delete-user-work-exp";
import { deleteUserAcademic } from "@/api/delete-user-academic";
import { postUserAcademic } from "@/api/post-user-academic";
import { getToken } from "@/api/manage-session";

function Profile() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  // console.log("userrrrrrrrr", user);
  const [tempUserProfile, setTempUserProfile] = useState("");
  const [userProfileData, setUserProfileData] = useState({});
  const [userWorkExperience, setUserWorkExperience] = useState([]);
  const [userAcademics, setUserAcademics] = useState([]);

  let userInterestAll = "";
  const fileInputRef = useRef(null);

  const updateProfileData = (e) => {
    setUserProfileData({ ...userProfileData, [e.target.name]: e.target.value });
    // console.log([e.target.name], e.target.value);
    // console.log(userProfileData);
  };

  const changeTempUserProfile = (e) => {
    let file = e.target.files[0];
    // console.log(file, "temp profile", e.target.value);
    var reader = new FileReader();
    reader.onload = function (evt) {
      //  image.src = e.target.result;
      setTempUserProfile((prev) => (prev = evt.target.result));
    };
    reader.readAsDataURL(file);
  };

  const addFetchedInterest = (User_interests) => {
    // let userInterest = User_interests[0];
    let userInterest = User_interests?.split(",");
    removeChildOfParent("InterestDiv", "singleInterestWrapper");
    userInterest?.map((Interest) => {
      // console.log("Interest", Interest);
      if (Interest.trim().length > 0) {
        addInterest(Interest);
      }
      // userInterest.push(Interest?.Interest);
    });
  };

  const addFetchedWorkExp = (workExps) => {
    setUserWorkExperience(workExps);
    removeChildOfParent("workExperienceDiv", "singleExpWrapper");
    workExps?.map((work) => {
      // console.log("Interest", work);
      addWorkExperience(work);
      // addInterest(Interest?.Interest);
      // userInterest.push(Interest?.Interest);
    });
  };

  const addFetchedAcademics = (academics) => {
    setUserAcademics(academics);
    removeChildOfParent("AcademicsDiv", "singleAcademicWrapper");
    academics?.map((academic) => {
      // console.log("academic adat", academic);
      addAcademics(academic);
      // addInterest(Interest?.Interest);
      // userInterest.push(Interest?.Interest);
    });
  };

  const fetchData = async () => {
    const tempData = await getAllDataOfLoginUsers(user?.id);
    setUserProfileData(tempData);
    // console.log("user is first name", tempData);
    if (tempData?.User_Image) {
      setTempUserProfile(
        BackEndApi + tempData?.User_Image[0]?.formats?.thumbnail?.url
      );
    } else {
      setTempUserProfile("/assets/img/profile-picture.png");
    }
    addFetchedInterest(tempData?.Interests);
    // console.log(tempData?.Work_experience_of_users);
    addFetchedWorkExp(tempData?.Work_experience_of_users);
    // console.log("academic", tempData?.Academics_of_User);
    addFetchedAcademics(tempData?.Academics_of_users);
  };

  useEffect(() => {
    // console.log("user is logged in", user);

    fetchData();
    // console.log(user);
    // if (user?.User_Image) {
    //   console.log(BackEndApi + user?.User_Image[0]?.formats?.thumbnail?.url);

    // }
  }, []);

  const saveUserData = async (e) => {
    e.preventDefault();
    Array.from(e.target.elements).forEach((input) => {
      // console.log(input);

      // ================get and save all user interest==================
      if (input.getAttribute("reffor") == "interest") {
        userInterestAll = userInterestAll + "," + input.value;
      }
    });
    userInterestAll = userInterestAll.slice(1);
    // console.log("allint", userInterestAll.slice(1));
    // ================get all user interest==================

    // ================get and save all user work exp==================

    const workExpsDiv = document.getElementsByClassName("singleExpWrapper");
    // console.log("workExpsDiv", userWorkExperience);
    userWorkExperience?.map(async (work) => {
      await deleteUserWorkExperience(work?.id);
    });
    Array.from(workExpsDiv).forEach(async (work) => {
      // console.log(work);
      let data = {
        data: {
          Designation: work.querySelector(".workDesignation").value,
          Department: work.querySelector(".workDepartment").value,
          User: {
            connect: [user?.id],
          },

          Company: work.querySelector(".workCompany").value,
          From_Month: work.querySelector(".workFromMonth").value,
          From_Year: work.querySelector(".workFromYear").value,
          To_Month: work.querySelector(".workToMonth").value,
          To_Year: work.querySelector(".workToYear").value,
          Current: work.querySelector(".workCurrent").checked,
        },
      };
      // console.log("work data", data);
      await postUserWorkExperience(data);
    });
    // ================get all user work exp==================

    // ================get and save all user academic exp==================
    const academicsDiv = document.querySelectorAll(".singleAcademicWrapper");
    // console.log("academicDetDiv", academicsDiv);
    userAcademics?.map(async (academic) => {
      await deleteUserAcademic(academic?.id);
    });
    Array.from(academicsDiv).forEach(async (academic) => {
      let data = {
        data: {
          Qualification: academic.querySelector(".academicQualification").value,
          College_School: academic.querySelector(".academicClgScl").value,
          User: {
            connect: [user?.id],
          },
          Specialisation: academic.querySelector(".academicSpecialization")
            .value,
          From_Month: academic.querySelector(".academicFromMonth").value,
          From_Year: academic.querySelector(".academicFromYear").value,
          To_Month: academic.querySelector(".academicToMonth").value,
          To_Year: academic.querySelector(".academicToYear").value,
          Current: academic.querySelector(".academicCurrent").checked,
        },
      };

      // console.log("academic data", data);
      await postUserAcademic(data);
    });
    // ================get and save all user academic exp==================

    var formData = new FormData(e.target);
    // formData.append("files.User_Image", e.target.User_Image.files[0]);
    // formData.append("files", e.target.User_Image.files[0]);
    let data = {};
    // console.log("formdataaa", formData);

    // =====================upload user profile==================
    let file = new FormData();
    file.append("files", e.target.User_Image.files[0]);
    axios
      .post(`${BackEndApi}/api/upload`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authentication_token}`,
        },
      })
      .then((response) => {
        const fileId = response.data[0].id;
        // console.log(`Uploading file `, fileId);
        axios({
          method: "put",
          url: `${BackEndApi}/api/users/${user?.id}?populate=*`,
          data: {
            User_Image: fileId,
          },
        })
          .then(({ data }) => {
            // console.log("profile response", data);
          })
          .catch((error) => {
            //handle error
            // console.log("profile err", error);
          });
      })
      .catch((error) => {
        //handle error
        // console.log(error, "upload err");
      });

    // =====================upload user profile==================

    // formData.append("files.User_Image", e.target.User_Image.files[0]);

    // Iterate over the form data entries and populate the formDataObject
    formData.forEach((value, key) => {
      // console.log(value, key);
      data[key] = value;
    });
    data = {
      ...data,
      Interests: userInterestAll,
      // User_Image: e.target.User_Image.files[0],
    };
    // console.log("updata", data);
    // console.log("updata img", e.target.User_Image.files[0]);

    try {
      let result = await axios.put(
        `${BackEndApi}/api/users/${user?.id}?populate=*`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authentication_token}`,
          },
        }
      );

      // console.log(userInterest.length);
      // for (let interest of userInterest) {
      //   console.log(interest);
      // }

      if (result) {
        // console.log(result);
        Swal.fire({
          icon: "success",
          title: "successfully updated",
          text: "your profile data updated successfully",
          confirmButtonText: "OK",
        });
        // router.push(`/user/profile?id=${user?.Uuid}`);
        try {
          let authToken = getToken();
          const response = await fetch(
            `${BackEndApi}/api/users/me?populate=*`,
            {
              headers: { Authorization: `Bearer ${authToken}` },
            }
          );
          const data = await response.json();
          // console.log("islog", data);
          setUser(data);
        } catch (error) {
          console.error(error);
          message.error("Error While Getting Logged In User Details");
        }
        // console.log("after update", user);
        // handleHeaderReRender();
        let statusId = Math.floor(Math.random() * 10000 + 1);
        router.push(`/user/profile?id=${user?.Uuid}&statuscode=${statusId}`);
        // setReRender(!reRender);
      } else {
        Swal.fire({
          icon: "error",
          title: "profile not updated",
          text: "something went wrong, please try again",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: "profile not updated",
        text:
          error?.response?.data?.error?.message ||
          "Something went wrong, please try again",
        confirmButtonText: "OK",
      });
    }
  };

  // console.log(userProfileData);
  return (
    <>
      {/* {user && ( */}
      <div className="profileDiv">
        <i
          className="fa-solid fa-bars sidebarOpenBtn d-lg-none"
          onClick={showSidebar}
        ></i>
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-0">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className="InfoDiv tp-section it-cta-form mt-0">
                <form onSubmit={saveUserData}>
                  <div className="row">
                    <div className="col-12 p-relative">
                      <img
                        // src={`/assets/img/profile-picture.png`}
                        // src={`${BackEndApi}${user?.User_Image[0]?.formats?.thumbnail?.url}`}

                        src={tempUserProfile}
                        onError={(e) => {
                          e.target.src = "/assets/img/profile-picture.png";
                        }}
                        alt="profile picture"
                        className="profileImg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="profilePhotoInput"
                        ref={fileInputRef}
                        hidden
                        name="User_Image"
                        // value={userProfileData?.User_Image}
                        // onChange={AddPersonalInfo}
                        onChange={(e) => {
                          updateProfileData(e);
                          changeTempUserProfile(e);
                        }}
                      />

                      <input
                        type="button"
                        id="clickButton"
                        onClick={() =>
                          document.getElementById("profilePhotoInput").click()
                        }
                        value="+"
                      />
                    </div>
                    <div className="col-12 mt-40">
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">First Name</p>
                        </div>
                        <div className="col-xl-8 col-md-9">
                          <input
                            type="text"
                            className="textInp"
                            name="First_Name"
                            value={userProfileData?.First_Name}
                            // onChange={AddPersonalInfo}
                            onChange={updateProfileData}
                          />
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">Last Name</p>
                        </div>
                        <div className="col-xl-8 col-md-9">
                          <input
                            type="text"
                            className="textInp"
                            name="Last_Name"
                            value={userProfileData?.Last_Name}
                            onChange={updateProfileData}
                          />
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-xl-8 col-md-9">
                          <input
                            type="email"
                            readOnly
                            className="textInp"
                            name="email"
                            value={userProfileData?.email}
                          />
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-xl-8 col-md-9">
                          <div className="row">
                            <div className="col-4">
                              <select
                                required="required"
                                name="Country_Code"
                                className="textInp"
                                defaultValue={
                                  userProfileData?.Country_Code || "India (+91)"
                                }
                                onChange={updateProfileData}
                              >
                                <option value="India (+91)">India (+91)</option>
                                <option value="Algeria (+213)">
                                  Algeria (+213)
                                </option>
                                <option value="Andorra (+376)">
                                  Andorra (+376)
                                </option>
                                <option value="Anguilla (+1264)">
                                  Anguilla (+1264)
                                </option>
                                <option value="Antigua &amp; Barbuda (+1268)">
                                  Antigua &amp; Barbuda (+1268)
                                </option>
                                <option value="Argentina (+54)">
                                  Argentina (+54)
                                </option>
                                <option value="Armenia (+374)">
                                  Armenia (+374)
                                </option>
                                <option value="Aruba (+297)">
                                  Aruba (+297)
                                </option>
                                <option value="Australia (+61)">
                                  Australia (+61)
                                </option>
                                <option value="Austria (+43)">
                                  Austria (+43)
                                </option>
                                <option value="Azerbaijan (+994)">
                                  Azerbaijan (+994)
                                </option>
                                <option value="Bahrain (+973)">
                                  Bahrain (+973)
                                </option>
                                <option value="Bangladesh (+880)">
                                  Bangladesh (+880)
                                </option>
                                <option value="Barbados (+1246)">
                                  Barbados (+1246)
                                </option>
                                <option value="Belarus (+375)">
                                  Belarus (+375)
                                </option>
                                <option value="Belgium (+32)">
                                  Belgium (+32)
                                </option>
                                <option value="Belize (+501)">
                                  Belize (+501)
                                </option>
                                <option value="Benin (+229)">
                                  Benin (+229)
                                </option>
                                <option value="Bermuda (+1441)">
                                  Bermuda (+1441)
                                </option>
                                <option value="Bhutan (+975)">
                                  Bhutan (+975)
                                </option>
                                <option value="Bolivia (+591)">
                                  Bolivia (+591)
                                </option>
                                <option value="Bosnia Herzegovina (+387)">
                                  Bosnia Herzegovina (+387)
                                </option>
                                <option value="Botswana (+267)">
                                  Botswana (+267)
                                </option>
                                <option value="Brazil (+55)">
                                  Brazil (+55)
                                </option>
                                <option value="Brunei (+673)">
                                  Brunei (+673)
                                </option>
                                <option value="Bulgaria (+359)">
                                  Bulgaria (+359)
                                </option>
                                <option value="Burkina Faso (+226)">
                                  Burkina Faso (+226)
                                </option>
                                <option value="Burundi (+257)">
                                  Burundi (+257)
                                </option>
                                <option value="Cameroon (+237)">
                                  Cameroon (+237)
                                </option>
                                <option value="Cambodia (+855)">
                                  Cambodia (+855)
                                </option>
                                <option value="Canada (+1)">Canada (+1)</option>
                                <option value="Cape Verde Islands (+238)">
                                  Cape Verde Islands (+238)
                                </option>
                                <option value="Cayman Islands (+1345)">
                                  Cayman Islands (+1345)
                                </option>
                                <option value="Central African Republic (+236)">
                                  Central African Republic (+236)
                                </option>
                                <option value="Chile (+56)">Chile (+56)</option>
                                <option value="China (+86)">China (+86)</option>
                                <option value="Colombia (+57)">
                                  Colombia (+57)
                                </option>
                                <option value="Comoros (+269)">
                                  Comoros (+269)
                                </option>
                                <option value="Congo (+242)">
                                  Congo (+242)
                                </option>
                                <option value="Cook Islands (+682)">
                                  Cook Islands (+682)
                                </option>
                                <option value="Costa Rica (+506)">
                                  Costa Rica (+506)
                                </option>
                                <option value="Croatia (+385)">
                                  Croatia (+385)
                                </option>
                                <option value="Cuba (+53)">Cuba (+53)</option>
                                <option value="Cyprus North (+90392)">
                                  Cyprus North (+90392)
                                </option>
                                <option value="Cyprus South (+357)">
                                  Cyprus South (+357)
                                </option>
                                <option value="Czech Republic (+42)">
                                  Czech Republic (+42)
                                </option>
                                <option value="Denmark (+45)">
                                  Denmark (+45)
                                </option>
                                <option value="Djibouti (+253)">
                                  Djibouti (+253)
                                </option>
                                <option value="Dominica (+1809)">
                                  Dominica (+1809)
                                </option>
                                <option value="Dominican Republic (+1809)">
                                  Dominican Republic (+1809)
                                </option>
                                <option value="Ecuador (+593)">
                                  Ecuador (+593)
                                </option>
                                <option value="Egypt (+20)">Egypt (+20)</option>
                                <option value="El Salvador (+503)">
                                  El Salvador (+503)
                                </option>
                                <option value="Equatorial Guinea (+240)">
                                  Equatorial Guinea (+240)
                                </option>
                                <option value="Eritrea (+291)">
                                  Eritrea (+291)
                                </option>
                                <option value="Estonia (+372)">
                                  Estonia (+372)
                                </option>
                                <option value="Ethiopia (+251)">
                                  Ethiopia (+251)
                                </option>
                                <option value="Falkland Islands (+500)">
                                  Falkland Islands (+500)
                                </option>
                                <option value="Faroe Islands (+298)">
                                  Faroe Islands (+298)
                                </option>
                                <option value="Fiji (+679)">Fiji (+679)</option>
                                <option value="Finland (+358)">
                                  Finland (+358)
                                </option>
                                <option value="France (+33)">
                                  France (+33)
                                </option>
                                <option value="French Guiana (+594)">
                                  French Guiana (+594)
                                </option>
                                <option value="French Polynesia (+689)">
                                  French Polynesia (+689)
                                </option>
                                <option value="Gabon (+241)">
                                  Gabon (+241)
                                </option>
                                <option value="Gambia (+220)">
                                  Gambia (+220)
                                </option>
                                <option value="Georgia (+7880)">
                                  Georgia (+7880)
                                </option>
                                <option value="Gibraltar (+350)">
                                  Gibraltar (+350)
                                </option>
                                <option value="Germany (+49)">
                                  Germany (+49)
                                </option>
                                <option value="Ghana (+233)">
                                  Ghana (+233)
                                </option>
                                <option value="Greece (+30)">
                                  Greece (+30)
                                </option>
                                <option value="Greenland (+299)">
                                  Greenland (+299)
                                </option>
                                <option value="Grenada (+1473)">
                                  Grenada (+1473)
                                </option>
                                <option value="Guadeloupe (+590)">
                                  Guadeloupe (+590)
                                </option>
                                <option value="Guam (+671)">Guam (+671)</option>
                                <option value="Guatemala (+502)">
                                  Guatemala (+502)
                                </option>
                                <option value="Guinea (+224)">
                                  Guinea (+224)
                                </option>
                                <option value="Guinea - Bissau (+245)">
                                  Guinea - Bissau (+245)
                                </option>
                                <option value="Guyana (+592)">
                                  Guyana (+592)
                                </option>
                                <option value="Haiti (+509)">
                                  Haiti (+509)
                                </option>
                                <option value="Honduras (+504)">
                                  Honduras (+504)
                                </option>
                                <option value="Hong Kong (+852)">
                                  Hong Kong (+852)
                                </option>
                                <option value="Hungary (+36)">
                                  Hungary (+36)
                                </option>
                                <option value="Iceland (+354)">
                                  Iceland (+354)
                                </option>
                                <option value="Indonesia (+62)">
                                  Indonesia (+62)
                                </option>
                                <option value="Iran (+98)">Iran (+98)</option>
                                <option value="Iraq (+964)">Iraq (+964)</option>
                                <option value="Ireland (+353)">
                                  Ireland (+353)
                                </option>
                                <option value="Israel (+972)">
                                  Israel (+972)
                                </option>
                                <option value="Italy (+39)">Italy (+39)</option>
                                <option value="Jamaica (+1876)">
                                  Jamaica (+1876)
                                </option>
                                <option value="Japan (+81)">Japan (+81)</option>
                                <option value="Jordan (+962)">
                                  Jordan (+962)
                                </option>
                                <option value="Kazakhstan (+7)">
                                  Kazakhstan (+7)
                                </option>
                                <option value="Kenya (+254)">
                                  Kenya (+254)
                                </option>
                                <option value="Kiribati (+686)">
                                  Kiribati (+686)
                                </option>
                                <option value="Korea North (+850)">
                                  Korea North (+850)
                                </option>
                                <option value="Korea South (+82)">
                                  Korea South (+82)
                                </option>
                                <option value="Kuwait (+965)">
                                  Kuwait (+965)
                                </option>
                                <option value="Kyrgyzstan (+996)">
                                  Kyrgyzstan (+996)
                                </option>
                                <option value="Laos (+856)">Laos (+856)</option>
                                <option value="Latvia (+371)">
                                  Latvia (+371)
                                </option>
                                <option value="Lebanon (+961)">
                                  Lebanon (+961)
                                </option>
                                <option value="Lesotho (+266)">
                                  Lesotho (+266)
                                </option>
                                <option value="Liberia (+231)">
                                  Liberia (+231)
                                </option>
                                <option value="Libya (+218)">
                                  Libya (+218)
                                </option>
                                <option value="Lithuania (+370)">
                                  Lithuania (+370)
                                </option>
                                <option value="Luxembourg (+352)">
                                  Luxembourg (+352)
                                </option>
                                <option value="Macao (+853)">
                                  Macao (+853)
                                </option>
                                <option value="Macedonia (+389)">
                                  Macedonia (+389)
                                </option>
                                <option value="Madagascar (+261)">
                                  Madagascar (+261)
                                </option>
                                <option value="Malawi (+265)">
                                  Malawi (+265)
                                </option>
                                <option value="Malaysia (+60)">
                                  Malaysia (+60)
                                </option>
                                <option value="Maldives (+960)">
                                  Maldives (+960)
                                </option>
                                <option value="Mali (+223)">Mali (+223)</option>
                                <option value="Malta (+356)">
                                  Malta (+356)
                                </option>
                                <option value="Marshall Islands (+692)">
                                  Marshall Islands (+692)
                                </option>
                                <option value="Martinique (+596)">
                                  Martinique (+596)
                                </option>
                                <option value="Mauritania (+222)">
                                  Mauritania (+222)
                                </option>
                                <option value="Mayotte (+269)">
                                  Mayotte (+269)
                                </option>
                                <option value="Mexico (+52)">
                                  Mexico (+52)
                                </option>
                                <option value="Micronesia (+691)">
                                  Micronesia (+691)
                                </option>
                                <option value="Moldova (+373)">
                                  Moldova (+373)
                                </option>
                                <option value="Monaco (+377)">
                                  Monaco (+377)
                                </option>
                                <option value="Mongolia (+976)">
                                  Mongolia (+976)
                                </option>
                                <option value="Montserrat (+1664)">
                                  Montserrat (+1664)
                                </option>
                                <option value="Morocco (+212)">
                                  Morocco (+212)
                                </option>
                                <option value="Mozambique (+258)">
                                  Mozambique (+258)
                                </option>
                                <option value="Myanmar (+95)">
                                  Myanmar (+95)
                                </option>
                                <option value="Namibia (+264)">
                                  Namibia (+264)
                                </option>
                                <option value="Nauru (+674)">
                                  Nauru (+674)
                                </option>
                                <option value="Nepal (+977)">
                                  Nepal (+977)
                                </option>
                                <option value="Netherlands (+31)">
                                  Netherlands (+31)
                                </option>
                                <option value="New Caledonia (+687)">
                                  New Caledonia (+687)
                                </option>
                                <option value="New Zealand (+64)">
                                  New Zealand (+64)
                                </option>
                                <option value="Nicaragua (+505)">
                                  Nicaragua (+505)
                                </option>
                                <option value="Niger (+227)">
                                  Niger (+227)
                                </option>
                                <option value="Nigeria (+234)">
                                  Nigeria (+234)
                                </option>
                                <option value="Niue (+683)">Niue (+683)</option>
                                <option value="Norfolk Islands (+672)">
                                  Norfolk Islands (+672)
                                </option>
                                <option value="Northern Marianas (+670)">
                                  Northern Marianas (+670)
                                </option>
                                <option value="Norway (+47)">
                                  Norway (+47)
                                </option>
                                <option value="Oman (+968)">Oman (+968)</option>
                                <option value="Palau (+680)">
                                  Palau (+680)
                                </option>
                                <option value="Pakistan (+92)">
                                  Pakistan (+92)
                                </option>
                                <option value="Panama (+507)">
                                  Panama (+507)
                                </option>
                                <option value="Papua New Guinea (+675)">
                                  Papua New Guinea (+675)
                                </option>
                                <option value="Paraguay (+595)">
                                  Paraguay (+595)
                                </option>
                                <option value="Peru (+51)">Peru (+51)</option>
                                <option value="Philippines (+63)">
                                  Philippines (+63)
                                </option>
                                <option value="Poland (+48)">
                                  Poland (+48)
                                </option>
                                <option value="Portugal (+351)">
                                  Portugal (+351)
                                </option>
                                <option value="Puerto Rico (+1787)">
                                  Puerto Rico (+1787)
                                </option>
                                <option value="Qatar (+974)">
                                  Qatar (+974)
                                </option>
                                <option value="Reunion (+262)">
                                  Reunion (+262)
                                </option>
                                <option value="Romania (+40)">
                                  Romania (+40)
                                </option>
                                <option value="Russia (+7)">Russia (+7)</option>
                                <option value="Rwanda (+250)">
                                  Rwanda (+250)
                                </option>
                                <option value="San Marino (+378)">
                                  San Marino (+378)
                                </option>
                                <option value="Sao Tome &amp; Principe (+239)">
                                  Sao Tome &amp; Principe (+239)
                                </option>
                                <option value="Saudi Arabia (+966)">
                                  Saudi Arabia (+966)
                                </option>
                                <option value="Senegal (+221)">
                                  Senegal (+221)
                                </option>
                                <option value="Serbia (+381)">
                                  Serbia (+381)
                                </option>
                                <option value="Seychelles (+248)">
                                  Seychelles (+248)
                                </option>
                                <option value="Sierra Leone (+232)">
                                  Sierra Leone (+232)
                                </option>
                                <option value="Singapore (+65)">
                                  Singapore (+65)
                                </option>
                                <option value="Slovak Republic (+421)">
                                  Slovak Republic (+421)
                                </option>
                                <option value="Slovenia (+386)">
                                  Slovenia (+386)
                                </option>
                                <option value="Solomon Islands (+677)">
                                  Solomon Islands (+677)
                                </option>
                                <option value="Somalia (+252)">
                                  Somalia (+252)
                                </option>
                                <option value="South Africa (+27)">
                                  South Africa (+27)
                                </option>
                                <option value="Spain (+34)">Spain (+34)</option>
                                <option value="Sri Lanka (+94)">
                                  Sri Lanka (+94)
                                </option>
                                <option value="St. Helena (+290)">
                                  St. Helena (+290)
                                </option>
                                <option value="St. Kitts (+1869)">
                                  St. Kitts (+1869)
                                </option>
                                <option value="St. Lucia (+1758)">
                                  St. Lucia (+1758)
                                </option>
                                <option value="Sudan (+249)">
                                  Sudan (+249)
                                </option>
                                <option value="Suriname (+597)">
                                  Suriname (+597)
                                </option>
                                <option value="Swaziland (+268)">
                                  Swaziland (+268)
                                </option>
                                <option value="Sweden (+46)">
                                  Sweden (+46)
                                </option>
                                <option value="Switzerland (+41)">
                                  Switzerland (+41)
                                </option>
                                <option value="Syria (+963)">
                                  Syria (+963)
                                </option>
                                <option value="Taiwan (+886)">
                                  Taiwan (+886)
                                </option>
                                <option value="Tajikstan (+7)">
                                  Tajikstan (+7)
                                </option>
                                <option value="Thailand (+66)">
                                  Thailand (+66)
                                </option>
                                <option value="Togo (+228)">Togo (+228)</option>
                                <option value="Tonga (+676)">
                                  Tonga (+676)
                                </option>
                                <option value="Trinidad &amp; Tobago (+1868)">
                                  Trinidad &amp; Tobago (+1868)
                                </option>
                                <option value="Tunisia (+216)">
                                  Tunisia (+216)
                                </option>
                                <option value="Turkey (+90)">
                                  Turkey (+90)
                                </option>
                                <option value="Turkmenistan (+7)">
                                  Turkmenistan (+7)
                                </option>
                                <option value="Turkmenistan (+993)">
                                  Turkmenistan (+993)
                                </option>
                                <option value="Turks &amp; Caicos Islands (+1649)">
                                  Turks &amp; Caicos Islands (+1649)
                                </option>
                                <option value="Tuvalu (+688)">
                                  Tuvalu (+688)
                                </option>
                                <option value="Uganda (+256)">
                                  Uganda (+256)
                                </option>
                                <option value="UK (+44)">UK (+44)</option>
                                <option value="Ukraine (+380)">
                                  Ukraine (+380)
                                </option>
                                <option value="United Arab Emirates (+971)">
                                  United Arab Emirates (+971)
                                </option>
                                <option value="Uruguay (+598)">
                                  Uruguay (+598)
                                </option>
                                <option value="USA (+1)">USA (+1)</option>
                                <option value="Uzbekistan (+7)">
                                  Uzbekistan (+7)
                                </option>
                                <option value="Vanuatu (+678)">
                                  Vanuatu (+678)
                                </option>
                                <option value="Vatican City (+379)">
                                  Vatican City (+379)
                                </option>
                                <option value="Venezuela (+58)">
                                  Venezuela (+58)
                                </option>
                                <option value="Vietnam (+84)">
                                  Vietnam (+84)
                                </option>
                                <option value="Virgin Islands - British (+1284)">
                                  Virgin Islands - British (+1284)
                                </option>
                                <option value="Virgin Islands - US (+1340)">
                                  Virgin Islands - US (+1340)
                                </option>
                                <option value="Wallis &amp; Futuna (+681)">
                                  Wallis &amp; Futuna (+681)
                                </option>
                                <option value="Yemen (North)(+969)">
                                  Yemen (North)(+969)
                                </option>
                                <option value="Yemen (South)(+967)">
                                  Yemen (South)(+967)
                                </option>
                                <option value="Zambia (+260)">
                                  Zambia (+260)
                                </option>
                                <option value="Zimbabwe (+263)">
                                  Zimbabwe (+263)
                                </option>
                              </select>
                            </div>
                            <div className="col-8">
                              <input
                                type="tel"
                                className="textInp"
                                name="Phone"
                                value={userProfileData?.Phone}
                                // onChange={AddPersonalInfo}
                                onChange={updateProfileData}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">Timezone</p>
                        </div>
                        <div className="col-xl-8 col-md-9">
                          <select
                            required="required"
                            className="textInp ps-2"
                            name="Time_Zone"
                            // defaultValue={"Asia/Kolkata"}
                            defaultValue={
                              userProfileData?.Time_Zone || "Asia/Kolkata"
                            }
                            onChange={updateProfileData}
                          >
                            <option value="Etc/GMT+12">
                              (GMT-12:00) Etc/GMT+12
                            </option>
                            <option value="Etc/GMT+11">
                              (GMT-11:00) Etc/GMT+11
                            </option>
                            <option value="Pacific/Midway">
                              (GMT-11:00) Pacific/Midway
                            </option>
                            <option value="Pacific/Niue">
                              (GMT-11:00) Pacific/Niue
                            </option>
                            <option value="Pacific/Pago_Pago">
                              (GMT-11:00) Pacific/Pago_Pago
                            </option>
                            <option value="Pacific/Samoa">
                              (GMT-11:00) Pacific/Samoa
                            </option>
                            <option value="US/Samoa">
                              (GMT-11:00) US/Samoa
                            </option>
                            <option value="Etc/GMT+10">
                              (GMT-10:00) Etc/GMT+10
                            </option>
                            <option value="HST">(GMT-10:00) HST</option>
                            <option value="Pacific/Honolulu">
                              (GMT-10:00) Pacific/Honolulu
                            </option>
                            <option value="Pacific/Johnston">
                              (GMT-10:00) Pacific/Johnston
                            </option>
                            <option value="Pacific/Rarotonga">
                              (GMT-10:00) Pacific/Rarotonga
                            </option>
                            <option value="Pacific/Tahiti">
                              (GMT-10:00) Pacific/Tahiti
                            </option>
                            <option value="US/Hawaii">
                              (GMT-10:00) US/Hawaii
                            </option>
                            <option value="Pacific/Marquesas">
                              (GMT-09:30) Pacific/Marquesas
                            </option>
                            <option value="America/Adak">
                              (GMT-09:00) America/Adak
                            </option>
                            <option value="America/Atka">
                              (GMT-09:00) America/Atka
                            </option>
                            <option value="Etc/GMT+9">
                              (GMT-09:00) Etc/GMT+9
                            </option>
                            <option value="Pacific/Gambier">
                              (GMT-09:00) Pacific/Gambier
                            </option>
                            <option value="US/Aleutian">
                              (GMT-09:00) US/Aleutian
                            </option>
                            <option value="America/Anchorage">
                              (GMT-08:00) America/Anchorage
                            </option>
                            <option value="America/Juneau">
                              (GMT-08:00) America/Juneau
                            </option>
                            <option value="America/Metlakatla">
                              (GMT-08:00) America/Metlakatla
                            </option>
                            <option value="America/Nome">
                              (GMT-08:00) America/Nome
                            </option>
                            <option value="America/Sitka">
                              (GMT-08:00) America/Sitka
                            </option>
                            <option value="America/Yakutat">
                              (GMT-08:00) America/Yakutat
                            </option>
                            <option value="Etc/GMT+8">
                              (GMT-08:00) Etc/GMT+8
                            </option>
                            <option value="Pacific/Pitcairn">
                              (GMT-08:00) Pacific/Pitcairn
                            </option>
                            <option value="US/Alaska">
                              (GMT-08:00) US/Alaska
                            </option>
                            <option value="America/Creston">
                              (GMT-07:00) America/Creston
                            </option>
                            <option value="America/Dawson">
                              (GMT-07:00) America/Dawson
                            </option>
                            <option value="America/Dawson_Creek">
                              (GMT-07:00) America/Dawson_Creek
                            </option>
                            <option value="America/Ensenada">
                              (GMT-07:00) America/Ensenada
                            </option>
                            <option value="America/Fort_Nelson">
                              (GMT-07:00) America/Fort_Nelson
                            </option>
                            <option value="America/Hermosillo">
                              (GMT-07:00) America/Hermosillo
                            </option>
                            <option value="America/Los_Angeles">
                              (GMT-07:00) America/Los_Angeles
                            </option>
                            <option value="America/Mazatlan">
                              (GMT-07:00) America/Mazatlan
                            </option>
                            <option value="America/Phoenix">
                              (GMT-07:00) America/Phoenix
                            </option>
                            <option value="America/Santa_Isabel">
                              (GMT-07:00) America/Santa_Isabel
                            </option>
                            <option value="America/Tijuana">
                              (GMT-07:00) America/Tijuana
                            </option>
                            <option value="America/Vancouver">
                              (GMT-07:00) America/Vancouver
                            </option>
                            <option value="America/Whitehorse">
                              (GMT-07:00) America/Whitehorse
                            </option>
                            <option value="Canada/Pacific">
                              (GMT-07:00) Canada/Pacific
                            </option>
                            <option value="Canada/Yukon">
                              (GMT-07:00) Canada/Yukon
                            </option>
                            <option value="Etc/GMT+7">
                              (GMT-07:00) Etc/GMT+7
                            </option>
                            <option value="MST">(GMT-07:00) MST</option>
                            <option value="Mexico/BajaNorte">
                              (GMT-07:00) Mexico/BajaNorte
                            </option>
                            <option value="Mexico/BajaSur">
                              (GMT-07:00) Mexico/BajaSur
                            </option>
                            <option value="PST8PDT">(GMT-07:00) PST8PDT</option>
                            <option value="US/Arizona">
                              (GMT-07:00) US/Arizona
                            </option>
                            <option value="US/Pacific">
                              (GMT-07:00) US/Pacific
                            </option>
                            <option value="America/Bahia_Banderas">
                              (GMT-06:00) America/Bahia_Banderas
                            </option>
                            <option value="America/Belize">
                              (GMT-06:00) America/Belize
                            </option>
                            <option value="America/Boise">
                              (GMT-06:00) America/Boise
                            </option>
                            <option value="America/Cambridge_Bay">
                              (GMT-06:00) America/Cambridge_Bay
                            </option>
                            <option value="America/Chihuahua">
                              (GMT-06:00) America/Chihuahua
                            </option>
                            <option value="America/Ciudad_Juarez">
                              (GMT-06:00) America/Ciudad_Juarez
                            </option>
                            <option value="America/Costa_Rica">
                              (GMT-06:00) America/Costa_Rica
                            </option>
                            <option value="America/Denver">
                              (GMT-06:00) America/Denver
                            </option>
                            <option value="America/Edmonton">
                              (GMT-06:00) America/Edmonton
                            </option>
                            <option value="America/El_Salvador">
                              (GMT-06:00) America/El_Salvador
                            </option>
                            <option value="America/Guatemala">
                              (GMT-06:00) America/Guatemala
                            </option>
                            <option value="America/Inuvik">
                              (GMT-06:00) America/Inuvik
                            </option>
                            <option value="America/Managua">
                              (GMT-06:00) America/Managua
                            </option>
                            <option value="America/Merida">
                              (GMT-06:00) America/Merida
                            </option>
                            <option value="America/Mexico_City">
                              (GMT-06:00) America/Mexico_City
                            </option>
                            <option value="America/Monterrey">
                              (GMT-06:00) America/Monterrey
                            </option>
                            <option value="America/Regina">
                              (GMT-06:00) America/Regina
                            </option>
                            <option value="America/Shiprock">
                              (GMT-06:00) America/Shiprock
                            </option>
                            <option value="America/Swift_Current">
                              (GMT-06:00) America/Swift_Current
                            </option>
                            <option value="America/Tegucigalpa">
                              (GMT-06:00) America/Tegucigalpa
                            </option>
                            <option value="America/Yellowknife">
                              (GMT-06:00) America/Yellowknife
                            </option>
                            <option value="Canada/Mountain">
                              (GMT-06:00) Canada/Mountain
                            </option>
                            <option value="Canada/Saskatchewan">
                              (GMT-06:00) Canada/Saskatchewan
                            </option>
                            <option value="Chile/EasterIsland">
                              (GMT-06:00) Chile/EasterIsland
                            </option>
                            <option value="Etc/GMT+6">
                              (GMT-06:00) Etc/GMT+6
                            </option>
                            <option value="MST7MDT">(GMT-06:00) MST7MDT</option>
                            <option value="Mexico/General">
                              (GMT-06:00) Mexico/General
                            </option>
                            <option value="Navajo">(GMT-06:00) Navajo</option>
                            <option value="Pacific/Easter">
                              (GMT-06:00) Pacific/Easter
                            </option>
                            <option value="Pacific/Galapagos">
                              (GMT-06:00) Pacific/Galapagos
                            </option>
                            <option value="US/Mountain">
                              (GMT-06:00) US/Mountain
                            </option>
                            <option value="America/Atikokan">
                              (GMT-05:00) America/Atikokan
                            </option>
                            <option value="America/Bogota">
                              (GMT-05:00) America/Bogota
                            </option>
                            <option value="America/Cancun">
                              (GMT-05:00) America/Cancun
                            </option>
                            <option value="America/Cayman">
                              (GMT-05:00) America/Cayman
                            </option>
                            <option value="America/Chicago">
                              (GMT-05:00) America/Chicago
                            </option>
                            <option value="America/Coral_Harbour">
                              (GMT-05:00) America/Coral_Harbour
                            </option>
                            <option value="America/Eirunepe">
                              (GMT-05:00) America/Eirunepe
                            </option>
                            <option value="America/Guayaquil">
                              (GMT-05:00) America/Guayaquil
                            </option>
                            <option value="America/Indiana/Knox">
                              (GMT-05:00) America/Indiana/Knox
                            </option>
                            <option value="America/Indiana/Tell_City">
                              (GMT-05:00) America/Indiana/Tell_City
                            </option>
                            <option value="America/Jamaica">
                              (GMT-05:00) America/Jamaica
                            </option>
                            <option value="America/Knox_IN">
                              (GMT-05:00) America/Knox_IN
                            </option>
                            <option value="America/Lima">
                              (GMT-05:00) America/Lima
                            </option>
                            <option value="America/Matamoros">
                              (GMT-05:00) America/Matamoros
                            </option>
                            <option value="America/Menominee">
                              (GMT-05:00) America/Menominee
                            </option>
                            <option value="America/North_Dakota/Beulah">
                              (GMT-05:00) America/North_Dakota/Beulah
                            </option>
                            <option value="America/North_Dakota/Center">
                              (GMT-05:00) America/North_Dakota/Center
                            </option>
                            <option value="America/North_Dakota/New_Salem">
                              (GMT-05:00) America/North_Dakota/New_Salem
                            </option>
                            <option value="America/Ojinaga">
                              (GMT-05:00) America/Ojinaga
                            </option>
                            <option value="America/Panama">
                              (GMT-05:00) America/Panama
                            </option>
                            <option value="America/Porto_Acre">
                              (GMT-05:00) America/Porto_Acre
                            </option>
                            <option value="America/Rainy_River">
                              (GMT-05:00) America/Rainy_River
                            </option>
                            <option value="America/Rankin_Inlet">
                              (GMT-05:00) America/Rankin_Inlet
                            </option>
                            <option value="America/Resolute">
                              (GMT-05:00) America/Resolute
                            </option>
                            <option value="America/Rio_Branco">
                              (GMT-05:00) America/Rio_Branco
                            </option>
                            <option value="America/Winnipeg">
                              (GMT-05:00) America/Winnipeg
                            </option>
                            <option value="Brazil/Acre">
                              (GMT-05:00) Brazil/Acre
                            </option>
                            <option value="CST6CDT">(GMT-05:00) CST6CDT</option>
                            <option value="Canada/Central">
                              (GMT-05:00) Canada/Central
                            </option>
                            <option value="EST">(GMT-05:00) EST</option>
                            <option value="Etc/GMT+5">
                              (GMT-05:00) Etc/GMT+5
                            </option>
                            <option value="Jamaica">(GMT-05:00) Jamaica</option>
                            <option value="US/Central">
                              (GMT-05:00) US/Central
                            </option>
                            <option value="US/Indiana-Starke">
                              (GMT-05:00) US/Indiana-Starke
                            </option>
                            <option value="America/Anguilla">
                              (GMT-04:00) America/Anguilla
                            </option>
                            <option value="America/Antigua">
                              (GMT-04:00) America/Antigua
                            </option>
                            <option value="America/Aruba">
                              (GMT-04:00) America/Aruba
                            </option>
                            <option value="America/Asuncion">
                              (GMT-04:00) America/Asuncion
                            </option>
                            <option value="America/Barbados">
                              (GMT-04:00) America/Barbados
                            </option>
                            <option value="America/Blanc-Sablon">
                              (GMT-04:00) America/Blanc-Sablon
                            </option>
                            <option value="America/Boa_Vista">
                              (GMT-04:00) America/Boa_Vista
                            </option>
                            <option value="America/Campo_Grande">
                              (GMT-04:00) America/Campo_Grande
                            </option>
                            <option value="America/Caracas">
                              (GMT-04:00) America/Caracas
                            </option>
                            <option value="America/Cuiaba">
                              (GMT-04:00) America/Cuiaba
                            </option>
                            <option value="America/Curacao">
                              (GMT-04:00) America/Curacao
                            </option>
                            <option value="America/Detroit">
                              (GMT-04:00) America/Detroit
                            </option>
                            <option value="America/Dominica">
                              (GMT-04:00) America/Dominica
                            </option>
                            <option value="America/Fort_Wayne">
                              (GMT-04:00) America/Fort_Wayne
                            </option>
                            <option value="America/Grand_Turk">
                              (GMT-04:00) America/Grand_Turk
                            </option>
                            <option value="America/Grenada">
                              (GMT-04:00) America/Grenada
                            </option>
                            <option value="America/Guadeloupe">
                              (GMT-04:00) America/Guadeloupe
                            </option>
                            <option value="America/Guyana">
                              (GMT-04:00) America/Guyana
                            </option>
                            <option value="America/Havana">
                              (GMT-04:00) America/Havana
                            </option>
                            <option value="America/Indiana/Indianapolis">
                              (GMT-04:00) America/Indiana/Indianapolis
                            </option>
                            <option value="America/Indiana/Marengo">
                              (GMT-04:00) America/Indiana/Marengo
                            </option>
                            <option value="America/Indiana/Petersburg">
                              (GMT-04:00) America/Indiana/Petersburg
                            </option>
                            <option value="America/Indiana/Vevay">
                              (GMT-04:00) America/Indiana/Vevay
                            </option>
                            <option value="America/Indiana/Vincennes">
                              (GMT-04:00) America/Indiana/Vincennes
                            </option>
                            <option value="America/Indiana/Winamac">
                              (GMT-04:00) America/Indiana/Winamac
                            </option>
                            <option value="America/Indianapolis">
                              (GMT-04:00) America/Indianapolis
                            </option>
                            <option value="America/Iqaluit">
                              (GMT-04:00) America/Iqaluit
                            </option>
                            <option value="America/Kentucky/Louisville">
                              (GMT-04:00) America/Kentucky/Louisville
                            </option>
                            <option value="America/Kentucky/Monticello">
                              (GMT-04:00) America/Kentucky/Monticello
                            </option>
                            <option value="America/Kralendijk">
                              (GMT-04:00) America/Kralendijk
                            </option>
                            <option value="America/La_Paz">
                              (GMT-04:00) America/La_Paz
                            </option>
                            <option value="America/Louisville">
                              (GMT-04:00) America/Louisville
                            </option>
                            <option value="America/Lower_Princes">
                              (GMT-04:00) America/Lower_Princes
                            </option>
                            <option value="America/Manaus">
                              (GMT-04:00) America/Manaus
                            </option>
                            <option value="America/Marigot">
                              (GMT-04:00) America/Marigot
                            </option>
                            <option value="America/Martinique">
                              (GMT-04:00) America/Martinique
                            </option>
                            <option value="America/Montreal">
                              (GMT-04:00) America/Montreal
                            </option>
                            <option value="America/Montserrat">
                              (GMT-04:00) America/Montserrat
                            </option>
                            <option value="America/Nassau">
                              (GMT-04:00) America/Nassau
                            </option>
                            <option value="America/New_York">
                              (GMT-04:00) America/New_York
                            </option>
                            <option value="America/Nipigon">
                              (GMT-04:00) America/Nipigon
                            </option>
                            <option value="America/Pangnirtung">
                              (GMT-04:00) America/Pangnirtung
                            </option>
                            <option value="America/Port-au-Prince">
                              (GMT-04:00) America/Port-au-Prince
                            </option>
                            <option value="America/Port_of_Spain">
                              (GMT-04:00) America/Port_of_Spain
                            </option>
                            <option value="America/Porto_Velho">
                              (GMT-04:00) America/Porto_Velho
                            </option>
                            <option value="America/Puerto_Rico">
                              (GMT-04:00) America/Puerto_Rico
                            </option>
                            <option value="America/Santiago">
                              (GMT-04:00) America/Santiago
                            </option>
                            <option value="America/Santo_Domingo">
                              (GMT-04:00) America/Santo_Domingo
                            </option>
                            <option value="America/St_Barthelemy">
                              (GMT-04:00) America/St_Barthelemy
                            </option>
                            <option value="America/St_Kitts">
                              (GMT-04:00) America/St_Kitts
                            </option>
                            <option value="America/St_Lucia">
                              (GMT-04:00) America/St_Lucia
                            </option>
                            <option value="America/St_Thomas">
                              (GMT-04:00) America/St_Thomas
                            </option>
                            <option value="America/St_Vincent">
                              (GMT-04:00) America/St_Vincent
                            </option>
                            <option value="America/Thunder_Bay">
                              (GMT-04:00) America/Thunder_Bay
                            </option>
                            <option value="America/Toronto">
                              (GMT-04:00) America/Toronto
                            </option>
                            <option value="America/Tortola">
                              (GMT-04:00) America/Tortola
                            </option>
                            <option value="America/Virgin">
                              (GMT-04:00) America/Virgin
                            </option>
                            <option value="Brazil/West">
                              (GMT-04:00) Brazil/West
                            </option>
                            <option value="Canada/Eastern">
                              (GMT-04:00) Canada/Eastern
                            </option>
                            <option value="Chile/Continental">
                              (GMT-04:00) Chile/Continental
                            </option>
                            <option value="Cuba">(GMT-04:00) Cuba</option>
                            <option value="EST5EDT">(GMT-04:00) EST5EDT</option>
                            <option value="Etc/GMT+4">
                              (GMT-04:00) Etc/GMT+4
                            </option>
                            <option value="US/East-Indiana">
                              (GMT-04:00) US/East-Indiana
                            </option>
                            <option value="US/Eastern">
                              (GMT-04:00) US/Eastern
                            </option>
                            <option value="US/Michigan">
                              (GMT-04:00) US/Michigan
                            </option>
                            <option value="America/Araguaina">
                              (GMT-03:00) America/Araguaina
                            </option>
                            <option value="America/Argentina/Buenos_Aires">
                              (GMT-03:00) America/Argentina/Buenos_Aires
                            </option>
                            <option value="America/Argentina/Catamarca">
                              (GMT-03:00) America/Argentina/Catamarca
                            </option>
                            <option value="America/Argentina/ComodRivadavia">
                              (GMT-03:00) America/Argentina/ComodRivadavia
                            </option>
                            <option value="America/Argentina/Cordoba">
                              (GMT-03:00) America/Argentina/Cordoba
                            </option>
                            <option value="America/Argentina/Jujuy">
                              (GMT-03:00) America/Argentina/Jujuy
                            </option>
                            <option value="America/Argentina/La_Rioja">
                              (GMT-03:00) America/Argentina/La_Rioja
                            </option>
                            <option value="America/Argentina/Mendoza">
                              (GMT-03:00) America/Argentina/Mendoza
                            </option>
                            <option value="America/Argentina/Rio_Gallegos">
                              (GMT-03:00) America/Argentina/Rio_Gallegos
                            </option>
                            <option value="America/Argentina/Salta">
                              (GMT-03:00) America/Argentina/Salta
                            </option>
                            <option value="America/Argentina/San_Juan">
                              (GMT-03:00) America/Argentina/San_Juan
                            </option>
                            <option value="America/Argentina/San_Luis">
                              (GMT-03:00) America/Argentina/San_Luis
                            </option>
                            <option value="America/Argentina/Tucuman">
                              (GMT-03:00) America/Argentina/Tucuman
                            </option>
                            <option value="America/Argentina/Ushuaia">
                              (GMT-03:00) America/Argentina/Ushuaia
                            </option>
                            <option value="America/Bahia">
                              (GMT-03:00) America/Bahia
                            </option>
                            <option value="America/Belem">
                              (GMT-03:00) America/Belem
                            </option>
                            <option value="America/Buenos_Aires">
                              (GMT-03:00) America/Buenos_Aires
                            </option>
                            <option value="America/Catamarca">
                              (GMT-03:00) America/Catamarca
                            </option>
                            <option value="America/Cayenne">
                              (GMT-03:00) America/Cayenne
                            </option>
                            <option value="America/Cordoba">
                              (GMT-03:00) America/Cordoba
                            </option>
                            <option value="America/Fortaleza">
                              (GMT-03:00) America/Fortaleza
                            </option>
                            <option value="America/Glace_Bay">
                              (GMT-03:00) America/Glace_Bay
                            </option>
                            <option value="America/Goose_Bay">
                              (GMT-03:00) America/Goose_Bay
                            </option>
                            <option value="America/Halifax">
                              (GMT-03:00) America/Halifax
                            </option>
                            <option value="America/Jujuy">
                              (GMT-03:00) America/Jujuy
                            </option>
                            <option value="America/Maceio">
                              (GMT-03:00) America/Maceio
                            </option>
                            <option value="America/Mendoza">
                              (GMT-03:00) America/Mendoza
                            </option>
                            <option value="America/Moncton">
                              (GMT-03:00) America/Moncton
                            </option>
                            <option value="America/Montevideo">
                              (GMT-03:00) America/Montevideo
                            </option>
                            <option value="America/Paramaribo">
                              (GMT-03:00) America/Paramaribo
                            </option>
                            <option value="America/Punta_Arenas">
                              (GMT-03:00) America/Punta_Arenas
                            </option>
                            <option value="America/Recife">
                              (GMT-03:00) America/Recife
                            </option>
                            <option value="America/Rosario">
                              (GMT-03:00) America/Rosario
                            </option>
                            <option value="America/Santarem">
                              (GMT-03:00) America/Santarem
                            </option>
                            <option value="America/Sao_Paulo">
                              (GMT-03:00) America/Sao_Paulo
                            </option>
                            <option value="America/Thule">
                              (GMT-03:00) America/Thule
                            </option>
                            <option value="Antarctica/Palmer">
                              (GMT-03:00) Antarctica/Palmer
                            </option>
                            <option value="Antarctica/Rothera">
                              (GMT-03:00) Antarctica/Rothera
                            </option>
                            <option value="Atlantic/Bermuda">
                              (GMT-03:00) Atlantic/Bermuda
                            </option>
                            <option value="Atlantic/Stanley">
                              (GMT-03:00) Atlantic/Stanley
                            </option>
                            <option value="Brazil/East">
                              (GMT-03:00) Brazil/East
                            </option>
                            <option value="Canada/Atlantic">
                              (GMT-03:00) Canada/Atlantic
                            </option>
                            <option value="Etc/GMT+3">
                              (GMT-03:00) Etc/GMT+3
                            </option>
                            <option value="America/St_Johns">
                              (GMT-02:30) America/St_Johns
                            </option>
                            <option value="Canada/Newfoundland">
                              (GMT-02:30) Canada/Newfoundland
                            </option>
                            <option value="America/Godthab">
                              (GMT-02:00) America/Godthab
                            </option>
                            <option value="America/Miquelon">
                              (GMT-02:00) America/Miquelon
                            </option>
                            <option value="America/Noronha">
                              (GMT-02:00) America/Noronha
                            </option>
                            <option value="America/Nuuk">
                              (GMT-02:00) America/Nuuk
                            </option>
                            <option value="Atlantic/South_Georgia">
                              (GMT-02:00) Atlantic/South_Georgia
                            </option>
                            <option value="Brazil/DeNoronha">
                              (GMT-02:00) Brazil/DeNoronha
                            </option>
                            <option value="Etc/GMT+2">
                              (GMT-02:00) Etc/GMT+2
                            </option>
                            <option value="Atlantic/Cape_Verde">
                              (GMT-01:00) Atlantic/Cape_Verde
                            </option>
                            <option value="Etc/GMT+1">
                              (GMT-01:00) Etc/GMT+1
                            </option>
                            <option value="Africa/Abidjan">
                              (GMT) Africa/Abidjan
                            </option>
                            <option value="Africa/Accra">
                              (GMT) Africa/Accra
                            </option>
                            <option value="Africa/Bamako">
                              (GMT) Africa/Bamako
                            </option>
                            <option value="Africa/Banjul">
                              (GMT) Africa/Banjul
                            </option>
                            <option value="Africa/Bissau">
                              (GMT) Africa/Bissau
                            </option>
                            <option value="Africa/Conakry">
                              (GMT) Africa/Conakry
                            </option>
                            <option value="Africa/Dakar">
                              (GMT) Africa/Dakar
                            </option>
                            <option value="Africa/Freetown">
                              (GMT) Africa/Freetown
                            </option>
                            <option value="Africa/Lome">
                              (GMT) Africa/Lome
                            </option>
                            <option value="Africa/Monrovia">
                              (GMT) Africa/Monrovia
                            </option>
                            <option value="Africa/Nouakchott">
                              (GMT) Africa/Nouakchott
                            </option>
                            <option value="Africa/Ouagadougou">
                              (GMT) Africa/Ouagadougou
                            </option>
                            <option value="Africa/Sao_Tome">
                              (GMT) Africa/Sao_Tome
                            </option>
                            <option value="Africa/Timbuktu">
                              (GMT) Africa/Timbuktu
                            </option>
                            <option value="America/Danmarkshavn">
                              (GMT) America/Danmarkshavn
                            </option>
                            <option value="America/Scoresbysund">
                              (GMT) America/Scoresbysund
                            </option>
                            <option value="Atlantic/Azores">
                              (GMT) Atlantic/Azores
                            </option>
                            <option value="Atlantic/Reykjavik">
                              (GMT) Atlantic/Reykjavik
                            </option>
                            <option value="Atlantic/St_Helena">
                              (GMT) Atlantic/St_Helena
                            </option>
                            <option value="Etc/GMT">(GMT) Etc/GMT</option>
                            <option value="Etc/GMT+0">(GMT) Etc/GMT+0</option>
                            <option value="Etc/GMT-0">(GMT) Etc/GMT-0</option>
                            <option value="Etc/GMT0">(GMT) Etc/GMT0</option>
                            <option value="Etc/Greenwich">
                              (GMT) Etc/Greenwich
                            </option>
                            <option value="Etc/UCT">(GMT) Etc/UCT</option>
                            <option value="Etc/UTC">(GMT) Etc/UTC</option>
                            <option value="Etc/Universal">
                              (GMT) Etc/Universal
                            </option>
                            <option value="Etc/Zulu">(GMT) Etc/Zulu</option>
                            <option value="GMT">(GMT) GMT</option>
                            <option value="GMT+0">(GMT) GMT+0</option>
                            <option value="GMT-0">(GMT) GMT-0</option>
                            <option value="GMT0">(GMT) GMT0</option>
                            <option value="Greenwich">(GMT) Greenwich</option>
                            <option value="Iceland">(GMT) Iceland</option>
                            <option value="UCT">(GMT) UCT</option>
                            <option value="UTC">(GMT) UTC</option>
                            <option value="Universal">(GMT) Universal</option>
                            <option value="Zulu">(GMT) Zulu</option>
                            <option value="Africa/Algiers">
                              (GMT+01:00) Africa/Algiers
                            </option>
                            <option value="Africa/Bangui">
                              (GMT+01:00) Africa/Bangui
                            </option>
                            <option value="Africa/Brazzaville">
                              (GMT+01:00) Africa/Brazzaville
                            </option>
                            <option value="Africa/Casablanca">
                              (GMT+01:00) Africa/Casablanca
                            </option>
                            <option value="Africa/Douala">
                              (GMT+01:00) Africa/Douala
                            </option>
                            <option value="Africa/El_Aaiun">
                              (GMT+01:00) Africa/El_Aaiun
                            </option>
                            <option value="Africa/Kinshasa">
                              (GMT+01:00) Africa/Kinshasa
                            </option>
                            <option value="Africa/Lagos">
                              (GMT+01:00) Africa/Lagos
                            </option>
                            <option value="Africa/Libreville">
                              (GMT+01:00) Africa/Libreville
                            </option>
                            <option value="Africa/Luanda">
                              (GMT+01:00) Africa/Luanda
                            </option>
                            <option value="Africa/Malabo">
                              (GMT+01:00) Africa/Malabo
                            </option>
                            <option value="Africa/Ndjamena">
                              (GMT+01:00) Africa/Ndjamena
                            </option>
                            <option value="Africa/Niamey">
                              (GMT+01:00) Africa/Niamey
                            </option>
                            <option value="Africa/Porto-Novo">
                              (GMT+01:00) Africa/Porto-Novo
                            </option>
                            <option value="Africa/Tunis">
                              (GMT+01:00) Africa/Tunis
                            </option>
                            <option value="Atlantic/Canary">
                              (GMT+01:00) Atlantic/Canary
                            </option>
                            <option value="Atlantic/Faeroe">
                              (GMT+01:00) Atlantic/Faeroe
                            </option>
                            <option value="Atlantic/Faroe">
                              (GMT+01:00) Atlantic/Faroe
                            </option>
                            <option value="Atlantic/Madeira">
                              (GMT+01:00) Atlantic/Madeira
                            </option>
                            <option value="Eire">(GMT+01:00) Eire</option>
                            <option value="Etc/GMT-1">
                              (GMT+01:00) Etc/GMT-1
                            </option>
                            <option value="Europe/Belfast">
                              (GMT+01:00) Europe/Belfast
                            </option>
                            <option value="Europe/Dublin">
                              (GMT+01:00) Europe/Dublin
                            </option>
                            <option value="Europe/Guernsey">
                              (GMT+01:00) Europe/Guernsey
                            </option>
                            <option value="Europe/Isle_of_Man">
                              (GMT+01:00) Europe/Isle_of_Man
                            </option>
                            <option value="Europe/Jersey">
                              (GMT+01:00) Europe/Jersey
                            </option>
                            <option value="Europe/Lisbon">
                              (GMT+01:00) Europe/Lisbon
                            </option>
                            <option value="Europe/London">
                              (GMT+01:00) Europe/London
                            </option>
                            <option value="GB">(GMT+01:00) GB</option>
                            <option value="GB-Eire">(GMT+01:00) GB-Eire</option>
                            <option value="Portugal">
                              (GMT+01:00) Portugal
                            </option>
                            <option value="WET">(GMT+01:00) WET</option>
                            <option value="Africa/Blantyre">
                              (GMT+02:00) Africa/Blantyre
                            </option>
                            <option value="Africa/Bujumbura">
                              (GMT+02:00) Africa/Bujumbura
                            </option>
                            <option value="Africa/Ceuta">
                              (GMT+02:00) Africa/Ceuta
                            </option>
                            <option value="Africa/Gaborone">
                              (GMT+02:00) Africa/Gaborone
                            </option>
                            <option value="Africa/Harare">
                              (GMT+02:00) Africa/Harare
                            </option>
                            <option value="Africa/Johannesburg">
                              (GMT+02:00) Africa/Johannesburg
                            </option>
                            <option value="Africa/Juba">
                              (GMT+02:00) Africa/Juba
                            </option>
                            <option value="Africa/Khartoum">
                              (GMT+02:00) Africa/Khartoum
                            </option>
                            <option value="Africa/Kigali">
                              (GMT+02:00) Africa/Kigali
                            </option>
                            <option value="Africa/Lubumbashi">
                              (GMT+02:00) Africa/Lubumbashi
                            </option>
                            <option value="Africa/Lusaka">
                              (GMT+02:00) Africa/Lusaka
                            </option>
                            <option value="Africa/Maputo">
                              (GMT+02:00) Africa/Maputo
                            </option>
                            <option value="Africa/Maseru">
                              (GMT+02:00) Africa/Maseru
                            </option>
                            <option value="Africa/Mbabane">
                              (GMT+02:00) Africa/Mbabane
                            </option>
                            <option value="Africa/Tripoli">
                              (GMT+02:00) Africa/Tripoli
                            </option>
                            <option value="Africa/Windhoek">
                              (GMT+02:00) Africa/Windhoek
                            </option>
                            <option value="Antarctica/Troll">
                              (GMT+02:00) Antarctica/Troll
                            </option>
                            <option value="Arctic/Longyearbyen">
                              (GMT+02:00) Arctic/Longyearbyen
                            </option>
                            <option value="Atlantic/Jan_Mayen">
                              (GMT+02:00) Atlantic/Jan_Mayen
                            </option>
                            <option value="CET">(GMT+02:00) CET</option>
                            <option value="Etc/GMT-2">
                              (GMT+02:00) Etc/GMT-2
                            </option>
                            <option value="Europe/Amsterdam">
                              (GMT+02:00) Europe/Amsterdam
                            </option>
                            <option value="Europe/Andorra">
                              (GMT+02:00) Europe/Andorra
                            </option>
                            <option value="Europe/Belgrade">
                              (GMT+02:00) Europe/Belgrade
                            </option>
                            <option value="Europe/Berlin">
                              (GMT+02:00) Europe/Berlin
                            </option>
                            <option value="Europe/Bratislava">
                              (GMT+02:00) Europe/Bratislava
                            </option>
                            <option value="Europe/Brussels">
                              (GMT+02:00) Europe/Brussels
                            </option>
                            <option value="Europe/Budapest">
                              (GMT+02:00) Europe/Budapest
                            </option>
                            <option value="Europe/Busingen">
                              (GMT+02:00) Europe/Busingen
                            </option>
                            <option value="Europe/Copenhagen">
                              (GMT+02:00) Europe/Copenhagen
                            </option>
                            <option value="Europe/Gibraltar">
                              (GMT+02:00) Europe/Gibraltar
                            </option>
                            <option value="Europe/Kaliningrad">
                              (GMT+02:00) Europe/Kaliningrad
                            </option>
                            <option value="Europe/Ljubljana">
                              (GMT+02:00) Europe/Ljubljana
                            </option>
                            <option value="Europe/Luxembourg">
                              (GMT+02:00) Europe/Luxembourg
                            </option>
                            <option value="Europe/Madrid">
                              (GMT+02:00) Europe/Madrid
                            </option>
                            <option value="Europe/Malta">
                              (GMT+02:00) Europe/Malta
                            </option>
                            <option value="Europe/Monaco">
                              (GMT+02:00) Europe/Monaco
                            </option>
                            <option value="Europe/Oslo">
                              (GMT+02:00) Europe/Oslo
                            </option>
                            <option value="Europe/Paris">
                              (GMT+02:00) Europe/Paris
                            </option>
                            <option value="Europe/Podgorica">
                              (GMT+02:00) Europe/Podgorica
                            </option>
                            <option value="Europe/Prague">
                              (GMT+02:00) Europe/Prague
                            </option>
                            <option value="Europe/Rome">
                              (GMT+02:00) Europe/Rome
                            </option>
                            <option value="Europe/San_Marino">
                              (GMT+02:00) Europe/San_Marino
                            </option>
                            <option value="Europe/Sarajevo">
                              (GMT+02:00) Europe/Sarajevo
                            </option>
                            <option value="Europe/Skopje">
                              (GMT+02:00) Europe/Skopje
                            </option>
                            <option value="Europe/Stockholm">
                              (GMT+02:00) Europe/Stockholm
                            </option>
                            <option value="Europe/Tirane">
                              (GMT+02:00) Europe/Tirane
                            </option>
                            <option value="Europe/Vaduz">
                              (GMT+02:00) Europe/Vaduz
                            </option>
                            <option value="Europe/Vatican">
                              (GMT+02:00) Europe/Vatican
                            </option>
                            <option value="Europe/Vienna">
                              (GMT+02:00) Europe/Vienna
                            </option>
                            <option value="Europe/Warsaw">
                              (GMT+02:00) Europe/Warsaw
                            </option>
                            <option value="Europe/Zagreb">
                              (GMT+02:00) Europe/Zagreb
                            </option>
                            <option value="Europe/Zurich">
                              (GMT+02:00) Europe/Zurich
                            </option>
                            <option value="Libya">(GMT+02:00) Libya</option>
                            <option value="MET">(GMT+02:00) MET</option>
                            <option value="Poland">(GMT+02:00) Poland</option>
                            <option value="Africa/Addis_Ababa">
                              (GMT+03:00) Africa/Addis_Ababa
                            </option>
                            <option value="Africa/Asmara">
                              (GMT+03:00) Africa/Asmara
                            </option>
                            <option value="Africa/Asmera">
                              (GMT+03:00) Africa/Asmera
                            </option>
                            <option value="Africa/Cairo">
                              (GMT+03:00) Africa/Cairo
                            </option>
                            <option value="Africa/Dar_es_Salaam">
                              (GMT+03:00) Africa/Dar_es_Salaam
                            </option>
                            <option value="Africa/Djibouti">
                              (GMT+03:00) Africa/Djibouti
                            </option>
                            <option value="Africa/Kampala">
                              (GMT+03:00) Africa/Kampala
                            </option>
                            <option value="Africa/Mogadishu">
                              (GMT+03:00) Africa/Mogadishu
                            </option>
                            <option value="Africa/Nairobi">
                              (GMT+03:00) Africa/Nairobi
                            </option>
                            <option value="Antarctica/Syowa">
                              (GMT+03:00) Antarctica/Syowa
                            </option>
                            <option value="Asia/Aden">
                              (GMT+03:00) Asia/Aden
                            </option>
                            <option value="Asia/Amman">
                              (GMT+03:00) Asia/Amman
                            </option>
                            <option value="Asia/Baghdad">
                              (GMT+03:00) Asia/Baghdad
                            </option>
                            <option value="Asia/Bahrain">
                              (GMT+03:00) Asia/Bahrain
                            </option>
                            <option value="Asia/Beirut">
                              (GMT+03:00) Asia/Beirut
                            </option>
                            <option value="Asia/Damascus">
                              (GMT+03:00) Asia/Damascus
                            </option>
                            <option value="Asia/Famagusta">
                              (GMT+03:00) Asia/Famagusta
                            </option>
                            <option value="Asia/Gaza">
                              (GMT+03:00) Asia/Gaza
                            </option>
                            <option value="Asia/Hebron">
                              (GMT+03:00) Asia/Hebron
                            </option>
                            <option value="Asia/Istanbul">
                              (GMT+03:00) Asia/Istanbul
                            </option>
                            <option value="Asia/Jerusalem">
                              (GMT+03:00) Asia/Jerusalem
                            </option>
                            <option value="Asia/Kuwait">
                              (GMT+03:00) Asia/Kuwait
                            </option>
                            <option value="Asia/Nicosia">
                              (GMT+03:00) Asia/Nicosia
                            </option>
                            <option value="Asia/Qatar">
                              (GMT+03:00) Asia/Qatar
                            </option>
                            <option value="Asia/Riyadh">
                              (GMT+03:00) Asia/Riyadh
                            </option>
                            <option value="Asia/Tel_Aviv">
                              (GMT+03:00) Asia/Tel_Aviv
                            </option>
                            <option value="EET">(GMT+03:00) EET</option>
                            <option value="Egypt">(GMT+03:00) Egypt</option>
                            <option value="Etc/GMT-3">
                              (GMT+03:00) Etc/GMT-3
                            </option>
                            <option value="Europe/Athens">
                              (GMT+03:00) Europe/Athens
                            </option>
                            <option value="Europe/Bucharest">
                              (GMT+03:00) Europe/Bucharest
                            </option>
                            <option value="Europe/Chisinau">
                              (GMT+03:00) Europe/Chisinau
                            </option>
                            <option value="Europe/Helsinki">
                              (GMT+03:00) Europe/Helsinki
                            </option>
                            <option value="Europe/Istanbul">
                              (GMT+03:00) Europe/Istanbul
                            </option>
                            <option value="Europe/Kiev">
                              (GMT+03:00) Europe/Kiev
                            </option>
                            <option value="Europe/Kirov">
                              (GMT+03:00) Europe/Kirov
                            </option>
                            <option value="Europe/Kyiv">
                              (GMT+03:00) Europe/Kyiv
                            </option>
                            <option value="Europe/Mariehamn">
                              (GMT+03:00) Europe/Mariehamn
                            </option>
                            <option value="Europe/Minsk">
                              (GMT+03:00) Europe/Minsk
                            </option>
                            <option value="Europe/Moscow">
                              (GMT+03:00) Europe/Moscow
                            </option>
                            <option value="Europe/Nicosia">
                              (GMT+03:00) Europe/Nicosia
                            </option>
                            <option value="Europe/Riga">
                              (GMT+03:00) Europe/Riga
                            </option>
                            <option value="Europe/Simferopol">
                              (GMT+03:00) Europe/Simferopol
                            </option>
                            <option value="Europe/Sofia">
                              (GMT+03:00) Europe/Sofia
                            </option>
                            <option value="Europe/Tallinn">
                              (GMT+03:00) Europe/Tallinn
                            </option>
                            <option value="Europe/Tiraspol">
                              (GMT+03:00) Europe/Tiraspol
                            </option>
                            <option value="Europe/Uzhgorod">
                              (GMT+03:00) Europe/Uzhgorod
                            </option>
                            <option value="Europe/Vilnius">
                              (GMT+03:00) Europe/Vilnius
                            </option>
                            <option value="Europe/Volgograd">
                              (GMT+03:00) Europe/Volgograd
                            </option>
                            <option value="Europe/Zaporozhye">
                              (GMT+03:00) Europe/Zaporozhye
                            </option>
                            <option value="Indian/Antananarivo">
                              (GMT+03:00) Indian/Antananarivo
                            </option>
                            <option value="Indian/Comoro">
                              (GMT+03:00) Indian/Comoro
                            </option>
                            <option value="Indian/Mayotte">
                              (GMT+03:00) Indian/Mayotte
                            </option>
                            <option value="Israel">(GMT+03:00) Israel</option>
                            <option value="Turkey">(GMT+03:00) Turkey</option>
                            <option value="W-SU">(GMT+03:00) W-SU</option>
                            <option value="Asia/Tehran">
                              (GMT+03:30) Asia/Tehran
                            </option>
                            <option value="Iran">(GMT+03:30) Iran</option>
                            <option value="Asia/Baku">
                              (GMT+04:00) Asia/Baku
                            </option>
                            <option value="Asia/Dubai">
                              (GMT+04:00) Asia/Dubai
                            </option>
                            <option value="Asia/Muscat">
                              (GMT+04:00) Asia/Muscat
                            </option>
                            <option value="Asia/Tbilisi">
                              (GMT+04:00) Asia/Tbilisi
                            </option>
                            <option value="Asia/Yerevan">
                              (GMT+04:00) Asia/Yerevan
                            </option>
                            <option value="Etc/GMT-4">
                              (GMT+04:00) Etc/GMT-4
                            </option>
                            <option value="Europe/Astrakhan">
                              (GMT+04:00) Europe/Astrakhan
                            </option>
                            <option value="Europe/Samara">
                              (GMT+04:00) Europe/Samara
                            </option>
                            <option value="Europe/Saratov">
                              (GMT+04:00) Europe/Saratov
                            </option>
                            <option value="Europe/Ulyanovsk">
                              (GMT+04:00) Europe/Ulyanovsk
                            </option>
                            <option value="Indian/Mahe">
                              (GMT+04:00) Indian/Mahe
                            </option>
                            <option value="Indian/Mauritius">
                              (GMT+04:00) Indian/Mauritius
                            </option>
                            <option value="Indian/Reunion">
                              (GMT+04:00) Indian/Reunion
                            </option>
                            <option value="Asia/Kabul">
                              (GMT+04:30) Asia/Kabul
                            </option>
                            <option value="Antarctica/Mawson">
                              (GMT+05:00) Antarctica/Mawson
                            </option>
                            <option value="Asia/Aqtau">
                              (GMT+05:00) Asia/Aqtau
                            </option>
                            <option value="Asia/Aqtobe">
                              (GMT+05:00) Asia/Aqtobe
                            </option>
                            <option value="Asia/Ashgabat">
                              (GMT+05:00) Asia/Ashgabat
                            </option>
                            <option value="Asia/Ashkhabad">
                              (GMT+05:00) Asia/Ashkhabad
                            </option>
                            <option value="Asia/Atyrau">
                              (GMT+05:00) Asia/Atyrau
                            </option>
                            <option value="Asia/Dushanbe">
                              (GMT+05:00) Asia/Dushanbe
                            </option>
                            <option value="Asia/Karachi">
                              (GMT+05:00) Asia/Karachi
                            </option>
                            <option value="Asia/Oral">
                              (GMT+05:00) Asia/Oral
                            </option>
                            <option value="Asia/Qyzylorda">
                              (GMT+05:00) Asia/Qyzylorda
                            </option>
                            <option value="Asia/Samarkand">
                              (GMT+05:00) Asia/Samarkand
                            </option>
                            <option value="Asia/Tashkent">
                              (GMT+05:00) Asia/Tashkent
                            </option>
                            <option value="Asia/Yekaterinburg">
                              (GMT+05:00) Asia/Yekaterinburg
                            </option>
                            <option value="Etc/GMT-5">
                              (GMT+05:00) Etc/GMT-5
                            </option>
                            <option value="Indian/Kerguelen">
                              (GMT+05:00) Indian/Kerguelen
                            </option>
                            <option value="Indian/Maldives">
                              (GMT+05:00) Indian/Maldives
                            </option>
                            <option value="Asia/Calcutta">
                              (GMT+05:30) Asia/Calcutta
                            </option>
                            <option value="Asia/Colombo">
                              (GMT+05:30) Asia/Colombo
                            </option>
                            <option value="Asia/Kolkata">
                              (GMT+05:30) Asia/Kolkata
                            </option>
                            <option value="Asia/Kathmandu">
                              (GMT+05:45) Asia/Kathmandu
                            </option>
                            <option value="Asia/Katmandu">
                              (GMT+05:45) Asia/Katmandu
                            </option>
                            <option value="Antarctica/Vostok">
                              (GMT+06:00) Antarctica/Vostok
                            </option>
                            <option value="Asia/Almaty">
                              (GMT+06:00) Asia/Almaty
                            </option>
                            <option value="Asia/Bishkek">
                              (GMT+06:00) Asia/Bishkek
                            </option>
                            <option value="Asia/Dacca">
                              (GMT+06:00) Asia/Dacca
                            </option>
                            <option value="Asia/Dhaka">
                              (GMT+06:00) Asia/Dhaka
                            </option>
                            <option value="Asia/Kashgar">
                              (GMT+06:00) Asia/Kashgar
                            </option>
                            <option value="Asia/Omsk">
                              (GMT+06:00) Asia/Omsk
                            </option>
                            <option value="Asia/Qostanay">
                              (GMT+06:00) Asia/Qostanay
                            </option>
                            <option value="Asia/Thimbu">
                              (GMT+06:00) Asia/Thimbu
                            </option>
                            <option value="Asia/Thimphu">
                              (GMT+06:00) Asia/Thimphu
                            </option>
                            <option value="Asia/Urumqi">
                              (GMT+06:00) Asia/Urumqi
                            </option>
                            <option value="Etc/GMT-6">
                              (GMT+06:00) Etc/GMT-6
                            </option>
                            <option value="Indian/Chagos">
                              (GMT+06:00) Indian/Chagos
                            </option>
                            <option value="Asia/Rangoon">
                              (GMT+06:30) Asia/Rangoon
                            </option>
                            <option value="Asia/Yangon">
                              (GMT+06:30) Asia/Yangon
                            </option>
                            <option value="Indian/Cocos">
                              (GMT+06:30) Indian/Cocos
                            </option>
                            <option value="Antarctica/Davis">
                              (GMT+07:00) Antarctica/Davis
                            </option>
                            <option value="Asia/Bangkok">
                              (GMT+07:00) Asia/Bangkok
                            </option>
                            <option value="Asia/Barnaul">
                              (GMT+07:00) Asia/Barnaul
                            </option>
                            <option value="Asia/Ho_Chi_Minh">
                              (GMT+07:00) Asia/Ho_Chi_Minh
                            </option>
                            <option value="Asia/Hovd">
                              (GMT+07:00) Asia/Hovd
                            </option>
                            <option value="Asia/Jakarta">
                              (GMT+07:00) Asia/Jakarta
                            </option>
                            <option value="Asia/Krasnoyarsk">
                              (GMT+07:00) Asia/Krasnoyarsk
                            </option>
                            <option value="Asia/Novokuznetsk">
                              (GMT+07:00) Asia/Novokuznetsk
                            </option>
                            <option value="Asia/Novosibirsk">
                              (GMT+07:00) Asia/Novosibirsk
                            </option>
                            <option value="Asia/Phnom_Penh">
                              (GMT+07:00) Asia/Phnom_Penh
                            </option>
                            <option value="Asia/Pontianak">
                              (GMT+07:00) Asia/Pontianak
                            </option>
                            <option value="Asia/Saigon">
                              (GMT+07:00) Asia/Saigon
                            </option>
                            <option value="Asia/Tomsk">
                              (GMT+07:00) Asia/Tomsk
                            </option>
                            <option value="Asia/Vientiane">
                              (GMT+07:00) Asia/Vientiane
                            </option>
                            <option value="Etc/GMT-7">
                              (GMT+07:00) Etc/GMT-7
                            </option>
                            <option value="Indian/Christmas">
                              (GMT+07:00) Indian/Christmas
                            </option>
                            <option value="Asia/Brunei">
                              (GMT+08:00) Asia/Brunei
                            </option>
                            <option value="Asia/Choibalsan">
                              (GMT+08:00) Asia/Choibalsan
                            </option>
                            <option value="Asia/Chongqing">
                              (GMT+08:00) Asia/Chongqing
                            </option>
                            <option value="Asia/Chungking">
                              (GMT+08:00) Asia/Chungking
                            </option>
                            <option value="Asia/Harbin">
                              (GMT+08:00) Asia/Harbin
                            </option>
                            <option value="Asia/Hong_Kong">
                              (GMT+08:00) Asia/Hong_Kong
                            </option>
                            <option value="Asia/Irkutsk">
                              (GMT+08:00) Asia/Irkutsk
                            </option>
                            <option value="Asia/Kuala_Lumpur">
                              (GMT+08:00) Asia/Kuala_Lumpur
                            </option>
                            <option value="Asia/Kuching">
                              (GMT+08:00) Asia/Kuching
                            </option>
                            <option value="Asia/Macao">
                              (GMT+08:00) Asia/Macao
                            </option>
                            <option value="Asia/Macau">
                              (GMT+08:00) Asia/Macau
                            </option>
                            <option value="Asia/Makassar">
                              (GMT+08:00) Asia/Makassar
                            </option>
                            <option value="Asia/Manila">
                              (GMT+08:00) Asia/Manila
                            </option>
                            <option value="Asia/Shanghai">
                              (GMT+08:00) Asia/Shanghai
                            </option>
                            <option value="Asia/Singapore">
                              (GMT+08:00) Asia/Singapore
                            </option>
                            <option value="Asia/Taipei">
                              (GMT+08:00) Asia/Taipei
                            </option>
                            <option value="Asia/Ujung_Pandang">
                              (GMT+08:00) Asia/Ujung_Pandang
                            </option>
                            <option value="Asia/Ulaanbaatar">
                              (GMT+08:00) Asia/Ulaanbaatar
                            </option>
                            <option value="Asia/Ulan_Bator">
                              (GMT+08:00) Asia/Ulan_Bator
                            </option>
                            <option value="Australia/Perth">
                              (GMT+08:00) Australia/Perth
                            </option>
                            <option value="Australia/West">
                              (GMT+08:00) Australia/West
                            </option>
                            <option value="Etc/GMT-8">
                              (GMT+08:00) Etc/GMT-8
                            </option>
                            <option value="Hongkong">
                              (GMT+08:00) Hongkong
                            </option>
                            <option value="PRC">(GMT+08:00) PRC</option>
                            <option value="ROC">(GMT+08:00) ROC</option>
                            <option value="Singapore">
                              (GMT+08:00) Singapore
                            </option>
                            <option value="Australia/Eucla">
                              (GMT+08:45) Australia/Eucla
                            </option>
                            <option value="Asia/Chita">
                              (GMT+09:00) Asia/Chita
                            </option>
                            <option value="Asia/Dili">
                              (GMT+09:00) Asia/Dili
                            </option>
                            <option value="Asia/Jayapura">
                              (GMT+09:00) Asia/Jayapura
                            </option>
                            <option value="Asia/Khandyga">
                              (GMT+09:00) Asia/Khandyga
                            </option>
                            <option value="Asia/Pyongyang">
                              (GMT+09:00) Asia/Pyongyang
                            </option>
                            <option value="Asia/Seoul">
                              (GMT+09:00) Asia/Seoul
                            </option>
                            <option value="Asia/Tokyo">
                              (GMT+09:00) Asia/Tokyo
                            </option>
                            <option value="Asia/Yakutsk">
                              (GMT+09:00) Asia/Yakutsk
                            </option>
                            <option value="Etc/GMT-9">
                              (GMT+09:00) Etc/GMT-9
                            </option>
                            <option value="Japan">(GMT+09:00) Japan</option>
                            <option value="Pacific/Palau">
                              (GMT+09:00) Pacific/Palau
                            </option>
                            <option value="ROK">(GMT+09:00) ROK</option>
                            <option value="Australia/Adelaide">
                              (GMT+09:30) Australia/Adelaide
                            </option>
                            <option value="Australia/Broken_Hill">
                              (GMT+09:30) Australia/Broken_Hill
                            </option>
                            <option value="Australia/Darwin">
                              (GMT+09:30) Australia/Darwin
                            </option>
                            <option value="Australia/North">
                              (GMT+09:30) Australia/North
                            </option>
                            <option value="Australia/South">
                              (GMT+09:30) Australia/South
                            </option>
                            <option value="Australia/Yancowinna">
                              (GMT+09:30) Australia/Yancowinna
                            </option>
                            <option value="Antarctica/DumontDUrville">
                              (GMT+10:00) Antarctica/DumontDUrville
                            </option>
                            <option value="Antarctica/Macquarie">
                              (GMT+10:00) Antarctica/Macquarie
                            </option>
                            <option value="Asia/Ust-Nera">
                              (GMT+10:00) Asia/Ust-Nera
                            </option>
                            <option value="Asia/Vladivostok">
                              (GMT+10:00) Asia/Vladivostok
                            </option>
                            <option value="Australia/ACT">
                              (GMT+10:00) Australia/ACT
                            </option>
                            <option value="Australia/Brisbane">
                              (GMT+10:00) Australia/Brisbane
                            </option>
                            <option value="Australia/Canberra">
                              (GMT+10:00) Australia/Canberra
                            </option>
                            <option value="Australia/Currie">
                              (GMT+10:00) Australia/Currie
                            </option>
                            <option value="Australia/Hobart">
                              (GMT+10:00) Australia/Hobart
                            </option>
                            <option value="Australia/Lindeman">
                              (GMT+10:00) Australia/Lindeman
                            </option>
                            <option value="Australia/Melbourne">
                              (GMT+10:00) Australia/Melbourne
                            </option>
                            <option value="Australia/NSW">
                              (GMT+10:00) Australia/NSW
                            </option>
                            <option value="Australia/Queensland">
                              (GMT+10:00) Australia/Queensland
                            </option>
                            <option value="Australia/Sydney">
                              (GMT+10:00) Australia/Sydney
                            </option>
                            <option value="Australia/Tasmania">
                              (GMT+10:00) Australia/Tasmania
                            </option>
                            <option value="Australia/Victoria">
                              (GMT+10:00) Australia/Victoria
                            </option>
                            <option value="Etc/GMT-10">
                              (GMT+10:00) Etc/GMT-10
                            </option>
                            <option value="Pacific/Chuuk">
                              (GMT+10:00) Pacific/Chuuk
                            </option>
                            <option value="Pacific/Guam">
                              (GMT+10:00) Pacific/Guam
                            </option>
                            <option value="Pacific/Port_Moresby">
                              (GMT+10:00) Pacific/Port_Moresby
                            </option>
                            <option value="Pacific/Saipan">
                              (GMT+10:00) Pacific/Saipan
                            </option>
                            <option value="Pacific/Truk">
                              (GMT+10:00) Pacific/Truk
                            </option>
                            <option value="Pacific/Yap">
                              (GMT+10:00) Pacific/Yap
                            </option>
                            <option value="Australia/LHI">
                              (GMT+10:30) Australia/LHI
                            </option>
                            <option value="Australia/Lord_Howe">
                              (GMT+10:30) Australia/Lord_Howe
                            </option>
                            <option value="Antarctica/Casey">
                              (GMT+11:00) Antarctica/Casey
                            </option>
                            <option value="Asia/Magadan">
                              (GMT+11:00) Asia/Magadan
                            </option>
                            <option value="Asia/Sakhalin">
                              (GMT+11:00) Asia/Sakhalin
                            </option>
                            <option value="Asia/Srednekolymsk">
                              (GMT+11:00) Asia/Srednekolymsk
                            </option>
                            <option value="Etc/GMT-11">
                              (GMT+11:00) Etc/GMT-11
                            </option>
                            <option value="Pacific/Bougainville">
                              (GMT+11:00) Pacific/Bougainville
                            </option>
                            <option value="Pacific/Efate">
                              (GMT+11:00) Pacific/Efate
                            </option>
                            <option value="Pacific/Guadalcanal">
                              (GMT+11:00) Pacific/Guadalcanal
                            </option>
                            <option value="Pacific/Kosrae">
                              (GMT+11:00) Pacific/Kosrae
                            </option>
                            <option value="Pacific/Norfolk">
                              (GMT+11:00) Pacific/Norfolk
                            </option>
                            <option value="Pacific/Noumea">
                              (GMT+11:00) Pacific/Noumea
                            </option>
                            <option value="Pacific/Pohnpei">
                              (GMT+11:00) Pacific/Pohnpei
                            </option>
                            <option value="Pacific/Ponape">
                              (GMT+11:00) Pacific/Ponape
                            </option>
                            <option value="Antarctica/McMurdo">
                              (GMT+12:00) Antarctica/McMurdo
                            </option>
                            <option value="Antarctica/South_Pole">
                              (GMT+12:00) Antarctica/South_Pole
                            </option>
                            <option value="Asia/Anadyr">
                              (GMT+12:00) Asia/Anadyr
                            </option>
                            <option value="Asia/Kamchatka">
                              (GMT+12:00) Asia/Kamchatka
                            </option>
                            <option value="Etc/GMT-12">
                              (GMT+12:00) Etc/GMT-12
                            </option>
                            <option value="Kwajalein">
                              (GMT+12:00) Kwajalein
                            </option>
                            <option value="NZ">(GMT+12:00) NZ</option>
                            <option value="Pacific/Auckland">
                              (GMT+12:00) Pacific/Auckland
                            </option>
                            <option value="Pacific/Fiji">
                              (GMT+12:00) Pacific/Fiji
                            </option>
                            <option value="Pacific/Funafuti">
                              (GMT+12:00) Pacific/Funafuti
                            </option>
                            <option value="Pacific/Kwajalein">
                              (GMT+12:00) Pacific/Kwajalein
                            </option>
                            <option value="Pacific/Majuro">
                              (GMT+12:00) Pacific/Majuro
                            </option>
                            <option value="Pacific/Nauru">
                              (GMT+12:00) Pacific/Nauru
                            </option>
                            <option value="Pacific/Tarawa">
                              (GMT+12:00) Pacific/Tarawa
                            </option>
                            <option value="Pacific/Wake">
                              (GMT+12:00) Pacific/Wake
                            </option>
                            <option value="Pacific/Wallis">
                              (GMT+12:00) Pacific/Wallis
                            </option>
                            <option value="NZ-CHAT">(GMT+12:45) NZ-CHAT</option>
                            <option value="Pacific/Chatham">
                              (GMT+12:45) Pacific/Chatham
                            </option>
                            <option value="Etc/GMT-13">
                              (GMT+13:00) Etc/GMT-13
                            </option>
                            <option value="Pacific/Apia">
                              (GMT+13:00) Pacific/Apia
                            </option>
                            <option value="Pacific/Enderbury">
                              (GMT+13:00) Pacific/Enderbury
                            </option>
                            <option value="Pacific/Fakaofo">
                              (GMT+13:00) Pacific/Fakaofo
                            </option>
                            <option value="Pacific/Kanton">
                              (GMT+13:00) Pacific/Kanton
                            </option>
                            <option value="Pacific/Tongatapu">
                              (GMT+13:00) Pacific/Tongatapu
                            </option>
                            <option value="Etc/GMT-14">
                              (GMT+14:00) Etc/GMT-14
                            </option>
                            <option value="Pacific/Kiritimati">
                              (GMT+14:00) Pacific/Kiritimati
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">Gender</p>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <input
                            type="radio"
                            className="genderInp"
                            value={"Male"}
                            name="Gender"
                            checked={userProfileData?.Gender == "Male"}
                            onChange={updateProfileData}
                          />
                          Male
                          <input
                            type="radio"
                            className="genderInp"
                            value={"Female"}
                            name="Gender"
                            checked={userProfileData?.Gender == "Female"}
                            onChange={updateProfileData}
                            style={{ marginLeft: "30px" }}
                          />
                          Female
                        </div>
                      </div>
                      <div className="row input-item align-items-center">
                        <div className="col-xl-4 col-md-3">
                          <p className="mb-0">DOB</p>
                        </div>
                        <div className="col-xl-8 col-md-9">
                          <input
                            type="date"
                            className="textInp"
                            name="Date_of_Birth"
                            value={userProfileData?.Date_of_Birth}
                            onChange={updateProfileData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ========================web presence================= */}
                  <div className="row pt-30">
                    <h4>Web Presence</h4>
                    <div className="col-md-6">
                      <div className="input-item">
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="LinkedIn Profile Url"
                          name="Linkedin_Url"
                          value={userProfileData?.Linkedin_Url}
                          onChange={updateProfileData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Blog Profile Url"
                          name="Blog_Profile_Url"
                          value={userProfileData?.Blog_Profile_Url}
                          onChange={updateProfileData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Facebook Profile Url"
                          name="Facebook_Profile_Url"
                          value={userProfileData?.Facebook_Profile_Url}
                          onChange={updateProfileData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Your Website Link"
                          name="Your_Website_Link"
                          value={userProfileData?.Your_Website_Link}
                          onChange={updateProfileData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Twitter Profile Url"
                          name="Twitter_Profile_Url"
                          value={userProfileData?.Twitter_Profile_Url}
                          onChange={updateProfileData}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-item">
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Any other web page"
                          name="Any_Other_Web_Url"
                          value={userProfileData?.Any_Other_Web_Url}
                          onChange={updateProfileData}
                        />
                      </div>
                    </div>
                  </div>
                  {/* ====================work experience================== */}
                  <div className="row pt-30 " id="workExperienceDiv">
                    <h4>Work Experience</h4>
                    <div
                      className="addBtnDiv"
                      onClick={() => addWorkExperience({})}
                    >
                      + Add work experience
                    </div>
                  </div>
                  {/* ====================Academics================== */}
                  <div className="row pt-30" id="AcademicsDiv">
                    <h4>Academics</h4>
                    <div className="addBtnDiv" onClick={addAcademics}>
                      + Add qualification
                    </div>
                  </div>
                  {/* ====================Interest================== */}
                  <div className="row pt-30 input-item " id="InterestDiv">
                    <h4>Interests</h4>
                    <div className="addBtnDiv" onClick={() => addInterest("")}>
                      + Add Interest
                    </div>
                  </div>
                  {/* ====================Objective of the training================== */}
                  <div className="row pt-30 input-item ">
                    <h4>Objective of the training</h4>

                    <div className="col-md-6">
                      <select
                        className="textInp ps-2"
                        value={userProfileData?.Objective_of_Training}
                        defaultValue={"select"}
                        name="Objective_of_Training"
                        onChange={updateProfileData}
                      >
                        <option disabled value="select">
                          select
                        </option>
                        <option value="Certification">Certification</option>
                        <option value="Finding a better job">
                          Finding a better job
                        </option>
                        <option value="Growth in current job">
                          Growth in current job
                        </option>
                        <option value="Learninig">Learninig</option>
                      </select>
                    </div>
                  </div>
                  {/* ====================Training Funded By================== */}
                  <div className="row pt-30 input-item ">
                    <h4>Training Funded By</h4>

                    <div className="col-md-6">
                      <select
                        className="textInp ps-2"
                        value={userProfileData?.Training_Funded_By}
                        defaultValue={"select"}
                        name="Training_Funded_By"
                        onChange={updateProfileData}
                      >
                        <option value="select" disabled>
                          select
                        </option>
                        <option value="Organisation">Organisation</option>
                        <option value="Self">Self</option>
                      </select>
                    </div>
                  </div>
                  <div className="newsletterForm d-flex justify-content-center justify-content-md-start">
                    <button type="submit" style={{ minWidth: "200px" }}>
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default Profile;
