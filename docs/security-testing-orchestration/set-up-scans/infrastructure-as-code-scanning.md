---
title: Infrastructure as Code scanning
description: Set-up IaC scanning using STO
sidebar_label: Infrastructure as Code scanning - IaC
sidebar_position: 15
---
Infrastructure as Code (IaC) scanning is a security testing practice that analyzes IaC configurations to identify misconfigurations, security vulnerabilities, and compliance issues before deployment. By scanning IaC templates such as Terraform, CloudFormation, Kubernetes manifests, and other configuration files, teams can detect security risks early in the development process.

With Harness Security Testing Orchestration (STO), you can perform IaC scanning using [integrated scanners](#supported-scanners-for-iac). STO enhances the scanning process by normalizing results, deduplicating findings, and formatting them into actionable insights.

## Set up IaC Scanning with Harness STO
You can use any of the [integrated scanners](#supported-scanners-for-iac) that perform IaC scanning. Select any of the scanners below for detailed configuration steps.

### Supported Scanners for IaC
Below is the list of scanners supported for IaC in Harness STO:

import CustomScanners from '/docs/security-testing-orchestration/set-up-scans/shared/custom-step-scanners.md';

<CustomScanners />

If the scanner you use for IaC is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />