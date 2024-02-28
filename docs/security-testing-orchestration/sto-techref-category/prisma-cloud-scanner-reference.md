---
title: Prisma Cloud (formerly Twistlock) scanner reference for STO
description: Scan container images with Prisma Cloud.
sidebar_label: Prisma Cloud (formerly Twistlock) scanner reference
sidebar_position: 300
---

You can scan container images and ingest results from Prisma Cloud (formerly Twistlock).

## Important notes for running Prisma Cloud scans in STO


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Prisma Cloud step settings for STO

The recommended workflow is add a PrismaCloud step to a Security Tests or CI Build stage and then configure it as described below. You can also configure Prisma Cloud scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration).


### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch  from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanType from './shared/step_palette/scan/_type.md';
import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';
import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';


<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


<!-- #### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/       -->


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />

#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Container Image 


<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type 


import StoSettingImageType from './shared/step_palette/image/_type.md';



<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain 



import StoSettingImageDomain from './shared/step_palette/image/_domain.md';



<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name


import StoSettingImageName from './shared/step_palette/image/_name.md';



<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag


import StoSettingImageTag from './shared/step_palette/image/_tag.md';



<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id


import StoSettingImageAccessID from './shared/step_palette/image/_access-id.md';



<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 


import StoSettingImageAccessToken from './shared/step_palette/image/_access-token.md';



<StoSettingImageAccessToken />


### Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain 

import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';


<StoSettingAuthDomain />

#### Access ID


import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';



<StoSettingAuthAccessID />

<!-- ============================================================================= -->
<a name="auth-access-token"></a>

#### Access Token


import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';




<StoSettingAuthAccessToken />

### Scan Tool

#### Image Name

For Extraction scans, the name of the image that you want to extract from Prisma Cloud. 

### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';


<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags


import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';


<StoSettingCliFlags />

For example, the following argument prevents the scan from publishing results to the Console:  `--publish FALSE`.


#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

<!-- 
### Settings

You can add a `tool_args` setting to run the [twistcli images scan binary](https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin-compute/tools/twistcli_scan_images#) with specific command-line arguments. For example, you can prevent the scan from publishing results to the Console like this:  `tool_args` : `--publish FALSE`.

-->

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)


<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for Prisma Cloud scans in STO (legacy)

:::note
You can set up Prisma Cloud scans using a Security step, but this is a legacy functionality. Harness recommends that you use a [Prisma Cloud step](#prisma-cloud-scan-settings) instead.
:::

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Prisma Cloud scan settings

* `product_name` = `twistlock`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) :  `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_image_name`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
* `product_config_name`
	+ Accepted values(s):
		- `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Container image scan settings


import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';


<StoLegacyContainer />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

-->