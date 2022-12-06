import React from "react";
import MDXContent from "@theme/MDXContent";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import TermsOfUse from "../../../docs/legal/terms-of-use.md";
import styles from "./terms-of-use.module.scss";

export default function LandingPage() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <MDXContent>
        <Layout
          title={`${siteConfig.title}`}
          description="Description will go into a meta tag in <head />"
        >
          <main className={`container ${styles.container}`}>
            <TermsOfUse />
          </main>
        </Layout>
      </MDXContent>
    </div>
  );
}
