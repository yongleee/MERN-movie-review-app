import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { MoviesContextProvider } from "./contexts/MoviesContext";
import { ReviewsContextProvider } from "./contexts/ReviewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ReviewsContextProvider>
        <MoviesContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MoviesContextProvider>
      </ReviewsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
