import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers.Authorization) {
          request.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequestConfig = error?.config;
        if (error?.response?.status === 401 && !prevRequestConfig.sent) {
          prevRequestConfig.sent = true;
          const newAccessToken = await refresh();
          prevRequestConfig.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequestConfig);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
