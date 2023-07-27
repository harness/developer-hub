---
title: Clair scanner reference
description: Image scans with Clair
sidebar_position: 100
---

You can set up Clair scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

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

### Clair scan settings

* `product_name` = `docker-content-trust` (clair)
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) :`containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) : `orchestratedScan` or `ingestionOnly`
* `product_url`
* `product_access_id`
* `product_access_token`
* `product_config_name` :  `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Container scan settings 

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />

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




