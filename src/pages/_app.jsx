import ScrollToTop from "@/hooks/scroll-to-top";
import "@/src/styles/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import useScrollRestoration from "@/hooks/useScrollRestoration";
import AuthProvider from "@/auth-provider/Auth-provider";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps, router }) {
  useScrollRestoration(router);
  return (
    <AuthProvider>
      {/* <UserProfileProvider> */}
      <div style={{ "--tp-heading-primary": "var(--tp-theme-vogue)" }}>
        <style jsx global>
          {`
            @import url(/assets/css/custom/main.css);
            .tp-section p {
              margin-bottom: 10px;
            }
            strong,
            b {
              font-weight: 400;
            }
            @media (max-width: 768px) {
              .tp-section p {
                font-size: 16px;
              }
            }
          `}
        </style>
        {/* <CookiesObj /> */}
        {/* <Header /> */}
        {/* <RouteGuard> */}
        <Component {...pageProps} />
        <ScrollToTop />
        {/* <ChatBotComponent /> */}
        {/* <PopupNotification /> */}
        {/* <Footer /> */}
        {/* </RouteGuard> */}
      </div>
      {/* </UserProfileProvider> */}
    </AuthProvider>
  );
}
