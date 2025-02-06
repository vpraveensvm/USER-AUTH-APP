import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersistAuth = () => {
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("auth at PersistAuth-", auth);
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>
      {!persist ? <Outlet /> : isLoading ? <div>Loading...</div> : <Outlet />}
    </>
  );
};

export default PersistAuth;
