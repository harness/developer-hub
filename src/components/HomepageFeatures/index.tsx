import React from "react";
import clsx from "clsx";
import Tooltip from "rc-tooltip";
import Link from "@docusaurus/Link";
import "rc-tooltip/assets/bootstrap.css";
import styles from "./styles.module.scss";

enum docType {
  Documentation = "doc",
  Interactive = "interactive",
  Video = "video",
}

export type FeatureItem = {
  title: string;
  module: string;
  Svg?: string; // React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
  type: docType[];
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Build & Test Code",
    module: "ci",
    Svg: "/img/icon_ci.svg",
    description: <>Create a CI build pipeline.</>,
    type: [docType.Documentation],
    //type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/build-code",
  },
  {
    title: "Deploy Services",
    module: "cd",
    Svg: "/img/icon_cd.svg",
    description: <>Create a CD deployment pipeline.</>,
    type: [docType.Documentation],
    link: "/tutorials/deploy-services",
  },
  {
    title: "Manage Feature Flags",
    module: "ff",
    Svg: "/img/icon_ff.svg",
    description: <>Roll out new features progressively.</>,
    type: [docType.Documentation],
    link: "/tutorials/manage-feature-flags",
  },
  {
    title: "Manage Cloud Costs",
    module: "ccm",
    Svg: "/img/icon_ccm.svg",
    description: <>Achieve cost transparency and cut costs.</>,
    type: [docType.Documentation],
    link: "/tutorials/manage-cloud-costs",
  },
  {
    title: "Manage Service Reliability",
    module: "srm",
    Svg: "/img/icon_srm.svg",
    description: <>Monitor SLOs, track error budgets, debug code errors.</>,
    type: [docType.Documentation, docType.Interactive, docType.Video],
    link: "/tutorials/manage-service-reliability",
  },
  {
    title: "Orchestrate Security Tests",
    module: "sto",
    Svg: "/img/icon_sto.svg",
    description: <>Scan code, containers and apps.</>,
    type: [docType.Documentation],
    link: "/tutorials/orchestrate-security-tests",
  },
  {
    title: "Run Chaos Experiments",
    module: "ce",
    Svg: "/img/icon_ce.svg",
    description: <>Ensure app and infrastructure resilience.</>,
    type: [docType.Documentation],
    link: "/tutorials/run-chaos-experiments",
  },
  {
    title: "Administer Harness Platform",
    module: "platform",
    Svg: "/img/logo.svg",
    description: (
      <>
        Install a Kubernetes or Docker delegate, Onboard with Terraform
        Provider.
      </>
    ),
    type: [docType.Documentation],
    link: "/tutorials/platform",
  },
];

function Feature({ title, Svg, description, type, module, link }: FeatureItem) {
  return (
    <a href={link}>
      <div className={clsx(styles.getStartItem, styles[module])}>
        <div className="text--center">
          {/* <Svg className={styles.featureSvg} role="img" /> */}
          <img src={Svg} className={styles.featureSvg} alt={title} />
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
                  <img src={`/img/icon_doctype_${props}.svg`} alt={props} />
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </a>
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
        <Link href="/tutorials/get-started">
          <button className="button button--primary">All Tutorials</button>
        </Link>
      </div>
    </section>
  );
}
