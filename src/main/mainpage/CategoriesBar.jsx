import React from "react";
import "./CategoriesBar.css";
import { useNavigate } from "react-router-dom";

const CategoriesBar = () => {
  const navigator = useNavigate();
  return (
    <div className="categories-bar">
      <span>Fishing Boats</span>
      <span>Cabin Cruisers</span>
      <span>Small Boats</span>
      <span>Cargo ships</span>
      <span>Military Submarines</span>
      <span>Aircraft carriers</span>
      <span>Familty Sailboats</span>
      <span>Luxurious Ships</span>
      <span onClick={() => navigator("/home")}>more..</span>
    </div>
  );
};

export default CategoriesBar;
