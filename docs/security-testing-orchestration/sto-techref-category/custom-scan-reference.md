---
title: Custom Scan step reference for STO
description: Set up scans using key-value pairs.
sidebar_label: Custom Scan step reference
sidebar_position: 135
---

The Custom Step step enables you to configure supported scanners that don't yet have their own dedicated step in the Harness Step Library.

<details>

<summary>Supported scanners that use a Custom Ingest step</summary>

- [Clair](/docs/security-testing-orchestration/sto-techref-category/clair-scanner-reference)
- [Data Theorem](/docs/security-testing-orchestration/sto-techref-category/data-theorem-scanner-reference)
- [Docker Content Trust](/docs/security-testing-orchestration/sto-techref-category/docker-content-trust-dct-scanner-reference)
- [Fortify Static Code Analyzer](/docs/security-testing-orchestration/sto-techref-category/fortify-scanner-reference)
- [Fortify on Demand](/docs/security-testing-orchestration/sto-techref-category/fortify-on-demand-scanner-reference)
- [HCL AppScan](/docs/security-testing-orchestration/sto-techref-category/hql-appscan-scanner-reference)
- [Metasploit](/docs/security-testing-orchestration/sto-techref-category/metasploit-scanner-reference)
- [Nessus](/docs/security-testing-orchestration/sto-techref-category/nessus-scanner-reference)
- [Nexus](/docs/security-testing-orchestration/sto-techref-category/nexus-scanner-reference)
- [OpenVAS](/docs/security-testing-orchestration/sto-techref-category/openvas-scanner-reference)
- [Qualys Web Application Scanning](/docs/security-testing-orchestration/sto-techref-category/qualys-web-app-scanner-reference)
- [Qwiet AI (formerly ShiftLeft)](/docs/security-testing-orchestration/sto-techref-category/qwiet-scanner-reference)
- [Reapsaw](/docs/security-testing-orchestration/sto-techref-category/reapsaw-scanner-reference)
- [ScoutSuite](/docs/security-testing-orchestration/sto-techref-category/scoutsuite-scanner-reference) 
- [Tenable](/docs/security-testing-orchestration/sto-techref-category/tenable-scanner-reference)
- [Veracode](/docs/security-testing-orchestration/sto-techref-category/veracode-scanner-reference)
- [JFrog Xray](/docs/security-testing-orchestration/sto-techref-category/xray-scanner-reference)

</details>

## Important notes for Custom Scan steps

- To configure a Custom Scan step, you add a set of key-value pairs in the **Settings** field. The key and value strings you need to specify, such as `product_name` and `orchestratedScan`, are case-sensitive. 
- You need to [add a Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#docker-in-docker-requirements-for-sto) if you're running an `orchestratedScan` or `dataLoad` scan in a Kubernetes or Docker build infrastructure. 
- You need to run the [Custom Scan step with root access](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#root-access-requirements-for-sto) if you need to run a Docker-in-Docker step, or if you need to add trusted certificates to your scan images at runtime. 
- The following topics contain useful information for setting up scanner integrations in STO:
  - [What's supported in STO](/docs/security-testing-orchestration/whats-supported)
  - [Security Testing Orchestration FAQs](/docs/faqs/security-testing-orchestration)
  - [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines)


## Custom Scan settings reference

### Scanner-specific settings

The following settings are required for most scanners. For more information, go to the reference for the specific scanner you're setting up.

- `product_name`
- `scan_type`
- `policy_type`
- `product_config_name`


### Target and variant

import CustomScanTargetVariant from './shared/custom-scan/_target-variant.md';

<CustomScanTargetVariant />

### Code repositories 

import CustomScanRepo from './shared/custom-scan/_repo.md';

<CustomScanRepo />

### Container images 

import CustomScanContainer from './shared/custom-scan/_container.md';

<CustomScanContainer />

### Application instances 

import CustomScanAppInstance from './shared/custom-scan/_dast.md';

<CustomScanAppInstance />

### Ingestion file

import CustomScanIngest from './shared/custom-scan/_ingestion-file.md';

<CustomScanIngest />

### Fail on Severity

import CustomScanFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<CustomScanFailOnSeverity />


## Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


## Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

