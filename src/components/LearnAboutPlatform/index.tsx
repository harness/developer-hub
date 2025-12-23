import React, { useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ModuleTiles from "./Modules";
import styles from "./styles.module.scss";
import { useColorMode } from "@docusaurus/theme-common";
// harness-platform.svg | secret-mgmt.svg
export default function LearnAboutPlatform(): JSX.Element {
  const { colorMode } = useColorMode();

  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const [showMore, setShowMore] = useState(false);
  const [showMoreRelease, setShowMoreRelease] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const toggleShowMoreRelease = () => {
    setShowMoreRelease(!showMoreRelease);
  };
  return (
    <section className={styles.learnAboutPlatform}>
      <h2>Learn More</h2>
      <div className={styles.platform}>
      </div>

      <div className={styles.subSectionName}>
        <h3>Platform</h3>
      </div>
      <ul className={styles.platformList}>
        <a href="/docs/category/pipelines">
          <li>
            <img
              src={
                colorMode === "light"
                  ? `${baseUrl}img/automated-pipeline.svg`
                  : `${baseUrl}img/Pipelines_dark_mode.svg`
              }
            />

            {/* <img src={`${baseUrl}img/automated-pipeline.svg`} /> */}
            <h4>Pipelines</h4>
            <p>
              Run CI, CD, STO, FF and custom stages in an automated pipeline
            </p>
          </li>
        </a>
        <a href="/docs/category/templates">
          <li>
            {/* <img src={`${baseUrl}img/templates.svg`} /> */}
            <img
              src={
                colorMode === "light"
                  ? `${baseUrl}img/templates.svg`
                  : `${baseUrl}img/Templates_dark_mode.svg`
              }
            />
            <h4>Templates</h4>
            <p>
              Share organizational best practices for Pipelines, Steps, Stages,
              Services, Infrastructure
            </p>
          </li>
        </a>
        <a href="/docs/category/delegates">
          <li>
            {/* <img src={`${baseUrl}img/delegates.svg`} /> */}
            <img
              src={
                colorMode === "light"
                  ? `${baseUrl}img/delegates.svg`
                  : `${baseUrl}img/Delegates_dark_mode.svg`
              }
            />
            <h4>Delegates</h4>
            <p>
              Install, configure, secure, monitor, upgrade Delegates running on
              your own infrastructure
            </p>
          </li>
        </a>
        <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview">
          <li>
            <img
              src={
                colorMode === "light"
                  ? `${baseUrl}img/secret-mgmt.svg`
                  : `${baseUrl}img/Secrets_management_dark_mode.svg`
              }
            />
            <h4>Secrets Managment</h4>
            <p>
              Secure your secrets using popular Secret Managers and Key
              Management Systems
            </p>
          </li>
        </a>
      </ul>
      {showMore && (
        <ul className={styles.platformListMore}>
          <li>
            <a href="/docs/category/organizations--projects">
              <h4>Organizations &amp; Projects</h4>
              <p>Structure your development teams &amp; applications</p>
            </a>
          </li>
          <li>
            <a href="/docs/category/authentication">
              <h4>User Management</h4>
              <p>Use OAuth/SAML/SSO/LDAP providers for authentication</p>
            </a>
          </li>
          <li>
            <a href="/docs/category/platform-access-control">
              <h4>Role-Based Access Control</h4>
              <p>Use Roles &amp; User Groups for authorization</p>
            </a>
          </li>
          <li>
            <a href="/docs/category/audit-trail">
              <h4>Audit Trail</h4>
              <p>Review every important change to your Harness account</p>
            </a>
          </li>
          <li>
            <a href="/docs/category/harness-dashboards">
              <h4>Dashboards &amp; Reports</h4>
              <p>
                Create &amp; share Dashboards as well as schedule &amp; download
                Reports
              </p>
            </a>
          </li>
          <li>
            <a href="/docs/category/policy-as-code">
              <h4>Policy as Code</h4>
              <p>Define &amp; enforce Governance Policies</p>
            </a>
          </li>
          <li>
            <a href="/docs/category/terraform-provider">
              <h4>Terraform Provider</h4>
              <p>Automate configuration and initial setup</p>
            </a>
          </li>
          <li>
            <a href="/docs/category/api">
              <h4>REST API</h4>
              <p>
                Integrate with your ecosystem using REST API clients written in
                the language of your choice
              </p>
            </a>
          </li>
          <li>
            <a href="/docs/self-managed-enterprise-edition">
              <h4>Self-Managed Enterprise Edition</h4>
              <p>
                Install, configure, secure, upgrade Harness Platform on your own
                Kubernetes infrastructure
              </p>
            </a>
          </li>
        </ul>
      )}
      <div className={styles.btnShowMore}>
        <button onClick={toggleShowMore}>
          See {showMore ? "Less △" : "All Platform Features▽"}
        </button>
      </div>

      
    </section>
  );
}
