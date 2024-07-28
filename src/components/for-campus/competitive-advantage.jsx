import React from "react";
import CustomButton from "../custom/custom-button";

function CompetitiveAdvantage() {
  const data = [
    {
      title: "Industry exposure",
      desc: "Exposure to current industry standards and practices by making students job-ready.",
    },
    {
      title: "Networking opportunities",
      desc: "Opportunity to interact with professionals and mentors, leading to valuable networking, internships, and job offers.",
    },
    {
      title: "Industry-relevant curriculum",
      desc: "Training programs designed by professionals and aligned with current industry standards.",
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
                    Take the next step in your career with our professional
                    certificate courses
                  </h1>
                  <CustomButton text={"Contact Us"} url={"#campus-contact"} />
                </div>
              </div>
              <div className="col-lg-6 col-xl-5  d-flex justify-content-center">
                <img
                  src={`/assets/img/for-campus/studentslaptop.jpg`}
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
