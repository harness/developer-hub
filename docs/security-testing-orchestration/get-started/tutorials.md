---
title: STO Tutorials
description: Get started with STO
sidebar_position: 30
redirect_from:
  - /docs/security-testing-orchestration/onboard-sto/sto-tutorials
---


The following workflows and [tutorials](/tutorials/security-tests) are available. 

- Getting started:

  - [Set up Harness for STO](/docs/security-testing-orchestration/get-started/onboarding-guide) This is a good primer if you're new to Harness. It guides you through the process of setting up the connectors, delegate, and infrastructure needed to run STO scans. 
   
  - [Your first STO pipeline](/tutorials/security-tests/your-first-sto-pipeline) This tutorial covers the basic concepts of STO. You'll set up a standalone pipeline with one scanner, run scans, analyze the results, and learn how to investigate and fix detected vulnerabilities.

- Quickstarts:

  - [SAST code scans using Semgrep](/tutorials/security-tests/sast-scan-semgrep) This "quick-start" tutorial shows you how to scan your codebases using [Semgrep](https://semgrep.dev), which can scan a [wide variety of languages](https://semgrep.dev/docs/supported-languages/) and includes a [free version](https://semgrep.dev/pricing/).

  - [Container image scans with Aqua Trivy](/tutorials/security-tests/container-scan-aqua-trivy) This "quick-start" tutorial shows you how to scan your container images using [Aqua Trivy](https://www.aquasec.com/products/trivy/), a popular open-source scanning tool.  

  - [Trigger automated scans using GitLab merge requests](/tutorials/security-tests/gitlab-ci-integration) This tutorial shows how you can set up a STO pipeline that runs a build and scans a code repository automatically in response to a Git event.

- Integrated end-to-end workflows:

  - [Create a build-scan-push pipeline (STO only)](/tutorials/security-tests/build-scan-push-sto-only) Set up an end-to-end STO pipeline that scans your codebase. Then it builds an image and scans it. If the image scan detects no critical issues, the pipeline pushes the image to your registry.

  - [Create a build-scan-push pipeline (STO and CI)](/tutorials/security-tests/build-scan-push-sto-ci) Set up an end-to-end STO/CI pipeline that scans your codebase, builds/pushes a test image, and then scans it. If there are no critical issues, the pipeline builds/pushes a prod image.

  