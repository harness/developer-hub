---
title: Docker Content Trust (DCT) scanner reference
description: Image scans with Docker Content Trust
sidebar_position: 120
---

You can set up Fortify scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

## Before you begin

```mdx-code-block
import StoCreateDinD from './shared/dind-bg-step.md';
```

<StoCreateDinD />

## Security step settings

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `docker-content-trust`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name` =`default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


<!-- CONTAINERS --------------------------------------------------------------------------- -->

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />

