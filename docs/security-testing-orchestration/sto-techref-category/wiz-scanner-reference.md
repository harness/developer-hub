---
title: Wiz scanner reference for STO
description: Scan code repositories and container images with Wiz scanner.
sidebar_label: Wiz scanner reference
sidebar_position: 415
---


You can scan your repositories and container images using Wiz, a comprehensive and versatile open-source scanner. 

## Important notes for running Wiz scans in STO

### Publish to JSON

Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information. 


### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Wiz step settings for STO scans

The recommended workflow is add a BlackDuck step to a Security Tests or CI Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

For container images: 
<StoSettingScanModeOrch /> 
<StoSettingScanModeIngest />

For code repositories:
<StoSettingScanModeIngest />


<a name="scan-config"></a>

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

### Target


#### Type

import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';
import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';

<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Detect target and variant 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
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


### Ingestion


#### Ingestion File


:::note
Harness STO can ingest both JSON and SARIF data from Wiz, but Harness recommends publishing to JSON because this format includes more detailed information. 
:::

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

### Authentication

#### Domain

import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';

<StoSettingAuthDomain />


#### Enforce SSL

import StoSettingProductSSL from './shared/step_palette/auth/_ssl.md';

<StoSettingProductSSL />


#### API Version

import StoSettingApiVersion from './shared/step_palette/auth/_api-version.md';

<StoSettingApiVersion />


#### Type

import StoSettingAuthType from './shared/step_palette/auth/_type.md';

<StoSettingAuthType />


<!-- 

#### Access ID (_orchestration_)

import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';

<StoSettingAuthAccessID />

-->


#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />



### Scan Tool

#### Project Name

import StoSettingToolProjectName from './shared/step_palette/tool/project/_name.md';

<StoSettingToolProjectName />

#### Project Version

import StoSettingToolProjectVersion from './shared/step_palette/tool/project/_version.md';

<StoSettingToolProjectVersion />


### Log Level, CLI flags, and Fail on Severity


#### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />

#### Additional CLI flags

You can configure the [synopsis detect scanner](https://blackducksoftware.github.io/synopsys-detect) with specific command-line arguments. 

For example, to [exclude some detectors from a scan](https://community.synopsys.com/s/article/Allow-only-certain-Detect-tools-to-take-effect), you can add this string: `-detect.tools.excluded {DETECTOR, SIGNATURE}`


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

You can add more settings to the scan step as needed. 

If you want to add a CLI argument to the [synopsis detect scanner](https://blackducksoftware.github.io/synopsys-detect), use the [Additional CLI arguments](#additional-cli-flags) field.

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



<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for Wiz scans in STO (legacy)

:::note
You can set up Wiz scans using a Security step, but this is a legacy functionality. Harness recommends that you use a [Wiz step](#black-duck-hub-step-settings-for-sto-scans) instead.
:::

#### Target and variant

import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';

<StoLegacyTargetAndVariant />

#### Wiz scan settings

* `product_name` = `blackduckhub`
* `product_config_name` = `default`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `repository` or `container`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan` , `ingestionOnly`, or `dataLoad`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `product_domain`
	+ `product_auth_type` : `usernamePassword` | `apiKey`
	+ `product_access_id`: API username
	+ `product_access_token` API password or API key
	+ `product_api_version`
	+ `product_project_name`
	+ `product_project_version`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).


#### Container image scan settings

import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';

<StoLegacyContainer />


import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';

<StoLegacyRepo />

#### Ingestion file

import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';

<StoLegacyIngest />

-->