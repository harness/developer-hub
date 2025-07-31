---
title: Supported Security Scanners
description: Supported scanners in STO
sidebar_label: Security scanners
sidebar_position: 02
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness STO supports over 40 security scanners, they are categorized as follows:

- **[Harness Security Scanners](#harness-security-scanners)**: Scanners developed, maintained, and fully supported by Harness
- **[Third-Party Scanners](#third-party-scanners)**:  External commercial or open-source scanners integrated with the Harness platform, not developed or directly maintained by Harness.
    - **Open-Source Scanners**: A subset of third-party scanners that are open-source.
- **[Built-in Scanner Steps](/docs/security-testing-orchestration/set-up-scans/built-in-scanners)**:  Harness-provided scanner steps using pre-configured open-source scanners. These are ready-to-use within Harness pipelines and do not require additional commercial licenses. For a complete guide, refer to [Built-in Scanners](/docs/security-testing-orchestration/set-up-scans/built-in-scanners).

For a comprehensive list of all scanners, you can view them by **[Scan Type](#third-party-scanners)** or **[Target Type](#third-party-scanners)** further down this page.

### Harness Security Scanners
Harness is expanding its native security scanning capabilities. These scanners are developed and maintained directly by Harness.

- **[API DAST](/docs/security-testing-orchestration/sto-techref-category/traceable-step-configuration)** (*previously Traceable*): A Dynamic Application Security Testing scanner for your APIs. This was formerly known as the **Traceable API DAST** scanner.

### Third-Party Scanners
The following are the list of third-party scanners that are categorized by **Scan Type** and **Target Type**. The list includes both commercial and open-source scanners.

<Tabs queryString="view-by">

<TabItem value="scan-type" label="Scan Type" default>

Here are the list of scanners supported by STO by scan type.

- [Static Application Security Testing - SAST Scanners](#static-application-security-testing---sast-scanners)
- [Secret Detection Scanners](#secret-detection-scanners)
- [Software Composition Analysis - SCA Scanners](#software-composition-analysis---sca-scanners)
- [Container Scanners](#container-scanners)
- [Dynamic Application Security Testing - DAST Scanners](#dynamic-application-security-testing---dast-scanners)
- [Infrastructure as Code - IaC Scanners](#infrastructure-as-code---iac-scanners)

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).

### Static Application Security Testing - SAST Scanners
Static Application Security Testing (SAST) is a security testing practice that analyzes source code for potential vulnerabilities without executing the application. To configure and run SAST scans, refer [Static Application Security Testing documentation](/docs/security-testing-orchestration/set-up-scans/static-application-security-testing).

import SASTScanners from '/docs/security-testing-orchestration/set-up-scans/shared/sast-scanners.md';

<SASTScanners />

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).


### Secret Detection Scanners
Secret Detection is a security testing practice that scans code repositories for exposed credentials, API keys, tokens, and other sensitive information. To configure and run secret detection scans, refer Secret Detection documentation.

import SecretScanners from '/docs/security-testing-orchestration/set-up-scans/shared/secret-scanners.md';

<SecretScanners />

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).


### Software Composition Analysis - SCA Scanners
Software Composition Analysis (SCA) is a security testing practice that identifies vulnerabilities in open-source dependencies and third-party libraries used in your applications. To configure and run SCA scans, refer [Software Composition Analysis documentation](/docs/security-testing-orchestration/set-up-scans/software-composition-analysis).

import SCAScanners from '/docs/security-testing-orchestration/set-up-scans/shared/sca-scanners.md';

<SCAScanners />

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).


### Container Scanners
Container Scanning is a security testing practice that analyzes your container images for potential vulnerabilities. To configure and run container scans, refer [Container Scanning documentation](/docs/security-testing-orchestration/set-up-scans/container-scanning).


import ContainerScanners from '/docs/security-testing-orchestration/set-up-scans/shared/container-scanners.md';

<ContainerScanners />

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).


### Dynamic Application Security Testing - DAST Scanners

Dynamic Application Security Testing (DAST) is a security testing practice that identifies vulnerabilities in running applications by simulating real-world attacks. To configure and run DAST scans, refer [Dynamic Application Security Testing documentation](/docs/security-testing-orchestration/set-up-scans/dynamic-application-security-testing).


import DASTScanners from '/docs/security-testing-orchestration/set-up-scans/shared/dast-scanners.md';

<DASTScanners />

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).

### Infrastructure as Code - IaC Scanners
Infrastructure as Code (IaC) scanning is a security testing practice that analyzes IaC configurations to identify misconfigurations, security vulnerabilities, and compliance issues before deployment. To configure and run IaC scans, refer [Infrastructure as Code documentation](/docs/security-testing-orchestration/set-up-scans/infrastructure-as-code-scanning).


import IacScanners from '/docs/security-testing-orchestration/set-up-scans/shared/iac-scanners.md';

<IacScanners />

In addition to the listed supported scanners, the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) allows the use of various other scanners. For a complete list of supported scanners, refer to [Scanners Supported with Custom Scan Step](#scanners-supported-with-custom-scan-step).

---

</TabItem>

<TabItem value="target-type" label="Target Type">

import StoSupportedScanners from '/docs/security-testing-orchestration/sto-techref-category/shared/sto-supported-scanners.md';

<StoSupportedScanners />



---
</TabItem>

</Tabs>


### Scanners supported with Custom Scan step

The following scanners do not have a dedicated step in STO, but they can be used through the [Custom Scan step](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference).

import CustomScanners from '/docs/security-testing-orchestration/set-up-scans/shared/custom-step-scanners.md';

<CustomScanners />

If you are looking for scanners that are not available as steps or are not supported through the [Custom Scan](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) step, you can use the **Custom Ingest** step to import scan results into STO. For detailed instructions, see [Ingest results from unsupported scanners](/docs/security-testing-orchestration/custom-scanning/ingesting-issues-from-other-scanners)

## Supported ingestion formats

Here are the scanners that support ingestion scan mode in STO and the data format each scanner expects for ingestion into STO.

import StoSupportedFormats from '/docs/security-testing-orchestration/sto-techref-category/shared/sto-supported-ingestion-formats.md';


<StoSupportedFormats />

