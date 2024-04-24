---
title: Tenable scanner reference for STO
description: Scan application instances with Tenable.
sidebar_label: Tenable scanner reference
sidebar_position: 400
---


You can scan your application instances and ingest results from Tenable.

## For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Custom Scan step settings for Tenable scans in STO

The recommended workflow is to add a Custom Scan step to a Security or Build stage and then configure it as described below.

### Scanner settings

These settings are required for most scanners. For more information, go to the reference for the scanner integration you're setting up.

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

```
tenableio
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

Must be one of the following. For supported values, go to the relevant scanner reference.

```
instance
```


#### Policy type

The [scan mode](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value


```
orchestratedScan
```
```
ingestionOnly
```


#### Product config name

##### Key
```
product_config_name
```

##### Value

```
default
```

### Target and variant


import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';


<StoLegacyTargetAndVariant />

<!-- 
### Tenable settings

* `product_name` = `tenableio`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_policy_id`
	+ `product_scanner_id`
	+ `product_template_uuid`
* `product_config_name`
	+ Accepted values(s):
		- `legacy-web-application-scan`  — Use legacy nessus scan inside tenableIO
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Instance


import StoLegacyInstance from './shared/custom-scan/_dast.md';


<StoLegacyInstance />

### Product access

These settings are available to access your Tenable instance when `policy_type` is `orchestratedScan`. 

You should create [Harness text secrets](/docs/platform/secrets/add-use-text-secrets) with your encrypted access tokens and access them using the format `<+secrets.getValue("project.my-secret")>`. 

#### Product access keys
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
product_policy_id
```
```
product_scanner_id
```
```
product_template_uuid
```

### Ingestion file


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />


