---
title: SonarQube SonarScanner reference for STO
description: Scan code repositories with SonarQube SonarScanner.
sidebar_position: 390
sidebar_label: SonarScanner scanner reference
helpdocs_topic_id: 4qe4h3cl28
helpdocs_category_id: m01pu2ubai
helpdocs_is_private: false
helpdocs_is_published: true
---

 You can run scans and ingest results from [SonarQube SonarScanner](https://docs.sonarqube.org/latest/) to analyze your code repos and ensure that they are secure, reliable, readable, and modular, among other key attributes. 
 

## Important notes for running SonarQube scans in STO

* STO supports repository scanning only for SonarScanner.
* STO supports all languages supported by SonarScanner.
* Before you scan your repo, make sure that you perform any prerequisites for the language used in your repo. <!-- Need to confirm this sentece per https://harness.atlassian.net/browse/DOC-3640 If you are scanning a Java repo with more than one Java file, for example, you must compile `.class` files before you run the scan. -->
  For details about specific language requirements, go to the [SonarQube language reference](https://docs.sonarqube.org/latest/analysis/languages/overview/).
* By default, STO allocates 500Mi memory for the Sonarqube scan container. This should be enough for Ingestion scans. For Orchestration and Extraction scans, Harness recommends that you allocate at least 2GB for the container. You can customize resource limits in the [Set Container Resources](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#set-container-resources) section of the SonarQube scan step. 
* You need to run the scan step with root access if you need to add trusted certificates to your scan images at runtime.
* You can set up your STO scan images and pipelines to run scans as non-root and establish trust for your own proxies using self-signed certificates. For more information, go to [Configure STO to Download Images from a Private Registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/download-images-from-private-registry).

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


### For more information


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';


<StoMoreInfo />

## SonarQube step settings for STO scans


The recommended workflow is to add a SonarQube step to a Security Tests or CI Build stage and then configure it as described below.

A Docker-in-Docker background step is not required for this workflow.

<!--





-->

### Scan


<a name="scan-mode"></a>

#### Scan Mode


import StoSettingScanMode from './shared/step_palette/scan/_type.md';

import StoSettingScanModeOrch  from './shared/step_palette/scan/mode/_orchestration.md';

import StoSettingScanModeData from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';



<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


#### Scan Configuration


import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';


<StoSettingProductConfigName />


### Target


#### Type

import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Detect target and variant 

import StoSettingScanTypeAutodetectRepo from './shared/step_palette/target/auto-detect/_code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step_palette/target/auto-detect/_note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step_palette/target/_name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step_palette/target/_variant.md';

<StoSettingTargetVariant  />

#### Workspace


import StoSettingTargetWorkspace from './shared/step_palette/target/_workspace.md';



<StoSettingTargetWorkspace  />


### Ingestion File


import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';



<StoSettingIngestionFile  />


### Authentication

<!-- ============================================================================= -->
<a name="auth-domain"></a>

#### Domain 

The URL of the SonarQube server. Required for Orchestration and Extraction scans. This value corresponds to the [`sonar.host.url`](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/analysis-parameters/#mandatory-parameters) setting in SonarQube.


import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';



<StoSettingAuthDomain />

<!-- ============================================================================= -->
<a name="auth-enforce-ssl"></a>

#### Enforce SSL


import StoSettingProductSSL from './shared/step_palette/auth/_ssl.md';



<StoSettingProductSSL />


#### Access Token



import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';



<StoSettingAuthAccessToken />

:::info note

Harness recommends that you use a SonarQube **user** token that includes permissions to run scans and to create projects.

If you use a **project** token, you must have access to the SonarQube project that you want to scan. 

For more information, go to [Generating and using tokens](https://docs.sonarsource.com/sonarqube/latest/user-guide/user-account/generating-and-using-tokens/) in the SonarQube documentation. 

:::


### Scan Tool

#### Exclude 

If you want to exclude some files from a scan, you can use this setting to configure the `sonar.exclusions` in your SonarQube project. For more information, go to [Narrowing the Focus](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/) in the SonarQube docs.

#### Java Libraries

A comma-separated list of paths to files with third-party libraries used by your tests. For SonarQube scans, this corresponds to the `sonar.java.libraries` parameter.  

<!-- 

import StoSettingTooJavaLibraries from './shared/step_palette/tool/java/_libraries.md';



<StoSettingTooJavaLibraries  />

-->


#### Java Binaries

A comma-separated list of paths to the folders with the bytecode files you want to scan. For SonarQube scans, this corresponds to the `sonar.java.binaries` parameter. 

<!--

import StoSettingToolJavaBinaries from './shared/step_palette/tool/java/_binaries.md';


<StoSettingToolJavaBinaries  />
-->

### Log Level, CLI flags, and Fail on Severity

<a name="log-level"></a>

#### Log Level


import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';



<StoSettingLogLevel />

<a name="cli-flags"></a>

#### Additional CLI flags


You can add CLI flags to run the [sonar-scanner binary](https://docs.sonarqube.org/9.6/analyzing-source-code/analysis-parameters/) with specific command-line arguments. Here are some examples:  

* `-sonar.ws.timeout 300` Suppose the scan is experiencing timeouts due to long response times from a web service. This flag increases the timeout window.

* `-Dsonar.projectVersion=<version_number>` The project version to scan

* `-Dsonar.test.exclusions=**src/test/**/*.*` The test files to include from the scan

##### YAML example

```yaml
              - step:
                  type: Sonarqube
                  spec:
                    advanced:
                      args:
                        cli: "-Dsonar.projectVersion=1.2.3"
```

#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';


<StoSettingFailOnSeverity />

<!--
### Settings

You can add a `tool_args` setting to run the [sonar-scanner binary](https://docs.sonarqube.org/9.6/analyzing-source-code/analysis-parameters/) with specific command-line arguments. For example, suppose the scan is experiencing timeouts due to long response times from a web service. You can increase the timeout window like this:  `tool_args` = `-sonar.ws.timeout 300`.

-->

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

## SonarQube pull-request scan configuration

To implement a SonarQube pull-request scan, include the following arguments in [**Additional CLI flags**](#additional-cli-flags). Use trigger variables for the pull request ID and branch:
    - `-Dsonar.pullrequest.key=`[`<+trigger.prNumber>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference/#codebaseprnumber)
    - `-Dsonar.pullrequest.branch=`[`<+trigger.sourceBranch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference/#codebasesourcebranch)
    - `-Dsonar.pullrequest.base=YOUR_BASELINE_BRANCH`

      If the target branch in the PR is the baseline, you can use [`<+trigger.targetBranch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference/#codebasetargetbranch).

<details>
<summary>YAML configuration example</summary>

```yaml
              - step:
                  type: Sonarqube
                  # ...
                  spec:
                    mode: orchestration
                    config: default
                    # ...
                    advanced:
                      log:
                        level: debug
                      args:
                        cli: "-Dsonar.pullrequest.key=<+trigger.prNumber> -Dsonar.pullrequest.branch=<+trigger.sourceBranch> -Dsonar.pullrequest.base=<+trigger.targetBranch> "
                    # ...
```

</details>

## Troubleshoot Sonar Scans

### Can't generate SonarQube report due to shallow clone

* Error message: `Shallow clone detected, no blame information will be provided. You can convert to non-shallow with 'git fetch --unshallow`
* Cause: If the [depth setting](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth) in your pipeline's codebase configuration is shallow, SonarQube can't generate a report. This is a [known SonarQube issue](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scm-integration/#known-issues).
* Solution: Change the `depth` to `0`.

### Add the sonar.projectVersion to a Harness pipeline

In your SonarQube step, declare `-Dsonar.projectVersion` under [Additional CLI Flags](#additional-cli-flags).

### SonarQube doesn't scan the main branch and pull request branches in the same pipeline

:::info 

Harness introduced a fix in [STO release 1.83.1](/release-notes/security-testing-orchestration#version-1882) to provide better support for orchestrated branch and pull-request scanning with SonarQube Enterprise.

- With this fix, the orchestration step always downloads results for the scanned branch or pull request.
- Branch scans require no additional configuration.
- To configure pull-request scans, go to [SonarQube pull-request scan configuration](#sonarqube-pull-request-scan-configuration).

:::

If SonarQube doesn't scan both the main branch and pull request (PR) branches within the same pipeline, it might indicate an issue with the pull request setup in SonarQube.

One potential solution involves configuring conditional arguments within the Harness Platform to handle PR and branch scan requests separately. To implement this solution, you can use [conditional executions](/docs/platform/pipelines/step-skip-condition-settings) to run specific steps based on whether it's a PR scan request or a branch scan request. For example, your conditional executions could use JEXL expressions with [codebase variables](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference) like `<+codebase.build.type>=="branch"` or `<+codebase.build.type>=="pr"`.

This approach ensures proper configuration and execution of SonarQube scans for both main and PR branches within your pipeline.

<!-- STO-7187 remove legacy configs for scanners with step palettes

## Security step settings for SonarQube scans in STO (legacy)

:::note
You can set up SonarQube scans using a Security step, but this is a legacy functionality. Harness recommends that you use an [SonarQube step](#sonarqube-step-settings-for-sto-scans) instead.
:::

#### Docker-in-Docker requirements


import StoDinDRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/dind-bg-step.md';

<StoDinDRequirements />

#### Scan modes

STO supports the following scan modes for SonarQube:

* `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest method to set up and support scans with default or predefined settings.
* `dataLoad`  — The pipeline downloads scan results using the [SonarScanner API](https://docs.sonarqube.org/latest/extend/web-api/).
* `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](../use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline.md). 

#### Target and variant


import StoLegacyTargetAndVariant  from './shared/legacy/_sto-ref-legacy-target-and-variant.md';


<StoLegacyTargetAndVariant />

#### SonarQube SonarScanner settings

* `product_name` = `sonarqube`
* `scan_type` = `repository`
* `product_config_name` = `default` — Runs a SonarQube scan with default settings.
* `policy_type` — Enter one of the following:
	+ `orchestratedScan`  — A Security step in the pipeline runs the scan and ingests the results. This is the easiest method to set up and support scans with default or predefined settings.
	+ `dataLoad`  — The pipeline downloads scan results using the [SonarScanner API](https://docs.sonarqube.org/latest/extend/web-api/).
	+ `ingestionOnly` — Run the scan in a Run step, or outside the pipeline, and then ingest the results. This is useful for advanced workflows that address specific security needs. See [Ingest scan results into an STO pipeline](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).
* `repository_project` — The repository name. If you want to scan `https://github.com/my-github-account/codebaseAlpha`, for example, you would set this to `codebaseAlpha`.
* `repository_branch` — The git branch to scan. You can specify a hardcoded string or use the runtime variable [`<+codebase.branch>`](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference#manual-branch-build-expressions). This sets the branch based on the user input or trigger payload at runtime.
* `fail_on_severity` - See [Fail on Severity](#fail-on-severity).
* `tool_args` - You can add a `tool_args` setting to run the [sonar-scanner binary](https://docs.sonarqube.org/9.6/analyzing-source-code/analysis-parameters/) with specific command-line arguments. For example, suppose the scan is experiencing timeouts due to long response times from a web service. You can increase the timeout window like this:  `tool_args` = `-sonar.ws.timeout 300`.


#### `ingestionOnly` settings


import StoLegacyIngest from './shared/legacy/_sto-ref-legacy-ingest.md';


<StoLegacyIngest />

####  `orchestratedScan` and `dataLoad` settings

* `product_domain` — The URL of the SonarQube server. Use the value of the [`sonar.host.url`](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/analysis-parameters/#mandatory-parameters) parameter in SonarQube.
* `product_access_token` — The access token to communicate with the SonarQube server. You must create a secret for the token and use the format `<+secrets.getValue("secret_name")>` to reference the secret. This example references a secret created at the project level. For additional details on referencing secrets, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).  
Go to the [SonarQube docs](https://docs.sonarqube.org/latest/user-guide/user-token/) for information about creating tokens.
* `product_project_name`—The name of the SonarQube project. This is the also the target name in the Harness UI (Security Tests > Test Targets).
* `product_project_key` — The unique identifier of the SonarQube project you want to scan. Look for `sonar.projectKey` in the **sonar-project.properties** file.
* `product_exclude` — If you want to exclude some files from a scan, you can use this setting to configure the `sonar.exclusions` in your SonarQube project. For more information, go to [Narrowing the Focus](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/) in the SonarQube docs.
* `product_java_binaries` — When scanning Java, you need to set the `sonar.java.binaries` key in SonarQube. This is a list of comma-separated paths with the compiled bytecode that correspond to your source files. See [Java](https://docs.sonarqube.org/latest/analysis/languages/java/) in the SonarQube docs.
* `product_java_libraries` — `sonar.java.binaries` is a comma-separated list of paths to files with third-party libraries (JAR or Zip files) used by your project. See [Java](https://docs.sonarqube.org/latest/analysis/languages/java/) in the SonarQube docs.

-->
