import React from "react";
import MDXContent from "@theme/MDXContent";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
// import Accessibility from "../../../docs/legal/accessibility.md";

import CommunityAspects from '@site/src/components/Community/Aspects';
import CommunityPosts from '@site/src/components/Community/Posts';

import styles from "./index.module.scss";

export default function AccessibilityPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <MDXContent>
        <Layout
          title="Harness Community" // {`${siteConfig.title}`}
          description={`${siteConfig.tagline}`} // "Description will go into a meta tag in <head />"
        >
          <main className={`container ${styles.container}`}>
            <h1>Welcome to The Community</h1>

            <p>Welcome to the new home of the Harness Community. Build expertise and relationships through the Harness Community.</p> 
            
            <h2 className={styles.section}>Join Us</h2>
            <p>Connect with us on various mediums.</p>
            
            
            <CommunityAspects />
            
            <ul>
              <li>Slack for Discussions.</li>
              <li>KB for Articles by Harness Experts. </li>
            </ul>
            
            <CommunityPosts />
          </main>
        </Layout>
      </MDXContent>
    </div>
  );
}
