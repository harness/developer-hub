---
title: Checkmarx One step configuration
description: Scan code repositories, container and web instances with Checkmarx One.
sidebar_label: Checkmarx One step configuration
sidebar_position: 101
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#artifact-scanners"  />
<DocsTag   text="DAST scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners#dynamic-application-security-testing---dast-scanners"/>
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The Checkmarx One step in Harness STO can help you perform code scanning, container image scanning and DAST for security vulnerabilities. It performs the following scans
- **Static Application Security Testing (SAST)** - Analyzes source code for security vulnerabilities.
- **Secret Scanning** - Detects hardcoded secrets in the codebase.
- **Software Composition Analysis (SCA)** — Scans dependencies and third-party libraries for vulnerabilities, including files related to container images in the repository.
- **Infrastructure as Code (IaC)** - Identifies security misconfigurations in IaC files.
- **Container Scanning** - Scan the layers, libraries, and packages in a container image.
- **Instance Scanning** - Scan a running application.

This document provides details to understand the step fields and configure them.

:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />
:::

## Checkmarx One step settings

The recommended workflow is to add a Checkmarx One step to a **Security** or **Build** stage and then configure it as described below. 


### Scan


#### Scan Mode
import StoSettingScanModeOrch from '../shared/step-palette/scan/mode/orchestration.md';
import StoSettingScanModeDataload from '../shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from '../shared/step-palette/scan/mode/ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeDataload />   
<StoSettingScanModeIngest />


<!-- 
- **Orchestration mode**: In this mode, the Checkmarx One step runs the scan, processes the results by normalizing and deduplicating them.

- **Ingestion mode**: In this mode, the Checkmarx One step reads scan results from a data file, normalizes the data, and removes duplicates. It supports ingestion of results from any Checkmarx scanner that produces output in the [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html).

- **Extraction mode**: In this mode, the Checkmarx One step retrieves scan results from the Checkmarx One portal and stores them in STO. -->


#### Scan Configuration

import StoSettingProductConfigName from '../shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeRepo     from '../shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />

import StoSettingScanTypeImage     from '../shared/step-palette/target/type/image.md';

<StoSettingScanTypeImage />

import StoSettingScanTypeApp     from '../shared/step-palette/target/type/app.md';

<StoSettingScanTypeApp />

Choose the Target **Type** to display and configure the relevant fields for that scan target.

<Tabs queryString="target-type">

<!-- Repository Configuration -->

<TabItem value="repository" label="Repository" default>

#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from '../shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectNote from '../shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>

#### Name 

import StoSettingTargetName from '../shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from '../shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />

#### Workspace

import StoSettingTargetWorkspace from '../shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />

### Authentication

<Tabs queryString="authentication">

<TabItem value="API Key" label="API Key" default>

#### Access Token

<StoSettingAuthAccessToken />

</TabItem>

<TabItem value="username and password" label="Username and Password">

#### Domain

import StoSettingAuthDomain from '../shared/step-palette/auth/domain.md';

<StoSettingAuthDomain />

#### Access ID

import StoSettingAuthAccessID from '../shared/step-palette/auth/access-id.md';

<StoSettingAuthAccessID />

For **Access ID**, you can use an existing OAuth client in Checkmarx or create a new one and use its `Client ID`.


#### Access Token

import StoSettingAuthAccessToken from '../shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />

For **Access ID**, you can use an existing OAuth client in Checkmarx or create a new one and use its `Client Secret`.

</TabItem>

</Tabs>

---

### Ingestion File

This filed is visible when you are using **Ingestion** Scan Mode

import StoSettingIngestionFile from '../shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />


### Scan Tool

#### Project Name

import StoSettingToolProjectName from '../shared/step-palette/tool/project/name.md';

<StoSettingToolProjectName />

If the specified project does not exist, the step will create a new project using the provided Project Name.

#### Use Raw Scanner Severity

import ScannerProvidedSeverity from '../shared/use-scanner-provided-severity.md';

<ScannerProvidedSeverity />

</TabItem>

<!-- END: Repository Configuration -->

<!-- Container Image Configuration -->

<TabItem value="container image" label="Container Image">

#### Target and variant detection 

import StoSettingScanTypeAutodetectContainer from '../shared/step-palette/target/auto-detect/container-image.md';

<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>

#### Name 

<StoSettingTargetName />


#### Variant


<StoSettingTargetVariant  />

### Container Image

<a name="container-type"></a>

#### Type  

import StoSettingImageType from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/image/type.md';

<StoSettingImageType />

<!-- ============================================================================= -->
<a name="container-domain"></a>

#### Domain 

import StoSettingImageDomain from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/image/domain.md';

<StoSettingImageDomain />

<!-- ============================================================================= -->
<a name="container-name"></a>

#### Name

import StoSettingImageName from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/image/name.md';

<StoSettingImageName />

<!-- ============================================================================= -->
<a name="container-tag"></a>

#### Tag

import StoSettingImageTag from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/image/tag.md';

<StoSettingImageTag />

<!-- ============================================================================= -->
<a name="container-access-id"></a>

#### Access Id

import StoSettingImageAccessID from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/image/access-id.md';

<StoSettingImageAccessID />

<!-- ============================================================================= -->
<a name="container-access-token"></a>

#### Access Token 

import StoSettingImageAccessToken from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/image/access-token.md';

<StoSettingImageAccessToken />


### Authentication

<Tabs queryString="authentication">

<TabItem value="API Key" label="API Key" default>

#### Access Token

<StoSettingAuthAccessToken />

</TabItem>

<TabItem value="username and password" label="Username and Password">

#### Domain



<StoSettingAuthDomain />

#### Access ID



<StoSettingAuthAccessID />

For **Access ID**, you can use an existing OAuth client in Checkmarx or create a new one and use its `Client ID`.


#### Access Token


<StoSettingAuthAccessToken />

For **Access ID**, you can use an existing OAuth client in Checkmarx or create a new one and use its `Client Secret`.

</TabItem>

</Tabs>

---

### Ingestion File

This filed is visible when you are using **Ingestion** Scan Mode

<StoSettingIngestionFile  />


### Scan Tool

#### Project Name

<StoSettingToolProjectName />

If the specified project does not exist, the step will create a new project using the provided Project Name.

#### Use Raw Scanner Severity

<ScannerProvidedSeverity />

</TabItem>

<!-- END: Container Image Configuration -->

<!-- Instance Configuration -->
<TabItem value="instance" label="Instance">

#### Target and variant detection 

import StoSettingScanTypeAutodetectApp from '../shared/step-palette/target/auto-detect/app-instance.md';

<StoSettingScanTypeAutodetectApp/>

#### Name 

<StoSettingTargetName />


#### Variant

<StoSettingTargetVariant  />

### Authentication

#### Domain
<StoSettingAuthDomain />

#### Access Token
<StoSettingAuthAccessToken />

---

### Ingestion File

This filed is visible when you are using **Ingestion** Scan Mode

<StoSettingIngestionFile  />


### Scan Tool

#### Team Name

Enter your Checkmarx One [Tenant Name](https://docs.checkmarx.com/en/34965-68530-logging-in-to-checkmarx-one.html).  
Provide the tenant name in the format `/<server-name>/<team-name>`.  
Example: `/server1.myorg.org/devOpsEast`

#### Project Name

Enter the project name to be scanned.

- If the specified project does not exist, the step creates a new project with the provided name.
- The provided [Domain URL](#domain-3) is configured as the project name if a new project is created.

#### Environment ID

Enter your [Checkmarx One Environment ID](https://docs.checkmarx.com/en/34965-154695-dast-creating-environments.html).
You can execute the step by entering only the existing Checkmarx One Environment ID without specifying any optional fields.

#### Scan Type

Select the scan type based on your use case:

- **WEB**: Select if scanning a web application.
- **API**: Select if scanning an API.

#### Context Name

Specify the Checkmarx context file to use for the scan.

- You must add the following shared path (**Overview** > **Shared Paths**) to your stage and copy your context file to this location:  
  `/shared/customer_artifacts/context/`

#### Use Raw Scanner Severity

<ScannerProvidedSeverity />


</TabItem>

</Tabs>

<!-- END: Instance Configuration -->

---

### Log Level

import StoSettingLogLevel from '../shared/step-palette/all/log-level.md';

<StoSettingLogLevel />


#### Fail on Severity

import StoSettingFailOnSeverity from '../shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />



### Additional Configuration

import ScannerRefAdditionalConfigs from '../shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from '../shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from '../shared/proxy-settings.md';

<ProxySettings />
