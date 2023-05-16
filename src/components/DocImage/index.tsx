import React, { useState } from "react";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Modal from "react-modal";
import styles from "./styles.module.scss";

/* ***** Usage *****
// with src
<docimage
  src="https://developer.harness.io/assets/images/ci-concepts-10-5e41d86395abeba7e167a476d1932f7c.png"
  width="300"
  height="200"
  border
/>
// with path
<docimage
  path={require('./static/ci-concepts-10.png')}
  alt="Harness CI Features"
  title="Click to view full size image"
/>
*/

const DocImage = (props) => {
  const {
    src,
    path,
    width = null,
    height = null,
    alt = "",
    title = "Click to view full size image",
    border = true,
  } = props;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  // }

  function closeModal() {
    setIsOpen(false);
  }
  // const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  let imgSrc = src;
  if (path) {
    imgSrc = path?.default;
  }
  return (
    <>
      <img
        className={border ? styles.docImageWithBorder : styles.docImage}
        src={imgSrc}
        width={width}
        height={height}
        alt={alt}
        title={title}
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={styles.docModalDialog}
      >
        <img
          className={styles.docImageFullsize}
          src={imgSrc}
          alt={alt}
          title={title}
          onClick={openModal}
        />
        <button className={styles.btnClose} onClick={closeModal}>
          ✕
        </button>
      </Modal>
    </>
  );
};

export default DocImage;
