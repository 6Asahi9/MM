import React, { useState } from "react";
import "./account.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";

export default function Account() {
  const [tab, setTab] = useState("profile");
  const nav = useNavigate();

  const userInfo = {
    name: "xxxxx",
    email: "xxxxx@example.com",
    phone: "+xx xxxxx xxxxx",
    bank: "HDFC Bank",
  };

  return (
    <div className="account-whole">
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

      <div className="account-container">
        <h2 id="My-account">⚙️ My Account</h2>

        <div className="account-tabs">
          <button
            className={tab === "profile" ? "active-tab" : ""}
            onClick={() => setTab("profile")}
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
            onClick={() => nav("/cart")}
          >
            My Cart
          </button>
          <button
            className={tab === "publish" ? "active-tab" : ""}
            onClick={() => nav("/publish")}
          >
            Publish
          </button>
        </div>

        {tab === "profile" && (
          <div className="profile-tab">
            <p>
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p>
              <strong>Email:</strong> {userInfo.email}
            </p>
            <p>
              <strong>Phone:</strong> {userInfo.phone}
            </p>
            <p>
              <strong>Bank:</strong> {userInfo.bank}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
