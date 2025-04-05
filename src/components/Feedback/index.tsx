import BrowserOnly from '@docusaurus/BrowserOnly';
import Tooltip from 'rc-tooltip';
import React from 'react';
import styles from './index.module.scss';

const Feedback = () => {
  return (
    <>
      <BrowserOnly fallback={<div></div>}>
        {() => {
          const _refiner = require('refiner-js');
          const handleClick = () => {
            _refiner('setProject', 'a61ea060-9e2a-11ec-b6a3-9d6ceaa4c99a');
            _refiner('showForm', '9afbf970-3859-11ed-91de-cb8481e90a69', true);
            _refiner('addToResponse', {
              currentUrl: window.location.href,
            });
          };
          return (
            <Tooltip
              placement="left"
              overlay="Leave feedback to help us improve"
            >
              <button className={styles.feedback} onClick={handleClick}>
                <img
                  src={`/img/icon_feedback.svg`}
                  alt="Feedback"
                  width="24"
                  height="24"
                />
                <span>Feedback</span>
              </button>
            </Tooltip>
          );
        }}
      </BrowserOnly>
    </>
  );
};

export default Feedback;
