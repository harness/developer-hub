import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";
import CertCard from "./CertCard";
const Carousel = ({ certs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDotIndex, setCurrentDotIndex] = useState(0);
  // const [currentIndexPlusOne, setCurrentIndexPlusOne] = useState(1);

  // useEffect(() => {
  //   let newCurrentIndexPlusOne =
  //     currentIndex >= certs.length - 1 ? 0 : currentIndex + 2;
  //   setCurrentIndexPlusOne(newCurrentIndexPlusOne);
  // }, [currentIndex]);

  // const incrementIndex = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % certs.length);
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(incrementIndex, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);
  let myArray = [];

  for (let index = 0; index < certs.length - 1; index++) {
    myArray[index] = index * 2;
  }

  console.log(myArray);
  const handleDotClick = (index: number) => {
    setCurrentIndex(myArray[index]);
    setCurrentDotIndex(index);
  };

  return (
    <>
      <div className={styles.carousel}>
        <div className={styles.twoCards}>
          <CertCard thumb={true} key={certs.title} {...certs[currentIndex]} />
          {currentIndex < certs.length - 1 && (
            <CertCard
              thumb={true}
              key={certs.title}
              {...certs[currentIndex + 1]}
            />
          )}
        </div>

        <div className={styles.indicator}>
          {Array(Math.ceil(certs.length / 2))
            .fill("item")
            .map((_, index: number) => (
              <div
                key={index}
                className={`${styles.dot}   ${
                  currentDotIndex === index ? styles.active : ""
                }`}
                onClick={() => {
                  handleDotClick(index);
                  console.log(index);
                }}
              ></div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
