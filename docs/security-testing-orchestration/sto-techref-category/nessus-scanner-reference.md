---
title: Nessus scanner reference
description: Instance scans with Nessus
sidebar_position: 170
---


## Security step settings

You can set up Nessus scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `nessus`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =  `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
  - `product_domain`
  - `product_access_id`
  - `product_access_token`
  - `product_policy_id`
  - `product_scanner_id`
  - `product_template_uuid`
* `product_config_name` = `nessus-web-application`



<!-- CONTAINERS ---------------------------------------------------------------------------

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />


<!-- REPOS ---------------------------------------------------------------------------  

### Repository scan settings

```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

<!-- LEGACY INSTANCE  ---------------------------------------------------------------------------  -->

### Instance settingd

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