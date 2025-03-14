---
title: Checkmarx step configuration
description: Scan code repositories with Checkmarx.
sidebar_label: Checkmarx step configuration
sidebar_position: 100
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The Checkmarx step in Harness STO enables you to scan your code for security vulnerabilities, you can perform Checkmarx **CxSAST**, **CxSCA**, and **CxOSA** scanning in [Orchestration](#scan), [Ingestion](#scan) and [Extraction](#scan) modes of STO. This document will guide you through understanding the fields, configuring them, and providing any necessary information for setting up the step.

### Root access requirements

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />

## Checkmarx step settings

The recommended workflow is to add a Checkmarx step to a **Security** or **Build** stage and then configure it as described below. 

### Scan

#### Scan Mode

- **Orchestration mode**: In this mode, the Checkmarx step runs a SAST scan using the [CxConsole CLI](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html), then processes the results by normalizing and deduplicating them.

- **Ingestion mode**: In this mode, the Checkmarx step reads scan results from a data file, normalizes the data, and removes duplicates. It supports ingestion of results from any Checkmarx scanner that produces output in the [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html).

- **Extraction mode**: In this mode, the Checkmarx step retrieves scan results from the Checkmarx portal and stores them in STO. This mode is supported only for Checkmarx SAST (CxSAST).


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

- **Default** - Checkmarx Static Application Security Testing
- **CxSCA** - Checkmarx Software Composition Analysis
- **CxOSA** - Checkmarx Open Source Analysis

### Target

#### Type

import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>

#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />

#### Workspace

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />


### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Authentication


#### Domain

import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';

<StoSettingAuthDomain />

- For **Default** and **CxOSA** scan configurations, the domain URL must end with the `/cxrestapi` route.
- For **CxSCA** scan configuration, the domain should be set to `sca.checkmarx.net`.


#### Enforce SSL

import StoSettingProductSSL from './shared/step_palette/auth/_ssl.md';

<StoSettingProductSSL />

<!-- 

#### API Version


import StoSettingApiVersion from './shared/step_palette/auth/_api-version.md';



<StoSettingApiVersion />


<a name="auth-type"></a>

#### Type


import StoSettingAuthType from './shared/step_palette/auth/_type.md';



<StoSettingAuthType />

-->

#### Access ID

import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';

<StoSettingAuthAccessID />


#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />


### Scan Tool


#### Team Name

The Checkmarx team name. Use the format `/<`*`server-name`*`>/<`*`team-name`*`>` — for example, `/server1.myorg.org/devOpsEast`. In some cases, your Checkmarx's Account or Tenet name may be used as the Team Name.

#### Project Name

import StoSettingToolProjectName from './shared/step_palette/tool/project/_name.md';

<StoSettingToolProjectName />

If the specified project does not exist, the step will create a new project using the provided Project Name.


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [Checkmarx plugin](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html) with flags such as:

* `-incremental` — Run an [incremental scan](#running-incremental-scans-with-checkmarx).
* `-LocationPathExclude`— Exclude one or more paths from the scan.
* `-LocationFilesExclude` — Exclude one or more paths from the scan.
* `-OsaPathExclude` — Exclude matching paths from the scan.
* `-OsaFilesExclude` — Exclude matching files from the scan.

<!-- https://harness.atlassian.net/browse/STO-7006  -->

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />

### Running incremental scans with Checkmarx

In some cases, you might want to run an incremental rather than a full scan with Checkmarx due to time or licensing limits.  An incremental scan evaluates only new or changed code in a merge or pull request. Incremental scans are faster than full scans, but become less accurate over time. 

:::note 
Consider carefully when to run incremental vs. full scans. See [When should I use Incremental Scans vs Full Scans in CxSAST?](https://support.checkmarx.com/s/article/When-should-I-use-an#:~:text=An%20incremental%20scan%20is%20a,interface%2C%20Cx%20plugins%20and%20CLI) in the Checkmarx documentation.
:::


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


### Exclude issues marked as Not Exploited

You can configure the Checkmarx ingestion step to exclude issues detected by Checkmarx but flagged as Not Exploitable. To enable this setting, add the following key-value pair under **Settings**:

`hide_not_exploitable` : `True`



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />

## Example workflow: Ingest SARIF data from a Checkmarx GitHub Action scan

The following pipeline example illustrates an ingestion workflow. It consists of two steps:

* An Action step scans a code repo using a Checkmarx GitHub Action and export the scan results to a SARIF data file.
* A Checkmarx step that ingests the SARIF data.

![Checkmarx ingestion pipeline in Pipeline Studio](./static/checkmarx-ingestion-pipeline-example.png)

```yaml
pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: GITHUB_CONNECTOR
        repoName: https://github.com/OWASP/NodeGoat
        build: <+input>
  stages:
    - stage:
        name: CheckmarxSCA
        identifier: checkmarxone
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Action
                  name: Checkmarx Scan GHA
                  identifier: CxFlow
                  spec:
                    uses: checkmarx-ts/checkmarx-cxflow-github-action@v1.6
                    with:
                      project: SampleProject
                      team: /CxServer/nzsouth
                      scanners: sca
                      checkmarx_url: <+secrets.getValue("my-checkmarx-url")>
                      checkmarx_username: zeronorth
                      checkmarx_password:  <+secrets.getValue("my-checkmarx-password")>
                      checkmarx_client_secret: <+secrets.getValue("my-checkmarx-client-secret")>
                      sca_username: harness
                      sca_password:  <+secrets.getValue("my-sca-passeword")>
                      sca_tenant: cxIntegrations
                      break_build: false
              - step:
                  type: Checkmarx
                  name: ingest-cmarx
                  identifier: Checkmarx_1
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      name: <+pipeline.name>
                      type: repository
                      variant: dev
                    advanced:
                      log:
                        level: debug
                    runAsUser: "1001"
                    ingestion:
                      file: /harness/cx.sarif
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          sharedPaths:
            - /shared/scan_results/
  identifier: CheckmarxGitAction
  name: CheckmarxGitAction

```
