import React from "react";
import gif404 from "./assets/Gif/404.gif";
import middleVine from "./assets/Images/MiddleVine.png";

const NotFound = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#5FBBA6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src={middleVine}
        alt="Decor Vine"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          maxWidth: "1200px",
          minWidth: "760px",
          zIndex: 1,
          pointerEvents: "none",
          objectFit: "contain",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
          color: "#ffffff",
          fontSize: "2rem",
          fontWeight: "600",
          textShadow: "0 0 10px #00000055",
          fontFamily: "sans-serif",
        }}
      >
        Page not found :(
      </div>

      <img
        src={gif404}
        alt="404 Not Found"
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          border: "4px solid #ffffff55",
          borderRadius: "12px",
          boxShadow: "0 0 20px #ffffff33",
          objectFit: "contain",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default NotFound;
