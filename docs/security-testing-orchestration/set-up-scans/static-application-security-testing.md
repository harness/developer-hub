---
title: Static Application Security Testing - SAST
description: Set up SAST scanning using STO
sidebar_label: Static Application Security Testing - SAST
sidebar_position: 11
---

Static Application Security Testing (SAST) is a security testing practice that analyzes source code or binaries for potential vulnerabilities without executing the application. It is a crucial process for identifying and addressing security risks early in the software development lifecycle (SDLC).

With Harness Security Testing Orchestration (STO), you can easily perform SAST using a wide range of [integrated scanners](#supported-scanners-for-sast). STO also applies its own features, such as results normalization, the deduplication of findings from various scanners, and formatting results to make them actionable.

## Set up SAST scanning with Harness STO

You can use any of the [integrated scanners](#supported-scanners-for-sast) that perform SAST scanning, or you can leverage the Harness STO [Built-in Scanner workflow](/docs/security-testing-orchestration/set-up-scans/built-in-scanners). The Built-in Scanner step enables you to set up scans without the need for paid licenses or complex configurations. Currently, the Built-in Scanner uses Semgrep, and adding it via the SAST step automatically integrates [Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference#configure-semgrep-as-a-built-in-scanner) into your pipeline with everything configured. Alternatively, follow the specific integration guides linked below for detailed configuration steps.

<DocVideo src="https://youtu.be/qFnS6X4d5Ro?si=2s1oTw2f8q-mzrkx" />

### Supported Scanners for SAST

Below is the list of supported SAST scanners in Harness STO:

1. **[Bandit](/docs/security-testing-orchestration/sto-techref-category/bandit-scanner-reference)**
2. **[Black Duck](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference)** (by Synopsys)  
3. **[Brakeman](/docs/security-testing-orchestration/sto-techref-category/brakeman-scanner-reference)**
4. **[Checkmarx](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference)**  
5. **[Coverity](/docs/security-testing-orchestration/sto-techref-category/coverity-scanner-reference)**  
6. **[CodeQL](/docs/security-testing-orchestration/sto-techref-category/codeql-scanner-reference)**  
7. **[FOSSA](/docs/security-testing-orchestration/sto-techref-category/fossa-scanner-reference)**  
8. **[Mend](/docs/security-testing-orchestration/sto-techref-category/mend-scanner-reference)** (formerly known as WhiteSource)  
9. **[Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/semgrep-scanner-reference)**  
10. **[Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference)**  
11. **[SonarQube](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference)**
12. **[Veracode](/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference)**
13. **[Wiz](/docs/security-testing-orchestration/sto-techref-category/wiz/repo-scans-with-wiz)**

If the scanner you use for SAST scanning is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />