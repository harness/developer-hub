---
title: Semgrep scanner reference for STO
description: Scan code repositories with Semgrep.
sidebar_label: Semgrep settings reference
sidebar_position: 360
---


You can ingest scan results from [Semgrep](https://www.semgrep.com), an open-source static analysis engine for detecting dependency vulnerabilities and other issues in your code repositories. 

The following tutorials include detailed examples of how to run a [Semgrep scan](https://semgrep.dev/docs/cli-reference) in a Run step and ingest the results:
- [SAST code scans using Semgrep](/tutorials/security-tests/sast-scan-semgrep)
- [Create a build-scan-push pipeline (STO only)](/tutorials/security-tests/build-scan-push-sto-only)


## Important notes for running Semgrep scans in STO

<!-- 
### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

-->

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />




## Semgrep step configuration

The recommended workflow is to add a Semgrep step to a Security Tests or CI Build stage and then configure it as described below.


### Scan settings


<a name="scan-mode"></a>

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeIngest />


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanType from './shared/step_palette/scan/_type.md';
import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';

<StoSettingScanType />
<StoSettingScanTypeRepo />


#### Target and variant detection 

import StoSettingScanTypeAutodetect from './shared/step_palette/target/_auto-detect.md';

<StoSettingScanTypeAutodetect />




#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

<!-- 
#### Workspace (_repository_)


import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';



<StoSettingTargetWorkspace  />

-->

### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  /> 

<!--   Log Level, CLI flags, and Fail on Severity ------------------------------------------------------------------------------------------------- -->


<a name="log-level"></a>

### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />



### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />


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

The following pipeline example illustrates an ingestion workflow. It consists of two steps:

* A Run step that uses a [Semgrep container](https://hub.docker.com/r/returntocorp/semgrep) to scan the codebase defined for the pipeline and then publish the results to a SARIF data file.
* A Semgrep step that ingests the SARIF data.

![](./static/semgrep-ingest-pipeline.png)


```yaml
pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: semgrep-ingest
        identifier: semgrepingest
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Sh
                    command: semgrep --sarif --config auto -o /harness/results.sarif /harness
                    envVariables:
                      SEMGREP_APP_TOKEN: <+secrets.getValue("semgrepkey")>
                    connectorRef: YOUR_CONTAINER_IMAGE_REGISTRY_CONNECTOR_ID
                    image: returntocorp/semgrep
                    resources:
                      limits:
                        memory: 4096M
              - step:
                  type: Semgrep
                  name: Semgrep_1
                  identifier: Semgrep_1
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      name: test
                      type: repository
                      variant: test
                    advanced:
                      log:
                        level: info
                    ingestion:
                      file: /harness/results.sarif
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
  identifier: smpsemgrep
  name: smp-semgrep
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        build: <+input>

```
