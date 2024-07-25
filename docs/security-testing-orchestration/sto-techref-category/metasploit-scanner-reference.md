---
title: Metasploit step configuration
description: Scan application instances with Metasploit Framework.
sidebar_label: Metasploit Framework step configuration
sidebar_position: 230
---

<DocsTag  text="Instance scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#instance-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your application instances and ingest results from [Metasploit Framework](https://docs.rapid7.com/metasploit/msf-overview/).

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

## Custom Scan step settings for Metasploit scans in STO

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
metasploit
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

##### Key
```
product_config_name
```

##### Value

Specify one of the following if you're setting up an orchestration scan.

Brute-force test a host for SSH weak ssh/pass:

```
metasploit-weak-ssh
```

Check HTTPS (443) for Heartbleed vulnerability:

```
metasploit-openssl-heartbleed
```

Finds and applies Metaspoit module by CVE:

```
dynamic-by-cve
```


### Target and variant


import StoLegacyTargetAndVariant  from './shared/custom-scan/_target-variant.md';


<StoLegacyTargetAndVariant />

<!-- 
### Metasploit scan settings

* `product_name` = `metasploit`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
   - `metasploit-weak-ssh` &nbsp; &nbsp;  Brute-force test a host for SSH weak ssh/pass
   - `metasploit-openssl-heartbleed`  &nbsp; &nbsp; Check HTTPS (443) for Heartbleed vulnerability
   - `dynamic-by-cve`  &nbsp; &nbsp; Finds and applies Metaspoit module by CVE 
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Instance scan settings


import StoLegacyInstance from './shared/custom-scan/_dast.md';


<StoLegacyInstance />

### Ingestion file


import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 


<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />