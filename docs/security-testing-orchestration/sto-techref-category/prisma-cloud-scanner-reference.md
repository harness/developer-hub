---
title: Prisma Cloud (formerly Twistlock) step configuration
description: Scan container images with Prisma Cloud.
sidebar_label: Prisma Cloud (formerly Twistlock) step configuration
sidebar_position: 300
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan container images and ingest results from [Prisma Cloud](https://docs.prismacloud.io/en) (formerly Twistlock).

## Important notes for running Prisma Cloud scans in STO

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />

## Prisma Cloud step settings for STO

The recommended workflow is to add a PrismaCloud step to a Security or Build stage and then configure it as described below.


### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step-palette/scan/type.md';

import StoSettingScanModeOrch  from './shared/step-palette/scan/mode/orchestration.md';

import StoSettingScanModeData from './shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanType from './shared/step-palette/scan/type.md';
import StoSettingScanTypeRepo     from './shared/step-palette/target/type/repo.md';
import StoSettingScanTypeCont from './shared/step-palette/target/type/image.md';


<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectContainer from './shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />

#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


### Container image 


<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type 


import StoSettingImageType from './shared/step-palette/image/type.md';



<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain 



import StoSettingImageDomain from './shared/step-palette/image/domain.md';



<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name


import StoSettingImageName from './shared/step-palette/image/name.md';



<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag


import StoSettingImageTag from './shared/step-palette/image/tag.md';



<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id


import StoSettingImageAccessID from './shared/step-palette/image/access-id.md';



<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 


import StoSettingImageAccessToken from './shared/step-palette/image/access-token.md';



<StoSettingImageAccessToken />


### Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain 

import StoSettingAuthDomain from './shared/step-palette/auth/domain.md';


<StoSettingAuthDomain />

#### Access ID


import StoSettingAuthAccessID from './shared/step-palette/auth/access-id.md';



<StoSettingAuthAccessID />

<!-- ============================================================================= -->
<a name="auth-access-token"></a>

#### Access Token


import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';




<StoSettingAuthAccessToken />

### Scan Tool

#### Image Name

For Extraction scans, the name of the image that you want to extract from Prisma Cloud. 

### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';


<StoSettingIngestionFile  />



### Log Level


import StoSettingLogLevel from './shared/step-palette/all/log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

### Additional CLI flags

Use this field to run the [twistcli images scan binary](https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin-compute/tools/twistcli_scan_images#) with additional flags. 

For example, the following argument prevents the scan from publishing results to the Console:  `--publish FALSE`. 

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity


import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';


<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />

To add labels such as `JOB_NAME` to your Prisma Cloud scans, add key-value pairs to **Settings (optional)**. These key-value pairs will be added as labels in the Prisma Cloud UI when you run the scan.

### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />


## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />

## View Prisma Cloud compliance rule failures
Prisma Cloud compliance rule failures will appear in scan results as `Info` severity issues, with the issue type set to `EXTERNAL_POLICY`. Additionally, you can apply OPA policies in Harness STO to enforce or manage these failures. Additionally, you can apply an OPA policy to fail the pipeline based on the compliance rule failures. This can be achieved using the [Security Tests - External Policy Failures](/docs/security-testing-orchestration/policies/create-opa-policies.md#block-the-pipeline-based-on-external-policy-failures) policy from the [security tests policy samples](/docs/security-testing-orchestration/policies/create-opa-policies.md#security-test-policy-samples).
