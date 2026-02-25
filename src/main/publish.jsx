import React, { useState } from "react";
import "./publish.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaUpload } from "react-icons/fa";

export default function Publish() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const nav = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { productName, description, tags, price, imagePreview };
    console.log("Publishing Product:", productData);
    alert("Product published successfully!");
    setProductName("");
    setDescription("");
    setTags("");
    setPrice("");
    setImagePreview(null);
  };

  return (
    <div className="publish-whole">
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
        <div id="publish-icons">
          <div className="icons">
            <button onClick={() => nav("/account")}>
              <FaUserCircle size={35} />
            </button>
            <button onClick={() => nav("/cart")}>
              <FaShoppingCart size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className="publish-container">
        <h1>Publish Product</h1>
        <form onSubmit={handleSubmit} className="publish-form">
          <div className="form-group">
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <label htmlFor="image-upload" className="upload-box">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <span>Click to upload image</span>
              )}
            </label>
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </div>

          <div className="form-group">
            <label>Tags </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., #sailboat, #submarine , #yachts"
            />
          </div>

          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="publish-btn">
              Publish
            </button>
            <button
              type="button"
              className="publish-btn"
              style={{ background: "#aaa", marginLeft: "10px" }}
              onClick={() => {
                setProductName("");
                setDescription("");
                setTags("");
                setPrice("");
                setImagePreview(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
