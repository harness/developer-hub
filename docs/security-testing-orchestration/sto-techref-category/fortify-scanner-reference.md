---
title: Fortify Static Code Analyzer step configuration
description: Ingest Fortify scan results into your pipelines.
sidebar_label: Fortify Static Code Analyzer step configuration
sidebar_position: 170
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" /><br/>
<br/>

You can ingest repository scan results from [Fortify Static Code Analyzer](https://www.microfocus.com/documentation/fortify-static-code-analyzer-and-tools/). 

## Workflow description

import StoLegacyWorkflowIngestOnly  from './shared/custom-scan/_workflow-ingest-only.md';

<StoLegacyWorkflowIngestOnly />


## Custom Scan step settings for Fortify scans


### Scanner settings

These settings are required for most scanners. For more information, go to the reference for the scanner integration you're setting up.

- [Product name](#product-name)
- [Scan type](#scan-type)
- [Policy type](#policy-type)
- [Product config name](#product-config-name)


#### Product name

The scanner name. This is required for all Custom Scan steps. 

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

```
repository
```


#### Policy type


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

