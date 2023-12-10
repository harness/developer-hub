---
title: STO Tutorials
description: Get started with STO
sidebar_position: 4
redirect_from:
  - /docs/security-testing-orchestration/onboard-sto/sto-tutorials
---


The following workflows and [tutorials](/tutorials/security-tests) are available. Harness recommends you do them in this order. 

  1. [Set up Harness for STO](/docs/security-testing-orchestration/get-started/onboarding-guide) This is a good primer if you're new to Harness. It guides you through the process of setting up your connectors, delegate, and build infrastructure. Then it guides you through the process of setting up a simple standalone STO pipeline. 
   
  2. [Your first STO pipeline](/tutorials/security-tests/your-first-sto-pipeline) This tutorial covers the basic concepts of STO. You'll set up a standalone pipeline with one scanner, run scans, analyze the results, and learn how to investigate and fix detected vulnerabilities.

  3. [SAST code scans using Semgrep](/tutorials/security-tests/sast-scan-semgrep) This "quick-start" tutorial shows you how to scan your codebases using [Semgrep](https://semgrep.dev), which can scan a [wide variety of languages](https://semgrep.dev/docs/supported-languages/) and includes a [free version](https://semgrep.dev/pricing/).

  4. [Container image scans with Aqua Trivy](/tutorials/security-tests/container-scan-aqua-trivy) This "quick-start" tutorial shows you how to scan your container images using [Aqua Trivy](https://www.aquasec.com/products/trivy/), a popular open-source scanning tool.  

  5. [Trigger automated scans using GitLab merge requests](/tutorials/security-tests/gitlab-ci-integration) This tutorial shows how you can set up a STO pipeline that runs a build and scans a code repository automatically in response to a Git event.