import useSticky from "@/hooks/use-sticky";
import Sidebar from "@/src/layout/headers/sidebar-new";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavMenu from "./nav-menu-new";
import RelatedCategoryCoursesDesc from "./related-category-courses-desc";
import { getAllCategories } from "@/api/get-all-categories";
import MobileDropdown from "./course-dropdown/mobile-dropdown";

const Header = ({ style_home_one, forName }) => {
  const { sticky } = useSticky();
  const [isActive, setIsActive] = useState(false);
  const [activeCourse, setActiveCourse] = useState({});
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const categories = await getAllCategories();
      setAllCategories(categories);
      setActiveCourse({
        title: categories[0]?.attributes?.Title,
        slug: categories[0]?.attributes?.Slug,
        courses: categories[0]?.attributes?.Course_Details?.data,
      });
    };
    fetchCategory();
  }, []);
  return (
    <>
      <style jsx global>
        {`
          .header-logo {
            width: 200px;
            height: auto;
          }
          .forName {
            font-size: 24px;
            font-weight: 400;
          }
          @media (max-width: 425px) {
            .header-logo {
              width: 150px;
              height: auto;
            }
            .tp-header__1-main {
              padding: 20px 0;
            }
          }
          @media only screen and (min-width: 992px) and (max-width: 1199px) {
            .tp-header__1-main {
              padding-right: 40px;
              padding-left: 40px;
              padding-top: 0px;
              padding-bottom: 0px;
            }
          }
        `}
      </style>

      <header className="HideHeaderFooter">
        <div
          className={`${
            style_home_one ? "" : "tp-header__1 theme-bg p-relative"
          }`}
        >
          <div
            id="header-sticky"
            className={`tp-header__1-main header-border-button pl-105 pr-105  ${
              sticky ? "header-sticky" : ""
            }`}
          >
            <div className="container-fluid p-relative">
              <div id="google_translate_element" className="d-none "></div>
              <div className="mega-menu-wrapper">
                <div className="row align-items-center">
                  <div className="col-xxl-2 col-xl-3 col-lg-3 col-6">
                    <div className="logo border-right">
                      <Link href="/" className="text-start">
                        <img
                          className="header-logo"
                          src="/assets/img/footer/Metapercept_footer_logo2.svg"
                          alt="metapercept logo"
                        />
                        {forName && <h2 className="forName pt-2">{forName}</h2>}
                      </Link>
                    </div>
                  </div>
                  <div className="col-xxl-10 col-xl-9 col-lg-9 d-none d-lg-flex ">
                    <div
                      className="main-menu p-relative"
                      style={{ width: "100%" }}
                    >
                      <nav
                        id="mobile-menu "
                        className="d-flex justify-content-end"
                      >
                        <NavMenu />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xxl-0 col-lg-0 col-md-6 col-6">
                    <div className="tp-header__1-right d-flex justify-content-end align-items-center">
                      <div className="tp-header-search-nav d-flex justify-content-end d-lg-none">
                        <div
                          className="tp-header-nav"
                          onClick={() => setIsActive(true)}
                        >
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Sidebar isActive={isActive} setIsActive={setIsActive} />
      <MobileDropdown />
      <RelatedCategoryCoursesDesc activeCourse={activeCourse} />
    </>
  );
};

export default Header;
