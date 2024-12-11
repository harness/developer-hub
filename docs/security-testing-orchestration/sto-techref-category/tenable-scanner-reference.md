---
title: Tenable step configuration
description: Scan application instances with Tenable.
sidebar_label: Tenable step configuration
sidebar_position: 400
---

<!--DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  / -->
<DocsTag  text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#instance-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<!-- DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" / -->
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your container images and application instances using [Tenable](https://docs.tenable.com/) and then ingest the results from Harness. 

## Workflow descriptions

<details>
<summary>Orchestration/extraction workflows</summary>

import CustomScanWorkflowRepo from './shared/custom-scan/_workflow.md';

<CustomScanWorkflowRepo />

</details>

<details>
<summary>Ingestion workflows</summary>

import CustomScanWorkflowIngest from './shared/custom-scan/_workflow-ingest-only.md';

<CustomScanWorkflowIngest />

</details>


## Custom Scan step settings for Tenable scans in STO

The recommended workflow is to add a Custom Scan step to a Security or Build stage and then configure it as described below.

### Scanner settings

These settings are all required.

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
tenableio
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

Must be one of the following. 

```
instance
```


#### Policy type

The [scan mode](/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value


```
orchestratedScan
```
```
dataLoad
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

Use the legacy Nessus scan inside tenableIO:

```
legacy-web-application-scan
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

You should [create Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your encrypted passwords/tokens and reference them using the format `<+secrets.getValue("my-access-token")>`.

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

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />
