import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import CustomButton from "../custom/custom-button";
import { useRouter } from "next/router";
import { BackEndApi } from "@/src/data/auth_token";
import { displayPopup } from "@/utils/popup";
import Swal from "sweetalert2";
import { useAuthContext } from "@/context/Auth-context";
import { avgRatingCourse } from "@/utils/avg-rating-course";
import { useRafState } from "react-use";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TopDetailBanner({
  activeCourse,
  testimonials,

  checkUserLogin,
}) {
  // console.log(
  //   "TopDetailBanner",
  //   testimonials[0]?.attributes?.Course_Detail?.data?.attributes?.Testimonials
  //     ?.data
  // );
  const router = useRouter();
  const { user } = useAuthContext();
  const [isPurchased, SetIsPurchased] = useState(false);
  // console.log("details", user);
  const checkPurchased = () => {
    // console.log("in check");
    user?.Course_Details?.map((course) => {
      if (course?.Title == activeCourse?.attributes?.Title) {
        // console.log(
        //   "is purchsed",
        //   course?.Title,
        //   activeCourse?.attributes?.Title
        // );
        SetIsPurchased(true);
      }
    });
  };

  useEffect(() => {
    checkPurchased();
  }, [router.query]);

  return (
    <div className="theme-bg-76" style={{ marginBottom: "-5px" }}>
      <div
        className="topDetailsBanner pt-25 pb-100"
        style={{
          // background: "linear-gradient(to bottom, #ffb070 40%, #ffcfa8)",
          background: "linear-gradient(to bottom, #fcb713ad 30%, #fcb71370)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mb-4">
              <div className="tp-section">
                {activeCourse?.attributes?.Title ? (
                  <h2 className="tp-section__title wow tpfadeUp mb-10">
                    {activeCourse?.attributes?.Title}
                  </h2>
                ) : (
                  <Skeleton height={30} className="mb-30" />
                )}

                {activeCourse?.attributes?.Description ? (
                  <p>{activeCourse?.attributes?.Description}</p>
                ) : (
                  <>
                    <Skeleton count={5} />
                    <Skeleton count={1} className="mb-30" />
                  </>
                )}
                {/* <div className="showRating d-flex align-items-center">
                  <ReactStars
                    key={avgRatingCourse(
                      testimonials[0]?.attributes?.Course_Detail?.data
                        ?.attributes?.Testimonials?.data
                    )}
                    count={5}
                    value={avgRatingCourse(
                      testimonials[0]?.attributes?.Course_Detail?.data
                        ?.attributes?.Testimonials?.data
                    )}
                    edit={false}
                    size={24}
                    activeColor="#ffa940"
                    color={"#d3d3d0"}
                    // classNames={"starBorders"}
                  />
                </div> */}
                {/* <h4 className="pt-20 pb-20">learn with Trainer Name</h4> */}
                {/* <CustomButton url="#" text="Enroll Now" /> */}
                {/* {isPurchased ? (
                  <>
                    <p>Already Purchased</p>
                    <CustomButton
                      text={"View Course"}
                      url={"/user/profile/my-courses"}
                    />
                  </>
                ) : (
                  <div
                    className="newsletterForm "
                    style={{ minWidth: "130px" }}
                  >
                    <button
                      type="submit"
                      onClick={checkUserLogin}
                      className="buttonTextSize"
                    >
                      ENROLL NOW
                    </button>
                  </div>
                )} */}
              </div>
            </div>
            <div className="col-lg-5  d-flex justify-content-center">
              {activeCourse?.attributes?.Course_Image?.data && activeCourse?.attributes?.Course_Image?.data[0]?.attributes
                ?.url ? (
                <img
                  src={`${BackEndApi}${activeCourse?.attributes?.Course_Image?.data[0]?.attributes?.url}`}
                  alt={activeCourse?.attributes?.Title}
                  style={{
                    width: "min(400px, 100%)",
                    alignSelf: "center",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div style={{ width: "min(500px, 100%)" }}>
                  <Skeleton height={250} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container extraInfoDiv">
        <div className="row  justify-content-center m-1 ">
          <div className="col-xl-11 col-lg-12 col-md-9 dataHolder tp-section">
            <div className="row p-4 pb-0 pb-lg-4  parentDiv">
              <div className="col-lg-4 mb-lg-0 mb-4 text-center ">
                <h4>Course completation time</h4>
                <p className="mb-lg-0 mb-2">
                  Approx. {activeCourse?.attributes?.Course_Durations} hours to
                  complete
                </p>
              </div>
              <div className="col-lg-4 mb-lg-0 mb-4 text-center">
                <h4>Who can take this course</h4>
                <p className="mb-lg-0 mb-2">
                  {activeCourse?.attributes?.Course_For}
                </p>
              </div>
              <div className="col-lg-4 mb-lg-0 mb-4 text-center">
                <h4>Course delivery mode</h4>
                <p className="mb-lg-0 mb-2">
                  {activeCourse?.attributes?.Mode_of_Training}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopDetailBanner;
