---
title: Prowler step configuration
description: Scan configurations with Prowler.
sidebar_label: Prowler step configuration
sidebar_position: 310
---

<DocsTag text="Configuration scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad"   link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuration-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your configurations and ingest results from [Prowler](https://github.com/prowler-cloud/prowler). The default workflow is to add a Prowler step to a Build or Security stage and configure it as described below.

## Important notes for running Prowler scans in STO


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Prowler step settings for STO

### Scan

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrchestration from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrchestration />
<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

#### Scan Configuration

<!-- >
import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />
-->

Select the [compliance framework](https://github.com/prowler-cloud/prowler/blob/master/docs/tutorials/compliance.md) to apply when running the scan:
* **Default**
* **Hipaa**
* **GDPR**
* **Exclude Extras**

<!-- TBD -->


### Target

<a name="target-type"></a>

#### Type



import StoSettingScanTypeConfig  from './shared/step_palette/target/type/_config.md';


<StoSettingScanTypeConfig />

<!-- ---------------------------------------------------------------------------- -->

<a name="target-name"></a>

#### Name 


import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

#### Workspace 


import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';



<StoSettingTargetWorkspace  />



### Authentication

Settings for the AWS account to use when running an orchestration scan.

#### Access ID 


import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';



<StoSettingAuthAccessID />

<!-- ---------------------------------------------------------------------------- -->

<a name="auth-access-token"></a>

#### Access Token


import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';



<StoSettingAuthAccessToken />


#### Access Region

The AWS region of the configuration to scan.


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-enforce-ssl"></a>

### Ingestion file 

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';


<StoSettingIngestionFile  />

### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

### Additional CLI flags

You can use this field to run the [prowler scanner](https://github.com/prowler-cloud/prowler) with specific command-line arguments. For example, this argument excludes specific checks from a scan: 

`-excluded-checks s3_bucket_public_access`

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />


