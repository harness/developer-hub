---
title: Mend (formerly Whitesource) scanner reference for STO
description: Container and repository scans with Mend
sidebar_label: Mend scanner reference
sidebar_position: 220
---

You can scan container images and repositories using [Mend](https://www.mend.io). 


## Important notes for running Mend scans in STO

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

## Mend step settings for STO scans

The recommended workflow is add a Mend step to a Security Tests or CI Build stage and then configure it as described below. 

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

#### Workspace (_repository_)

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

The fully-qualified URL to the scanner. The default is `https://saas.whitesourcesoftware.com/api`.

<!-- ============================================================================= -->
<a name="auth-enforce-ssl"></a>

#### Enforce SSL

```mdx-code-block
import StoSettingProductSSL from './shared/step_palette/_sto-ref-ui-auth-ssl.md';
```

<StoSettingProductSSL />

<!-- ============================================================================= 
<a name="auth-access-api-version"></a>


#### API Version

```mdx-code-block
import StoSettingApiVersion from './shared/step_palette/_sto-ref-ui-auth-api-version.md';
```

<StoSettingApiVersion />



<!-- ============================================================================= 
<a name="auth-type"></a>

#### Type

```mdx-code-block
import StoSettingAuthType from './shared/step_palette/_sto-ref-ui-auth-type.md';
```

<StoSettingAuthType />

<!-- ============================================================================= -->

#### Access Id

The user key for your Mend personal account: in the Mend UI, click the **Account Settings** button in the top right.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.my-mend-user-key")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).


<!-- ============================================================================= -->
<a name="auth-access-token"></a>

#### Access Token

The API key for your Mend organization. 

This field is required. If you want to run a scan in an organization other than the default organization for your account, generate an Access Token in that specific organization. In the Mend UI, go to **Integration** > **Organization** > **API Key**.

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("project.my-mend-org-api-key")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

### Scan Tool

<!-- ============================================================================= -->

#### Lookup Type

You can specify the Mend product or project **By Token** or **By Name**. 

#### Product Name / Token

The name or token of the  [Mend product](https://docs.mend.io/bundle/sca_user_guide/page/understanding_organizations__products_and_projects.html#Product) that you want to scan. 

This field is required for Orchestration and Extraction scans. 

#### Project Name / Token

The name or token of the [Mend project](https://docs.mend.io/bundle/sca_user_guide/page/understanding_organizations__products_and_projects.html#Project) that you want to scan. 

This field is required for Extraction scans. 


#### Include 

If you're running an orchestrated scan on a code repository, you can use this setting to specify the files to include in the scan. By default, a Mend scan includes all files in the code repository. 

This setting corresponds to the [**Includes** configuration parameter](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) for the Mend United Agent. 

<!-- ============================================================================= -->
<a name="tool-exclude"></a>	

#### Exclude

If you're running an orchestrated scan on a code repository, you can use this setting to specify the  specific files to exclude from the scan. By default, a Mend scan includes all files in the code repository. 

This setting corresponds to the [**excludes** configuration parameter](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) for the Mend United Agent. 

<!-- ============================================================================= -->

<!-- 

Excluding...I don't see this field in the step palette

#### Project Version

```mdx-code-block
import StoSettingToolProjectVersion from './shared/step_palette/_sto-ref-ui-tool-project-version.md';
```

<a name="product-project-version"></a>
<StoSettingToolProjectVersion />

-->

<!--   Log Level, CLI flags, and Fail on Severity ------------------------------------------------------------------------------------------------- -->


### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level

```mdx-code-block
import StoSettingLogLevel from './shared/step_palette/_sto-ref-ui-log-level.md';
```

<StoSettingLogLevel />

#### Additional CLI flags

You can add a `tool_args` setting to run the [Mend Unified Agent](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) with additional parameters. For example, you can save logs for STO-initiated scans in a separate folder on the Mend server like this: `log.files.path /tmp/sto_scan_logs`.

<!-- TBD This sounds like a reasonable use case, based on what I saw in the Mend docs, but I haven't tried it. Might be worth testing before adding to this topic. -->

#### Fail on Severity

```mdx-code-block
import StoSettingFailOnSeverity from './shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />

### Settings

You can add a `tool_args` setting to run the scanner with additional arguments. For example, you can pipe your scan output to a file like this: `tool-args > /tmp/sto_scan_logs/scan-session-output.LATEST.txt`.

<!-- TBD Don't know if this is a good example, or even if it works...I'm assuming the Settings field in the step palette is intended more for non-scanner-specific command-line arguments. -->


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
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview)

## Security step settings for Mend scans in STO (legacy)

You can set up Mend scans using a Security step: create a CI Build or Security Tests stage, add a Security step, and then add the `setting:value` pairs as specified below.

#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

#### Mend scan settings

* `product_name` = `whitesource`
* [`policy_type`](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanner-categories) = `ingestionOnly`, `dataLoad`, or `orchestratedScan`
* `scan_type` = `container` or `repository`
* `product_domain` (*optional*) — The default is `https://saas.whitesourcesoftware.com/api`.
* [`product_access_id`](#access-id)
* [`product_access_token`](#access-token)
* [`product_include`](#include)
* `product_config_name` = `default`
* [`fail_on_severity`](#fail-on-severity)
* `tool_args` You can add a `tool_args` setting to run the [Mend Unified Agent](https://docs.mend.io/bundle/unified_agent/page/unified_agent_configuration_parameters.html#General) with additional parameters. For example, you can save logs for STO-initiated scans in a separate folder on the Mend server like this: `tool_args log.files.path /tmp/sto_scan_logs`.

<!-- Same example as described in Additional CLI Flags above -->
		
#### Lookup settings

Lookup settings are required for `dataLoad` and `orchestratedScan` modes.

*  `product_lookup_type` You can specify the Mend product or project by token or by name.
    - When `policy_type` is set to `dataLoad`: 
      - `byName`
      - `byTokens`
    - When `policy_type` is set to `orchestratedScan`: 
      - `appendToProductByName`
      - `appendToProductByToken`

Required for `dataLoad` and `orchestratedScan` modes: 
* [`product_product_name`](#product-name--token)
* [`product_product_token`](#product-name--token)

Required for `dataLoad` modes: 
* [`product_project_name`](#project-name--token)
* [`product_project_token`](#project-name--token)

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

## Mend orchestration pipeline example

The following pipeline shows an end-to-end orchestration workflow. The Mend step includes the settings needed to run this specific scan: [`access_token`](#access-token), [`domain`](#domain), [`access_id`](#access-id), and [`product_name`](#product-name--token).

![](static/mend-orch-pipeline-example.png)

```yaml
pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: secrets_repo
        build: <+input>
  stages:
    - stage:
        name: mend
        identifier: mend
        type: SecurityTests
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: myorgdelegate
              namespace: harness-delegate-ng
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - step:
                  type: Mend
                  name: mend_orch
                  identifier: mend_orch
                  spec:
                    mode: orchestration
                    config: default
                    target:
                      name: secrets
                      type: repository
                      variant: master
                    advanced:
                      log:
                        level: debug
                    resources:
                      limits:
                        memory: 1Gi
                    imagePullPolicy: Always
                    auth:
                      access_token: <+secrets.getValue("my-mend-organization-api-key")>
                      domain: https://saas.whitesourcesoftware.com/agent
                      ssl: true
                      access_id: <+secrets.getValue("my-mend-user-key")>
                    tool:
                      product_name: secretsrepo
          caching:
            enabled: false
          sharedPaths:
            - ""
        variables:
          - name: runner_tag
            type: String
            description: ""
            required: false
            value: latest
  identifier: mend_secrets
  name: mend - secrets

```
