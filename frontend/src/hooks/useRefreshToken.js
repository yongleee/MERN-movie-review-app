import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const useRefreshToken = () => {
  const { dispatch } = useAuthContext();

  const refresh = async () => {
    const response = await axios.get("/api/auths/refresh", {
      withCredentials: true,
    });

    if (response.statusText === "OK") {
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return {
          ...prev,
          accessToken: response.data.accessToken,
        };
      });
    }

    return response.data.accessToken;
  };

  return refresh;
};
