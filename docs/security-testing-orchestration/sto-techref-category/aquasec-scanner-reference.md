---
title: Aqua Security scanner reference for STO
description: Scan container images with Aqua Security.
sidebar_label: Aqua Security scanner reference
sidebar_position: 25
---

You can ingest container-image scan results from [Aqua Security Enterprise](https://www.aquasec.com/solutions/docker-container-security/). 

The Aqua Security step can also ingest assurance policy violations. These violations appear as INFO-level issues in [**Security Tests**](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/view-scan-results).

<DocImage path={require('./static/sto-7164-aquasec-external-policies.png')} width="70%" height="70%" title="Select policy sample" />



## Important notes for running Aqua Security scans in STO


### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Aqua Security step settings for STO scans

The recommended workflow is add an Aqua Security step to a Security Tests or CI Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeCont from './shared/step_palette/target/type/_image.md';

<StoSettingScanTypeCont />


#### Detect target and variant 

import StoSettingScanTypeAutodetectContainer from './shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>       


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Container image


#### Type

import StoSettingImageType from './shared/step_palette/image/_type.md';

<StoSettingImageType />


#### Domain (_extraction_)

import StoSettingImageDomain from './shared/step_palette/image/_domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step_palette/image/_name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step_palette/image/_tag.md';

<StoSettingImageTag />


#### Region  

import StoSettingImageRegion from './shared/step_palette/image/_region.md';

<StoSettingImageRegion />


### Authentication


#### Access Domain

import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';

<StoSettingAuthDomain />


#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />

#### Access Region

The AWS region of the image to scan.


### Ingestion


#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity


#### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


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


## Security step settings for Aqua Security scans in STO (legacy)

* `product_name` = `aqua security`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =`containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)= `ingestionOnly`
* `product_config_name` =`default`
* `container_project` = The name of the scanned ECR container with the results you want to ingest.
* `container_tag` = The container tag for the given container project.
* `configuration_access_id` = Your AWS Access ID secret
* `configuration_access_token` = Your AWS Access Token secret
* `configuration_region` = The AWS region where the container is located. For example, `us-east-1`
* `container_domain` = URI of the ECR container with the scan results you want to load.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />


### Container settings



import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';



<StoLegacyContainer />

### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';



<StoLegacyIngest />

###  Fail on Severity

<!--

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';




<StoSettingFailOnSeverity />

-->
