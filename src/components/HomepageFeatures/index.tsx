import React from "react";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CardItem, docType } from "../LandingPage/TutorialCard";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";

const FeatureList: CardItem[] = [
  {
    title: "Build & Test Code",
    module: "ci",
    icon: "img/icon_ci.svg",
    description: "Create a CI build pipeline.",
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "tutorials/build-code",
  },
  {
    title: "Deploy Services",
    module: "cd",
    icon: "img/icon_cd.svg",
    description: <>Create a CD deployment pipeline.</>,
    type: [docType.Documentation],
    link: "tutorials/deploy-services",
  },
  {
    title: "Manage Feature Flags",
    module: "ff",
    icon: "img/icon_ff.svg",
    description: <>Roll out new features progressively.</>,
    type: [docType.Documentation],
    link: "tutorials/manage-feature-flags",
  },
  {
    title: "Manage Cloud Costs",
    module: "ccm",
    icon: "img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs.</>,
    type: [docType.Documentation],
    link: "tutorials/manage-cloud-costs",
  },
  {
    title: "Manage Service Reliability",
    module: "srm",
    icon: "img/icon_srm.svg",
    description: <>Monitor SLOs, track error budgets, debug code errors.</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "tutorials/manage-service-reliability",
  },
  {
    title: "Orchestrate Security Tests",
    module: "sto",
    icon: "img/icon_sto.svg",
    description: <>Scan code, containers and apps.</>,
    type: [docType.Documentation],
    link: "tutorials/orchestrate-security-tests",
  },
  {
    title: "Run Chaos Experiments",
    module: "ce",
    icon: "img/icon_ce.svg",
    description: <>Ensure app and infrastructure resilience.</>,
    type: [docType.Documentation],
    link: "tutorials/run-chaos-experiments",
  },
  {
    title: "Administer Harness Platform",
    module: "platform",
    icon: "img/logo.svg",
    description: (
      <>
        Install a Kubernetes or Docker delegate, Onboard with Terraform
        Provider.
      </>
    ),
    type: [docType.Documentation],
    link: "tutorials/platform",
  },
];

function Feature({ title, icon, description, type, module, link }: CardItem) {
  const { siteConfig: { baseUrl = "/" } = {} } = useDocusaurusContext();
  return (
    <Link href={link}>
      <div className={clsx(styles.getStartItem, styles[module])}>
        <div className="text--center">
          {/* <icon className={styles.featureSvg} role="img" /> */}
          <img src={baseUrl + icon} className={styles.featureSvg} alt={title} />
        </div>
        <div
          className={clsx(
            "text--center padding-horiz--md",
            styles.titleAndDesc
          )}
        >
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div>
          <ul className={styles.docTypes}>
            {type.map((props, idx) => (
              <li>
                <Tooltip placement="top" overlay={props}>
                  <img
                    src={`${baseUrl}img/icon_doctype_${props}.svg`}
                    alt={props}
                  />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      {<h2>Get Started with Tutorials</h2>}
      <div className={styles.getStart}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <Link href="/tutorials">
          <button className="button button--primary">All Tutorials</button>
        </Link>
      </div>
    </section>
  );
}
