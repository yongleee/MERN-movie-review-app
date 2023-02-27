import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import Search from "./pages/Search";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import UserWatchlist from "./pages/UserWatchlist";
import UserReviews from "./pages/UserReviews";
import UserSettings from "./pages/UserSettings";
import TheNavbar from "./components/TheNavbar";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { auth } = useAuthContext();
  return (
    <>
      <TheNavbar />
      <div className="bg-neutral-700">
        <div className="mx-auto max-w-5xl px-4 pt-2 h-full">
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="/" element={<Home />} />

              <Route path="/search/:searchId" element={<Search />} />
              <Route path="/movie/:movieId" element={<MoviePage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route
                path="/sign-up"
                element={!auth ? <SignUp /> : <Navigate to="/" />}
              />
              <Route
                path="/log-in"
                element={!auth ? <LogIn /> : <Navigate to="/" />}
              />
              <Route path="*" element={<NotFound />} />

              <Route element={<RequireAuth />}>
                <Route path="/user" element={<UserProfile />}>
                  <Route index element={<UserWatchlist />} />
                  <Route path="watchlist" element={<UserWatchlist />} />
                  <Route path="reviews" element={<UserReviews />} />
                  <Route path="settings" element={<UserSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
