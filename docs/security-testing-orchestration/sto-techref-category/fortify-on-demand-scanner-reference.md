---
title: Fortify on Demand scanner reference for STO
description: Repository scans with Fortify on Demand
sidebar_label: Fortify on Demand scanner reference
sidebar_position: 180
---

You can run Fortify scans on your repositories using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

## Important notes for running Fortify on Demand scans in STO

### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Security step settings for Fortify on Demand scans in STO

### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

### Fortify on Demand scan settings

* `product_name` = `fortifyondemand`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =`repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_owner_id`
	+ `product_entitlement`
	+ `product_scan_type`
	+ `product_app_name`
	+ `product_release_name`
	+ `product_target_language`
	+ `product_target_language_version`
	+ `product_scan_settings`
		- accepted values: `Custom`, `default`
	+ `product_audit_type`
	+ `product_lookup_type`
		- accepted values: `Dynamic`, `Static`, `Mobile`
	+ `product_data_center`
* `product_config_name`
	+ Accepted values(s):
	+ `sast` ( if `product_lookup_type` = `Static`)
	+ `dast` ( if `product_lookup_type` = `Dynamic`)
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />



