---
title: Burp scanner reference
description: Instance scans with Burp
sidebar_position: 80
---

You can run Burp scans on your instances using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<details><summary>Burp scan configuration in Security step</summary>

![](./static/burp-security-scan-step.png)

</details>

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

### Burp scan settings

* `product_name` = `burp`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* `product_config_name`
	+ The following configurations are available. These are [built-in configurations](https://portswigger.net/burp/documentation/scanner/scan-configurations/burp-scanner-built-in-configs) provided by Burp Enterprise.  
	    -  `default` This is the same as the `Crawl and Audit - Lightweight` built-in configuration.
		-  `never-stop-crawl-due-to-application-errors`
		-  `never-stop-audit-due-to-application-errors`
		-  `minimize-false-positives`
		-  `minimize-false-negatives`
		-  `crawl-strategy-most-complete`
		-  `crawl-strategy-more-complete`
		-  `crawl-strategy-fastest`
		-  `crawl-strategy-faster`
		-  `crawl-limit-60-minutes`
		-  `crawl-limit-30-minutes`
		-  `crawl-limit-10-minutes`
		-  `crawl-and-audit-lightweight`
		-  `crawl-and-audit-fast`
		-  `crawl-and-audit-deep`
		-  `crawl-and-audit-balanced`
		-  `audit-coverage-thorough`
		-  `audit-coverage-maximum`
		-  `audit-checks-medium-active`
		-  `audit-checks-light-active`
		-  `audit-checks-critical-issues-only`
		-  `audit-checks-all-except-time-based-detection-methods`
		-  `audit-checks-all-except-java-script-analysis`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).


### Instance scan settings

```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

### Orchestration scan settings

```mdx-code-block
import StoLegacyOrch from './shared/legacy/_sto-ref-legacy-orchestrated.md';
```

<StoLegacyOrch />

### Dataload scan settings

The following settings are required for Security steps where the `policy_type` is `dataLoad`.

* `product_site_id` The Burp enterprise site identifier.

* `product_domain` Domain of the application instance to scan. Example: `https://myapp.io/portal/us`

   You need to specify either the `product_site_id` or the `product_domain`.

*  `product_scan_id` Use this setting to specify a specific scan to ingest. If this is not specified, the pipeline will ingest the most recent scan. 

* `product_access_token` The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases this is a password or an API key. 

  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).

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

