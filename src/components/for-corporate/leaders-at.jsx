import React from "react";

const LeadersAt = () => {
  const companies = [
    {
      src: "/assets/img/home/companies/ADB-Safegatelogo.jpg",
      alt: "",
    },
    {
      src: "/assets/img/home/companies/airtightpng.png",
      alt: "",
    },
    {
      src: "/assets/img/home/companies/avaya.png",
      alt: "",
    },
    {
      src: "/assets/img/home/companies/imagination.png",
      alt: "",
    },
    {
      src: "/assets/img/home/companies/servicemax.png",
      alt: "",
    },
    {
      src: "/assets/img/home/companies/stryker.png",
      alt: "",
    },
  ];
  return (
    <>
      <style jsx>
        {`
          .single-img {
            border-bottom: 1px solid gray;
          }
          .single-img img {
            width: 100%;
            height: 70px;
          }
        `}
      </style>
      <div className="leaders-at   pb-50 pt-10 container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5">
            <div className="row">
              {companies?.map((company, i) => (
                <div className="col-sm-4 col-6 image-wrapper mb-20" key={i}>
                  <div className="single-img pb-2">
                    <img src={company.src} alt={company?.alt} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 mt-25 mt-lg-0">
            <h2 className="tp-ab-sv-tabs-title">
              Metapercept understands the importance of equipping your workforce
              with the latest skills and knowledge to drive your business
              forward.{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadersAt;
