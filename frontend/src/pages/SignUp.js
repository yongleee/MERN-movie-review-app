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
        await axios.post("/api/users/sign-up", newUser, {
          withCredentials: true,
        });
        navigate("/log-in");
      } catch (err) {
        const {
          response: { data },
        } = err;
        setErrorMsg(data.error);
      }
    }
  };

  return (
    <div className="py-16">
      <h1 className="text-center text-2xl mb-6 text-neutral-400">Sign Up</h1>
      <div className="mx-auto sm:w-96 max-w-sm p-8 border border-neutral-500 bg-neutral-600/50 rounded drop-shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="font-OpenSans text-sm text-neutral-200 font-thin max-w-xs mx-auto"
        >
          <label htmlFor="email" className="block pb-1.5 text-xs">
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          <label htmlFor="username" className="block pt-4 pb-1.5 text-xs">
            Username
          </label>
          <input
            id="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            autoComplete="username"
            className="w-full h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          <label htmlFor="password" className="block pt-4 pb-1.5 text-xs">
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="new-password"
            className="w-full h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          <label htmlFor="matchPwd" className="block pt-4 pb-1.5 text-xs">
            Confirm Password
          </label>
          <input
            id="matchPwd"
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            autoComplete="new-password"
            className="w-full h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          {!validMatch && <p>Password doesn't match.</p>}
          {errorMsg && (
            <p className="text-xs pt-1 text-red-500 font-semibold">
              {errorMsg}
            </p>
          )}
          <div className="text-xs text-center pt-1">
            <p className="inline">Already registered? </p>
            <Link to={"/log-in"}>
              <p className="hover:text-neutral-300 active:text-neutral-400 inline font-medium">
                Log In
              </p>
            </Link>
          </div>
          <div className="text-center mt-6">
            <button className="px-20 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 active:from-emerald-700 active:to-cyan-700 text-xs rounded">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
