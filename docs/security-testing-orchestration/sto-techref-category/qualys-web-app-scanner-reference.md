---
title: Qualys Web Application Scanning (WAS) scanner reference for STO
description: Scan application instances with Qualys WAS.
sidebar_label: Qualys Web Application Scanning (WAS) scanner reference
sidebar_position: 320
---

You can ingest scan results from Qualys Web Application Scanning results into STO.

## Important notes for running Qualys scans in STO

### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Security step settings for Qualys scans in STO

### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

### Qualys scan settings

* `product_name` = `qualys`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Instance scan settings


import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';


<StoLegacyInstance />

### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />


### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />
