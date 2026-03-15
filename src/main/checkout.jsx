import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./checkout.css";
import Footer from "../Home/Footer";
import { setOrderStatus } from "../api/cartApi";
import { addToCart } from "../api/orderApi";
import loadingGif from "../assets/Gif/loading.gif";
import failedGif from "../assets/Gif/failed.gif";
import paymentGif from "../assets/Gif/payment.gif";
import GifModal from "../Tools/GifModal";

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
  const [isProcessing, setIsProcessing] = useState(false);

  const [gifModal, setGifModal] = useState({
    show: false,
    gifSrc: "",
    message: "",
  });

  const formatPriceINR = (price) => price.toLocaleString("en-IN");

  const showFailed = (msg) => {
    setGifModal({ show: true, gifSrc: failedGif, message: msg });
    setTimeout(
      () => setGifModal({ show: false, gifSrc: "", message: "" }),
      2000,
    );
  };

  const handlePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Field validations
      if (
        paymentMethod === "card" &&
        (!cardNumber || !cardHolder || !expiry || !cvv)
      ) {
        showFailed("Please fill all card details");
        setIsProcessing(false);
        return;
      }
      if (paymentMethod === "upi" && !upi) {
        showFailed("Please enter UPI ID");
        setIsProcessing(false);
        return;
      }
      if (paymentMethod === "netbanking" && !bank) {
        showFailed("Please select a bank");
        setIsProcessing(false);
        return;
      }

      // Show loading GIF while processing
      setGifModal({
        show: true,
        gifSrc: loadingGif,
        message: "Processing Payment...",
      });

      try {
        await addToCart(product._id);
      } catch {
        console.log("Product already in cart or add skipped");
      }

      await setOrderStatus(product._id, "arrived");

      // Show success payment GIF
      setGifModal({
        show: true,
        gifSrc: paymentGif,
        message: "Payment Successful!",
      });
      setTimeout(() => {
        setGifModal({ show: false, gifSrc: "", message: "" });
        navigate("/main");
      }, 2000);
    } catch (err) {
      showFailed(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

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
          <button
            className="confirm"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>

      <GifModal
        show={gifModal.show}
        gifSrc={gifModal.gifSrc}
        message={gifModal.message}
        onClose={() => setGifModal({ show: false, gifSrc: "", message: "" })}
      />

      <Footer />
    </div>
  );
};

export default CheckoutPage;
