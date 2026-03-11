import React, { useState } from "react";
import "../Home/Account.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import "./Security.css";
import Footer from "../Home/Footer";
import { deleteAccount, changePassword } from "../api/userService";

export default function Account() {
  const [tab, setTab] = useState("security");
  const nav = useNavigate();
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);

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
        <h2 id="My-account">🔐 Security</h2>

        <div className="account-tabs">
          <button
            className={tab === "profile" ? "active-tab" : ""}
            onClick={() => nav("/account")}
          >
            Profile
          </button>
          <button
            className={tab === "security" ? "active-tab" : ""}
            onClick={() => setTab("security")}
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

        {tab === "security" && (
          <div className="security-tab">
            <div className="security-item">
              <div className="item-left">
                <span>Change Password</span>
                <span className="material-icons">🖋️</span>{" "}
              </div>
              <div className="item-right">
                <span className="password-mask">********</span>
              </div>
            </div>

            <div className="security-item">
              <div className="item-left">
                <span>Enable Two-Factor Authentication</span>
              </div>
              <div className="item-right">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={() => setTwoFactor(!twoFactor)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="security-item">
              <div className="item-left">
                <span>Login Alerts</span>
              </div>
              <div className="item-right">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={loginAlerts}
                    onChange={() => setLoginAlerts(!loginAlerts)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="security-item">
              <div className="item-left">
                <span>App Passwords</span>
              </div>
              <div className="item-right">
                <button className="edit-btn">Manage</button>
              </div>
            </div>

            <div className="security-item">
              <div className="item-left">
                <span>Trusted Devices</span>
              </div>
              <div className="item-right">
                <button className="edit-btn">View</button>
              </div>
            </div>
            <div className="security-item action-item">
              <div className="item-left">
                <span>Log Out</span>
              </div>
              <div className="item-right">
                <button
                  className="action-btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    alert("Logged out!");
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>

            <div className="security-item action-item">
              <div className="item-left">
                <span>Delete Account</span>
              </div>
              <div className="item-right">
                <button
                  className="action-btn delete-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete your account? This cannot be undone!",
                      )
                    ) {
                      alert("Account deleted!");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
