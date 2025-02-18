import React, { useState } from "react";
import styles from "./BreadcrumbTabs.module.css";

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
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];
  const [activeTab, setActiveTab] = useState(tabs[0]?.props.value || "");

  return (
    <div className={styles.breadcrumbContainer}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumbNav}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.props.value}>
            <span
              className={`${styles.breadcrumbItem} ${activeTab === tab.props.value ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.props.value)}
            >
              {tab.props.label}
            </span>
            {index < tabs.length - 1 && <span className={styles.breadcrumbArrow}>➜</span>}
          </React.Fragment>
        ))}
      </nav>

      {/* Content Display */}
      <div className={styles.contentContainer}>
        {tabs.map((tab) => activeTab === tab.props.value && (
          <div key={tab.props.value}>{tab.props.children}</div>
        ))}
      </div>
    </div>
  );
};

export default BreadcrumbTabs;