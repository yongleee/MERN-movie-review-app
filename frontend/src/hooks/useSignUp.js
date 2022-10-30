import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signUp = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/users/sign-up", {
        email,
        password,
      });
    } catch (err) {
      const {
        response: { data },
      } = err;
      setIsLoading(false);
      setError(data.error);
    }
  };
  return <div>useSignUp</div>;
};
