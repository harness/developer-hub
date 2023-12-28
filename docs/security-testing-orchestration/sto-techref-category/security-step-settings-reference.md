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


### Scanner categories


import StoSupportedCategories from './shared/_sto-supported-categories.md';


<StoSupportedCategories />


### Data ingestion methods


import StoSupportedMethods from './shared/_sto-supported-methods.md';


<StoSupportedMethods />

The scanner, targets, and scan approach combinations are covered in the next section.




### Harness STO scanner support


import StoSupportedScanners from './shared/_sto-supported-scanners.md';


<StoSupportedScanners />

### Scanner binaries used in STO container images


import StoSupportedBinaries from './shared/_sto-supported-binaries.md';


<StoSupportedBinaries />

### Supported ingestion formats


import StoSupportedFormats from './shared/_sto-supported-ingestion-formats.md';


<StoSupportedFormats />

### Docker-in-Docker requirements for STO


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements for STO


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### Security steps and scanner templates in STO

The Step library includes a **Security** step for setting up scanners: open the step and configure the scan as a set of key/value pairs under **Settings**. 

Some scanners also have *scanner templates* with UIs that simplify the process of setting up a scanner.

<details>
<summary>Step Library with <b>Security</b> step and scanner templates</summary>

![tep Library with Security step and scanner templates](./static/security-steps-tab.png)

</details>

<details>
<summary><b>Security</b> step configuration</summary>

![Security step configuration](./static/security-step-settings-reference-00.png)

</details>

<details>
<summary>Scanner template configuration</summary>

![Scanner template configuration](./static/sto-step-palette-example.png)

</details>
