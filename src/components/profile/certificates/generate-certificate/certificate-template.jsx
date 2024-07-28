import { useAuthContext } from "@/context/Auth-context";
import React from "react";

function CertificateTemplate({ completedCourse }) {
  const { user } = useAuthContext();
  // console.log(user);
  return (
    <>
      <style>
        {`

.cert-container #content2{
  max-width: 100%;
}
.cert-container .btn{
  padding: 10px 17px; 
  border-radius: 3px; 
  background: #f4b71a; 
  border: none; 
  font-size: 12px; 
  margin: 10px 5px;
}

.cert-container .toolbar{
  background: #333; 
  width: 100vw; 
  position: fixed; 
  left: 0; 
  top: 0; 
  text-align: center;
}

.cert-container {

  width: 100%; 
  display: flex; 
  justify-content: center;
}

.cert-container .cert {

 
  padding:15px 20px; 
  text-align:center; 
  position: relative; 
  z-index: -1;
}

.cert-container .cert-bg {
  position: absolute; 
  left: 0px; 
  top: 0; 
  z-index: -1;
  width: 100%;
}

.cert-container .cert-content {
  width:100%; 
  height:470px; 
  padding:70px 60px 0px 60px; 
  text-align:center;
  font-family: Arial, Helvetica, sans-serif;
  
}

.cert-container h1 {
  font-size:44px;
}

.cert-container p {
  font-size:25px;
}

.cert-container small {
  font-size: 14px;
  line-height: 12px;
}

.cert-container .bottom-txt {
  padding: 12px 5px; 
  display: flex; 
  justify-content: space-between;
  font-size: 16px;
}

.cert-container .bottom-txt * {
  white-space: nowrap !important;
}

.cert-container .other-font {
  font-family: Cambria, Georgia, serif;
  font-style: italic;
}


      `}
      </style>
      <div className="cert-container print-m-0" id="capture-div">
        <div id="content2" className="cert">
          <img
            src="/assets/img/certificate.png"
            className="cert-bg"
            alt={completedCourse?.Title}
          />
          <div className="cert-content">
            <h1 className="other-font">Certificate of Completion</h1>
            <span style={{ fontSize: "30px" }}>{completedCourse?.Title}</span>
            <br />
            <br />

            <span className="other-font">
              <i>
                <b>has completed the</b>
              </i>
            </span>
            <br />
            <span style={{ fontSize: "40px" }}>
              <b>
                {user?.First_Name} {user?.Last_Name}
              </b>
            </span>
            <br />

            <br />
            <br />

            <div className="bottom-txt">
              <span>G-1 DAPE-ARR-SF</span>
              <span>Completed on: April 3, 2020</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CertificateTemplate;
