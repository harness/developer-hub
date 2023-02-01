import React from "react";
import MDXContent from "@theme/MDXContent";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Accessibility from "../../../docs/legal/accessibility.md";
import styles from "./accessibility.module.scss";

export default function AccessibilityPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <MDXContent>
        <Layout
          title="Harness Accessibility Conformance Report" // {`${siteConfig.title}`}
          description={`${siteConfig.tagline}`} // "Description will go into a meta tag in <head />"
        >
          <main className={`container ${styles.container}`}>
            <Accessibility />
          </main>
        </Layout>
      </MDXContent>
    </div>
  );
}
