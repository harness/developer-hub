---
title: Prowler scanner reference
description: Configuration scans with Prowler
sidebar_position: 220
---


## Security step settings

You can set up Prowler scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />


* `product_name` = `prowler`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `configuration`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
	+ Accepted values(s):
		- `default`, `hipaa`, `gdpr`, `exclude_extras`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the [prowler aws scanner](https://github.com/prowler-cloud/prowler) with specific command-line arguments. For example, you can exclude specific check from a scan like this: tool_args = -excluded-checks s3_bucket_public_access

### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


### Configuration settings

```mdx-code-block
import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';
```

<StoLegacyConfig  />
