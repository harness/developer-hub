---
title: Nexus scanner reference
description: Repository scans with Nexus
sidebar_position: 180
---


### Security step settings

You can set up Nexus scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

<details><summary>Nexus configuration in a Security step</summary>

```mdx-code-block
import security_step_nexus from './static/security-step-nexus.png'
```

```mdx-code-block
<img src={security_step_nexus} alt="Configuring a Nexus scan in a Security step" height="50%" width="50%" />
```

</details>

* `product_name` = `nexusiq`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`:
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_organization_id`
	+ `product_project_name`
	+ `product_lookup_type`
		- accepted value(s): `byPrivateId`, `byPublicId`
	+ When `product_lookup_type` is set to `byPublicId`:
		- product\_public\_id
	+ When `product_lookup_type` is set to `byPrivateId`:
		- product\_private\_id
	+ `product_config_name`
		- Accepted values(s): `default`
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
