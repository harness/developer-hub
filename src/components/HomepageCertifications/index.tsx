import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

import { getCertBadges } from "../Certifications/LandingPage";
import { certifications } from "./data/certificationsData";
import Carousel from "./Carousel";

// harness-platform.svg | secret-mgmt.svg
export default function HomepageCertifications(): JSX.Element {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const certBadges = getCertBadges(baseUrl);
  const [certs, setCerts] = useState(certifications);
  useEffect(() => {
    if (certifications.length % 2 !== 0) {
      const updatedCerts = [...certs, certs[0]];
      setCerts(updatedCerts);
    }
  }, []);

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
                    <img src={badge.img} alt={badge.alt} />
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.right}>
              <Carousel certs={certs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
