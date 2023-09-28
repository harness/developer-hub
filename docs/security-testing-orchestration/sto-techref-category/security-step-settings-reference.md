---
title: Security Step Settings Reference
description: All the Scanner Provider settings for the Security step.
sidebar_position: 10
helpdocs_topic_id: 0k0iubnzql
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic includes the Security step settings for each of the scanner providers supported by Harness.


### Scanner categories

```mdx-code-block
import StoSupportedCategories from './shared/_sto-supported-categories.md';
```

<StoSupportedCategories />


### Data ingestion methods

```mdx-code-block
import StoSupportedMethods from './shared/_sto-supported-methods.md';
```

<StoSupportedMethods />

The scanner, targets, and scan approach combinations are covered in the next section.




### Harness STO scanner support

```mdx-code-block
import StoSupportedScanners from './shared/_sto-supported-scanners.md';
```

<StoSupportedScanners />

### Scanner binaries used in STO container images

```mdx-code-block
import StoSupportedBinaries from './shared/_sto-supported-binaries.md';
```

<StoSupportedBinaries />

### Docker-in-Docker requirements

```mdx-code-block
import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';
```

<StoDinDRequirements />

### Root access requirements

```mdx-code-block
import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';
```

<StoRootRequirements />

### Security steps and scanner templates

The Step library includes a **Security** step for setting up scanners: open the step and configure the scan as a set of key/value pairs under **Settings**. 

Some scanners also have *scanner templates* with UIs that simplify the process of setting up a scanner. 

<details><summary>Step Library with <b>Security</b> step and scanner templates</summary>

![tep Library with Security step and scanner templates](./static/security-steps-tab.png)

</details>

<details><summary><b>Security</b> step configuration</summary>

![Security step configuration](./static/security-step-settings-reference-00.png)

</details>

<details><summary>Scanner template configuration</summary>

![Scanner template configuration](./static/sto-step-palette-example.png)

</details>
