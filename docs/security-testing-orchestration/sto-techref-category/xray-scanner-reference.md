---
title: Jfrog Xray scanner reference for STO
description: Image scans with Jfrog Xray
sidebar_label: Jfrog Xray scanner reference
sidebar_position: 330
---

You can ingest scan results from JFrog Xray, a software composition analyis (SCA) solution that integrates with Artifactory and identifies vulnerabilities in open-source libraries and packages used in your code.

<!-- 

RP INCLUDE FIRST INTRO SENTENCE
https://jfrog.com/help/r/get-started-with-the-jfrog-platform/jfrog-xray

-->

The standard workflow is to create a CI Build or Security Tests stage to your pipeline, add a Security step, and then use `setting:value` pairs to configure the step as specified below.



## Important notes for running Xray scans in STO

:::info important notes

- Harness STO supports `ingestionOnly` scans with Jfrog Xray. `orchestrationOnly` and `dataLoad` scans are not supported. 

- For information about running Xray scans with custom SSL certificates, go to [Authenticating with RSA Keys](https://jfrog.com/help/r/jfrog-cli/authenticating-with-rsa-keys) in the JFrog documentation.

<!-- 

RP - NEED TO SET UP CUSTOM CERTS TO RUN XRAY SCANS
IF YOU WANT TO RUN XRAY SCANS USING CUSTOM CERTS, REFER TO https://jfrog.com/help/r/jfrog-cli/authenticating-with-rsa-keys

-->

- If you need to add trusted certificates to your scan images at runtime, you need to run the scan step with root access. 

  You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using self-signed certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

:::


## Security step settings for Xray scans in STO

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