---
title: Harness Code Scanner
description: Scan code repositories with Harness Code Scanner
sidebar_label: Code Scanner
sidebar_position: 8

---


<DocsTag  text="Code repo scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/key-concepts/run-an-orchestrated-scan-in-sto"  />

<br/>
<br/>



Harness Code scanner integrates directly into your CI/CD pipelines to scan source code for security vulnerabilities, secrets, and open-source dependencies - without requiring external scanners or connectors.

With one-click configuration, Harness automatically manages authentication and licensing, while providing built-in [data flow visualization](/docs/security-testing-orchestration/harness-security-scanners/sast#data-flow), [reachability analysis](/docs/security-testing-orchestration/harness-security-scanners/sast#reachability) to determine whether a vulnerability is exploitable, and [AI-powered remediation](/docs/security-testing-orchestration/harness-security-scanners/sast#ai-remediation-for-harness-code-security-issues) to help developers quickly understand and fix issues.

The Harness Code step works natively within STO, with all findings unified and visible alongside results from other security scanners.

:::info

### Licensing

Running the Harness Code step in STO pipelines requires a Harness SAST Enterprise license.


For licensing details or to enable the Enterprise license, contact [Harness Sales](mailto:support@harness.io).

### Free Trial

A **45-day free trial** is available. If you are an existing Harness STO customer and want to access the Harness scanners, contact the [Harness sales](mailto:support@harness.io) representative to have them enabled for your account.

:::

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />

<!-- :::note
Harness Code scanner is currently behind the feature flag `STO_STEP_PALETTE_SHIFTLEFT` Contact [Harness Support](mailto:support@harness.io) to enable the scanner.
::: -->


<!-- :::note

Harness Code scanner is being gradually rolled out and is currently enabled for some customers. Full availability across all accounts is coming soon.
::: -->


## Harness Code step settings for STO scans

Setting up the Harness Code scanner is the same as configuring any other [built-in scanner step](/docs/security-testing-orchestration/set-up-scans/built-in-scanners). The required configuration is handled automatically, making the setup process simple and straightforward. Here’s how to set it up:

- In your Build or Security stage, open the step palette by clicking the **Add Step** option in your pipeline.

- Navigate to the Harness Security Scanners section under the Security Tests category.

 <DocImage path={require('./static/harness-code-container.png')} width="30%" height="30%" title="Add shared path for scan results" /> 
- By default, all the below fields are configured automatically by the Harness Code scanner.
    
    - Set the **Scan Mode** to **Orchestration**.
    - Set the **Scan Configuration** to one of the following:
      - **SAST** — Scan for code vulnerabilities and secrets. Requires a **Harness SAST** license.
      - **SCA** — Scan for application layer dependency vulnerabilities. Requires both **Harness SAST** and **Harness SCA** licenses.
      - **SAST + SCA** — Perform both SAST and SCA scans. Requires both **Harness SAST** and **Harness SCA** licenses.
    - Set the **Target Type** to **Repository**.

To run the Harness Code scan step in the pipeline, no further configuration is required; If you want to add additional scan settings, you can configure the following below fields in the step.


 <DocImage path={require('./static/harness-code.png')} width="50%" height="50%" title="Add shared path for scan results" /> 

  <!-- ### Scan

#### Scan Mode

- Currently, only Orchestration mode is supported.

#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />  -->


<!-- ### Target -->

<!-- #### Type

- Repository Scan a codebase repo.

Specify the codebase using a code repo connector that connects to the Git account or repository where your code is stored. For information, go to [Configure codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/). -->


#### Target and Variant Detection

import StoSettingScanTypeAutodetectRepo from './shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>

When you select it as **Manual**, specify the name and variant of the code repo.


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


#### Workspace (_repository_)

import StoSettingTargetWorkspace from './shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />



:::info

- The Harness Code scanner is not supported in SMP.

- With a Harness Code Enterprise license, you also get access to the **Qwiet AI by Harness** platform. AppSec users can log in to the platform.

- The Qwiet AI dashboard does not support [exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow), so any issues you mark as exempt in Harness STO will not appear as exempted in Qwiet AI. Exemptions must be managed in Harness STO only.

:::

### Scan Tool

#### Target Language

Specify which programming language needs to be analyzed in the scan by passing the corresponding parameter. [Learn more](https://docs.shiftleft.io/sast/analyzing-applications/apex) about the supported languages.

| Language                   | Parameter  |
|----------------------------|------------------------------|
| Apex                       | `--apex`                     |
| C/C++                      | `--c`                        |
| C#                         | `--csharp`                   |
| Go                         | `--go`                       |
| Java                       | `--java`                     |
| JavaScript/TypeScript      | `--javascript` / `--jssrc`* |
| Kotlin (Beta)              | `--kotlin`                   |
| PHP (Beta)                 | `--php`                      |
| PL/SQL (Beta)              | `--plsql`                    |
| Python                     | `--python`                   |
| Ruby (Beta)                | `--ruby`                     |
| Scala                      | `--java` (uses Java flag)    |
| Swift (Alpha)              | `--swift` (if applicable)    |
| Terraform                  | `--terraform`                |

#### App Name

Provide a unique name to identify the scanning application. All scan results for this application are grouped and tracked under this name in the [Qwiet AI by Harness dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard).

#### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />

#### Additional CLI flags

Use this field to run the scanner binary with additional flags supported by the scanner.


- Instead of running two separate Harness Code and Container scans, you can use the Harness Code scanner to scan container images and determine [dependency reachability](https://docs.shiftleft.io/sast/analyzing-applications/containers#including-the-container-in-the-analysis) by adding the `--container` flag with the image name. Example: `--container docker.io/shiftleft/demoContainer:latest`. This requires an active [**Harness Container**](/docs/security-testing-orchestration/harness-security-scanners/sca) license


import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />

#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />


### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />

### View Harness Code Scanner results in the Vulnerabilities tab

After running the Harness Code scanner in your pipeline, navigate to the Vulnerabilities tab. Use the **Issue Type** filter to view all vulnerabilities detected by the scanner, including **SAST**, **SCA (Open Source dependencies)**, and **Secrets**.

<DocImage path={require('./static/sast-filters.png')} width="80%" height="80%" title="Add shared path for scan results" />

### Secret Detection

Harness Code detects hardcoded secrets in your code, such as API keys, tokens, and passwords, helps you prevent accidental credential leaks early in the development lifecycle. After the successful pipeline run, in the vulnerabilities tab, apply the **Issue Type** filter as **Secret** to view the Secrets identified by the Harness Code scanner.


 <DocImage path={require('./static/secrets.png')} width="80%" height="80%" title="Add shared path for scan results" /> 

### Static Reachability

A vulnerability is considered as Reachable when an attacker can reach the affected code (CVE) through a controlled path from application input. A vulnerability is marked as Reachable if at least one of its occurrences is reachable. Exempted occurrences are not considered. You can view the Reachability for each of the occurrences of a security issue in the [**Vulnerabilities**](/docs/security-testing-orchestration/view-security-test-results/view-scan-results/) and [**Issues**](/docs/security-testing-orchestration/view-security-test-results/issues/) page.

After a successful pipeline run, the Vulnerabilities tab shows whether a vulnerability is marked as Reachable. On the Vulnerabilities page, use the Reachability filter to view findings by reachability. This helps reduce noise and focus on vulnerabilities that pose real risk. [Learn more](https://docs.shiftleft.io/sast/analyzing-applications/oss-vulnerabilities?_highlight=reac#reachable-and-exploitable-findings).


 <DocImage path={require('./static/harness-code-reachable.png')} width="80%" height="80%" title="Add shared path for scan results" /> 


### Data Flow

The Data Flow helps you understand how an issue propagates through your application by leveraging the [Code Property Graph (CPG)](https://docs.shiftleft.io/core-concepts/code-property-graph), making it easier to assess risk and prioritize remediation by showing the path from the source to the sink.

**SOURCE:** The part of the code that allows the issue to occur. For example, a function that accepts user input could be the source of a command injection vulnerability.

**SINK:** The point where the issue is triggered or exploited. For example, a command executed using unvalidated user input would be the sink.

You can view the Dataflow for each of the occurrences of a security issue in the [**Vulnerabilities**](/docs/security-testing-orchestration/view-security-test-results/view-scan-results/) page.


  <DocImage path={require('./static/dataflow.png')} width="80%" height="80%" title="Add shared path for scan results" /> 

### IDE Integration

Harness provides a code extension that helps you shift security even further left by allowing you to identify and fix vulnerabilities as you write code. It integrates directly into the developer workflow through IDE plugins for [VS Code](https://docs.shiftleft.io/sast/integrations/vs-code-extension) and [JetBrains](https://docs.shiftleft.io/sast/integrations/jetbrains-plugin), with support for AI-native IDEs such as Cursor and Windsurf coming soon.

Harness also provides a CLI to run SAST and SCA scans locally, to help you identify code vulnerabilities and dependency risks before pushing code to your repository. [Learn more](https://docs.shiftleft.io/cli/reference/overview) on how to install, authenticate, and use the CLI commands in the Harness CLI.

### AI remediation for Harness Code Security Issues

Harness AI analyzes security issues and provides AI remediation within the security details for each specific issue. This includes an analysis of the issue, remediation concepts, and step-by-step instructions to fix them, along with example code snippets. Additionally, AI remediation details can be found for each occurrence of an issue. You also have the option to make a Code Suggestion or create a **Pull Request** to apply the suggested remediation.

You can view the PR by clicking on the View Fix button. Make sure to read the [configuration details](/docs/security-testing-orchestration/remediations/ai-based-remediations#configuration-for-code-suggestions-and-create-pull-request-features) to understand the requirements and what is supported for this feature.

<DocImage path={require('./static/create-pr.png')} width="80%" height="80%" title="Add shared path for scan results" /> 


### Enforce OPA Policy to block the Static Reachable Vulnerabilities

Enforce OPA Policy to automatically [warn or block pipelines](/docs/security-testing-orchestration/policies/create-opa-policies#warn-or-block-reachable-or-exploitable-vulnerabilities-reported-by-the-harness-scanner) based on static reachability, exploitability, and license metadata, to help you prevent risky deployments and maintain security and compliance.


### View Harness Code Scan results in the Qwiet AI Dashboard

After running the Harness Code scanner in your pipeline in the scan logs, you can click the provided `shiftleft`link, which redirects you to the [Qwiet AI dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard), where you can explore detailed scan results and analyze identified issues.

You can also find the Qwiet AI dashboard URL in the pipeline **Output** tab. Look for the `SCANNER_CONSOLE_URL` output variable, which contains the direct link to your scan results in the Qwiet AI dashboard.

Alternatively, you can manually log in to the [Qwiet AI dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard) and search for the application name that corresponds to the target name used in the scan.

You can view the [generated SBOM](https://docs.shiftleft.io/sast/ui-v2/application-details/sbom) for application dependencies, along with the [scan summary](https://docs.shiftleft.io/sast/ui-v2/application-details/summary) and [compliance results](https://docs.shiftleft.io/sast/ui-v2/application-details/compliance), in the [Qwiet AI by Harness dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard). These details are currently available only in Qwiet AI by Harness dashboard and are not currently supported in Harness STO.


<DocImage path={require('./static/qwiet-ai-link.png')} width="80%" height="80%" title="Add shared path for scan results" /> 



### License Usage

Usage is calculated based on Active Developers. An Active [Developer](https://docs.shiftleft.io/sast/getting-started/definitions#contributing-developer) is an individual who, within the last 90 days, has created or modified code, configurations, content, or artifacts that are scanned by STO. An individual is counted only once, even if they contribute to multiple scanned repositories.

You can view your current usage and subscription details on the STO subscription page under the **Harness Code and Container** sub-tab.

 <DocImage path={require('./static/harness-sast-trial.png')} width="80%" height="80%" title="Add shared path for scan results" /> 

