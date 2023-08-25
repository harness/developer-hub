---
title: Jfrog Artifact and JFrog xray scanner reference
description: Image scans with Jfrog xray
sidebar_position: 330
---

You can ingest scan results from JFrog Artifact and Jfrog xray. The standard workflow is to create a CI Build or Security Tests stage to your pipeline, add a Security step, and then use `setting:value` pairs to configure the step as specified below.

## Before you begin

:::info important notes

- Harness STO supports `ingestionOnly` scans with Jfrog Xray. `orchestrationOnly` and `dataLoad` scans are not supported. 

- You need to run the scan step with root access if you need to add trusted certificates to your scan images at runtime. 

  You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using self-signed certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

:::


## Security step settings

You can add a Security step to a Security Tests or CI Build stage and then configure it as described below.

### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

### Jfrog Xray settings

* `product_name` = `xray`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `ingestionOnly`
* `product_config_name` = `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).


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