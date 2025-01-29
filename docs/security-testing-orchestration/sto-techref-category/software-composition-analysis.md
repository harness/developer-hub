---
title: Software Composition Analysis - SCA
description: Setup SCA scan with Harness STO
sidebar_label: Software Composition Analysis - SCA
sidebar_position: 12
---

Software Composition Analysis (SCA) is a security testing practice that identifies vulnerabilities in open-source dependencies and third-party libraries used in your applications. It ensures that your software is free from known risks, enabling you to manage the security and compliance of external components effectively.

With Harness Security Testing Orchestration (STO), you can seamlessly perform SCA using a wide range of [integrated scanners](#supported-scanners-for-sca). STO also applies its own features, such as results normalization, deduplication of findings from various scanners, and formatting results to make them actionable.

## Setup SCA with Harness STO

You can use any of the [integrated scanners](#supported-scanners-for-sca) that perform SCA scanning, or you can leverage the Harness STO [Built-in Scanner workflow](/docs/category/built-in-scan-steps). The Built-in Scanner step enables you to set up scans without requiring paid licenses or complex configurations. Currently, the Built-in Scanner uses [OWASP Dependency Check](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference) and [OSV](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference). Alternatively, you can select any of the supported scanners for a detailed configuration steps.

<DocVideo src="https://youtu.be/xLftLnsylF8?si=xdXfJCWRPofpo2UH" />

### Supported Scanners for SCA

Below is the list of supported SAST scanners in Harness STO:

1. **[OSV Scanner](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference)**  
2. **[OWASP](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference)**
3. **[Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-code-scanning)**
4. **[Veracode](/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference)**
4. **[Wiz](/docs/security-testing-orchestration/sto-techref-category/wiz/repo-scans-with-wiz)**  

If the scanner you use for SAST scanning is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference).

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/sto-techref-category/shared/_next-steps-for-scan-types.md';

<ScanTypeNextSteps />