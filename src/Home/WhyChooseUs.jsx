import React from "react";
import {
  FaShieldAlt,
  FaShippingFast,
  FaClock,
  FaSmile,
  FaAward,
} from "react-icons/fa";
import "./WhyChooseUs.css";
import "@fontsource/libre-franklin/700.css";

const benefits = [
  {
    icon: <FaShieldAlt />,
    title: "Trusted Quality & Safety",
    description:
      "All boats undergo strict quality checks and meet international safety standards. Your peace of mind is our priority!",
  },
  {
    icon: <FaShippingFast />,
    title: "Nationwide Delivery & Logistics",
    description:
      "We ensure fast, secure, and trackable delivery of every boat, regardless of size or location. Our logistics team handles the heavy lifting so you don’t have to worry.",
  },
  {
    icon: <FaClock />,
    title: "24/7 Support",
    description:
      "Our dedicated team is available around the clock to assist with your queries, purchases, and after-sales services.",
  },
  {
    icon: <FaSmile />,
    title: "Customer Satisfaction First",
    description:
      "We don’t just sell boats—we build relationships. Our mission is to exceed your expectations every step of the way.",
  },
  {
    icon: <FaAward />,
    title: "Industry Excellence",
    description:
      "With years of experience and awards under our belt, Miya Marines is a recognized leader in the marine marketplace.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="why-container">
      <div className="why-inner">
        <h2 className="why-title">Why Choose Us?</h2>
        <div className="why-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
