---
title: Ingest from Checkmarx GitHub Action
description: Ingest data from Checkmarx GitHub Action.
sidebar_label: Checkmarx GitHub Action - Ingestion
sidebar_position: 103
---

You can use the [Checkmarx CxFlow GitHub Action](https://github.com/checkmarx-ts/checkmarx-cxflow-github-action) with Harness to perform security scans and ingest the scan results into Harness STO. This document details how to configure your pipeline to run the **Checkmarx CxFlow GitHub Action** for scanning and ingest the results using the [Checkmarx step](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference) in STO.

### Pipeline steps

1. **[GitHub Actions Plugin](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie)**: Executes the [Checkmarx CxFlow GitHub Action](https://github.com/checkmarx-ts/checkmarx-cxflow-github-action) to perform the scan.
2. **[Checkmarx Step](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference)**: Ingests the scan results from the GitHub Actions Plugin step and feeds them into STO.

### Shared path configuration

Since this process involves ingestion, configure a shared path in the **Overview** section of your stage:

1. Navigate to **Overview** of your stage.
2. Under **Shared Path**, add `/shared/scan_results/`.

This directory will store the **SARIF** scan results from the GitHub Action, which the Checkmarx step will use for ingestion.

### Configure GitHub Actions Plugin

1. Add the **GitHub Actions Plugin** to the **Security** or **Build** stage of your pipeline.
2. Set the **Uses** field to `checkmarx-ts/checkmarx-cxflow-github-action@v1.6`.
3. Configure key-value pairs under **Settings** to define scan parameters.

   - project: ProjectName
   - team: /Server/team/name
   - scanners: sca
   - checkmarx_url: `<+secrets.getValue("my-checkmarx-url")>`
   - checkmarx_username: username
   - checkmarx_password: `<+secrets.getValue("my-checkmarx-password")>`
   - checkmarx_client_secret: `<+secrets.getValue("my-checkmarx-client-secret")>`
   - sca_username: username
   - sca_password: `<+secrets.getValue("my-sca-password")>`
   - sca_tenant: cxintegrations
   - break_build: false

For a complete list of supported input parameters, refer to the [CxFlow GitHub Action documentation](https://github.com/checkmarx-ts/checkmarx-cxflow-github-action?tab=readme-ov-file#inputs).

### Configure Checkmarx step for ingestion

1. Add the **Checkmarx** step to the pipeline.
2. Set **Scan Mode** to **Ingestion**.
3. Set **Scan Configuration** to **Default**.
4. Configure **Name and Variant** as per the [Checkmarx scan configuration documentation](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference#name).
5. Set **Ingestion File** to the path of the SARIF scan results file stored in `/shared/scan_results/`.

For additional configurations, refer to the [Checkmarx scan configuration documentation](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference#name).

### Sample pipeline YAML

Here’s the sample pipeline YAML, which you can copy and use

```yaml
pipeline:
name: cx Ingest via docs
identifier: cx_Ingest_via_docs
projectIdentifier: Exploratory
orgIdentifier: SSCA
tags: {}
properties:
    ci:
    codebase:
        connectorRef: GITHUB_CONNECTOR
        repoName: https://github.com/OWASP/NodeGoat
        build: <+input>
stages:
    - stage:
        name: CheckmarxSCA
        identifier: checkmarxone
        type: CI
        spec:
        cloneCodebase: true
        execution:
            steps:
            - step:
                type: Action
                name: Checkmarx Scan GHA
                identifier: CxFlow
                spec:
                    uses: checkmarx-ts/checkmarx-cxflow-github-action@v1.6
                    with:
                    project: SampleProject
                    team: /CxServer/nzsouth
                    scanners: sca
                    checkmarx_url: <+secrets.getValue("my-checkmarx-url")>
                    checkmarx_username: zeronorth
                    checkmarx_password: <+secrets.getValue("my-checkmarx-password")>
                    checkmarx_client_secret: <+secrets.getValue("my-checkmarx-client-secret")>
                    sca_username: harness
                    sca_password: <+secrets.getValue("my-sca-passeword")>
                    sca_tenant: cxIntegrations
                    break_build: false
            - step:
                type: Checkmarx
                name: ingest-cmarx
                identifier: Checkmarx_1
                spec:
                    mode: ingestion
                    config: default
                    target:
                    type: repository
                    name: <+pipeline.name>
                    variant: dev
                    advanced:
                    log:
                        level: debug
                    runAsUser: "1001"
                    ingestion:
                    file: /shared/scan_results/
        platform:
            os: Linux
            arch: Amd64
        runtime:
            type: Cloud
            spec: {}
        sharedPaths:
            - /shared/scan_results/
        identifier: CheckmarxGitAction
        name: CheckmarxGitAction

```

