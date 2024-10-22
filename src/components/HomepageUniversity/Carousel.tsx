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

  //for mobile view
  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);

  const handleMobileDotClick = (index, dotIndex) => {
    setMobileCurrentIndex(index);
  };

  const handleMobileNext = () => {
    if (mobileCurrentIndex >= certs.length - 1) {
      setMobileCurrentIndex(0);
      return;
    }
    setMobileCurrentIndex(mobileCurrentIndex + 1);
  };

  const handleMobilePrev = () => {
    if (mobileCurrentIndex === 0) {
      setMobileCurrentIndex(certs.length - 1);
      return;
    }
    setMobileCurrentIndex(mobileCurrentIndex - 1);
  };

  return (
    <>
      <div className={styles.carousel}>
        <div
          className={`${styles.twoCards} ${
            certs.length % 2 != 0 ? styles.isEvenCert : ""
          }`}
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
      <div className={styles.carouselMobile}>
        <div
          className={styles.cards}
          style={{
            transform: `translateX(${-mobileCurrentIndex * 101.5}%)`,
          }}
        >
          {certs.map((cert) => (
            <CertCard thumb={true} key={cert.title} {...cert} />
          ))}
        </div>

        <div className={styles.indicator}>
          <i
            onClick={handleMobilePrev}
            className="fa-solid fa-chevron-left"
          ></i>
          {Array(Math.ceil(certs.length))
            .fill("item")
            .map((_, index) => (
              <div
                key={index}
                className={`${styles.dot}   ${
                  mobileCurrentIndex === index ? styles.active : ""
                }`}
                onClick={() => {
                  handleMobileDotClick(index, index);
                }}
              ></div>
            ))}
          <i
            onClick={handleMobileNext}
            className="fa-solid fa-chevron-right"
          ></i>
        </div>
      </div>
    </>
  );
};

export default Carousel;
