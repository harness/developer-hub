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

The CheckmarxOne step in Harness STO enables you to scan your code for security vulnerabilities. This document will guide you through understanding the fields, configuring them, and providing any necessary information for setting up the step.

### Root access requirements 

import StoRootRequirements from '/docs/security-testing-orchestration/sto-techref-category/shared/root-access-requirements-no-dind.md';

<StoRootRequirements />


## CheckmarxOne step settings

The recommended workflow is to add a CheckmarxOne step to a **Security** or **Build** stage and then configure it as described below. 


### Scan


#### Scan Mode
import StoSettingScanModeOrch from './shared/step_palette/scan/mode/_orchestration.md';
import StoSettingScanModeDataload from './shared/step_palette/scan/mode/_extraction.md';
import StoSettingScanModeIngest from './shared/step_palette/scan/mode/_ingestion.md';

<StoSettingScanModeOrch />
<StoSettingScanModeDataload />   
<StoSettingScanModeIngest />


<!-- 
- **Orchestration mode**: In this mode, the CheckmarxOne step runs the scan, processes the results by normalizing and deduplicating them.

- **Ingestion mode**: In this mode, the CheckmarxOne step reads scan results from a data file, normalizes the data, and removes duplicates. It supports ingestion of results from any Checkmarx scanner that produces output in the [SARIF format](https://docs.oasis-open.org/sarif/sarif/v2.0/sarif-v2.0.html).

- **Extraction mode**: In this mode, the CheckmarxOne step retrieves scan results from the CheckmarxOne portal and stores them in STO. -->


#### Scan Configuration

import StoSettingProductConfigName from './shared/step_palette/scan/_config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeRepo     from './shared/step_palette/target/type/_repo.md';

<StoSettingScanTypeRepo />


#### Target and variant detection 

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

<Tabs>
<TabItem value="username and password" label="Username and Password" default>

#### Domain

import StoSettingAuthDomain from './shared/step_palette/auth/_domain.md';

<StoSettingAuthDomain />

#### Access ID

import StoSettingAuthAccessID from './shared/step_palette/auth/_access-id.md';

<StoSettingAuthAccessID />


#### Access Token

import StoSettingAuthAccessToken from './shared/step_palette/auth/_access-token.md';

<StoSettingAuthAccessToken />

</TabItem>
<TabItem value="API Key" label="API Key">

#### Access Token

<StoSettingAuthAccessToken />

</TabItem>
</Tabs>


### Scan Tool

#### Project Name

import StoSettingToolProjectName from './shared/step_palette/tool/project/_name.md';

<StoSettingToolProjectName />


### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />


#### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />
