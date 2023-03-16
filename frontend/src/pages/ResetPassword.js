import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { setAuth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    setAuth({ accessToken: token });

    return () => {
      setAuth(null);
    };
    // eslint-disable-next-line
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");

    const match = password === matchPwd;
    setValidMatch(match);
    if (match) {
      try {
        const response = await axiosPrivate.post("/api/users/reset-password", {
          password,
        });
        if (response.statusText === "OK") {
          setAuth(null);
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
    <div className="pt-16">
      <h1 className="text-center text-2xl mb-6 text-neutral-400">
        Reset password
      </h1>
      <div className="mx-auto w-96 p-8 border border-neutral-500 bg-neutral-600/50 rounded drop-shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="font-OpenSans text-sm text-neutral-200 font-thin"
        >
          <label htmlFor="password" className="block pb-1.5 text-xs">
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-80 h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          <label htmlFor="matchPwd" className="block pt-4 pb-1.5 text-xs">
            Confirm Password
          </label>
          <input
            id="matchPwd"
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            className="w-80 h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
          />
          {!validMatch && <p>Password doesn't match.</p>}
          {errorMsg && <p>{errorMsg}</p>}
          <div className="text-center mt-6">
            <button className="w-52 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 active:from-emerald-700 active:to-cyan-700 text-xs rounded">
              RESET PASSWORD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
