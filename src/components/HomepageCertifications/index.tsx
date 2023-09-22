import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

import { getCertBadges } from "../Certifications/LandingPage";
import CertCard from "../Certifications/CertCard";
import { certifications } from "./data/certificationsData";
import Carousel from "./Carousel";

// harness-platform.svg | secret-mgmt.svg
export default function HomepageCertifications(): JSX.Element {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const certBadges = getCertBadges(baseUrl);
  return (
    <section className={styles.homepageCertifications}>
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.dualColumn}>
            <div className={styles.left}>
              <h2>Become a Harness Certified Expert</h2>
              <div className={styles.desc}>
                Learn intelligent software delivery skills at your own pace and
                in once place. Step-by-step tutorials, videos, and reference
                docs to help you create and deliver software.
              </div>
              <div className={styles.badges}>
                {certBadges.map((badge) => (
                  <Link to={badge.url} key={badge.img}>
                    <img
                      src={badge.img}
                      alt={badge.alt}
                      // className={badge.type === tab ? styles.active : ""}
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.right}>
              <Carousel certs={certifications} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
