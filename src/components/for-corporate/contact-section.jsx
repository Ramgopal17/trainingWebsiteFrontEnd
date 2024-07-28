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
      <div className="theme-bg-7 tp-section pt-30 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="breadcrumb__title-2 swiper-no-swiping">
                Are you ready to equip your team with advanced technical
                communication skills?
              </h1>
              <p>
                Our industry-aligned programs give your employees the advanced
                skills and knowledge they need to excel in their roles and drive
                your business forward. Contact us today to elevate your team’s
                capabilities in technical documentation and content management.
              </p>
              <p>Get in touch with our team.</p>
            </div>
            <div
              className="col-lg-6 scrollHeaderPadding"
              id="corporate-contact"
            >
              <CallToActionForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactSection;
