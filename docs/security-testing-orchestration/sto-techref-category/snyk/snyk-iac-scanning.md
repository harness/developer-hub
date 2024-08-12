---
title: Snyk IaC scanning
description: Use Harness STO to perform Snyk IaC scan
sidebar_position: 15
# redirect_from:
---

The Snyk step in Harness STO allows you to secure cloud infrastructure configurations. You can use STO to perform [Snyk IaC](https://docs.snyk.io/scan-using-snyk/snyk-iac) scanning either through orchestration or ingestion scan modes in STO.


## Snyk IaC scan - Orchestration mode

To perform Snyk IaC scanning with orchestration scan mode, follow the below steps:

1. Search and add the **Snyk** step to your pipeline. You can use this step in Build stage or security stage.
2. In the step configuration, set the following fields
    1. Set the **Scan Mode** to **Orchestration**
    2. Set the **Scan Configuration to **Snyk Container**
    3. Set the **Target type** to **Repository**
    4. Define the target and variant - Auto/Manual.
    5. Under **Authentication**, pass your Snyk API as Harness secret, for example: `<+secrets.getValue("snyk_api_account")>`

You can scan a specific file in your repository by entering its path in the **Workspace** field. Make sure to include the `/harness` prefix in the path. For example, if your file is located at `my_repo/src/main/file.tf`, enter `/harness/src/main/file.tf`

<DocImage path={require('./static/iac-orchestration.png')} width="40%" height="40%" title="Click to view full size image" />

## Snyk IaC scan - Ingestion mode

To perform Snyk IaC scan with ingestion scan mode, you will need to have two steps:

1. Run step: Scan the configuration with Snyk CLI and save the results to a SARIF.
2. Snyk step: To ingest the scan results from the output.

<DocImage path={require('./static/iac-pipeline.png')} width="50%" height="50%" title="Click to view full size image" />

### Requirements

1. Configure your code repository in your stage, you can do it in the **Build** stage or **Security** stage
2. Go to the **Overview** tab of the stage. Under **Shared Paths**, enter the following path: `/shared/scan_results`, this will be the location where the Run step will save the scan results.


### Configure Run step

1. Add the Run step to the pipeline and open the step configuration.
2. In the **Container Registry** section, set your DockerHub connector. Snyk images will be pulled from their DockerHub account.
3. For **Image**, use use a supported [Snyk image](https://hub.docker.com/r/snyk/snyk) based on the type of code in your codebase
4. Set the **Shell** field to `sh`
5. In the **Command** filed, enter the following command.

        ```

        snyk iac test --sarif --sarif-file-output=/shared/scan_results/snyk_iac.json /harness || true cat /shared/scan_results/snyk_iac.json

        ```
Snyk maintains a set of snykgoof repositories that you can use for testing your container-image scanning workflows.

6. In Optional Configuraiton, under Environment Variables, add a variable to access your Snyk API key: \
SNYK_TOKEN = `<+secrets.getValue("snyk_api_token")>`
7. In **Advanced** tab under **Failure Strategies**, set the Failure Strategy to **Mark as Success**. This step is required to ensure that the pipeline proceeds if Snyk finds a vulnerability. Otherwise, the build exits with an error code before STO can ingest the data.

<DocImage path={require('./static/iac-ingest-run-step.png')} width="50%" height="50%" title="Click to view full size image" />

### Configure Snyk step

1. Add the Snyk step and open the step configuration.
2. Set the **Scan Mode** to **Ingestion**.
3. Set the **Target Type** to **Repository**.
4. Define the **Target Name** and **Variant**.
5. In the **Ingestion File** field, enter `/shared/scan_results/snyk_iac.sarif`
6. Apply your changes, save the configuration, and run the pipeline.

<DocImage path={require('./static/iac-ingest-snyk-step.png')} width="50%" height="50%" title="Click to view full size image" />