import { getToken } from "@/api/manage-session";
import { useAuthContext } from "@/context/Auth-context";
import SEO from "@/src/common/seo";
import ChangePassword from "@/src/components/profile/change-password/change-password";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function changePassword() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    let token = getToken();
    if (!token) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {user && (
        <>
          <SEO pageTitle={"Metapercept Technology Services (LLP)"} />
          <Header />
          <ChangePassword />
          <Footer />
        </>
      )}
    </>
  );
}

export default changePassword;
