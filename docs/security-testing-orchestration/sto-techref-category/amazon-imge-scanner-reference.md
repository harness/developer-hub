---
title: Amazon Image scanner reference
description: Image scans with AWS Image scanner
sidebar_position: 20
---

You can set up an Amazon Image scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

## Before you begin

```mdx-code-block
import StoCreateDinD from './shared/dind-bg-step.md';
```

<StoCreateDinD />



## Security step settings


```mdx-code-block
import StoSecurityStepConfig from './shared/legacy/_sto-ref-security-step-config.md';
```

<StoSecurityStepConfig />

* `product_name` = `aws-ecr`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) =`containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods)= `dataLoad`, `ingestionOnly`
* `product_config_name` =`default`
* `container_project` = The name of the scanned ECR container with the results you want to ingest.
* `container_tag` = The container tag for the given container project.
* `configuration_access_id` = Your AWS Access ID secret
* `configuration_access_token` = Your AWS Access Token secret
* `configuration_region` = The AWS region where the container is located. For example, `us-east-1`
* `container_domain` = URI of the ECR container with the scan results you want to load.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

# Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


<!-- CONTAINERS --------------------------------------------------------------------------- 


## Container Image scan settings

<!-- CONTAINERS --------------------------------------------------------------------------- -->

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />


<!-- REPOS --------------------------------------------------------------------------- 


```mdx-code-block
import StoLegacyRepo from './shared/legacy/_sto-ref-legacy-repo.md';
```

<StoLegacyRepo />

<!-- LEGACY INSTANCE  --------------------------------------------------------------------------- 


```mdx-code-block
import StoLegacyInstance from './shared/legacy/_sto-ref-legacy-instance.md';
```

<StoLegacyInstance />

<!-- LEGACY CONFIGS  --------------------------------------------------------------------------- 


```mdx-code-block
import StoLegacyConfig from './shared/legacy/_sto-ref-legacy-config.md';
```

<StoLegacyConfig  />


<!-- INSTANCES  --------------------------------------------------------------------------- -->