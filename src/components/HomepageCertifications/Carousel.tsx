import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import CertCard from "./CertCard";

const Carousel = ({ certs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);

  const handleDotClick = (index, dotIndex) => {
    setCurrentIndex(index);
    setCurrentDotIndex(dotIndex);
  };

  console.log({ currentDotIndex });
  console.log({ currentIndex });

  const handleNext = () => {
    if (currentDotIndex >= Math.ceil(certs.length / 2) - 1) {
      setCurrentDotIndex(0);
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((currentIndex + 2) % certs.length);
    setCurrentDotIndex(currentDotIndex + 1);
  };

  const handlePrev = () => {
    if (currentDotIndex === 0) {
      setCurrentDotIndex(Math.ceil(certs.length / 2) - 1);
      setCurrentIndex(Math.ceil(certs.length / 2) - 1);
      return;
    }
    setCurrentIndex((currentIndex - 2) % certs.length);
    setCurrentDotIndex(currentDotIndex - 1);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.twoCards}
        style={{
          transform: `translateX(${-currentDotIndex * 102.5}%)`,
        }}
      >
        {certs.map((cert) => (
          <CertCard thumb={true} key={cert.title} {...cert} />
        ))}
      </div>

      <div className={styles.indicator}>
        <i onClick={handlePrev} className="fa-solid fa-chevron-left"></i>
        {Array(Math.ceil(certs.length / 2))
          .fill("item")
          .map((_, index) => (
            <div
              key={index}
              className={`${styles.dot}   ${
                currentDotIndex === index ? styles.active : ""
              }`}
              onClick={() => {
                handleDotClick(index * 2, index);
              }}
            ></div>
          ))}
        <i onClick={handleNext} className="fa-solid fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default Carousel;
