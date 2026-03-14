import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToBuyPage = () => {
    navigate(`/buypage/${product.id}`);
  };

  function formatPriceINR(price) {
    return price.toLocaleString("en-IN");
  }

  return (
    <div className="product-card" onClick={goToBuyPage}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>₹{formatPriceINR(product.price)}</p>
    </div>
  );
};

export default ProductCard;
