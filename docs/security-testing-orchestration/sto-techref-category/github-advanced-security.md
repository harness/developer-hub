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

- **[CodeQL](#codeql) (SAST):** Identify code vulnerabilities. Supported in [**Orchestration**](#scan-mode), [**Extraction**](#scan-mode), and [**Ingestion**](#scan-mode).
- **[Dependabot](#dependabot) (SCA):** Detect vulnerable open-source dependencies. Supported in [**Orchestration**](#scan-mode), [**Extraction**](#scan-mode), and [**Ingestion**](#scan-mode).
- **[Secret Scanning](#secret-scanning):** Detect exposed secrets such as API keys and tokens. Supported in [**Extraction**](#scan-mode) and [**Ingestion**](#scan-mode).

:::info
- To run scans as a non-root user, you can use custom STO scan images and pipelines. See [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports multiple workflows for loading self-signed certificates. See [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).
:::

## GitHub Advanced Security step settings

The recommended workflow is to add a GitHub Advanced Security step to a **Security** or **Build** stage and configure it as described below.

### Scan

#### Scan Mode

- **Orchestration**: Executes the scan, normalizes, and deduplicates results. Supported for **CodeQL** and **Dependabot**.  
  :::note
  - To comply with [GitHub’s licensing requirements](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security#about-github-advanced-security-products), orchestration scans are uploaded to GitHub and then imported into STO.  
  - **Orchestration** mode currently supports *Python (pip)* and *JavaScript/TypeScript (npm or yarn)*. **Extraction** mode supports all languages available in GHAS.
  :::

- **Extraction**: Pulls existing results from GitHub APIs (**CodeQL**, **Dependabot**, **Secret Scanning**).  
- **Ingestion**: Ingests SARIF files from previously run GHAS scans.

#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

The GitHub Advanced Security step supports the following configurations:
- **[CodeQL](#codeql)**
- **[Dependabot](#dependabot)**
- **[Secret Scanning](#secret-scanning)**

### CodeQL
You can use **CodeQL** to perform Static Application Security Testing (SAST). For details about CodeQL itself, see the [CodeQL documentation](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql).  

Here are a few important points to note when using CodeQL with **Orchestration mode**:  
- The repository must be configured with **Advanced setup** for **CodeQL analysis**. To do this, go to your repository settings, click on **Advanced Security**, then go to **Code scanning** section and select **Advanced setup** for **CodeQL analysis**. If you're using default setup, you must switch to Advanced setup before running scans with Orchestration scan mode.  

For **Extraction mode**, CodeQL works with both **Default** and **Advanced setup**.  

---

### Dependabot
You can use **Dependabot** for dependency (SCA) scans. For more information, see the [Dependabot documentation](https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts). 

Prerequisites for Dependabot scans:  
- **Dependabot alerts** must be enabled. To check this, go to your repository settings, select **Advanced Security**, then click on **Enable** for **Dependabot alerts**.  
- **Dependabot** with **Orchestration mode** requires a **Docker-in-Docker (DinD)** background step. When you configure this step, set the **Entrypoint** to `dockerd-entrypoint.sh` instead of `dockerd`. For setup instructions, go to [Configure Docker-in-Docker (DinD) for your pipeline](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline).

---

### Secret Scanning
You can use **Secret Scanning** to detect exposed secrets such as API keys, tokens, or other sensitive values in your repositories. For more details about this feature, see the [Secret Scanning documentation](https://docs.github.com/en/code-security/securing-your-organization/understanding-your-organizations-exposure-to-leaked-secrets/choosing-github-secret-protection).  

Prerequisites for Secret Scanning:  
- **Secret protection** must be enabled. To enable this, go to your repository settings, click on **Advanced Security**, then click on **Enable** for **Secret Protection**.

### Target

#### Type
import StoSettingScanTypeRepo from './shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />

#### Target and variant detection 

import StoSettingScanTypeAutodetectRepo from './shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectNote/>

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

Use a GitHub fine-grained **Personal Access Token (PAT)** with the following repository permissions:

| **Scan Mode** | **Permission**          | **Level**     |
|---------------|--------------------------|---------------|
| **Orchestration** (CodeQL, Dependabot) | Code scanning alerts   | Read & Write |
|               | Dependabot alerts       | Read & Write |
|               | Secret scanning alerts  | Read & Write |
| **Extraction** (CodeQL, Dependabot, Secret Scanning) | Code scanning alerts   | Read-only |
|               | Dependabot alerts       | Read-only |
|               | Secret scanning alerts  | Read-only |

Make sure **Repository access** is set to *All repositories* or *Only selected repositories*.

### Log Level
import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />

### Fail on Severity
import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />

### Additional Configuration
import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />

### Advanced Settings
import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings
import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />
