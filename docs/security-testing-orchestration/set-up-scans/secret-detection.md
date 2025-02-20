---
title: Secret Detection
description: Set up scans to detect secrets
sidebar_label: Secret Detection
sidebar_position: 12
---

Secret Detection is a security testing practice that scans code repositories for exposed credentials, API keys, tokens, and other sensitive information. Detecting and addressing exposed secrets early helps prevent unauthorized access and security breaches.

With Harness Security Testing Orchestration (STO), you can perform Secret Detection using **[Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)**, which is the only scanner currently supported for this scan type. STO applies its security orchestration features, such as results normalization, deduplication, and formatting findings into actionable insights.

## Set up Secret Detection with Harness STO

You can configure secret detection in Harness STO using the supported scanner:

- **[Gitleaks](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)** – You can either integrate Gitleaks manually or use the [Built-in Scanner](./built-in-scanners) approach, which provides a pre-configured setup for running Gitleaks without additional configuration.

Because Gitleaks is open source, running it within Harness STO does not require a paid license. If you choose the Built-in Scanner, STO automatically handles the setup, allowing you to run Secret Detection without manual configuration.

If you need to use a different scanner for Secret Detection, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />