import React from "react";

const Skills = () => {
  const keyCompetencies = [
    "Better team collaboration and communication",
    "Consistency in quality and standard of work",
    "Greater employee engagement  in their work",
    "Develop innovative ideas and creative solutions to challenges",
    "We equip your workforce with specialized skills in DITA, authoring tools, and technical writing to boost performance and productivity.",
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
                Develop key competencies throughout the workforce
              </h1>
              <div className="singleCourseCard pb-30">
                <ul>
                  {keyCompetencies.map((item, index) => (
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
