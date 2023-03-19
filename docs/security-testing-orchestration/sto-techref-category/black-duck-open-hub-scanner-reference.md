---
title: Black Duck Open Hub scanner reference
description: Image and repository scans with Black Duck Open Hub scanner
sidebar_position: 60
---


## Security step settings

You can set up any supported scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `blackduckhub`
* `product_config_name` = `default`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository` or `container`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) =  `orchestratedScan` , `ingestionOnly`, or `dataLoad`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `product_domain`
	+ `product_auth_type` = `usernamePassword` | `apiKey`
	+ `product_access_id`: API username
	+ `product_access_token` API password or API key
	+ `product_api_version`
	+ `product_project_name`
	+ `product_project_version`


### Container Image scan settings

<!-- CONTAINERS --------------------------------------------------------------------------- -->

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />


<!-- REPOS --------------------------------------------------------------------------- -->

### Repository scan settings

```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

<!-- LEGACY INSTANCE  --------------------------------------------------------------------------- 


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