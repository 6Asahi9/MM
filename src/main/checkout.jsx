import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./checkout.css";
import Footer from "../Home/Footer";
import { setOrderStatus } from "../api/cartApi";
import { addToCart } from "../api/orderApi";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const discount = 15000;
  const tax = 0.18 * (product.price - discount);
  const total = product.price - discount + tax;

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [upi, setUpi] = useState("");

  const [bank, setBank] = useState("");

  function formatPriceINR(price) {
    return price.toLocaleString("en-IN");
  }

  async function handlePayment() {
    try {
      if (paymentMethod === "card") {
        if (!cardNumber || !cardHolder || !expiry || !cvv) {
          alert("Please fill all card details");
          return;
        }
      }

      if (paymentMethod === "upi") {
        if (!upi) {
          alert("Please enter UPI ID");
          return;
        }
      }

      if (paymentMethod === "netbanking") {
        if (!bank) {
          alert("Please select bank");
          return;
        }
      }

      try {
        await addToCart(product._id);
      } catch (err) {
        console.log("Already exists or add skipped");
      }

      await setOrderStatus(product._id, "arrived");

      alert("Payment Successful");

      navigate("/main");
    } catch (err) {
      console.error(err);
      alert(err.message || "Payment failed");
    }
  }

  if (!product) return <p>No product selected</p>;

  return (
    <div className="checkout-whole">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="summary-card">
          <img src={product.images[0]} alt="product" className="thumb" />

          <div className="summary-info">
            <h2>{product.title}</h2>
            <p>Price: ₹{formatPriceINR(product.price)}</p>
            <p>Discount: -₹{formatPriceINR(discount)}</p>
            <p>Tax (18% GST): ₹{formatPriceINR(tax)}</p>

            <h2 className="total">Total: ₹{formatPriceINR(total)}</h2>
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
            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            <input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="banking-form">
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="banking-form">
            <select value={bank} onChange={(e) => setBank(e.target.value)}>
              <option value="">Select Bank</option>
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

          <button className="confirm" onClick={handlePayment}>
            Confirm Payment
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
