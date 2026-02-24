import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.css";
import Footer from "../Home/Footer";
const CheckoutPage = () => {
  const navigate = useNavigate();

  const product = {
    title: "Titanic (Real One)",
    price: 2999,
    image: "https://picsum.photos/id/1015/300/300",
  };

  const discount = 500;
  const tax = 0.18 * (product.price - discount);
  const total = product.price - discount + tax;

  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="checkout-whole">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="summary-card">
          <img src={product.image} alt="product" className="thumb" />

          <div className="summary-info">
            <h2>{product.title}</h2>
            <p>Price: ₹{product.price}</p>
            <p>Discount: -₹{discount}</p>
            <p>Tax (18% GST): ₹{tax.toFixed(2)}</p>

            <h2 className="total">Total: ₹{total.toFixed(2)}</h2>
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              value="netbanking"
              checked={paymentMethod === "netbanking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Net Banking
          </label>
        </div>

        {paymentMethod === "card" && (
          <div className="banking-form">
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Card Holder Name" />
            <input type="text" placeholder="Expiry Date (MM/YY)" />
            <input type="text" placeholder="CVV" />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="banking-form">
            <input type="text" placeholder="Enter UPI ID (example@upi)" />
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="banking-form">
            <select>
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
            </select>
          </div>
        )}

        <div className="checkout-buttons">
          <button className="cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>

          <button
            className="confirm"
            onClick={() => alert("Payment Successful (Dummy) 🎉")}
          >
            Confirm Payment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
