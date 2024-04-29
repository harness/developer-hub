---
title: Docker Content Trust (DCT) scanner reference for STO
description: Scan container images with Docker Content Trust.
sidebar_label: Docker Content Trust (DCT) scanner reference
sidebar_position: 150
---

You can run container image scans and ingest results from [Docker Content Trust (DCT)](https://docs.docker.com/engine/security/trust/). The following steps describe the workflow.

import StoLegacyWorkflow from './shared/custom-scan/_workflow.md';

<StoLegacyWorkflow />


## Custom Scan step settings for Docker Content Trust

### Scanner settings

These settings are required for most scanners. For more information, go to the reference for the scanner integration you're setting up.

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
docker-content-trust
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

### Docker Content Trust (DCT) scan settings

* `product_name` = `docker-content-trust`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name` =`default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

-->

### Container image


import StoLegacyContainer  from './shared/custom-scan/_container.md';


<StoLegacyContainer />

### Ingestion file

import StoLegacyIngest from './shared/custom-scan/_ingestion-file.md'; 

<StoLegacyIngest />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<StoSettingFailOnSeverity />

<!-- CONTAINERS --------------------------------------------------------------------------- -->



