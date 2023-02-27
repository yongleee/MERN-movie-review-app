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
    <form
      onSubmit={handleSubmit}
      className="font-OpenSans text-sm text-neutral-300"
    >
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
      <button>Reset Password</button>
    </form>
  );
}
