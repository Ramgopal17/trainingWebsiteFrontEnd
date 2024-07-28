import React from "react";
import CallToActionForm from "./call-to-action-form-2";

function ContactSection() {
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
      <style jsx>{`
        .tp-ab-sv-tabs-title {
          font-size: 24px;
        }
        .single-img {
          border-bottom: 1px solid gray;
        }
        .single-img img {
          width: 100%;
          height: 70px;
        }
        .scrollHeaderPadding {
          scroll-margin-block-start: 110px;
        }
      `}</style>
      <div className=" tp-section pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="breadcrumb__title-2 swiper-no-swiping">
                Transform Your Career with In-Demand Technical Communication
                Skills
              </h1>

              <p>
                Our comprehensive professional training programs are developed,
                keeping the technology challenges coming ahead. These
                professional courses are designed after a detailed discussion
                with industry experts, extensive research, and knowledge
                development with practical implementation of our skills to stand
                out in the competitive job market.
              </p>
              <p>
                Explore our training program offerings and register for the
                course that aligns with your career goals.
              </p>
              <p>Contact us today for a free counseling session.</p>
            </div>
            <div className="col-lg-6 scrollHeaderPadding" id="campus-contact">
              <CallToActionForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactSection;
