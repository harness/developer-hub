---
title: Prisma Cloud (formerly Twistlock) scanner reference
description: Image scans with Prisma Cloud
sidebar_position: 210
---

You can scan container images using Prisma Cloud.

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

## PrismaCloud step configuration

The recommended workflow is add a PrismaCloud step to a Security Tests or CI Build stage and then configure it as described below. You can also configure Prisma Cloud scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

<details>
    <summary>Scanner Template</summary>

![](static/step-palette-00.png) 

</details>

### Scan


<a name="scan-mode"></a>

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette//_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/step_palette/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type

```mdx-code-block
import StoSettingScanType from './shared/step_palette/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo     from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';
```
<a name="scan-type"></a>
<StoSettingScanType />
<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />

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

### Container Image 


<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type 

```mdx-code-block
import StoSettingImageType from './shared/step_palette/_sto-ref-ui-image-type.md';
```

<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain 


```mdx-code-block
import StoSettingImageDomain from './shared/step_palette/_sto-ref-ui-image-domain.md';
```

<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name

```mdx-code-block
import StoSettingImageName from './shared/step_palette/_sto-ref-ui-image-name.md';
```

<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag

```mdx-code-block
import StoSettingImageTag from './shared/step_palette/_sto-ref-ui-image-tag.md';
```

<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id

```mdx-code-block
import StoSettingImageAccessID from './shared/step_palette/_sto-ref-ui-image-access-id.md';
```

<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 

```mdx-code-block
import StoSettingImageAccessToken from './shared/step_palette/_sto-ref-ui-image-access-token.md';
```

<StoSettingImageAccessToken />


### Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain (_extraction_)


```mdx-code-block
import StoSettingAuthDomain from './shared/step_palette/_sto-ref-ui-auth-domain.md';
```

<StoSettingAuthDomain />

<!-- ============================================================================= -->
<a name="auth-enforce-ssl"></a>

#### Enforce SSL

```mdx-code-block
import StoSettingProductSSL from './shared/step_palette/_sto-ref-ui-auth-ssl.md';
```

<StoSettingProductSSL />

<!-- ============================================================================= -->
<a name="auth-access-api-version"></a>

#### API Version

```mdx-code-block
import StoSettingApiVersion from './shared/step_palette/_sto-ref-ui-auth-api-version.md';
```

<StoSettingApiVersion />

<!-- ============================================================================= -->
<a name="auth-type"></a>

#### Type

```mdx-code-block
import StoSettingAuthType from './shared/step_palette/_sto-ref-ui-auth-type.md';
```

<StoSettingAuthType />

<!-- ============================================================================= -->

<a name="auth-access-id"></a>

#### Access ID

```mdx-code-block
import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />

<!-- ============================================================================= -->
<a name="auth-access-token"></a>

#### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```


<StoSettingAuthAccessToken />

### Scan Tool

#### Image Name

For Extraction scans, the name of the image that you want to extract from Prisma Cloud. 

### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags

```mdx-code-block
import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';
```

<StoSettingCliFlags />


#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


### Settings

You can add a `tool_args` setting to run the [twistcli images scan binary](https://docs.paloaltonetworks.com/prisma/prisma-cloud/prisma-cloud-admin-compute/tools/twistcli_scan_images#) with specific command-line arguments. For example, you can prevent the scan from publishing results to the Console like this:  `tool_args` : `--publish FALSE`.

### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](/docs/platform/Governance/Policy-as-code/harness-governance-overview)



## Security step configuration (_deprecated_)

You can set up Prisma Cloud scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

#### Prisma Cloud scan settings

* `product_name` = `twistlock`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) : `containerImage`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) :  `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_image_name`
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token`
* `product_config_name`
	+ Accepted values(s):
		- `default`
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Container image scan settings

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />

#### Ingestion file

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />