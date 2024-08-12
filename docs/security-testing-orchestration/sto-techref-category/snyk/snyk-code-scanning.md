---
title: Snyk Code scanning
description: Use Harness STO to perform Snyk Code scan
sidebar_position: 15
# redirect_from:
---

The Snyk step in Harness STO allows you to scan your code for security vulnerabilities using source code analysis. You can use STO to perform [Snyk Code](https://docs.snyk.io/scan-using-snyk/snyk-code) scanning either through orchestration or ingestion scan modes in STO.


## Snyk Code scan - Orchestration mode

To perform Snyk Code scanning with orchestration scan mode, follow the below steps:

1. Search and add the **Snyk** step to your pipeline. You can use this step in Build stage or security stage.
2. In the step configuration, set the following fields
    1. Set the **Scan Mode** to **Orchestration**
    2. **Scan Configuration** to **SnykOpen Source**
    3. Under Target, set the **Type** to **Repository**
    4. Define the target and variant details
    5. Under **Authentication**, pass your Snyk API as Harness secret, for example: `<+secrets.getValue("snyk_api_account")>`


    <DocImage path={require('./static/code-orchestration.png')} width="40%" height="40%" title="Click to view full size image" />

## Snyk Code scan - Ingestion mode

To perform Snyk Code scan with ingestion scan mode, you will need to have two steps:

1. Run step: Scan the repository with Snyk CLI and save the output to a shared folder. You can also install the dependencies if required.
2. Snyk step: To ingest the scan results from the output.


<DocImage path={require('./static/code-ingestion-pipeline.png')} width="50%" height="50%" title="Click to view full size image" />

### Requirements

1. Configure your code repository in your stage, you can do it in the **Build** stage or **Security** stage
2. Go to the **Overview** tab of the stage. Under **Shared Paths**, enter the following path: `/shared/scan_results`, this will be the location where the Run step will save the scan results.


### Configure Run step
1. Add the Run step to the pipeline and open the step configuration.
2. In the **Container Registry** section, set your DockerHub connector. Snyk images will be pulled from their DockerHub account.
3. For **Image**, select the appropriate [Snyk image](https://hub.docker.com/r/snyk/snyk) based on your codebase. For example, use `snyk/snyk:node` for a Node.js project.
4. Set the **Shell** field to `sh`
5. In the **Command** filed, enter the following command.

        ```
        snyk code test \ --file=SubSolution.sln  \ --sarif-file-output=/shared/scan_results/snyk_scan_results.sarif || true
        ```

6. In Optional Configuraiton, under Environment Variables, add a variable to access your Snyk API key: \
SNYK_TOKEN = `<+secrets.getValue("snyk_api_token")>`
7. In **Advanced** tab under **Failure Strategies**, set the Failure Strategy to **Mark as Success**. This step is required to ensure that the pipeline proceeds if Snyk finds a vulnerability. Otherwise, the build exits with an error code before STO can ingest the data.

<DocImage path={require('./static/code-run-step.png')} width="50%" height="50%" title="Click to view full size image" />

### Configure Snyk step

1. Add the Snyk step and open the step configuration.
2. Set the **Scan Mode** to **Ingestion**.
3. Set the **Target Type** to **Repository**.
4. Define the **Target Name** and **Variant**.
5. In the **Ingestion File** field, enter `/shared/scan_results/snyk_scan_results.sarif`.
6. Apply your changes, save the configuration, and run the pipeline.

<DocImage path={require('./static/code-ingest-snyk-step.png')} width="50%" height="50%" title="Click to view full size image" />
