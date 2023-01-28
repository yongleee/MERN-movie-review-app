import axios from "../api/axios";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const UserWatchlist = () => {
  const { auth } = useAuthContext();
  const username = auth.username;

  console.log(username);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await axios.get(`/api/users/username/${username}`);
      console.log(data.watchlist);
    };

    fetchUserData();
  }, [username]);

  return;
};

export default UserWatchlist;
