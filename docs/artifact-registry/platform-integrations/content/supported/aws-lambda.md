

### Workflow Overview
The following steps show how to deploy a generic artifact to AWS Lambda using Harness CD.

<Tabs>
<TabItem value="step" label="Step-by-Step">

### 1. Upload a Generic Artifact
1. Go to your [Generic Artifact Registry](/docs/artifact-registry/get-started/quickstart#generic).
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
5. Select your artifact from the registry. If the artifact isn't in the registry yet, you can write in the artifact name as well.
6. Enter the artifact tag or tag regex.
7. Save the service configuration.

### 3. Configure and Deploy Your CD Pipeline

For detailed instructions on configuring and deploying AWS Lambda functions with Harness CD, refer to:

- [AWS Lambda Deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments) - Complete guide to AWS Lambda deployment configuration
- [Serverless Lambda CD Quickstart](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart) - Step-by-step quickstart tutorial
- [AWS Lambda Tutorial](/docs/continuous-delivery/get-started/tutorials/aws-lambda) - End-to-end tutorial for AWS Lambda deployments

These guides cover pipeline creation, execution strategies, and deployment verification.

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
                        version: <version>
                        fileName: <file>
                        artifact: <artifact>
```
</TabItem>
</Tabs>