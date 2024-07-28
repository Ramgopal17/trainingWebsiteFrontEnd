import React from "react";

const LearnFromBest = () => {
  const WhatMakes = [
    "Customized training programs",
    "Learn from industry professionals",
    "Comprehensive skill development",
    "Proven track record of delivering practical training",
  ];
  return (
    <>
      <style jsx>{`
        .tp-ab-sv-tabs-title {
          font-size: 24px;
        }
      `}</style>
      <div className="skills tp-section pt-30 pb-30">
        <div className="container">
          <div className="row flex-lg-row justify-content-between flex-column-reverse">
            <div className="col-lg-6 col-xl-5">
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
            <div className="col-lg-6">
              <h1 className="breadcrumb__title-2 swiper-no-swiping">
                What makes Metapercept a trusted partner?
              </h1>

              <div className="singleCourseCard pb-30">
                <ul>
                  {WhatMakes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnFromBest;
