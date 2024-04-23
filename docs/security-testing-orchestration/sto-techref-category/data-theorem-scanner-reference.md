---
title: Data Theorem scanner reference for STO
description: Scan code repositories with Data Theorem.
sidebar_label: Data Theorem scanner reference
sidebar_position: 140
---

You can run repository scans and ingest results from Data Theorem.


## Important notes for running Data Theorem scans in STO


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />

### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## Custom Scan step settings for Data Theorem scans in STO

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
data-theorem
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

```
default
```

### Target and variant

import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';

<StoLegacyTargetAndVariant />

<!-- 
### Data Theorem scan settings

* `product_name` = `data-theorem`
* `product_config_name` = `default`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `dataLoad` or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `dataLoad`:
	+ `product_app_id`
	+ `product_access_token`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Ingestion file

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />

### Product access

These settings are available to access your Data Theorem SaaS instance when `policy_type` is `dataLoad`. 

#### Product access keys
```
product_app_id
```
```
product_access_token
```

### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />





