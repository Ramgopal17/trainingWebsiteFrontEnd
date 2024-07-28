import Link from "next/link";
import React from "react";

function CustomButton({ url, classes, text, targetTo = "" }) {
  return (
    <div className={classes}>
      <Link
        href={url}
        target={targetTo}
        style={{
          "--tp-common-white": "rgb(108,96,254)",
          color: "white",
          padding: "12px 15px",
          fontSize: "13px",
        }}
        className="tp-white-btn"
        aria-label="read more"
      >
        {text}
        <span className="ml-10">
          <i className="fal fa-long-arrow-right" style={{ color: "white" }}></i>
          <i className="fal fa-long-arrow-right" style={{ color: "white" }}></i>
        </span>
      </Link>
    </div>
  );
}

export default CustomButton;

// tp-sv-tabs-btn-wrapper mt-20
