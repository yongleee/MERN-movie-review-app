import { useState } from "react";

export default function LogIn() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <label htmlFor="emailOrUsername">Email or Username: </label>
      <input
        id="emailOrUsername"
        type="text"
        onChange={(e) => setEmailOrUsername(e.target.value)}
        value={emailOrUsername}
      />
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button>Log In</button>
    </form>
  );
}
