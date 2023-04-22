import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const TheNavbar = () => {
  const [searchField, setSearchField] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuthContext();

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchField) {
      navigate(`/search/${searchField}`);
    }
  };

  //TODO: fix error404 when search an empty route

  return (
    <div className="bg-neutral-800 relative">
      <div className="xl:max-w-5xl xl:mx-auto max-w-full px-4">
        <div className="flex justify-between items-center flex-wrap">
          <Link to="/">
            <h1 className="font-semibold text-[27px] text-neutral-50 font-OpenSans text-gradient-to-r from-cyan-500 to-blue-500 tracking-wide align-middle py-2">
              Kinopicks
            </h1>
          </Link>
          <div className="lg:hidden block absolute top-4 right-4">
            <button
              className="text-neutral-300"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <nav
            className={`lg:flex lg:items-center ${
              isOpen ? "block" : "hidden"
            } w-full lg:w-auto bg-neutral-600 lg:bg-inherit mb-2 lg:mb-0 rounded-md transition duration-300`}
          >
            {!auth?.email ? (
              <>
                <Link to="/log-in">
                  <p className="font-semibold text-xs lg:text-center text-left px-3 py-2 text-neutral-200 hover:text-zinc-50 font-OpenSans tracking-wide block">
                    LOG IN
                  </p>
                </Link>
                <Link to="/sign-up">
                  <p className="font-semibold text-xs	lg:text-center text-left px-3 py-2 text-neutral-200 hover:text-zinc-50 font-OpenSans tracking-wide block">
                    SIGN UP
                  </p>
                </Link>
              </>
            ) : (
              <Link to="/user">
                <p className="font-semibold text-xs	lg:text-center text-left px-3 py-2 text-neutral-200 hover:text-zinc-50 font-OpenSans tracking-wide block">
                  PROFILE
                </p>
              </Link>
            )}
            <form onSubmit={handleSubmit} className="px-3 py-2 relative w-48">
              <input
                type="text"
                id="search"
                value={searchField}
                onChange={handleChange}
                placeholder="Search Movies..."
                className="w-full rounded-3xl pl-3 pr-8 text-[13px] h-6 outline-0"
              />
              <button type="submit" className="z-10 absolute right-5 top-3">
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
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TheNavbar;
