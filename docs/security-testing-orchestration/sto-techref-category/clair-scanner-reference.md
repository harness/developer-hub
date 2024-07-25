---
title: Clair step configuration
description: Scan container images with Clair.
sidebar_label: Clair step configuration
sidebar_position: 110
---

<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan container images and ingest results from [Clair](https://github.com/quay/clair). 

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


## Custom Scan step settings for Clair

### Scanner settings

These settings are required.

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

```yaml
docker_image_scan
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

The [scan mode](/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview) to use. 

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


##### Key
```
product_config_name
```

##### Value

```yaml
default
```

### Product access 

These settings are available to access the Clair API when `policy_type` is `orchestratedScan`. 

You should [create Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your encrypted passwords and tokens and reference them using the format `<+secrets.getValue("my-access-token")>`.

```
product_url
```
```
product_access_id
```
```
product_access_token
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




