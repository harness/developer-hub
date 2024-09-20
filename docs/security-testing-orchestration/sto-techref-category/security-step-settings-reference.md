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


## Scanner categories supported by STO

import StoSupportedCategories from './shared/_sto-supported-categories.md';

<StoSupportedCategories />

<!-- 
### Data ingestion methods supported by STO

import StoSupportedMethods from './shared/_sto-supported-methods.md';

<StoSupportedMethods />

The scanner, targets, and scan approach combinations are covered in the next section.

-->

## Scanners supported by STO

import StoSupportedScanners from './shared/_sto-supported-scanners.md';

<StoSupportedScanners />

##  Operating systems and architectures supported by STO

import StoInfraSupport from '/docs/security-testing-orchestration/sto-techref-category/shared/_supported-infrastructures.md';

<StoInfraSupport />


## Ingestion formats supported by STO

import StoSupportedFormats from './shared/_sto-supported-ingestion-formats.md';

<StoSupportedFormats />



## DinD and without-DinD flows in STO

STO supports two primary container scanning workflows, **Docker-in-Docker (DinD)** and **without-Docker-in-Docker**. In most cases, Docker-in-Docker (DinD) is no longer required, but it remains an option for certain use cases or specific scanner types. You can understand both flows and choose the right one based on your use case and scanner compatibility

### Docker-in-Docker(DinD) flow in STO

You should use Docker-in-Docker if:
- Your scanner requires Docker access to perform operations inside a container.
- You're using a **Custom Scan** step or **DataLoad/OrchestratedScan** scan modes that depend on Docker functionality.
- Your scanner does not support [without-DinD scanning](#scanners-that-support-without-dind-flow) (see the table below).

:::info
STO will automatically attempt to use the [Without-DinD flow](#without-docker-in-docker-flow-in-sto) if it does not detect a Docker socket (`/var/run/docker.sock`).
:::

#### Configuring Docker-in-Docker (DinD) for your pipeline

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step-setup.md';

<StoDinDRequirements />

For Orchestrated and Extraction scans, you might want to increase the resource limits for your Docker-in-Docker background step. This can speed up your scan times, especially for large scans. For more information, go to [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines).

If you want to force STO to use Docker-in-Docker (DinD), set the following variable in the **Settings** section of your step configuration (optional):

- `docker_mode`: `docker-in-docker`

This setting is optional and only needed if you want force the STO to use a specific mode. By default, STO will automatically choose the appropriate mode based on your environment.

### Without-Docker-in-Docker flow in STO

You should use without-Docker-in-Docker if:

- Your environment doesn’t have or doesn’t need Docker access.
- You’re using scanners that support [Without-DinD scanning](#scanners-that-support-without-dind-flow) (see the table below).
- You want a simplified configuration with less security overhead (since privileged mode is not required in the Without-DinD flow).

For configuration, STO will automatically attempt to use the Without-DinD flow if it does not detect a Docker socket(`/var/run/docker.sock`), you won’t need to configure anything.

If you want to force STO to use Without Docker-in-Docker flow, set the following variable in the **Settings** section of your step configuration (optional):

- `docker_mode`: `without-docker-in-docker`

This setting is optional and only needed if you want force the STO to use a specific mode. By default, STO will automatically choose the appropriate mode based on your environment.


### Scanners that support Without-DinD flow
<details>
<summary>Without-DinD supported scanners</summary>

import WithoutDinDSupportedScanners from '/docs/security-testing-orchestration/sto-techref-category/shared/_without-dind-supported-scanners.md';

<WithoutDinDSupportedScanners />

</details>

## Root access requirements for STO

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />

<!-- 
### Scanner binaries used in STO container images

import StoSupportedBinaries from './shared/_sto-supported-binaries.md';

<StoSupportedBinaries />

-->


## Security steps and scanner templates in STO

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
