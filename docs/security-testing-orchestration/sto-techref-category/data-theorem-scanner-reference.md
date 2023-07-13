---
title: Data Theorem scanner reference
description: Repository scans with Data Theorem
sidebar_position: 110
---


## Security step settings

You can set up any supported scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

<!-- 
```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

-->

* `product_name` = `data-theorem`
* `product_config_name` = `default`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `dataLoad` or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `dataLoad`:
	+ `product_app_id`
	+ `product_access_token`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />





