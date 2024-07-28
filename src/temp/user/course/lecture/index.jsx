import { getToken } from "@/api/manage-session";
import { useAuthContext } from "@/context/Auth-context";
import SEO from "@/src/common/seo";
import Lecture from "@/src/components/user/course/lecture";
import Footer from "@/src/layout/footers/footer-12";
import Header from "@/src/layout/headers/header-12";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function index() {
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
          <Lecture />
          <Footer />
        </>
      )}
    </>
  );
}

export default index;
