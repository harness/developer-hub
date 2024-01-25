---
title: AWS Security Hub scanner reference for STO
description: Scan configurations with AWS Image scanner.
sidebar_label: AWS Security Hub scanner reference
sidebar_position: 50
---

You can scan your configurations using [AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html), which provides a comprehensive view of your security state in AWS and helps you check your environment against security industry standards and best practices. 

## Important notes for running AWS Security Hub scans in STO

### Docker-in-Docker requirements



import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />


### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## AWS Security Hub step configuration

### Scan settings

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeData from './shared/step_palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeData />
<StoSettingScanModeIngest />

<!-- ---------------------------------------------------------------------------- -->

<a name="scan-config"></a>

#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />

### Target settings

<a name="target-type"></a>

#### Type

import StoSettingScanTypeConfig  from './shared/step_palette/target/type/_config.md';

<StoSettingScanTypeConfig />

<!-- ---------------------------------------------------------------------------- -->

<a name="target-name"></a>

#### Name 

import StoSettingTargetName from './shared/step_palette/_sto-ref-ui-target_name.md';

<StoSettingTargetName />


<!-- ---------------------------------------------------------------------------- -->

<a name="target-variant"></a>

#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

### Ingestion File 

import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';

<StoSettingIngestionFile  />

### Authentication settings

You should create [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) with your encrypted access ID and token and access them using the format `<+secrets.getValue("project.my-secret")>`. 

#### Access ID 

The access ID for your AWS account.

#### Access Token

The access token for your AWS account.

<!-- 
#### Access Region

Your AWS region. 

-->

### Log Level, CLI flags, and Fail on Severity

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />


<!-- ============================================================================= -->
<a name="cli-flags"></a>

#### Additional CLI flags


import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';


<StoSettingCliFlags />

<!-- ============================================================================= -->
<a name="fail-on-severity"></a>

#### Fail on Severity



import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';


<StoSettingFailOnSeverity />



## Security step settings for AWS Security Hub scans in STO (*legacy*)

You can set up an AWS Security Hub scan using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.


<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->


* `product_name` : `aws-security-hub`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `dataLoad` or `ingestionOnly`
* `product_config_name` : `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Configuration settings


import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';


<StoLegacyConfig  />

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />


<!-- INSTANCES  --------------------------------------------------------------------------- -->