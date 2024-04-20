---
title: HCL AppScan scanner reference for STO
description: Ingest DAST scan results from HCL AppScan.
sidebar_label: HCL AppScan scanner reference
sidebar_position: 215
---

You can ingest DAST scan results from [HCL AppScan](https://www.hcl-software.com/appscan).

The standard workflow is to add a Security step to your CI Build or Security stage and configure it as described below.


## For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Security step settings for HCL AppScan scans in STO

### Target and variant

import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';

<StoLegacyTargetAndVariant />

### HCL AppScan scan settings

* `product_name` = `app_scan`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

<!-- 
### Instance scan settings

import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';

<StoLegacyInstance />

-->

### Ingestion file

import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';

<StoLegacyIngest />

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />
