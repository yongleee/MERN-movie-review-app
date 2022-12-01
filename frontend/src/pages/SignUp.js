import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const match = password === matchPwd;
    setValidMatch(match);
    if (match) {
      const newUser = { email, password, username };

      try {
        const response = await axios.post("/api/users/sign-up", newUser, {
          withCredentials: true,
        });
        setErrorMsg(null);
        console.log(response);
        if (response.statusText === "OK") {
          // TODO: dispatch to context
          // dispatch({ type: "LOGIN", payload: response.data });
        }
      } catch (err) {
        const {
          response: { data },
        } = err;
        setErrorMsg(data.error);
      }
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: display error message here */}
      <h1>Sign Up</h1>
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <label htmlFor="matchPwd">Confirm Password: </label>
      <input
        id="matchPwd"
        type="password"
        onChange={(e) => setMatchPwd(e.target.value)}
        value={matchPwd}
      />
      {!validMatch && <p>Password doesn't match.</p>}
      <button>Sign Up</button>
      {errorMsg && <p>{errorMsg}</p>}
      <p>Already registered?</p>
      <Link to={"/log-in"}>Log In</Link>
    </form>
  );
}
