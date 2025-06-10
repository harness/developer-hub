---
title: Dynamic Application Security Testing - DAST
description: Set up DAST scanning using STO
sidebar_label: Dynamic Application Security Testing - DAST
sidebar_position: 14
---
Dynamic Application Security Testing (DAST) is a security testing practice that identifies vulnerabilities in running applications by simulating real-world attacks. It is an essential part of the security testing process to discover issues that may arise during runtime, such as input validation flaws, authentication errors, and configuration vulnerabilities.

With Harness Security Testing Orchestration (STO), you can seamlessly perform DAST using a wide range of [integrated scanners](#supported-scanners-for-dast). STO enhances the scanning process by normalizing results, deduplicating findings, and formatting them into actionable insights.

## Set up DAST Scanning with Harness STO
You can use any of the [integrated scanners](#supported-scanners-for-dast) that perform DAST scanning, or you can leverage the Harness STO [Built-in Scanner workflow](/docs/security-testing-orchestration/set-up-scans/built-in-scanners). The Built-in Scanner step enables you to set up scans without requiring paid licenses or complex configurations. Currently, the Built-in Scanner uses [Zed Attack Proxy (ZAP)](/docs/security-testing-orchestration/sto-techref-category/zap/dast-scan-zap). Alternatively, you can select any of the supported scanners below for detailed configuration steps.

### Supported Scanners for DAST
Below is the list of scanners supported for DAST in Harness STO:

- [**Burp Suite Enterprise Edition**](/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference)
- [**Nikto**](/docs/security-testing-orchestration/sto-techref-category/nikto-scanner-reference)
- [**Nmap**](/docs/security-testing-orchestration/sto-techref-category/nmap-scanner-reference)
- [**Traceable**](/docs/security-testing-orchestration/sto-techref-category/traceable-step-configuration)
- [**Veracode**](/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference)
- [**Zap**](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference)

If the scanner you use for DAST scanning is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />