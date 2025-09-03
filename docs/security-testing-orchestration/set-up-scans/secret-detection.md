---
title: Secret Detection
description: Set up scans to detect secrets
sidebar_label: Secret Detection
sidebar_position: 12
---

Secret Detection is a security testing practice that scans code repositories for exposed credentials, API keys, tokens, and other sensitive information. Detecting and addressing exposed secrets early helps prevent unauthorized access and security breaches.

With Harness Security Testing Orchestration (STO), you can perform Secret Detection using supported scanners and STO applies its security orchestration features, such as results normalization, deduplication, and formatting findings into actionable insights.

## Set up Secret Detection with Harness STO

You can configure secret detection in Harness STO using the supported scanners:

- **[Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)** – You can either set up Gitleaks manually or use the [Built-in Scanner](./built-in-scanners) approach, which provides a pre-configured setup for running Gitleaks without additional configuration. Because Gitleaks is open source, running it within Harness STO does not require a paid license. If you choose the Built-in Scanner, STO automatically handles the setup, allowing you to run Secret Detection without manual configuration.

- The following scanners automatically detect secrets in the code repository when used for **SAST** or **SCA**. These findings are categorized under the **Secret** issue type in the scan results. If your pipeline includes any of these scanners, they are already scanning for secrets in your code repository:
    - **[Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference)**  
    - **[Checkmarx](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference)** 
    - **[Checkmarx One](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarxone-scanner-reference)** 
    - **[Fossa](/docs/security-testing-orchestration/sto-techref-category/fossa-scanner-reference)**  
    - **[Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/sast-scan-semgrep)**  
    - **[Qwiet AI (formerly ShiftLeft)](/docs/security-testing-orchestration/sto-techref-category/qwiet-scanner-reference)**  
    - **[Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference)**  
    - **[SonarQube](/docs/security-testing-orchestration/sto-techref-category/sonarqube-sonar-scanner-reference)**  
    - **[Wiz](/docs/security-testing-orchestration/sto-techref-category/wiz/repo-scans-with-wiz)**  


If you need to use a different scanner for Secret Detection, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />