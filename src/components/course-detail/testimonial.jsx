import React, { useState, useEffect } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar from "react-avatar";
import Image from "next/image";
import { getAllCoursesByCategory } from "@/api/get-all-courses-by-category";

import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ReactStars from "react-rating-stars-component";

const setting = {
  slidesPerView: 2,

  spaceBetween: 30,
  navigation: {
    nextEl: ".it-testi-button-next",
    prevEl: ".it-testi-button-prev",
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const Testimonial = ({ testimonials, backColor }) => {
  // console.log("first testimonial", testimonials);
  return (
    <>
      <style jsx global>
        {`
          .it-testimonial-box {
            text-align: justify;
            padding: 30px 50px;
          }
          .it-testimonial-box__review {
            font-size: 14px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 7;
          }
          @media (min-width: 992px) {
            .it-testimonial-box {
              min-height: 240px;
            }
          }
          @media (max-width: 425px) {
            .it-testimonial-box__review {
              font-size: 14px;
              -webkit-line-clamp: 10;
            }
            .it-testimonial-box {
              text-align: justify;
              padding: 20px 30px;
            }
          }

          .it-testimonial-box:before {
            content: "";
            position: absolute;
            top: 2px;
            left: 2px;
            bottom: 2px;
            right: 2px;
            background-color: var(--tp-common-white);
            display: inline-block;
            z-index: -1;
            border-radius: 8px;
          }
          .it-testimonial-box:after {
            content: "";
            position: absolute;
            top: 100%;
            left: 90px;
            width: 46px;
            height: 45px;
            border: 2px solid #58559d;
            background-color: white;
            z-index: -5;
            transform: rotate(53deg) translateY(-47px);
          }
        `}
      </style>
      {testimonials?.length > 0 ? (
        <div
          className="tp-it-testimonial fix pb-50 "
          style={{
            "--tp-heading-primary": "var(--tp-theme-vogue)",
            backgroundColor: backColor,
          }}
        >
          <div className="it-testi-wraper  pt-25 pb-110">
            <div className="container">
              <div className="row ">
                <div className="col-12 col-md-12">
                  <div className="section-title-wraper">
                    <div className="tp-section">
                      {/* -----------------------------new----------------------- */}

                      <h2 className="tp-section__title mb-40 text-center">
                        What the participants say
                      </h2>

                      {/* -----------------------------new----------------------- */}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className=" d-none d-md-block">
                <div
                  className="it-testi-navigation text-end p-relative pt-40"
                  style={{ "--tp-theme-orange": "#6c60fe" }}
                >
                  <div className="it-testi-button-prev">
                    <i className="fal fa-long-arrow-left"></i>
                  </div>
                  <div className="it-testi-button-next">
                    <i className="fal fa-long-arrow-right"></i>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="container">
            <Swiper
              {...setting}
              initialSlide="1"
              loop="true"
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className=" swiper-container"
            >
              {/* ========================dummy============================== */}
              {/* {testimonial_data_home_two.map((item, i) => (
              <SwiperSlide key={i} className="it-testimonial swiper-slide">
                <div
                  className="it-testimonial-box p-relative"
                  style={{
                    backgroundImage: "linear-gradient(-90deg,#fe7a8f,#324da0)",
                  }}
                >
                  <div
                    className="it-testimonial-box__ratting"
                    style={{ "--tp-theme-orange": "#f47f20" }}
                  >
                    {item.rating.map((rating, i) => {
                      return <i key={i} className={`${rating} fa-star`}></i>;
                    })}
                  </div>
                  <div
                    className="it-testimonial-box__review"
                    style={{ fontSize: "16px" }}
                  >
                    {item.des}
                  </div>
                  <div className="it-testimonial-bg">
                    <img
                      src="/assets/img/testimonial/testi-icon-bg.png"
                      alt="them-pure"
                    />
                  </div>
                </div>
                <div className="tp-testimonial-reviewer d-flex align-items-center ml-40">
                  <div className="tesi-reviewer-avata mr-15">
                    <Avatar
                      name={item.name.split(" ")[0]}
                      size="60"
                      round={true}
                      fontSize="20px"
                    />
                  </div>
                  <div className="it-tesi-reviewer-name">
                    <h4 className="mb-5 vogue-text-color">{item.name}</h4>
                    <span>{item.title}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))} */}
              {/* ==========================strapi===================== */}
              {testimonials?.map((testimonial, i) => (
                <SwiperSlide key={i} className="it-testimonial swiper-slide">
                  <div
                    className="it-testimonial-box p-relative"
                    style={{
                      backgroundImage:
                        "linear-gradient(-90deg,#fe7a8f,#324da0)",
                    }}
                  >
                    {/* <div className="showRating d-flex align-items-center">
                      <ReactStars
                        color={"#d3d3d0"}
                        count={5}
                        value={testimonial.attributes.Rating}
                        edit={false}
                        size={24}
                        activeColor="#f47f20"
                      />
                    </div> */}
                    <div className="it-testimonial-box__review">
                      {testimonial?.attributes?.Review}
                    </div>
                    <div className="it-testimonial-bg">
                      <img
                        src="/assets/img/testimonial/testi-icon-bg.png"
                        alt="testimonial"
                      />
                    </div>
                  </div>
                  <div className="tp-testimonial-reviewer d-flex align-items-center ml-40">
                    {/* <div className="tesi-reviewer-avata mr-15">
                      <Avatar
                        name={
                          testimonial?.attributes?.User?.data?.attributes?.username?.split(
                            " "
                          )[0]
                        }
                        size="60"
                        round={true}
                        fontSize="20px"
                      />
                    </div> */}
                    <div className="it-tesi-reviewer-name">
                      <h4 className="mb-5 vogue-text-color">
                        {testimonial?.attributes?.User?.data?.attributes
                          ?.First_Name ||
                          testimonial?.attributes?.User?.data?.attributes
                            ?.username}
                      </h4>
                      <span>
                        {
                          testimonial?.attributes?.User?.data?.attributes
                            ?.Designation
                        }
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Testimonial;

// <div
//           className="tp-it-testimonial fix pb-50 "
//           style={{ "--tp-heading-primary": "var(--tp-theme-vogue)" }}
//         >
//           <div className="it-testi-wraper  pt-50 pb-125">
//             <div className="container">
//               <div className="row ">
//                 <div className="col-12 col-md-8">
//                   <div className="section-title-wraper">
//                     <div className="tp-section">
//                       <span className="tp-section__subtitle shadow-none text-rgb mb-15 p-0">
//                         Testimonials
//                       </span>
//                       <h2 className="tp-section__title mb-40">
//                         What the participants say
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <Skeleton height={300} />
//                 </div>
//                 <div className="col-md-6">
//                   <Skeleton height={300} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
