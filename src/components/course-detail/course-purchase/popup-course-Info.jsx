import React from "react";
import CustomButton from "../../custom/custom-button";
import { hidePopup } from "@/utils/popup";

function PopupCourseInfo({ activeCourse }) {
  // console.log("actcou", activeCourse);
  return (
    <div className="popupContainer" id="popupContainer">
      <div className="popupNotification">
        <i
          className="fa-regular fa-circle-xmark closePopup"
          onClick={() => hidePopup("popupContainer")}
        ></i>
        <div className="courseName">
          <h4>{activeCourse?.attributes?.Title}</h4>
        </div>
        <div className="courseDesc">
          <h4 className="text-center">
            Purchase Course : ₹ {activeCourse?.attributes?.Program_Fee}
          </h4>
          <div className="d-flex tp-section mt-50 align-items-center imgInfoWrapper">
            <img
              src="/assets/img/gold-medal.png"
              alt="medal"
              width={70}
              className="mr-20"
            />
            <p>
              Commit to earning a Certificate—it's a trusted, shareable way to
              showcase your new skills.
            </p>
          </div>
          <div className="d-flex justify-content-center pt-30">
            <CustomButton
              text={"Continue"}
              url={`/payments/checkout?course=${activeCourse?.attributes?.Slug}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupCourseInfo;
