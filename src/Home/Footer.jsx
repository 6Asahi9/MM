import React, { useState } from "react";
import cardImg from "../assets/images/Logo-modified.png";
import pawGif from "../assets/Gif/paw.gif";
import "./Footer.css";
import "boxicons/css/boxicons.min.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleCardClick = () => {
    if (!isVisible || isFadingOut) return;

    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsFadingOut(false);

      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }, 600);
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-card-container" onClick={handleCardClick}>
        <img
          src={pawGif}
          alt="Miya's Paw Signature"
          className="footer-paw-img"
        />
        <img
          src={cardImg}
          alt="Miya Marines Business Card"
          className={`footer-card-img ${
            !isVisible ? "hidden" : isFadingOut ? "fading-out" : "visible"
          }`}
        />
      </div>

      <div className="footer-contact">
        <h8>Contact Us</h8>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-google"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-github"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </div>

      <div className="footer-links">
        <a href="/MMLegal.pdf#page=2" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <a href="/MMLegal.pdf#page=3" target="_blank" rel="noopener noreferrer">
          Return & Refund Policy
        </a>
        <a href="/MMLegal.pdf#page=5" target="_blank" rel="noopener noreferrer">
          Terms & Conditions
        </a>
        <a href="/MMLegal.pdf#page=6" target="_blank" rel="noopener noreferrer">
          User Account
        </a>
        <a href="/MMLegal.pdf#page=7" target="_blank" rel="noopener noreferrer">
          Account Termination
        </a>
      </div>
    </footer>
  );
};

export default Footer;
