---
title: Fortify on Demand scanner reference for STO
description: Ingest Fortify on Demand scan results into your pipelines.
sidebar_label: Fortify on Demand scanner reference
sidebar_position: 180
---

You can scan repositories and ingest scan results from  Fortify on Demand.

## Important notes for running Fortify on Demand scans in STO

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Custom Scan step settings for Fortify on Demand scans in STO

### Scanner settings

These settings are required. 

- [Product name](#product-name)
- [Scan type](#scan-type)
- [Policy type](#policy-type)
- [Product config name](#product-config-name)


#### Product name

The scanner name. Required for all Custom Scan steps. 

##### Key
```
product_name
```

##### Value

```yaml
fortifyondemand
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

```
repository
```


#### Policy type

The [scan mode](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value

Must be one of the following. For supported values, go to the relevant scanner reference.

```
orchestratedScan
```
```
ingestionOnly
```
```
dataLoad
```

#### Product config name

Required for most scanner integrations. 

##### Key
```
product_config_name
```

##### Value

If `product_lookup_type` = `Static`:

```
sast
```
If `product_lookup_type` = `Dynamic`:

```
dast
```


### Target and variant

import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';

<StoLegacyTargetAndVariant />

<!-- 

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

-->

### Product access

These settings are available to access your Fortify on Demand SaaS instance when `policy_type` is `orchestratedScan` or `dataLoad`. 

#### Product access keys
```
product_name
```
```
product_domain
```
```
product_access_id
```
```
product_access_token
```
```
product_owner_id
```
```
product_entitlement
```
```
product_scan_type
```
```
product_app_name
```
```
product_release_name
```
```
product_target_language
```
```
product_target_language_version
```
```
product_audit_type
```

#### Product scan settings

##### Key

```
product_scan_settings
```

##### Values

```
Custom
```
```
default
```

#### Product lookup type


##### Key

```
product_lookup_type
```

##### Values

```
Dynamic
```
```
Static
```
```
Mobile
```



### Ingestion file


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />



### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />



