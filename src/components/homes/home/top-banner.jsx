import Link from "next/link";
import React from "react";

function TopBanner() {
  return (
    <div className="topBannerHome d-flex align-items-center ">
      {/* <img src="/assets/img/topBanner.jpg" alt="" /> */}
      <div className="container">
        <div className="infoCard">
          <div className="bannerWrapper tp-section carouselInfo">
            <h2 className="title2 swiper-no-swiping">
              Lorem ipsum dolor sit amet.
            </h2>
            <p className="swiper-no-swiping">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              dolore id quisquam! Ab!
            </p>

            {/* <Link
              href={"#"}
              className="hero-submit-btn  alt-color "
              type="submit"
              style={{
                position: "static",
                // right: "50%",
                transform: "translateX(0)",
                minWidth: "200px",
              }}
            >
              Find your new career
              <span>
                <i className="fal fa-long-arrow-right"></i>
                <i className="fal fa-long-arrow-right"></i>
              </span>
              <b></b>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
