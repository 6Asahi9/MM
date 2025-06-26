import React, { useEffect, useRef, useState } from "react";
import "./FadeInOnce.css";

const FadeInOnce = ({ children }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in-once ${visible ? "visible" : "hidden"}`}>
      {children}
    </div>
  );
};

export default FadeInOnce;
