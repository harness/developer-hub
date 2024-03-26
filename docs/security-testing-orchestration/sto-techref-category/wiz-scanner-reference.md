---
title: Wiz scanner reference for STO
description: Scan code repositories and container images with Wiz scanner.
sidebar_label: Wiz scanner reference
sidebar_position: 415
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import StoDinDNoIntro from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step-setup.md';

You can scan your container images using [Wiz](https://www.wiz.io/), a cloud security platform that supports vulnerabiity scans. 

## Important notes for running Wiz scans in STO

- This integration is behind the feature flag `STO_STEP_PALETTE_WIZ`. Contact [Harness Support](mailto:support@harness.io) to enable it.  

- Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information. 

- If you want to add trusted certificates to your scan images at runtime, you need to run the scan step with root access. 

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## Basic setup

### Orchestration scans

The setup process for Kubernetes and Docker build infrastructures has a few additional steps and requirements. 

<Tabs>
  <TabItem value="h1" label="k8s/Docker" default>
   
   	<br/>

  #### Prerequisites

    - A [Kubernetes](#/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure/) or [Docker](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) build infrastructure

	- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) if your container registry requires an access ID and access token
	
	- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your `client-id` and `client-secret` shared by Wiz, if your registry requires authentication 

	<br/>

   #### Add a Docker-in-Docker background step

   This is required for orchestrated image scans on Kubernetes or Docker build infrastructures.

    <StoDinDNoIntro />

	<br/>

   #### Add the Wiz scanner

	Do the following:

	1. Add a CI Build or Security Tests stage to your pipeline.
	2. Add a Wiz step to the stage.

<br/>

   #### Set up the Wiz scanner
	
   ##### Required settings

		1. Scan mode = [Orchestration](#scan-mode)
		2. Target and Variant Detection = [Auto](#detect-target-and-variant)
		3. Container image: 
			1. [Type](#type-1)
			2. [Domain](#domain) — Required only if you're using a registry with a non-standard domain, such as a private registry 
			3. [Name](#name) — for example, `jsmith/myimage`
			4. [Tag](#name) — for example, `latest`
			5. Authentication — Required only if the registry requires authentication:
				1. [Registry access Id](#access-id) as a Harness secret
				2. [Registry access token](#access-token) as a Harness secret. This is your `client-secret` shared by Wiz.
		8. Authentication:
			1. [Wiz access ID](#access-id-1) as a Harness secret. This is your `client-id` shared by Wiz.
			2. [Wiz access token](#access-token) as a Harness secret. This is your `client-secret` shared by Wiz.
	
   ##### Optional settings

   - [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
   - [Log Level](#log-level) — Useful for debugging

  </TabItem>
  <TabItem value="h2" label="Harness Cloud">
    
   <br/>

  #### Prerequisites

	- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your Wiz access ID and access token
	
	- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your `client-id` and `client-secret` shared by Wiz, if your registry requires authentication 

   	<br/>
   #### Add the Wiz scanner

	Do the following:

	1. Add a CI Build or Security Tests stage to your pipeline.
	2. Add a Wiz step to the stage.

   	<br/>
   #### Set up the Wiz scanner
	
   ##### Required settings

		1. Scan mode = [Orchestration](#scan-mode)
		2. Target and Variant Detection = [Auto](#detect-target-and-variant)
		3. Container image: 
			1. [Type](#type-1)
			2. [Domain](#domain) — Required only if you're using a registry with a non-standard domain, such as a private registry 
			3. [Name](#name) — for example, `jsmith/myimage`
			4. [Tag](#name) — for example, `latest`
			5. Authentication — Required only if the registry requires authentication:
				1. [Registry access Id](#access-id) as a Harness secret. 
				2. [Registry access token](#access-token) as a Harness secret. 
		8. Authentication:
			1. [Wiz access ID](#access-id-1) as a Harness secret. This is your `client-id` shared by Wiz.
			2. [Wiz access token](#access-token) as a Harness secret. This is your `client-secret` shared by Wiz.
	
   ##### Optional settings

   - [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
   - [Log Level](#log-level) — Useful for debugging

  </TabItem>
</Tabs>

### Ingestion scans

:::note

Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information.

:::

   #### Add a shared path for your scan results

   	1. Add a CI Build or Security Tests stage to your pipeline.
	2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.



   #### Copy scan results to the shared path

   There are two primary workflows to do this:

   - Add a Run step that runs a Wiz scan from the command line and then copies the results to the shared path.
   - Copy results from a Wiz scan that ran outside the pipeline. 

   For more information and examples, go to [Ingestion scans](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).



   #### Set up the Wiz scanner

   Add a Wiz step to the stage and set it up as follows.
	
   ##### Required settings

	1. Scan mode = [Ingestion](#scan-mode)
	2. [Target name](#name) — Usually the image name, such as `jsmith/myimage`
	2. [Target variant](#name) — Usually the image tag, such as `latest`
	3. [Ingestion file](#ingestion-file) — For example, `/shared/scan_results/wiz-scan.json`

   ##### Optional settings

   - [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
   - [Log Level](#log-level) — Useful for debugging



## Wiz step settings reference

The recommended workflow is add a Wiz step to a Security Tests or CI Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<!-- For container images: -->

<StoSettingScanModeOrch /> 
<StoSettingScanModeIngest />

<!-- 
For code repositories:
<StoSettingScanModeIngest />

-->


<a name="scan-config"></a>

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

### Target


#### Type

import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';

<StoSettingScanTypeCont />


#### Detect target and variant 

<!-- import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md'; -->
import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<!-- StoSettingScanTypeAutodetectRepo/ -->
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />

### Container image


#### Type

import StoSettingImageType from './shared/step_palette/image/_type.md';

<StoSettingImageType />


#### Domain

import StoSettingImageDomain from './shared/step_palette/image/_domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step_palette/image/_name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step_palette/image/_tag.md';

<StoSettingImageTag />


#### Access ID

import StoSettingImageAccessID from './shared/step_palette/image/_access-id.md';

<StoSettingImageAccessID />


#### Access Token

import StoSettingImageAccessToken from './shared/step_palette/image/_access-token.md';

<StoSettingImageAccessToken />


### Ingestion

#### Ingestion File

:::note
Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information. 
:::

The path to your scan results when running an [Ingestion scan](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline), for example `/shared/scan_results/wiz.latest.json`.  

- The data file must be in a [supported format](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#supported-ingestion-formats) for the scanner.

- The data file must be accessible to the scan step. It's good practice to save your results files to a [shared path](/docs/continuous-integration/get-started/key-concepts#stages) in your stage. In the visual editor, go to the stage where you're running the scan. Then go to **Overview** > **Shared Paths**. You can also add the path to the YAML stage definition like this:  
  
  ```yaml
      - stage:
        spec:
          sharedPaths:
            - /shared/scan_results
  ``` 


### Authentication

#### Access ID

This is your `client-id` shared by Wiz.

#### Access Token

This is your `client-secret` shared by Wiz.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.my-access-token")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).



### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';

<StoSettingLogLevel />

:::caution

Passing CLI flags is an advanced feature. Some flags might not work in the context of STO. You should test your flags and arguments thoroughly before you use them in your production environment.  

:::

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

You can add more settings to the scan step as needed. 

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

