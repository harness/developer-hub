---
title: Snyk scanner reference for STO
description: Image and repository scans with Snyk
sidebar_label: Snyk scanner reference
sidebar_position: 10
---


Harness STO supports the following scan types for the following Snyk products:
* Snyk Open Source — `orchestratedScan` and `ingestionOnly` 
* Snyk Code  —  `ingestionOnly` 
* Snyk Container  — `ingestionOnly` 
* Snyk infrastructure as Code  — `ingestionOnly` is in BETA

For complete end-to-end workflow descriptions, go to [Run Snyk scans and ingest results](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scans.md).

## Important notes for running Snyk scans in STO


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Snyk step configuration

The recommended workflow is add a Snyk step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 

<!--






<details>
<summary>Scanner Template</summary>

![](static/step-palette-00.png)

</details>

-->

### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from '../shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from '../shared/step_palette//_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from '../shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration


import StoSettingProductConfigName from '../shared/step_palette/_sto-ref-ui-product-config-name.md';


<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type


import StoSettingScanType from '../shared/step_palette/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo     from '../shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from '../shared/step_palette/_sto-ref-ui-scan-type-01-container.md';


<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Name 


import StoSettingProductID from '../shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from '../shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

#### Workspace (_repository_)


import StoSettingTargetWorkspace from '../shared/step_palette/_sto-ref-ui-target-workspace.md';


<StoSettingTargetWorkspace  />



### Ingestion File


import StoSettingIngestionFile from '../shared/step_palette/_sto-ref-ui-ingestion-file.md';


<StoSettingIngestionFile  />

### Authentication


#### Access Token (_Orchestration scans_)


import StoSettingAuthAccessToken from '../shared/step_palette/_sto-ref-ui-auth-access-token.md';


<StoSettingAuthAccessToken />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from '../shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />



#### Fail on Severity


import StoSettingFailOnSeverity from '../shared/step_palette/_sto-ref-ui-fail-on-severity.md';

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



## Security step settings for Snyk scans in STO (legacy)

You can set up Snyk scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant


import StoLegacyTargetAndVariant  from '../shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Snyk scan settings

* `product_name` = `snyk`:
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `containerImage` or `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value for `containerImage`: `ingestionOnly`
	+ accepted values for `repository`: `orchestratedScan`, `ingestionOnly`
* `product_access_token`
* `product_config_name` : `default`
* `snyk_api` :  URL to the Snyk instance, if you're using an on-prem installation.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Container scan settings


import StoLegacyContainer from '../shared/legacy/_sto-ref-legacy-container.md';


<StoLegacyContainer />

#### Ingestion file


import StoLegacyIngest from '../shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

