---
title: Container Scanning
description: Set-up Container scanning using STO
sidebar_label: Container Scanning
sidebar_position: 13
---

Container Scanning is a security testing practice that analyzes your container images for potential vulnerabilities. It is a critical step in identifying and addressing security risks early in the software development lifecycle (SDLC).

With Harness Security Testing Orchestration (STO), you can easily perform Container Scanning using a wide range of integrated scanners. STO also applies its own features, such as results normalization, deduplication of findings from various scanners, and formatting results to make them actionable.

## Setup Container Scanning with Harness STO

You can use any of the integrated scanners that perform Container Scanning, or you can leverage the Harness STO [Built-in Scanner workflow](/docs/category/built-in-scan-steps). The Built-in Scanner step enables you to set up scans without requiring paid licenses or complex configurations. To learn more about using the Built-in Scanner, refer to this documentation. Alternatively, you can follow the specific integration guides linked below for detailed configuration steps.

<DocVideo src="https://youtu.be/__42LZDVZIo?si=_jYgcj86q0aS7oJ-" />

### Supported Scanners for Container Scanning

Below is the list of supported scanners for Container Scanning in Harness STO:

- **[Anchore](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference)**
- **[Aqua Security](/docs/security-testing-orchestration/sto-techref-category/aquasec-scanner-reference)**
- **[Aqua Trivy](/docs/security-testing-orchestration/sto-techref-category/trivy/aqua-trivy-scanner-reference)**
- **[AWS ECR Scan](/docs/security-testing-orchestration/sto-techref-category/aws-ecr-scanner-reference)**
- **[Black Duck](/docs/security-testing-orchestration/sto-techref-category/black-duck-hub-scanner-reference)**
- **[Grype](/docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference)**
- **[OSV Scanner](/docs/security-testing-orchestration/sto-techref-category/osv-scanner-reference)**
- **[Prisma Cloud](/docs/security-testing-orchestration/sto-techref-category/prisma-cloud-scanner-reference)**
- **[Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference)**
- **[Sysdig](/docs/security-testing-orchestration/sto-techref-category/sysdig-scanner-reference)**

Besides these options, you can also use the Custom Scan step to perform Container Scanning. The Custom Scan step is helpful if none of the listed scanners meet your requirements.
