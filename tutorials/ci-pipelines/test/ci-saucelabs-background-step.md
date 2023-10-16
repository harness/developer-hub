---
title: Run Sauce Connect Proxy
sidebar_position: 3
description: This build automation guide walks you through running Sauce Connect Proxy as a Background step in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/test/saucelabs-proxy
---

# Run Sauce Connect Proxy as a Background Step

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

[Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) are useful for running services that need to run for the entire lifetime of a Build stage. This tutorial shows how to run [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect/) as a Background step in a Harness CI pipeline.

[Sauce Labs](https://saucelabs.com/) is a web and mobile application automated testing platform. Sauce Connect Proxy can run as a Background step in your Harness CI pipeline, and act as a proxy server between a Sauce Labs infrastructure and your CI pipeline.

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## Create your pipeline

### Docker Hub connector

You need a [Docker Hub](https://hub.docker.com/) connector. In this example, the connector is used to authenticate to pull Docker images from Docker Hub.

If you have not created a Docker Hub connector yet, follow these steps.

<details><summary>Create connector</summary>
<p>

```mdx-code-block
import DockerHubConnector from '/tutorials/shared/dockerhub-connector-includes.md';
```

<DockerHubConnector />

</p>
</details>

:::info

This connector needs an access token with **Read-only** permissions.

:::

### Create secret

1. From the left pane, expand the **Project Setup** menu, and then select **Secrets**.
2. Select **+ New Secret**, then select **Text**.
3. In the **Secret Name** field, enter **Sauce Access Key**.
4. In the **Secret Value** field, enter your Sauce Labs access key, then click **Save**.

### Modify the pipeline

1. From the left pane, select **Pipelines**, then select **+ Create a Pipeline**.
2. In the **Name** field, enter a name for your pipeline, then select **Start**.
3. Switch from the **Visual** view to the **YAML** view, and then select **Edit YAML**.

Append the following configuration:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="cloud"
    values={[
        {label: 'Cloud', value: 'cloud'},
        {label: 'Kubernetes', value: 'kubernetes'},
    ]}>
<TabItem value="cloud">
```

**Cloud** pipelines run in managed infrastructure provided by Harness.

```yaml
  variables:
    - name: SAUCELABS_USERNAME
      type: String
      description: Your Sauce Labs username
      value: <+input>
  stages:
    - stage:
        name: Sauce Connect
        identifier: Sauce_Connect
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
                  name: Sauce Connect
                  identifier: Sauce_Connect
                  spec:
                    connectorRef: Docker_Hub
                    image: saucelabs/sauce-connect
                    shell: Sh
                    envVariables:
                      SAUCE_USERNAME: <+pipeline.variables.SAUCELABS_USERNAME>
                      SAUCE_ACCESS_KEY: <+secrets.getValue('Sauce_Access_Key')>
                    portBindings:
                      "8032": "8032"
              - step:
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

```mdx-code-block
</TabItem>

<TabItem value="kubernetes">
```

**Kubernetes** pipelines run in a Kubernetes cluster that you manage. Kubernetes pipelines are an enterprise feature.

```yaml
  variables:
    - name: KUBERNETES_NAMESPACE
      type: String
      description: Kubernetes namespace where steps will run
      value: <+input>
    - name: SAUCELABS_USERNAME
      type: String
      description: Your Sauce Labs username
      value: <+input>
  stages:
    - stage:
        name: Sauce Connect
        identifier: Sauce_Connect
        description: ""
        type: CI
        spec:
          cloneCodebase: false
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: Kubernetes_Connector
              namespace: <+pipeline.variables.KUBERNETES_NAMESPACE>
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - step:
                  type: Background
                  name: Sauce Connect
                  identifier: Sauce_Connect
                  spec:
                    connectorRef: Docker_Hub
                    image: saucelabs/sauce-connect
                    shell: Sh
                    envVariables:
                      SAUCE_USERNAME: <+pipeline.variables.SAUCELABS_USERNAME>
                      SAUCE_ACCESS_KEY: <+secrets.getValue('Sauce_Access_Key')>
              - step:
                  type: Run
                  name: Wait for SC
                  identifier: Wait_for_SC
                  spec:
                    connectorRef: Docker_Hub
                    image: curlimages/curl:7.83.1
                    shell: Sh
                    command: |-
                      until [ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8032/readiness)" == "200" ]
                      do
                        sleep 2
                      done
                      echo "SC ready"
```

:::info

Replace `Kubernetes_Connector` with your Kubernetes cluster connector ID.

:::

```mdx-code-block
</TabItem>
</Tabs>
```

:::info

This configuration requires the Docker Hub connector ID to be `Docker_Hub`. If your connector ID is different, replace `Docker_Hub` with the correct ID.

:::

Select **Save** in the YAML editor.

## Run your pipeline

1. In the **Pipeline Studio**, select **Run**.
2. Enter your Sauce Labs username in the `SAUCELABS_USERNAME` field. If you created a Kubernetes pipeline, enter the namespace in the `KUBERNETES_NAMESPACE` field.
3. Select **Run Pipeline**.
4. Observe each step of the pipeline execution. When Sauce Connect is ready, the **Wait for SC** step will print `SC ready`.
