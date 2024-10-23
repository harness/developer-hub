---
title: Snyk IaC scanning
description: Use Harness STO to perform Snyk IaC scan
sidebar_position: 15
# redirect_from:
---

The Snyk step in Harness STO allows you to secure cloud infrastructure configurations. This document helps you to configure Snyk step in your pipeline to perform [Snyk IaC](https://docs.snyk.io/scan-using-snyk/snyk-iac) scanning either through orchestration or ingestion scan modes in STO.

- [**Orchestration mode**](#snyk-container-scan---orchestration-mode): In this mode, the Snyk step [runs the scan](/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto), then normalizes and deduplicates the results.
- [**Ingestion mode**](#snyk-container-scan---ingestion-mode): In this mode, the Snyk step [reads scan results](/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline) from a data file, normalizes the data, and deduplicates it.

Refer to the [Snyk step configuration](./snyk-scanner-reference) document to learn more about the fields in the Snyk step and how to configure them.


## Snyk IaC scan - Orchestration mode

To perform Snyk IaC scanning with orchestration scan mode, follow the below steps:

1. Search and add the **Snyk** step to your pipeline. You can use this step in **Build** stage or **Security** stage.
2. In the step configuration, set the following fields
    1. Set the [**Scan Mode**](./snyk-scanner-reference#scan-mode) to **Orchestration**
    2. Under [**Target**](./snyk-scanner-reference#target), set the **Type** to **Repository**
    3. Set the [**Scan Configuration**](./snyk-scanner-reference#scan-configuration) to **Snyk Infrastructure as Code**
    4. For [**Target and Variant Detection**](./snyk-scanner-reference#target-and-variant-detection) it's preferred to use **Auto** option or you can define them using the **Manual** option. 
    5. Under [**Authentication**](./snyk-scanner-reference#authentication), pass your Snyk API as Harness secret, for example: `<+secrets.getValue("snyk_api_account")>`

You can scan a specific file in your repository by entering its path in the **Workspace** field. Make sure to include the `/harness` prefix in the path. For example, if your file is located at `my_repo/src/main/file.tf`, enter `/harness/src/main/file.tf`

<DocImage path={require('./static/iac-orchestration.png')} width="40%" height="40%" title="Click to view full size image" />

Refer to [Snyk step configuration](./snyk-scanner-reference.md) document to learn more about all the fields and their configurations.

## Snyk IaC scan - Ingestion mode

To perform Snyk IaC scan with ingestion scan mode, you will need to have two steps:

1. **Run step**: Scan the configuration with Snyk CLI and save the results to a SARIF.
2. **Snyk step**: To ingest the scan results from the output.

<DocImage path={require('./static/iac-pipeline.png')} width="50%" height="50%" title="Click to view full size image" />

### Requirements

1. Configure your code repository in your stage, you can do it in the **Build** stage or **Security** stage
2. Go to the **Overview** tab of the stage. Under **Shared Paths**, enter the following path: `/shared/scan_results`, this will be the location where the Run step will save the scan results.


### Configure Run step

1. Add the **Run** step to the pipeline and open the step configuration.
2. In the **Container Registry** section, set your DockerHub connector. Snyk images will be pulled from their DockerHub account.
3. For **Image**, For **Image**, use `snyk/snyk:linux`
4. Set the **Shell** field to `sh`
5. In the **Command** field, enter the following command.

        ```
        snyk iac test --sarif --sarif-file-output=/shared/scan_results/snyk_iac.json /harness || true cat /shared/scan_results/snyk_iac.json
        ```
Snyk maintains a set of snykgoof repositories that you can use for testing your container-image scanning workflows.

6. In **Optional Configuration**, under **Environment Variables**, add a variable to access your Snyk API key: \
SNYK_TOKEN = `<+secrets.getValue("snyk_api_token")>`
7. In **Advanced** tab under **Failure Strategies**, set the Failure Strategy to **Mark as Success**. This step is required to ensure that the pipeline proceeds if Snyk finds a vulnerability. Otherwise, the build exits with an error code before STO can ingest the data.

<DocImage path={require('./static/iac-ingest-run-step.png')} width="50%" height="50%" title="Click to view full size image" />

### Configure Snyk step

1. Add the **Snyk** step and open the step configuration.
2. Set the [**Scan Mode**](./snyk-scanner-reference#scan-mode) to **Ingestion**.
3. Set the [**Target Type**](./snyk-scanner-reference#target) to **Repository**.
4. For [**Target and Variant Detection**](./snyk-scanner-reference#target-and-variant-detection), define them with the **Manual** option selected.
5. In the **Ingestion File** field, enter `/shared/scan_results/snyk_iac.sarif`
6. Apply your changes, save the configuration, and run the pipeline.

<DocImage path={require('./static/iac-ingest-snyk-step.png')} width="50%" height="50%" title="Click to view full size image" />

Refer to [Snyk step configuration](./snyk-scanner-reference.md) document to learn more about all the fields and their configurations.