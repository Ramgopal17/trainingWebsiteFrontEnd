import React from "react";
import { blog_web_Url } from "../data/external-website";
// social_links
const social_links = [
  {
    link: "https://www.facebook.com/metapercepttechservices/",
    target: "_blank",
    icon: "fab fa-facebook-f",
    name: "Facebook",
    backColor: "rgb(50,77,160)",
    img: "/assets/img/footer/facebook.png",
  },
  {
    link: "https://twitter.com/MetaPercept",
    target: "_blank",
    icon: "fa-brands fa-x-twitter",
    name: "Twitter",
    backColor: "#656565",
    img: "/assets/img/footer/twitter.png",
  },
  {
    link: "https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/",
    target: "_blank",
    icon: "fa-brands fa-linkedin-in",
    name: "linkedin",
    backColor: "rgb(244,127,32)",
    img: "/assets/img/footer/linkedin.png",
  },
  {
    link: blog_web_Url,
    target: "_blank",
    icon: "fa-solid fa-blog",
    name: "blogs",
    backColor: "rgb(252,183,19)",
    img: "/assets/img/footer/media.png",
  },
];

const SocialLinks = () => {
  return (
    <>
      <style jsx>
        {`
          .socialLinkParent {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(2, 1fr);
          }
          .socialLinkParent > * {
            flex-shrink: 0;
          }
          @media (max-width: 1200px) {
            .socialLinkParent {
              width: 100px;
            }
          }
          @media (max-width: 768px) {
            .socialLinkParent {
              gap: 10px;
              grid-template-columns: repeat(4, 1fr);
            }
          }
        `}
      </style>
      <div className="socialLinkParent">
        {social_links.map((item, i) => (
          <div key={i} className="">
            <a
              key={i}
              target="_blank"
              href={item.link}
              style={{ backgroundColor: item.backColor, color: "whitesmoke" }}
              aria-label={item.name}
            >
              <i className={item.icon}></i>
            </a>
          </div>
        ))}
      </div>

      {/* <br />
      {social_links.map((item, i) => (
        <a key={i} target="_blank" href={item.link} aria-label={item.name}>
          <img
            src={item.img}
            alt=""
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </a>
      ))} */}
    </>
  );
};

export default SocialLinks;

const social_links_home_two = [
  {
    link: "https://www.facebook.com/metapercepttechservices/",
    target: "_blank",
    icon: "fab fa-facebook-f",
    name: "Facebook",
  },
  {
    link: "https://twitter.com/MetaPercept",
    target: "_blank",
    icon: "fab fa-twitter",
    name: "Twitter",
  },
  {
    link: "https://www.linkedin.com/company/metapercept-technology-services-llp/mycompany/",
    target: "_blank",
    icon: "fa-brands fa-linkedin-in",
    name: "linkedin",
  },
  {
    link: "https://blog.metapercept.com/",
    target: "_blank",
    icon: "fa-solid fa-blog",
    name: "blogs",
  },
];

export const SocialLinksHomeTwo = () => {
  return (
    <>
      {social_links_home_two.map((item, i) => (
        <a key={i} target="_blank" href={item.link}>
          <i className={item.icon}></i>
        </a>
      ))}
    </>
  );
};
