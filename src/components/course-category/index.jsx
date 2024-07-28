import React, { useEffect } from "react";
import CourseCard from "../course-card/course-card";
import CallToActionForm from "@/src/forms/call-to-action-form-2";
import { colorGroup } from "@/utils/color-code";
import { useRouter } from "next/router";
import { getSingleCategoryInfo } from "@/api/get-single-category-info";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const programPartner = [
  { src: "/assets/img/home/companies/avaya.png", name: "avaya" },
  { src: "/assets/img/home/companies/algolia.png", name: "algolia" },
  { src: "/assets/img/home/companies/barsys.png", name: "barsys" },
  { src: "/assets/img/home/companies/hitachi.png", name: "hitachi" },
  { src: "/assets/img/home/companies/corum.png", name: "corum" },
  { src: "/assets/img/home/companies/mojo.png", name: "mojo" },
];
function CourseCategory() {
  let colorIndex = 0;
  const router = useRouter();
  const [categoryInfo, setCategoryInfo] = useState({});
  const getCatInfo = async () => {
    const info = await getSingleCategoryInfo(router.query?.coursecategory);
    // console.log("info", info);
    setCategoryInfo(info);
  };
  useEffect(() => {
    getCatInfo();
  }, [router.query]);
  return (
    <div className="courseCatDiv">
      <div className="topBanner pt-50 pb-50">
        <div className="container tp-section">
          <div className="row">
            <div className="col-lg-6">
              {categoryInfo?.attributes?.Title ? (
                <h2 className="tp-section__title">
                  {categoryInfo?.attributes?.Title}
                </h2>
              ) : (
                <Skeleton height={30} className="mb-20 mt-20" />
              )}
              {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="CourseDesc pt-25 pb-25 tp-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <p style={{ minHeight: "150px" }}>
                {" "}
                {categoryInfo?.attributes?.Category_Short_Description ? (
                  categoryInfo?.attributes?.Category_Short_Description
                ) : (
                  <Skeleton count={7} />
                )}
              </p>
            </div>
            <div className="col-lg-6 p-relative certificateImgDiv">
              <img
                className="certificateImg"
                src="/assets/img/certificate-made.jpg"
                alt={categoryInfo?.attributes?.Title}
              />
            </div>
          </div>
          {/* <div className="programPartner">
            <h4 className="pt-10 pb-10">Our Program Partners:</h4>
            <div className="row">
              {programPartner.map((partner, i) => {
                return (
                  <div key={i} className="col-lg-2 col-sm-3 col-6 pb-10">
                    <img
                      src={partner.src}
                      alt={partner.name}
                      style={{ width: "80%" }}
                    />
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
      <div className="theme-bg-7">
        <div className="container pt-25 pb-25 ">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <h2 className="tp-section__title mb-10">
                    Certification courses
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" tp-section text-center">
            <p
              className="pb-20 wow tpfadeUp mb-0"
              data-wow-delay=".4s"
              style={{ color: "var(--tp-grey-3)" }}
            >
              Get certified by certification bodies and deepen your expertise
            </p>
          </div>
          <div className="row justify-content-center">
            {/* {categoryInfo?.attributes?.Course_Details?.data?.map(
              (course, i) => {
                if (colorIndex < colorGroup.length - 1) {
                  colorIndex++;
                } else {
                  colorIndex = 0;
                }
                return (
                  <CourseCard
                    key={i}
                    color={colorGroup[colorIndex - 1]}
                    course={course}
                  />
                );
              }
            )} */}
            {categoryInfo?.attributes?.Course_Details?.data?.length > 0 ? (
              categoryInfo?.attributes?.Course_Details?.data?.map(
                (course, i) => {
                  if (colorIndex < colorGroup.length - 1) {
                    colorIndex++;
                  } else {
                    colorIndex = 0;
                  }
                  return (
                    <CourseCard
                      key={i}
                      color={colorGroup[colorIndex - 1]}
                      course={course}
                    />
                  );
                }
              )
            ) : (
              <>
                <div className="col-md-4">
                  <Skeleton height={300} />
                </div>
                <div className="col-md-4">
                  <Skeleton height={300} />
                </div>
                <div className="col-md-4">
                  <Skeleton height={300} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* ========================help================= */}
      <div>
        <div className="container pt-25 d-block d-lg-none ">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <h2 className="tp-section__title mb-10">
                    Need help finding your program
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" tp-section text-center">
            <p
              className="pb-20 wow tpfadeUp mb-0"
              data-wow-delay=".4s"
              style={{ color: "var(--tp-grey-3)" }}
            >
              Fill out this form and we will get back to you
            </p>
          </div>
        </div>
        <div className="p-relative mb-25 mt-lg-4">
          <div className="container">
            <div className="row justify-content-end">
              <div
                className="col-xxl-5 col-xl-5 col-lg-8 d-flex justify-content-end"
                style={{ zIndex: "1" }}
              >
                <CallToActionForm />
              </div>
            </div>
          </div>
          <div
            className="p-absolute d-none d-lg-flex align-items-center"
            style={{
              left: "0",
              width: "100%",
              height: "350px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "linear-gradient(to right, #fcb713 , #fdce60)",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <div className="section-title-wraper">
                    <div className="tp-section text-center">
                      <h2
                        className="tp-section__title mb-40"
                        style={{ fontSize: "45px" }}
                      >
                        Need help finding your program
                      </h2>
                    </div>
                  </div>
                  <div className=" tp-section text-center">
                    <p
                      className=" wow tpfadeUp mb-0"
                      data-wow-delay=".4s"
                      style={{
                        color: "white",
                        fontSize: "22px",
                        fontWeight: "500",
                      }}
                    >
                      Fill out this form and we will get back to you
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <img
            src="/assets/img/banner-background.jpg"
            alt=""
            className="p-absolute"
            style={{
              left: "0",
              width: "100%",
              height: "450px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          /> */}
        </div>
      </div>
      {/* ========================help ori================= */}
      {/* <div>
        <div className="container pt-50 pb-50 ">
          <div className="row">
            <div className="col-12 wow tpfadeUp">
              <div className="section-title-wraper">
                <div className="tp-section text-center">
                  <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
                    Need Help
                  </span>

                  <h2 className="tp-section__title mb-40">
                    Need help finding your Program
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className=" tp-section text-center">
            <p
              className="pb-60 wow tpfadeUp mb-0"
              data-wow-delay=".4s"
              style={{ color: "var(--tp-grey-3)" }}
            >
              Fill out this form and we will get back to you
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-9">
              <CallToActionForm />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default CourseCategory;
