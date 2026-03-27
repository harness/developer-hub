---
title: Harness SCA Scanner
description: Scan container images with Harness SCA Scanner
sidebar_label: SCA Scanner
sidebar_position: 8

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<DocsTag  text="Artifact Scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners/?view-by=target-type#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/key-concepts/run-an-orchestrated-scan-in-sto"  />


<br/>
<br/>

Harness native  **Software Composition Analysis (SCA)** scanner integrates directly within your CI/CD pipelines to scan container images to find vulnerabilities in OS packages and libraries installed in the image - without requiring external scanners or connectors.  

With one-click configuration, Harness automatically manages authentication and licensing, while providing built-in data flow visualization, reachability analysis to determine whether a vulnerability is exploitable, and AI-powered remediation to help developers quickly understand and fix issues.


The SCA step works natively within STO, with all findings unified and visible alongside results from other security scanners.

:::info

### Licensing

Running the Harness SCA step in STO pipelines requires a Harness SCA Enterprise license.


For licensing details or to enable the Enterprise license, contact [Harness Sales](mailto:support@harness.io).

### Free Trial

A 45-day free trial is available. If you are an existing Harness STO customer and want to access the Harness scanners, contact the [Harness sales](mailto:support@harness.io) representative to have them enabled for your account.

:::

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />


:::note

Harness SCA scanner is being gradually rolled out and is currently enabled for some customers. Full availability across all accounts is coming soon.
:::

## Harness SCA step settings for STO scans

