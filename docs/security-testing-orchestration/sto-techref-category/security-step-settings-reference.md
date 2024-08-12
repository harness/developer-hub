---
title: STO external scanner support and requirements
description: This topic lists supported scanners, ingestion methods, and requirements.
sidebar_position: 10
sidebar_label: External scanner support and requirements
helpdocs_topic_id: 0k0iubnzql
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

This section describes how to set up each of the external scanners supported by Harness STO.

For more information about STO support, go to [What's supported in STO](/docs/security-testing-orchestration/whats-supported).


### Scanner categories supported by STO

import StoSupportedCategories from './shared/_sto-supported-categories.md';

<StoSupportedCategories />

<!-- 
### Data ingestion methods supported by STO

import StoSupportedMethods from './shared/_sto-supported-methods.md';

<StoSupportedMethods />

The scanner, targets, and scan approach combinations are covered in the next section.

-->

### Scanners supported by STO

import StoSupportedScanners from './shared/_sto-supported-scanners.md';

<StoSupportedScanners />

###  Operating systems and architectures supported by STO

import StoInfraSupport from '/docs/security-testing-orchestration/sto-techref-category/shared/_supported-infrastructures.md';

<StoInfraSupport />


### Ingestion formats supported by STO

import StoSupportedFormats from './shared/_sto-supported-ingestion-formats.md';

<StoSupportedFormats />




### Docker-in-Docker requirements for STO

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />


### Root access requirements for STO

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />

<!-- 
### Scanner binaries used in STO container images

import StoSupportedBinaries from './shared/_sto-supported-binaries.md';

<StoSupportedBinaries />

-->


### Security steps and scanner templates in STO

The Step library includes a [**Custom Scan**](/docs/security-testing-orchestration/custom-scanning/custom-scan-reference) step for setting up scanners: open the step and configure the scan as a set of key/value pairs under **Settings**. 

Some scanners also have their own steps with simplified UIs that simplify the setup process.

<details>
<summary>Step Library with scanner-specific steps and <b>Custom Scan</b> step</summary>

![Step Library with scanner-specific steps and Custom Scan step](./static/security-steps-tab.png)

</details>

<details>
<summary><b>Custom Scan</b> step configuration</summary>

![Custom Scan step configuration](./static/config-scan-step.png)

</details>

<details>
<summary>Scanner-specific step configuration</summary>

![Scanner-specific step configuration](./static/sto-step-palette-example.png)

</details>
