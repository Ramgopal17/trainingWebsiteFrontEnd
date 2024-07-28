import Link from "next/link";
import React from "react";
import {
  news_blog_web_Url,
  event_blog_web_Url,
  blog_web_Url,
} from "@/src/data/external-website";
// footer_links data
const footer_links = [
  {
    id: 1,
    title: "More",
    col: "col-xl-3",
    id: "company",
    links: [
      { title: "Privacy", link: "/privacy-policy" },
      { title: "Terms", link: "/" },
      { title: "Help", link: "/" },
      { title: "Contact", link: "/" },
      { title: "About", link: "/" },
      { title: "Career", link: "/" },
    ],
  },
];
const HighlightedCourses_links = [
  {
    id: 1,
    title: "Highlighted Courses",
    col: "col-xl-12",
    id: "company",
    links: [
      {
        title: "Basic Technical Writing",
        link: "/courses?coursename=basic-technical-writing&category=technical-writing",
      },
      {
        title: "Advanced Technical Writing",
        link: "/courses?coursename=advanced-technical-writing-api&category=technical-writing",
      },
      {
        title: "Basic DITA-XML",
        link: "/courses?coursename=basic-dita-xml&category=dita-xml",
      },
      {
        title: "Advanced DITA-XML",
        link: "/courses?coursename=advanced-dita-xml&category=dita-xml",
      },
      {
        title: "Basic API Documentation",
        link: "/courses?coursename=basic-api-documentation&category=api-documentation",
      },
      {
        title: "Advanced API Documentation",
        link: "/courses?coursename=advanced-api-documentation&category=api-documentation",
      },
    ],
  },
];

const CommonFooter = () => {
  const generateLink = (link) => {
    if (link.link.startsWith("https")) {
      return (
        <a href={link.link} target="_blank">
          {link.title}
        </a>
      );
    } else {
      return <Link href={link.link}>{link.title}</Link>;
    }
  };
  return (
    <>
      {footer_links.map((item, i) => (
        <div key={i} className={`${item.col} col-md-6`}>
          <div className="tp-footer__widget mb-40">
            <h3 className="tp-footer__widget-title mb-35">{item.title}</h3>
            <ul id={item.id}>
              {item.links?.map((link, id) => (
                <li key={id}>{generateLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommonFooter;

// copy right text
const footer_content = {
  copy_right_info: (
    <>
      {" "}
      Copyright © {new Date().getFullYear()}{" "}
      <Link href="/">Metapercept Technology Services LLP</Link> All Rights
      Reserved{" "}
    </>
  ),
};

const { copy_right_info } = footer_content;

export const FooterCopyRight = ({ style_3, style_7, style_9 }) => {
  return (
    <>
      <div
        style={{ "--tp-theme-redical": "#324da0" }}
        className={`tp-footer__bottom pt-25 pb-25 ${
          style_3 ? "da-ft-copyright-bg" : ""
        } ${style_7 ? "law-footer__bottom red-bg" : ""} ${
          style_9 ? "ha-footer-copyright" : ""
        }`}
      >
        <div className="row align-items-center">
          <div className="col-md-8 col-12">
            {/* <div className="col-md-8 col-12 mb-20"> */}
            <div
              className={`tp-copyrigh-text ${
                style_3 ? "" : "text-center text-md-start"
              }`}
            >
              <span>{copy_right_info}</span>
            </div>
          </div>
          {/* <div className="col-md-4 d-none d-md-block"> */}
          <div className="col-md-4 d-md-block pt-4 pt-sm-0">
            {/* <div className="tp-footer-menu text-end"> */}
            <div className="tp-footer-menu text-center">
              {/* <ul> */}
              <ul className="d-flex justify-content-md-end justify-content-center">
                <li>
                  <Link
                    href="https://metapercept.com/privacy-policy"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                </li>
                {/* <li>
                  <Link href="/sitemap">View Sitemap</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const HighlightedCourses = () => {
  const generateLink = (link) => {
    if (link.link.startsWith("https")) {
      return (
        <a href={link.link} target="_blank" className="font-12">
          {link.title}
        </a>
      );
    } else {
      return (
        <Link href={link.link} className="font-12">
          {link.title}
        </Link>
      );
    }
  };
  return (
    <>
      {HighlightedCourses_links.map((item, i) => (
        <div key={i} className={`${item.col} `}>
          <div className="tp-footer__widget mb-20 mb-md-2">
            <h3 className="tp-footer__widget-title mb-10">{item.title}</h3>
            <ul>
              {item.links?.map((link, id) => (
                <li key={id}>{generateLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};
