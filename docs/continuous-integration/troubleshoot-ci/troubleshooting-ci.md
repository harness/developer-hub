---
title: Troubleshoot CI
description: Troubleshoot common CI issues.
sidebar_position: 10
helpdocs_topic_id: jx7ew69ypa
helpdocs_category_id: 99m8m1s55y
helpdocs_is_private: false
helpdocs_is_published: true
---


import Kubevict from '/docs/continuous-integration/shared/k8s-pod-eviction-trbs.md';
import Dhrl from '/docs/continuous-integration/shared/docker-hub-rate-limiting-trbs.md';
import DindTrbs from '/docs/continuous-integration/shared/dind-bg-gha-trbs.md';


This topic contains troubleshooting information for error messages and other issues that can arise with Harness CI. For more Harness troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

:::tip Troubleshooting tools

[AIDA](./aida.md) and [debug mode](/docs/continuous-integration/troubleshoot-ci/debug-mode.md) can help you troubleshoot errors and other issues in Harness CI.

:::

If you cannot find a resolution, please contact [Harness Support](mailto:support@harness.io) or visit the [Harness Community Forum](https://community.harness.io/).

## Secrets with line breaks and shell-interpreted special characters

For information about handling secrets with new line characters or other shell-interpreted special characters, go to [Add and reference text secrets - Line breaks and shell-interpreted characters](/docs/platform/secrets/add-use-text-secrets#line-breaks-and-shell-interpreted-characters) and [Use GCP secrets in scripts](/docs/continuous-integration/use-ci/run-ci-scripts/authenticate-gcp-key-in-run-step).

## Output variable length limit

If an output variable's length is greater than 64KB, steps can fail or truncate the output. If you need to export large amounts of data, consider [uploading artifacts](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#upload-artifacts) or [exporting artifacts by email](/docs/continuous-integration/use-ci/use-drone-plugins/drone-email-plugin.md).

## Multi-line output variables truncated

Output variables don't support multi-line output. Content after the first line is truncated. If you need to export multi-line data, consider [uploading artifacts](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#upload-artifacts) or [exporting artifacts by email](/docs/continuous-integration/use-ci/use-drone-plugins/drone-email-plugin.md).

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
<!-- transferred with Clone Codebase revision -->

For troubleshooting information related to cloning codebases, go to [Configure codebase - Troubleshooting](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#troubleshooting).

## Logging issues
<!-- transferred with View Builds revision -->

These are common issues encountered with build logs.

### Truncated execution logs
<!-- transferred with View Builds revision -->

Each CI step supports a maximum log size of 5MB. Harness truncates logs larger than 5MB. If necessary, you can [export full logs](#export-full-logs).

Furthermore, there is a single-line limit of 25KB. If an individual line exceeds this limit, it is truncated and ends with `(log line truncated)`.

Note that the CI log limit is different from the [Harness CD log limit](/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations.md).

#### Export full logs
<!-- transferred with View Builds revision -->

If your log files are larger than 5MB, you can export execution logs to an external cache and examine the full logs there.

1. Add a step to your pipeline that records each step's complete logs into one or more files.
2. If you have a lot of log files or your logs are large, add a step to compress the log files into an archive.
3. Use an [Upload Artifact step](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact.md#upload-artifacts) to upload the log files to cloud storage.
4. Repeat the above process for each stage in your pipeline for which you want to export the full logs.
5. Examine the log files in your cloud storage. If you used the **S3 Upload and Publish** or **Artifact Metadata Publisher** plugins, you can find direct links to your uploaded files on the **Artifacts** tab on the [Build detail page](../use-ci/viewing-builds.md).

:::tip Log forwarding

You can also use a service, such as [env0](https://docs.env0.com/docs/logs-forwarding), to forward logs to platforms suited for ingesting large logs.

:::

### Step logs disappear
<!-- transferred with View Builds revision -->

If step logs disappear from pipelines that are using a Kubernetes cluster build infrastructure, you must either allow outbound communication with `storage.googleapis.com` or contact [Harness Support](mailto:support@harness.io) to enable the `CI_INDIRECT_LOG_UPLOAD` feature flag.

For more information about configuring connectivity, go to:

* [Delegate system requirements - Network requirements](/docs/platform/delegates/delegate-concepts/delegate-requirements/#network-requirements)
* [Allowlist Harness Domains an IPs](/docs/platform/References/allowlist-harness-domains-and-ips)

### Logs don't load in real time
<!-- transferred with View Builds revision -->

[Network restrictions can prevent build logs from loading in real time.](/kb/continuous-integration/articles/CI-step-logs-dont-load-in-real-time)

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

In Windows builds, if the primary command in a Powershell script starts a long-running subprocess, the step continues to run as long as the subprocess exists (or until it reaches the step timeout limit).

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

## Can't generate SonarQube report due to shallow clone

* Error message: `Shallow clone detected, no blame information will be provided. You can convert to non-shallow with 'git fetch --unshallow`
* Cause: If the [depth setting](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#depth) in your pipeline's codebase configuration is shallow, SonarQube can't generate a report. This is a [known SonarQube issue](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scm-integration/#known-issues).
* Solution: Change the `depth` to `0`.

## Build infrastructure issues

### CI pods appear to be evicted by Kubernetes autoscaling

<Kubevict />

### Delegate is not able to connect to the created build farm

If you get this error when using a Kubernetes cluster build infrastructure, and you have confirmed that the delegate is installed in the same cluster where the build is running, you may need to allow port 20001 in your network policy to allow pod-to-pod communication.

For more delegate and Kubernetes troubleshooting guidance, go to [Troubleshooting Harness](/docs/troubleshooting/troubleshooting-nextgen).

### AKS builds timeout

Azure Kubernetes Service (AKS) security group restrictions can cause builds running on an AKS build infrastructure to timeout.

If you have a custom network security group, it must allow inbound traffic on port 8080, which the delegate service uses.

For more information, refer to the following Microsoft Azure troubleshooting documentation: [A custom network security group blocks traffic](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-kubernetes/custom-nsg-blocks-traffic).

### Istio MTLS STRICT mode

[A headless service is required if you are using Istio MTLS STRICT mode.](../use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure/#create-headless-service-for-istio-mtls-strict-mode)

### Harness Cloud build infrastructure issues

For troubleshooting information for Harness Cloud build infrastructure, go to [Use Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md#troubleshooting-harness-cloud-build-infrastructure).

### AWS VM build infrastructure issues

For troubleshooting information for AWS VM build infrastructures, go to [Set up an AWS VM build infrastructure - Troubleshooting](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure.md#troubleshooting).

### Local runner build infrastructure issues

For troubleshooting information for local runner build infrastructures, go to [Set up a local runner build infrastructure - Troubleshooting](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure.md#troubleshooting).

## Test Intelligence issues

You might encounter these issues when using Test Intelligence.

### TI with Maven

If you encounter issues with Test Intelligence when using Maven as your build tool, check the following configurations:

* If your `pom.xml` contains `<argLine>`, then you must modify your argLine setup as explained in [Enable TI for Java, Kotlin, Scala - Build tool setting](../use-ci/run-tests/test-intelligence/ti-for-java-kotlin-scala.md#build-tool).
* If you attach Jacoco or any agent while running unit tests, then you must modify your argLine setup as explained in [Enable TI for Java, Kotlin, Scala - Build tool setting](../use-ci/run-tests/test-intelligence/ti-for-java-kotlin-scala.md#build-tool).
* If you use Jacoco, Surefire, or Failsafe, make sure that `forkCount` is not set to `0`. For example, the following configuration in `pom.xml` removes `forkCount` and applies `useSystemClassLoader` as a workaround:

   ```xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-surefire-plugin</artifactId>
       <version>2.22.1</version>
       <configuration>
           <!--  <forkCount>0</forkCount> -->
           <useSystemClassLoader>false</useSystemClassLoader>
       </configuration>
   </plugin>
   ```

### TI with Bazel

If you encounter issues with Test Intelligence when using Bazel as your build tool, and you use a Bazel [container image](../use-ci/run-tests/test-intelligence/ti-for-java-kotlin-scala.md#container-registry-and-image) in a build infrastructure where Bazel isn't already installed, your pipeline must install Bazel in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings.md) prior to the Run Tests step. This is because `bazel query` is called before the container image is pulled.

Bazel is already installed on Harness Cloud runners, and you don't need to specify a container image. For other build infrastructures, you must manually confirm that Bazel is already installed.

### TI with Gradle

If you encounter issues with Test Intelligence when using Gradle as your build tool, check your configuration's Gradle compatibility, as explained in [Enable TI for Java, Kotlin, Scala - Build tool setting](../use-ci/run-tests/test-intelligence/ti-for-java-kotlin-scala.md#build-tool).

### TI for Python

If you encounter errors with TI for Python, make sure you have met the following requirements:

* Your project is written in Python 3, and your repo is a pure Python 3 repo.
* You don't use resource file relationships. TI for Python doesn't support resource file relationships.
* You don't use dynamic loading and metaclasses. TI for Python might miss tests or changes in repos that use dynamic loading or metaclasses.
* Your build tool is pytest or unittest.
* The Python 3 binary is preinstalled on the build machine, available in the specified [Container Registry and Image](#container-registry-and-image), or installed at runtime in [Pre-Command](../use-ci/run-tests/test-intelligence/ti-for-python.md#pre-command-post-command-and-shell).
* If you use another command, such as `python`, to invoke Python 3, you have added an alias, such as `python3 = "python"`.

If you get errors related to code coverage for Python:

* If you included [Build Arguments](../use-ci/run-tests/test-intelligence/ti-for-python.md#build-arguments), these don't need coverage flags (`--cov` or `coverage`).
* You don't need to install coverage tools in [Pre-Command](../use-ci/run-tests/test-intelligence/ti-for-python.md#pre-command-post-command-and-shell).

### TI for Ruby

#### Cannot find rspec helper file

The following log line indicates that Test Intelligence can't locate an rspec helper file in your code repo:

```
Unable to write rspec helper file automatically cannot find rspec helper file. Please make change manually to enable TI.
```

This usually occurs if the helper file has a name other than `spec_helper.rb`.

To resolve this, add the following line to your rspec helper file:

```
set -e; echo "require_relative '/tmp/engine/ruby/harness/ruby-agent/test_intelligence.rb'" >> lib/vagrant/shared_helpers.rb
```

#### Dynamically generated code

Test Intelligence results can be inaccurate for Ruby repos using dynamically generated code.

#### Rails apps using Spring

Test Intelligence results can be inaccurate for Rails apps using [Spring](https://github.com/rails/spring).
