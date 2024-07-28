"use client";
import React, { useEffect } from "react";
import spin from "./spiningLogoJS";

function SpinningLogo() {
  let givenYear = 2016;
  let currentYear = new Date().getFullYear();
  let ageDifference = currentYear - givenYear;

  useEffect(() => {
    spin();
  });
  return (
    <>
      <style>
        {`

      .logoSpin{

          width: 180px;
          height: 180px;
          position: absolute;
          top:50%;
          right:0;
          transform: translate(50%,-50%);
          display: flex;
          justify-content:center;
          align-items: center;
          animation: spinImg 10s linear infinite;
          background-color:transparent; 
          border-radius:50%;
          padding:30px;
        }
        .logoDiv{
          background-color:white;
          width: 120px;
          height: 120px;
          display: flex;
          justify-content:center;
          align-items: center;
          border-radius:50%;
          box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
        }

        @keyframes spinImg{
          from {
            transform:translate(50%,-50%) rotate(0deg)
          }
          to{
            transform:translate(50%,-50%) rotate(360deg)
            }
        }
        @media only screen and (max-width:767px) {
          .logoSpin{
            display: none;
          }
        }
        .text{
          position: absolute;
          width: 100%;
          height: 100%;

        }
        .text span {
          position: absolute;
          Left: 50%;
          font-size: 1.2em;
          transform-origin: 0 90px;
          color: var(--tp-heading-primary)
        }
      `}
      </style>
      <div className="logoSpin">
        <div className="logoDiv">
          <img
            src="/assets/img/header/Metapercept_Cube_logo2_48.svg"
            alt="metapercept logo"
          />
        </div>
        <div className="text">
          <p> {ageDifference} YEARS OF EXPERIENCE - SINCE FROM 2016 -</p>
        </div>
      </div>
    </>
  );
}

export default SpinningLogo;
