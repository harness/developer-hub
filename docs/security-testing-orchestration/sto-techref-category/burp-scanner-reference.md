---
title: Burp scanner reference
description: Instance scans with Burp
sidebar_position: 80
---

You can set up any supported scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

## Burp step settings

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<a name="scan-config"></a>

#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />

The following configurations are available for Orchestrated scans. These are [built-in configurations](https://portswigger.net/burp/documentation/scanner/scan-configurations/burp-scanner-built-in-configs) provided by Burp Enterprise.  
-  `Default` This is the same as the `Crawl and Audit - Lightweight` built-in configuration.
-  `NeverstopCrawl due to application errors`
-  `Never stop audit due to application errors`
-  `Minimize false positives`
-  `Minimize false negatives`
-  `Crawl strategy most complete`
-  `Crawl strategy more complete`
-  `Crawl strategy fastest`
-  `Crawl strategy faster`
-  `Crawl limit 60 minutes`
-  `Crawl limit 30 minutes`
-  `Crawl limit 10 minutes`
-  `Crawl and audit lightweight`
-  `Crawl and audit fast`
-  `Crawl and audit deep`
-  `Crawl and audit balanced`
-  `Audit coverage thorough`
-  `Audit coverage maximum`
-  `Audit checks medium active`
-  `Audit checks light active`
-  `Audit checks critical issues only`
-  `Audit checks all except time based detection methods`
-  `Audit checks all except java script analysis`

### Target Settings

<a name="target-type"></a>

#### Type

```mdx-code-block
import StoSettingScanTypeInst     from './shared/step_palette/_sto-ref-ui-scan-type-02-instance.md';
```

<a name="scan-type"></a>
<StoSettingScanTypeInst />

<a name="target-name"></a>

#### Name 

```mdx-code-block
import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

<a name="target-variant"></a>

#### Variant

```mdx-code-block
import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />

### Ingestion File

```mdx-code-block
import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />


### Instance settings


<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain

```mdx-code-block
import StoSettingInstanceDomain from './shared/step_palette/_sto-ref-ui-instance-domain.md';
```
<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol

```mdx-code-block
import StoSettingInstanceProtocol from './shared/step_palette/_sto-ref-ui-instance-protocol.md';
```

<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port

```mdx-code-block
import StoSettingInstancePort from './shared/step_palette/_sto-ref-ui-instance-port.md';
```

<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path

```mdx-code-block
import StoSettingInstancePath from './shared/step_palette/_sto-ref-ui-instance-path.md';
```

<StoSettingInstancePath />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI Flags

You can use this field to run the [Nmap scanner](https://nmap.org/book/man-briefoptions.html) with specific command-line arguments. For example, you can include IPv6 tests as follows: `tool_args` = `-6`

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

<!-- 

### Settings

TBD

-->

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/ci-technical-reference/background-step-settings/#privileged)
* [Image Pull Policy](/docs/continuous-integration/ci-technical-reference/background-step-settings/#image-pull-policy)
* [Run as User](/docs/continuous-integration/ci-technical-reference/background-step-settings/#run-as-user)
* [Set Container Resources](/docs/continuous-integration/ci-technical-reference/background-step-settings/#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/Governance/Policy-as-code/harness-governance-overview)


## Security step settings

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

<details><summary>Burp scan configuration in Security Scan step</summary>

![](./static/burp-security-scan-step.png)

</details>

* `product_name` = `burp`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* `product_config_name`
	+ The following configurations are available. These are [built-in configurations](https://portswigger.net/burp/documentation/scanner/scan-configurations/burp-scanner-built-in-configs) provided by Burp Enterprise.  
	    -  `Default` This is the same as the `Crawl and Audit lightweight` built-in configuration.
		-  `Never stop Crawl due to application errors`
		-  `Never stop audit due to application errors`
		-  `Minimize false positives`
		-  `Minimize false negatives`
		-  `Crawl strategy most complete`
		-  `Crawl strategy more complete`
		-  `Crawl strategy fastest`
		-  `Crawl strategy faster`
		-  `Crawl limit 60 minutes`
		-  `Crawl limit 30 minutes`
		-  `Crawl limit 10 minutes`
		-  `Crawl and audit lightweight`
		-  `Crawl and audit fast`
		-  `Crawl and audit deep`
		-  `Crawl and audit balanced`
		-  `audit coverage thorough`
		-  `audit coverage maximum`
		-  `audit checks medium active`
		-  `audit checks light active`
		-  `audit checks critical issues only`
		-  `audit checks all except time based detection methods`
		-  `audit checks all except java script analysis`




```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

```mdx-code-block
import StoLegacyOrch from './shared/legacy/_sto-ref-legacy-orchestrated.md';
```

<StoLegacyOrch />

<details><summary>Dataload scan settings</summary>

The following settings are required for Security steps where the `policy_type` is `dataLoad`.

* `product_site_id` The Burp enterprise site identifier.

* `product_domain` Domain of the application instance to scan. Example: `https://myapp.io/portal/us`

   You need to specify either the `product_site_id` or the `product_domain`.

*  `product_scan_id` Use this setting to specify a specific scan to ingest. If this is not specified, the pipeline will ingest the most recent scan. 

* `product_access_token` The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases this is a password or an API key. 

  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).


</details>


```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

#### Fail on Severity

See [Fail on Severity](#fail-on-severity).

