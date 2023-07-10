---
title: Brakeman scanner reference
description: Repository scans with Brakeman
sidebar_position: 70
---

You can scan your container images using [Brakeman](https://brakemanscanner.org/), a free tool for scanning Ruby on Rails applications. 


<!-- START step-palette-config ----------------------------------------------------------------------------- -->

## Brakeman step configuration

The recommended workflow is to add an Brakeman step to a Security Tests or CI Build stage and then configure it as described below. You can also configure Brakeman scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 

```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

<details>
    <summary>Scanner Template</summary>

![](static/step-palette-00.png) 

</details>

### Scan settings

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<!-- ============================================================================= -->
<a name="scan-config"></a>

#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />


### Target settings


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

You can add a `tool_args` setting to run the [Brakeman scanner binary](https://pypi.org/project/Brakeman/1.0.1/) with specific command-line arguments. For example, you can skip certain tests using  `-skip` followed by a list of test IDs: `tool_args` = `-skip testID_1, testID_3, testID_5`


### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/ci-technical-reference/background-step-settings/#privileged)
* [Image Pull Policy](/docs/continuous-integration/ci-technical-reference/background-step-settings/#image-pull-policy)
* [Run as User](/docs/continuous-integration/ci-technical-reference/background-step-settings/#run-as-user)
* [Set Container Resources](/docs/continuous-integration/ci-technical-reference/background-step-settings/#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/Governance/Policy-as-code/harness-governance-overview)

## Security step settings (*deprecated*)


You can set up any supported scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `brakeman`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the brakeman scanner with specific command-line arguments. For example, you can generate warnings with only the highest confidence using `-w3`: `tool_args` = `-w3`


```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />


#### Fail on Severity

<StoSettingFailOnSeverity />


## YAML pipeline example

<details><summary>Brakeman example pipeline</summary>

```yaml
pipeline:
  name: brakeman
  identifier: brakeman
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: owasp_railsgoat
        build: <+input>
  stages:
    - stage:
        name: brakeman
        identifier: brakeman
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
          execution:
            steps:
              - step:
                  type: Security
                  name: brakeman
                  identifier: brakeman
                  spec:
                    privileged: true
                    settings:
                      policy_type: orchestratedScan
                      scan_type: repository
                      product_name: brakeman
                      product_config_name: brakeman-default
                      repository_project: railsgoat
                      repository_branch: <+codebase.branch>
                      tool_args: "-A"
                    imagePullPolicy: Always
          serviceDependencies:
            - identifier: dind
              name: dind
              type: Service
              spec:
                connectorRef: account.harnessImage
                image: docker:dind
                privileged: true
                entrypoint:
                  - dockerd-entrypoint.sh
        variables:
          - name: fail_on_severity
            type: String
            default: "0"
            value: <+input>
          - name: runner_registry_username
            type: String
            value: _json_key_base64
          - name: runner_registry_token
            type: Secret
            value: readonlyGARb64serviceaccount
          - name: runner_registry_domain
            type: String
            value: us-east1-docker.pkg.dev
          - name: runner_registry_image_prefix
            type: String
            value: sto-play/sto-private
          - name: runner_tag
            type: String
            value: dev
          - name: LOG_LEVEL
            type: String
            value: DEBUG

```

</details>