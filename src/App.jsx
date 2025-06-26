import { Routes, Route, Navigate } from "react-router-dom";
import Intro from "./Home/Intro";
import Hub from "./Home/Hub";
import Login from "./Login/Login";
import Account from "./Home/Account";
import FadeInOutSection from "./Tools/FadeInOnce";
import Fade from "./Tools/Fade";
import WhyChooseUs from "./Home/WhyChooseUs";
import NotFound from "./NotFound";
import ReviewWheel from "./Home/ReviewWheel";
import Footer from "./Home/Footer";
import FloatingControls from "./Tools/FloatingControls";

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
      <Route path="/account" element={<Account />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
