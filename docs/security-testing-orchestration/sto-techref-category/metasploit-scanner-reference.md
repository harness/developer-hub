---
title: Metasploit scanner reference
description: Instance scans with Metasploit
sidebar_position: 160
---


### Security step settings

You can set up Metasploit scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

<!-- 
```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

-->
* `product_name` = `metasploit`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `instance`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name`
   - `metasploit-weak-ssh` &nbsp; &nbsp;  Brute-force test a host for SSH weak ssh/pass
   - `metasploit-openssl-heartbleed`  &nbsp; &nbsp; Check HTTPS (443) for Heartbleed vulnerability
   - `dynamic-by-cve`  &nbsp; &nbsp; Finds and applies Metaspoit module by CVE 
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).


```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```

<StoSettingFailOnSeverity />