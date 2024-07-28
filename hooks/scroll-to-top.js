import React, { useState, useEffect } from "react";
import useSticky from "./use-sticky";

const ScrollToTop = () => {
  const { sticky } = useSticky();

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  return (
    <>
      <style jsx>
        {`
          .tp-back-to-top.showTopBtn {
            bottom: 10px;
            opacity: 1;
            -webkit-transform: scale(1);
            -ms-transform: scale(1);
            transform: scale(1);
            color: white;
          }
        `}
      </style>

      {/* <!-- Scroll-top --> */}
      <button
        onClick={scrollTop}
        className={`tp-back-to-top  ${sticky ? "showTopBtn" : ""}`}
        data-target="html"
        style={{ right: "17px" }}
        aria-label="Go Top"
      >
        <i className="fal fa-angle-double-up"></i>
      </button>

      {/* <!-- Scroll-top-end--> */}
    </>
  );
};

export default ScrollToTop;
