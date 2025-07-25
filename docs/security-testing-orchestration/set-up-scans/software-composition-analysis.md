---
title: Software Composition Analysis - SCA
description: Setup SCA scan with Harness STO
sidebar_label: Software Composition Analysis - SCA
sidebar_position: 12
---

Software Composition Analysis (SCA) is a security testing practice that identifies vulnerabilities in open-source dependencies and third-party libraries used in your applications. It ensures that your software is free from known risks, enabling you to manage the security and compliance of external components effectively.

With Harness Security Testing Orchestration (STO), you can seamlessly perform SCA using a wide range of [integrated scanners](#supported-scanners-for-sca). STO also applies its own features, such as results normalization, deduplication of findings from various scanners, and formatting results to make them actionable.

## Set up SCA with Harness STO

You can use any of the [integrated scanners](#supported-scanners-for-sca) that perform SCA scanning, or you can leverage the Harness STO [Built-in Scanner workflow](/docs/security-testing-orchestration/set-up-scans/built-in-scanners). The Built-in Scanner step enables you to set up scans without requiring paid licenses or complex configurations. Currently, the Built-in Scanner uses [OWASP Dependency Check](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference) and [OSV](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference). Alternatively, you can select any of the supported scanners for detailed configuration steps.

<DocVideo src="https://youtu.be/xLftLnsylF8?si=xdXfJCWRPofpo2UH" />

### Supported Scanners for SCA

Below is the list of supported SCA scanners in Harness STO

import SCAScanners from '/docs/security-testing-orchestration/set-up-scans/shared/sca-scanners.md';

<SCAScanners />

If the scanner you use for SCA is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />