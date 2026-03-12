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

  const [editField, setEditField] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const confirmPasswordChange = async () => {
    try {
      await changePassword(currentPassword, newPassword);
      alert("Password changed successfully!");
      setEditField(null);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      alert(err.message || "Password change failed.");
    }
  };

  const cancelChange = () => {
    setEditField(null);
    setCurrentPassword("");
    setNewPassword("");
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
            <div
              className="security-item"
              onClick={() => {
                if (localStorage.getItem("token")) {
                  setEditField("password");
                } else {
                  alert("You must be logged in to change this setting.");
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="item-left">
                <span>Change Password</span>
                <span className="material-icons">🖋️</span>
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
                    onChange={() => {
                      if (localStorage.getItem("token")) {
                        setTwoFactor(!twoFactor);
                      } else {
                        alert("You must be logged in to change this setting.");
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>
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
                    if (localStorage.getItem("token")) {
                      localStorage.removeItem("token");
                      alert("Logged out!");
                      nav("/login");
                    } else {
                      alert("You are not logged in.");
                    }
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
                    if (localStorage.getItem("token")) {
                      setShowDeleteModal(true);
                    } else {
                      alert("You must be logged in to change this setting.");
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
      {localStorage.getItem("token") && editField === "password" && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Change Password</h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <div className="edit-buttons">
              <button onClick={confirmPasswordChange}>Confirm</button>
              <button onClick={cancelChange}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {localStorage.getItem("token") && showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-box">
            <h2 style={{ color: "red" }}>⚠️ WARNING! ⚠️</h2>
            <p>
              You are about to <strong>permanently delete your account</strong>.
              This action <strong>cannot be undone</strong>.
            </p>
            <p style={{ fontWeight: "bold", color: "darkred" }}>
              All your data, purchases, and progress will vanish forever.
            </p>

            <label style={{ display: "block", margin: "20px 0" }}>
              <input
                type="checkbox"
                checked={confirmDelete}
                onChange={() => setConfirmDelete(!confirmDelete)}
              />{" "}
              I understand the consequences
            </label>

            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                disabled={!confirmDelete}
                style={{
                  backgroundColor: confirmDelete ? "red" : "grey",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: confirmDelete ? "pointer" : "not-allowed",
                }}
                onClick={async () => {
                  try {
                    const res = await deleteAccount();
                    alert(res.message || "Account deleted!");
                    localStorage.removeItem("token");
                    nav("/login");
                  } catch (err) {
                    alert(err.message || "Failed to delete account.");
                  }
                }}
              >
                DELETE FOREVER
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmDelete(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
