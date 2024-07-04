---
title: ScoutSuite step configuration
description: Scan configurations with ScoutSuite.
sidebar_label: ScoutSuite step configuration
sidebar_position: 350
---

<DocsTag   text="Configuration scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad"   link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuration-scanners"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can ingest configuration scan results from [ScoutSuite](https://github.com/nccgroup/ScoutSuite). 

## Workflow description

import CustomScanWorkflowIngest from './shared/custom-scan/_workflow-ingest-only.md';

<CustomScanWorkflowIngest />


## Custom Scan step settings for ScoutSuite scans in STO

The recommended workflow is to add a Custom Scan step to a Security or Build stage and then configure it as described below.

### Scanner settings

These settings are required.

- [Product name](#product-name)
- [Scan type](#scan-type)
- [Policy type](#policy-type)
- [Product config name](#product-config-name)



#### Product name


##### Key
```
product_name
```

##### Value

```
scoutsuite
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

```
configuration
```

#### Policy type

The [scan mode](/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview) to use. 

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
### ScoutSuite scan settings

* `product_name` = `scoutsuite` (aws only)
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Configuration scan settings 

import StoLegacyConfig from './shared/custom-scan/_config.md';

<StoLegacyConfig  />

-->

### Ingestion file

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />



