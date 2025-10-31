---
title: Run a LocalStack service
description: Run LocalStack in a Background step in a Build stage.
sidebar_position: 30
redirect_from:
  - /tutorials/ci-pipelines/test/localstack
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/university/continuous-integration"
  closable={true}
  target="_self"
/>

In Harness CI, you use [Background steps](./background-step-settings) to [manage services](./dependency-mgmt-strategies) that need to run for the entire lifetime of a Build stage. To demonstrate how you can use Background steps, this topic explains how to run a [LocalStack](https://localstack.cloud/) Docker image in a Background step. LocalStack is software that emulates cloud services (such as AWS) when developing locally or testing in continuous integration pipelines.

## Add a Background step

1. Create a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a [LocalStack Auth Token](https://docs.localstack.cloud/getting-started/auth-token/). Make note of the secret's **ID**.
2. [Create a Harness CI pipeline](../prep-ci-pipeline-components), add a [Build stage](../set-up-build-infrastructure/ci-stage-settings), and select [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md#use-harness-cloud).

   You can [disable clone codebase](../codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages), because the pipeline created in this example doesn't need to pull any source code.

   This example uses Harness Cloud build infrastructure, but you can use Background steps with any build infrastructure.

3. Add a [Background step](./background-step-settings.md) configured as follows:

   * **Name:** Enter a name, such as `localstack`.
   * **Container Registry:** Select a Docker connector.
   * **Image:** Enter the name and tag of a LocalStack Docker image, such as `localstack/localstack:latest`.
     For information about LocalStack Community and LocalStack Pro Docker images, go to the [LocalStack documentation on Docker images](https://docs.localstack.cloud/references/docker-images/).
   * **Environment Variables:** Add a variable named `LOCALSTACK_API_KEY` and set the value to an expression referencing your LocalStack API key secret (such as `<+secrets.getValue("my-localstack-api-key")>`).

4. Select **Apply Changes** to save the Background step.

## Add a health check

Harness recommends adding health checks for Background steps. This example runs a cURL command to poll the LocalStack service's `/health` endpoint until it returns a successful response. This ensures that LocalStack is ready to receive traffic before the pipeline continues.

In your pipeline's Build stage, after the Background step, add a [Run step](../run-step-settings) configured as follows:

* **Name:** Enter a name, such as `localstack health`.
* **Container Registry:** Select a Docker connector.
* **Image:** Enter a curl image and tag, such as `curlimages/curl:7.83.1`.
* **Command:** Enter the following:

```
until curl --fail --silent --max-time 1 http://localstack:4566/health; do sleep 2; done
```

This cURL command can reach the LocalStack service at `localstack:4566` because both the Background step and Run step share the same Docker network in a Harness CI Build stage.

## Run the pipeline

Save the pipeline, select **Run**, and then select **Run Pipeline**.

While the build runs, you can observe the logs. The LocalStack Background step should have logs like:

```
Running on https://0.0.0.0:4566 (CTRL + C to quit)
Ready.
```

The health check Run step should complete successfully once the LocalStack service is healthy.

## YAML example

Here's the YAML for the pipeline created in this topic. A complete Harness CI pipeline would have additional steps after the Run step that build code, run tests, push images, and so on. Some or all of these steps might interact with the LocalStack service running in the background.

```yaml
pipeline:
  name: my_pipeline
  identifier: my_pipeline
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: false ## Clone codebase is disabled for this example.
          runtime: ## This stage runs on a Linux platform on Harness Cloud build infrastructure.
            type: Cloud
            spec: {}
          platform:
            os: Linux
            arch: Amd64
          execution:
            steps:
              - step: ## Background step runs the LocalStack Docker image.
                  type: Background
                  name: localstack
                  identifier: localstack
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: localstack/localstack:latest
                    shell: Sh
                    envVariables:
                      LOCALSTACK_API_KEY: <+secrets.getValue("localstack-api-key")>
              - step: ## Run step checks that the LocalStack service is ready to receive traffic.
                  type: Run
                  name: localstack health
                  identifier: localstack_health
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: curlimages/curl:7.83.1
                    shell: Sh
                    command: until curl --fail --silent --max-time 1 http://localstack:4566/health; do sleep 2; done
```
