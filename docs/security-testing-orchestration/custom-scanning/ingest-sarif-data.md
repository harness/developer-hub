---
title: Ingest SARIF scan results
description: You can ingest results from any scanner that supports SARIF.
sidebar_label: Ingest SARIF scan results
sidebar_position: 20
redirect_from: 
  - docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data
---

[Static Analysis Results Interchange Format (SARIF)](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning) is an open data format supported by many scan tools, especially tools available as GitHub Actions. You can easily ingest SARIF 2.1.0 data from any tool that supports this format. 

### Important notes for ingesting SARIF data into STO

- This workflow is intended for scanners that have no supported integration in STO. Harness recommends that you always use the documented workflow for supported scanners. For a list of all STO-supported scanners, go to [Scanners supported by STO](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#scanners-supported-by-sto).

- Harness STO also supports an STO Custom JSON format for unsupported scanners that can't publish to SARIF. For more information, go to [Ingest Results from Unsupported Scanners](/docs/security-testing-orchestration/custom-scanning/ingesting-issues-from-other-scanners.md).  

### Workflow for ingesting SARIF data into STO

The following workflow describes how to set up an ingestion pipeline for any scanner that supports SARIF. 

1. Add a shared path such as `/shared/scan_results` to the stage. Go to **Overview** > **Shared Paths** in the visual editor, or add it to the YAML like this:  
  
  ```yaml
      - stage:
        spec:
          sharedPaths:
            - /shared/scan_results
  ```
   

2. Publish your scan results to a data file in [SARIF 2.1.0 ](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) format.  

   You might want to set up a Run step to generate your scans automatically whenever the pipeline runs. 

3. Copy the SARIF file to the `/shared/scan_results` folder. 

3. Add an ingestion step after the Run step and configure it as follows.

   1. If your scanner has its own step in the Step Library, add that step. If your scanner doesn't have its own step, add a [Custom Ingest](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference) step.
   
   2. Set the **Scan Mode** to **Ingestion**.
   
   3. Enter the full path and filename in **Ingestion File**.
    
 
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
         file: /shared/scan_results/gitleaks.sarif
   description: gitleaks step
```

## Example workflows for ingesting SARIF data into STO

The following topics describe end-to-end example pipelines for ingesting SARIF data:

- [Custom Ingest settings reference](/docs/security-testing-orchestration/custom-scanning/custom-ingest-reference)

- [Example workflow: Ingest SARIF data from a Checkmarx GitHub Action scan](/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference)

- [Run scans using GitHub Action and Drone Plugin steps](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/run-scans-using-github-actions)

