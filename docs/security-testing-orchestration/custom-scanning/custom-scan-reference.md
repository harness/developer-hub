---
title: Custom Scan step for supported scanners
description: Set up scanners using key-value pairs.
sidebar_label: Custom Scan step for supported scanners
sidebar_position: 10
redirect_from: 
  - /docs/security-testing-orchestration/sto-techref-category/custom-scan-reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The **Custom Scan** step enables you to configure supported scanners that don't yet have their own dedicated step in the Harness Step Library.

import CustomScannersThatUseCustomStep from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_scanners-that-use-custom-scan-step.md';

<CustomScannersThatUseCustomStep />

## Important notes for Custom Scan steps

- To configure a Custom Scan step, you add a set of key-value pairs in the **Settings** field. The key and value strings you need to specify, such as `product_name` and `orchestratedScan`, are case-sensitive. 
- You need to [add a Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline) if you're running an `orchestratedScan` or `dataLoad` scan in a Kubernetes or Docker build infrastructure. 
- You need to run the [Custom Scan step with root access](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#root-access-requirements-for-sto) if you need to run a Docker-in-Docker step, or if you need to add trusted certificates to your scan images at runtime. 
- The following topics contain useful information for setting up scanner integrations in STO:
  - [What's supported in STO](/docs/security-testing-orchestration/whats-supported)
  - [Security Testing Orchestration FAQs](/docs/faqs/security-testing-orchestration)
  - [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines)

## Workflow descriptions

<details>
<summary>Orchestration/extraction workflows</summary>

import CustomScanWorkflowRepo from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_workflow.md';

<CustomScanWorkflowRepo />

</details>

<details>
<summary>Ingestion workflows</summary>

import CustomScanWorkflowIngest from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_workflow-ingest-only.md';

<CustomScanWorkflowIngest />

</details>

## Custom Scan settings reference

To set up a scanner, you add key-value pairs under **Settings**. The following sections describe the different settings and requirements.

<details>

<summary>Scanner configuration in a Custom Scan step</summary>

<Tabs>
<TabItem value="Visual" label="Visual editor" default>

<DocImage path={require('./static/custom-scan-settings-in-visual-editor.png')} width="50%" height="50%" title="Add shared path for scan results" /> 


</TabItem>
<TabItem value="YAML" label="YAML editor">

``` yaml
- step:
    type: Security
    name: custom_scan_xray
    identifier: custom_scan_xray
    spec:
      privileged: true
      settings:
        policy_type: ingestionOnly
        scan_type: containerImage
        product_name: xray
        product_config_name: default
        target_name: YOUR_REPO/YOUR_IMAGE
        target_variant: YOUR_TAG
        ingestion_file: /shared/scan_results/xray2.json
```

</TabItem>
</Tabs>

</details>


### Scanner settings

These settings are required for most scanners. For more information, go to the reference for the scanner integration you're setting up.

- [Product name](#product-name)
- [Scan type](#scan-type)
- [Policy type](#policy-type)
- [Product config name](#product-config-name)

<CustomScannersThatUseCustomStep />

#### Product name

The scanner name. This is required for all Custom Scan steps. 

##### Key
```
product_name
```

##### Value

Go to the relevant step configuration.

#### Scan type

The target type to scan. 

##### Key
```
scan_type
```

##### Value

Must be one of the following. For supported values, go to the relevant step configuration.

```
containerImage
```
```
repository
```
```
instance
```
```
configuration
```

#### Policy type

The [scan mode](/docs/security-testing-orchestration/get-started/key-concepts/sto-workflows-overview) to use. 

##### Key
```
policy_type
```

##### Value

Must be one of the following. For supported values, go to the relevant step configuration.

```
orchestratedScan
```
```
ingestionOnly
```
```
dataLoad
```

#### Product config name

Required for most scanner integrations. 

##### Key
```
product_config_name
```

##### Value

For supported values, go to the relevant step configuration.


### Target and variant

import CustomScanTargetVariant from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_target-variant.md';

<CustomScanTargetVariant />

### Code repositories 

import CustomScanRepo from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_repo.md';

<CustomScanRepo />

### Container image 

import CustomScanContainer from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_container.md';

<CustomScanContainer />

### Application instances 

import CustomScanAppInstance from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_dast.md';

<CustomScanAppInstance />

### Configurations 

import CustomScanAppConfig from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_config.md';

<CustomScanAppConfig />

### Ingestion file

import CustomScanIngest from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_ingestion-file.md';

<CustomScanIngest />

### Fail on Severity

import CustomScanFailOnSeverity from '/docs/security-testing-orchestration/sto-techref-category/shared/custom-scan/_fail-on-severity.md';

<CustomScanFailOnSeverity />


## Additional Configuration

import ScannerRefAdditionalConfigs from '/docs/security-testing-orchestration/sto-techref-category/shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


## Advanced settings

import ScannerRefAdvancedSettings from '/docs/security-testing-orchestration/sto-techref-category/shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

