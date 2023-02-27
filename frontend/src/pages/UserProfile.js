import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserProfile = () => {
  return (
    <>
      <nav className="font-OpenSans text-sm text-neutral-300">
        <Link to="watchlist">WATCHLIST</Link>
        <Link to="reviews">REVIEWS</Link>
        <Link to="settings">SETTINGS</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default UserProfile;
