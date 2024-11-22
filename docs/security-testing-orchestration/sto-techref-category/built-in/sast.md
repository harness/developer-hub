---
title: SAST built-in scanner step reference
description: Run automated SAST scans out of the box.
sidebar_position: 10
sidebar_label: SAST scan step reference 
---

Use this step to add a Semgrep scan to detect vulnerabilities in your code repositories. A built-in step enables you to add a scan quickly and with minimal configuration. These steps use scanners that are free to STO users and are ready to run as soon as you add them to your pipeline.

<DocImage path={require('../static/built-in-scan-steps.png')} width="50%" height="50%" title="Click to view full size image" />

:::note notes

- Currently only [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference) scans are available for this step. 

- You don't need a Semgrep access token to run this step.

- The step detects your [target and variant](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference#target-and-variant-detection) automatically.

- All other settings such as **Log level** and **Fail on Severity** are set to their defaults.

- You can configure the Semgrep step after you add it to your pipeline, but this is optional. 

:::