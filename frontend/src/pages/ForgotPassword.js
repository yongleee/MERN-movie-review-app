import { useState } from "react";
import axios from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    try {
      const response = await axios.post(
        "/api/users/forgot-password",
        { email },
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        setIsSubmitted(true);
      }
    } catch (err) {
      const {
        response: { data },
      } = err;
      setErrorMsg(data.error);
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your email: </label>
          <input
            type="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMsg && <p>{errorMsg}</p>}
          <button>Submit</button>
        </form>
      ) : (
        <>
          <p>
            {"We've emailed you a link you can use to reset your password."}
          </p>
        </>
      )}
    </>
  );
}
