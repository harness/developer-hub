---
title: HQL AppScan scanner reference for STO
description: Ingest DAST scan results from HQL AppScan.
sidebar_label: HQL AppScan scanner reference
sidebar_position: 215
---

You can ingest DAST scan results from [HQL AppScan](https://www.hcl-software.com/appscan).

The standard workflow is to add a Security step to your CI Build or Security Tests stage and configure it as described below.


## Important notes for running HQL AppScan scans in STO

<!--
### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

-->

### Root access requirements

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';

<StoRootRequirements />


### For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Security step settings for HQL AppScan scans in STO

### Target and variant

import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';

<StoLegacyTargetAndVariant />

### HQL AppScan scan settings

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