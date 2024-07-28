import React from "react";

const BreadcrumbArea = ({
  title = "Our Company Histoy",
  backImage = "/assets/img/breadcrumb/bg_5.png",
  backColor = "#fddfe0",
  theme = "redTheme",
}) => {
  return (
    <>
      <style jsx>
        {`
          .bg-panel-glass {
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2),
              inset 0 0 200px rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            position: relative;
            z-index: 1;
            background: #f6f6f629;
            overflow: hidden;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            padding: 3rem 2rem;
          }
          .bg-panel-glass::after {
            border-top-right-radius: 50%;
            content: "";
            display: block;
            height: 120%;
            width: 130%;
            position: absolute;
            left: 0;
            top: -15%;
            transform: translate(0, 0);
            transform-origin: bottom left;
            transition: 0.5s transform ease-out;
            z-index: -1;
            animation: background-color-change linear 0.5s 1;
          }
          .bg-panel-glass.redTheme::after {
            background-color: #ec1c24;
          }
          .bg-panel-glass.greenTheme::after {
            background-color: #086d38;
          }
          .bg-panel-glass.blueTheme::after {
            background-color: #324da0;
          }
          .bg-panel-glass.orangeTheme::after {
            background-color: #f47f20;
          }
          .bg-panel-glass.yellowTheme::after {
            background-color: #fcb713;
          }
          .bg-panel-glass.grayTheme::after {
            background-color: #115f80;
          }

          .bg-panel-glass .breadcrumb__title,
          .bg-panel-glass .tp-section p {
            color: white;
            animation: text-color-change linear 0.5s 1;
          }
          .bannerText p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-align: justify;
          }
          .breadcrumb__area {
            padding-top: 100px;
            padding-bottom: 100px;
          }
          @keyframes background-color-change {
            0% {
              transform: translate(-100%, 75%) rotate(0deg);
            }
            100% {
              transform: translate(0, 0);
            }
          }
          @keyframes text-color-change {
            0% {
              color: black;
            }
            100% {
              color: white;
            }
          }
          @media (max-width: 425px) {
            .breadcrumb__area {
              padding-top: 80px;
              padding-bottom: 80px;
            }
             {
              /* .bg-panel-glass {
              padding: 3rem 2rem;
            } */
            }
          }
        `}
      </style>
      <div
        className="breadcrumb__area theme-bg"
        style={{
          backgroundImage: `url(${backImage})`,
          backgroundColor: backColor,
          backgroundPosition: "right top",
          padding: "80px 0",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="breadcrumb__content p-relative z-index-1">
                <div
                  className={`col-md-9 col-lg-7 col-xxl-6 col-sm-12 bg-panel-glass side-content ${theme}`}
                >
                  <h2
                    className="breadcrumb__title"
                    // style={{ fontWeight: "500" }}
                  >
                    {title}
                  </h2>
                  <div className="tp-section bannerText">
                    <p className="mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cumque excepturi vel reiciendis inventore recusandae?
                      Debitis aliquid autem amet praesentium exercitationem eius
                      quae sunt porro id.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbArea;
