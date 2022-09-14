import { createContext } from "react";

export const MoviesContext = createContext();

export const MoviesContextProvider = ({ children }) => {
  const API_URL = "https://api.themoviedb.org/3";

  return (
    <MoviesContext.Provider
      value={{
        API_URL,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
