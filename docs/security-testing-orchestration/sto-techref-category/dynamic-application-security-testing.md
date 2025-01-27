---
title: Dynamic Application Security Testing - DAST
description: Set-up DAST scanning using STO
sidebar_label: Dynamic Application Security Testing - DAST
sidebar_position: 14
---
Dynamic Application Security Testing (DAST) is a security testing practice that identifies vulnerabilities in running applications by simulating real-world attacks. It is an essential part of the security testing process to discover issues that may arise during runtime, such as input validation flaws, authentication errors, and configuration vulnerabilities.

With Harness Security Testing Orchestration (STO), you can seamlessly perform DAST using a variety of integrated scanners. STO enhances the scanning process by normalizing results, deduplicating findings, and formatting them into actionable insights.

## Setup DAST Scanning with Harness STO
Harness STO provides support for a wide range of scanners for DAST, which you can easily integrate into your pipeline. You can select from the supported scanners, use the [Built-in Scanner workflow](/docs/category/built-in-scan-steps) to run scans without requiring paid licenses or complex configurations, or, if your preferred tool isn’t listed, use the Custom Scan step to include it in your setup.

### Supported Scanners for DAST
Below is the list of scanners supported for DAST in Harness STO:

- [Burp Suite](/docs/security-testing-orchestration/sto-techref-category/burp-scanner-reference)
- [Nikto](/docs/security-testing-orchestration/sto-techref-category/nikto-scanner-reference)
- [Nmap](/docs/security-testing-orchestration/sto-techref-category/nmap-scanner-reference)
- [Traceable](/docs/security-testing-orchestration/sto-techref-category/traceable-step-configuration)
- [Veracode](/docs/security-testing-orchestration/sto-techref-category/traceable-step-configuration)
- [Zap](/docs/security-testing-orchestration/sto-techref-category/zap/zap-scanner-reference)