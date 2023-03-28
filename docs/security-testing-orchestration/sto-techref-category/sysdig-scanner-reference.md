---
title: Sysdig scanner reference
description: Container scans with Sysdig
sidebar_position: 305
---


## Security step settings

You can set up Sysdig scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then the `setting:value` pairs as specified below.

<!-- SECURITY STEP CONFIG DBOX --------------------------------------------------------------------------- -->

```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `sysdig`
* `product_config_name` = `default`
* `policy_type` = `orchestratedScan` or `ingestionOnly`
* `scan_type` = `containerImage`
* `container_type` — Set to `local_image`, `docker_v2`, `jfrog_artifactory`, or `aws_ecr`  
* `container_domain` — The image registry domain, for example `docker.io`
* `container_project` — The image owner and project, for example `harness/delegate`
* `container_tag` — The tag of the image to scan, for example `latest`
* `fail_on_severity`  — See [Fail on Severity](#fail-on-severity) below

When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan`
* `sysdig_token` — Your Sysdig personal access token
* `product_domain` — The default is https://app.us4.sysdig.com


### Fail on Severity 

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

### Container image settings 

```mdx-code-block
import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';
```

<StoLegacyConfig  />


