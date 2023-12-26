---
title: OWASP Dependency-Check scanner reference for STO
description: Repository scans with OWASP Dependency Check
sidebar_label: OWASP Dependency-Check scanner reference
sidebar_position: 290
---

You can scan your code repositories using [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/), an SCA tool for detecting publicly disclosed vulnerabilities contained within a project’s dependencies.


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

The recommended workflow is to add an OWASP step to a Security Tests or CI Build stage and then configure it as described below. You can also configure OWASP scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 








### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<!-- ============================================================================= -->
<a name="scan-config"></a>

### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';


<StoSettingProductConfigName />


### Target


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

#### Workspace


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

You can use this field to run the [dependency-check](https://jeremylong.github.io/DependencyCheck/dependency-check-cli/arguments.html) scanner with specific command-line arguments. For example, you can scan a specific path using the `--scan` argument: `tool_args` = `--scan ‘directory/**/*.jar’`

<a name="fail-on-severity"></a>


#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

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

## Security step settings for OWASP scans in STO (*legacy*)

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

#### Orchestrated scan settings


import StoLegacyOrchestrated from './shared/legacy/_sto-ref-legacy-orchestrated.md';


<StoLegacyOrchestrated />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

