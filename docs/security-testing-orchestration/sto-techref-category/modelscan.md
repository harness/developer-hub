---
title: ModelScan Step Configuration
description: Scan machine learning models with ModelScan.
sidebar_label: ModelScan Step Configuration
sidebar_position: 240
---

<DocsTag text="Code repo scanners" backgroundColor="#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners" />
<DocsTag text="Orchestration" backgroundColor="#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto" />
<DocsTag text="Ingestion" backgroundColor="#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The **ModelScan** step in Harness STO uses the open-source scanner [ModelScan](https://github.com/protectai/modelscan) to scan your machine learning (ML) models for security vulnerabilities. You can perform **ModelScan** scans in both **[Orchestration](#scan-mode)** and **[Ingestion](#scan-mode)** modes. This document will guide you through configuring the **ModelScan** step in your STO pipeline.

:::info
- To run scans as a non-root user, you can use custom STO scan images and pipelines. See [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports multiple workflows for loading self-signed certificates. See [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).
:::

### Supported ML Libraries and Formats

The following table lists the ML libraries and serialization formats, along with their support status in the **ModelScan** step.

| ML Library                                   | Serialization Format                 | Support Status   |
| :------------------------------------------- | :----------------------------------- | :--------------- |
| Pytorch                                      | Pickle                               | ✅ Supported     |
| Keras                                        | HD5 (Hierarchical Data Format)       | ✅ Supported     |
| Classic ML Libraries (Sklearn, XGBoost, etc.) | Pickle, Cloudpickle, Dill, Joblib    | ✅ Supported     |
| TensorFlow                                   | Protocol Buffer                      | ❌ Not Supported |
| Keras                                        | Keras V3 (Hierarchical Data Format)  | ❌ Not Supported |

Scanning ML models in **binary files** is not supported. Your models must be in one of the supported formats listed above.

## ModelScan step settings

The recommended workflow is to add a **ModelScan** step to a **Security** or **Build** stage and then configure it as described below.

### Scan Mode

- **Orchestration mode**: In this mode, the step executes the scan, then processes the results by normalizing and deduplicating them.
- **Ingestion mode**: In this mode, the **ModelScan** step ingests scan results from a specified file. The scan results file must be in JSON format.

### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

### Target

#### Type

import StoSettingScanTypeRepo from './shared/step-palette/target/type/repo.md';

<StoSettingScanTypeRepo />

You can also scan models stored in **Hugging Face** repositories by using the [Harness GitHub connector](/docs/platform/connectors/code-repositories/connect-to-code-repo), configured to connect to your Hugging Face account.

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