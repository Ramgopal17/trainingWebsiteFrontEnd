import { BackEndApi } from "@/src/data/auth_token";
import Link from "next/link";
import React from "react";

function ViewCertificateCard({ course }) {
  // console.log("completed course certificate", course);
  return (
    <div className="viewCertificateCard mb-30">
      <div className="row">
        <div className="col-xl-9 courseName d-md-flex ">
          <div className="d-flex  align-items-center justify-content-center mb-md-0 mb-3">
            <img
              src={`${BackEndApi}${course?.Course_Image[0]?.formats?.thumbnail?.url}`}
              alt={course?.Title}
              className="courseImg"
            />
            {/* <img src="/assets/img/basic.jpg" alt="" className="courseImg" /> */}
          </div>
          <div className="d-flex flex-column  justify-content-center">
            <h4 className="text-center text-md-start">
              {/* Basic Technical Writing */}
              {course?.Title}
            </h4>
            <p style={{ fontSize: "14px" }} className="mb-0">
              Great Work! You have completed course successfully and can view
              your course certificate now.
            </p>
          </div>
        </div>
        <div className="col-xl-3 viewCert d-flex justify-content-center align-items-center">
          <Link
            href={`/user/profile/certificates/courseid?courseid=${course?.id}`}
            style={{
              "--tp-common-white": "rgb(108,96,254)",
              color: "white",
              padding: "12px 15px",
              fontSize: "13px",
            }}
            className="tp-white-btn"
            aria-label="read more"
          >
            View Certificate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewCertificateCard;
