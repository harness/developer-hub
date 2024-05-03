---
title: HCL AppScan scanner reference for STO
description: Ingest DAST scan results from HCL AppScan.
sidebar_label: HCL AppScan scanner reference
sidebar_position: 215
---

<DocsTag   text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#instance-scanners"  />
<DocsTag  text="Ingestion" link="/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline" /><br/>
<br/>


You can ingest DAST scan results from [HCL AppScan](https://www.hcl-software.com/appscan). The following steps describe the workflow. 

import StoLegacyWorkflow from './shared/custom-scan/_workflow.md';

<StoLegacyWorkflow />

## Custom Scan step settings for HCL AppScan scans in STO

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
app_scan
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
### HCL AppScan scan settings

* `product_name` = `app_scan`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Ingestion file

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />
