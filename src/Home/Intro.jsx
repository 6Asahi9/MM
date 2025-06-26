import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import backgroundImage from "../assets/Images/BigBackground.jpg";
import "./Intro.css";

export default function Intro() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const handleReveal = () => {
      setRevealed(true);
      window.removeEventListener("scroll", handleReveal);
      window.removeEventListener("click", handleReveal);
      window.removeEventListener("keydown", handleReveal);
    };

    setTimeout(() => {
      setReadyToRender(true);
      window.addEventListener("scroll", handleReveal);
      window.addEventListener("click", handleReveal);
      window.addEventListener("keydown", handleReveal);
    }, 50);

    return () => {
      window.removeEventListener("scroll", handleReveal);
      window.removeEventListener("click", handleReveal);
      window.removeEventListener("keydown", handleReveal);
    };
  }, []);

  return (
    <div
      className="intro-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className={`intro-content ${readyToRender ? "ready" : ""} ${
          revealed ? "revealed" : ""
        }`}
      >
        <img src={logo} alt="Miya Marines Logo" className="intro-logo" />
        <button className="intro-button" onClick={() => navigate("/account")}>
          Shop Now!
        </button>
      </div>
    </div>
  );
}
