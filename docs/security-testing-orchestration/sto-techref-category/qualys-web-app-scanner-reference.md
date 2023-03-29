---
title: Qualys Web Application Scanning (WAS) scanner reference
description: Instance scans with Qualys WAS
sidebar_position: 240
---

## Security step settings

You can set up Qualys scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `qualys`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`


```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


### Instance settings

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

<!-- LEGACY CONFIGS  ---------------------------------------------------------------------------  


```mdx-code-block
import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';
```

<StoLegacyConfig  />


<!-- INSTANCES  --------------------------------------------------------------------------- -->