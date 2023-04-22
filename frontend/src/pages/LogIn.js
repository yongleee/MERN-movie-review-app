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
      setAuth(response.data);
      navigate("/");
    } catch (err) {
      const {
        response: { data },
      } = err;
      setErrorMsg(data.error);
    }
  };

  return (
    <div className="py-16">
      <h1 className="text-center text-2xl mb-6 text-neutral-400">Log In</h1>
      <div className="mx-auto sm:w-96 max-w-sm p-8 border border-neutral-500 bg-neutral-600/50 rounded drop-shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="font-OpenSans text-sm text-neutral-200 font-thin max-w-xs mx-auto"
        >
          <label htmlFor="emailOrUsername" className="block pb-1.5 text-xs">
            Email or Username
          </label>
          <input
            id="emailOrUsername"
            type="text"
            onChange={(e) => setEmailOrUsername(e.target.value)}
            value={emailOrUsername}
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
            className="w-full h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          {errorMsg && (
            <p className="text-xs pt-1 text-red-500 font-semibold">
              {errorMsg}
            </p>
          )}
          <Link to={"/forgot-password"}>
            <p className="text-right text-xs pt-1 hover:text-neutral-300 active:text-neutral-400">
              Forgot password?
            </p>
          </Link>
          <div className="text-center mt-6">
            <button className="w-52 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 active:from-emerald-700 active:to-cyan-700 text-xs rounded">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
