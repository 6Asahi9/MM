import React from "react";
import LoginButton from "./LoginButton";
import MusicToggle from "./MusicToggle";
import "./FloatingControls.css";

const FloatingControls = () => {
  return (
    <div className="floating-controls">
      <LoginButton />
      <MusicToggle />
    </div>
  );
};

export default FloatingControls;
