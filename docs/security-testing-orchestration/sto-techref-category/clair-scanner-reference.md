---
title: Clair scanner reference for STO
description: Scan container images with Clair.
sidebar_label: Clair scanner reference
sidebar_position: 110
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" link="/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" link="/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline/" />
<br/>
<br/>

You can scan container images and ingest results from [Clair](https://github.com/quay/clair). The following steps describe the workflow. 

import StoLegacyWorkflow from './shared/custom-scan/_workflow.md';

<StoLegacyWorkflow />


## Custom Scan step settings for Clair

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
clair
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

```
containerImage
```


#### Policy type

The [scan mode](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value

Must be one of the following.

```
orchestratedScan
```
```
ingestionOnly
```



#### Product config name

Required for orchestration scans. 

##### Key
```
product_config_name
```

##### Value

```yaml
default
```


### Target and variant

import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';

<StoLegacyTargetAndVariant />

<!--
### Clair scan settings

* `product_name` = `docker-content-trust` (clair)
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) :`containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan` or `ingestionOnly`
* `product_url`
* `product_access_id`
* `product_access_token`
* `product_config_name` :  `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Container scan settings 

import StoLegacyContainer  from './shared/custom-scan/_container.md';

<StoLegacyContainer />


### Ingestion file 

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />




