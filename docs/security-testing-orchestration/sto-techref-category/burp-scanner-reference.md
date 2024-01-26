---
title: Burp scanner reference for STO
description: Scan application instances with Burp.
sidebar_label: Burp scanner reference
sidebar_position: 90
---

You can scan your application instances using [Burp Enterprise](https://portswigger.net/burp/enterprise). 

## Important notes for running Burp scans in STO

### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Burp step settings for STO scans

### Scan settings

#### Scan Mode

import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />

<a name="scan-config"></a>

#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />

The following configurations are available for Orchestration scans. These are [built-in configurations](https://portswigger.net/burp/documentation/scanner/scan-configurations/burp-scanner-built-in-configs) provided by Burp Enterprise.  
-  `Default` This is the same as the `Crawl and Audit - Lightweight` built-in configuration.
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
-  `Audit coverage thorough`
-  `Audit coverage maximum`
-  `Audit checks medium active`
-  `Audit checks light active`
-  `Audit checks critical issues only`
-  `Audit checks all except time based detection methods`
-  `Audit checks all except java script analysis`

### Target settings

##### Type

import StoSettingScanTypeInst     from './shared/step_palette/target/type/_app.md';

<StoSettingScanTypeInst />


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';


<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';


<StoSettingTargetVariant  />


### Authentication settings

#### Domain 

Domain of the application instance to scan. Example: `https://myapp.io/portal/us`

#### Access Token

The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases, this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

### Scan Tool

Use this setting to specify a specific scan to ingest. If this is not specified, the pipeline ingests the most recent scan. 

### Instance settings

<!-- ============================================================================= -->
<a name="instance-domain"></a>

#### Domain


import StoSettingInstanceDomain from './shared/step_palette/instance/_domain.md';


<StoSettingInstanceDomain />

<!-- ============================================================================= -->
<a name="instance-protocol"></a>

#### Protocol


import StoSettingInstanceProtocol from './shared/step_palette/instance/_protocol.md';



<StoSettingInstanceProtocol />

<!-- ============================================================================= -->
<a name="instance-port"></a>

#### Port


import StoSettingInstancePort from './shared/step_palette/instance/_port.md';



<StoSettingInstancePort />

<!-- ============================================================================= -->
<a name="instance-path"></a>

#### Path


import StoSettingInstancePath from './shared/step_palette/instance/_path.md';



<StoSettingInstancePath />

#### Username

Username to log in to the instance you want to scan.


#### Password

The access token to log in to the instance you want to scan. In most cases, this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).


### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />

## Security step settings for Burp scans in STO (legacy)

:::note
You can set up Burp scans using a Security step, but this is a legacy functionality. Harness recommends that you use a [Burp step](#burp-step-settings-for-sto-scans) instead.
:::

#### Target and variant

import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';

<StoLegacyTargetAndVariant />

#### Burp scan settings

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


#### Instance scan settings


import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';


<StoLegacyInstance />

#### Orchestration scan settings


import StoLegacyOrch from './shared/legacy/_sto-ref-legacy-orchestrated.md';


<StoLegacyOrch />

#### Dataload scan settings

The following settings are required for Security steps where the `policy_type` is `dataLoad`.

* `product_site_id` The Burp enterprise site identifier.

* `product_domain` Domain of the application instance to scan. Example: `https://myapp.io/portal/us`

   You need to specify either the `product_site_id` or the `product_domain`.

*  `product_scan_id` Use this setting to specify a specific scan to ingest. If this is not specified, the pipeline will ingest the most recent scan. 

* `product_access_token` The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases this is a password or an API key. 

  You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

#### Ingestion file


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />
