---
title: OpenVAS step configuration
description: Scan application instances with OpenVAS.
sidebar_label: OpenVAS step configuration
sidebar_position: 280
---

<DocsTag   text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#instance-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your application instances and ingest results from [OpenVAS](https://www.openvas.org/). 

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



## Custom Scan step settings for OpenVAS scans

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
openvas
```

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

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
ingestionOnly
```


#### Product config name

Specify the type of scan to run when `policy_type` is `orchestratedScan`. 

##### Key
```
product_config_name
```

##### Value

Specify one of the following.

Run a default scan:

```
default
```

Run a host discovery scan on the network:

```
host-discovery
```

Run a network discovery scan:

```
network-discovery
```

Run a full and very deep discovery scan: 

```
full-and-very-deep
```

Run a system discovery scan on the network:

```
openvas-system-discovery
```

### Target and variant


import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';


<StoLegacyTargetAndVariant />

<!-- 
### OpenVAS scan settings

* `product_name` = `openvas`
 * [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_domain`
* `product_access_id`
* `product_access_token`
* `product_config_name`
	+ Accepted values(s):
		- `host-discovery`  — Do a host discovery scan on the network
		- `network-discovery`  — Do a network discovery scan
		- `full-and-very-deep`  — Do a full and very deep discovery scan
		- `openvas-system-discovery`  — Do a system discovery scan on the network
		- `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Product access

These settings are available to access your OpenVAS SaaS instance when `policy_type` is `orchestratedScan`. 

You should [create Harness text secrets](/docs/platform/secrets/add-use-text-secrets) for your encrypted passwords/tokens and reference them using the format `<+secrets.getValue("my-access-token")>`.

#### Product access keys
```
product_domain
```
```
product_app_id
```
```
product_access_token
```



### Instance

import StoLegacyInstance from './shared/custom-scan/_dast.md';

<StoLegacyInstance />



### Ingestion file


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />