---
title: Troubleshoot CI
description: Troubleshoot common CI issues.
sidebar_position: 10
helpdocs_topic_id: jx7ew69ypa
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Kubevict from '/docs/continuous-integration/shared/k8s-pod-eviction-trbs.md';
import Dhrl from '/docs/continuous-integration/shared/docker-hub-rate-limiting-trbs.md';
import DindTrbs from '/docs/continuous-integration/shared/dind-bg-gha-trbs.md';
```

This topic contains troubleshooting information for error messages and other issues that can arise with Harness CI. For more Harness troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

:::tip Troubleshooting tools

[AIDA](./aida.md) and [debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode.md) can help you troubleshoot errors and other issues in Harness CI.

:::

If you cannot find a resolution, please contact [Harness Support](mailto:support@harness.io) or visit the [Harness Community Forum](https://community.harness.io/).

## Git connector fails to connect to the SCM service

The following SCM service errors can occur with [Git connectors](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference).

### SCM request failed with: UNKNOWN

This error may occur if your Git connector uses **SSH** authentication. To resolve this error, make sure HTTPS is enabled on port 443. This is the protocol and port used by the Harness connection test for Git connectors.

### SCM connection errors when using self-signed certificates

If you have configured your build infrastructure to use self-signed certificates, your builds may fail when the Git connector attempts to connect to the SCM service. Build logs may contain the following error messages:

```
Connectivity Error while communicating with the scm service
Unable to connect to Git Provider, error while connecting to scm service
```

To resolve this issue, add `SCM_SKIP_SSL=true` to the `environment` section of the delegate YAML.

For example, here is the `environment` section of a `docker-compose.yml` file with the `SCM_SKIP_SSL` variable:

```yaml
environment:
      - ACCOUNT_ID=XXXX
      - DELEGATE_TOKEN=XXXX
      - MANAGER_HOST_AND_PORT=https://app.harness.io
      - LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/
      - DEPLOY_MODE=KUBERNETES
      - DELEGATE_NAME=test
      - NEXT_GEN=true
      - DELEGATE_TYPE=DOCKER
      - SCM_SKIP_SSL=true
```

For more information about self-signed certificates, delegates, and delegate environment variables, go to:

* [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables.md)
* [Docker delegate environment variables](/docs/platform/delegates/delegate-reference/docker-delegate-environment-variables.md)
* [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure.md)
* [Install delegates](/docs/category/install-delegates)
* [Configure a Kubernetes build farm to use self-signed certificates](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates.md)

## Clone codebase errors

For troubleshooting information related to cloning codebases, go to [Create and configure a codebase - Troubleshooting](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#troubleshooting).

## Output variable length limit

If an output variable's length is greater than 64KB, then the step fails. If you need to export large amounts of data, consider [uploading artifacts](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#upload-artifacts).

## Truncated execution logs

Each CI step supports a maximum log size of 5MB. Harness truncates logs larger than 5MB. If necessary, you can [export full logs](#export-full-logs).

Furthermore, there is a single-line limit of 25KB. If an individual line exceeds this limit, it is truncated and ends with `(log line truncated)`.

### Export full logs

If your log files are larger than 5MB, you can export execution logs to an external cache and examine the full logs there.

1. Add a step to your pipeline that records each step's complete logs into one or more files.
2. If you have a lot of log files or your logs are large, add a step to compress the log files into an archive.
3. Use an [Upload Artifact step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact.md#upload-artifacts) to upload the log files to cloud storage.
4. Repeat the above process for each stage in your pipeline for which you want to export the full logs.
5. Examine the log files in your cloud storage. If you used the **S3 Upload and Publish** or **Artifact Metadata Publisher** plugins, you can find direct links to your uploaded files on the **Artifacts** tab on the [Build detail page](../use-ci/viewing-builds.md).

:::tip Log forwarding

You can also use a service, such as [env0](https://docs.env0.com/docs/logs-forwarding), to forward logs to platforms suited for ingesting large logs.

:::

## Step logs disappear

If step logs disappear from pipelines that are using a Kubernetes cluster build infrastructure, you must either allow outbound communication with `storage.googleapis.com` or contact [Harness Support](mailto:support@harness.io) to enable the `CI_INDIRECT_LOG_UPLOAD` feature flag.

For more information about configuring connectivity, go to:

* [Delegate system requirements - Network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements/#network-requirements)
* [Allowlist Harness Domains an IPs](/docs/platform/References/allowlist-harness-domains-and-ips)

## Docker Hub rate limiting

<Dhrl />

## Can't connect to Docker daemon

<DindTrbs />

## Out of memory errors with Gradle

If a build that uses Gradle experiences out of memory errors, add the following to your `gradle.properties` file:

```
-XX:+UnlockExperimentalVMOptions -XX:+UseContainerSupport
```

Your Java options must use [UseContainerSupport](https://eclipse.dev/openj9/docs/xxusecontainersupport/) instead of `UseCGroupMemoryLimitForHeap`, which was removed in JDK 11.

## Step continues running for a long time after the command is complete

In Windows builds, if the primary command in a Powershell script starts a long-running subprocess, the step continues to run as long as the subprocess exists (until it reaches the step timeout limit).

1. Check if your command launches a subprocess.
2. If it does, check whether the process is exiting, and how long it runs before exiting.
3. If the run time is unacceptable, you might need to add commands to sleep or force exit the subprocess.

Here's a sample pipeline that includes a Powershell script that starts a subprocess. The subprocess runs for no more than two minutes.

```yaml
pipeline:
  identifier: subprocess_demo
  name: subprocess_demo
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        identifier: BUild
        type: CI
        name: Build
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  identifier: Run_1
                  type: Run
                  name: Run_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: jtapsgroup/javafx-njs:latest
                    shell: Powershell
                    command: |-
                      cd folder
                      gradle --version
                      Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList "Start-Sleep -Seconds 120"
                      Write-Host "Done!"
                    resources:
                      limits:
                        memory: 3Gi
                        cpu: "1"
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              initTimeout: 900s
              automountServiceAccountToken: true
              nodeSelector:
                kubernetes.io/os: windows
              os: Windows
          caching:
            enabled: false
            paths: []
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        build:
          type: branch
          spec:
            branch: main
```

## Kubernetes cluster build infrastructure issues

### CI pods appear to be evicted by Kubernetes autoscaling

<Kubevict />

### Delegate is not able to connect to the created build farm

If you get this error when using a Kubernetes cluster build infrastructure, and you have confirmed that the delegate is installed in the same cluster where the build is running, you may need to allow port 20001 in your network policy to allow pod-to-pod communication.

For more delegate and Kubernetes troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

### AKS builds timeout

Azure Kubernetes Service (AKS) security group restrictions can cause builds running on an AKS build infrastructure to timeout.

If you have a custom network security group, it must allow inbound traffic on port 8080, which the delegate service uses.

For more information, refer to the following Microsoft Azure troubleshooting documentation: [A custom network security group blocks traffic](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-kubernetes/custom-nsg-blocks-traffic).

## Harness Cloud build infrastructure issues

### Connector delegate error with Harness Cloud build infrastructure

Connectors that you use with the Harness Cloud build infrastructure must connect through the Harness Platform. To change the connector's connectivity mode:

1. Go to the **Connectors** page at the account, organization, or project scope. For example, to edit account-level connectors, go to **Account Settings**, select **Account Resources**, and then select **Connectors**.
2. Select the connector that you want to edit.
3. Select **Edit Details**.
4. Select **Continue** until you reach **Select Connectivity Mode**.
5. Select **Change** and select **Connect through Harness Platform**.
6. Select **Save and Continue** and select **Finish**.

### Can't use the built-in Harness Docker Connector with Harness Cloud build infrastructure

Depending on when your account was created, the built-in **Harness Docker Connector** (`account.harnessImage`) might be configured to connect through a Harness Delegate instead of the Harness Platform. In this case, attempting to use this connector with Harness Cloud build infrastructure generates the following error:

```
While using hosted infrastructure, all connectors should be configured to go via the Harness platform instead of via the delegate. Please update the connectors: [harnessImage] to connect via the Harness platform instead. This can be done by editing the connector and updating the connectivity to go via the Harness platform.
```

To resolve this error, you can either modify the **Harness Docker Connector** or use another Docker connector that you have already configured to connect through the Harness Platform.

To change the connector's connectivity settings:

1. Go to **Account Settings** and select **Account Resources**.
2. Select **Connectors** and select the **Harness Docker Connector** (ID: `harnessImage`).
3. Select **Edit Details**.
4. Select **Continue** until you reach **Select Connectivity Mode**.
5. Select **Change** and select **Connect through Harness Platform**.
6. Select **Save and Continue** and select **Finish**.

## AWS VM build infrastructure issues

For troubleshooting information for AWS VM build infrastructures, go to [Set up an AWS VM build infrastructure - Troubleshooting](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure.md#troubleshooting).

## Local runner build infrastructure issues

For troubleshooting information for local runner build infrastructures, go to [Set up a local runner build infrastructure - Troubleshooting](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure.md#troubleshooting-the-delegate-connection).
