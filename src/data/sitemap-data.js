import {
  career_web_Url,
  portfolio_web_Url,
  training_web_Url,
} from "./external-website";
const sitemap_data = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "/services",
    title: "Services",
    subMenu: [
      {
        link: "/services/softwaredevelopment",
        title: "Software Development",
        subMenu: [
          {
            link: "/services/softwaredevelopment/webdevelopment",
            title: "Web Development",
          },
          {
            link: "/services/softwaredevelopment/customengineering",
            title: "Custom Engineering",
          },

          {
            link: "/services/softwaredevelopment/integration",
            title: "Application integration",
          },
          {
            link: "/services/softwaredevelopment/docops",
            title: "DocOps",
          },
        ],
      },
      {
        link: "/services/technicalwriting",
        title: "Technical Writing",
        subMenu: [
          {
            link: "/services/technicalwriting/docmigration",
            title: "Document Migration",
          },
          {
            link: "/services/technicalwriting/structureauth",
            title: "Structured Authoring",
          },
          {
            link: "/services/technicalwriting/contentconversion",
            title: "Content Conversion",
          },
          {
            link: "/services/technicalwriting/edit_proof",
            title: "Editing & Proofreading",
          },
          {
            link: "/services/technicalwriting/templatedesign",
            title: "XSLT, DTD Designing",
          },
          {
            link: "/services/technicalwriting/knowledge",
            title: "Knowledge Management",
          },
        ],
      },
      {
        link: training_web_Url,
        title: "Training & certification",
      },
    ],
  },
  {
    link: "/solutions",
    title: "Solutions",
    subMenu: [
      {
        link: "/solutions/softwareengineering",
        title: "Software Engineering",
      },
      {
        link: "/solutions/technicalpublication",
        title: "Technical Publication",
      },
      {
        link: "/solutions/informationarchitecture",
        title: "Information Architecture",
      },
      {
        link: "/solutions/staffaugmentation",
        title: "Staff Augmentation",
      },
      // {
      //   link: "#",
      //   title: "Consulting",
      //   subMenu: [
      //     {
      //       link: "/solutions/contentmigration",
      //       title: "Content Migration",
      //     },
      //     {
      //       link: "/solutions/informationarchitecture",
      //       title: "Information Architecture",
      //     },
      //     {
      //       link: "/solutions/contentstrategy",
      //       title: "Content Strategy",
      //     },
      //     {
      //       link: "/solutions/staffaugmentation",
      //       title: "Staff Augmentation",
      //     },
      //   ],
      // },
    ],
  },
  {
    link: "/aboutus",
    title: "About Us",
    subMenu: [
      {
        link: "/aboutus/company",
        title: "Company",
        // subMenu: [
        //   {
        //     link: career_web_Url,
        //     title: "Our Team",
        //   },
        // ],
      },
      // {
      //   link: "/aboutus",
      //   title: "Business Partners",
      // },
      // {
      //   link: "/aboutus",
      //   title: "Industries",
      // },
      {
        link: portfolio_web_Url,
        title: "Portfolio",
      },
      {
        link: career_web_Url,
        title: "Careers",
      },
    ],
  },
  {
    link: "/contact",
    title: "Contact Us",
  },
  {
    link: "/privacy-policy",
    title: "Privacy Policy",
  },
];

export { sitemap_data };
