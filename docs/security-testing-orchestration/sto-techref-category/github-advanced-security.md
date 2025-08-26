---
title: GitHub Advanced Security step configuration
description: Scan code repositories with GitHub Advanced Security (GHAS).
sidebar_label: GitHub Advanced Security step configuration
sidebar_position: 201
---

<DocsTag text="Code repo scanners" backgroundColor="#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners" />
<DocsTag text="Orchestration" backgroundColor="#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto" />
<DocsTag text="Extraction" backgroundColor="#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag text="Ingestion" backgroundColor="#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The GitHub Advanced Security (GHAS) step in Harness STO enables you to scan your code repositories from the following GHAS products:

- **CodeQL (SAST):** Identify code vulnerabilities with CodeQL. Run scans in [**Orchestration**](#scan-mode), pull alerts via [**Extraction**](#scan-mode), or ingest results through [**Ingestion**](#scan-mode).  
- **Dependabot (SCA):** Detect vulnerable open-source dependencies. Use [**Orchestration**](#scan-mode) for live scans or [**Extraction**](#scan-mode) and [**Ingestion**](#scan-mode) to feed existing issues into STO.
- **Secret Scanning:** Find exposed secrets like API keys or tokens. STO supports [**Extraction**](#scan-mode) and [**Ingestion**](#scan-mode) of GitHub alerts.  

:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](./docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](./docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).

import StoMoreInfo from './shared/more-information.md';

<StoMoreInfo />
:::

## GitHub Advanced Security step settings

The recommended workflow is to add a GitHub Advanced Security step to a **Security** or **Build** stage and then configure it as described below.

### Scan

#### Scan Mode

* **Orchestration**: The step executes a the scan, normalizes the results, and deduplicates them. This mode is supported for **CodeQL** and **Dependabot** scan modes.
* **Extraction**: The step pulls existing scan results from the GitHub API for **CodeQL**, **Dependabot**, or **Secret Scanning**.
* **Ingestion**: The step ingests a SARIF file containing results from a GHAS scan that you ran previously.

#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

* **CodeQL**: Use for Static Application Security Testing (SAST).
* **Dependabot**: Use for Dependency scanning.
* **Secret**: Use to detect exposed secrets in your codebase.

### Target

#### Type

import StoSettingScanTypeRepo from './shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />

#### Name

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />

#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant />

#### Workspace

import StoSettingTargetWorkspace from './shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace />

### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile />

### Authentication

#### Access Token

import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />

Use a GitHub fine-grained **Personal Access Token** with the following repository permissions, based on your scan mode.  
Make sure **Repository access** is set to **All repositories** or **Only selected repositories**.

| **Scan Mode** | **Permission**        | **Level**     |
|---------------|------------------------|---------------|
| **Orchestration** (CodeQL, Dependabot) | Code scanning alerts   | Read & Write |
|               | Dependabot alerts       | Read & Write |
|               | Secret scanning alerts  | Read & Write |
| **Extraction** (All Scan Configurations) | Code scanning alerts   | Read-only    |
|               | Dependabot alerts       | Read-only    |
|               | Secret scanning alerts  | Read-only    |


### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />

### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />

### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />