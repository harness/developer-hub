---
title: Container Scanning
description: Set up Container scanning using STO
sidebar_label: Container Scanning
sidebar_position: 13
---

Container Scanning is a security testing practice that analyzes your container images for potential vulnerabilities. It is a critical step in identifying and addressing security risks early in the software development lifecycle (SDLC).

With Harness Security Testing Orchestration (STO), easily perform container scanning using a wide range of [integrated scanners](#supported-scanners-for-container-scanning). STO also applies its own features, such as results normalization, deduplication of findings from various scanners, and formatting results to make them actionable.

## Set up Container Scanning with Harness STO

You can use any of the [integrated scanners](#supported-scanners-for-container-scanning) that perform Container Scanning, or you can leverage the Harness STO [Built-in Scanner workflow](/docs/security-testing-orchestration/set-up-scans/built-in-scanners). The Built-in Scanner step enables you to set up scans without requiring paid licenses or complex configurations. Alternatively, select any scanner from the list below for detailed configuration steps.

<DocVideo src="https://youtu.be/__42LZDVZIo?si=_jYgcj86q0aS7oJ-" />

### Supported Scanners for Container Scanning

Below is the list of supported scanners for Container Scanning in Harness STO:

import ContainerScanners from '/docs/security-testing-orchestration/set-up-scans/shared/container-scanners.md';

<ContainerScanners />

If the scanner you use for container scanning is not listed, you can explore additional [scanners](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) that are compatible with the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference). If the Custom Scan step does not support the scanner you need, you can use the [Custom Ingestion](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step to ingest and process your scan results.

## Next steps  

import ScanTypeNextSteps from '/docs/security-testing-orchestration/set-up-scans/shared/next-steps-for-scan-types.md';

<ScanTypeNextSteps />