import React, { useState } from "react";
import { AuthContext } from "@/context/Auth-context";
import { useEffect } from "react";
import { getToken } from "@/api/manage-session";
import { BackEndApi } from "@/src/data/auth_token";
import { useRouter } from "next/router";
const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let authToken = null;
  const fetchLoggedInUser = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BackEndApi}/api/users/me?populate=*`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      // console.log("islog", data);
      setUserData(data);
    } catch (error) {
      // console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user) => {
    // console.log("Handle use called");
    setUserData(user);
  };

  useEffect(() => {
    authToken = getToken();
    // console.log(authToken);

    if (authToken) {
      fetchLoggedInUser(authToken);
      // console.log("Authent", userData);
    } else {
      // console.log("not token");
      setUserData(null);
    }
  }, [router.asPath]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: handleUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
