import React from "react";
// import Link from "@docusaurus/Link";
// import clsx from "clsx";
// import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import TutorialCard, { CardItem, docType } from "./TutorialCard";

/* Define the cards here */
const FeaturedList: CardItem[] = [
  {
    title: "Install Delegate",
    module: "platform",
    icon: "img/logo.svg",
    description: <>Install a Docker or Kubernetes Delegate.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
];

const PlatformList: CardItem[] = [
  {
    title: "Install Delegate",
    module: "platform",
    icon: "img/logo.svg",
    description: (
      <>Install a Kubernetes or Docker Delegate on your infrastructure.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
  {
    title: "Customize the Delegate to Run Your Favorite Third-Party Tools",
    module: "platform",
    icon: "img/logo.svg",
    description: (
      <>Customize the Delegate to run any of your favorite tools Such as Helm, Terraform, AWS CLI, etc.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/customize-delegate",
  },
  {
    title: "Onboard with Terraform",
    module: "platform",
    icon: "img/logo.svg",
    description: (
      <>
        Automate lifecycle management of orgs, projects, services, environments,
        connectors and pipelines using the Harness Terraform Provider.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/onboard-terraform-provider",
  },
];

export default function Platform() {
  // const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    // <Layout title="CD" description="CD">
    //   <ul className={styles.breadCrumb}>
    //     <li>Get Started</li>
    //     <li>Deploy services</li>
    //   </ul>
    <div className="container">
      {/* <img src="/img/cd.svg"/> 
       <div className={styles.SectionName}><h3>Administering The Harness Platform</h3></div> */}
      <div className={styles.topSection}>
        <div className={styles.spaceBetween}>
          {/* <div>
              <Link href="https://docs.harness.io/category/3fso53aw1u-howto-general">
              <button className={clsx('button button--lg', styles.btn, styles.btnLight)}><img src="/img/icon_document.png"/> Documentation</button>
              </Link>
            </div>       
          </div>
          <div className={styles.spaceBetween}>
            <div>
              <p>
              The Harness Platform is a self-service platform that enables end-to-end software delivery.
              </p>
              <div className={styles.alignCenter}>
              <Link
                  className={clsx('button button--lg', styles.btn, styles.btnCD)}
                  to="#all-tutorials">
                  Platform Quickstart 
                  <img src="/img/Stroke.svg"/>
              </Link>
              <Link href="https://harness.io/products/platform"><button className={styles.link}>Learn more about the Harness Platform</button></Link>
              </div>
            </div>
            <div>
              <img src="/img/cd_flow.svg"/>
  </div> */}
        </div>
      </div>
      <div className={styles.subSection}>
        <h3>Featured Tutorials</h3>
        <TutorialCard FeatureList={FeaturedList} featuredCard={true} />
      </div>
      <div className={styles.subSection}>
        <h3 id="all-tutorials">All Platform Tutorials</h3>
        <TutorialCard FeatureList={PlatformList} />
      </div>
    </div>
    // </Layout>
  );
}
