import React, { Fragment, useEffect, useState } from "react";
import CustomButton from "../custom/custom-button";
import CallToActionForm from "@/src/forms/call-to-action-form-2";
import Faq from "../custom/faq";
import RelatedCourses from "./related-courses";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { displayPopup } from "@/utils/popup";
import { BackEndApi } from "@/src/data/auth_token";
import { useAuthContext } from "@/context/Auth-context";

const skills = ["Agile", "Git", "SQL", "Core Java", "Spring", "Spring Boot"];
const tools = [
  "https://www.simplilearn.com/ice9/tools_covered/aws.jpg",
  "https://www.simplilearn.com/ice9/tools_covered/docker.png",
  "https://www.simplilearn.com/ice9/tools_covered/GitHub.png",
  "https://www.simplilearn.com/ice9/tools_covered/jenkins.png",
  "https://www.simplilearn.com/ice9/accreditation_icons/JIRA.jpg",
  "https://www.simplilearn.com/ice9/tools_covered/mysql.png",
  "https://www.simplilearn.com/ice9/tools_covered/node.png",
];
const keyFeatures = [
  "Kickstart Full Stack Java Developer career with industry-aligned curriculum by experts",
  "Get job-ready with career services from the start of the Full Stack Java Developer course",
  "8+ 1:1 mock interview and mentorship sessions to boost your confidence",
  "Webinars on professional networking, job search strategies, interview tips, aptitude test etc.",
  "Exclusive Job Portal access to land your dream job",
  "Enhance your resume & develop LinkedIn profile with expert webinars and DIY tools",
  "Hands-on practice through 20+ projects, assessments, and tests",
  "Learn 8+ cutting edge tools like SQL, Java, etc.",
  "100+ hours of live interaction and applied learning with expert trainers",
];
const Syllabus = [
  {
    title: "An Introduction to API",
    description: [
      "What is an API?",
      "What is API writing?",
      "Who uses API documentation?",
      "What do they want?",
      "Types of API writing",
      "Why there is a need for API writing?",
      "Essential skills for an API writer",
      "Different types of API documents",
    ],
  },
  {
    title: "An Introduction to API",
    description: [
      "What is an API?",
      "What is API writing?",
      "Who uses API documentation?",
      "What do they want?",
      "Types of API writing",
      "Why there is a need for API writing?",
      "Essential skills for an API writer",
      "Different types of API documents",
    ],
  },
  {
    title: "An Introduction to API",
    description: [
      "What is an API?",
      "What is API writing?",
      "Who uses API documentation?",
      "What do they want?",
      "Types of API writing",
      "Why there is a need for API writing?",
      "Essential skills for an API writer",
      "Different types of API documents",
    ],
  },
  {
    title: "An Introduction to API",
    description: [
      "What is an API?",
      "What is API writing?",
      "Who uses API documentation?",
      "What do they want?",
      "Types of API writing",
      "Why there is a need for API writing?",
      "Essential skills for an API writer",
      "Different types of API documents",
    ],
  },
  {
    title: "An Introduction to API",
    description: [
      "What is an API?",
      "What is API writing?",
      "Who uses API documentation?",
      "What do they want?",
      "Types of API writing",
      "Why there is a need for API writing?",
      "Essential skills for an API writer",
      "Different types of API documents",
    ],
  },
];
function MoreDetails({ activeCourse, checkUserLogin }) {
  const ToggleOpenClass = (e) => {
    const allSingleSyl = document.getElementsByClassName("singleSyl");
    let parentDiv = "";
    if (e.target.className === "title") {
      parentDiv = e.target.parentElement;
    } else {
      parentDiv = e.target.parentElement.parentElement;
    }
    for (const singleSyl of allSingleSyl) {
      if (singleSyl != parentDiv) {
        singleSyl.classList.remove("open");
        // const arrow = singleSyl.getElementsByClassName("rotateArrow")[0];
        // arrow.style.transform = "translateY(-50%) rotate(-90deg)";
      }
      // else {
      //   const arrow = singleSyl.getElementsByClassName("rotateArrow")[0];
      //   if (arrow.style.transform == "translateY(-50%) rotate(-90deg)") {
      //     arrow.style.transform = "translateY(-50%) rotate(0deg)";
      //   } else {
      //     arrow.style.transform = "translateY(-50%) rotate(-90deg)";
      //   }
      // }
    }
    parentDiv.classList.toggle("open");
  };
  const [isPurchased, SetIsPurchased] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();
  const checkPurchased = () => {
    // console.log("in check");
    user?.Course_Details?.map((course) => {
      if (course?.Title == activeCourse?.attributes?.Title) {
        // console.log(
        //   "is purchsed",
        //   course?.Title,
        //   activeCourse?.attributes?.Title
        // );
        SetIsPurchased(true);
      }
    });
  };
  useEffect(() => {
    checkPurchased();
  }, [router.query]);
  return (
    <>
      <style global jsx>
        {`
          .SkillsCoveredDiv .markdown ul {
            display: flex;
            flex-wrap: wrap;
          }
          .SkillsCoveredDiv .markdown ul li {
            font-size: 16px;
            font-weight: 400;
            padding-left: 50px;
            padding-top: 3px;
            position: relative;
            line-height: 1.5;
            flex-basis: 25%;
          }
          .SkillsCoveredDiv .markdown ul li:before {
            content: "✔";
            position: absolute;
            left: 0;
            top: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            border-radius: 50%;
            background-color: #086d38;
          }
          @media (max-width: 575px) {
            .SkillsCoveredDiv .markdown ul li {
              flex-basis: 50%;
            }
          }
        `}
      </style>
      <div className="theme-bg-76">
        <div className="container  pb-25">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <h2 className="tp-section__title mb-20">
                    {activeCourse?.attributes?.Title} training details
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" tp-section text-center">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem
              fugiat ratione a totam. Animi voluptatibus nihil dolores earum
              neque mollitia officia, ipsa odit qui praesentium. Assumenda
              incidunt error unde rem.
            </p>
          </div> */}
          <div className="row">
            <div className="col-xl-7 wow tpfadeUp">
              {/* <div className="tp-ab-sv-tabs mb-30">
              <ul
                className="nav nav-pills mb-30 d-flex justify-content-center justify-content-xl-start"
                style={{ gap: "10px" }}
              >
                {subTypesData.map((data, i) => {
                  return (
                    <li className="nav-item" role="presentation" key={i}>
                      <button
                        style={{
                          margin: 0,
                          boxShadow: "0px 0px 32px 0px rgba(0, 0, 0, 0.08)",
                        }}
                        className={` nav-link ${
                          data.name === currentTypeInfo.name ? "active" : ""
                        }`}
                        onClick={() => setCurrentTypeInfo(data)}
                      >
                        {data.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active">
                  <div className=" tp-section">
                    <h3 className="tp-ab-sv-tabs-title">
                      {currentTypeInfo.title}
                    </h3>
                    <p
                      style={{
                        textAlign: "justify",
                      }}
                    >
                      {currentTypeInfo.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
              <div className="tp-ab-sv-tabs mb-20">
                <ul
                  className="nav nav-pills mb-20 justify-content-md-start justify-content-center"
                  id="pills-tab"
                  role="tablist"
                  style={{ gap: "10px" }}
                >
                  <li className="nav-item" role="presentation">
                    <button
                      tabIndex="-1"
                      className="nav-link active"
                      id="2000"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-2000"
                      type="button"
                      role="tab"
                      aria-controls="pills-2000"
                      aria-selected="true"
                      style={{
                        margin: 0,
                        boxShadow: "0px 0px 32px 0px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      About
                    </button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                  <button
                    tabIndex="-1"
                    className="nav-link"
                    id="2010"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-2010"
                    type="button"
                    role="tab"
                    aria-controls="pills-2010"
                    aria-selected="false"
                    style={{
                      margin: 0,
                      boxShadow: "0px 0px 32px 0px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    Outcomes
                  </button>
                </li> */}
                  <li className="nav-item" role="presentation">
                    <button
                      tabIndex="-1"
                      className="nav-link"
                      id="2018"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-2018"
                      type="button"
                      role="tab"
                      aria-controls="pills-2018"
                      aria-selected="false"
                      style={{
                        margin: 0,
                        boxShadow: "0px 0px 32px 0px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      Key features
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      tabIndex="-1"
                      className="nav-link"
                      id="2022"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-2022"
                      type="button"
                      role="tab"
                      aria-controls="pills-2022"
                      aria-selected="false"
                      style={{
                        margin: 0,
                        boxShadow: "0px 0px 32px 0px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      Full syllabus
                    </button>
                  </li>
                </ul>
                <div className="tab-content mb-30" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-2000"
                    role="tabpanel"
                    aria-labelledby="2000"
                  >
                    <div className="tp-section">
                      {/* <h3 className="tp-ab-sv-tabs-title">
                        what you learn pending
                      </h3> */}
                      <h4 className="tp-ab-sv-tabs-title">Skills covered</h4>
                      {/* <div className="row ">
                        {skills.map((skill) => {
                          return (
                            <div className="col-sm-4 col-6">
                              <p className="SkillsPara">
                                <i className="fal fa-check mr-20"></i>
                                {skill}
                              </p>
                            </div>
                          );
                        })}
                      </div> */}
                      <div className="row SkillsCoveredDiv">
                        <ReactMarkdown
                          children={
                            activeCourse?.attributes?.About_Course?.data
                              ?.attributes?.Skill_Covered
                          }
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          // transformImageUri={(uri) =>
                          //   uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                          // }
                          className="markdown"
                        />
                      </div>
                      {/* <button className="toggleMoreLessBtn">View More</button> */}
                      <h4 className="tp-ab-sv-tabs-title pt-20">
                        Tools covered
                      </h4>
                      <div className="row ">
                        {/* {tools.map((tool) => { */}
                        {activeCourse?.attributes?.About_Course?.data?.attributes?.Tools_Covered_Images?.data.map(
                          (tool, i) => {
                            return (
                              <div
                                key={i}
                                className="col-sm-3 col-6 d-flex  align-items-center mb-15"
                              >
                                <img
                                  src={`${BackEndApi}${tool?.attributes?.formats?.thumbnail?.url}`}
                                  // src={tool}
                                  alt={tool?.attributes?.name?.split(".")[0]}
                                  width={70}
                                  // style={{ mixBlendMode: "multiply" }}
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="pills-2018"
                    role="tabpanel"
                    aria-labelledby="2018"
                  >
                    <div className="tp-section keyFeaturesDiv">
                      <ul>
                        {/* {keyFeatures.map((feature, i) => {
                          return (
                            <li key={i}>
                              <p>{feature}</p>
                            </li>
                          );
                        })} */}
                        {/* <li>{activeCourse?.attributes?.Key_Features}</li> */}
                        {/* <li> */}
                        <ReactMarkdown
                          children={activeCourse?.attributes?.Key_Features}
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                          // transformImageUri={(uri) =>
                          //   uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                          // }
                          className="markdown"
                        />
                        {/* </li> */}
                      </ul>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-2022"
                    role="tabpanel"
                    aria-labelledby="2022"
                  >
                    <div className="tp-section fullSyllabusDiv">
                      {activeCourse?.attributes?.Full_Syllabus?.data?.attributes?.Syllabus_Chapters?.data.map(
                        (Syllabus, i) => {
                          return (
                            <div
                              className={`singleSyl ${i == 0 ? "open" : ""}`}
                              key={i}
                            >
                              <div className="title" onClick={ToggleOpenClass}>
                                <h5>{Syllabus?.attributes?.Title}</h5>
                                <i
                                  className="fa-solid fa-chevron-down rotateArrow"
                                  id="rotateArrow"
                                  style={{ fontSize: "20px" }}
                                ></i>
                              </div>
                              <div className="desc mb-2 ">
                                <ul>
                                  {/* {sylbs.description.map((desc, i) => {
                                    return (
                                      <li key={i}>
                                        <p>{desc}</p>
                                      </li>
                                    );
                                  })} */}
                                  <ReactMarkdown
                                    children={
                                      // activeCourse?.attributes?.Key_Features
                                      Syllabus?.attributes?.Description
                                    }
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    // transformImageUri={(uri) =>
                                    //   uri.startsWith("http") ? uri : `${globalEnv.api}${uri}`
                                    // }
                                    className="markdown"
                                  />
                                </ul>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>

                {/* {isPurchased ? (
                  <>
                    <CustomButton
                      text={"View Course"}
                      url={"/user/profile/my-courses"}
                    />
                  </>
                ) : (
                  <div
                    className="newsletterForm "
                    style={{ minWidth: "130px" }}
                  >
                    <button
                      type="submit"
                      onClick={checkUserLogin}
                      className="buttonTextSize"
                    >
                      ENROLL NOW
                    </button>
                  </div>
                )} */}
              </div>
            </div>
            <div className="col-xl-5 wow tpfadeUp ">
              <div className="row justify-content-center p-3 pt-0">
                <CallToActionForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoreDetails;
