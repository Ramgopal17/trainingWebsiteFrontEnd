import {
  portfolio_web_Url,
  career_web_Url,
  training_web_Url,
} from "@/src/data/external-website";
const menu_data = [
  {
    id: 1,
    mega_menu: false,
    has_dropdown: false,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    mega_menu: false,
    has_dropdown: true,
    title: "All Courses",
    link: "/services",
    sub_menus: [
      { link: "/services/softwaredevelopment", title: "Software Development" },
      { link: "/services/technicalwriting", title: "Technical Writing" },
      { link: training_web_Url, title: "Training & certification" },
    ],
  },
  {
    id: 3,
    mega_menu: false,
    has_dropdown: true,
    title: "solutions",
    link: "/solutions",
    sub_menus: [
      { link: "/solutions/softwareengineering", title: "Software Engineering" },
      {
        link: "/solutions/technicalpublication",
        title: "Technical Publication",
      },
      {
        link: "/solutions/informationarchitecture",
        title: "Information Architecture",
      },
      // { link: "/solutions/contentmigration", title: "Content Migration" },
      // { link: "/solutions/contentstrategy", title: "Content Strategy" },
      { link: "/solutions/staffaugmentation", title: "Staff Augmentation" },
    ],
  },
  {
    id: 4,
    mega_menu: false,
    has_dropdown: true,
    title: "About Us",
    link: "/aboutus",
    sub_menus: [
      { link: "/aboutus/company", title: "Company" },
      { link: portfolio_web_Url, title: "Portfolio" },
      { link: career_web_Url, title: "Careers" },
      // { link: "/aboutus/industry", title: "Industry" },
      // { link: "/aboutus/business-partner", title: "Business Partner" },
      // { link: "/aboutus/membership", title: "Membership" },
    ],
  },
  {
    id: 5,
    mega_menu: false,
    has_dropdown: false,
    title: "Contact Us",
    link: "/contact",
  },
];
export default menu_data;
