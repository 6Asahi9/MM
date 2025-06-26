import React from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";
import { useLocation } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId;

  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="intro-container">
      <h2>Account Section</h2>
      {userId ? <p>Received ID: {userId}</p> : <p>No ID received yet.</p>}
      <p>This is the Account container content.</p>
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}
