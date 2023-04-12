---
title: OWASP scanner reference
description: Repository scans with OWASP
sidebar_position: 210
---


## Security step settings

You can set up OWASP scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />


* `product_name` = `owasp`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan` or `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` — You can use this field to run the [dependency-check](https://jeremylong.github.io/DependencyCheck/dependency-check-cli/arguments.html) scanner with specific command-line arguments. For example, you can scan a specific path using the `--scan` argument: `tool_args` = `--scan ‘directory/**/*.jar’`

### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


### Repository scan settings

```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />
