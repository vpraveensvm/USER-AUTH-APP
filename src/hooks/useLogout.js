import useAuth from "./useAuth";
import axios from "../api/axios";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});

    try {
      await axios.get("/api/users/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
