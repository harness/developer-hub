---
title: Aqua Trivy scanner reference for STO
description: Image scans with Aqua Trivy
sidebar_position: 30
sidebar_label: Aqua Trivy scanner reference
helpdocs_topic_id: 079248uzcu
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

You can scan your container images using [Aqua Trivy](https://github.com/aquasecurity/trivy), a comprehensive and versatile open-source scanner. 

:::note
STO supports container scans only with Aqua Trivy.
:::

## Important notes for running Aqua Trivy scans in STO

### Docker-in-Docker requirements



import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />


### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Aqua Trivy step settings for STO scans

The recommended workflow is add an AquaTrivy step to a Security Tests or CI Build stage and then configure it as described below. You can also configure Aqua Trivy scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration).





<details>
<summary>Scanner Template</summary>

![](static/aqua-trivy-security-scan-step.png)

</details>


### Scan settings


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/step_palette/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeIngest from './shared/step_palette/_sto-ref-ui-scan-mode-02-ingestonly.md';


<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />

<a name="scan-config"></a>

#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/_sto-ref-ui-product-config-name.md';


<StoSettingProductConfigName />


### Target Settings

<a name="target-type"></a>

#### Type


import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';


<a name="scan-type"></a>
<StoSettingScanTypeCont />


#### Name 


import StoSettingProductID from './shared/step_palette/_sto-ref-ui-prod-id.md';


<StoSettingProductID />


#### Variant


import StoSettingTargetVariant from './shared/step_palette/_sto-ref-ui-target-variant.md';


<StoSettingTargetVariant  />

### Container Image settings


#### Type


import StoSettingImageType from './shared/step_palette/_sto-ref-ui-image-type.md';


<StoSettingImageType />

#### Domain



import StoSettingImageDomain from './shared/step_palette/_sto-ref-ui-image-domain.md';


<StoSettingImageDomain />

#### Name


import StoSettingImageName from './shared/step_palette/_sto-ref-ui-image-name.md';


<StoSettingImageName />


#### Tag


import StoSettingImageTag from './shared/step_palette/_sto-ref-ui-image-tag.md';


<StoSettingImageTag />

#### Access ID


import StoSettingImageAccessID from './shared/step_palette/_sto-ref-ui-image-access-id.md';


<StoSettingImageAccessID />

#### Access Token


import StoSettingImageAccessToken from './shared/step_palette/_sto-ref-ui-image-access-token.md';


<StoSettingImageAccessToken />


#### Region  


import StoSettingImageRegion from './shared/step_palette/_sto-ref-ui-image-region.md';


<StoSettingImageRegion />




### Ingestion settings


<a name="ingestion-file"></a>

#### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';


<StoSettingIngestionFile  />


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';


<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags


import StoSettingCliFlags from './shared/step_palette/_sto-ref-ui-cli-flags.md';


<StoSettingCliFlags />

<a name="fail-on-severity"></a>


#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

You can add a `tool_args` setting to run the trivy image scanner with specific command-line arguments. For example, you can customize the security issues to detect using the scanners argument. To scan vulnerabilities only, specify `tool_args` = `--scanners ("vuln")`. 


### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)



## Security step settings for Aqua Trivy scans in STO (legacy)

You can set up a Security step with [Aqua Trivy](https://aquasecurity.github.io/trivy) to detect vulnerabilities and misconfigurations in your container images.

#### Important Notes

* STO supports container scans only with Aqua Trivy.

#### Scan types

STO supports the following `policy_type` settings for Aqua-Trivy:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md).

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### Aqua Trivy scan settings

* `product_name` = `aqua-trivy`
* `scan_type` = `containerImage`, `ingestionOnly`
* `product_config_name` — Specify one of the following:
	+ `aqua-trivy` — Run the Trivy image scanner with default settings.
	+ `aqua-trivy-debug` — Run the Trivy image scanner in Debug mode.
* `container_domain` — The image registry domain, for example `docker.io`
* `container_project` — The image owner and project, for example `harness/delegate`
* `container_tag` — The tag of the image to scan, for example `latest`
* `container_type` — Set to `local_image`, `docker_v2`, `jfrog_artifactory`, or `aws_ecr`  
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

#### Container scan settings

The following settings are also required, depending on the container type:
+ if `container_type` = `docker_v2`
	- `container_access_id`: Username
	- `container_access_token`: Password/Token
+ if `container_type` = `aws_ecr`
	- `container_access_id`: Username
	- `container_access_token`: Password/Token
	- `container_region`: Image registry AWS region
+ if `container_type` = `jfrog_artifactory`
	- `container_access_id`: Username
	- `container_access_token`: Password/Token

#### Ingestion file 


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />


## YAML pipeline example


import StoSettingYAMLexample from './shared/step_palette/_sto-ref-yaml-example.md';


<StoSettingYAMLexample />
