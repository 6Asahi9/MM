import { Routes, Route, Navigate } from "react-router-dom";
import Intro from "./Home/Intro";
import Hub from "./Home/Hub";
import Login from "./Login/Login";
import Main from "./main/mainpage";
import FadeInOutSection from "./Tools/FadeInOnce";
import Fade from "./Tools/Fade";
import WhyChooseUs from "./Home/WhyChooseUs";
import NotFound from "./NotFound";
import ReviewWheel from "./Home/ReviewWheel";
import Footer from "./Home/Footer";
import FloatingControls from "./Tools/FloatingControls";
import Account from "./Home/Account";
import BuyPage from "./main/buypage";
import Checkout from "./main/checkout";
import Cart from "./main/cart";
import Sec from "./main/Security";
import Publish from "./main/publish";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/home"
        element={
          <div className="App">
            <FloatingControls />
            <Intro />
            <Hub />
            <WhyChooseUs />
            <ReviewWheel />
            <Footer />
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/buypage/:id" element={<BuyPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/security" element={<Sec />} />
      <Route path="/publish" element={<Publish />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
