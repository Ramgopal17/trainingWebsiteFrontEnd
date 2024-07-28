import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import CustomButton from "../custom/custom-button";
import { useRouter } from "next/router";
import { BackEndApi } from "@/src/data/auth_token";
import { displayPopup } from "@/utils/popup";
import Swal from "sweetalert2";
import { useAuthContext } from "@/context/Auth-context";
import { avgRatingCourse } from "@/utils/avg-rating-course";
import { useRafState } from "react-use";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CompetitiveAdvantage({
  activeCourse,
  testimonials,

  checkUserLogin,
}) {
  const data = [
    {
      title: "Enhanced employee performance",
      desc: "Equip employees with the skills and knowledge they need to perform their jobs effectively.",
    },
    {
      title: "Staying ahead of Industry trends",
      desc: "Curated training courses to ensures your team is always up-to-date with the latest industry trends.",
    },
    {
      title: "Boosted Innovation and creativity",
      desc: "Encourage employees to think creatively and develop innovative solutions.",
    },
  ];
  return (
    <>
      <style jsx>
        {`
          .span-number {
            font-size: 30px;
            color: var(--tp-theme-vogue);
            font-weight: 500;
          }
        `}
      </style>

      <div className="">
        <div className="topDetailsBanner pt-25 pb-100 theme-bg-7">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="tp-section">
                  <h1
                    className="breadcrumb__title wow tpfadeUp mb-40"
                    style={{ fontWeight: "bold" }}
                  >
                    Unlock the potential of your team with strategic skill
                    development
                  </h1>

                  <CustomButton
                    text={"Contact Us"}
                    url={"#corporate-contact"}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-xl-5 d-flex justify-content-center">
                <img
                  src={`/assets/img/for-corporate/top-banner.jpg`}
                  alt="df"
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container extraInfoDiv ">
          <div className="row  justify-content-center m-1 ">
            <div className="col-xl-12 col-lg-12 col-md-9 dataHolder tp-section">
              <div className="row p-4 pb-0 pb-lg-4  parentDiv">
                {data?.map((item, i) => (
                  <div key={i} className="col-lg-4 mb-lg-0 mb-4 text-center ">
                    <span className="span-number">{item.title}</span>
                    <p className="mb-lg-0 mb-2 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompetitiveAdvantage;
