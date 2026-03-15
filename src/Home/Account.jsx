import React, { useState, useEffect } from "react";
import "./account.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import Footer from "../Home/Footer";
import { getUser, updateUser } from "../api/userService";

export default function Account() {
  const nav = useNavigate();
  const [tab, setTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState("");

  const [userInfo, setUserInfo] = useState(() => {
    const cached = localStorage.getItem("userInfo");
    return cached
      ? JSON.parse(cached)
      : {
          name: "Guest",
          email: "",
          phone: "",
          bank: "",
          upi: "",
          dob: "",
          address: "",
        };
  });

  const isGuest = userInfo.name === "Guest";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getUser();
        const freshUser = {
          name: data.user.username || "Guest",
          email: data.user.email || "",
          phone: data.user.phone || "",
          bank: data.user.bank || "",
          upi: data.user.upi || "",
          dob: data.user.dob || "",
          address: data.user.address || "",
        };
        setUserInfo(freshUser);
        localStorage.setItem("userInfo", JSON.stringify(freshUser));
      } catch (err) {
        console.log("No valid session");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") cancelChange();
    };

    if (editField) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
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

      const updated = {
        ...userInfo,
        [editField]: newValue,
      };
      setUserInfo(updated);
      localStorage.setItem("userInfo", JSON.stringify(updated));

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
              onClick={() => tryEdit("name")}
            >
              <strong>User Name:</strong>{" "}
              {loading ? "Loading..." : userInfo.name}
            </p>

            <p className="disabled-field">
              <strong>Email:</strong> {loading ? "Loading..." : userInfo.email}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("phone")}
            >
              <strong>Phone:</strong> {loading ? "Loading..." : userInfo.phone}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("address")}
            >
              <strong>Address:</strong>{" "}
              {loading ? "Loading..." : userInfo.address}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("dob")}
            >
              <strong>DOB:</strong> {loading ? "Loading..." : userInfo.dob}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("bank")}
            >
              <strong>Bank:</strong> {loading ? "Loading..." : userInfo.bank}
            </p>

            <p
              className={`editable-field ${isGuest ? "disabled-field" : ""}`}
              onClick={() => tryEdit("upi")}
            >
              <strong>UPI number:</strong>{" "}
              {loading ? "Loading..." : userInfo.upi}
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
