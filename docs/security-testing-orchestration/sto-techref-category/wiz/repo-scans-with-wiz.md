---
title: Code repository scans with Wiz
description: Scan code repositories with Wiz. Orchestration and Ingestion modes supported.
sidebar_label: Wiz code repository scanning
sidebar_position: 20
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import StoDinDNoIntro from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step-setup.md';


<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can easily set up a Wiz step to run automated scans in your Harness pipelines. This step scans the code repository you specify using the Wiz CLI. Then it correlates, deduplicates, and ingests the scan results into STO. You can see your scan results in the [Security Tests](/docs/security-testing-orchestration/dashboards/view-scan-results) tab of the pipeline execution.

## Important notes for running Wiz scans in STO

<!--  If you want to add trusted certificates to your scan images at runtime, you need to run the scan step with root access. -->

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your proxies using custom certificates. For more information, go to [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## Set-up workflows

<details>

<!-- 1 --------------------------------------------------------------------->

<summary>Orchestration scans for code repositories</summary>

  #### Prerequisites

    - You can run STO scans in [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), which requires no setup. You can also set up a [Kubernetes](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure/) or [Docker](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) build infrastructure.
	
	- [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your `client-id` and `client-secret` to authenticate with the Wiz CLI 

<br/>

   #### Add the Wiz scanner

	Do the following:

	1. Add a Build or Security stage to your pipeline.
	2. Add a Wiz step to the stage.

<br/>

   #### Set up the Wiz scanner
	
   ##### Required settings

		1. [Scan mode](#scan-mode) = **Orchestration**
      2. [Target type](#type) = **Repository**
		3. [Scan Configuration](#scan-configuration) = **Wiz Directory**
		4. [Target and Variant Detection](#detect-target-and-variant) = **Auto**
		5. Authentication:
			1. [Wiz access ID](#access-id-1) as a Harness secret. This is your `client-id` to authenticate with the Wiz CLI.
			2. [Wiz access token](#access-token) as a Harness secret. This is your `client-secret` to authenticate with the Wiz CLI.
	
   ##### Optional settings

   - [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
   - [Log Level](#log-level) — Useful for debugging

</details>


<!-- 2 --------------------------------------------------------------------->

<details>
<summary>Ingestion scans for code repositories</summary>

:::note

Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information.

:::

   #### Add a shared path for your scan results

   1. Add a Build or Security stage to your pipeline.
	2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.

   #### Copy scan results to the shared path

   There are two primary workflows to do this:

   - Add a Run step that runs a Wiz scan from the command line and then copies the results to the shared path.
   - Copy results from a Wiz scan that ran outside the pipeline. 

   For more information and examples, go to [Ingestion scans](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline).



   #### Set up the Wiz scanner

   Add a Wiz step to the stage and set it up as follows.
	
   ##### Required settings

	1. [Scan mode](#scan-mode) = **Ingestion**
	2. [Target type](#type) =  **Code Repository**
	3. [Target name](#name) — Usually the repo name
	4. [Target variant](#name) — Usually the scanned branch. You can also use a [runtime input](/docs/platform/variables-and-expressions/runtime-input-usage) and specify the branch at runtime.
	5. [Ingestion file](#ingestion-file) — For example, `/shared/scan_results/wiz-scan.json`
	6. Save the pipeline and select **Visual**. 

   ##### Optional settings

   - [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
   - [Log Level](#log-level) — Useful for debugging

</details>

<!-- --------------------------------------------------------------------->

## Wiz step settings reference

The recommended workflow is to add a Wiz step to a Security Tests or CI Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanModeOrch from '../shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from '../shared/step_palette/scan/mode/_ingestion.md';

<!-- For container images: -->

<StoSettingScanModeOrch /> 
<StoSettingScanModeIngest />

<!-- 
For code repositories:
<StoSettingScanModeIngest />

-->


<a name="scan-config"></a>

#### Scan Configuration

Select **Wiz Directory**.

### Target


#### Type

import StoSettingScanTypeRepo from '../shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and Variant Detection 

import StoSettingScanTypeAutodetectRepo from '../shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectNote from '../shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

The identifier for the [target](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines) such `codebaseAlpha`. Descriptive target names make it much easier to navigate your scan data in the STO UI.

It is good practice to [specify a baseline](/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines#every-target-needs-a-baseline) for every target. 


#### Variant

import StoSettingTargetVariant from '../shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from '../shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />


### Artifacts


#### Type

import StoSettingImageType from '../shared/step_palette/image/_type.md';

<StoSettingImageType />


#### Domain

import StoSettingImageDomain from '../shared/step_palette/image/_domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from '../shared/step_palette/image/_name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from '../shared/step_palette/image/_tag.md';

<StoSettingImageTag />


#### Access ID

import StoSettingImageAccessID from '../shared/step_palette/image/_access-id.md';

<StoSettingImageAccessID />


#### Access Token

import StoSettingImageAccessToken from '../shared/step_palette/image/_access-token.md';

<StoSettingImageAccessToken />


### Ingestion File

The path to your scan results when running an [Ingestion scan](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline), for example `/shared/scan_results/wiz.latest.json`.  

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

This is your `client-id` to authenticate with the Wiz CLI.

#### Access Token

This is your `client-secret` to authenticate with the Wiz CLI.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("my-access-token")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).



### Log Level

import StoSettingLogLevel from '../shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

import StoSettingCliFlags from '../shared/step_palette/all/_cli-flags.md';

<StoSettingCliFlags />

:::caution

Passing CLI flags is an advanced feature. Some flags might not work in the context of STO. You should test your flags and arguments thoroughly before you use them in your production environment.  

:::

### Fail on Severity

import StoSettingFailOnSeverity from '../shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

You can add more settings to the scan step as needed. 

### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## View Wiz policy failures

import WizPolicyFailureResults from '../shared/_wiz-policy-failure-results.md';

<WizPolicyFailureResults />