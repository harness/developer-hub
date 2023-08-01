---
title: Nessus scanner reference
description: Instance scans with Nessus
sidebar_position: 170
---

You can run Nessus scans on your instances using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

## Before you begin

### Docker-in-Docker requirements

```mdx-code-block
import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';
```

<StoDinDRequirements />

### Root access requirements

```mdx-code-block
import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';
```

<StoRootRequirements />

## Security step settings

### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

### Nessus scan settings

* `product_name` = `nessus`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) :  `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan` or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
  - `product_domain`
  - `product_access_id`
  - `product_access_token`
  - `product_policy_id`
  - `product_scanner_id`
  - `product_template_uuid`
* `product_config_name` : `nessus-web-application`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).


### Instance settings

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

### Ingestion file

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />
