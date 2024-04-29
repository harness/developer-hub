---
title: Qwiet AI (formerly ShiftLeft) scanner reference for STO
description: Scan code repositories with Qwiet AI.
sidebar_label: Qwiet AI (formerly ShiftLeft) scanner reference
sidebar_position: 330
---

You can scan your code repositories and ingest results from Qwiet. The following steps describe the workflow.

import StoLegacyWorkflow from './shared/custom-scan/_workflow.md';

<StoLegacyWorkflow />


## Custom Scan step settings for Qwiet scans in STO

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
shiftleft
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

`Must be one of the following. For supported values, go to the relevant scanner reference.`

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
### Qwiet AI scan settings

* `product_name` = `shiftleft`:
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
  + `product_access_id`
  + `product_access_token`
  + `product_app_name`
  + `product_target_language`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Product access

These settings are available to access your Qwiet AI SaaS instance when `policy_type` is `dataLoad` or `orchestratedScan`. 

#### Product access keys
```
product_access_id
```
```
product_access_token
```
```
product_app_name
```
```
product_target_language
```

### Ingestion file

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />