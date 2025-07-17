---
title: Artifact Registry and Continuous Delivery
description: Deep dive into the native integrations between the Artifact Registry and Continuous Delivery module.
sidebar_position: 10
sidebar_label: Continuous Delivery
---

Learn how to use Artifact Registry with the Continuous Delivery (CD) module to simplify artifact management, ensure traceability, and streamline deployments—especially for use cases like deploying generic artifacts to serverless platforms.

:::info Why Integrate Artifact Registry with Continuous Delivery?
Integrating Harness Artifact Registry (HAR) with CD enables you to:
- Store and version deployment artifacts in a central, secure location.
- Deploy generic artifacts to serverless platforms like AWS Lambda.
- Maintain traceability from artifact creation to deployment.
- Simplify management of deployment assets across environments.
:::

## Supported CD Steps
Artifact Registry is supported as a native artifact source in select CD steps. Currently supported:
- **AWS Lambda**.
<!-- Placeholder: More supported CD steps will be added here as they become available. -->

## Workflow Overview
The following steps show how to deploy a generic artifact to AWS Lambda using Harness CD.

<Tabs>
<TabItem value="interactive" label="Interactive Guide">

**Coming soon:**  
An interactive guide will be available for this process.

</TabItem>
<TabItem value="step" label="Step-by-Step">

### 1. Upload a Generic Artifact
1. Go to your [Generic Artifact Registry](/docs/artifact-registry/supported-formats#generic).
2. Click **Upload Artifact**.
3. Select your function file (e.g., ZIP or JAR) and upload it to the registry.
4. Note the artifact name and version for later reference.

### 2. Create or Configure a Service
Follow the [Service Creation guide](/docs/continuous-delivery/x-platform-cd-features/services/create-services).

#### Integrated Artifact Sources
Artifact Registry is a [native artifact source](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) for [CD services](/docs/continuous-delivery/x-platform-cd-features/services/services-overview).

When creating a service, follow these steps to add a Harness Artifact Registry as your artifact source:

1. Under **Artifacts**, click **+ Add Artifact Source**.
2. Choose **Harness Artifact Registry** as your repository type.
3. Enter any name you would like under **Artifact Source Identifier**.
4. Choose your **Registry**.
5. Select your image from the registry. If the image isn't in the registry yet, you can write in the image name as well.
6. Enter the image tag or tag regex.
7. Optionally, choose the image digest for the specific image/tag combo that you chose.
8. Save the service configuration.

### 3. Configure Your CD Pipeline
1. Create or open a CD pipeline.
2. Add the service you configured earlier.
3. Select the target **environment** for deployment.
4. In the **Execution** section, add the **Deploy AWS Lambda** step.
5. Fill in the required fields, referencing the uploaded artifact.
6. Save and run the pipeline.

### 4. Run and Review the Pipeline Execution
1. Monitor the pipeline execution.
2. In **Service logs**, verify the artifact details used for deployment.
3. In the **Deploy AWS Lambda** step logs, confirm the artifact is downloaded and the deployment succeeds.

</TabItem>
<TabItem value="yaml" label="YAML">

```yaml
# Example Harness CD pipeline YAML using Artifact Registry and AWS Lambda
pipeline:
  name: Deploy Generic Artifact to Lambda
  identifier: deploy_generic_artifact_to_lambda
  stages:
    - stage:
        name: Deploy to Lambda
        identifier: deploy_to_lambda
        type: Deployment
        spec:
          service:
            serviceRef: <your_service_identifier>
          environment:
            environmentRef: <your_environment_identifier>
          execution:
            steps:
              - step:
                  type: AwsLambdaDeploy
                  name: Deploy AWS Lambda
                  identifier: deploy_aws_lambda
                  spec:
                    connectorRef: <your_connector_ref>
                    region: <aws_region>
                    functionName: <lambda_function_name>
                    artifact:
                      type: Harness
                      spec:
                        connectorRef: <artifact_registry_connector>
                        imagePath: <artifact_path>
                        tag: <artifact_tag>
```
</TabItem>
</Tabs>
