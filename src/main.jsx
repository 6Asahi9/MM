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
          flexDirection: "column",
          fontFamily: "sans-serif",
          gap: "1rem",
        }}
      >
        <div
          style={{
            border: "6px solid #f3f3f3",
            borderTop: "6px solid #3498db",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
          Waking up backend... may need a minute or two
        </div>

        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
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
