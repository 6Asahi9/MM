import React from "react";
import { useNavigate } from "react-router-dom";
import ProductGrid from "./mainpage/ProductGrid";
import "./buypage.css";
import Footer from "../Home/Footer";

const BuyPage = () => {
  const navigate = useNavigate();

  const product = {
    id: 1,
    title: "Titanic (Real One)",
    price: 2999,
    rating: 4.3,
    description: "The most legendary ocean liner ever built.",
    images: [
      "https://via.placeholder.com/400",
      "https://via.placeholder.com/100",
      "https://via.placeholder.com/100",
    ],
    comments: [
      { id: 1, user: "Ravi", text: "Amazing quality!" },
      { id: 2, user: "Ananya", text: "Worth the price." },
    ],
  };

  const products = Array.from({ length: 480 }, (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: (index + 1) * 100,
    image: "https://via.placeholder.com/150",
  }));

  const recommendedProducts = products.slice(0, 4);

  const exploreMoreProducts = products.slice(6, 22);

  return (
    <div className="buy-container">
      <div className="buy-top">
        <div className="image-section">
          <img
            src={product.images[0]}
            alt="Main Product"
            className="main-image"
          />

          <div className="thumbnail-row">
            {product.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="thumbnail"
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
            <button className="buy-now">Buy Now</button>
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
      </div>
      <Footer />
    </div>
  );
};

export default BuyPage;
