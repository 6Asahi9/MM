import React, { useEffect, useState } from "react";
import "./cart.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";
import { getOrdersWithProducts } from "../api/cartApi";

export default function Cart() {
  const [tab, setTab] = useState("cart");
  const [pendingProducts, setPendingProducts] = useState(() => {
    const cached = localStorage.getItem("pendingProducts");
    return cached ? JSON.parse(cached) : [];
  });
  const [completedProducts, setCompletedProducts] = useState(() => {
    const cached = localStorage.getItem("completedProducts");
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(
    pendingProducts.length === 0 && completedProducts.length === 0,
  );

  const nav = useNavigate();

  function formatPriceINR(price) {
    return price.toLocaleString("en-IN");
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersWithProducts = await getOrdersWithProducts();
        const pending = ordersWithProducts
          .filter((o) => o.status === "pending")
          .map((o) => o.product);
        const completed = ordersWithProducts
          .filter((o) => o.status === "arrived")
          .map((o) => o.product);

        setPendingProducts(pending);
        setCompletedProducts(completed);
        localStorage.setItem("pendingProducts", JSON.stringify(pending));
        localStorage.setItem("completedProducts", JSON.stringify(completed));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const totalPrice = pendingProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-whole">
      <div className="brand-container">
        <img
          src={logo}
          alt="Logo"
          className="logo-img"
          onClick={() => nav("/main")}
        />
        <span className="brand-name" onClick={() => nav("/main")}>
          Miya Marines
        </span>
      </div>

      <div className="cart-container">
        <h2 id="My-shop">🛒 My Cart</h2>

        <div className="cart-tabs">
          <button
            className={tab === "profile" ? "active-tab" : ""}
            onClick={() => nav("/account")}
          >
            Profile
          </button>
          <button
            className={tab === "security" ? "active-tab" : ""}
            onClick={() => nav("/security")}
          >
            Security
          </button>
          <button
            className={tab === "cart" ? "active-tab" : ""}
            onClick={() => setTab("cart")}
          >
            Cart
          </button>
          <button
            className={tab === "past" ? "active-tab" : ""}
            onClick={() => setTab("past")}
          >
            Delivered
          </button>
        </div>

        {tab === "cart" && (
          <div className="cart-products">
            {loading && <p>Loading your cart… 🛒</p>}
            {!loading && pendingProducts.length === 0 && (
              <p>Your cart is empty 🛒</p>
            )}
            {!loading &&
              pendingProducts.map((p) => (
                <div
                  key={p._id}
                  className="cart-card"
                  onClick={() => nav(`/buypage/${p._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={p.images[0]} alt={p.title} className="thumb" />
                  <div className="cart-info">
                    <p className="cart-name">{p.title}</p>
                    <p className="cart-price">₹{formatPriceINR(p.price)}</p>
                  </div>
                </div>
              ))}
            {!loading && pendingProducts.length > 0 && (
              <div className="cart-total">
                <strong>Total: ₹{formatPriceINR(totalPrice)}</strong>
              </div>
            )}
          </div>
        )}

        {tab === "past" && (
          <div className="past-orders">
            {loading && <p>Loading past orders…</p>}
            {!loading && completedProducts.length === 0 && (
              <p>No completed orders yet.</p>
            )}
            {!loading &&
              completedProducts.map((p) => (
                <div
                  key={p._id}
                  className="cart-card past-card"
                  onClick={() => nav(`/buypage/${p._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={p.images[0]} alt={p.title} className="thumb" />
                  <div className="cart-info">
                    <p className="cart-name">{p.title}</p>
                    <p className="cart-price">₹{formatPriceINR(p.price)}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
