---
title: Brakeman scanner reference for STO
description: Repository scans with Brakeman
sidebar_label: Brakeman scanner reference
sidebar_position: 80
---

You can run [Brakeman](https://brakemanscanner.org/) scans on your Ruby on Rails applications. 


## Important notes for running Brakeman scans in STO


### Docker-in-Docker requirements



import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />


### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Brakeman step settings for STO scans

The recommended workflow is to add an Brakeman step to a Security Tests or CI Build stage and then configure it as described below. You can also configure Brakeman scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration).





<details>
<summary>Scanner Template</summary>

![](static/step-palette-00.png)

</details>

### Scan settings

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<!-- ============================================================================= -->
<a name="scan-config"></a>

#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';


<StoSettingProductConfigName />


### Target settings


<!-- ============================================================================= -->
<a name="target-type"></a>

#### Type


import StoSettingScanTypeRepo from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';



<StoSettingScanTypeRepo />


<!-- ============================================================================= -->
<a name="target-name"></a>

#### Name 


import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />

<!-- ============================================================================= -->
<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

<!-- ============================================================================= -->
<a name="target-workspace"></a>

#### Workspace (_repository_)


import StoSettingTargetWorkspace from './shared/step_palette/_sto-ref-ui-target-workspace.md';


<StoSettingTargetWorkspace  />



### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';


<StoSettingIngestionFile  />




### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags


import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';


<StoSettingCliFlags />

<a name="fail-on-severity"></a>


#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

<!--
You can add a `tool_args` setting to run the [Brakeman scanner binary](https://pypi.org/project/Brakeman/1.0.1/) with specific command-line arguments. For example, you can skip certain tests using  `-skip` followed by a list of test IDs: `tool_args` = `-skip testID_1, testID_3, testID_5`
-->

You can add a `tool_args` setting to run the [Brakeman scanner binary](https://brakemanscanner.org/docs/options/) with specific command-line arguments.  For example, suppose yoou want to scan only a subpath rather than the full directory. You can use `-path` followed by the path: `tool_args` = `--path some/path/to/app` 


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

## Security step settings for Brakeman scans in STO (legacy)

You can set up any supported scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Brakeman scan settings

* `product_name` = `brakeman`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the brakeman scanner with specific command-line arguments. For example, you can generate warnings with only the highest confidence using `-w3`: `tool_args` = `-w3`

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />


#### Fail on Severity

<StoSettingFailOnSeverity />


