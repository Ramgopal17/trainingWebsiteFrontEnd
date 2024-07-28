import Link from "next/link";
import React from "react";
import MobileMenus from "./mobile-menus";
import Image from "next/image";

const Sidebar = ({ isActive, setIsActive }) => {
  return (
    <>
      <style>
        {`
      @media (max-width: 300px){
        .tp-offcanvas__logo img {
          width:240px;
        }
        }
      `}
      </style>
      <div className="tp-offcanvas-wrapper">
        <div className={`tp-offcanvas white-bg ${isActive ? "opened" : ""}`}>
          <div className="offc-top-pattern">
            <img src="/assets/img/hero/nav-parrten-top.png" alt="nav pattern" />
          </div>
          <div className="tp-offcanvas__top tp-border-bottom pb-30 mb-30">
            <div
              className="tp-offcanvas-close"
              onClick={() => setIsActive(false)}
            >
              <span>
                <i className="fal fa-times"></i>
              </span>
            </div>
            <div className="tp-offcanvas__logo mb-50">
              <Link href="/">
                <img
                  // src="/assets/img/header/Metapercept_Cube_logo2_48.svg"
                  src="/assets/img/footer/Metapercept_footer_logo2.svg"
                  alt="metapercept logo"
                />
              </Link>
            </div>
            <p> We bring your ideas to better product.</p>
            <div className="tp-offcanvas__social">
              <span>
                {" "}
                <a
                  href="https://www.facebook.com/metapercepttechservices/"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "rgb(50,77,160)",
                  }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </span>
              <span>
                {" "}
                <a
                  href="https://twitter.com/MetaPercept"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "#656565",
                  }}
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
              </span>
              <span>
                {" "}
                <a
                  href="https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "rgb(244,127,32)",
                  }}
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
              </span>
              <span>
                {" "}
                <a
                  href="https://blog.metapercept.com/"
                  style={{
                    color: "whitesmoke",
                    backgroundColor: "rgb(252,183,19)",
                  }}
                >
                  <i className="fa-solid fa-blog"></i>
                </a>
              </span>
            </div>
          </div>
          <div className="tp-offcanvas__widget mb-40 d-none d-xl-block">
            <h3 className="tp-footer__widget-title mb-35">Get In Touch</h3>
            <div className="tp-offcanvas-cta d-flex align-items-center tp-border-bottom pb-20  mb-30">
              <span className="icon mr-20">
                <img src="/assets/img/icons/ofp-phone.png" alt="phone" />
              </span>
              <span>
                <span className="d-block mb-0">Phone number</span>
                <b>
                  <a href="callto:8390905726"> Call Us: +91-(839)-090-5726 </a>
                </b>
              </span>
            </div>

            <div className="tp-offcanvas-cta d-flex align-items-center tp-border-bottom pb-20 mb-30">
              <span className="icon mr-20">
                <img src="/assets/img/icons/ofc-mail-icon.png" alt="email" />
              </span>
              <span>
                <span className="d-block mb-0">Email address</span>
                <b>
                  <a href="mailto:info@metapercept.com">
                    {" "}
                    info@metapercept.com{" "}
                  </a>
                </b>
              </span>
            </div>
            <div className="tp-offcanvas-cta d-flex align-items-center pb-20  mb-30">
              <span className="icon mr-20">
                <img src="/assets/img/icons/ofc-locaiton.png" alt="location" />
              </span>
              <span>
                <span className="d-block mb-0">
                  Office Number 603, Konark Icon, <br /> Magarpatta Road, Pune
                  Maharashtra, India
                </span>
                <b>
                  <a href="callto:02041291914">
                    {" "}
                    Call Us: +91-(020)-4129-1914{" "}
                  </a>
                </b>
              </span>
            </div>
          </div>
          <div className={`tp-mobile-menu mean-container d-xl-none`}>
            <div className="mean-bar">
              {/* <MobileMenus setIsActive={setIsActive} /> */}
              <MobileMenus isActive={isActive} />
            </div>
          </div>
          {/* <div className="tp-offcanvas__bottom mt-80 d-none d-lg-block">
            <p>
              Our team applies its wide ranging in experience to determining.
            </p>
            <div className="tp-offcanvas-btn-wrapper">
              <Link href="/contact" className="tp-common-btn">
                get in touch
                <span>
                  <i className="fal fa-long-arrow-right"></i>
                  <i className="fal fa-long-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div> */}

          <div className="offc-bottom-pattern">
            <img
              src="/assets/img/hero/nav-parrten-botoom.png"
              alt="nav pattern"
            />
          </div>
        </div>
      </div>

      <div
        className={`body-overlay ${isActive ? "opened" : ""}`}
        onClick={() => setIsActive(false)}
      ></div>
    </>
  );
};

export default Sidebar;
