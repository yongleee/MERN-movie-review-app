import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

export default function LogIn() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const { setAuth } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    const user = { emailOrUsername, password };

    try {
      const response = await axios.post("/api/auths/login", user, {
        withCredentials: true,
      });
      if (response.statusText === "OK") {
        setAuth(response.data);
        console.log(response.data);
        navigate("/");
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
      <form
        onSubmit={handleSubmit}
        className="font-OpenSans text-sm text-neutral-300"
      >
        <h1>Log In</h1>
        <label htmlFor="emailOrUsername">Email or Username: </label>
        <input
          id="emailOrUsername"
          type="text"
          onChange={(e) => setEmailOrUsername(e.target.value)}
          value={emailOrUsername}
          className="text-neutral-800"
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-neutral-800"
        />
        {errorMsg && <p>{errorMsg}</p>}
        <button>Log In</button>
      </form>
      <Link to={"/forgot-password"}>Forgot password?</Link>
    </>
  );
}
