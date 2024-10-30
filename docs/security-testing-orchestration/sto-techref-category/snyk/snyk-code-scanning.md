---
title: Snyk Code scanning
description: Use Harness STO to perform Snyk Code scan
sidebar_position: 15
# redirect_from:
---

The Snyk step in Harness STO allows you to scan your code for security vulnerabilities using source code analysis. This document helps you to configure the Snyk step in your pipeline to perform [Snyk Code](https://docs.snyk.io/scan-using-snyk/snyk-code) scanning either through orchestration or ingestion scan modes in STO.

- [**Orchestration mode**](#snyk-code-scan---orchestration-mode): In this mode, the Snyk step [runs the scan](/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto), then normalizes and deduplicates the results.
- [**Ingestion mode**](#snyk-code-scan---ingestion-mode): In this mode, the Snyk step [reads scan results](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline) from a data file, normalizes the data, and deduplicates it.

Refer to the [Snyk step configuration](./snyk-scanner-reference) document to learn more about the fields in the Snyk step and how to configure them.


## Snyk Code scan - Orchestration mode
To perform Snyk Code scanning with orchestration scan mode, follow the below steps:

1. Search and add the **Snyk** step to your pipeline. You can use this step in **Build** stage or **Security** stage.
2. In the step configuration, set the following fields
    1. Set the [**Scan Mode**](./snyk-scanner-reference#scan-mode) to **Orchestration**
    2. Under [**Target**](./snyk-scanner-reference#target), set the **Type** to **Repository**
    3. Set the [**Scan Configuration**](./snyk-scanner-reference#scan-configuration) to **Snyk Code**
    3. For [**Target and Variant Detection**](./snyk-scanner-reference#target-and-variant-detection) it's preferred to use **Auto** option or you can define them using the **Manual** option.
    5. Under [**Authentication**](./snyk-scanner-reference#authentication), pass your Snyk API as Harness secret, for example: `<+secrets.getValue("snyk_api_token")>`


    <DocImage path={require('./static/code-orchestration.png')} width="40%" height="40%" title="Click to view full size image" />

Refer to [Snyk step configuration](./snyk-scanner-reference.md) document to learn more about all the fields and their configurations.

## Snyk Code scan - Ingestion mode

In the Ingestion scan mode, the Snyk step reads data from a file, normalizes it, and deduplicates it. To perform a Snyk Code scan using the Ingestion scan mode, we will use two steps:

1. **Run step**: Scan the repository with Snyk CLI and save the output to a shared folder.
2. **Snyk step**: To ingest the scan results from the output.


<DocImage path={require('./static/code-ingestion-pipeline.png')} width="50%" height="50%" title="Click to view full size image" />

### Requirements

1. Configure your code repository in your stage, you can do it in the **Build** stage or **Security** stage
2. Go to the **Overview** tab of the stage. Under **Shared Paths**, enter the following path: `/shared/scan_results`. This will be the location where the Run step will save the scan results.


### Configure Run step
1. Add the **Run** step to the pipeline and open the step configuration.
2. In the **Container Registry** section, set your DockerHub connector. Snyk images will be pulled from their DockerHub account.
3. For **Image**, use a supported [Snyk image](https://hub.docker.com/r/snyk/snyk) based on your project type and language. For example, use `snyk/snyk:node` for a Node.js project.
4. Set the **Shell** field to `sh`
5. In the **Command** field, enter the following command.

        ```
        snyk code test \ --file=SubSolution.sln  \ --sarif-file-output=/shared/scan_results/snyk_scan_results.sarif || true
        ```

6. In **Optional Configuration**, under **Environment Variables**, add a variable to access your Snyk API key: \
SNYK_TOKEN = `<+secrets.getValue("snyk_api_token")>`
7. In **Advanced** tab under **Failure Strategies**, set the Failure Strategy to **Mark as Success**. This step is required to ensure that the pipeline proceeds if Snyk finds a vulnerability. Otherwise, the build exits with an error code before STO can ingest the data.

<DocImage path={require('./static/code-run-step.png')} width="50%" height="50%" title="Click to view full size image" />

### Configure Snyk step

1. Add the **Snyk** step and open the step configuration.
2. Set the [**Scan Mode**](./snyk-scanner-reference#scan-mode) to **Ingestion**.
3. Set the [**Target Type**](./snyk-scanner-reference#target) to **Repository**.
4. For [**Target and Variant Detection**](./snyk-scanner-reference#target-and-variant-detection) define them with the **Manual** option selected.
5. In the **Ingestion File** field, enter `/shared/scan_results/snyk_scan_results.sarif`.
6. Apply your changes, save the configuration, and run the pipeline.

<DocImage path={require('./static/code-ingest-snyk-step.png')} width="50%" height="50%" title="Click to view full size image" />

Refer to [Snyk step configuration](./snyk-scanner-reference.md) document to learn more about all the fields and their configurations.
