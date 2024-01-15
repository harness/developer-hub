---
title: Open Source Vulnerabilities (OSV) scanner reference for STO
description: SAST and container scans with OSV
sidebar_position: 285
sidebar_label: OSV scanner reference
---

You can scan your Debian container images using [Open Source Vulnerabilities (OSV)](https://google.github.io/osv-scanner/), a tool that scrapes the list of installed packages in a Debian image and queries them for vulnerabilities.


## Important notes for running Aqua Trivy scans in STO

:::important important notes

Currently, this integration supports the following:

- OSV SAST support a [variety of languages and lockfiles](https://google.github.io/osv-scanner/supported-languages-and-lockfiles).
- OSV container image scans are currently limited to Debian-based images only.
- STO supports Ingestion mode only for this integration. 

### Docker-in-Docker requirements

import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';


<StoDinDRequirements />


### Root access requirements 


import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';


<StoRootRequirements />

### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

:::

## OSV step settings for STO scans

The recommended workflow is add an OSV step to a Security Tests or CI Build stage and then configure it as described below. You can also configure OSV scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration).

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

<a name="scan-type"></a>

import StoSettingScanTypeRepo     from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanTypeCont     from './shared/step_palette/_sto-ref-ui-scan-type-01-container.md';

<StoSettingScanTypeRepo />
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

You can add a `tool_args` setting to run the trivy image scanner with specific command-line arguments. For example, suppose you want to scan files that are ignored by `.gitignore` files. In this case, go to **Settings** and add the following:

`tool_args : --no-ignore`

For more information about OSV command-line arguments, go to [Usage](https://google.github.io/osv-scanner/usage) in the OSV documentation.


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


## YAML pipeline example (TBD)

