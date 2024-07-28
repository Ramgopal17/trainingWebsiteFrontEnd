import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "../course-card/course-card";
import { colorGroup } from "@/utils/color-code";
import { useRouter } from "next/router";
import { getAllCoursesByCategory } from "@/api/get-all-courses-by-category";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// setting
const setting = {
  slidesPerView: "auto",
  spaceBetween: 30,
  slidesPerView: 3,
  navigation: {
    nextEl: ".pd-sd-button-next",
    prevEl: ".pd-sd-button-prev",
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    576: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
  },
};

const RelatedCourses = ({ setBackColor }) => {
  const router = useRouter();
  // console.log(router.query);
  let colorIndex = 0;
  const [isLoop, setIsLoop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const coursesByCategory = async (slug) => {
    let courses = await getAllCoursesByCategory(slug);
    // console.log("rel course ", courses);
    courses = courses.filter(
      (course) => course?.attributes?.Slug != router?.query?.coursename
    );
    setAllCourses(courses);
    setBackColor("white");
    if (courses.length == 0) {
      setBackColor("#f2f5f7");
    }
    setLoading(false);
  };
  useEffect(() => {
    // setIsLoop(true);
    setLoading(true);
    coursesByCategory(router?.query?.category || "");
  }, [router.query]);

  return (
    <>
      <style jsx global>
        {`
          // .relatedCourseDiv .swiper-wrapper {
          //   justify-content: center;
          // }
          @media (max-width: 575px) {
            .pd-sd-button-prev,
            .pd-sd-button-next {
              width: 40px;
              height: 40px;
              line-height: 40px;
              margin-right: 10px;
            }
          }
        `}
      </style>

      {!loading ? (
        allCourses.length > 0 && (
          <div className="tp-shop-details-product-area grey-bg theme-bg-79 pt-25 pb-25 relatedCourseDiv">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-12 ">
                  <div className="section-title-wraper mb-20">
                    <div className="tp-section">
                      <h2 className="tp-section__title mb-10 text-center">
                        Related courses
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {allCourses.length <= 2 ? (
                <div className="row justify-content-center">
                  {allCourses.map((course, i) => (
                    <CourseCard course={course} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="">
                    <div className="law-service-navigation d-flex justify-content-end mb-20">
                      <div className="pd-sd-button-prev">
                        <i className="fal fa-long-arrow-left"></i>
                      </div>
                      <div className="pd-sd-button-next">
                        <i className="fal fa-long-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <Swiper
                      {...setting}
                      // loop="true"
                      modules={[Navigation]}
                      className="swiper-container shop-swipper-slider-active"
                    >
                      {allCourses.map((course, i) => {
                        if (colorIndex < colorGroup.length - 1) {
                          colorIndex++;
                        } else {
                          colorIndex = 0;
                        }
                        return (
                          <SwiperSlide
                            key={i}
                            className="swiper-slide wow tpfadeUp"
                            data-wow-delay=".3s"
                            style={{ minHeight: "100%" }}
                          >
                            <CourseCard
                              classes="mb-20"
                              color={colorGroup[colorIndex - 1]}
                              course={course}
                              adjustHeight={true}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      ) : (
        <div className="tp-shop-details-product-area grey-bg theme-bg-76 pt-25 pb-25">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-12 ">
                <div className="section-title-wraper mb-20">
                  <div className="tp-section">
                    <h2 className="tp-section__title mb-10 text-center">
                      Related courses
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Skeleton height={300} />
              </div>
              <div className="col-md-4">
                <Skeleton height={300} />
              </div>
              <div className="col-md-4">
                <Skeleton height={300} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedCourses;
