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
      await axios.post(
        "/api/users/forgot-password",
        { email },
        {
          withCredentials: true,
        }
      );
      setIsSubmitted(true);
    } catch (err) {
      const {
        response: { data },
      } = err;
      setErrorMsg(data.error);
    }
  };

  return (
    <div className="py-16">
      <h1 className="text-center text-2xl mb-6 text-neutral-400">
        Forgot password
      </h1>
      {!isSubmitted ? (
        <>
          <p className="text-center text-neutral-300 mb-6">
            Enter your email below and a link will be sent to you to reset your
            password.
          </p>
          <div className="mx-auto sm:w-96 max-w-sm p-8 border border-neutral-500 bg-neutral-600/50 rounded drop-shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="font-OpenSans text-sm text-neutral-200 font-thin max-w-xs mx-auto"
            >
              <label htmlFor="email" className="block pb-1.5 text-xs">
                Enter your email
              </label>
              <input
                type="email"
                value={email}
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-6 pl-1.5 rounded-sm outline-0 text-neutral-200 bg-neutral-500 focus:bg-neutral-50 focus:text-neutral-900"
              />
              {errorMsg && (
                <p className="text-xs pt-1 text-red-500 font-semibold">
                  {errorMsg}
                </p>
              )}
              <div className="text-center mt-6">
                <button className="w-52 py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 active:from-emerald-700 active:to-cyan-700 text-xs rounded">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-neutral-300">
            {"We've emailed you a link you can use to reset your password."}
          </p>
        </>
      )}
    </div>
  );
}
