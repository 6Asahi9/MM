import React, { useState } from "react";
import "./publish.css";
import logo from "../assets/Images/logo-modified.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import Footer from "../Home/Footer";
import { publishProduct } from "../api/productApi";

export default function Publish() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [imageLinks, setImageLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nav = useNavigate();

  const addImageLink = () => {
    if (!currentLink.trim()) return;
    setImageLinks([...imageLinks, currentLink.trim()]);
    setCurrentLink("");
    setCurrentImageIndex(imageLinks.length);
  };

  const removeImage = (index) => {
    const updated = [...imageLinks];
    updated.splice(index, 1);
    setImageLinks(updated);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageLinks.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageLinks.length - 1 : prev - 1,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      alert("You must be logged in to publish a product");
      return;
    }

    const productData = {
      title: productName,
      description,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((t) => t !== ""),
      price: parseFloat(price),
      images: imageLinks,
    };

    try {
      const savedProduct = await publishProduct(productData);
      console.log("Published product:", savedProduct);
      alert("Product published successfully!");

      setProductName("");
      setDescription("");
      setTags("");
      setPrice("");
      setImageLinks([]);
      setCurrentLink("");
      setCurrentImageIndex(0);

      nav("/main");
    } catch (err) {
      alert("Error publishing product: " + err.message);
    }
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
            <label>Product Images</label>
            <div className="upload-box">
              {imageLinks.length === 0 ? (
                <span>Click below to add image URL</span>
              ) : (
                <div className="big-image-preview">
                  <div className="main-image-wrapper">
                    <button
                      className="arrow left"
                      type="button"
                      onClick={prevImage}
                    >
                      ❮
                    </button>

                    <img
                      src={imageLinks[currentImageIndex]}
                      alt={`Preview ${currentImageIndex}`}
                      className="main-image"
                    />

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeImage(currentImageIndex)}
                    >
                      &times;
                    </button>

                    <button
                      className="arrow right"
                      type="button"
                      onClick={nextImage}
                    >
                      ❯
                    </button>
                  </div>

                  <div className="thumbnail-row">
                    {imageLinks.map((link, index) => (
                      <div key={index} className="thumbnail-container">
                        <img
                          src={link}
                          alt={`Thumbnail ${index}`}
                          className={`thumbnail ${index === currentImageIndex ? "active-thumb" : ""}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                        <span
                          className="remove-thumb"
                          onClick={() => removeImage(index)}
                        >
                          ✖
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="image-link-input" style={{ marginTop: "10px" }}>
              <input
                type="url"
                placeholder="Enter image URL"
                value={currentLink}
                onChange={(e) => setCurrentLink(e.target.value)}
              />
              <button type="button" onClick={addImageLink}>
                Add
              </button>
            </div>
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
            <button
              type="submit"
              className="publish-btn"
              onClick={() => {
                if (localStorage.getItem("token")) {
                } else {
                  alert("You must be logged in to publish a product");
                }
              }}
            >
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
                setImageLinks([]);
                setCurrentLink("");
                setCurrentImageIndex(0);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
