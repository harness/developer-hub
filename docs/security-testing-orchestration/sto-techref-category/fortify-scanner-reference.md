---
title: Fortify Static Code Analyzer scanner reference for STO
description: Ingest Fortify scan results into your pipelines.
sidebar_label: Fortify Static Code Analyzer scanner reference
sidebar_position: 170
---

You can ingest repository scan results from Fortify.

## Important notes for running Fortify scans in STO


### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Custom Scan step settings for Fortify scans in STO

### Scanner settings

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
fortify
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
repository
```


#### Policy type

The [scan mode](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value

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

### Fortify scan settings

* `product_name` = `fortify`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name` =`default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Ingestion file


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />



### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />

