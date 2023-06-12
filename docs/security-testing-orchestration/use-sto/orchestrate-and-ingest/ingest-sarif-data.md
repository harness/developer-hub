---
title: Ingest SARIF scan data
description: You can easily ingest from any scanner can output results in SARIF format.
sidebar_position: 45
---

[Static Analysis Results Interchange Format (SARIF)](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning) is an open data format supported by many scan tools, especially tools available as GitHub Actions. You can easily ingest SARIF 2.1.0 data from any tool that supports this format. 

## Workflow descripton

1. In your Harness pipeline, go to the Overview tab of the security stage and enter a shared path such as `/shared/customer_artifacts`.
 
   ![](../static/ingesting-issues-from-other-scanners-00.png)

2. Publish your scan results to a data file in [SARIF 2.1.0 ](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html) format.  

   You might want to set up a Run step to generate your scans automatically whenever the pipeline runs. See the YAML pipeline below for an example. 

3. Copy the SARIF file to the `/shared/customer_artifacts` folder. 

3. Add a **Custom Ingest** step after the Run step. (If the Step Library has a scanner template for your tool, such as CodeQL, you can use that as well.) 

4. Configure your ingestion step as follows.

#### Target Name 
   
```mdx-code-block
import StoSettingProductID from '../../sto-techref-category/shared/step_palette/_sto-ref-ui-prod-id.md';
```

<StoSettingProductID />

#### Target Variant 
   
```mdx-code-block
import StoSettingTargetVariant from '../../sto-techref-category/shared/step_palette/_sto-ref-ui-target-variant.md';
```

<StoSettingTargetVariant  />


   
#### Ingestion File 

```mdx-code-block
import StoSettingIngestionFile from '../../sto-techref-category/shared/step_palette/_sto-ref-ui-ingestion-file.md';
```

<StoSettingIngestionFile  />


#### Fail on Severity

docs/security-testing-orchestration/sto-techref-category/shared/step_palette/_sto-ref-ui-fail-on-severity.md

```mdx-code-block
import StoSettingFailOnSeverity from '../../sto-techref-category/shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```
<StoSettingFailOnSeverity />


## YAML pipeline example: ingest CodeQL scan results

The following pipeline illustrates how you can set up a scan using a Run step and then ingest the results using a Custom Ingest step.

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: wwdvpwa
        repoName: dvpwa
        build: <+input>
  stages:
    - stage:
        name: codeql
        identifier: codeql
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: codeql_analyze
                  identifier: codeql_analyze
                  spec:
                    connectorRef: account.harnessImage
                    image: ubuntu:20.04
                    shell: Sh
                    command: |-
                      #!/bin/bash


                      # Change the working directory to the app directory.
                      mkdir /app
                      cd /app

                      # Update and upgrade the apt packages.
                      apt update -y -q
                      apt upgrade -y -q 

                      # Install the wget and tar packages and python3.
                      export DEBIAN_FRONTEND="noninteractive"
                      apt install -y -q wget tar python3.9-venv python3.9 build-essential

                      # Download the CodeQL bundle.
                      wget -q https://github.com/github/codeql-action/releases/latest/download/codeql-bundle-linux64.tar.gz

                      # Extract the CodeQL bundle.
                      tar -xvzf ./codeql-bundle-linux64.tar.gz -C /app/

                      # Set the PATH environment variable to include the CodeQL directory.
                      export PATH="${PATH}:/app/codeql"

                      # Resolve the CodeQL packs
                      codeql resolve qlpacks

                      # Move back to the code folder before scanning
                      cd /harness

                      # Create a CodeQL database.
                      codeql database create python_database --language=python

                      # Run the CodeQL analyzer.
                      codeql database analyze python_database --format=sarif-latest --output=/shared/customer_artifacts/dvpwa-codeql-results.sarif
                    imagePullPolicy: Always
                    resources:
                      limits:
                        memory: 2G
                        cpu: 2000m
              - step:
                  type: CustomIngest
                  name: CustomIngest_1
                  identifier: CustomIngest_1
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      name: codeql
                      type: repository
                      variant: test
                    advanced:
                      log:
                        level: info
                      fail_on_severity: critical
                    ingestion:
                      file: /shared/customer_artifacts/dvpwa-codeql-results.sarif
          sharedPaths:
            - /shared/customer_artifacts/
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: stoqadelegate
              namespace: harness-qa-delegate
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
  identifier: CodeQLdbothwellv2_Clone
  name: CodeQL-dbothwell-v2 Clone

```
