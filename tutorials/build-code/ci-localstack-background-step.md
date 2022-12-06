---
sidebar_position: 2
description: This build automation guide walks you through running LocalStack as a Background step in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
---

# Run LocalStack as a Background Step

[Background steps](/docs/continuous-integration/ci-technical-reference/background-step-settings) are useful for running services that need to run for the entire lifetime of a Build stage. This tutorial shows how to run [LocalStack](https://localstack.cloud/) as a Background step in a Harness CI pipeline. LocalStack is software that emulates cloud services (such as AWS) when developing locally, or for testing in continuous integration pipelines.

## Create Your Pipeline

1. Create a new pipeline in Harness CI.
2. Click **Add Stage** and select **Build**. Give your stage a name, optionally configure the repository to be cloned, then click **Set Up Stage**.
3. Select "Cloud" in the **Infrastructure** tab.

### Add Background Step

This will run the LocalStack Docker image as a Background step in your pipeline.

1. In the **Execution** tab of your pipeline stage, click **Add Step**. The **Step Library** dialogue window should appear, select the **Background** step.
2. Enter "localstack" in the **Name** field.
3. Expand the **Additional Configuration** section, click the **Container Registry** field and either select an existing [Docker Hub](https://hub.docker.com/) connector, or create one.
4. Enter the desired LocalStack Docker image in the **Image** field (for example, `localstack/localstack:1.2.0`).
5. If you have a LocalStack API key, add a `LOCALSTACK_API_KEY` environment variable in the **Environment Variables** section.
6. Click **Apply Changes**.

### Add Step

This will add a step to ensure the LocalStack service is healthy. The step will run the `curl` command to poll the LocalStack service's `/health` endpoint until it returns successfully. This ensures that LocalStack is ready to receive traffic before the pipeline continues.

1. In the **Execution** tab of your pipeline stage, click **Add Step** then select **Run**.
2. Enter "localstack health" in the **Name** field.
3. Enter the following command in the **Command** field.
   ```
   until curl --fail --silent --max-time 1 http://localstack:4566/health; do sleep 2; done
   ```
4. Expand the **Optional Configuration** section, click the **Container Registry** field and select your Docker Hub connector.
5. Enter `curlimages/curl:7.83.1` in the **Images** field.
6. Click **Apply Changes**.

:::note

Notice that the `curl` command is able to reach the LocalStack service at `localstack:4566`. This is because both the service and step share the same Docker network.

:::

## Optional YAML Configuration

If you switch from **Visual** to **YAML** in the Pipeline Studio, your pipeline should look similar to this:

```yaml
pipeline:
  name: my_pipeline
  identifier: my_pipeline
  projectIdentifier: My_Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Stage 1
        identifier: Stage_1
        description: ""
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Background
                  name: localstack
                  identifier: localstack
                  spec:
                    connectorRef: docker_hub
                    image: localstack/localstack:1.2.0
                    shell: Sh
                    envVariables:
                      LOCALSTACK_API_KEY: <+secrets.getValue("localstack-api-key")>
              - step:
                  type: Run
                  name: localstack health
                  identifier: localstack_health
                  spec:
                    connectorRef: docker_hub
                    image: curlimages/curl:7.83.1
                    shell: Sh
                    command: until curl --fail --silent --max-time 1 http://localstack:4566/health; do sleep 2; done
```

## Run Your Pipeline

1. Click the **Save** button, then click **Run**.
2. Click **Run Pipeline** in the **Run Pipeline** dialogue window.
3. Observe your pipeline execution.
4. The `localstack` step logs should show a line similar to this:
   ```
   Running on https://0.0.0.0:4566 (CTRL + C to quit)
   Ready.
   ```
5. The `localstack health` step should complete successfully when the LocalStack service is healthy.
