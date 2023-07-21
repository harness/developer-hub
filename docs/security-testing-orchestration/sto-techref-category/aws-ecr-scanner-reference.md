---
title: AWS ECR scanner reference
description: Image scans with AWS ECR
sidebar_position: 30
---

You can scan your container images using [Amazon Elastic Container Registry (ECR)](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html). 

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


## AWS ECR step configuration

The recommended workflow is add an AWS ECR step to a Security Tests or CI Build stage and then configure it as described below. You can also configure scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 

```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />



### Scan settings


<a name="scan-mode"></a>

#### Scan Mode

```mdx-code-block
import StoSettingScanModeDataLoad from './shared/step_palette/_sto-ref-ui-scan-mode-01-dataload.md';
```

<StoSettingScanModeDataLoad />

<a name="scan-config"></a>

#### Scan Configuration

```mdx-code-block
import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';
```

<StoSettingProductConfigName />


### Target Settings

<a name="target-type"></a>

#### Type

```mdx-code-block
import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';
```

<a name="scan-type"></a>
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

### Container Image settings

<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type  (_orchestration_)

```mdx-code-block
import StoSettingImageType from './shared/step_palette/_sto-ref-ui-image-type.md';
```

<StoSettingImageType />

<!-- ============================================================================= -->


<a name="container-domain"></a>

#### Domain (_extraction_)


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


#### Region  

```mdx-code-block
import StoSettingImageRegion from './shared/step_palette/_sto-ref-ui-image-region.md';
```

<StoSettingImageRegion />

### Authentication settings

#### Access ID (_orchestration_)

```mdx-code-block
import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />

#### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```

<StoSettingAuthAccessToken />


#### Access Region

The AWS region of the image to scan.


### Ingestion settings


<a name="ingestion-file"></a>

#### Ingestion File

```mdx-code-block
import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

<a name="cli-flags"></a>



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
