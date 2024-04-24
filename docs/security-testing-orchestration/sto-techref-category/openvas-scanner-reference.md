---
title: OpenVAS scanner reference for STO
description: Scan application instances with OpenVAS.
sidebar_label: OpenVAS scanner reference
sidebar_position: 280
---

You can ingest application-instance scan results from OpenVAS.

## For more information

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />


## Custom Scan step settings for OpenVAS scans in STO

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

The [scan mode](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/sto-workflows-overview) to use. 

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

Specify one of the following.

```
default
```

Do a host discovery scan on the network:

```
host-discovery
```

Do a network discovery scan:

```
network-discovery
```

Do a full and very deep discovery scan: 

```
full-and-very-deep
```

Do a system discovery scan on the network:

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