---
title: ScoutSuite scanner reference for STO
description: Scan configurations with ScoutSuite.
sidebar_label: ScoutSuite scanner reference
sidebar_position: 350
---

You can ingest configuration scan results from ScoutSuite.

## For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />

## Custom Scan step settings for ScoutSuite scans in STO

The recommended workflow is to add a Custom Scan step to a Security or Build stage and then configure it as described below.

### Target and variant

import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';

<StoLegacyTargetAndVariant />


### ScoutSuite scan settings

* `product_name` = `scoutsuite` (aws only)
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Configuration scan settings 

import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';

<StoLegacyConfig  />

### Ingestion file

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />



