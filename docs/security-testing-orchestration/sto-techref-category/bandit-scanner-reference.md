---
title: Bandit scanner reference for STO
description: Scan code repositories with with Bandit.
sidebar_label: Bandit scanner reference
sidebar_position: 60
helpdocs_topic_id: n3dcx6wzb3
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

You can scan your code repositories using [Bandit](https://github.com/PyCQA/bandit), an open-source tool designed to find common security issues in Python code. 


## Important notes for running Bandit scans in STO

### Docker-in-Docker requirements



import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />


### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Bandit step settings for STO scans

The recommended workflow is to add a Bandit step to a Security Tests or CI Build stage and then configure it as described below.

### Scan

#### Scan Mode

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target

#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


<!--  #### Target and variant detection 

import StoSettingScanTypeAutodetect from './shared/step_palette/target/_auto-detect.md';

<StoSettingScanTypeAutodetect / -->


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


#### Workspace (_repository_)

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />



### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity


#### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


#### Additional CLI flags

import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';

<StoSettingCliFlags />

 For example, you can skip certain tests using  `-skip` followed by a list of test IDs: `-skip testID_1, testID_3, testID_5`


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


<!-- >

### Settings

You can add a `tool_args` setting to run the [bandit scanner binary](https://pypi.org/project/bandit/1.0.1/) with specific command-line arguments. For example, you can skip certain tests using  `-skip` followed by a list of test IDs: `tool_args` = `-skip testID_1, testID_3, testID_5`

commenting out...this is functionally equivalent to using Additional CLI flags

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


## Security step settings for Bandit scans in STO (legacy)

:::note
You can set up Bandit scans using a Security step, but this is a legacy functionality. Harness recommends that you use a [Bandit step](#bandit-step-settings-for-sto-scans) instead.
:::


#### Scan policy types

STO supports the following `policy_type` settings for Bandit:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).


#### Target and variant

import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Bandit scan settings

The following settings are required for Bandit scans:

* `product_name` = `bandit`
* `scan_type` = `repository`
* `product_config_name` = `default` — Run a Bandit scan with the default settings.
* `repository_project` — The repository name. If you want to scan `https://github.com/my-github-account/codebaseAlpha`, for example, you would set this to `codebaseAlpha`.
* `repository_branch` — This tells Bandit the Git branch to scan. You can specify a hardcoded string or use the runtime variable [`<+codebase.branch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference#manual-branch-build-expressions). This sets the branch based on the user input or trigger payload at runtime.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Ingestion file

import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';




<StoLegacyIngest />

## YAML pipeline example

If you copy this example, replace the placeholder values with appropriate values for your project, organization, and connectors.

```yaml
pipeline:
  name: your-first-pipeline-v2
  identifier: yourfirstpipelinev2
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  orgIdentifier: YOUR_HARNESS_ORGANIZATION_ID
  tags: {}
  stages:
    - stage:
        name: bandit_repo_scan
        identifier: bandit_repo_scan
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
                  type: Bandit
                  name: bandit_repo_scan
                  identifier: bandit_repo_scan
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: <+input>
                      type: repository
                      variant: <+input>
                    advanced:
                      log:
                        level: info
                      fail_on_severity: critical
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: <+input>
        build: <+input>
```


