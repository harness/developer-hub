---
title: Grype scanner reference
description: Image scans with Grype
sidebar_position: 156
---

You can scan container images using [Grype](https://github.com/anchore/grype).


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


## Grype step configuration

The recommended workflow is add a Grype step to a Security Tests or CI Build stage and then configure it as described below. You can also configure Grype scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

<!-- 
<details>
    <summary>Scanner Template</summary>

![](static/step-palette-00.png) 

</details>

-->

### Scan settings


<a name="scan-mode"></a>

#### Scan Mode

```mdx-code-block
import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';
```

<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


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

<StoSettingScanTypeCont />


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

<a name="fail-on-severity"></a>


#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />



### Settings

You can add a `tool_args` setting to run the [grype scanner](https://github.com/anchore/grype) with specific command-line arguments. For example, you can report vulnerabilities with known fixes only using `--only-fixed`: `tool_args` = `--only-fixed`.

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
 



You can set up a Security step with [Grype](https://github.com/anchore/grype) to detect vulnerabilities and misconfigurations in your container images.


#### Important Notes

* STO supports Grype scans of containers and repositories.
* STO supports [orchestrated scans](../use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto.md) and [ingestionOnly scans](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md) scans  with Grype. 

#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

#### Grype scan Settings

* `product_name` = `grype`
* `policy_type` = `orchestratedScan`
* `scan_type` = `repository` or `container`
* `product_config_name` = `default`
* `container_domain` — The image registry domain, for example `docker.io`
* `container_project` — The image owner and project, for example `harness/delegate`
* `container_tag` — The tag of the image to scan, for example `latest`
* `container_type` — Set to `local_image`, `docker_v2`, `jfrog_artifactory`, or `aws_ecr`  
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

<!-- 
The following settings are also required, depending on the container type:
+ if `container_type` = `docker_v2`
	- `container_access_id`: Username
	- `container_access_token`: Password/token 
+ if `container_type` = `aws_ecr`
	- `container_access_id`: Username
	- `container_access_token`: Password/token 
	- `container_region`: Image registry AWS region
+ if `container_type` = `jfrog_artifactory`
	- `container_access_id`: Username
	- `container_access_token`: Password/token

-->

#### Container scan settings

```mdx-code-block
import StoLegacyContainer from './shared/legacy/_sto-ref-legacy-container.md';
```

<StoLegacyContainer />

#### Ingestion file

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />