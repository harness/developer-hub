---
title: AWS ECR scanner reference for STO
description: Scan container images with AWS ECR.
sidebar_label: AWS ECR scanner reference
sidebar_position: 40
---

You can scan your container images using [Amazon Elastic Container Registry (ECR)](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html). 

## Important notes for running AWS ECR scans in STO

### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## AWS ECR step settings for STO scans

The recommended workflow is add an AWS ECR step to a Security Tests or CI Build stage and then configure it as described below.  


### Scan


#### Scan Mode

import StoSettingScanModeDataLoad from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<!-- StoSettingScanMode / -->
<StoSettingScanModeDataLoad />
<!-- StoSettingScanModeIngest / -->

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

#### Type  (_orchestration_)

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


#### Access ID (_orchestration_)

import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';

<StoSettingAuthAccessID />


#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />

#### Session Token

If you need to specify a session token, add it using the key `AWS_SESSION_TOKEN` under **Settings**.

![](./static/aws-ecr-session-token-setting.png)


#### Access Region

The AWS region of the image to scan. 






<!-- 
### Ingestion

#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

-->


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Fail on Severity

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

