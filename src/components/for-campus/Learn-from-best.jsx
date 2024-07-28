import React from "react";

const LearnFromBest = () => {
  const data = [
    "Industry expert's knowledge and insights",
    "Industry-relevant curriculum",
    "Soft skills development",
    "Exposure to real-world scenarios and case studies in training",
    "Assessment and certification-based training programs",
    "Validated skillset for competitive advantage",
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
                Our training offers
              </h1>
              <div className="singleCourseCard pb-30">
                <ul>
                  {data.map((item, index) => (
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
