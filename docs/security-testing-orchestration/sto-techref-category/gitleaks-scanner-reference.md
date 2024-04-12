---
title: Gitleaks scanner reference for STO
description: Scan code repositories with Gitleaks.
sidebar_label: Gitleaks scanner reference
sidebar_position: 200

---

You can scan your code repositories using [Gitleaks](https://github.com/gitleaks), an open-source tool designed to find common security issues in Python code. 

Gitleaks can publish results to [Static Analysis Results Interchange Format (SARIF)](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning), an open data format supported by many scan tools. 

For a description of the end-to-end workflow, go to [Ingest SARIF data](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data).

## Important notes

You can write up your own rules in Gitleaks:

- You can specify an allowlist of public, test, example, and inactive secrets that Gitleaks ignores during a scan. Set up your allowlist in a [.gitleaks.toml file](https://github.com/harness/sto-core/blob/develop/.gitleaks.toml) and place it at the root of your repository. 

  When you update passwords, tokens, or other secrets to make them inactive, you might find it easier to add the no-longer-valid secrets to your allowlist rather than updating them in the codebase.

- You can also write your own [custom detection rules](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#configuration).

  - For examples, go to the [default Gitleaks config](https://github.com/zricethezav/gitleaks/blob/master/config/gitleaks.toml).
  - If you want to contribute to the default configuration, go to the [Contributing guidelines](https://github.com/zricethezav/gitleaks/blob/master/README.md).
  - For information about advanced configurations, go to [Stop leaking secrets - configuration](https://blog.gitleaks.io/stop-leaking-secrets-configuration-2-3-aeed293b1fbf).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />



## Gitleaks step settings for STO scans

The recommended workflow is to add a GitLeaks step to a Security Tests or CI Build stage and then configure it as described below.  

<!--



-->

### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeIngest />
<StoSettingScanModeOrch /> 


<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

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


#### Workspace (_repository_)

import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';

<StoSettingTargetWorkspace  />



### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />




### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

<!--

 such as: 

`--log-opts="-n 1000" --max-target-megabytes 10 --redact`

With these flags, `gitleaks` limits the scan to the last 1000 commits, skips files that are larger than 10 MB, and redacts secrets from the log output. 

-->

Use this field to run the [`gitleaks`](https://github.com/gitleaks/gitleaks) scanner with additional CLI flags.

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />

You can also use this field to [speed up your Gitleaks scans](#speeding-up-gitleaks-scans).


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
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

## Speeding up Gitleaks scans

A Gitleaks scan might take a long time if your repository is very large or has a long commit history. To speed up your scans, you can use the [`tool_args` setting](#settings) to run [`gitleaks detect`](https://github.com/gitleaks/gitleaks#detect) with the following command-line option:

* `tool_args : --log-opts="-n 1000"`

   You can use `--log-opts` to narrow the range of commits that Gitleaks scans in a Pull Request. For example, `-n 1000` limits the scan to the last 1000 commits. You can also scan a range of commits using a command such as: `tool_args : --log-opts=="--all commitA..commitF"`

   ![](./static/gitleaks-toolargs-example.png)
 

## Gitleaks step configuration example for STO

Here's an example of a configured Gitleaks step.

```yaml
- step:
    type: Gitleaks
    name: gitleaks
    identifier: gitleaks
    spec:
      mode: ingestion
      config: default
      target:
        name: nodegoat
        type: repository
        variant: dev
      advanced:
        log:
          level: debug
      ingestion:
        file: /path/of/file.sarif
    description: gitleaks step
```

## Gitleaks ingestion pipeline example for STO

The following pipeline shows an end-to-end ingestion workflow. The pipeline consists of a Build stage with two steps:

1. A Run step that sends a `gitleaks detect` command to the local Gitleaks container to scan the [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) specified for the pipeline. This command specifies the output file for the scan results: `/shared/scan_results/sarif_simple.sarif`. 

2. A Gitleaks step that auto-detects the data file type (SARIF) and then ingests and normalizes the data from the output file. 

![](./static/gitleaks-ingestion-example-pipeline.png)

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: gitleaks-build-stage
        identifier: gitleaksbuildstage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - stepGroup:
                  name: Ingestion Workflow with a runs step
                  identifier: Generation
                  steps:
                    - step:
                        type: Run
                        name: gitleaks
                        identifier: Run_1
                        spec:
                          connectorRef: CONTAINER_IMAGE_REGISTRY_CONNECTOR
                          image: zricethezav/gitleaks:latest
                          shell: Sh
                          command: |
                            gitleaks detect --source /harness --report-path /shared/scan_results/ingest-data.sarif --report-format 'sarif' --exit-code 0 --redact -v
                          resources:
                            limits:
                              memory: 2048Mi
                              cpu: 2000m
                        when:
                          stageStatus: Success
                    - step:
                        type: Gitleaks
                        name: gitleaks_ingest
                        identifier: gitleaks_ingest
                        spec:
                          mode: ingestion
                          config: default
                          target:
                            name: gitleaks-example
                            type: repository
                            variant: master
                          advanced:
                            log:
                              level: info
                          ingestion:
                            file: /shared/scan_results/ingest-data.sarif
          sharedPaths:
            - /shared/scan_results
          caching:
            enabled: false
            paths: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
  properties:
    ci:
      codebase:
        connectorRef: CODEBASE_CONNECTOR
        repoName: dvpwa
        build: <+input>
  identifier: Gitleaks_docsexample_INGESTION
  name: Gitleaks docs-example INGESTION


```

## Gitleaks orchestration pipeline example for STO

The following pipeline illustrates an orchestration workflow where the Gitleaks step scans the codebase and ingests the results in one step. 

![](./static/gitleaks-orchestration-example-pipeline.png)

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: gitleaks-build-stage
        identifier: gitleaksbuildstage
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - stepGroup:
                  name: "STO Orchestration "
                  identifier: Orchestration
                  steps:
                    - step:
                        type: Gitleaks
                        name: gitleaks_orch
                        identifier: gitleaks_orch
                        spec:
                          mode: orchestration
                          config: default
                          target:
                            name: gitleaks-example
                            type: repository
                            variant: master
                          advanced:
                            log:
                              level: info
                          settings:
                            tool_args: "--log-opts=\"-n 1000\"`"
                          resources:
                            limits:
                              memory: 2048Mi
                              cpu: 2000m
          sharedPaths:
            - /shared/scan_results
          caching:
            enabled: false
            paths: []
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: K8S_DELEGATE_CONNECTOR
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: \{}
              os: Linux
  properties:
    ci:
      codebase:
        connectorRef: CODEBASE_CONNECTOR
        repoName: dvpwa
        build: <+input>
  identifier: gitleaks_docs_example_ORCHESTRATION
  name: gitleaks docs example - ORCHESTRATION
```