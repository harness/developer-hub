---
title: OpenVAS scanner reference
description: Instance scans with OpenVAS
sidebar_position: 200
---


### Security step settings

You can set up OpenVAS scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

<!-- 
```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

-->

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

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />