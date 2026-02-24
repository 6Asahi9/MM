import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "./mainpage/ProductGrid";
import Pagination from "./mainpage/Pagination";
import Footer from "../Home/Footer";
import "./buypage.css";

const BuyPage = () => {
  const navigate = useNavigate();

  const product = {
    id: 1,
    title: "Titanic (Real One)",
    price: 2999,
    rating: 4.3,
    description: "The most legendary ocean liner ever built.",
    images: [
      "https://picsum.photos/id/1015/800/800",
      "https://picsum.photos/id/1016/800/800",
      "https://picsum.photos/id/1018/800/800",
      "https://picsum.photos/id/1020/800/800",
    ],
    comments: [
      { id: 1, user: "Ravi", text: "Amazing quality!" },
      { id: 2, user: "Ananya", text: "Worth the price." },
    ],
  };

  const allProducts = Array.from({ length: 480 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: (index + 1) * 100,
    image: "https://via.placeholder.com/150",
  }));

  const products = allProducts.filter((p) => p.id !== product.id);

  const recommendedProducts = products.slice(0, 4);

  const [explorePage, setExplorePage] = useState(1);
  const explorePerPage = 16;

  const exploreStartIndex = (explorePage - 1) * explorePerPage;
  const exploreEndIndex = exploreStartIndex + explorePerPage;

  const exploreMoreProducts = products.slice(
    exploreStartIndex,
    exploreEndIndex,
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };
  return (
    <div className="Buy-whole">
      <div className="checkout-header">
        <button className="backbutton" onClick={() => navigate("/main")}>
          Back
        </button>

        <input type="text" placeholder="Search..." className="search-bar" />

        <div className="icons">
          <button onClick={() => navigate("/account")}>Account</button>
          <button onClick={() => navigate("/account/mycart")}>My Cart</button>
        </div>
      </div>
      <div className="buy-container">
        <div className="buy-top">
          <div className="image-section">
            <div className="main-image-wrapper">
              <button className="arrow left" onClick={prevImage}>
                ❮
              </button>

              <img
                src={product.images[currentImageIndex]}
                alt="Main Product"
                className="main-image"
              />

              <button className="arrow right" onClick={nextImage}>
                ❯
              </button>
            </div>

            <div className="thumbnail-row">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  className={`thumbnail ${
                    index === currentImageIndex ? "active-thumb" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="info-section">
            <h1>{product.title}</h1>
            <div className="rating">⭐ {product.rating} / 5</div>
            <div className="price">₹{product.price}</div>
            <p className="description">{product.description}</p>

            <div className="buttons">
              <button className="add-cart">Add to Cart</button>
              <button className="buy-now" onClick={() => navigate("/checkout")}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="recommendation-section">
          <h2>Recommended For You</h2>
          <ProductGrid products={recommendedProducts} />
        </div>

        <div className="comments-section">
          <h2>Customer Reviews</h2>
          {product.comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <strong>{comment.user}</strong>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        <div className="explore-more-section">
          <h2>Explore More</h2>

          <ProductGrid products={exploreMoreProducts} />

          <Pagination
            totalProducts={products.length}
            productsPerPage={explorePerPage}
            currentPage={explorePage}
            setCurrentPage={setExplorePage}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default BuyPage;
