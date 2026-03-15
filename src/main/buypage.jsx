import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGrid from "./mainpage/ProductGrid";
import Pagination from "./mainpage/Pagination";
import Footer from "../Home/Footer";
import "./buypage.css";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/Images/logo-modified.png";
import { getProductById, getProducts } from "../api/productApi";
import { addToCart } from "../api/orderApi";
import { getSaleById } from "../api/salesApi";
import {
  fetchCommentsByProduct,
  postComment,
  postReply,
} from "../api/commentApi";
import { findUserById } from "../api/userService";
import loadingGif from "../assets/Gif/loading.gif";
import failedGif from "../assets/Gif/failed.gif";
import cartGif from "../assets/Gif/cart.gif";
import GifModal from "../Tools/GifModal";

const userCache = {};
async function getUsername(userId) {
  if (!userId) return "Unknown";
  if (userCache[userId]) return userCache[userId];
  try {
    const data = await findUserById(userId);
    const username = data?.user?.username || "Unknown";
    userCache[userId] = username;
    return username;
  } catch {
    return "Unknown";
  }
}

const BuyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [explorePage, setExplorePage] = useState(1);
  const explorePerPage = 16;

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [replyText, setReplyText] = useState({});

  const [gifModal, setGifModal] = useState({
    show: false,
    gifSrc: "",
    message: "",
  });

  const formatPriceINR = (price) => price.toLocaleString("en-IN");
  const shuffleArray = (array) =>
    array
      .map((a) => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map((a) => a[1]);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        let data = null;
        let source = "product";
        try {
          data = await getProductById(id);
        } catch {
          data = await getSaleById(id);
          source = "sale";
        }
        setProduct({ ...data, source });
      } catch (err) {
        console.error(err.message);
        setProduct(null);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => window.scrollTo(0, 0), [id]);

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

  useEffect(() => {
    async function loadComments() {
      if (!product) return;
      try {
        const data = await fetchCommentsByProduct(product._id);
        const enriched = await Promise.all(
          data.map(async (c) => {
            c.username = await getUsername(c.user_id);
            if (c.replies?.length > 0) {
              c.replies = await Promise.all(
                c.replies.map(async (r) => ({
                  ...r,
                  username: await getUsername(r.user_id),
                })),
              );
            }
            return c;
          }),
        );
        setComments(enriched);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    }
    loadComments();
  }, [product]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      const added = await postComment({
        product_id: product._id,
        content: newComment,
        rating: newRating,
      });
      if (added) {
        added.username = await getUsername(added.user_id);
        setComments((prev) => [...prev, added]);
        setNewComment("");
        setNewRating(5);
      }
    } catch (err) {
      setGifModal({
        show: true,
        gifSrc: failedGif,
        message: "Failed to post comment.",
      });
      setTimeout(
        () => setGifModal({ show: false, gifSrc: "", message: "" }),
        1500,
      );
    }
  };

  const handlePostReply = async (commentId) => {
    const text = replyText[commentId];
    if (!text?.trim()) return;

    try {
      const added = await postReply(commentId, { content: text });
      const lastReply = added.replies[added.replies.length - 1];
      lastReply.username = await getUsername(lastReply.user_id);
      setComments((prev) => prev.map((c) => (c._id === commentId ? added : c)));
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    } catch (err) {
      setGifModal({
        show: true,
        gifSrc: failedGif,
        message: "Failed to post reply.",
      });
      setTimeout(
        () => setGifModal({ show: false, gifSrc: "", message: "" }),
        2000,
      );
    }
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      setGifModal({
        show: true,
        gifSrc: failedGif,
        message: "You must be logged in to use cart.",
      });
      setTimeout(
        () => setGifModal({ show: false, gifSrc: "", message: "" }),
        2000,
      );
      return;
    }
    try {
      setGifModal({
        show: true,
        gifSrc: cartGif,
        message: "Adding to cart...",
      });
      await addToCart(product._id, product.source);
      setTimeout(() => {
        setGifModal({ show: false, gifSrc: "", message: "" });
        navigate("/cart");
      }, 1500);
    } catch (err) {
      setGifModal({
        show: true,
        gifSrc: failedGif,
        message: err.message || "Failed to add to cart.",
      });
      setTimeout(
        () => setGifModal({ show: false, gifSrc: "", message: "" }),
        2000,
      );
    }
  };

  const handleBuyNow = () => {
    if (!localStorage.getItem("token")) {
      setGifModal({
        show: true,
        gifSrc: failedGif,
        message: "You must be logged in to buy a product.",
      });
      setTimeout(
        () => setGifModal({ show: false, gifSrc: "", message: "" }),
        2000,
      );
      return;
    }
    navigate("/checkout", { state: { product } });
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const otherProducts = products.filter((p) => p._id !== product._id);
  const filteredProducts = otherProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const shuffledFiltered = shuffleArray(filteredProducts);
  const recommendedProducts = shuffledFiltered.slice(0, 4).map((p) => ({
    id: p._id,
    title: p.title,
    price: p.price,
    image: p.images[0],
  }));
  const startIndex = (explorePage - 1) * explorePerPage;
  const endIndex = startIndex + explorePerPage;
  const exploreMoreProducts = shuffledFiltered
    .slice(startIndex, endIndex)
    .map((p) => ({
      id: p._id,
      title: p.title,
      price: p.price,
      image: p.images[0],
    }));

  const nextImage = () =>
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );

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

        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setExplorePage(1);
          }}
        />

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
                  className={`thumbnail ${index === currentImageIndex ? "active-thumb" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="info-section">
            <h1>{product.title}</h1>
            <div className="price">₹{formatPriceINR(product.price)}</div>
            <p className="description">{product.description}</p>

            <div className="buttons">
              <button className="add-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="comments-section">
          <h2>Comments</h2>
          {localStorage.getItem("token") && (
            <div className="new-comment">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
              />
              <div>
                <label>
                  Rating:
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} ⭐
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={handlePostComment}>Post Comment</button>
              </div>
            </div>
          )}
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="comment-list">
              {comments.map((c) => (
                <li key={c._id} className="comment-item">
                  <strong>{c.username}</strong> <span> - {c.rating} ⭐</span>
                  <p>{c.content}</p>
                  <small>{new Date(c.created_at).toLocaleString()}</small>
                  {c.replies?.length > 0 && (
                    <ul className="replies-list">
                      {c.replies.map((r, i) => (
                        <li key={i}>
                          <strong>{r.username}</strong>
                          <p>{r.content}</p>
                          <small>
                            {new Date(r.created_at).toLocaleString()}
                          </small>
                        </li>
                      ))}
                    </ul>
                  )}
                  {localStorage.getItem("token") && (
                    <div className="reply-form">
                      <textarea
                        placeholder="Reply..."
                        value={replyText[c._id] || ""}
                        onChange={(e) =>
                          setReplyText((prev) => ({
                            ...prev,
                            [c._id]: e.target.value,
                          }))
                        }
                      />
                      <button onClick={() => handlePostReply(c._id)}>
                        Reply
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="recommendation-section">
          <h2 id="recommend-name">Recommended For You</h2>
          <ProductGrid products={recommendedProducts} />
        </div>

        <div className="explore-more-section">
          <h2 id="explore-name">Explore More</h2>
          <ProductGrid products={exploreMoreProducts} />
          <Pagination
            totalProducts={filteredProducts.length}
            productsPerPage={explorePerPage}
            currentPage={explorePage}
            setCurrentPage={setExplorePage}
          />
        </div>
      </div>

      <GifModal
        show={gifModal.show}
        gifSrc={gifModal.gifSrc}
        message={gifModal.message}
        onClose={() => setGifModal({ show: false, gifSrc: "", message: "" })}
      />

      <Footer />
    </div>
  );
};

export default BuyPage;
