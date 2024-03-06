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


#### Type

import StoSettingScanTypeRepo from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo />
<StoSettingScanTypeAutodetectNote />


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


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
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

## Troubleshoot Yarn Audit Analyzer exceptions 

<!-- https://harness.atlassian.net/browse/STO-6975 -->

The full exception is: `[DependencyCheck] [ERROR] Exception occurred initializing Yarn Audit Analyzer`

The OWASP scan step does not include a Yarn package out of the box. Harness seeks to  keep these images as small and as lightweight as possible, and to minimize the number of vulnerabilities in each image.

To scan a repository that uses Yarn or another package that isn't in the base image, create a custom OWASP scanner image with the packages you need. For more information, go to [Create custom scanner images](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/create-custom-scan-images). This topic includes a step-by-step workflow for [creating a custom image with OWASP, Yarn, and PNPM](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/create-custom-scan-images#hands-on-example-add-yarn-and-pnpm-to-an-owasp-image). 

If you get this message when scanning a repo that doesn't use Yarn, there might be an errant `yarn.lock` file somewhere in the repo. To disable the OWASP Yarn Audit Analyzer, add the option `--disableYarnAudit` to [Additional CLI flags](/docs/security-testing-orchestration/sto-techref-category/owasp-scanner-reference#additional-cli-flags) in the OWASP scan step.



<!-- STO-7187 remove legacy configs for scanners with step palettes

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

-->