import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Install Delegate",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: <>Install a Docker or Kubernetes delegate.</>,
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
];

export const PlatformList: CardItem[] = [
  {
    title: "Install Delegate",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>Install a Kubernetes or Docker delegate on your infrastructure.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5 min",
    link: "/tutorials/platform/install-delegate",
  },
  {
    title: "Customize the Delegate to Run Your Favorite Third-Party Tools",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Customize the delegate to run any of your favorite tools Such as Helm,
        Terraform, AWS CLI, etc.
      </>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/customize-delegate",
  },
  {
    title: "Install Harness Delegate on GKE with Workload Identity",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Deploy Harness Delegate onto Workload Identity-enabled GKE.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/gke-workload-identity",
  },
  {
    title: "Move from default delegate to minimal delegate",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Secure the Harness Delegate upgrading the default image to the minimal image.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10 min",
    link: "/tutorials/platform/secure-delegate-default-to-minimal",
  },
  {
    title: "Manage secrets",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Safely store and access sensitive information like API keys and credentials.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/docs/platform/secrets/secrets-management/add-secrets-manager",
  },
  {
    title: "Configure OIDC with GCP WIF for Harness Cloud builds",
    module: MODULES.platform,
    icon: "img/logo.svg",
    description: (
      <>
        Configure OpenID Connect (OIDC) with GCP Workload Identity Federation (WIF) for builds on Harness Cloud.
      </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15 min",
    link: "/docs/continuous-integration/secure-ci/configure-oidc-gcp-wif-ci-hosted",
  },
];
