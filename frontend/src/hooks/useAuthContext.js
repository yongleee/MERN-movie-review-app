import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside a AuthContextProvider");
  }

  // const { auth } = useContext(AuthContext);
  // useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return context;
};
