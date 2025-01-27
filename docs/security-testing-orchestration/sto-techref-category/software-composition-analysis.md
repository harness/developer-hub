---
title: Software Composition Analysis - SCA
description: Setup SCA scan with Harness STO
sidebar_label: Software Composition Analysis - SCA
sidebar_position: 12
---

Software Composition Analysis (SCA) is a security testing practice that identifies vulnerabilities in open-source dependencies and third-party libraries used in your applications. It ensures that your software is free from known risks, enabling you to manage the security and compliance of external components effectively.

With Harness Security Testing Orchestration (STO), you can seamlessly perform SCA by integrating with multiple scanners. STO applies features such as results normalization, deduplication of findings, and results formatting to provide actionable insights for developers.

## Setup SCA with Harness STO

Harness STO supports a wide range of scanners for SCA, which you can easily integrate into your pipeline. You can select from the supported scanners, use the [Built-in Scanner workflow](/docs/category/built-in-scan-steps) to run scans without requiring paid licenses or complex configurations, or, if your preferred tool isn’t listed, use the Custom Scan step to include it in your setup.

<DocVideo src="https://youtu.be/xLftLnsylF8?si=xdXfJCWRPofpo2UH" />

### Supported Scanners for SCA

Below is the list of supported scanners for Software Composition Analysis in Harness STO:

1. **[OSV Scanner](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference)**  
2. **[OWASP](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference)**
3. **[Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-code-scanning)**
4. **[Wiz](/docs/security-testing-orchestration/sto-techref-category/wiz/artifact-scans-with-wiz)**  

If none of these scanners meet your requirements, you can use the Custom Scan step in Harness STO to perform SCA with any scanner of your choice.