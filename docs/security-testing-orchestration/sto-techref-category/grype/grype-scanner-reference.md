---
title: Grype step configuration
description: Scan container images with Grype.
sidebar_label: Grype step configuration
sidebar_position: 10
redirect_from: /docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your container images and ingest results from [Grype](https://github.com/anchore/grype).

For information about setting up Grype in an air-gapped environment, go to [Set up Grype in air-gapped environments](/docs/security-testing-orchestration/sto-techref-category/grype/grype-setup-in-airgapped.md).


## Important notes for running Grype scans in STO

- You need to run the scan step with root access if either of the following apply:

  - You need to use a Docker-in-Docker background step.

  - You need to add trusted certificates to your scan images at runtime. 

- You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using custom certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Grype step settings for STO

The recommended workflow is to add a Grype step to a Security or Build stage and then configure it as described below. 


### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from '../shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from '../shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from '../shared/step_palette/scan/mode/_ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type

import StoSettingScanTypeCont from '../shared/step_palette/target/type/_image.md';
import StoSettingScanTypeRepo from '../shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeCont />
<StoSettingScanTypeRepo />


#### Target and Variant Detection 

import StoSettingScanTypeAutodetectRepo from '../shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from '../shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from '../shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from '../shared/step_palette/target/_name.md';

<StoSettingTargetName />

<a name="target-variant"></a>

#### Variant

import StoSettingTargetVariant from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Ingestion File


import StoSettingIngestionFile from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />

### Container image 


<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type  


import StoSettingImageType from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_type.md';



<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain 



import StoSettingImageDomain from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_domain.md';



<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name


import StoSettingImageName from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_name.md';



<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag


import StoSettingImageTag from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_tag.md';



<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id


import StoSettingImageAccessID from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_access-id.md';



<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 


import StoSettingImageAccessToken from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_access-token.md';



<StoSettingImageAccessToken />


### Log Level

import StoSettingLogLevel from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [`grype`](https://github.com/anchore/grype?tab=readme-ov-file) binary with CLI arguments such as:

`--only-fixed`

With this flag, `grype` reports only vulnerabilities that have known fixes. 

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity


import StoSettingFailOnSeverity from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from '../shared/step_palette/all/_settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from '../shared/proxy-settings.md';

<ProxySettings />

## Troubleshoot "vulnerability database build date exceeds max allowed age" exception

The full exception is: `db could not be loaded: the vulnerability database was built n weeks ago (max allowed age is 5 days)`

This exception indicates that the Grype step in the STO process is unable to load the vulnerability database due to its age exceeding the maximum allowed age of 5 days. If the environment where you're running these scans has restricted internet connectivity (firewalled), you must set up a local database for Grype to update itself. For comprehensive documentation for the initial setup, configuring the local database, and final configuration, go to [Set up Grype in air-gapped environments](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/grype/grype-setup-in-airgapped/).

While Harness updates the database every time it rebuilds the Grype image, this is primarily done for performance reasons. A fresher database requires less time and effort to update at runtime. However, this update is not sufficient to bypass the database access requirement, as the maximum allowed age is 5 days. You can temporarily disable the age check and run Grype with the database it ships with, but this is not recommended from a security standpoint. It's advisable to follow the provided instructions to resolve the database access issue in a more secure manner.


 
