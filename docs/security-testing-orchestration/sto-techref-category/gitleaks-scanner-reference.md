---
title: Gitleaks scanner reference for STO
description: Repository scans with Gitleaks
sidebar_label: Gitleaks scanner reference
sidebar_position: 200

---

You can scan your code repositories using [Gitleaks](https://github.com/gitleaks), an open-source tool designed to find common security issues in Python code. 

Gitleaks can publish results to [Static Analysis Results Interchange Format (SARIF)](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning), an open data format supported by many scan tools. 

For a description of the end-to-end workflow, go to [Ingest SARIF data](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data).

## For more information

```mdx-code-block
import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';
```

<StoMoreInfo />



## Gitleaks step settings for STO scans

The recommended workflow is to add a GitLeaks step to a Security Tests or CI Build stage and then configure it as described below.  

<!--



-->

### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeIngest />
<StoSettingScanModeOrch /> 


<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />


### Target


<!-- ============================================================================= -->
<a name="target-type"></a>

#### Type

```mdx-code-block
import StoSettingScanTypeRepo from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
```


<StoSettingScanTypeRepo />


<!-- ============================================================================= -->
<a name="target-name"></a>

#### Name 

```mdx-code-block
import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

<!-- ============================================================================= -->
<a name="target-variant"></a>

#### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

<!-- ============================================================================= -->
<a name="target-workspace"></a>

#### Workspace (_repository_)

```mdx-code-block
import StoSettingTargetWorkspace from './shared/step_palette/_sto-ref-ui-target-workspace.md';
```

<StoSettingTargetWorkspace  />



### Ingestion File

```mdx-code-block
import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />




### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>


#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags

```mdx-code-block
import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';
```

<StoSettingCliFlags />

<a name="fail-on-severity"></a>


#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

### Settings

You can add a `tool_args` setting to run the [Gitleaks scanner binary](https://github.com/gitleaks/gitleaks#usage) with specific command-line arguments. For example, you can redact secrets from the scanner output using `-redact`: `tool_args : --redact` 

You can also use `tool_args` to [speed up your Gitleaks scans](#speeding-up-gitleaks-scans).


### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)

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

1. A Run step that sends a `gitleaks detect` command to the local Gitleaks container to scan the [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/) specified for the pipeline. This command specifies the output file for the scan results: `/shared/customer_artifacts/sarif_simple.sarif`. 

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
                            gitleaks detect --source /harness --report-path /shared/customer_artifacts/ingest-data.sarif --report-format 'sarif' --exit-code 0 --redact -v
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
                            file: /shared/customer_artifacts/ingest-data.sarif
          sharedPaths:
            - /shared/customer_artifacts
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
            - /shared/customer_artifacts
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
  identifier: gitleaks_docs_example_ORCHESTRATION
  name: gitleaks docs example - ORCHESTRATION
```