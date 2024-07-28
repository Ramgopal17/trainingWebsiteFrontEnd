import {
  software_portfolio_web_Url,
  application_portfolio_web_Url,
  technical_portfolio_web_Url,
} from "../external-website";
const portfolio_data = [
  {
    id: 1,
    img: "/assets/img/about-us/portfolio/softwareDevelopment2.jpg",
    name: "Software Development",
    title: "Software Development",
    delay: ".3s",
    // url: "http://portfolio.metapercept.com/category/web-development/",
    url: software_portfolio_web_Url,
    desc: "We leverage UX led engineering to develop new platforms, new applications. We cover the entire spectrum of engineering from consulting, UI/UX design, architecture and testing.",
  },

  {
    id: 2,
    img: "/assets/img/portfolio/ha-portfolio-2.jpg",
    img: "/assets/img/about-us/portfolio/technicalWriting2.jpg",
    name: "Technical Writing",
    title: "Technical Writing",
    delay: ".4s",
    // url: "http://portfolio.metapercept.com/category/technical-publication/",
    url: technical_portfolio_web_Url,
    desc: "We are obsessed with Information Architecture, DITA Implementation, DITA Consulting, Content Strategy, Content Migration, Translation & Localization, and Documentation Analysis.",
  },
  {
    id: 3,
    img: "/assets/img/about-us/portfolio/applicationIntegration2.jpg",
    name: "Application Integration",
    title: "Application Integration",
    delay: ".5s",
    // url: "http://portfolio.metapercept.com/category/application-integration/",
    url: application_portfolio_web_Url,
    desc: "Amplify your product value by collaborating with an innovative custom software development company. We help our clients evaluate an idea and enhance it by building rapid POCS and prototypes.",
  },
];

export default portfolio_data;
