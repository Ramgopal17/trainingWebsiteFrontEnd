import React from "react";
import { sitemap_data } from "@/src/data/sitemap-data";
import Link from "next/link";
function SitemapArea() {
  return (
    <>
      <style jsx>
        {`
          .marker-list-site li::after {
            position: absolute;
            content: "✓";
            left: 0;
            top: 3px;
            font-family: themify;
            color: #0c54ad;
            font-weight: 400;
          }
          h5 {
            font-weight: 400;
          }
        `}
      </style>
      <div className="tp-job-details pt-50 pb-50 wow tpfadeUp">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-7">
              <div className="section-head text-black">
                <h2
                  className="tp-section__title mb-25"
                  // style={{ fontWeight: 700, color: "black" }}
                >
                  Pages
                </h2>
                <ul className="list-arrow marker-list-site">
                  {sitemap_data.map((data, i) => {
                    return (
                      <li className="position-relative pl-20" key={i}>
                        <h5>
                          <Link href={data.link}>{data.title}</Link>
                        </h5>
                        {data.subMenu && (
                          <ul className="list-arrow ml-25 marker-list-site">
                            {data.subMenu.map((subMenuData, i) => {
                              const isUrl =
                                subMenuData.link.startsWith("https://");
                              const targetAttr = isUrl ? "_blank" : "";
                              return (
                                <li className="position-relative pl-20" key={i}>
                                  <h5>
                                    <Link
                                      href={subMenuData.link}
                                      target={targetAttr}
                                    >
                                      {subMenuData.title}
                                    </Link>
                                  </h5>
                                  {subMenuData.subMenu && (
                                    <ul className="list-arrow ml-25 marker-list-site">
                                      {subMenuData.subMenu.map(
                                        (subMenuData, i) => {
                                          const isUrl =
                                            subMenuData.link.startsWith(
                                              "https://"
                                            );
                                          const targetAttr = isUrl
                                            ? "_blank"
                                            : "";
                                          return (
                                            <li
                                              className="position-relative pl-20"
                                              key={i}
                                            >
                                              <h5>
                                                <Link
                                                  href={subMenuData.link}
                                                  target={targetAttr}
                                                >
                                                  {subMenuData.title}
                                                </Link>
                                              </h5>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* <ul className="list-arrow">
                <li>
                  <h5>
                    <a href="/">HOME</a>
                  </h5>
                </li>
                <li>
                  <h5>
                    <a href="/services">SERVICES</a>
                  </h5>
                  <ul
                    className="list-arrow"
                    style={{ margin: "0px 40px", listStyleType: "square" }}
                  >
                    <li>
                      <h5>
                        <a href="/services/softwaredevelopment">
                          SOFTWARE DEVELOPMENT
                        </a>
                      </h5>
                      <ul
                        className="list-arrow"
                        style={{ margin: "0px 40px", listStyleType: "square" }}
                      >
                        <li>
                          <h5>
                            <a href="/services/softwaredevelopment">
                              WEB DEVELOPMENT
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/softwaredevelopment/devops">
                              DEVOPS
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/softwaredevelopment/integration">
                              APPLICATION INTEGRATION
                            </a>
                          </h5>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h5>
                        <a href="/services/technicalwriting">
                          TECHNICAL WRITING
                        </a>
                      </h5>
                      <ul
                        className="list-arrow"
                        style={{ margin: "0px 40px", listStyleType: "square" }}
                      >
                        <li>
                          <h5>
                            <a href="/services/technicalwriting/docmigration">
                              DOCUMENT MIGRATION
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/technicalwriting/structureauth">
                              STRUCTURED AUTHORING
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/technicalwriting/contentconversion">
                              CONTENT CONVERSION
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/technicalwriting/edit_proof">
                              EDITING &amp; PROOFREADING
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/technicalwriting/templatedesign">
                              TEMPLATE DESIGN &amp; DEVELOPMENT
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/services/technicalwriting/knowledge">
                              KNOWLEDGE MANAGEMENT
                            </a>
                          </h5>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h5>
                        <a href="/services/training">
                          TRAINING &amp; CERTIFICATION
                        </a>
                      </h5>
                      <ul
                        className="list-arrow"
                        style={{ margin: "0px 40px", listStyleType: "square" }}
                      >
                        <li>
                          <h5>
                            <a
                              href="/sitemap"
                              aria-current="page"
                              className="pagess nuxt-link-exact-active nuxt-link-active"
                            >
                              PRORESSIONAL TRAINING
                            </a>
                          </h5>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <h5>
                    <a href="/solutions">SOLUTIONS</a>
                  </h5>
                  <ul
                    className="list-arrow"
                    style={{ margin: "0px 40px", listStyleType: "square" }}
                  >
                    <li>
                      <h5>
                        <a href="/solutions/softwareengineering">
                          SOFTWARE ENGINEERING
                        </a>
                      </h5>
                    </li>
                    <li>
                      <h5>
                        <a href="/solutions/technicalpublication">
                          TECHNICAL PUBLICATION
                        </a>
                      </h5>
                    </li>
                    <li>
                      <h5>
                        <a
                          href="/sitemap"
                          aria-current="page"
                          className="pagess nuxt-link-exact-active nuxt-link-active"
                        >
                          CONSULTING
                        </a>
                      </h5>
                      <ul
                        className="list-arrow"
                        style={{ margin: "0px 40px", listStyleType: "square" }}
                      >
                        <li>
                          <h5>
                            <a href="/solutions/contentmigration">
                              CONTENT MIGRATION
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/solutions/informationarchitecture">
                              INFORMATION ARCHITECTURE
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/solutions/contentstrategy">
                              CONTENT STRATEGY
                            </a>
                          </h5>
                        </li>
                        <li>
                          <h5>
                            <a href="/solutions/staffaugmentation">
                              STAFF AUGMENTATION
                            </a>
                          </h5>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <h5>
                    <a href="/aboutus">ABOUT US</a>
                  </h5>
                  <ul
                    className="list-arrow"
                    style={{ margin: "0px 40px", listStyleType: "square" }}
                  >
                    <li>
                      <h5>
                        <a href="/aboutus">COMPANY</a>
                      </h5>
                      <ul
                        className="list-arrow"
                        style={{ margin: "0px 40px", listStyleType: "square" }}
                      >
                        <li>
                          <h5>
                            <a href="/aboutus/company/ourteam">OUR TEAM</a>
                          </h5>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h5>
                        <a href="/aboutus">BUSINESS PARTNERS</a>
                      </h5>
                    </li>
                    <li>
                      <h5>
                        <a href="/aboutus">INDUSTRIES</a>
                      </h5>
                    </li>
                    <li>
                      <h5>
                        <a href="/aboutus">PORTFOLIO</a>
                      </h5>
                    </li>
                    <li>
                      <h5>
                        <a href="https://careers.metapercept.com/">
                          WORK AT METAPERCEPT
                        </a>
                      </h5>
                    </li>
                  </ul>
                </li>
                <li>
                  <h5>
                    <a href="/contact">CONTACT US</a>
                  </h5>
                </li>
                <li>
                  <h5>
                    <a href="/privacy-policy">PRIVACY POLICY</a>
                  </h5>
                </li>
              </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SitemapArea;
