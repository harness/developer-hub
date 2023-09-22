import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import CertCard from "./CertCard";
const Carousel = ({ certs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexPlusOne, setCurrentIndexPlusOne] = useState(1);

  useEffect(() => {
    let newCurrentIndexPlusOne =
      currentIndex >= certs.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndexPlusOne(newCurrentIndexPlusOne);
  }, [currentIndex]);

  // const incrementIndex = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % certs.length);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(incrementIndex, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.twoCards}>
          <CertCard thumb={true} key={certs.title} {...certs[currentIndex]} />
          <CertCard
            thumb={true}
            key={certs.title}
            {...certs[currentIndexPlusOne]}
          />
        </div>

        <div className={styles.indicator}>
          {certs.map((_, index: number) => (
            <div
              key={index}
              className={`${styles.dot}   ${
                currentIndex === index ? styles.active : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
