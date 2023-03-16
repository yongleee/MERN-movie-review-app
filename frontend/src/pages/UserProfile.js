import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UserProfile = () => {
  const { auth } = useAuthContext();

  return (
    <>
      <p className="text-neutral-400 text-4xl font-semibold mb-5 mt-2">
        {auth.username}
      </p>
      <nav className="font-OpenSans text-sm text-neutral-300 flex border-b-[1px] pb-1 border-neutral-400">
        <p className="px-2 hover:text-neutral-300/75">
          <NavLink
            to="watchlist"
            className={({ isActive }) => (isActive ? "text-emerald-400" : "")}
          >
            WATCHLIST
          </NavLink>
        </p>
        <p className="px-2 hover:text-neutral-300/75">
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? "text-emerald-400" : "")}
          >
            REVIEWS
          </NavLink>
        </p>
        <p className="px-2 hover:text-neutral-300/75">
          <NavLink
            to="account"
            className={({ isActive }) => (isActive ? "text-emerald-400" : "")}
          >
            ACCOUNT
          </NavLink>
        </p>
      </nav>
      <Outlet />
    </>
  );
};

export default UserProfile;