:::info
To view [Reachability](/docs/security-testing-orchestration/harness-security-scanners/sast#reachability) information in Harness SCA, you must run the Harness SAST scanner. The scanner uses SAST based data flow analysis to understand how data moves through your code and determine whether an issue is reachable.
:::

<!-- ### Container image -->


Setting up the Harness SCA scanner is the same as configuring any other [built-in scanner step](/docs/security-testing-orchestration/set-up-scans/built-in-scanners). The required configuration for the scanner step is handled automatically, making the setup process simple and straightforward. Here’s how to set it up:

- In your **Build** or **Security** stage, open the step palette by clicking the **Add Step** option in your pipeline.

- Navigate to the Harness Security Scanners section under the Security Tests category. Select the **Harness SCA** step.

 <DocImage path={require('./static/sast-and-sca.png')} width="30%" height="30%" title="Add shared path for scan results" /> 

- Provide the container information from which you want to pull your container images.

- By default, all the below fields are configured automatically by the Harness SCA scanner.
    
    - Set the **Scan Mode** to **Orchestration**.
    - Set the **Scan Configuration** to **Default**
    - Set the **Target Type** to **Container Image**.

To run the Harness SCA scan step in the pipeline, no further configuration is required; If you want to add additional scan settings, you can configure the following below fields in the step.



import ArtifactSource from './shared/artifact-source.md';

<ArtifactSource />

<!-- #### Type -->


<!-- import StoSettingImageType from './shared/step-palette/image/type.md';



<StoSettingImageType />

#### Domain



import StoSettingImageDomain from './shared/step-palette/image/domain.md';



<StoSettingImageDomain />

#### Name


import StoSettingImageName from './shared/step-palette/image/name.md';



<StoSettingImageName />


#### Tag/Digest


import StoSettingImageTag from './shared/step-palette/image/tag.md';

<StoSettingImageTag />

#### Access ID

import StoSettingImageAccessID from './shared/step-palette/image/access-id.md';

<StoSettingImageAccessID />

#### Access Token


import StoSettingImageAccessToken from './shared/step-palette/image/access-token.md';



<StoSettingImageAccessToken />


#### Region  


import StoSettingImageRegion from './shared/step-palette/image/region.md';



<StoSettingImageRegion /> -->

<DocImage path={require('./static/sast-container.png')} width="80%" height="80%" title="Add shared path for scan results" /> 

<!-- ### Scan

#### Scan Mode

- Currently, only Orchestration mode is supported.


#### Scan Configuration

- **Default**: Automatically selected when you choose **Container Image** as the [Target Type](#target). This configuration scans container images for vulnerabilities. -->


### Target


#### Type

import StoSettingScanTypeCont from './shared/step-palette/target/type/image.md';


<StoSettingScanTypeCont />



#### Target and Variant Detection 

import StoSettingScanTypeAutodetectContainer from './shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />

#### Workspace
This field is visible only when you select **Repository** as the Target Type.

Use this field to specify an individual folder or file to scan. For example, if you want to scan a specific file like `/tmp/example/test.py`, set the workspace path to:  
`/harness/tmp/example/test.py`


:::info

- The Harness SCA scanner is not supported in SMP.

- With a Harness SCA Enterprise license, you also get access to the **Qwiet AI by Harness** platform. AppSec users can log in to the platform.

- The Qwiet AI dashboard does not support [exemptions](/docs/security-testing-orchestration/exemptions/issue-exemption-workflow), so any issues you mark as exempt in Harness STO will not appear as exempted in Qwiet AI. Exemptions must be managed in Harness STO only.

:::


### Scan Tool

#### App Name

Provide a unique name to identify this scanning application. All scan results for this application are grouped and tracked under this name in the [Qwiet AI by Harness dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard).


#### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


#### Additional CLI flags



#### Fail on Severity


import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';


<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />


### View Harness SCA Scan results in the Vulnerabilities tab

After you complete the pipeline run with the Harness SCA scanner, in the vulnerabilities tab, apply the **Issue Type** filter as SCA to view the vulnerabilities identified by the Harness SCA scanner.

<DocImage path={require('./static/view.png')} width="80%" height="80%" title="Add shared path for scan results" />


### Static Reachability

A vulnerability is considered as Reachable when an attacker can reach the affected code (CVE) through a controlled path from application input. A vulnerability is marked as Reachable if at least one of its occurrences is reachable. Exempted occurrences are not considered. You can view the Reachability for each of the occurrences of a security issue in the [**Vulnerabilities**](/docs/security-testing-orchestration/view-security-test-results/view-scan-results/) and [**Issues**](/docs/security-testing-orchestration/view-security-test-results/issues/) page.

After a successful pipeline run, the Vulnerabilities tab shows whether a vulnerability is marked as Reachable. On the Vulnerabilities page, use the Reachability filter to view findings by reachability. This helps reduce noise and focus on vulnerabilities that pose real risk. [Learn more](https://docs.shiftleft.io/sast/analyzing-applications/oss-vulnerabilities?_highlight=reac#reachable-and-exploitable-findings).


 <DocImage path={require('./static/sca-reachable.png')} width="80%" height="80%" title="Add shared path for scan results" />

 ### IDE Integration

Harness provides a code extension that helps you shift security even further left by allowing you to identify and fix vulnerabilities as you write code. It integrates directly into the developer workflow through IDE plugins for [VS Code](https://docs.shiftleft.io/sast/integrations/vs-code-extension) and [JetBrains](https://docs.shiftleft.io/sast/integrations/jetbrains-plugin), with support for AI-native IDEs such as Cursor and Windsurf coming soon.

Harness also provides a CLI to run SAST and SCA scans locally, to help you identify code vulnerabilities and dependency risks before pushing code to your repository. [Learn more](https://docs.shiftleft.io/cli/reference/overview) on how to install, authenticate, and use the CLI commands in the Harness CLI.


### AI remediation for Harness SCA Security Issues

Harness AI analyzes security issues and provides AI remediation within the security details for each specific issue. This includes an analysis of the issue, remediation concepts, and step-by-step instructions to fix them. Additionally, for SCA issues, Harness AI recommends safer package versions for upgrade, with remediation details available for each occurrence of an issue.


 <DocImage path={require('./static/sca-remediation.png')} width="80%" height="80%" title="Add shared path for scan results" /> 


### Enforce OPA Policy to block the Static Reachable Vulnerabilities

Enforce OPA Policy to automatically [warn or block pipelines](/docs/security-testing-orchestration/policies/create-opa-policies#warn-or-block-reachable-or-exploitable-vulnerabilities-reported-by-the-harness-scanner) based on static reachability, exploitability, and license metadata, to help you prevent risky deployments and maintain security and compliance. 

### View Harness SCA Scan results in the Qwiet AI Dashboard

After you complete the pipeline run with the Harness SCA scanner, in the scan logs, you can click the provided `shiftleft`link, which redirects you to the [Qwiet AI dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard), where you can explore detailed scan results and analyze identified issues.

Alternatively, you can manually log in to the Qwiet AI by Harness dashboard and search for the application name that corresponds to the target name used in the scan.

You can view the [generated SBOM](https://docs.shiftleft.io/sast/ui-v2/application-details/sbom) for container image dependencies, along with the [scan summary](https://docs.shiftleft.io/sast/ui-v2/application-details/summary) and [compliance results](https://docs.shiftleft.io/sast/ui-v2/application-details/compliance), in the [Qwiet AI by Harness dashboard](https://docs.shiftleft.io/sast/ui-v2/dashboard). These details are currently available only in Qwiet AI by Harness dashboard and are not currently supported in Harness STO.

<DocImage path={require('./static/sca-pipeline.png')} width="80%" height="80%" title="Add shared path for scan results" />

### License Usage

Usage is calculated based on Active Developers. An Active [Developer](https://docs.shiftleft.io/sast/getting-started/definitions#contributing-developer) is an individual who, within the last 90 days, has created or modified code, configurations, content, or artifacts that are scanned by STO. An individual is counted only once, even if they contribute to multiple scanned repositories.


You can view your current usage and subscription details on the STO subscription page under the **Harness SAST and SCA** sub-tab

 <DocImage path={require('./static/harness-scanner-trial.png')} width="80%" height="80%" title="Add shared path for scan results" /> 

