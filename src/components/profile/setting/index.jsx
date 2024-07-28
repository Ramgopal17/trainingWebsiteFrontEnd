import findHeaderHeight from "@/hooks/find-header-height";
import { showSidebar } from "@/utils/toggle-sidebar";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import DeleteAccount from "./delete-account";

function Setting() {
  const [headerHeight, setHeaderHeight] = useState(110);
  useEffect(() => {
    setHeaderHeight(findHeaderHeight());
  }, []);
  return (
    <>
      <style jsx global>
        {`
          .adjustMinHeight {
            min-height: calc(100vh - ${headerHeight});
          }
        `}
      </style>
      <div className="profileDiv">
        <i
          className="fa-solid fa-bars sidebarOpenBtn d-lg-none"
          onClick={showSidebar}
        ></i>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-0 adjustMinHeight">
              <Sidebar />
            </div>
            <div className="col-lg-9">
              <div className=" InfoDiv tp-section ">
                <DeleteAccount />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
