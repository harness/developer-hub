---
title: Jfrog Xray scanner reference for STO
description: Scan container images with Jfrog Xray.
sidebar_label: Jfrog Xray scanner reference
sidebar_position: 420
---

You can ingest scan results from JFrog Xray, a software composition analyis (SCA) solution that integrates with Artifactory and identifies vulnerabilities in open-source libraries and packages used in your code.

<!-- 

RP INCLUDE FIRST INTRO SENTENCE
https://jfrog.com/help/r/get-started-with-the-jfrog-platform/jfrog-xray

-->

The standard workflow is to create a CI Build or Security stage to your pipeline, add a Security Test step, and then use `setting:value` pairs to configure the step as specified below.

:::note
- Harness STO supports `ingestionOnly` scans with Jfrog Xray. `orchestrationOnly` and `dataLoad` scans are not supported. 
:::

## Workflow description

### Add a shared path for your scan results

  1. Add a CI Build or Security stage to your pipeline.
	
  2. In the stage **Overview**, add a shared path such as `/shared/scan_results`.

### Copy scan results to the shared path

There are two primary workflows to do this:

- Add a Run step that runs a Wiz scan from the command line and then copies the results to the shared path.
- Copy results from a Wiz scan that ran outside the pipeline. 

For more information and examples, go to [Ingestion scans](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-scan-results-into-an-sto-pipeline).

### Set up the Xray scanner

Add a [Custom Scan](/docs/security-testing-orchestration/sto-techref-category/custom-scan-reference) step to the stage and add the following settings.

1. [Product name](#product-name)
1. [Scan type](#scan-type)
1. [Key](#key-1)
1. [Policy type](#policy-type)
1. [Product config name](#product-config-name)
1. [Target and variant](#target-and-variant)
1. [Ingestion file](#ingestion-file)
1. [Fail on Severity](#fail-on-severity)


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

### Product config name

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

### Fail on Severity

import CustomScanFailOnSeverity from './shared/custom-scan/_fail-on-severity.md';

<CustomScanFailOnSeverity />