import { showSidebar } from "@/utils/toggle-sidebar";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import findHeaderHeight from "@/hooks/find-header-height";
import Pagination from "@/src/common/pagination";

function PaymentDetails() {
  const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  const [headerHeight, setHeaderHeight] = useState(110);
  const [courses, setCourses] = useState([{}, {}, {}, {}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(false);
  // =====================pagination=========================

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);

  // // ...

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  let currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse);
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(courses?.length / coursesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  // =====================pagination=========================
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
  });
  return (
    <>
      <style jsx global>
        {`
          .adjustMinHeight {
            min-height: calc(100vh - ${headerHeight});
          }
        `}
      </style>
      <div className="profileDiv">
        <i
          className="fa-solid fa-bars sidebarOpenBtn d-lg-none"
          onClick={showSidebar}
        ></i>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-0 adjustMinHeight">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className=" InfoDiv tp-section ">
                <h4>Payment History</h4>
                <hr />
                {/* <p>Looks like you have no purchase any course at the moment.</p> */}

                {courses.length > 0 ? (
                  <>
                    <div className="paymentDetailWrapper">
                      {currentCourses.map((info, id) => {
                        return (
                          <div key={id} className="singlePayment mb-20">
                            <div>
                              <h4 className="text-xl-start text-center">
                                Basic Technical Writing{" "}
                              </h4>
                            </div>
                            <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                              <h6 className="mb-0">Amount</h6>
                              <p className="">25000 ₹</p>
                            </div>
                            <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                              <h6 className="mb-0">Payment Date</h6>
                              <p className="">Mar, 24 2022</p>
                            </div>

                            <div className="newsletterForm d-flex d-xl-block justify-content-center">
                              <button type="submit" className="buttonTextSize">
                                Download Receipt
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <Pagination
                      dataPerPage={coursesPerPage}
                      totalData={courses?.length}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      previousPage={previousPage}
                      nextPage={nextPage}
                    />
                  </>
                ) : loading ? (
                  <div className="d-flex justify-content-center pt-50">
                    <Loader />
                  </div>
                ) : (
                  <>
                    <div className=" InfoDiv tp-section ">
                      <p>
                        Looks like you have no purchase any course at the
                        moment.
                      </p>
                    </div>
                  </>
                )}

                {/* <div className="paymentDetailWrapper">
                  {arr.map((info, id) => {
                    return (
                      <div className="singlePayment mb-20">
                        <div>
                          <h4 className="text-xl-start text-center">
                            Basic Technical Writing{" "}
                          </h4>
                        </div>
                        <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                          <h6 className="mb-0">Amount</h6>
                          <p className="">25000 ₹</p>
                        </div>
                        <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                          <h6 className="mb-0">Payment Date</h6>
                          <p className="">Mar, 24 2022</p>
                        </div>

                        <div className="newsletterForm d-flex d-xl-block justify-content-center">
                          <button type="submit" className="buttonTextSize">
                            Download Receipt
                          </button>
                        </div>
                      </div>
                    );
                  })} */}
                {/* <div className="singlePayment mb-20">
                    <div>
                      <h4 className="text-xl-start text-center">
                        Basic Technical Writing{" "}
                      </h4>
                    </div>
                    <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                      <h6 className="mb-0">Amount</h6>
                      <p className="">25000 ₹</p>
                    </div>
                    <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                      <h6 className="mb-0">Payment Date</h6>
                      <p className="">Mar, 24 2022</p>
                    </div>

                    <div className="newsletterForm d-flex d-xl-block justify-content-center">
                      <button type="submit" className="buttonTextSize">
                        Download Receipt
                      </button>
                    </div>
                  </div> */}
                {/* =========================== */}
                {/* <div className="singlePayment mb-20">
                    <div>
                      <h4 className="text-xl-start text-center">
                        Basic Technical Writing{" "}
                      </h4>
                    </div>
                    <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                      <h6 className="mb-0">Amount</h6>
                      <p className="">25000 ₹</p>
                    </div>
                    <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                      <h6 className="mb-0">Payment Date</h6>
                      <p className="">Mar, 24 2022</p>
                    </div>

                    <div className="newsletterForm d-flex d-xl-block justify-content-center">
                      <button type="submit" className="buttonTextSize">
                        Download Receipt
                      </button>
                    </div>
                  </div> */}
                {/* =========================== */}
                {/* <div className="singlePayment mb-20">
                    <div>
                      <h4 className="text-xl-start text-center">
                        Basic Technical Writing{" "}
                      </h4>
                    </div>
                    <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                      <h6 className="mb-0">Amount</h6>
                      <p className="">25000 ₹</p>
                    </div>
                    <div className="paymentInfoDiv d-flex justify-content-center d-xl-block flex-column flex-sm-row align-items-center ">
                      <h6 className="mb-0">Payment Date</h6>
                      <p className="">Mar, 24 2022</p>
                    </div>

                    <div className="newsletterForm d-flex d-xl-block justify-content-center">
                      <button type="submit" className="buttonTextSize">
                        Download Receipt
                      </button>
                    </div>
                  </div> */}
                {/* =========================== */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;
