import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginButton.css";
import { FaUserCircle } from "react-icons/fa";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="floating-login-button"
      onClick={() => navigate("/login")}
    >
      <FaUserCircle size={35} />
    </button>
  );
};

export default LoginButton;
