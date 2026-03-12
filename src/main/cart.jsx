import React, { useState } from "react";
import "./cart.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";

const demoProducts = [
  {
    id: 1,
    name: "Miya Plushie",
    price: 25.0,
    img: "https://placekitten.com/150/150",
  },
  {
    id: 2,
    name: "Cat Tower",
    price: 120.0,
    img: "https://placekitten.com/160/160",
  },
  {
    id: 3,
    name: "Tuna Treat Pack",
    price: 15.0,
    img: "https://placekitten.com/170/170",
  },
];

const demoPastOrders = [
  { id: 101, name: "Miya Plushie", price: 25.0, date: "2026-02-15" },
  { id: 102, name: "Tuna Treat Pack", price: 15.0, date: "2026-02-20" },
];

export default function Cart() {
  const [tab, setTab] = useState("cart");
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const currentDate = new Date().toLocaleDateString();
  const nav = useNavigate();
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
        <h2 id="My-shop">🛒 My Shop</h2>

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
            Past Orders
          </button>
        </div>

        {tab === "cart" && (
          <>
            <p className="cart-date">Date: {currentDate}</p>

            <div className="cart-products">
              {demoProducts.map((product) => (
                <div key={product.id} className="cart-card">
                  <img src={product.img} alt={product.name} className="thumb" />
                  <div className="cart-info">
                    <p className="cart-name">{product.name}</p>
                    <p className="cart-price">${product.price.toFixed(2)}</p>
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p>Total Items: {cartItems.length}</p>
              <p className="total">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
          </>
        )}

        {tab === "past" && (
          <div className="past-orders">
            {demoPastOrders.map((order) => (
              <div key={order.id} className="cart-card past-card">
                <div className="cart-info">
                  <p className="cart-name">{order.name}</p>
                  <p className="cart-price">${order.price.toFixed(2)}</p>
                  <p className="cart-date">Ordered: {order.date}</p>
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
