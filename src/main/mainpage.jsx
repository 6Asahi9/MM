import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SaleBanner from "./mainpage/SaleBanner";
import CategoriesBar from "./mainpage/CategoriesBar";
import ProductGrid from "./mainpage/ProductGrid";
import Pagination from "./mainpage/Pagination";
import "./mainpage.css";
import logo from "../assets/Images/logo-modified.png";
import Footer from "../Home/Footer";
import { FaUserCircle, FaShoppingCart, FaUpload } from "react-icons/fa";
import { getProducts } from "../api/productApi";

const MainPage = () => {
  const navigate = useNavigate();
  const isSaleActive = true;

  const [products, setProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err.message);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    setShuffledProducts(shuffleArray(products));
  }, [products]);

  function shuffleArray(array) {
    return array
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);
  }

  const filteredProducts = shuffledProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const visibleProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="main-container">
      <div className="header-background">
        <div className="top-bar">
          <div className="brand-container" onClick={() => navigate("/home")}>
            <img src={logo} alt="Logo" className="logo-img" />
            <span id="brand-name">Miya Marines</span>
          </div>

          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="icons">
            <button onClick={() => navigate("/account")}>
              <FaUserCircle size={35} />
            </button>
            <button onClick={() => navigate("/cart")}>
              <FaShoppingCart size={30} />
            </button>
            <button onClick={() => navigate("/publish")}>
              <FaUpload size={30} />
            </button>
          </div>
        </div>

        {isSaleActive && <SaleBanner />}
        <CategoriesBar />
      </div>

      <ProductGrid
        products={visibleProducts.map((p) => ({
          id: p._id,
          title: p.title,
          price: p.price,
          image: p.images[0],
        }))}
      />

      <Pagination
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Footer />
    </div>
  );
};

export default MainPage;
