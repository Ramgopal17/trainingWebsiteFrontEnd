import React, { useEffect, useState } from "react";
import CustomButton from "../../custom/custom-button";
import { useRouter } from "next/router";
import { getCourseDetailBySlug } from "@/api/get-course-detail-by-slug";
import { BackEndApi } from "@/src/data/auth_token";
import Loader from "@/src/common/loader";
import { putPurchaseCourse } from "@/api/put-purchase-course";
import { useAuthContext } from "@/context/Auth-context";
import Swal from "sweetalert2";

function Checkout() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [courseInfo, setCourseInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchCourseData = async () => {
    const courseData = await getCourseDetailBySlug(router.query.course);
    // console.log("dfffffffff00", courseData);
    setCourseInfo(courseData);
    setLoading(false);
  };

  const addPurchaseCourse = async () => {
    // console.log("in add");
    const result = await putPurchaseCourse(user.id, courseInfo.id);
    // console.log("result", result);
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Purchase Successfully.",
        text: "Go to profile to view your course",
        confirmButtonText: "OK",
      });
      // console.log("return course", result);
      router.push("/user/profile/my-courses");
    }
  };

  useEffect(() => {
    setLoading(true);
    // console.log("check", courseInfo.id);
    fetchCourseData();
  }, [router.query]);
  return (
    <div className="pt-50 pb-50 checkoutContainer">
      <div className="container">
        <i
          className="fa-solid fa-circle-arrow-left backBtn"
          onClick={() => history.back()}
        ></i>
        {loading ? (
          <div className="pt-20 d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <div className="row pt-20">
            <div className="col-md-7 tp-section">
              <h4>Checkout</h4>
              <div className="paymentMethod pt-20">
                <img src="/assets/img/payment/visa-2.png" alt="visa card" />
                <img
                  src="/assets/img/payment/mastercard-2.png"
                  alt="mastercard"
                />
                <img src="/assets/img/payment/upi.png" alt="upi" />
                <img
                  src="/assets/img/payment/netbanking.png"
                  alt="netbanking"
                />
              </div>
              <hr />
              <p>
                By continuing to payment, I agree to the Terms of Use, Refund
                Policy, and Privacy Policy.
              </p>
              {/* <CustomButton text={"Continue to payment"} url={"#"} /> */}
              <div className="newsletterForm " style={{ minWidth: "200px" }}>
                <button
                  type="submit"
                  className="buttonTextSize"
                  onClick={() => addPurchaseCourse()}
                >
                  Continue to payment
                </button>
              </div>
            </div>
            <div className="col-md-5 d-flex pt-md-0 pt-4 ">
              <div className="courseInfo">
                <div className="d-flex flex-column align-items-center">
                  <img
                    src={`${BackEndApi}/${courseInfo?.attributes?.Course_Image?.data[0]?.attributes?.formats?.thumbnail?.url}`}
                    alt={courseInfo?.attributes?.Title}
                  />
                  <div className="pt-20">
                    <h4>{courseInfo?.attributes?.Title}</h4>
                    <hr />
                    <h5 className="text-center">
                      Course Fee : ₹ {courseInfo?.attributes?.Program_Fee}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
