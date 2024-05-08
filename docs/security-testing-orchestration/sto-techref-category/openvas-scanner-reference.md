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


## Security step settings for OpenVAS scans in STO

### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

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

### Instance scan settings


import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';


<StoLegacyInstance />

### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />