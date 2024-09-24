---
title: Nikto step configuration
description: Scan application instances with Nikto.
sidebar_label: Nikto step configuration
sidebar_position: 260
---

<DocsTag   text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#instance-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your application instances and ingest results from [Nikto](https://cirt.net/Nikto2). 

## Important notes for running Nikto scans in STO


- You need to run the scan step with root access if either of the following apply:

  - You need to run a [Docker-in-Docker background service](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference/#configuring-docker-in-docker-dind-for-your-pipeline).

  - You need to add trusted certificates to your scan images at runtime. 

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## Nikto step settings for STO scans

The recommended workflow is to add a Nikto step to a Security or Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeInst     from './shared/step_palette/target/type/_app.md';

<StoSettingScanTypeInst />


#### Target and variant detection 

import StoSettingScanTypeAutodetectApp from './shared/step_palette/target/auto-detect/_app-instance.md';

<StoSettingScanTypeAutodetectApp/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

### Instance


<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain


import StoSettingInstanceDomain from './shared/step_palette/instance/_domain.md';


<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol


import StoSettingInstanceProtocol from './shared/step_palette/instance/_protocol.md';



<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port


import StoSettingInstancePort from './shared/step_palette/instance/_port.md';



<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path


import StoSettingInstancePath from './shared/step_palette/instance/_path.md';



<StoSettingInstancePath />

### Ingestion


<a name="ingestion-file"></a>

#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';


<StoSettingIngestionFile  />


### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

### Additional CLI flags

Use this field to run the [nikto scanner](https://manpages.ubuntu.com/manpages/focal/man1/nikto.1.html) with specific flags. For example, the `-Tuning` flag customizes the tests that the scanner runs. The following example excludes a test from the scan: 

`-Tuning x01`

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

