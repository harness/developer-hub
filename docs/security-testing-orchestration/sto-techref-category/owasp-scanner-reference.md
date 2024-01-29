---
title: OWASP Dependency-Check scanner reference for STO
description: Scan code repositories with OWASP Dependency Check.
sidebar_label: OWASP Dependency-Check scanner reference
sidebar_position: 290
---

You can scan your code repositories and ingest results from [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/), an SCA tool for detecting publicly disclosed vulnerabilities contained within a project’s dependencies.


## Important notes for running OWASP scans in STO


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## OWASP step configuration

The recommended workflow is to add an OWASP step to a Security Tests or CI Build stage and then configure it as described below. 


### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target


<!-- ============================================================================= -->
<a name="target-type"></a>

#### Type


import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';



<StoSettingScanTypeRepo />


<!-- ============================================================================= -->
<a name="target-name"></a>

#### Name 


import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />

<!-- ============================================================================= -->
<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

<!-- ============================================================================= -->
<a name="target-workspace"></a>

#### Workspace


import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';



<StoSettingTargetWorkspace  />



### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />




### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags


import StoSettingCliFlags from './shared/step_palette/all/_cli-flags.md';



<StoSettingCliFlags />

You can use this field to run the [dependency-check](https://jeremylong.github.io/DependencyCheck/dependency-check-cli/arguments.html) scanner with specific command-line arguments. For example, you can scan a specific path using the `--scan` argument: `tool_args` = `--scan ‘directory/**/*.jar’`

<a name="fail-on-severity"></a>


#### Fail on Severity


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

<!-- END step-palette-config ----------------------------------------------------------------------------- -->

## Security step settings for OWASP scans in STO (legacy)

You can set up OWASP scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### OWASP Dependency Check scan settings


* `product_name` = `owasp`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the [dependency-check](https://jeremylong.github.io/DependencyCheck/dependency-check-cli/arguments.html) scanner with specific command-line arguments. For example, you can scan a specific path using the `--scan` argument: `tool_args` = `--scan ‘directory/**/*.jar’`

#### Orchestration scan settings


import StoLegacyOrchestration from './shared/legacy/_sto-ref-legacy-orchestrated.md';


<StoLegacyOrchestration />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

