import React, { useState, useEffect } from "react";
import "./account.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";
import { getUser, updateUser } from "../api/userService";

export default function Account() {
  const nav = useNavigate();
  const [tab, setTab] = useState("profile");

  const [userInfo, setUserInfo] = useState({
    name: "Guest",
    email: "",
    phone: "",
    bank: "",
    upi: "",
    dob: "",
    address: "",
  });

  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState("");

  const isGuest = userInfo.name === "Guest";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUserInfo({
          name: data.user.username || "Guest",
          email: data.user.email || "",
          phone: data.user.phone || "",
          bank: data.user.bank || "",
          upi: data.user.upi || "",
          dob: data.user.dob || "",
          address: data.user.address || "",
        });
      } catch (err) {
        console.log("No valid session");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        cancelChange();
      }
    };

    if (editField) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [editField]);

  const getInputType = () => {
    if (editField === "phone") return "tel";
    if (editField === "dob") return "date";
    return "text";
  };

  const tryEdit = (field) => {
    if (isGuest) return;
    setEditField(field);
  };

  const confirmChange = async () => {
    try {
      await updateUser(editField, newValue);

      setUserInfo({
        ...userInfo,
        [editField]: newValue,
      });

      setEditField(null);
      setNewValue("");
    } catch (err) {
      console.error("Update failed");
    }
  };

  const cancelChange = () => {
    setEditField(null);
    setNewValue("");
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

          <button onClick={() => nav("/security")}>Security</button>
          <button onClick={() => nav("/cart")}>My Cart</button>
          <button onClick={() => nav("/publish")}>Publish</button>
        </div>

        {tab === "profile" && (
          <div className="profile-tab">
            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("username")}
            >
              <strong>User Name:</strong> {userInfo.name}
            </p>

            <p className="disabled-field">
              <strong>Email:</strong> {userInfo.email}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("phone")}
            >
              <strong>Phone:</strong> {userInfo.phone}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("address")}
            >
              <strong>Address:</strong> {userInfo.address}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("dob")}
            >
              <strong>DOB:</strong> {userInfo.dob}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("bank")}
            >
              <strong>Bank:</strong> {userInfo.bank}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("upi")}
            >
              <strong>UPI number:</strong> {userInfo.upi}
            </p>
          </div>
        )}
      </div>

      {editField && !isGuest && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Change {editField}</h3>

            <input
              type={getInputType()}
              placeholder="Enter new value"
              value={newValue}
              onChange={(e) => {
                if (editField === "phone") {
                  const onlyNums = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setNewValue(onlyNums);
                } else {
                  setNewValue(e.target.value);
                }
              }}
            />

            <div className="edit-buttons">
              <button onClick={confirmChange}>Confirm</button>
              <button onClick={cancelChange}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
