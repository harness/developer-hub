import React from "react";
import { CardItem, docType } from "../TutorialCard";
import { MODULES } from "../../../constants";

/* Define the cards here */
export const FeaturedList: CardItem[] = [
  {
    title: "Your first STO pipeline",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a Pipeline with one scanner, run scans, analyze the results, and learn the key features of STO.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/your-first-sto-pipeline",
  },
  {
    title: "Create a build-scan-push pipeline (STO only)",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up an end-to-end STO pipeline that scans your codebase. Then it builds an image and scans it. If the image scan detects no critical issues, the pipeline pushes the image to your registry. </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/build-scan-push-sto-only",
  },

];

export const STOList: CardItem[] = [
  {
    title: "STO Overview",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Learn how Harness STO can help you solve your security scanning problems.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "5min",
    link: "/tutorials/security-tests/sto-overview",
  },
  {
    title: "Your first STO pipeline",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up a Pipeline with one scanner, run scans, analyze the results, and learn the key features of STO.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/your-first-sto-pipeline",
  },
  {
    title: "SAST codebase scans with Semgrep",
    module: MODULES.sto, 
    icon: "img/icon_sto.svg",
    description: (
      <>Quickly set up a pipeline to scan codebases using Semgrep, which supports a wide variety of languages.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/sast-scan-semgrep",
  },
  {
    title: "Container image scans with Aqua Trivy",
    module: MODULES.sto, 
    icon: "img/icon_sto.svg",
    description: (
      <>Quickly set up a pipeline to scan container images using the open-source Aqua Trivy scanner.</>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/container-scan-aqua-trivy",
  },
  {
    title: "Trigger automated scans using GitLab merge requests",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Learn how to launch pipeline builds and scans automatically based on GitLab events.</>
    ),
    newDoc: false,
    type: [docType.Documentation],
    time: "10min",
    link: "/tutorials/security-tests/gitlab-ci-integration",
  },
  {
    title: "Create a build-scan-push pipeline (STO only)",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up an end-to-end STO pipeline that scans code, builds an image, and scans it. If the image scan detects no critical issues, the pipeline pushes the image to your image registry. </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/build-scan-push-sto-only",
  },
  {
    title: "Create a build-scan-push pipeline (STO and CI)",
    module: MODULES.sto,
    icon: "img/icon_sto.svg",
    description: (
      <>Set up an end-to-end STO/CI pipeline that scans your codebase, builds/pushes a test image, and then scans it. If there are no critical issues, the pipeline builds a prod image and pushes it to your registry. </>
    ),
    newDoc: true,
    type: [docType.Documentation],
    time: "15min",
    link: "/tutorials/security-tests/build-scan-push-sto-only",
  },

];
