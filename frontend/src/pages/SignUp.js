import { useState, useRef, useEffect } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const match = password === matchPwd;
    setValidMatch(match);
    console.log(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: error message */}
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
    </form>
  );
}
