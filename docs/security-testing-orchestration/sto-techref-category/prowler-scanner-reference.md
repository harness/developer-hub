---
title: Prowler scanner reference for STO
description: Configuration scans with Prowler
sidebar_label: Prowler scanner reference
sidebar_position: 310
---


You can scan your configurations using [Prowler](https://github.com/prowler-cloud/prowler), an open-source tool for performing AWS, GCP and Azure security best practices assessments, audits, incident response, continuous monitoring, hardening and forensics readiness. 

## Important notes for running Prowler scans in STO


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Prowler step configuration

### Scan settings

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrchestrated from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrchestrated />
<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

#### Scan Configuration

<!-- >

import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';


<StoSettingProductConfigName />

-->

Select the [compliance framework](https://github.com/prowler-cloud/prowler/blob/master/docs/tutorials/compliance.md) to apply when running the scan:
* **Default**
* **Hipaa**
* **GDPR**
* **Exclude Extras**

<!-- TBD -->


### Target settings

<a name="target-type"></a>

#### Type



import StoSettingScanTypeConfig  from './shared/step_palette/_sto-ref-ui-scan-type-03-config.md';


<StoSettingScanTypeConfig />

<!-- ---------------------------------------------------------------------------- -->

<a name="target-name"></a>

#### Name 


import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

#### Workspace 


import StoSettingTargetWorkspace from './shared/step_palette/_sto-ref-ui-target-workspace.md';


<StoSettingTargetWorkspace  />

### Ingestion File 



import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';


<StoSettingIngestionFile  />

### Authentication settings

Settings for the AWS account to use when running an orchestrated scan.

#### Access ID 


import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';


<StoSettingAuthAccessID />

<!-- ---------------------------------------------------------------------------- -->

<a name="auth-access-token"></a>

#### Access Token


import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';


<StoSettingAuthAccessToken />


#### Access Region

The AWS region of the configuration to scan.


<!-- ---------------------------------------------------------------------------- -->
<a name="auth-enforce-ssl"></a>


### Log Level, CLI flags, and Fail on Severity

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

#### Additional CLI flags

You can use this field to run the [prowler aws scanner](https://github.com/prowler-cloud/prowler) with specific command-line arguments. For example, you can exclude specific checks from a scan like this: `-excluded-checks s3_bucket_public_access`

<!-- ============================================================================= -->
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


## Security step settings for Prowler scans in STO (*legacy*)

You can set up Prowler scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

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
* `tool_args` — You can use this field to run the [prowler aws scanner](https://github.com/prowler-cloud/prowler) with specific command-line arguments. For example, you can exclude specific check from a scan like this: `tool_args` = `-excluded-checks s3_bucket_public_access`


#### Configuration scan settings


import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';


<StoLegacyConfig  />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

