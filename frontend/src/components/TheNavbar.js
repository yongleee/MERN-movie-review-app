import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TheNavbar = () => {
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchField}`);
  };

  //TODO: fix error404 when search an empty route

  return (
    <div className="bg-zinc-800">
      <div className="flex justify-between max-w-5xl mx-auto px-4 py-2 items-center">
        <Link to="/">
          <h1 className="font-semibold text-[27px] text-zinc-50 font-OpenSans text-gradient-to-r from-cyan-500 to-blue-500 tracking-wide">
            Kinopicks
          </h1>
        </Link>
        <div className="flex items-center">
          <Link to="/log-in">
            <p className="font-semibold text-[13px]	text-center px-2.5 text-zinc-200 hover:text-slate-50 font-OpenSans tracking-wide">
              LOG IN
            </p>
          </Link>
          <Link to="/sign-up">
            <p className="font-semibold text-[13px]	text-center px-2.5 text-zinc-200 hover:text-zinc-50 font-OpenSans tracking-wide">
              SIGN UP
            </p>
          </Link>
          <Link to="/user">
            <p className="font-semibold text-[13px]	text-center px-2.5 text-zinc-200 hover:text-zinc-50 font-OpenSans tracking-wide">
              PROFILE
            </p>
          </Link>
          <form onSubmit={handleSubmit} className="px-2.5 relative w-48">
            <input
              type="text"
              id="search"
              value={searchField}
              onChange={handleChange}
              placeholder="Search Movies..."
              className="w-full rounded-3xl pl-3 pr-8 text-[13px] h-6"
            />
            <button type="submit" className="z-10 absolute right-4 top-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TheNavbar;
