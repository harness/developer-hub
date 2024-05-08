---
title: Nikto scanner reference for STO
description: Scan application instances with Nikto.
sidebar_label: Nikto scanner reference
sidebar_position: 260
---

You can scan your application instances and ingest results from [Nikto](https://cirt.net/Nikto2), an open-source scanner that runs tests against web servers to detect dangerous files/programs, outdated server versions, and problems with specific server releases. 

## Important notes for running Nikto scans in STO


### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />

### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Nikto step settings for STO scans

The recommended workflow is add a Nikto step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeInst     from './shared/step_palette/target/type/_app.md';

<StoSettingScanTypeInst />


#### Target and variant detection 

import StoSettingScanTypeAutodetectApp from './shared/step_palette/target/auto-detect/_app-instance.md';

<StoSettingScanTypeAutodetectApp/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';



<StoSettingTargetVariant  />

### Instance


<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain


import StoSettingInstanceDomain from './shared/step_palette/instance/_domain.md';


<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol


import StoSettingInstanceProtocol from './shared/step_palette/instance/_protocol.md';



<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port


import StoSettingInstancePort from './shared/step_palette/instance/_port.md';



<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path


import StoSettingInstancePath from './shared/step_palette/instance/_path.md';



<StoSettingInstancePath />

### Ingestion


<a name="ingestion-file"></a>

#### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';


<StoSettingIngestionFile  />


### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

### Additional CLI flags

Use this field to run the [nikto scanner](https://manpages.ubuntu.com/manpages/focal/man1/nikto.1.html) with specific flags. For example, the `-Tuning` flag customizes the tests that the scanner runs. The following example excludes a test from the scan: 

`-Tuning x01`

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />


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

## Security step settings for Nikto scans in STO (legacy)

:::note
You can set up Nikto scans using a Security step, but this is a legacy functionality. Harness recommends that you use an [Nikto step](#nikto-step-settings-for-sto-scans) instead.
:::

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Nikto scan settings

* `product_name` = `nikto`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`(Scan the host on port 80)
		- `nikto-full` (Scan the host on ports 80 and 443 with `-Tuning 9`)
		- `nikto-full-web` (Scan the host on ports 80 and 443)
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the [nikto scanner](https://manpages.ubuntu.com/manpages/focal/man1/nikto.1.html) with specific command-line arguments. For example, you can customize the tests that the scanner runs with the `-Tuning` argument. The following example excludes a test from the scan: `tool_args` = `-Tuning x01`


#### Instance scan settings


import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';


<StoLegacyInstance />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

-->
