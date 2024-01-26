---
title: Zed Attack Proxy (ZAP) scanner reference for STO
description: Scan application instances with ​Zed Attack Proxy (ZAP).
sidebar_label: Zed Attack Proxy (ZAP) scanner reference
sidebar_position: 430
helpdocs_topic_id: m9494vxwac
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

[Zed Attack Proxy (ZAP)](https://www.zaproxy.org) is a free, open-source penetration tool for testing web applications. ZAP runs as a “man-in-the-middle proxy” between the tester’s browser and the web app. You can use ZAP to run penetration testing to simulate a malicious external attack and use the results to protect your app from unauthorized access and denial-of-service attacks.

For an example workflow, go to the [DAST app scans using Zed Attack Proxy (ZAP)](/tutorials/security-tests/dast-scan-zap) tutorial.

## Important notes for running ZAP scans in STO

 If you're running a ZAP scan that uses context files such as auth scripts, context files, or URL files, specify the following shared folders and make sure that your Run step copies in the required files. 

  * **/shared/customer_artifacts/authScript/`<artifact_file_name>`**
  * **/shared/customer_artifacts/context/`<artifact_file_name>`**
  * **/shared/customer_artifacts/urlFile/`<artifact_file_name>`**
  * **/shared/customer_artifacts/hosts/`<artifact_file_name>`**



### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

### Root access requirements

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## ZAP step settings for STO scans

The recommended workflow is add a ZAP step to a Security Tests or CI Build stage and then configure it as described below. 

### Scan settings

<a name="scan-mode"></a>

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch  from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

The following options are supported for Zap scans:

-  **Default** 

-  **Standard** `scanMode` = [`active`](https://www.zaproxy.org/docs/desktop/start/features/ascan/), `scanType` = [`standard`](https://www.zaproxy.org/docs/desktop/start/features/modes/)

-  **Attack**  `scanMode` = [`active`](https://www.zaproxy.org/docs/desktop/start/features/ascan/), `scanType` = [`attack`](https://www.zaproxy.org/docs/desktop/start/features/modes/)

-  **Quick**  `scanMode` = [`active`](https://www.zaproxy.org/docs/desktop/start/features/ascan/), `scanType` = [`standard`](https://www.zaproxy.org/docs/desktop/start/features/modes/),  `quickMode` = `true` 

   When Quick mode is enabled, the [Maximum depth to crawl](https://www.zaproxy.org/docs/desktop/addons/spider/options/#maximum-depth-to-crawl) is set to 1.

### Target settings

#### Type

import StoSettingScanTypeInst     from './shared/step_palette/target/type/_app.md';

<StoSettingScanTypeInst />

#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />

#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';


<StoSettingTargetVariant  />

#### Workspace

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';


<StoSettingTargetWorkspace  />


### Instance settings

#### Domain

import StoSettingInstanceDomain from './shared/step_palette/instance/_domain.md';


<StoSettingInstanceDomain />

#### Protocol

import StoSettingInstanceProtocol from './shared/step_palette/instance/_protocol.md';


<StoSettingInstanceProtocol />

#### Port

import StoSettingInstancePort from './shared/step_palette/instance/_port.md';


<StoSettingInstancePort />

#### Path

import StoSettingInstancePath from './shared/step_palette/instance/_path.md';


<StoSettingInstancePath />

### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';


<StoSettingIngestionFile  />

### Log Level, CLI flags, and Fail on Severity

#### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';


<StoSettingLogLevel />

#### Additional CLI flags

import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';


<StoSettingCliFlags />


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


#### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)


## Security step settings for ZAP scans in STO (legacy)

:::note
You can set up Zap scans using a Security step, but this is a legacy functionality. Harness recommends that you use an [Zap step](#zap-step-settings-for-sto-scans) instead.
:::

#### Scan policy types

STO supports the following scan policy types for ZAP:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is easier to set up and supports scans with default or predefined settings.
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md).

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### ZAP scan settings

* `product_name` = `zap`
* `scan_type` = `instance`
* `product_config_name`— Specify one of the following:
	+ `standard` (scanMode = active, scanType = standard)
	+ `attack`(scanMode = active, scanType = attack)
	+ `quick`(scanMode = active, scanType = standard, quickMode = true)
* `instance_identifier`— The target Id that will appear in the **Test Targets** page of the Harness UI.
* `instance_environment` — The instance environment, such as `dev`, `qa`, `pre-qa`, or `prod`.
* `instance_domain` — The app domain to scan, for example `public-firing-range.appspot.com/`
* `instance_protocol` — The protocol of the site to scan. Generally this is `http` or `https`.
* `instance_type` = `website`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Optional settings for ZAP scans

* `instance_path` — Specify if the app URL includes a path beyond the domain. If you want to scan `https://app.my-domain.com/myModule/myApp`, the instance path is `myModule/myApp`.
* `instance_port` — Specify if the site is accessed using a non-default port.

#### Ingestion settings


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />