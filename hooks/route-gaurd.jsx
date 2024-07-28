import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/Auth-context";

function RouteGuard({ children }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname);

    // on route change start - hide page content by setting authorized to false
    // const hideContent = () => setAuthorized(false);
    // router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      // router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      "/",
      "/user/login",
      "/user/signup",
      "/user/forgot-password",
      "/user/reset-password",
      "/search",
      "/category",
      "/courses",
    ];
    url = url.split("?")[0];
    if (url.startsWith("/category")) {
      url = "/category";
    }
    if (url.startsWith("/courses")) {
      url = "/courses";
    }
    // console.log("Dfsdfsdfs", url);
    // console.log("Dfsdfsdfs", user);
    // console.log("Dfsdfsdf", !user && !publicPaths.includes(url));
    if (!user && !publicPaths.includes(url)) {
      // console.log("url", url);
      setAuthorized(false);
      router.push("/");
    } else {
      setAuthorized(true);
      // console.log("checked user");
    }
  }

  return authorized && children;
}

export { RouteGuard };
