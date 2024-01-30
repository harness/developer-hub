---
title: Open Source Vulnerabilities (OSV) scanner reference for STO
description: Scan code repositories with OSV
sidebar_position: 285
sidebar_label: Open Source Vulnerabilities (OSV) scanner reference
---

You can scan your code repositories using [Open Source Vulnerabilities (OSV)](https://google.github.io/osv-scanner/), a tool that finds existing vulnerabilities that affect your project’s dependencies. OSV SAST supports a [variety of languages and lockfiles](https://google.github.io/osv-scanner/supported-languages-and-lockfiles).


## Important notes for running OSV scans in STO 

Currently, this integration is behind the feature flag `STO_STEP_PALETTE_OSV`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

<!-- Currently, this integration supports the following:

- OSV SAST supports a [variety of languages and lockfiles](https://google.github.io/osv-scanner/supported-languages-and-lockfiles).
- OSV container image scans are currently limited to Debian-based images only.
- STO supports Ingestion mode only for this integration. 

-->

<!-- 
### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />
-->


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />



### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## OSV step settings for STO scans

The recommended workflow is add an OSV step to a Security Tests or CI Build stage and then configure it as described below. 

### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_mode.md';
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />

#### Target and variant detection

Auto-detection is not available for ingestion scans.

When scanning code repositories, the step detects these values as follows:
- To detect the target, the step runs `git config --get remote.origin.url`. 
- To detect the variant, the step runs `git rev-parse --abbrev-ref HEAD`. The default assumption is that the `HEAD` branch is the one you want to scan.

#### Name 

import StoSettingProductID from './shared/step_palette/target/_name.md';

<StoSettingProductID />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Ingestion

#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

<!-- 
### Log Level, CLI flags, and Fail on Severity
-->

### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';

<StoSettingCliFlags />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

<!-- 
### Settings
-->

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)


## YAML pipeline example 

If you copy and paste the following example, make sure you update the placeholders for your project, Git connector, and build infrastructure.

```yaml
pipeline:
  projectIdentifier: YOUR_HARNESS_PROJECT
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_GITHUB_CONNECTOR
        repoName: <+stage.variables.GITHUB_REPO>
        build: <+input>
  stages:
    - stage:
        name: osv_scan
        identifier: osv_scan
        type: SecurityTests
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
          execution:
            steps:
              - step:
                  type: OsvScanner
                  name: OsvScanner_1
                  identifier: OsvScanner_1
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      type: repository
                      detection: manual
                      name: <+stage.variables.GITHUB_REPO>
                      variant: <+stage.variables.GITHUB_BRANCH>
                    advanced:
                      log:
                        level: info
                      fail_on_severity: medium
          slsa_provenance:
            enabled: false
          caching:
            enabled: false
            paths: []
        variables:
          - name: GITHUB_REPO
            type: String
            description: ""
            required: false
            value: <+input>
          - name: GITHUB_BRANCH
            type: String
            description: ""
            required: false
            value: <+input>
        when:
          pipelineStatus: Success
        description: ""
  identifier: osvnodegoat
  name: osv-nodegoat


```