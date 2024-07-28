import BreadcrumbArea from "@/src/common/breadcrumb-area";
import React from "react";
import SitemapArea from "./sitemap-area";

function SiteMap() {
  return (
    <div style={{ "--tp-heading-primary": "var(--tp-theme-vogue)" }}>
      <BreadcrumbArea
        title="Sitemap"
        backColor="rgb(254,243,235)"
        backImage="/assets/img/breadcrumb/bg_3.png"
        theme="orangeTheme"
      />
      <SitemapArea />
    </div>
  );
}

export default SiteMap;
