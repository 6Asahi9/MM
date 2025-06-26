import React from "react";
import "./Hub.css";
import "@fontsource/playfair-display/700.css"; // 400 ,600 ,700
// import FadeInOutSection from "../Tools/FadeInOnce";
import Fade from "../Tools/Fade";
import img1 from "./Images/img1.jpg";
import img2 from "./Images/img2.jpg";
import img3 from "./Images/img3.jpg";
import img4 from "./Images/img4.jpg";
import img5 from "./Images/img5.avif";
import img6 from "./Images/img6.jpg";
import img7 from "./Images/img7.jpg";
import img8 from "./Images/img8.jpg";
import img9 from "./Images/img9.jpg";

const products = [
  { id: 1, img: img1, name: "Cruise Ships" },
  { id: 2, img: img2, name: "Jet Skis" },
  { id: 3, img: img3, name: "Powerboats" },
  { id: 4, img: img4, name: "Fishing Boats" },
  { id: 5, img: img5, name: "Rescue Boats" },
  { id: 6, img: img6, name: "Sailboats" },
  { id: 7, img: img7, name: "Submarines" },
  { id: 8, img: img8, name: "Cargo Ships" },
  { id: 9, img: img9, name: "Aircraft Carriers" },
];

export default function Hub() {
  return (
    <div className="hub-container">
      <h2>Best Selling Catagories</h2>
      <div className="product-row">
        {products.map((item, index) => (
          <Fade key={item.id} delay={index * 0.2}>
            <div className="product-card">
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
