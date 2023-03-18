---
title: Snyk scanner reference
description: Image or Repository scans with Snyk
sidebar_position: 290
---


### Security step settings

STO supports the following scan approaches for the following Snyk products:
* Snyk Open Source (`orchestratedScan` or `ingestionOnly`)
* Snyk Code (`ingestionOnly`)
* Snyk Container (`ingestionOnly`)

For a workflow description, go to [Ingest Scan Results from Snyk](/docs/security-testing-orchestration/use-sto/snyk-scans.md).

You can set up Snyk scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />


* `product_name` = `snyk`:
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =  `containerImage` or `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)
	+ accepted value for `containerImage`: `ingestionOnly`
	+ accepted values for `repository`: `orchestratedScan`, `ingestionOnly`
* `product_access_token`
* `product_config_name` = `default`
* `snyk_api` = URL to the Snyk instance, if you're using an on-prem installation.



```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />