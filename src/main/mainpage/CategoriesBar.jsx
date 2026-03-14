import React from "react";
import "./CategoriesBar.css";
import { useNavigate } from "react-router-dom";

const CategoriesBar = () => {
  const navigator = useNavigate();
  return (
    <div className="categories-bar">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span onClick={() => navigator("/home")}></span>
    </div>
  );
};

export default CategoriesBar;
