import React, { useState, useRef } from "react";
import styles from "./BreadcrumbTabs.module.css";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface TabProps {
  label: string;
  value: string;
  children: React.ReactNode;
}

interface BreadcrumbTabsProps {
  children: React.ReactElement<TabProps>[]; // Accept only Tab components
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const BreadcrumbTabs: React.FC<BreadcrumbTabsProps> = ({ children }) => {
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];
  const [activeTab, setActiveTab] = useState(tabs[0]?.props.value || "");
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const { siteConfig: { baseUrl = '/' } = {} } = useDocusaurusContext();

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.props.value === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].props.value);
      scrollToTabs();
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.props.value === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].props.value);
      scrollToTabs();
    }
  };

  const scrollToTabs = () => {
    if (tabsContainerRef.current) {
      const offset = -150; // Adjust this value as needed
      const top =
        tabsContainerRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  
  return (
    <div className={styles.breadcrumbContainer} ref={tabsContainerRef}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumbNav}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.props.value}>
            <span
              className={`${styles.breadcrumbItem} ${
                activeTab === tab.props.value ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab.props.value)}
            >
              {tab.props.label}
            </span>
            {index < tabs.length - 1 && (
              <img
                src={`${baseUrl}img/iacm/next-progress-arrow.svg`}
                alt="Arrow"
                className={styles.breadcrumbArrow}
              />
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Content Display */}
      <div className={styles.contentContainer}>
        {tabs.map(
          (tab) =>
            activeTab === tab.props.value && (
              <div key={tab.props.value}>
                {tab.props.children}
                <div className={styles.navigationButtons}>
                  {tabs.findIndex((tab) => tab.props.value === activeTab) >
                    0 && (
                    <button
                      className={`${styles.breadcrumbItem} ${styles.previousButton}`}
                      onClick={handlePrevious}
                    >
                      <img
                        src={`${baseUrl}img/iacm/previous-progress-arrow.svg`}
                        alt="Previous"
                        className={styles.buttonArrow}
                      />
                      {
                        tabs[
                          tabs.findIndex(
                            (tab) => tab.props.value === activeTab
                          ) - 1
                        ].props.label
                      }
                    </button>
                  )}
                  {tabs.findIndex((tab) => tab.props.value === activeTab) <
                    tabs.length - 1 && (
                    <button
                      className={`${styles.breadcrumbItem} ${styles.nextButton}`}
                      onClick={handleNext}
                    >
                      {
                        tabs[
                          tabs.findIndex(
                            (tab) => tab.props.value === activeTab
                          ) + 1
                        ].props.label
                      }
                      <img
                        src={`${baseUrl}img/iacm/next-progress-arrow.svg`}
                        alt="Next"
                        className={styles.buttonArrow}
                      />
                    </button>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default BreadcrumbTabs;