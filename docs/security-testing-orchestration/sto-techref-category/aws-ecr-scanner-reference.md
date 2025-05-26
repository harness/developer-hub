---
title: AWS ECR step configuration
description: Scan container images with AWS ECR.
sidebar_label: AWS ECR step configuration
sidebar_position: 40
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<br/>
<br/>

You can scan your container images and extract scan results from [Amazon Elastic Container Registry (ECR)](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html). 

## Important notes for running AWS ECR scans in STO

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />


## AWS ECR step settings for STO scans

The recommended workflow is to add an AWS ECR step to a Security or Build stage and then configure it as described below.  


### Scan


#### Scan Mode

import StoSettingScanModeDataLoad from './shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';

<!-- StoSettingScanMode / -->
<StoSettingScanModeDataLoad />
<!-- StoSettingScanModeIngest / -->

#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

### Target


#### Type

import StoSettingScanTypeCont from './shared/step-palette/target/type/image.md';

<StoSettingScanTypeCont />


#### Target and Variant Detection  

import StoSettingScanTypeAutodetectContainer from './shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />



### Container image

#### Type  (_orchestration_)

import StoSettingImageType from './shared/step-palette/image/type.md';

<StoSettingImageType />



#### Domain (_extraction_)

import StoSettingImageDomain from './shared/step-palette/image/domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step-palette/image/name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step-palette/image/tag.md';

<StoSettingImageTag />


#### Region  

import StoSettingImageRegion from './shared/step-palette/image/region.md';

<StoSettingImageRegion />


### Authentication


#### Access ID (_orchestration_)

import StoSettingAuthAccessID from './shared/step-palette/auth/access-id.md';

<StoSettingAuthAccessID />


#### Access Token

import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />

#### Session Token

If you need to specify a session token, add it using the key `AWS_SESSION_TOKEN` under **Settings**.

![](./static/aws-ecr-session-token-setting.png)


#### Access Region

The AWS region of the image to scan. 






<!-- 
### Ingestion

#### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />

-->


### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from '/docs/security-testing-orchestration/sto-techref-category/shared/proxy-settings.md';

<ProxySettings />