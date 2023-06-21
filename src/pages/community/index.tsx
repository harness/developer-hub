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
            <h1>Explore the Harness Community</h1>

            <p>Build relationships through knowledge sharing.</p> 
            
            <h2 className={styles.section}>Join Us</h2>
            <p>Connect with us on various mediums.</p>
            
            
            <CommunityAspects />
            
            <ul>
              <li>Slack is used for discussions.</li>
              <li>Knowledge Base is used for articles by Harness Experts. </li>
            </ul>
            
          </main>
        </Layout>
      </MDXContent>
    </div>
  );
}
