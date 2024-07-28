import React from "react";

const Skills = () => {
  const importanceOfTraining = [
    "Practical skill development ",
    "Industry-specific work exposure",
    "Networking opportunities",
    "Career guidance and mentorship",
    "Enhanced employability",
    "Real-world problem solving",
  ];
  return (
    <>
      <style jsx>{`
        .tp-ab-sv-tabs-title {
          font-size: 24px;
        }
      `}</style>
      <div className="skills tp-section pt-30 pb-30 theme-bg-7">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <h1 className="breadcrumb__title-2 swiper-no-swiping">
                The Importance of campus training
              </h1>
              <p>
                Enhance employability with professional skills-based training
                for the world's top technology companies.
              </p>
              <div className="singleCourseCard  pb-10">
                <ul>
                  {importanceOfTraining.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
