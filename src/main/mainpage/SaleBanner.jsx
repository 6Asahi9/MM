import React from "react";
import ProductCard from "./ProductCard";
import "./SaleBanner.css";

const SaleBanner = () => {
  const saleProducts = [
    {
      id: 1001,
      title: "Coral Reef Kit",
      price: 2999,
      image: "https://picsum.photos/id/1015/800/800",
    },
    {
      id: 1002,
      title: "Ocean Pearl Set",
      price: 1999,
      image: "https://picsum.photos/id/1015/800/800",
    },
    {
      id: 1003,
      title: "Deep Sea Lamp",
      price: 3999,
      image: "https://picsum.photos/id/1015/800/800",
    },
    {
      id: 1004,
      title: "Miya Special Tank",
      price: 4999,
      image: "https://picsum.photos/id/1015/800/800",
    },
  ];

  return (
    <div className="sale-banner">
      <div className="sale-header">
        <h2 id="big-name">Make Waves This Season 🌊</h2>
        <p id="smaller-name">
          Up to 50% off curated marine essentials — Limited Time Only
        </p>
      </div>

      <div className="sale-products">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SaleBanner;
