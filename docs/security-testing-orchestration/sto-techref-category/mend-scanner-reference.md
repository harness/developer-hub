---
title: Mend (formerly Whitesource) scanner reference
description: Container scans with Mend
sidebar_position: 160
---

## Security step settings

You can set up Mend scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `whitesource`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `ingestionOnly`, `dataLoad`, or `orchestratedScan`
* `scan_type` = `container`
* `product_domain` (*optional*) — The default is `https://saas.whitesourcesoftware.com/api`
* `product_access_id`
* `product_access_token`
* `product_include`
* `product_config_name` = `default`
* `product_lookup_type`(*optional*)
- Accepted value(s) when `policy_type` is set to `dataLoad`: 
  - `byName`
	- `byTokens`
- Accepted value(s) when `policy_type` is set to `orchestratedScan`: 
	- `appendToProductByToken`
	- `appendToProductByName`
		
:::note
You must configure the following settings depending on the product lookup type  — i.e., whether you are using the names or tokens to reference the Mend product:
:::

* `product_product_name`
* `product_project_name`
* `product_project_token`
* `product_project_token`


<!-- CONTAINERS --------------------------------------------------------------------------- -->

## Container Image scan settings

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />


<!-- REPOS ---------------------------------------------------------------------------  



```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

<!-- LEGACY INSTANCE  ---------------------------------------------------------------------------  

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