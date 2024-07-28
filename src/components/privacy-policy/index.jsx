import BreadcrumbArea from "@/src/common/breadcrumb-area";
import React from "react";
import PrivacyPolicyArea from "./privacy-policy-area";

function PrivacyPolicy() {
  return (
    <div style={{ "--tp-heading-primary": "var(--tp-theme-vogue)" }}>
      <BreadcrumbArea
        // acive_menu="Software Engineering"
        // slug={slug}
        title="Privacy Policy"
        backColor="#eef0fb"
        backImage="/assets/img/breadcrumb/bg_1.png"
        theme="blueTheme"
      />
      <PrivacyPolicyArea />
    </div>
  );
}

export default PrivacyPolicy;
