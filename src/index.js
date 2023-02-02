import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MovieProfilProvider from "./store/MovieProfilProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MovieProfilProvider>
      <App />
    </MovieProfilProvider>
  </React.StrictMode>
);
