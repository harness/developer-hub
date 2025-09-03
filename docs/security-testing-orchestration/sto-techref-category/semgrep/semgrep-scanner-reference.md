---
title: Semgrep step configuration
description: Scan code repositories with Semgrep.
sidebar_label: Semgrep step configuration
sidebar_position: 20
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can scan your code repositories using [Semgrep](https://www.semgrep.com) and ingest the results into STO. 

For a quick introduction, go to the [SAST code scans using Semgrep](/docs/security-testing-orchestration/sto-techref-category/semgrep/sast-scan-semgrep) tutorial.

## Important notes for running Semgrep scans in STO

- This integration uses the [Semgrep Engine](https://github.com/semgrep/semgrep), which is open-source and licensed under [LGPL 2.1](https://tldrlegal.com/license/gnu-lesser-general-public-license-v2.1-(lgpl-2.1)).  

  To run scans using a licensed version of [Semgrep Code](https://semgrep.dev/products/semgrep-code), add your Semgrep token in the [Access token](#access-token) field. 

- STO Semgrep steps include the following rulesets by default: 
  - [auto](https://semgrep.dev/p/auto)
  - [bandit](https://semgrep.dev/p/bandit)
  - [brakeman](https://semgrep.dev/p/brakeman)
  - [eslint](https://semgrep.dev/p/eslint)
  - [findsecbugs](https://semgrep.dev/p/findsecbugs)
  - [flawfinder](https://semgrep.dev/p/flawfinder)
  - [gosec](https://semgrep.dev/p/gosec)
  - [phps-security-audit](https://semgrep.dev/p/phpcs-security-audit)
  - [security-code-scan](https://semgrep.dev/p/security-code-scan)

   Some rulesets include Pro rules that are available only with a paid version of Semgrep. For more information, go to the [Semgrep Registry](https://semgrep.dev/explore).

- If you want to add trusted certificates to your scan images at runtime, you need to run the scan step with root access.

  You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your proxies using custom certificates. For more information, go to [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).

- The following topics contain useful information for setting up scanner integrations in STO:
   - [What's supported in STO](/docs/security-testing-orchestration/whats-supported/sto-deployments)
   - [Security Testing Orchestration FAQs](/docs/faqs/security-testing-orchestration)
   - [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines)



## Set-up workflows

<details>

<summary>Orchestration scans</summary>

To scan a code repository, you need [Harness Code Repository](/docs/code-repository) or a [Harness connector](/docs/category/code-repo-connectors) to your Git service. 


#### Add the Semgrep scanner

Do the following:

1. Add a **Build** or **Security** stage to your pipeline.
2. Configure the stage to point to the [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) you want to scan. 
2. Add a Semgrep step to the stage.

<br/>
#### Set up the Semgrep scanner

##### Required settings

1. Scan mode = [Orchestration](#scan-mode)
2. Target and Variant Detection = [Auto](#detect-target-and-variant)


##### Optional settings

- [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
- [Log Level](#log-level) — Useful for debugging

#### Scan the repository

Save your pipeline and then select **Run**. 

The pipeline scans your code repository and then shows the results in [Vulnerabilities tab](/docs/security-testing-orchestration/view-security-test-results/view-scan-results).


</details>


<!-- 2 --------------------------------------------------------------------->

<details>
<summary>Ingestion scans</summary>


#### Add a shared path for your scan results

1. Add a **Build** or **Security** stage to your pipeline.
2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.

#### Copy scan results to the shared path

There are two primary workflows to do this:

- Add a Run step that runs a Semgrep scan from the command line and then copies the results to the shared path.
- Copy results from a Semgrep scan that ran outside the pipeline. 

For more information and examples, go to [Ingestion scans](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline).


#### Set up the Semgrep scanner

Add a Semgrep step to the stage and set it up as follows.

##### Required settings

1. [Scan mode](#scan-mode) = Ingestion
2. [Target name](#name) — Usually the repo name
2. [Target variant](#name) — Usually the scanned branch. You can also use a [runtime input](/docs/platform/variables-and-expressions/runtime-input-usage) and specify the branch at runtime.
3. [Ingestion file](#ingestion-file) — For example, `/shared/scan_results/semgrep-scan.json`

##### Optional settings

- [Fail on Severity](#fail-on-severity) — Stop the pipeline if the scan detects any issues at a specified severity or higher
- [Log Level](#log-level) — Useful for debugging

#### Scan the repository

Save your pipeline and then select **Run**. 

The pipeline scans your code repository and then shows the results in [Vulnerabilities tab](/docs/security-testing-orchestration/view-security-test-results/view-scan-results).


</details>

## Semgrep step configuration

The recommended workflow is to add a Semgrep step to a Security Tests or CI Build stage and then configure it as described below.

### Scan

<a name="scan-mode"></a>

#### Scan Mode

import StoSettingScanModeOrch from '../shared/step-palette/scan/mode/orchestration.md';

import StoSettingScanModeIngest from '../shared/step-palette/scan/mode/ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

<!-- -->

You can use this setting to select the set of Semgrep rulesets to include in your scan:

  - **Default** Include the following rulesets: 
    - [bandit](https://semgrep.dev/p/bandit)
    - [brakeman](https://semgrep.dev/p/brakeman)
    - [eslint](https://semgrep.dev/p/eslint)
    - [findsecbugs](https://semgrep.dev/p/findsecbugs)
    - [flawfinder](https://semgrep.dev/p/flawfinder)
    - [gosec](https://semgrep.dev/p/gosec)
    - [phps-security-audit](https://semgrep.dev/p/phpcs-security-audit)
    - [security-code-scan](https://semgrep.dev/p/security-code-scan)
  - **No default CLI flags** Run the `semgrep` scanner with no additional CLI flags. This setting is useful if you want to specify a custom set of rulesets in **Additional CLI flags**.
  - **p/default** Run the scan with the [default ruleset](https://semgrep.dev/p/default) configured for the Semgrep scanner.
  - **Auto only** Run the scan with the [recommended rulesets specific to your project](https://semgrep.dev/p/auto).
  - **Auto and Ported security tools** Include the following rulesets: 
    - [auto](https://semgrep.dev/p/auto)
    - [brakeman](https://semgrep.dev/p/brakeman)
    - [eslint](https://semgrep.dev/p/eslint)
    - [findsecbugs](https://semgrep.dev/p/findsecbugs)
    - [flawfinder](https://semgrep.dev/p/flawfinder)
    - [gitleaks](https://semgrep.dev/p/gitleaks)
    - [gosec](https://semgrep.dev/p/gosec)
    - [phps-security-audit](https://semgrep.dev/p/phpcs-security-audit)
    - [security-code-scan](https://semgrep.dev/p/security-code-scan)
  - **Auto and Ported security tools except p/gitleaks** 



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

<a name="target-variant"></a>

#### Variant

import StoSettingTargetVariant from '../shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from '../shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />



### Ingestion File

import StoSettingIngestionFile from '../shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />

### Access Token

import StoSettingAuthAccessToken from '../shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />


### Log Level

import StoSettingLogLevel from '../shared/step-palette/all/log-level.md';

<StoSettingLogLevel />

<!-- COMMENT THIS OUT UNTIL SEMGREP ORCHESTRATION IS AVAILABLE -->

### Additional CLI flags

Use this field to run the [`semgrep`](https://semgrep.dev/docs/cli-reference/) scanner with flags such as:

`--severity=ERROR --use-git-ignore`

With these flags, `semgrep` considers only ERROR severity rules and ignores files included in `.gitignore`. 

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />



### Fail on Severity

import StoSettingFailOnSeverity from '../shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from '../shared/step-palette/all/settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Configure Semgrep as a Built-in Scanner  

The Semgrep scanner is available as a [built-in scanner](/docs/security-testing-orchestration/set-up-scans/built-in-scanners) in STO. Configuring it as a built-in scanner enables the step to automatically perform scans using the free version without requiring any licenses. Follow these steps to set it up:  

1. Search for **SAST** in the step palette or navigate to the **Built-in Scanners** section and select the **SAST** step.  
2. Expand the **Additional CLI Flags** section if you want to configure optional CLI flags.  
3. Click **Add Scanner** to save the configuration.  

The scanner will automatically use the free version, detect scan targets, and can be further configured by clicking on the step whenever needed.

## Proxy settings

import ProxySettings from '../shared/proxy-settings.md';

<ProxySettings />

## YAML pipeline example

The following pipeline example illustrates an orchestration workflow. It consists of a Semgrep step that scans a code repository and then ingests, normalizes, and deduplicates the results.

![](../static/semgrep-ingest-pipeline.png)

```yaml
pipeline:
  name: semgrep-orch-test
  identifier: semgreporchtest
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_GIT_CONNECTOR_ID
        repoName: YOUR_GIT_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: semgrep-orch
        identifier: semgreporch
        description: ""
        type: SecurityTests
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Semgrep
                  name: Semgrep_1
                  identifier: Semgrep_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: repository
                      detection: auto
                    advanced:
                      log:
                        level: info
```
