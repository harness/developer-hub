---
title: Burp step configuration
description: Scan application instances with Burp.
sidebar_label: Burp step configuration
sidebar_position: 90
---

<DocsTag   text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#instance-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>


You can scan your application instances using [Burp Enterprise](https://portswigger.net/burp/enterprise). 

## Important notes for running Burp scans in STO

- You need to run the scan step with root access if either of the following apply:

  - You need to run a [Docker-in-Docker background service](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference/#configuring-docker-in-docker-dind-for-your-pipeline).

  - You need to add trusted certificates to your scan images at runtime. 

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Burp step settings for STO scans

The recommended workflow is to add a Burp step to a Security or Build stage and then configure it as described below.

### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

The following configurations are available for Orchestration scans. These are [built-in configurations](https://portswigger.net/burp/documentation/scanner/scan-configurations/burp-scanner-built-in-configs) provided by Burp Enterprise.  
-  `Default` This is the same as the `Crawl and Audit - Lightweight` built-in configuration.
-  `Never stop Crawl due to application errors`
-  `Never stop audit due to application errors`
-  `Minimize false positives`
-  `Minimize false negatives`
-  `Crawl strategy most complete`
-  `Crawl strategy more complete`
-  `Crawl strategy fastest`
-  `Crawl strategy faster`
-  `Crawl limit 60 minutes`
-  `Crawl limit 30 minutes`
-  `Crawl limit 10 minutes`
-  `Crawl and audit lightweight`
-  `Crawl and audit fast`
-  `Crawl and audit deep`
-  `Crawl and audit balanced`
-  `Audit coverage thorough`
-  `Audit coverage maximum`
-  `Audit checks medium active`
-  `Audit checks light active`
-  `Audit checks critical issues only`
-  `Audit checks all except time based detection methods`
-  `Audit checks all except java script analysis`

### Target

##### Type

import StoSettingScanTypeInst     from './shared/step_palette/target/type/_app.md';

<StoSettingScanTypeInst />


#### Target and variant detection 

import StoSettingScanTypeAutodetectApp from './shared/step_palette/target/auto-detect/_app-instance.md';

<StoSettingScanTypeAutodetectApp/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Authentication

#### Domain 

The fully-qualified URL to the scanner. 

#### Access Token

The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases, this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

### Scan Tool

Use this setting to specify a specific scan to ingest. If this is not specified, the pipeline ingests the most recent scan. 

### Instance

#### Domain

import StoSettingInstanceDomain from './shared/step_palette/instance/_domain.md';

<StoSettingInstanceDomain />


#### Protocol

import StoSettingInstanceProtocol from './shared/step_palette/instance/_protocol.md';

<StoSettingInstanceProtocol />


#### Port

import StoSettingInstancePort from './shared/step_palette/instance/_port.md';

<StoSettingInstancePort />


#### Path

import StoSettingInstancePath from './shared/step_palette/instance/_path.md';

<StoSettingInstancePath />


#### Username

Username to log in to the instance you want to scan.


#### Password

The access token to log in to the instance you want to scan. In most cases, this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).


### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';

<StoSettingCliFlags />

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

