---
title: Containers built-in scanner step reference
description: Run automated container scans out of the box.
sidebar_position: 40
sidebar_label: Containers scan step reference 
---

Use this step to add an Aqua Trivy or Anchor Grype scan to detect vulnerabilities in your container images. A built-in step enables you to add scans quickly and with minimal configuration. These steps use scanners that are free to STO users and are ready to run as soon as you add them to your pipeline.

![](../static/built-in-scan-steps.png)

:::note notes

- This step is currently behind the feature flag `STO_ONE_CLICK_SAST`. Contact [Harness Support](mailto:support@harness.io) to enable it. 

- Currently [Aqua Trify](/docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference) or [Anchor Grype](/docs/security-testing-orchestration/sto-techref-category/grype-scanner-reference) scans are available for this step.

- If you choose to add both scanners, you might see the same vulnerability listed twice — detected once by Trivy and again by Grype — in your scan results.
 
- The step detects your [target and variant](/docs/security-testing-orchestration/sto-techref-category/aqua-trivy-scanner-reference#detect-target-and-variant) automatically.

- All other settings such as **Log level** and **Fail on Severity** are set to their defaults. 

- You don't need to add a [Docker-in-Docker background service](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#docker-in-docker-requirements-for-sto) manually. The step will add this service automatically if it's needed. 

- You can configure the scan steps after you add them to your pipeline, but this is optional. 

:::