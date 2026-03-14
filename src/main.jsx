import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

function Bootstrap() {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    fetch("https://mm-backend-render.onrender.com/healthz")
      .then((res) => {
        console.log("Backend ping status:", res.status);
        setBackendReady(true);
      })
      .catch((err) => {
        console.error("Backend ping failed:", err);
        setBackendReady(true);
      });
  }, []);

  if (!backendReady) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "2rem",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        Waking up backend...
      </div>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Bootstrap />
    </BrowserRouter>
  </React.StrictMode>,
);
