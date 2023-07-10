---
title: Snyk scanner reference
description: Image and repository scans with Snyk
sidebar_position: 290
---


Harness STO supports the following scan types for the following Snyk products:
* Snyk Open Source — `orchestratedScan` and `ingestionOnly` 
* Snyk Code  —  `ingestionOnly` 
* Snyk Container  — `ingestionOnly` 

For a workflow description, go to [Ingest Scan Results from Snyk](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/snyk-scans.md).

## Before you begin

```mdx-code-block
import StoCreateDinD from './shared/dind-bg-step.md';
```

<StoCreateDinD />

## Snyk step configuration

The recommended workflow is add a Snyk step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 

```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

<details>
    <summary>Scanner Template</summary>

![](static/step-palette-00.png) 

</details>

### Scan


<a name="scan-mode"></a>

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette//_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/step_palette/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type

```mdx-code-block
import StoSettingScanType from './shared/step_palette/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo     from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';

```
<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Name 

```mdx-code-block
import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

<a name="target-variant"></a>

#### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

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

### Authentication


#### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```

<StoSettingAuthAccessToken />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />



#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />



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
* [Looping Strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/Governance/Policy-as-code/harness-governance-overview)



## Security step configuration (_deprecated_)

<details><summary>Set up a Snyk scan in a Security step</summary>


You can set up Snyk scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />


* `product_name` = `snyk`:
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =  `containerImage` or `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value for `containerImage`: `ingestionOnly`
	+ accepted values for `repository`: `orchestratedScan`, `ingestionOnly`
* `product_access_token`
* `product_config_name` = `default`
* `snyk_api` = URL to the Snyk instance, if you're using an on-prem installation.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />

```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

</details>

## YAML pipeline example

<details><summary>Snyk example pipeline</summary>

```yaml

pipeline:
  allowStageExecutions: false
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: dvpwa
        build: <+input>
  stages:
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: stoqadelegate
              namespace: harness-qa-delegate
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
            - /shared/customer_artifacts
          execution:
            steps:
              - step:
                  type: Background
                  name: Background_1
                  identifier: Background_1
                  spec:
                    connectorRef: DockerHub
                    image: docker:dind
                    shell: Sh
              - step:
                  type: Run
                  name: snyk via run step
                  identifier: snyk_via_run_step
                  spec:
                    connectorRef: DockerNoAuth
                    image: snyk/snyk:python
                    shell: Sh
                    command: |

                      # scans the code repository with snyk
                      snyk test \
                         --json /harness > /shared/customer_artifacts/snyk_sca.json | true
                      # snyk SAST scan
                      snyk code test \
                         --json /harness > /shared/customer_artifacts/snyk_sast.json | true
                    envVariables:
                      SNYK_TOKEN: <+secrets.getValue("snyk_api_token")>
                  when:
                    stageStatus: Success
                  failureStrategies:
                    - onFailure:
                        errors:
                          - AllErrors
                        action:
                          type: MarkAsSuccess
              - stepGroup:
                  name: SCA
                  identifier: SCA
                  steps:
                    - parallel:
                        - step:
                            type: Snyk
                            name: Snyk_1
                            identifier: Snyk_1
                            spec:
                              mode: ingestion
                              config: default
                              target:
                                name: dvwp
                                type: repository
                                variant: test
                              advanced:
                                log:
                                  level: info
                              ingestion:
                                file: /shared/customer_artifacts/snyk_sast.json
                        - step:
                            type: Snyk
                            name: Snyk_2
                            identifier: Snyk_2
                            spec:
                              mode: ingestion
                              config: default
                              target:
                                name: dvwp1
                                type: repository
                                variant: test
                              advanced:
                                log:
                                  level: info
                              ingestion:
                                file: /shared/customer_artifacts/snyk_sast.json
        variables:
          - name: runner_tag
            type: String
            value: dev
  identifier: snykcodeingestion
  name: snyk-code-ingestion

```

</details>