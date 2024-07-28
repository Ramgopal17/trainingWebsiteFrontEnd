import findHeaderHeight from "@/hooks/find-header-height";
import { hideSidebar } from "@/utils/toggle-sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/Auth-context";
import { createGlobalState } from "react-use";

function Sidebar() {
  const { user } = useAuthContext();
  const sideBarTab = [
    {
      name: "Edit Profile",
      url: `/user/profile/?id=${user?.Uuid}`,
    },
    {
      name: "Change Password",
      url: "/user/profile/change-password",
    },
    {
      name: "Payment Details",
      url: "/user/profile/payment-details",
    },
    {
      name: "Certificates",
      url: "/user/profile/certificates",
    },
    {
      name: "My Courses",
      url: "/user/profile/my-courses",
    },
    {
      name: "Setting",
      url: "/user/profile/setting",
    },
  ];
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState("");
  useEffect(() => {
    setCurrentRoute(router.asPath);
    // console.log(router.asPath);
  });
  return (
    <div
      className="SidebarDiv"
      id="SidebarDiv"
      // style={{ minHeight: `calc(100vh - ${headerHeight})` }}
      style={{ height: `100%` }}
    >
      <i
        className="fa-solid fa-circle-xmark d-lg-none "
        onClick={hideSidebar}
      ></i>
      <ul>
        {sideBarTab.map((tab, i) => {
          {
            /* console.log(tab); */
          }
          return (
            <li
              key={i}
              className={`${currentRoute.includes(tab.url) ? "active" : ""}`}
            >
              <Link href={tab.url}>{tab.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
