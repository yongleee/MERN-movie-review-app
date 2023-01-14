import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <nav>
        <Link to="watchlist">WATCHLIST</Link>
        <Link to="reviews">REVIEWS</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default UserProfile;
