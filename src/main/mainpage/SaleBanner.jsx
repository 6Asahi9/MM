import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./SaleBanner.css";
import { getSales } from "../../api/salesApi";

const SaleBanner = () => {
  const [saleProducts, setSaleProducts] = useState(() => {
    const cached = localStorage.getItem("saleProducts");
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(saleProducts.length === 0);

  useEffect(() => {
    async function fetchSales() {
      try {
        const salesData = await getSales();
        if (!Array.isArray(salesData)) return;

        const mappedSales = salesData.map((sale) => ({
          id: sale._id,
          title: sale.title,
          price: sale.price,
          image: sale.images?.[0] || "",
        }));

        setSaleProducts(mappedSales);
        localStorage.setItem("saleProducts", JSON.stringify(mappedSales));
      } catch (err) {
        console.error("Failed to fetch sales:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSales();
  }, []);

  if (loading && saleProducts.length === 0) {
    return (
      <div className="sale-banner">
        <div className="sale-header">
          <h2 id="big-name">Loading Sales… 🌊</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="sale-banner">
      <div className="sale-header">
        <h2 id="big-name">Make Waves This Season 🌊</h2>
        <p id="smaller-name">Our Best Selling!</p>
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
