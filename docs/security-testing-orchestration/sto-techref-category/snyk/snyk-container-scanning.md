---
title: Snyk Container scanning
description: Use Harness STO to perform Snyk Container scan
sidebar_position: 15
# redirect_from:
---

The Snyk step in Harness STO allows you to find and fix vulnerabilities in container images, based on container registry scans. You can use STO to perform [Snyk Container](https://docs.snyk.io/scan-using-snyk/snyk-container) scanning either through orchestration or ingestion scan modes in STO.

## Snyk Container scan - Orchestration mode

To perform Snyk Container scanning with orchestration scan mode, follow the below steps:

1. Search and add the **Snyk** step to your pipeline. You can use this step in Build stage or security stage.
2. In the step configuration, set the following fields
    1. Set the **Scan Mode** to **Orchestration**
    2. Under Target, set the **Type** to **Container**
    3. **Scan Configuration** to **Snyk Container**
    4. Define the target and variant
    5. Under **Container Image** section, set the **Type**, **Domain**, **Name**, and **Tag** of your image
    5. Under **Authentication**, pass your Snyk API as Harness secret, for example: `<+secrets.getValue("snyk_api_account")>`

    <DocImage path={require('./static/container-orchestration.png')} width="40%" height="40%" title="Click to view full size image" />

## Snyk Container scan - Ingestion mode

To perform Snyk Container scan with ingestion scan mode, you will need to have two steps:

1. Run step: Scan the container with Snyk CLI and save the results to a SARIF.
2. Snyk step: To ingest the scan results from the output.

<DocImage path={require('./static/container-pipeline.png')} width="50%" height="50%" title="Click to view full size image" />=

### Requirements

Go to the **Overview** tab of the stage. Under **Shared Paths**, enter the following path: `/shared/scan_results`, this will be the location where the Run step will save the scan results.


### Configure Run step

1. Add the Run step to the pipeline and open the step configuration.
2. In the **Container Registry** section, set your DockerHub connector. Snyk images will be pulled from their DockerHub account.
3. For **Image**, use `snyk/snyk:docker`
4. Set the **Shell** field to `sh`
5. In the **Command** filed, enter the following command.

        ```
        snyk container test \ snykgoof/big-goof-1g:100 -d \ --sarif-file-output=/shared/scan_results/snyk_container_scan.sarif  || true
        ``` 
Snyk maintains a set of snykgoof repositories that you can use for testing your container-image scanning workflows.

6. In Optional Configuraiton, under Environment Variables, add a variable to access your Snyk API key: \
SNYK_TOKEN = `<secrets.getValue("snyk_api_token")>`
7. In **Advanced** tab under **Failure Strategies**, set the Failure Strategy to **Mark as Success**. This step is required to ensure that the pipeline proceeds if Snyk finds a vulnerability. Otherwise, the build exits with an error code before STO can ingest the data.

<DocImage path={require('./static/container-ingest-run-step.png')} width="50%" height="50%" title="Click to view full size image" />=

### Configure Snyk step



1. Add the Snyk step and open the step configuration.
2. Set the **Scan Mode** to **Ingestion**.
3. Set the **Target Type** to **Container**.
4. Define the **Target Name** and **Variant**.
5. In the **Ingestion File** field, enter `/shared/scan_results/snyk_container_scan.sarif`
6. Apply your changes, save the configuration, and run the pipeline.


<DocImage path={require('./static/container-ingest-snyk-step.png')} width="50%" height="50%" title="Click to view full size image" />=