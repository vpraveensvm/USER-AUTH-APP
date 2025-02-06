import useAuth from "./useAuth";
import axios from "../api/axios";

const REFRESH_URL = "/api/users/refresh";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log("refresh response", response.data);

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        roles: response.data.roles,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
