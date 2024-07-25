import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";

import { getCertBadges } from "../University/LandingPage";
import { university } from "./data/universityData";
import Carousel from "./Carousel";

export default function HomepageUniversity(): JSX.Element {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  const certBadges = getCertBadges(baseUrl);

  return (
    <section className={styles.homepageCertifications}>
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.dualColumn}>
            <div className={styles.left}>
              <h2>Learn Software Delivery with Harness University</h2>
              <div className={styles.desc}>
                Learn intelligent software delivery skills through
                Instructor-Led Training and test your knowledge through
                Certifications. Courses, guides, videos, and reference docs to
                help you create and deliver software.
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
              <Carousel certs={university} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
