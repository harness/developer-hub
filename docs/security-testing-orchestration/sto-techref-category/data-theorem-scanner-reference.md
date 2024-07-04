---
title: Data Theorem step configuration
description: Scan code repositories with Data Theorem.
sidebar_label: Data Theorem step configuration
sidebar_position: 140
---

<DocsTag   text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can extract and ingest scan results for your code repositories from [Data Theorem](https://www.datatheorem.com/). 

## Workflow descriptions

<details>
<summary>Ingestion workflows</summary>

import CustomScanWorkflowIngest from './shared/custom-scan/_workflow-ingest-only.md';

<CustomScanWorkflowIngest />

</details>

<details>
<summary>Orchestration/extraction workflows</summary>


import CustomScanWorkflowRepo from './shared/custom-scan/_workflow.md';

<CustomScanWorkflowRepo />

</details>

## Custom Scan step settings for Data Theorem scans

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

The [scan mode](/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value

Must be one of the following. For supported values, go to the relevant step configuration.

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


### Code repository

import StoLegacyCodeRepository  from './shared/custom-scan/_repo.md';

<StoLegacyCodeRepository />

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

You should [create Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your encrypted passwords and tokens and reference them using the format `<+secrets.getValue("my-access-token")>`.

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





