---
title: Checkmarx step configuration
description: Scan code repositories with Checkmarx.
sidebar_label: Checkmarx step configuration
sidebar_position: 100
redirect_from:
- /docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference/
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The Checkmarx step in Harness STO enables you to scan your code for security vulnerabilities, you can perform Checkmarx **CxSAST**, **CxSCA**, and **CxOSA** scanning in [Orchestration](#scan), [Ingestion](#scan) and [Extraction](#scan) modes of STO. This document will guide you through understanding the fields, configuring them, and providing any necessary information for setting up the step.

:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />
:::

## Checkmarx step settings

The recommended workflow is to add a Checkmarx step to a **Security** or **Build** stage and then configure it as described below. 

### Scan

#### Scan Mode

- **Orchestration mode**: In this mode, the step executes the scan, then processes the results by normalizing and deduplicating them.

- **Ingestion mode**: In this mode, the Checkmarx step reads scan results from a data file, normalizes the data, and removes duplicates. It supports ingestion of results from any Checkmarx scanner that produces output in the [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html).

- **Extraction mode**: In this mode, the Checkmarx step retrieves scan results from the Checkmarx portal and stores them in STO. This mode is supported only for Checkmarx SAST (CxSAST).


#### Scan Configuration

import StoSettingProductConfigName from '../shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

- **SAST** or **Default** - Checkmarx Static Application Security Testing. Checkmarx step runs a SAST scan using the [CxConsole CLI](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html)
- **CxSCA** - Checkmarx Software Composition Analysis
- **CxOSA** - Checkmarx Open Source Analysis

### Target

#### Type

import StoSettingScanTypeRepo     from '../shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from '../shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectNote from '../shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>

#### Name 

import StoSettingTargetName from '../shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from '../shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />

#### Workspace

import StoSettingTargetWorkspace from '../shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />


### Ingestion File

import StoSettingIngestionFile from '../shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />


### Authentication


#### Domain

import StoSettingAuthDomain from '../shared/step-palette/auth/domain.md';

<StoSettingAuthDomain />

- For **Default** and **CxOSA** scan configurations, the domain URL must end with the `/cxrestapi` route.
- For **CxSCA** scan configuration, the domain should be set to `sca.checkmarx.net`.


#### Enforce SSL

import StoSettingProductSSL from '../shared/step-palette/auth/ssl.md';

<StoSettingProductSSL />

<!-- 

#### API Version


import StoSettingApiVersion from '../shared/step-palette/auth/api-version.md';



<StoSettingApiVersion />


<a name="auth-type"></a>

#### Type


import StoSettingAuthType from '../shared/step-palette/auth/type.md';



<StoSettingAuthType />

-->

#### Access ID

import StoSettingAuthAccessID from '../shared/step-palette/auth/access-id.md';

<StoSettingAuthAccessID />


#### Access Token

import StoSettingAuthAccessToken from '../shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />


### Scan Tool


#### Team Name

The Checkmarx team name. Use the format `/<`*`server-name`*`>/<`*`team-name`*`>` — for example, `/server1.myorg.org/devOpsEast`. In some cases, your Checkmarx's Account or Tenet name may be used as the Team Name.

#### Project Name

import StoSettingToolProjectName from '../shared/step-palette/tool/project/name.md';

<StoSettingToolProjectName />

If the specified project does not exist, the step will create a new project using the provided Project Name.


### Log Level

import StoSettingLogLevel from '../shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [Checkmarx plugin](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html) with flags such as:

* `-incremental` — Run an [incremental scan](#running-incremental-scans-with-checkmarx).
* `-LocationPathExclude`— Exclude one or more paths from the scan.
* `-LocationFilesExclude` — Exclude one or more paths from the scan.
* `-OsaPathExclude` — Exclude matching paths from the scan.
* `-OsaFilesExclude` — Exclude matching files from the scan.

<!-- https://harness.atlassian.net/browse/STO-7006  -->

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />

### Running incremental scans with Checkmarx

In some cases, you might want to run an incremental rather than a full scan with Checkmarx due to time or licensing limits.  An incremental scan evaluates only new or changed code in a merge or pull request. Incremental scans are faster than full scans, but become less accurate over time. 

:::note 
Consider carefully when to run incremental vs. full scans. See [When should I use Incremental Scans vs Full Scans in CxSAST?](https://support.checkmarx.com/s/article/When-should-I-use-an#:~:text=An%20incremental%20scan%20is%20a,interface%2C%20Cx%20plugins%20and%20CLI) in the Checkmarx documentation.
:::


#### Fail on Severity

import StoSettingFailOnSeverity from '../shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />


### Exclude issues marked as Not Exploited

You can configure the Checkmarx ingestion step to exclude issues detected by Checkmarx but flagged as Not Exploitable. To enable this setting, add the following key-value pair under **Settings**:

`hide_not_exploitable` : `True`



### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from '../shared/proxy-settings.md';

<ProxySettings />
