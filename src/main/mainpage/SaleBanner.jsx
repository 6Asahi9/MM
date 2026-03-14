import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./SaleBanner.css";
import { getSales } from "../../api/salesApi";

const SaleBanner = () => {
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      const salesData = await getSales();

      if (!Array.isArray(salesData)) return;

      const mappedSales = salesData.map((sale) => ({
        id: sale._id,
        title: sale.title,
        price: sale.price,
        image: sale.images?.[0] || "",
      }));

      setSaleProducts(mappedSales);
    }

    fetchSales();
  }, []);

  return (
    <div className="sale-banner">
      <div className="sale-header">
        <h2 id="big-name">Make Waves This Season 🌊</h2>
        <p id="smaller-name">
          Up to 15,000 INR off curated marine essentials — Limited Time Only
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
