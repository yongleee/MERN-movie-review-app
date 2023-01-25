import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    const match = password === matchPwd;
    setValidMatch(match);
    if (match) {
      const newUser = { email, password, username };

      try {
        const response = await axios.post("/api/users/sign-up", newUser, {
          withCredentials: true,
        });
        if (response.statusText === "OK") {
          navigate("/log-in");
        }
      } catch (err) {
        const {
          response: { data },
        } = err;
        setErrorMsg(data.error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-OpenSans text-sm text-neutral-300"
    >
      {/* TODO: display error message here */}
      <h1>Sign Up</h1>
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="text-neutral-800"
      />
      <label htmlFor="username">Username: </label>
      <input
        id="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
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
      <label htmlFor="matchPwd">Confirm Password: </label>
      <input
        id="matchPwd"
        type="password"
        onChange={(e) => setMatchPwd(e.target.value)}
        value={matchPwd}
        className="text-neutral-800"
      />
      {!validMatch && <p>Password doesn't match.</p>}
      {errorMsg && <p>{errorMsg}</p>}
      <button>Sign Up</button>
      <p>Already registered?</p>
      <Link to={"/log-in"}>Log In</Link>
    </form>
  );
}
