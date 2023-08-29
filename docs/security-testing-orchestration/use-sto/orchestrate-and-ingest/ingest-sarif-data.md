---
title: Ingest SARIF results 
description: You can easily ingest from any scanner can publish results in SARIF format.
sidebar_position: 45
---

[Static Analysis Results Interchange Format (SARIF)](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning) is an open data format supported by many scan tools, especially tools available as GitHub Actions. You can easily ingest SARIF 2.1.0 data from any tool that supports this format. 

The following workflow describes how to set up an ingestion pipeline for any scanner that supports SARIF. 

### Ingestion workflow description

1. In your Harness pipeline, go to the Overview tab of the security stage and enter a shared path such as `/shared/customer_artifacts`.
 
   ![](../static/ingesting-issues-from-other-scanners-00.png)

2. Publish your scan results to a data file in [SARIF 2.1.0 ](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) format.  

   You might want to set up a Run step to generate your scans automatically whenever the pipeline runs. 
   
   <!-- See [CodeQL Scanner Reference](/docs/security-testing-orchestration/sto-techref-category/codeql-scanner-reference) for an example workflow. -->

3. Copy the SARIF file to the `/shared/customer_artifacts` folder. 

3. Add an ingestion step after the Run step and configure it as follows.

   - If you're using a scanner that has a [scanner template](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#security-steps-and-scanner-templates), use the scanner template to ingest your results. Set the **Scan Mode** to **Ingestion** and configure the step as described in the [STO Scanner Reference](/docs/category/sto-technical-reference) topic for that step. 
   
   - If you're using a scanner that does not have a scanner template, use a [Custom Ingest](/docs/security-testing-orchestration/sto-techref-category/custom-ingest-reference) step. 
 
Here's an example of how to configure a Gitleaks step to ingest a SARIF data file:

```yaml
- step:
   type: Gitleaks
   name: gitleaks
   identifier: gitleaks
   spec:
      mode: ingestion
      config: default
      target:
         name: nodegoat
         type: repository
         variant: dev
      advanced:
         log:
         level: debug
      ingestion:
         file: /path/of/file.sarif
   description: gitleaks step
```



### Example workflows

Here are some topics that describe end-to-end workflows for ingesting SARIF data:

- [Gitleaks Scanner Reference](/docs/security-testing-orchestration/sto-techref-category/gitleaks-scanner-reference)

- [Example workflow: Ingest SARIF data from a Checkmarx GitHub Action scan](/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference)

- [Run scans using GitHub Action and Drone Plugin steps](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/run-scans-using-github-actions)

