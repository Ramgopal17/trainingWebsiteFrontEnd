import React from "react";

const JoinColleges = () => {
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
      <div className="theme-bg-7">
        <div className="leaders-at    pb-30 pt-30 container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="tp-section">
                <h1 className="breadcrumb__title-2 swiper-no-swiping mb-20">
                  Industry Professionals Led Training
                </h1>
                <p>
                  Equip students with practical authoring and CCMS tool
                  training, technical communication skills, domain-specific
                  industry insights, and the confidence needed to excel in
                  future careers.
                </p>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinColleges;
