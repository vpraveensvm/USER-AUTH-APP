import { useAuth } from "./useAuth";
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

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
