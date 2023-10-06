---
title: Anchore Enterprise scanner reference for STO
description: Software Composition Analysis scans with Anchore Enterprise
sidebar_label: Anchore Enterprise scanner reference
sidebar_position: 005
---

You can scan your repositories and other components used in your code with [Anchore Enterprise](https://docs.anchore.com/current/docs/), an SCA (Software Composition Analysis) scanner that provides visibility into supply chain security risks. 

## Important notes for running Checkmarx scans in STO

<!-- 

Not sure if DinD is required...AFAIK we only support scanner-template (not Security Step) config, and 

### Docker-in-Docker requirements

```mdx-code-block
import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';
```

<StoDinDRequirements />

-->

### Root access requirements

```mdx-code-block
import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements.md';
```

<StoRootRequirements />

## Anchore Enterprise step configuration

The recommended workflow is add a Anchore Enterprise step to a Security Tests or CI Build stage and then configure it as described below. 


### Scan settings


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

#### Type

```mdx-code-block
import StoSettingScanTypeRepo     from './shared/step_palette/_sto-ref-ui-scan-type-00-repo.md';
```

<StoSettingScanTypeRepo />

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

#### Workspace

```mdx-code-block
import StoSettingTargetWorkspace from './shared/step_palette/_sto-ref-ui-target-workspace.md';
```

<StoSettingTargetWorkspace  />


### Ingestion File

```mdx-code-block
import StoSettingIngestionFile from './shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />


### Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain


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

<!-- 

#### API Version

```mdx-code-block
import StoSettingApiVersion from './shared/step_palette/_sto-ref-ui-auth-api-version.md';
```

<StoSettingApiVersion />


<a name="auth-type"></a>

#### Type

```mdx-code-block
import StoSettingAuthType from './shared/step_palette/_sto-ref-ui-auth-type.md';
```

<StoSettingAuthType />

-->

#### Access ID

```mdx-code-block
import StoSettingAuthAccessID from './shared/step_palette/_sto-ref-ui-auth-access-id.md';
```

<StoSettingAuthAccessID />



#### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```

<StoSettingAuthAccessToken />

### Scan Tool

<!-- ============================================================================= -->

#### Team Name

The Checkmarx team name. Use the format `/<`*`server-name`*`>/<`*`team-name`*`>` — for example, `/server1.myorg.org/devOpsEast`.


#### Project Name

```mdx-code-block
import StoSettingToolProjectName from './shared/step_palette/_sto-ref-ui-tool-project-name.md';
```

<StoSettingToolProjectName />

<!-- ============================================================================= -->


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags

<!-- Not sure if there are any CLI flags that we want to document...also not sure if thiis is the correct doc page to link to. See this section for how we document this in Checkmarx:

https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference#additional-cli-flags

-->

You can use this field to run the [Anchore Enterprise CLI](https://docs.anchore.com/current/docs/using/cli_usage/repositories/) with specific command-line arguments. 


<a name="fail-on-severity"></a>

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


### Settings

You can use this field to provide environment variables to be used during the execution of the step. 

<!-- TBD

Any useful custom settings that we want to document for Anchore Enterprise scans? If so, here's an example from the Checkmarx scanner ref....

As an exemple, if you need to access your Checkmarx server through a proxy, you can add this setting: 

* key = `JAVA_TOOL_OPTIONS`
* value = `-DproxySet=true -Dhttp.proxyHost=MY_PROXY_ADDRESS -Dhttp.proxyPort=MY_PROXY_PORT`

Replace `MY_PROXY_ADDRESS` with your proxy address or proxy FQDN, and `MY_PROXY_PORT` with your proxy port.
If you want to go through an HTTPS proxy, replace `-Dhttp` with `-Dhttps`.

-->


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

<!-- TBD

Not sure if we support Security step configuration for this...leaving this in (but commenting it out) in case we need to document

## Security step settings for Anchor Enterprise scans in STO (legacy)


You can set up any supported scanner using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.


#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />



#### Checkmarx scan settings

* `product_name` = `TBD`
* [`scan_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `repository`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) = `orchestratedScan`, `dataLoad`, or `ingestionOnly`
* When [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#data-ingestion-methods) is set to `orchestratedScan` or `dataLoad`:
	+ `product_domain`
	+ `product_access_id`
	+ `product_access_token` = The account password
	+ `product_team_name` = `/<`*`server-name`*`>/<`*`team-name`*`>` for example, `/server1.myorg.org/devOpsEast`
	+ `product_project_name`
* `product_config_name` = `default`

* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
+ `tool_args`
	   You can use this field to run the [Checkmarx plugin](https://checkmarx.com/resource/documents/en/34965-8152-running-scans-from-the-cli.html) with specific command-line arguments. To run an incremental scan, for example, specify `tool_args` = `-incremental`. For more information, go to [Running incremental scans with Checkmarx](#running-incremental-scans-with-checkmarx). 

#### Ingestion file

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

-->

<!-- TBD

## YAML pipeline example

It's good practice to include an example pipeline with a screenshot of the component steps and the pipeline YAML example

Here's an example of how this would look:

https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/semgrep-scanner-reference#yaml-pipeline-example

-->