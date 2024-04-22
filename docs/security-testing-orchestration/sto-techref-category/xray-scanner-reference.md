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

    There are two primary workflows to do this:

    - Add a Run step that runs a Wiz scan from the command line and then copies the results to the shared path.
    - Copy results from a Wiz scan that ran outside the pipeline. 

    For more information and examples, go to [Ingestion scans](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).

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


## XRay scanner settings

### Product name

#### Key
```
product_name
```

#### Value
```
xray
```

### Scan type

#### Key
```
scan_type
```
#### Value
```
containerImage
```

### Policy type

#### Key
```
policy_type
```
#### Value
```
ingestionOnly
```

### Product config

#### Key
```
product_config_name
```
#### Value
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

The following pipeline example shows a simple ingestion workflow. The Run step installs the `jf` cli, scans a local image, and saves the results to `/shared/scan_results/xray2.json`. The Custom Scan step then ingests the results.

For information about running scans using XRay, go to the JFrog documentation.  

```yaml

pipeline:
  name: xray_ingest_example
  identifier: xray_ingest_example
  projectIdentifier: dbothwellstosandbox
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
                  name: Run_1
                  identifier: Run_1
                  spec:
                    shell: Sh
                    command: |-
                      # 
                      # 1. Install the jf CLI
                      # 
                      # https://docs.jfrog-applications.jfrog.io/jfrog-applications/jfrog-cli/install
                      # curl -fL "https://install-cli.jfrog.io" | sh; jf setup <+secrets.getValue("YOUR_JF_INSTALL_KEY")>

                      # 2. Scan a local image, save the results to a shared folder
                      # https://docs.jfrog-applications.jfrog.io/jfrog-applications/jfrog-cli/cli-for-jfrog-security/authentication
                      # https://docs.jfrog-applications.jfrog.io/jfrog-applications/jfrog-cli/cli-for-jfrog-security/scan-your-binaries
                      # jf docker scan --format json YOUR_REPO/YOUR_IMAGE:YOUR_TAG \
                      #   --url="YOUR_JFROG_XRAY_URL" \
                      #   --username="YOUR_JFROG_USERNAME" \
                      #   --password="<+secrets.getValue("YOUR_JFROG_PASSWORD")>" \
                      #    > /shared/scan_results/xray2.json 

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
          sharedPaths:
            - /shared/scan_results/

```