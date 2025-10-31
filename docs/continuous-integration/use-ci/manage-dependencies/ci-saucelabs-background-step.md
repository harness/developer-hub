---
title: Run a Sauce Connect Proxy service
description: Run Sauce Connect Proxy in a Background step in a Build stage.
sidebar_position: 31
redirect_from:
  - /tutorials/ci-pipelines/test/saucelabs-proxy
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/university/continuous-integration"
  closable={true}
  target="_self"
/>

In Harness CI, you use [Background steps](./background-step-settings) to [manage services](./dependency-mgmt-strategies) that need to run for the entire lifetime of a Build stage. To demonstrate how you can use Background steps, this topic explains how to run [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect/) in a Background step. [Sauce Labs](https://saucelabs.com/) is a web and mobile application automated testing platform. Sauce Connect Proxy can run as a Background step in your Harness CI pipeline, and act as a proxy server between a Sauce Labs infrastructure and your CI pipeline.

## Add a Background step

1. Create a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a [Sauce Labs Access Key](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/environment-variables/#user-credentials-environment-variables). Make note of the secret's **ID**.
2. [Create a Harness CI pipeline](../prep-ci-pipeline-components) and add a [Build stage](../set-up-build-infrastructure/ci-stage-settings).

   You can [disable clone codebase](../codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages), because the pipeline created in this example doesn't need to pull any source code.

3. You can use Background steps with any build infrastructure. To follow along with this example, use either [Harness Cloud build infrastructure](../set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md#use-harness-cloud) or a [Kubernetes cluster build infrastructure](../set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure).
4. Add a [Background step](./background-step-settings.md) configured as follows:

   * **Name:** Enter a name, such as `sauce_connect`.
   * **Container Registry:** Select a Docker connector.
   * **Image:** Enter the name and tag of a Sauce Connect Docker image, such as `saucelabs/sauce-connect:latest`.
   * **Environment Variables:** Add two environment variables for your Sauce Labs credentials:
      * `SAUCE_USERNAME: YOUR_SAUCE_LABS_USERNAME`
      * `SAUCE_ACCESS_KEY: <+secrets.getValue('YOUR_SAUCE_ACCESS_KEY_SECRET_ID')>`
   * **Port Bindings:** If you chose Harness Cloud build infrastructure, add port bindings `"8032": "8032"`. For more information, go to [Background step settings - Port bindings](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#port-bindings).

5. Select **Apply Changes** to save the Background step.

## Add a health check

Harness recommends adding health checks for Background steps. This example runs a cURL command to poll the `readiness` of the Sauce Connect service until it returns a successful response. This ensures that Sauce Connect is ready to receive traffic before the pipeline continues.

In your pipeline's Build stage, after the Background step, add a [Run step](../run-step-settings) configured as follows:

* **Name**: Enter a name, such as `wait for SC`.
* **Container Registry** and **Image**: With a Kubernetes cluster build infrastructure, select a Docker connector and enter the image `curlimages/curl:7.83.1`. With Harness Cloud, these are not required because Harness Cloud runners already have the required cURL binary.
* **Shell**: Select **Bash**
* **Command:** Enter the following:

```
until [ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8032/readiness)" == "200" ]
do
  sleep 2
done
echo "SC ready"
```

## Run the pipeline

Save the pipeline, select **Run**, and then select **Run Pipeline**.

While the build runs, you can observe the logs. When Sauce Connect is ready, the health check step prints `SC ready`.

## YAML example

Here's the YAML for the Build stage created in this topic. A complete Harness CI pipeline would have additional steps after the Run step that build code, run tests, push images, and so on. Some or all of these steps might interact with the Sauce Labs Proxy service running in the background.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="hosted" label="Harness Cloud" default>

```yaml
stages:
  - stage:
      name: build
      identifier: build
      description: ""
      type: CI
      spec:
        cloneCodebase: false ## Clone codebase is disabled for this example.
        platform: ## This stage uses Harness Cloud build infrastructure.
          os: Linux
          arch: Amd64
        runtime:
          type: Cloud
          spec: {}
        execution:
          steps:
            - step: ## Background step runs the Sauce Connect Docker image.
                type: Background
                name: Sauce Connect
                identifier: Sauce_Connect
                spec:
                  connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                  image: saucelabs/sauce-connect
                  shell: Sh
                  envVariables:
                    SAUCE_USERNAME: YOUR_SAUCE_LABS_USERNAME
                    SAUCE_ACCESS_KEY: <+secrets.getValue('Sauce_Access_Key')>
                  portBindings:
                    "8032": "8032"
            - step: ## Run step checks that Sauce Connect is healthy before allowing other steps to run.
                type: Run
                name: Wait for SC
                identifier: Wait_for_SC
                spec:
                  shell: Bash
                  command: |-
                    until [ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8032/readiness)" == "200" ]
                    do
                      sleep 2
                    done
                    echo "SC ready"
```

</TabItem>
<TabItem value="kubernetes" label="Kubernetes cluster">

```yaml
stages:
  - stage:
      name: build
      identifier: build
      description: ""
      type: CI
      spec:
        cloneCodebase: false ## Clone codebase is disabled for this example.
        infrastructure: ## This pipeline uses a Kubernetes cluster build infrastructure
          type: KubernetesDirect
          spec:
            connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR
            namespace: YOUR_KUBERNETES_NAMESPACE
            automountServiceAccountToken: true
            nodeSelector: {}
            os: Linux
        execution:
          steps:
            - step: ## Background step runs the Sauce Connect Docker image.
                type: Background
                name: Sauce Connect
                identifier: Sauce_Connect
                spec:
                  connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                  image: saucelabs/sauce-connect
                  shell: Sh
                  envVariables:
                    SAUCE_USERNAME: YOUR_SAUCE_LABS_USERNAME
                    SAUCE_ACCESS_KEY: <+secrets.getValue('Sauce_Access_Key')>
            - step: ## Run step checks that Sauce Connect is healthy before allowing other steps to run.
                type: Run
                name: Wait for SC
                identifier: Wait_for_SC
                spec:
                  connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                  image: curlimages/curl:7.83.1
                  shell: Sh
                  command: |-
                    until [ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8032/readiness)" == "200" ]
                    do
                      sleep 2
                    done
                    echo "SC ready"
```

</TabItem>
</Tabs>
