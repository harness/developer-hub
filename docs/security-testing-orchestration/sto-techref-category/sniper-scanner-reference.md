---
title: Sniper scanner reference
description: Instance scans with Sniper
sidebar_position: 280
---


## Security step settings

You can set up Sniper scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />


* `product_name` = `sniper`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)=  `orchestratedScan` or `ingestionOnly`
* `product_config_name`
  - `default`  — Run a basic sniper scan on a target
  - `web`  — Sniper Stealth Mode
  - `stealth`  — Run the web based scan

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

### Instance scan settings

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />
