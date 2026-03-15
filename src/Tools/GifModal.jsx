import React from "react";
import "./GifModal.css";

const GifModal = ({ show, gifSrc, message, onClose }) => {
  if (!show) return null;

  return (
    <div className="gif-modal-overlay" onClick={onClose}>
      <div className="gif-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={gifSrc} alt="Feedback GIF" className="gif-modal-img" />
        {message && <p>{message}</p>}
        <button className="gif-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GifModal;
