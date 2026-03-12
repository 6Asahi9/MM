import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToBuyPage = () => {
    navigate(`/buypage/${product.id}`);
  };

  return (
    <div className="product-card" onClick={goToBuyPage}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
