import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import CertCard from "./CertCard";

const Carousel = ({ certs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleDotClick = (index, dotindex) => {
    setCurrentIndex(index);
    setCurrentDotIndex(dotindex);
    setFlag(true);
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFlag(false);
    }, 500); 

    return () => {
      // This cleanup function will clear the timeout if the component unmounts
      clearTimeout(timeoutId);
    };
  }, [flag]);

  return (
    <>
      <div className={styles.carousel}>
        <div
          className={styles.twoCards}
          style={{
            transform: flag ? `translateX(110%)` : `translateX(0%)`,
          }}
        >
          {certs.slice(currentIndex, currentIndex + 2).map((cert) => (
            <CertCard thumb={true} key={cert.title} {...cert} />
          ))}
        </div>

        <div className={styles.indicator}>
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
        </div>
      </div>
    </>
  );
};

export default Carousel;
