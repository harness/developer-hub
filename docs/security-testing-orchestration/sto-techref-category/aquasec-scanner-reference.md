---
title: Aqua Security scanner reference for STO
description: Image scans with Aqua Security
sidebar_label: Aqua Security scanner reference
sidebar_position: 35
---

You can ingest container-image scan results from [Aqua Security Enterprise](https://www.aquasec.com/solutions/docker-container-security/). 

## Important notes for running Aqua Security scans in STO


### Docker-in-Docker requirements

<!-- -->


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Aqua Security step settings for STO scans

The recommended workflow is add an Aqua Security step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


### Scan settings


<a name="scan-mode"></a>

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';

<StoSettingProductConfigName />


### Target Settings

<a name="target-type"></a>

#### Type

import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';

<StoSettingScanTypeCont />

<a name="target-name"></a>

#### Name 

import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />


### Container Image settings

 
<a name="container-type"></a>

#### Type

import StoSettingImageType from './shared/step_palette/_sto-ref-ui-image-type.md';

<StoSettingImageType />


<a name="container-domain"></a>

#### Domain (_extraction_)

import StoSettingImageDomain from './shared/step_palette/_sto-ref-ui-image-domain.md';

<StoSettingImageDomain />


<a name="container-name"></a>

#### Name

import StoSettingImageName from './shared/step_palette/_sto-ref-ui-image-name.md';

<StoSettingImageName />


<a name="container-tag"></a>

#### Tag

import StoSettingImageTag from './shared/step_palette/_sto-ref-ui-image-tag.md';

<StoSettingImageTag />

<a name="container-region"></a>

#### Region  

import StoSettingImageRegion from './shared/step_palette/_sto-ref-ui-image-region.md';

<StoSettingImageRegion />


### Authentication settings

<a name="auth-access-id"></a>

#### Access ID 

import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';

<StoSettingAuthAccessID />


<a name="auth-access-token"></a>

#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';

<StoSettingAuthAccessToken />


#### Access Region

<a name="auth-access-token"></a>

The AWS region of the image to scan.

<!-- ============================================================================= -->


### Ingestion settings


<a name="ingestion-file"></a>

#### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';


<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />

<a name="cli-flags"></a>



#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />

<!-- 

### Settings

TBD

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
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)

<!-- 
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

import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';



<StoSettingFailOnSeverity />

-->
