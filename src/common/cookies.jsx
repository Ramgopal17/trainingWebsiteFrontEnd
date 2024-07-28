"use client";

import CookieConsent, { resetCookieConsentValue } from "react-cookie-consent";
import Link from "next/link";
import Router from "next/router";
import Image from "next/image";

function CookiesObj() {
  let CookieConsentStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(600px, 90%)",
    "z-index": "9999 !important",
    "background-color": "#00000096",
  };

  return (
    <div className="HideHeaderFooter">
      <style jsx global>
        {`
          .cclinkcls {
            color: #4babee !important;
          }
          .CookieConsent {
             {
              /* background:#721cad !important; */
            }
            background: rgb(50, 77, 160) !important;
            flex-direction: column;
          }
          .CookieConsent * {
            color: white;
            font-size: 16px !important;
          }
          .cookiesHeading {
            font-size: 25px !important;
          }
          .CookieConsent div:first-child {
            flex: 1 0 auto !important;
          }
          .btnStyle {
            border: 0 !important;
            outline: 0 !important;
            background-color: #4091c9 !important;
            color: white !important;
            cursor: pointer !important;
            padding: 12px 20px !important;
            margin-left: 0 !important;
          }
          .cookieControlButton {
            position: fixed;
            bottom: 10px !important;
            left: 10px !important;
            width: 50px;
            height: 50px;
            background-color: rgb(0, 102, 204);
            border-radius: 50%;
            padding: 10px;
            z-index: 100;
            cursor: pointer;
          }
          .cookieControlButton img {
            width: 30px;
          }
        `}
      </style>
      <CookieConsent
        // debug='true'
        overlay="true"
        buttonText="Accept All"
        enableDeclineButton
        declineButtonText="Delete All"
        location="none"
        style={CookieConsentStyle}
        buttonClasses="btnStyle"
        declineButtonClasses="btnStyle"
        declineCookieValue={false}
        onDecline={() => {
          resetCookieConsentValue();
          Router.reload();
        }}
        // flipButtons = 'true'
      >
        <h3 className="cookiesHeading">Cookies</h3>
        <p>
          Metapercept Technology Services LLP uses cookies and similar
          technologies to improve and customize your online experience. By
          closing this banner or by browsing this site, you agree and accept the
          use of cookies. To learn more, please refer to our recently updated{" "}
          <Link href="/privacy-policy" class="cclinkcls">
            Privacy Policy
          </Link>
          .
        </p>
      </CookieConsent>

      <div
        className="cookieControlButton"
        onClick={() => {
          resetCookieConsentValue();
          Router.reload();
        }}
      >
        {/* <Image
          width={30}
          height={30}
          src="/assets/img/home/cookie.png" 
          alt=""
        /> */}
        <img src="/assets/img/home/cookie.png" alt="cookies" />
      </div>
    </div>
  );
}

export default CookiesObj;
