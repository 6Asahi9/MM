import React, { useEffect, useState } from "react";
import "./ReviewWheel.css";

import img1 from "../assets/Humans/img1.png";
import img2 from "../assets/Humans/img2.png";
import img3 from "../assets/Humans/img3.png";
import img4 from "../assets/Humans/img4.png";
import img5 from "../assets/Humans/img5.png";

const reviews = [
  "When you're running a country, you need a fleet that performs. Miya Marines delivered my private command cruiser with elegance and precision. Unmatched — Ambassador Darnell Hughes",
  "I've collected vessels from Monaco to the Maldives, but none match the craftsmanship of the sailboat I acquired here. Miya Marines is, quite simply, excellence afloat. — Mr. Whitmore Kensington",
  "Started with a jet ski for weekend thrills.. now planning a full upgrade to a speedboat. Miya Marines keeps things fast and professional. — Elliot Crane",
  "The fishing boat was a gift to my grandson but I must say, the lines, the polish... it might remain mine. Simply divine. — Countess Maribelle St. Claire",
  "Got him a rescue boat for our anniversary he says it's the best gift he's ever received. I just love seeing him smile. Thank you, Miya Marines. — Nina Alvarado",
];

const images = [img1, img2, img3, img4, img5];

export default function ReviewWheel() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="review-section-wrapper">
      <h3 className="review-title">Our Legacy Buyers</h3>
      <div className="review-flex">
        <div className="review-image-container">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Reviewer ${index}`}
              className={`review-image ${
                index === visibleIndex ? "visible" : "hidden"
              }`}
            />
          ))}
        </div>

        <div className="review-text-container">
          {reviews.map((text, index) => {
            const isVisible = index === visibleIndex;
            const [main, name] = text.split("—");

            return (
              <div
                key={index}
                className={`review-card ${isVisible ? "visible" : "hidden"}`}
              >
                <p>{main.trim()}</p>
                {name && <div className="review-name">— {name.trim()}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
