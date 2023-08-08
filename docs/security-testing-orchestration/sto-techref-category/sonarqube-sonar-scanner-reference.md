---
title: SonarQube SonarScanner reference
description: Repository scans with SonarQube SonarScanner
sidebar_position: 300
helpdocs_topic_id: 4qe4h3cl28
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

You can set up a Security step with [SonarQube SonarScanner](https://docs.sonarqube.org/latest/) to analyze your code repos and ensure that they are secure, reliable, readable, and modular, among other key attributes.

:::note
* STO supports repository scanning only for SonarScanner.
* STO supports all languages supported by SonarScanner.
* Before you scan your repo, make sure that you perform any prerequisites for the language used in your repo. If you are scanning a Java repo with more than one Java file, for example, you must compile `.class` files before you run the scan.  
Go to the [SonarQube language reference](https://docs.sonarqube.org/latest/analysis/languages/overview/) for details about specific language requirements.
:::

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

## SonarQube step configuration

The recommended workflow is add a SonarQube step to a Security Tests or CI Build stage and then configure it as described below. You can also configure SonarQube scans programmatically by copying, pasting, and editing the [YAML definition](#yaml-configuration). 


```mdx-code-block
import StoScannerStepNotes from './shared/step_palette/_sto-palette-notes.md';
```

<StoScannerStepNotes />

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


#### Access Token

```mdx-code-block
import StoSettingAuthAccessToken from './shared/step_palette/_sto-ref-ui-auth-access-token.md';
```

<StoSettingAuthAccessToken />

### Scan Tool

#### Include 

```mdx-code-block
import StoSettingToolInclude from './shared/step_palette/_sto-ref-ui-tool-include.md';
```

<StoSettingToolInclude />

#### Java Libraries

```mdx-code-block
import StoSettingTooJavaLibraries from './shared/step_palette/_sto-ref-ui-tool-java-libraries.md';
```

<StoSettingTooJavaLibraries  />




#### Java Binaries

```mdx-code-block
import StoSettingToolJavaBinaries from './shared/step_palette/_sto-ref-ui-tool-java-binaries.md';
```
<StoSettingToolJavaBinaries  />


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

You can add a `tool_args` setting to run the [sonar-scanner binary](https://docs.sonarqube.org/9.6/analyzing-source-code/analysis-parameters/) with specific command-line arguments. For example, suppose the scan is experiencing timeouts due to long response times from a web service. You can increase the timeout window like this:  `tool_args` = `-sonar.ws.timeout 300`.

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

You can set up a Security step with [SonarQube SonarScanner](https://docs.sonarqube.org/latest/) to analyze your code repos and ensure that they are secure, reliable, readable, and modular, among other key attributes.

#### Scan types

STO supports the following scan types for SonarQube:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
* `dataLoad`  — The pipeline downloads scan results using the [SonarScanner API](https://docs.sonarqube.org/latest/extend/web-api/).
<!-- * `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md). -->

#### Target and variant

```mdx-code-block
import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';
```

<StoLegacyTargetAndVariant />

#### SonarQube SonarScanner settings

* `product_name` = `sonarqube`
* `scan_type` = `repository`
* `product_config_name` = `default` — Runs a SonarQube scan with default settings.
* `policy_type` — Enter one of the following:
	+ `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest to set up and supports scans with default or predefined settings.
	+ `dataLoad`  — The pipeline downloads scan results using the [SonarScanner API](https://docs.sonarqube.org/latest/extend/web-api/).
	+ `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).
* `repository_project` — The repository name. If you want to scan `https://github.com/my-github-account/codebaseAlpha`, for example, you would set this to `codebaseAlpha`.
* `repository_branch` — The git branch to scan. You can specify a hardcoded string or use the runtime variable [`<+codebase.branch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference#manual-branch-build-expressions). This sets the branch based on the user input or trigger payload at runtime.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).

<!-- 
#### `ingestionOnly` settings

```mdx-code-block
import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';
```

<StoLegacyIngest />

-->

####  `orchestratedScan` and `dataLoad` settings

* `product_domain` — The URL of the SonarQube server.
* `product_access_token` — The access token to communicate with the SonarQube server. You must create a secret for the token and use the format `<+secrets.getValue("secret_name")>` to reference the secret. This example references a secret created at the project level. For additional details on referencing secrets, go to [Add and Reference Text Secrets](/docs/platform/Secrets/add-use-text-secrets).  
Go to the [SonarQube docs](https://docs.sonarqube.org/latest/user-guide/user-token/) for information about creating tokens.
* `product_project_name`—The name of the SonarQube project. This is the also the target name in the Harness UI (Security Tests > Test Targets).
* `product_project_key` — The unique identifier of the SonarQube project you want to scan. Look for `sonar.projectKey` in the **sonar-project.properties** file.
* `product_exclude` — If you want to exclude some files from a scan, you can set the sonar.exclusions key in your SonarQube project. See [Narrowing the Focus](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/) in the SonarQube docs.
* `product_java_binaries` — When scanning Java, you need to set the `sonar.java.binaries` key in SonarQube. This is a list of comma-separated paths with the compiled bytecode that correspond to your source files. See [Java](https://docs.sonarqube.org/latest/analysis/languages/java/) in the SonarQube docs.
* `product_java_libraries` — `sonar.java.binaries` is a comma-separated list of paths to files with third-party libraries (JAR or Zip files) used by your project. See [Java](https://docs.sonarqube.org/latest/analysis/languages/java/) in the SonarQube docs.
