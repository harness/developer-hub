---
title: Reapsaw scanner reference for STO
description: Scan code repositories with Reapsaw.
sidebar_label: Reapsaw scanner reference scanner reference
sidebar_position: 340
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Ingestion" link="/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can ingest scan results for your code repositories from [Reapsaw](https://github.com/dowjones/reapsaw/wiki). The following steps describe the workflow. 

import StoLegacyWorkflowIngestOnly  from './shared/custom-scan/_workflow-ingest-only.md';

<StoLegacyWorkflowIngestOnly />


## Custom Scan step settings for Reapsaw scans in STO

The recommended workflow is to add a Custom Scan step to a Security or Build stage and then configure it as described below.

### Scanner settings

These settings are all required.

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
reapsaw
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

```
ingestionOnly
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
### Reapsaw scan settings

* `product_name` = `reapsaw`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
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



