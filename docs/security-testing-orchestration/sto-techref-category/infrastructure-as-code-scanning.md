---
title: Infrastructure as Code scanning
description: Set-up IaC scanning using STO
sidebar_label: Infrastructure as Code scanning - IaC
sidebar_position: 15
---
Infrastructure as Code (IaC) scanning is a security testing practice that analyzes IaC configurations to identify misconfigurations, security vulnerabilities, and compliance issues before deployment. By scanning IaC templates such as Terraform, CloudFormation, Kubernetes manifests, and other configuration files, teams can detect security risks early in the development process.

With Harness Security Testing Orchestration (STO), you can perform IaC scanning using [integrated scanners](#supported-scanners-for-iac). STO enhances the scanning process by normalizing results, deduplicating findings, and formatting them into actionable insights.

## Setup DAST Scanning with Harness STO
You can use any of the [integrated scanners](#supported-scanners-for-iac) that perform IaC scanning. select any of the scanners below for a detailed configuration steps.

### Supported Scanners for IaC
Below is the list of scanners supported for IaC in Harness STO:

- [**Snyk**](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-iac-scanning)
- [**Wiz**](/docs/security-testing-orchestration/sto-techref-category/wiz/iac-scans-with-wiz)

If the scanner you use for Container Scanning is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference).

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/sto-techref-category/shared/_next-steps-for-scan-types.md';

<ScanTypeNextSteps />