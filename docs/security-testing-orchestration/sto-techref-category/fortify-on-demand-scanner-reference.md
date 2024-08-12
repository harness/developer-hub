---
title: Fortify on Demand step configuration
description: Ingest Fortify on Demand scan results into your pipelines.
sidebar_label: Fortify on Demand step configuration
sidebar_position: 180
---

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview#extraction-scans-in-sto" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" /><br/>
<br/>

You can scan your repositories and ingest scan results from [Fortify on Demand](https://www.microfocus.com/documentation/fortify-on-demand/). 

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



## Custom Scan step settings for Fortify on Demand

### Scanner settings

These settings are required.

- [Product name](#product-name)
- [Scan type](#scan-type)
- [Policy type](#policy-type)
- [Product config name](#product-config-name)


#### Product name

The scanner name. 

##### Key
```
product_name
```

##### Value

```yaml
fortifyondemand
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

If `product_lookup_type` = `Static`:

```
sast
```
If `product_lookup_type` = `Dynamic`:

```
dast
```


### Target and variant

import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';

<StoLegacyTargetAndVariant />

<!-- 

### Fortify on Demand scan settings

* `product_name` = `fortifyondemand`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =`repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_owner_id`
	+ `product_entitlement`
	+ `product_scan_type`
	+ `product_app_name`
	+ `product_release_name`
	+ `product_target_language`
	+ `product_target_language_version`
	+ `product_scan_settings`
		- accepted values: `Custom`, `default`
	+ `product_audit_type`
	+ `product_lookup_type`
		- accepted values: `Dynamic`, `Static`, `Mobile`
	+ `product_data_center`
* `product_config_name`
	+ Accepted values(s):
	+ `sast` ( if `product_lookup_type` = `Static`)
	+ `dast` ( if `product_lookup_type` = `Dynamic`)
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Repository

import StoLegacyRepo from './shared/custom-scan/_repo.md'; 

<StoLegacyRepo />

### Product access

These settings are available to access your Fortify on Demand SaaS instance when `policy_type` is `orchestratedScan` or `dataLoad`. 

You should [create Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your encrypted passwords and tokens and reference them using the format `<+secrets.getValue("my-access-token")>`.

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
product_owner_id
```
```
product_entitlement
```
```
product_scan_type
```
```
product_app_name
```
```
product_release_name
```
```
product_target_language
```
```
product_target_language_version
```
```
product_audit_type
```
```
product_data_center
```

#### Product scan settings

##### Key

```
product_scan_settings
```

##### Values

```
Custom
```
```
default
```

#### Product lookup type


##### Key

```
product_lookup_type
```

##### Values

```
Dynamic
```
```
Static
```
```
Mobile
```



### Ingestion file


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />



### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />



