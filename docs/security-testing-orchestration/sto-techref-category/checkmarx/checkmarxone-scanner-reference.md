---
title: CheckmarxOne step configuration
description: Scan code repositories with CheckmarxOne.
sidebar_label: CheckmarxOne step configuration
sidebar_position: 101
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag  text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#code-repo-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The CheckmarxOne step in Harness STO scans your code repository for security vulnerabilities. It performs the following scans
- **Static Application Security Testing (SAST)** - Analyzes source code for security vulnerabilities.
- **Secret Scanning** - Detects hardcoded secrets in the codebase.
- **Software Composition Analysis (SCA)** — Scans dependencies and third-party libraries for vulnerabilities, including files related to container images in the repository.
- **Infrastructure as Code (IaC)** - Identifies security misconfigurations in IaC files.

This document provides details to understand the step fields and configure them.

:::note
Container image scanning and Dynamic Application Security Testing (DAST) are currently not supported. These features are planned for future releases.
:::

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


## CheckmarxOne step settings

The recommended workflow is to add a CheckmarxOne step to a **Security** or **Build** stage and then configure it as described below. 


### Scan


#### Scan Mode
import StoSettingScanModeOrch from '../shared/step-palette/scan/mode/orchestration.md';
import StoSettingScanModeDataload from '../shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from '../shared/step-palette/scan/mode/ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeDataload />   
<StoSettingScanModeIngest />


<!-- 
- **Orchestration mode**: In this mode, the CheckmarxOne step runs the scan, processes the results by normalizing and deduplicating them.

- **Ingestion mode**: In this mode, the CheckmarxOne step reads scan results from a data file, normalizes the data, and removes duplicates. It supports ingestion of results from any Checkmarx scanner that produces output in the [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html).

- **Extraction mode**: In this mode, the CheckmarxOne step retrieves scan results from the CheckmarxOne portal and stores them in STO. -->


#### Scan Configuration

import StoSettingProductConfigName from '../shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeRepo     from '../shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />


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


### Ingestion File

import StoSettingIngestionFile from '../shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />


### Authentication

<Tabs>
<TabItem value="username and password" label="Username and Password" default>

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
<TabItem value="API Key" label="API Key">

#### Access Token

<StoSettingAuthAccessToken />

</TabItem>
</Tabs>


### Scan Tool

#### Project Name

import StoSettingToolProjectName from '../shared/step-palette/tool/project/name.md';

<StoSettingToolProjectName />

If the specified project does not exist, the step will create a new project using the provided Project Name.


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
