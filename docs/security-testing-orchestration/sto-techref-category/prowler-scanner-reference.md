---
title: Prowler scanner reference for STO
description: Scan configurations with Prowler.
sidebar_label: Prowler scanner reference
sidebar_position: 310
---


You can scan your configurations and ingest results from [Prowler](https://github.com/prowler-cloud/prowler), an open-source tool for performing AWS, GCP and Azure security best practices assessments, audits, incident response, continuous monitoring, hardening and forensics readiness. 

## Important notes for running Prowler scans in STO


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Prowler step settings for STO

### Scan

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrchestration from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrchestration />
<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

#### Scan Configuration

<!-- >
import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />
-->

Select the [compliance framework](https://github.com/prowler-cloud/prowler/blob/master/docs/tutorials/compliance.md) to apply when running the scan:
* **Default**
* **Hipaa**
* **GDPR**
* **Exclude Extras**

<!-- TBD -->


### Target

<a name="target-type"></a>

#### Type



import StoSettingScanTypeConfig  from './shared/step_palette/target/type/_config.md';


<StoSettingScanTypeConfig />

<!-- ---------------------------------------------------------------------------- -->

<a name="target-name"></a>

#### Name 


import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

#### Workspace 


import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';



<StoSettingTargetWorkspace  />



### Authentication

Settings for the AWS account to use when running an orchestration scan.

#### Access ID 


import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';



<StoSettingAuthAccessID />

<!-- ---------------------------------------------------------------------------- -->

<a name="auth-access-token"></a>

#### Access Token


import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';



<StoSettingAuthAccessToken />


#### Access Region

The AWS region of the configuration to scan.


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-enforce-ssl"></a>

### Ingestion file 

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';


<StoSettingIngestionFile  />

### Log Level, CLI flags, and Fail on Severity

#### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

#### Additional CLI flags

You can use this field to run the [prowler aws scanner](https://github.com/prowler-cloud/prowler) with specific command-line arguments. For example, this argument excludes specific checks from a scan: `-excluded-checks s3_bucket_public_access`

<!-- ============================================================================= -->
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

* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)


<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for Prowler scans in STO (legacy)

:::note
You can set up Prowler scans using a Security step, but this is a legacy functionality. Harness recommends that you use an [Prowler step](#prowler-step-settings-for-sto) instead.
:::

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Prowler scan settings

* `product_name` = `prowler`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`, `hipaa`, `gdpr`, `exclude_extras`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the [prowler aws scanner](https://github.com/prowler-cloud/prowler) with specific command-line arguments. For example, the following argument excludes a specific check from a scan: `tool_args` = `-excluded-checks s3_bucket_public_access`


#### Configuration scan settings


import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';


<StoLegacyConfig  />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

-->