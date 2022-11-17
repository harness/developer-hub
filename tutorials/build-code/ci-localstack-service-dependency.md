---
sidebar_position: 2
description: This build automation guide walks you through running LocalStack as a Service Dependency in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
---

# Run LocalStack as a Service Dependency

A Service Dependency is a detached service that is accessible to all Steps in a Stage. This tutorial shows how to run [LocalStack](https://localstack.cloud/) as a Service Dependency in a Harness CI pipeline. LocalStack is software that emulates cloud services (such as AWS) when developing locally, or for testing in continuous integration pipelines.

## Create Your Pipeline

1. Create a new pipeline in Harness CI.
2. Click **Add Stage** and select **Build**. Give your stage a name, optionally configure the repository to be cloned, then click **Set Up Stage**.
3. Select "Cloud" in the **Infrastructure** tab.

### Add Service Dependency

This will run the LocalStack Docker image as a Service Dependency in your pipeline.

1. In the **Execution** tab of your pipeline stage, click **Add Service Dependency**, the **Configure Service Dependency** dialogue window should appear.
2. Enter "localstack" in the **Dependency Name** field.
3. Click the **Container Registry** field and either select an existing [Docker Hub](https://hub.docker.com/) connector, or create one.
4. Enter the desired LocalStack Docker image in the **Image** field (for example, `localstack/localstack:1.2.0`).
5. If you have a LocalStack API key, expand the **Optional Configuration** section and add an environment variable named `LOCALSTACK_API_KEY`.
6. Click **Apply Changes**.

:::note

Notice that the `curl` command is able to reach the LocalStack service at `localstack:4566`. This is because both the service and step share the same Docker network.

:::

### Add Step

This will add a step to ensure the LocalStack service is healthy. The step will run the `curl` command to poll the LocalStack service's `/health` endpoint until it returns successfully. This ensures that LocalStack is ready to receive traffic before the pipeline continues.

1. In the **Execution** tab of your pipeline stage, click **Add Step** then select **Run**.
2. Enter "localstack health" in the **Name** field.
3. Click the **Container Registry** field and select your Docker Hub connector.
4. Enter `curlimages/curl:7.83.1` in the **Images** field.
5. Enter the following command in the **Command** field.
   ```
   until curl --fail --silent --max-time 1 http://localstack:4566/health; do sleep 2; done
   ```
6. Click **Apply Changes**.

## Optional YAML Configuration

If you switch from **Visual** to **YAML** in the Pipeline Studio, your pipeline should look similar to this:
```yaml
  stages:
    - stage:
        name: my_stage
        type: CI
        spec:
          serviceDependencies:
            - identifier: localstack
              name: localstack
              type: Service
              spec:
                connectorRef: my_connector
                image: localstack/localstack:1.2.0
                envVariables:
                  LOCALSTACK_API_KEY: <+secrets.getValue("localstack-api-key")>
          execution:
            steps:
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
4. The `localstack` Service Dependency logs should show output similar to this:
   ```
   INFO --- [  Thread-110] hypercorn.error            : Running on https://0.0.0.0:4566 (CTRL + C to quit)
   Ready.
   ```
5. The `localstack health` step should complete successfully when the LocalStack service is healthy.