import React, { useEffect, useState } from "react";
import "./cart.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";
import { getOrdersWithProducts } from "../api/cartApi";

export default function Cart() {
  const [tab, setTab] = useState("cart");
  const [pendingProducts, setPendingProducts] = useState([]);
  const [completedProducts, setCompletedProducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersWithProducts = await getOrdersWithProducts();
        setPendingProducts(
          ordersWithProducts
            .filter((o) => o.status === "pending")
            .map((o) => o.product),
        );
        setCompletedProducts(
          ordersWithProducts
            .filter((o) => o.status === "arrived")
            .map((o) => o.product),
        );
      } catch (err) {
        console.error(err.message);
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
            Completed Orders
          </button>
        </div>

        {tab === "cart" && (
          <div className="cart-products">
            {pendingProducts.length === 0 ? (
              <p>Your cart is empty 🛒</p>
            ) : (
              pendingProducts.map((p) => (
                <div key={p._id} className="cart-card">
                  <img src={p.images[0]} alt={p.title} className="thumb" />
                  <div className="cart-info">
                    <p className="cart-name">{p.title}</p>
                    <p className="cart-price">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
            {pendingProducts.length > 0 && (
              <div className="cart-total">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
            )}
          </div>
        )}

        {tab === "past" && (
          <div className="past-orders">
            {completedProducts.length === 0 ? (
              <p>No completed orders yet.</p>
            ) : (
              completedProducts.map((p) => (
                <div key={p._id} className="cart-card past-card">
                  <img src={p.images[0]} alt={p.title} className="thumb" />
                  <div className="cart-info">
                    <p className="cart-name">{p.title}</p>
                    <p className="cart-price">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
