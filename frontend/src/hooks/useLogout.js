import axios from "../api/axios";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { setAuth } = useAuthContext();

  const logout = async () => {
    setAuth(null);
    try {
      await axios.get("/api/auths/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};
