import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGrid from "./mainpage/ProductGrid";
import Pagination from "./mainpage/Pagination";
import Footer from "../Home/Footer";
import "./buypage.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/Images/logo-modified.png";
import { getProductById, getProducts } from "../api/productApi";

const BuyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [explorePage, setExplorePage] = useState(1);
  const explorePerPage = 16;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err.message);
      }
    }

    fetchProduct();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    }

    fetchProducts();
  }, []);

  if (!product) return <div>Loading...</div>;

  const otherProducts = products.filter((p) => p._id !== product._id);

  const recommendedProducts = otherProducts.slice(0, 4).map((p) => ({
    id: p._id,
    title: p.title,
    price: p.price,
    image: p.images[0],
  }));

  const startIndex = (explorePage - 1) * explorePerPage;
  const endIndex = startIndex + explorePerPage;

  const exploreMoreProducts = otherProducts
    .slice(startIndex, endIndex)
    .map((p) => ({
      id: p._id,
      title: p.title,
      price: p.price,
      image: p.images[0],
    }));

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
        <div className="brand-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-img"
            onClick={() => navigate("/main")}
          />
          <span className="brand-name" onClick={() => navigate("/main")}>
            Miya Marines
          </span>
        </div>

        <input type="text" placeholder="Search..." className="search-bar" />

        <div className="icons">
          <button onClick={() => navigate("/account")}>
            <FaUserCircle size={35} />
          </button>
          <button onClick={() => navigate("/cart")}>
            <FaShoppingCart size={30} />
          </button>
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
                alt={product.title}
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
            <div className="price">₹{product.price}</div>
            <p className="description">{product.description}</p>

            <div className="buttons">
              <button
                className="add-cart"
                onClick={async () => {
                  if (!localStorage.getItem("token")) {
                    alert("You must be logged in to use cart");
                    return;
                  }

                  try {
                    const response = await fetch(
                      "https://mm-backend-render.onrender.com/api/orders/add-to-cart",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({
                          productId: product._id,
                          quantity: 1,
                        }),
                      },
                    );

                    const data = await response.json();

                    if (response.ok) {
                      navigate("/cart");
                    } else {
                      alert(data.error || "Failed to add to cart");
                    }
                  } catch (err) {
                    console.error(err);
                    alert("Something went wrong");
                  }
                }}
              >
                Add to Cart
              </button>

              <button
                className="buy-now"
                onClick={() => {
                  if (localStorage.getItem("token")) navigate("/checkout");
                  else alert("You must be Logged in to buy a product");
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="recommendation-section">
          <h2 id="recommend-name">Recommended For You</h2>
          <ProductGrid products={recommendedProducts} />
        </div>

        <div className="explore-more-section">
          <h2 id="explore-name">Explore More</h2>

          <ProductGrid products={exploreMoreProducts} />

          <Pagination
            totalProducts={otherProducts.length}
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
