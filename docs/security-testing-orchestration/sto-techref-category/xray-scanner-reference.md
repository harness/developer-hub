---
title: Jfrog Xray scanner reference for STO
description: Scan container images with Jfrog Xray.
sidebar_label: Jfrog Xray scanner reference
sidebar_position: 420
---


You can ingest scan results from JFrog Xray, a software composition analyis (SCA) solution that integrates with Artifactory and identifies vulnerabilities in open-source libraries and packages used in your code.

The standard workflow is to create a CI Build or Security stage to your pipeline, add a Security Test step, and then use `setting:value` pairs to configure the step as specified below.

:::note
- Harness STO supports `ingestionOnly` scans with Jfrog Xray. `orchestrationOnly` and `dataLoad` scans are not supported. 
:::

## Workflow description

1. Add a CI Build or Security stage to your pipeline.
	
2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.

3. Copy your scan results to the shared path. 

4. Add a [Custom Scan](/docs/security-testing-orchestration/sto-techref-category/custom-scan-reference) step to the stage and add the following settings.

5. Review the [Important notes for Custom Scan steps
](/docs/security-testing-orchestration/sto-techref-category/custom-scan-reference#important-notes-for-custom-scan-steps) for additional requirements and information.

6. Add the following settings to the Custom Scan step. 

    1. [Product name](#product-name)
    1. [Scan type](#scan-type)
    1. [Policy type](#policy-type)
    1. [Product config name](#product-config-name)
    1. [Target and variant](#target-and-variant)
    1. [Ingestion file](#ingestion-file)
    1. [Fail on severity](#fail-on-severity)

<details>

<summary> YAML step example </summary>

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

</details>


## Custom Scan step settings for JFrog XRay scans in STO

### Scanner settings 

These settings  are required. 

#### Product name

##### Key
```
product_name
```

##### Value
```
xray
```

#### Scan type

##### Key
```
scan_type
```
##### Value
```
containerImage
```

#### Policy type

##### Key
```
policy_type
```
##### Value
```
ingestionOnly
```

#### Product config

##### Key
```
product_config_name
```
##### Value
```
default
```

### Target and variant

import CustomScanTargetVariant from './shared/custom-scan/_target-variant.md';

<CustomScanTargetVariant />

### Ingestion file

import CustomScanIngest from './shared/custom-scan/_ingestion-file.md';

<CustomScanIngest />

### Fail on severity

import CustomScanFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<CustomScanFailOnSeverity />


## YAML pipeline example

The following pipeline example shows a simple ingestion workflow. The Run step downloads a results file to `/shared/scan_results/xray2.json`. The Custom Scan step then ingests the file.

For information about running scans using XRay, go to the JFrog documentation.  

```yaml

pipeline:
  name: xray_ingest_example
  identifier: xray_ingest_example
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: stoplugins
        build: <+input>
  stages:
    - stage:
        name: xray_scan_stage
        identifier: xray_scan_stage
        description: ""
        type: SecurityTests
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            paths: []
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: pull_from_s3
                  identifier: pull_from_s3
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR_ID
                    image: amazon/aws-cli
                    shell: Sh
                    command: aws s3api get-object --bucket my-xray-scan-results --key YOUR_RESULTS_FILE /shared/scan_results/YOUR_RESULTS_FILE
                    envVariables:
                      AWS_ACCESS_KEY_ID: <+secrets.getValue("YOUR_AWS_ACCESS_KEY")>
                      AWS_SECRET_ACCESS_KEY: <+secrets.getValue("YOUR_SECRET_ACCESS_KEY")>
                      AWS_DEFAULT_REGION: us-east-1
                  when:
                    stageStatus: Success
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
                      ingestion_file: /shared/scan_results/YOUR_RESULTS_FILE
          sharedPaths:
            - /shared/scan_results/

```