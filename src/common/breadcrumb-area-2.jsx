import Link from "next/link";
import React from "react";

const BreadcrumbArea = ({
  // acive_menu = "About",
  title = "Our Company Histoy",
  // slug,
  backImage = "/assets/img/breadcrumb/Maskgroup16.png",
  backColor = "#fef5f6",
}) => {
  return (
    <>
      <div
        className="breadcrumb__area theme-bg pt-120 pb-120"
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundColor: backColor,
          backgroundPosition: "right top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                {/* <div className="breadcrumb__list mb-10">
                  <span>
                    <Link href="/">Home</Link>
                  </span>
                  <span className="dvdr dvdr-line"></span>

                  {slug && (
                    <>
                      <span>
                        <Link href={slug.url}>{slug.name}</Link>
                      </span>{" "}
                      <span className="dvdr dvdr-line"></span>
                    </>
                  )}

                  <span className="tp-bc-acive-menu">{acive_menu}</span>
                </div> */}
                <h3 className="breadcrumb__title">{title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbArea;
