import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaleBanner from "./mainpage/SaleBanner";
import CategoriesBar from "./mainpage/CategoriesBar";
import ProductGrid from "./mainpage/ProductGrid";
import Pagination from "./mainpage/Pagination";
import "./mainpage.css";
import logo from "../assets/Images/logo-modified.png";
import Footer from "../Home/Footer";
import { FaUserCircle, FaShoppingCart, FaUpload } from "react-icons/fa";

const MainPage = () => {
  const navigate = useNavigate();

  const isSaleActive = true;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const products = Array.from({ length: 480 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: (index + 1) * 100,
    image: "https://picsum.photos/id/1015/800/800",
  }));

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const visibleProducts = products.slice(startIndex, endIndex);

  return (
    <div className="main-container">
      <div className="header-background">
        <div className="top-bar">
          <div className="brand-container" onClick={() => navigate("/home")}>
            <img src={logo} alt="Logo" className="logo-img" />
            <span id="brand-name">Miya Marines</span>
          </div>
          <input type="text" placeholder="Search..." className="search-bar" />
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
        {currentPage === 1 && <CategoriesBar />}
      </div>

      <ProductGrid products={visibleProducts} />

      <Pagination
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </div>
  );
};

export default MainPage;
