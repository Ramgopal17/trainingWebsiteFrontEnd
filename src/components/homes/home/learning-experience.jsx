import React from "react";

const learningData = [
  {
    title: "Develop skills for real career growth",
    desc: "Cutting-edge curriculum designed in guidance with industry and academia to develop job-ready skills",
    img: "/assets/img/home/learning-experience/skill.png",
    imgName: "skills",
  },
  {
    title: "Learn from experts active in their field",
    desc: "Leading practitioners who bring current best practices and case studies to sessions that fit into your work schedule.",
    img: "/assets/img/home/learning-experience/teacher.png",
    imgName: "learning expert",
  },
  {
    title: "Learn by working on real-world problems",
    desc: "Capstone projects involving real world data sets with virtual labs for hands-on learning",
    img: "/assets/img/home/learning-experience/puzzle.png",
    imgName: "real-world problems",
  },
  {
    title: "Structured guidance ensuring learning never stops",
    desc: "24x7 Learning support from mentors and a community of like-minded peers to resolve any conceptual doubts",
    img: "/assets/img/home/learning-experience/24-hours.png",
    imgName: "guidance",
  },
];

function LearningExperience() {
  return (
    <div className="theme-bg-7">
      <div className="container pt-25 pb-25 learningExperience">
        <div className="row">
          <div className="col-12 wow tpfadeUp">
            <div className="section-title-wraper">
              <div className="tp-section text-center">
                <h2 className="tp-section__title mb-20">
                  An immersive learning experience
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {learningData?.map((data, i) => (
            <div key={i} className="col-md-6 col-xxl-3 mb-20">
              <div className=" singleLearningExp tp-section d-flex flex-column align-items-center">
                <img alt={data.imgName} src={data.img} width={50} />
                <h4 className="mt-20 mb-10">{data.title}</h4>
                <p style={{ fontSize: "16px" }}>{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningExperience;
