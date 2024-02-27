---
title: SCA built-in scanner step reference
description: Run automated SCA scans out of the box.
sidebar_position: 20
sidebar_label: SCA scan step reference 
---

Add an OWASP Dependency Check or OSV scan to detect vulnerabilities in your open-source libraries and packages. A built-in step enables you to add scans quickly and with minimal configuration. These steps use scanners that are free to STO users and are ready to run as soon as you add them to your pipeline.

![](../static/built-in-scan-steps.png)

:::note notes

- This step is currently behind the feature flag `STO_ONE_CLICK`. Contact [Harness Support](mailto:support@harness.io) to enable it.

- Currently [OWASP Dependency Check](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference) and [OSV](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference) scans are available for this step.

- If you choose to add both scanners, you might see the same vulnerability listed twice — detected once by OWASP and again by OSV — in your scan results.

- The step detects your [target and variant](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#target-and-variant-detection) automatically.

- All other settings such as **Log level** and **Fail on Severity** are set to their defaults. 

- You can configure the scan steps after you add them to your pipeline, but this is optional.  

:::