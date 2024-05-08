---
title: Checkmarx scanner reference for STO
description: Scan code repositories with Checkmarx.
sidebar_label: Checkmarx scanner reference
sidebar_position: 100
---

Checkmarx offers an extensive suite of tools to support secure application development. Harness STO makes it easy to: 
- Run automated Checkmarx scans of your code repositories, web applications, open-source components, and other targets.
- Ingest, correlate, and deduplicate your scan results.
- Use STO's extensive array of tools to [discover](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/security-testing-dashboard) and [fix](/docs/security-testing-orchestration/use-sto/view-and-troubleshoot-vulnerabilities/ai-based-remediations) vulnerabilities quickly.  

With Harness STO, you can do the following:
- Run local SAST scans using the CxConsole CLI (orchestration mode).
- Extract results from a CxSAST server (extraction mode).
- [Ingest results](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data) from any Checkmarx scanner that can publish to SARIF.

## Important notes for running Checkmarx scans in STO

### Supported Checkmarx workflows

- Harness STO supports the following:

  - Orchestration mode — The Checkmarx step runs SAST scans using the [CxConsole CLI](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html).

  - Extraction mode  — The Checkmarx step can extract and ingest scan results for Checkmarx SAST (CxSAST). 

  - Ingestion mode — The Checkmarx step can ingest results from any Checkmarx scanner that can publish results in [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html). 

    - A common and very flexible workflow is to run your Checkmarx scan using a [GitHub Action or Drone Plugin step](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-scans-using-github-actions/) and then ingest your scan results using a Checkmarx step.  

    - For Checkmarx SAST (CxSAST), Checkmarx SCA (CxSCA), and Checkmarx Flow (CxFlow) scans, you can use a [Checkmarx CxFlow Github Action](https://github.com/checkmarx-ts/checkmarx-cxflow-github-action).

    - For Checkmarx One scans, you can use a [Checkmark AST Github Action](https://github.com/Checkmarx/ast-github-action). 

    - As part of the setup process, you need to verify your login information for the Checkmarx product that you want to use, and then specify this information in the GitHub Action or Drone Plugin step. 

    - Review the documentation for the [Checkmarx CxFlow](https://github.com/checkmarx-ts/checkmarx-cxflow-github-action) or [Checkmark One](https://github.com/Checkmarx/ast-github-action) action thoroughly and verify that you’ve configured it correctly in Harness.

    - For a general description and example of an end-to-end ingestion pipeline, go to [Run an ingestion scan in an STO Pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).

    - If you want to generate multiple results files in one scan, add a separate Checkmarx step to ingest each results file after the scan step. 

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Checkmarx step settings for STO scans

The recommended workflow is add a Checkmarx step to a Security Tests or CI Build stage and then configure it as described below. 


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

The Checkmarx team name. Use the format `/<`*`server-name`*`>/<`*`team-name`*`>` — for example, `/server1.myorg.org/devOpsEast`.


#### Project Name

import StoSettingToolProjectName from './shared/step_palette/tool/project/_name.md';

<StoSettingToolProjectName />


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

### Settings

You can use this field to provide environment variables to be used during the execution of the step. For example, if you need to access your Checkmarx server through a proxy, you can add this setting: 

* key = `JAVA_TOOL_OPTIONS`
* value = `-DproxySet=true -Dhttp.proxyHost=MY_PROXY_ADDRESS -Dhttp.proxyPort=MY_PROXY_PORT`

Replace `MY_PROXY_ADDRESS` with your proxy address or proxy FQDN, and `MY_PROXY_PORT` with your proxy port.
If you want to go through an HTTPS proxy, replace `-Dhttp` with `-Dhttps`.

### Exclude issues marked as Not Exploited

You can configure the Checkmarx ingestion step to exclude issues detected by Checkmarx but flagged as Not Exploitable. To enable this setting, add the following key-value pair under **Settings**:

`hide_not_exploitable` : `True`


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


<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for Checkmarx scans in STO (legacy)

:::note
You can set up Checkmarx scans using a Security step, but this is a legacy functionality. Harness recommends that you use a [Checkmarx step](#checkmarx-step-settings-for-sto-scans) instead.
:::


#### Target and variant

import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';

<StoLegacyTargetAndVariant />


#### Checkmarx scan settings

* `product_name` = `checkmarx`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token` = The account password
	+ `product_team_name` = `/<`*`server-name`*`>/<`*`team-name`*`>` for example, `/server1.myorg.org/devOpsEast`
	+ `product_project_name`
* `product_config_name` = `default`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
+ `tool_args`
	   You can use this field to run the [Checkmarx plugin](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html) with specific command-line arguments. To run an incremental scan, for example, specify `tool_args` = `-incremental`. For more information, go to [Running incremental scans with Checkmarx](#running-incremental-scans-with-checkmarx). 

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

-->


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
