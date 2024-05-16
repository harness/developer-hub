---
title: Grype scanner reference for STO
description: Scan container images with Grype.
sidebar_label: Grype scanner reference
sidebar_position: 10
redirect_from: /docs/security-testing-orchestration/sto-techref-category/grype/grype-scanner-reference
---

You can scan container images using [Grype](https://github.com/anchore/grype).

For information about setting up Grype in an air-gapped environment, go to [Set up Grype in air-gapped environments](/docs/security-testing-orchestration/sto-techref-category/grype/grype-setup-in-airgapped.md).


## Important notes for running Grype scans in STO


### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />


### Root access requirements


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />


## Grype step settings for STO

The recommended workflow is add a Grype step to a Security Tests or CI Build stage and then configure it as described below. 


<!--
<details>
<summary>Scanner Template</summary>

![](static/step-palette-00.png)

</details>

-->

### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from '../shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch from '../shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeIngest from '../shared/step_palette/scan/mode/_ingestion.md';


<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target

<a name="target-type"></a>

#### Type

import StoSettingScanTypeCont from '../shared/step_palette/target/type/_image.md';
import StoSettingScanTypeRepo from '../shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeCont />
<StoSettingScanTypeRepo />


#### Detect target and variant 

import StoSettingScanTypeAutodetectRepo from '../shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectContainer from '../shared/step_palette/target/auto-detect/_container-image.md';
import StoSettingScanTypeAutodetectNote from '../shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from '../shared/step_palette/target/_name.md';

<StoSettingTargetName />

<a name="target-variant"></a>

#### Variant

import StoSettingTargetVariant from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />


### Ingestion File


import StoSettingIngestionFile from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />

### Container Image 


<!-- ============================================================================= -->
<a name="container-type"></a>

#### Type  


import StoSettingImageType from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_type.md';



<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain 



import StoSettingImageDomain from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_domain.md';



<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name


import StoSettingImageName from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_name.md';



<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag


import StoSettingImageTag from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_tag.md';



<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id


import StoSettingImageAccessID from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_access-id.md';



<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 


import StoSettingImageAccessToken from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/image/_access-token.md';



<StoSettingImageAccessToken />


### Log Level

import StoSettingLogLevel from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


### Additional CLI flags

Use this field to run the [`grype`](https://github.com/anchore/grype?tab=readme-ov-file) binary with CLI arguments such as:

`--only-fixed`

With this flag, `grype` reports only vulnerabilities that have known fixes. 

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity


import StoSettingFailOnSeverity from '/docs/security-testing-orchestration/sto-techref-category/shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from '../shared/step_palette/all/_settings.md';

<StoSettingSettings />


### Additional Configuration

In the **Additional Configuration** settings, you can use the following options:

* [Privileged](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#privileged)
* [Image Pull Policy](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#image-pull-policy)
* [Run as User](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#run-as-user)
* [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources)


### Advanced settings

In the **Advanced** settings, you can use the following options:

* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings)
* [Failure Strategy](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview)

## Troubleshoot "vulnerability database build date exceeds max allowed age" exception

The full exception is: `db could not be loaded: the vulnerability database was built n weeks ago (max allowed age is 5 days)`

This exception indicates that the Grype step in the STO process is unable to load the vulnerability database due to its age exceeding the maximum allowed age of 5 days. If the environment where you're running these scans has restricted internet connectivity (firewalled), you must set up a local database for Grype to update itself. For comprehensive documentation for the initial setup, configuring the local database, and final configuration, go to [Set up Grype in air-gapped environments](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/grype/grype-setup-in-airgapped/).

While Harness updates the database every time it rebuilds the Grype image, this is primarily done for performance reasons. A fresher database requires less time and effort to update at runtime. However, this update is not sufficient to bypass the database access requirement, as the maximum allowed age is 5 days. You can temporarily disable the age check and run Grype with the database it ships with, but this is not recommended from a security standpoint. It's advisable to follow the provided instructions to resolve the database access issue in a more secure manner.


 
<!-- STO-7187 remove legacy configs for scanners with step palettes 

## Security step settings for Grype scans in STO (legacy)
 
:::note
You can set up Grype scans using a Security step, but this is a legacy functionality. Harness recommends that you use an [Grype step](#grype-step-settings-for-sto) instead.
:::


#### Important Notes

* STO supports Grype scans of containers and repositories.
* STO supports [orchestrationscans](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-an-orchestrated-scan-in-sto.md) and [ingestionOnly scans](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md) scans  with Grype. 

#### Target and variant


import StoLegacyTargetAndVariant  from '../shared/legacy/_sto-ref-legacy-target-and-variant.md';


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



#### Container scan settings


import StoLegacyContainer from '../shared/legacy/_sto-ref-legacy-container.md';


<StoLegacyContainer />

#### Ingestion file


import StoLegacyIngest from '../shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

-->