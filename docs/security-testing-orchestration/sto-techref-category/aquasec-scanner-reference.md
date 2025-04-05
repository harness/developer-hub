---
title: Aqua Security step configuration
description: Scan container images with Aqua Security.
sidebar_label: Aqua Security step configuration
sidebar_position: 25
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<!-- DocsTag  text="Orchestration" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/orchestrate-and-ingest/ingestion-workflows/ingest-scan-results-into-an-sto-pipeline/" / -->
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>


You can scan your container images and ingest scan results from [Aqua Security Enterprise](https://www.aquasec.com/solutions/docker-container-security/). 


## Important notes for running Aqua Security scans in STO

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />


## Aqua Custom Scan step settings for STO scans

The recommended workflow is to add an Aqua Security step to a Security or Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanModeOrch from './shared/step-palette/scan/mode/orchestration.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


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


#### Type

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


#### Access Domain

import StoSettingAuthDomain from './shared/step-palette/auth/domain.md';

<StoSettingAuthDomain />


#### Access Token

import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />

#### Access Region

The AWS region of the image to scan.


### Ingestion


#### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />


### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />

### Additional CLI flags

import StoSettingCliFlags from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags.md';

<StoSettingCliFlags />

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


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

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings /> 

## View AquaSec Assurance Policy violations

AquaSec Assurance Policy violations will appear in scan results as `Info` severity issues, with the issue type set to `EXTERNAL_POLICY`. Additionally, you can apply OPA policies in Harness STO to enforce or manage these failures. Additionally, you can apply an OPA policy to fail the pipeline based on the security assurance policy violations. This can be achieved using the [Security Tests - External Policy Failures](/docs/security-testing-orchestration/policies/create-opa-policies.md#block-the-pipeline-based-on-external-policy-failures) policy from the [security tests policy samples](/docs/security-testing-orchestration/policies/create-opa-policies.md#security-test-policy-samples).

<DocImage path={require('./static/sto-7164-aquasec-external-policies.png')} width="70%" height="70%" title="Select policy sample" />