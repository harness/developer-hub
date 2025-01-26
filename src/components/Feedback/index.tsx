import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Tooltip from 'rc-tooltip';
import styles from './index.module.scss';
import BrowserOnly from '@docusaurus/BrowserOnly';
const Feedback = () => {
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();

  return (
    <>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          const handleClick = () => {
            /*
            Refiner('setProject', '9afbf970-3859-11ed-91de-cb8481e90a69')
            Refiner('showForm', '9afbf970-3859-11ed-91de-cb8481e90a69', true)
            */
            // NPM module doesn't work here in SSR mode for Docusaurus!
            // Use plain js instead!!
            try {
              window._refinerQueue = window._refinerQueue || [];
              function _refiner() {
                _refinerQueue.push(arguments);
              }
              _refiner('setProject', 'a61ea060-9e2a-11ec-b6a3-9d6ceaa4c99a');
              (function () {
                var a = document.createElement('script');
                a.type = 'text/javascript';
                a.async = !0;
                a.src = 'https://js.refiner.io/v001/client.js';
                var b = document.getElementsByTagName('script')[0];
                b.parentNode.insertBefore(a, b);
              })();
              /* comment identifyUser code to use Anonymous mode for Refiner
              _refiner('identifyUser', {
                id: 'USER-ID-ABC-123', // Replace with your user ID
                email: 'jane@awesome.com', // Replace with user Email
                name: 'Jane Doe', // Replace with user name
              });
              */
              _refiner(
                'showForm',
                '9afbf970-3859-11ed-91de-cb8481e90a69',
                true
              );
              _refiner('addToResponse', {
                currentUrl: window.location.href,
              });
            } catch (error) {
              console.error(error);
            }
          };
          return (
            <Tooltip
              placement="left"
              overlay="Leave feedback to help us improve"
            >
              <button className={styles.feedback} onClick={handleClick}>
                <img
                  src={`${baseUrl}img/icon_feedback.svg`}
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
