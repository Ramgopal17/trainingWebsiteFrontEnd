import Script from "next/script";
import React, { useEffect } from "react";

function OtpGenerator({ generateOTP }) {
  return (
    <>
      <div className="otp-form" id="otp-form-div">
        {/* <!-- Email OTP Form --> */}
        <div className="email-otp">
          {/* <h2>Email OTP</h2> */}
          <div className="email-otp-container">
            {/* <!-- Six input fields for OTP digits --> */}
            <input
              type="text"
              className="email-otp-input"
              pattern="\d"
              maxLength="1"
            />
            <input
              type="text"
              className="email-otp-input"
              pattern="\d"
              maxLength="1"
              // disabled
            />
            <input
              type="text"
              className="email-otp-input"
              pattern="\d"
              maxLength="1"
              // disabled
            />
            <input
              type="text"
              className="email-otp-input"
              pattern="\d"
              maxLength="1"
              // disabled
            />
            <input
              type="text"
              className="email-otp-input"
              pattern="\d"
              maxLength="1"
              // disabled
            />
            <input
              type="text"
              className="email-otp-input"
              pattern="\d"
              maxLength="1"
              // disabled
            />
          </div>
          <div>
            <p className="resendOTP" onClick={generateOTP}>
              Resend OTP
            </p>
          </div>

          {/* <!-- Field to display entered OTP --> */}
          <input
            type="text"
            id="emailverificationCode"
            placeholder="Enter verification code"
            hidden
            // value={userOTP}
            // onChange={(e) => setUserOTP(e.target.value)}
          />

          {/* <!-- Button to verify OTP --> */}
          {/* <button type="button" id="verifyEmailOTP">
            VERIFY &amp; PROCEED
          </button> */}
        </div>
      </div>
      {/* <script type="text/javascript" src="/assets/js/otp-script.js"></script> */}
    </>
  );
}

export default OtpGenerator;
