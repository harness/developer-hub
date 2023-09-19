---
title: Run Docker-in-Docker in a Build stage
description: You can run Docker-in-Docker as a Background step in a Build stage.
sidebar_position: 30
helpdocs_topic_id: ajehk588p4
helpdocs_category_id: 7ljl8n7mzn
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

CI pipelines that use a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures) need Docker-in-Docker (DinD) if you need to run Docker commands as part of the build process. For example, if you want to build images from [two separate codebases in the same pipeline](../codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline.md): One with a [Build and Push to Docker step](../build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings.md) and another with Docker commands in a [Run step](./run-step-settings.md).

To configure DinD in Harness CI, you need to add a [DinD Background step](#add-a-dind-background-step) and a [Run step that runs Docker commands](#add-a-docker-run-step) to your [pipeline](#prepare-a-pipeline).

## Kubernetes cluster build infrastructure required

Docker-in-Docker (DinD) with privileged mode is necessary when using a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures) only. For other infrastructure types, you can run Docker commands directly on the host.

## Privileged mode required

Docker-in-Docker must run in privileged mode to work properly. Be aware that privileged mode provides full access to the host environment. For more information, go to the Docker documentation on [Runtime Privilege and Linux Capabilities](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities).

You can't use DinD on platforms that don't support privileged mode, such as those that run containers on Windows.

## Prepare a pipeline for DinD

You need a [pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md) that uses a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures). DinD is necessary for Kubernetes cluster build infrastructures only. For other infrastructure types, you can run Docker commands directly on the host.

If you haven't created a pipeline before, try this tutorial: [Build and test on a Kubernetes cluster build infrastructure](/tutorials/ci-pipelines/kubernetes-build-farm).

To demonstrate how to set up DinD in Harness CI, this topic creates a pipeline that includes a DinD Background step and a Run step that builds and pushes an image. If you want to follow this example, you can configure your **Build** stage as follows:

1. In your pipeline, select the **Build** stage, and then select the **Overview** tab.
2. Under **Stage Details**, disable **Clone Codebase**. The example pipeline created in this topic doesn't use a [default codebase](../codebase-configuration/create-and-configure-a-codebase.md); instead, the codebase is cloned by commands in the [Run step](#add-a-docker-run-step).
3. Under **Shared Paths**, add the following two paths:

   * `/var/run`
   * `/var/lib/docker`

4. Expand **Advanced**, and add [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables) for your Docker Hub Personal Access Token (PAT) and any other values that you want to parameterize.

   For passwords and Personal Access Tokens, select **Secret** as the variable type. For example, to add the Docker Hub PAT variable:

   * **Type:** Select **Secret**.
   * **Name:** Enter a name, such as `Docker Hub PAT`.
   * **Value:** Select a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing your Docker Hub PAT.

5. Select the **Infrastructure** tab.
6. Under **Infrastructure**, select **Kubernetes**, and then configure a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures).

## Add a DinD Background step

In your **Build** stage, select the **Execution** tab, and add a [Background step](../manage-dependencies/background-step-settings.md) configured as follows:

1. For **Name**, enter `dind_Service`.
2. For **Container Registry**, select your [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
3. For **Image**, enter the name and tag for the image that you want to use to run DinD, such as [docker:dind](https://hub.docker.com/_/docker).
4. Under **Additional Configuration**, select **Privileged**. [Privileged mode is required](#privileged-mode-required) Docker-in-Docker to run correctly.
5. In **Entry Point**, you can provide a list of arguments, if needed. For example, the entry point for the `docker:dind` image is `docker-entrypoint.sh`. If you want to add a `--mtu` argument, you would include both the image entry point and the additional argument in the **Entry Point** specification.

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```

<!-- ![](./static/dind-background-step-entry-point.png) -->

<docimage path={require('./static/dind-background-step-entry-point.png')} />

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML">
```

```yaml
entrypoint:
  - docker-entrypoint.sh
  - "--mtu=1450"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Add a Docker Run step

After the **Background** step, add a **Run** step to run your Docker commands. Configure the [Run step settings](./run-step-settings.md#run-step-settings) as follows:

1. Enter a **Name**.
2. For **Container Registry**, select your [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
3. For **Image**, enter the name and tag for the Docker image, with the Docker binary, that you want to use to execute the content of **Command**.
4. In **Command**, enter the shell commands you want to run in this step.

   For example, the following commands clone a Git repo, build an image, and push the image to a Docker registry:

   ```
   apk add git
   git --version
   git clone https://github.com/$GITHUB_USERNAME/$GITHUB_REPO
   cd $GITHUB_REPO

   echo $DOCKERHUB_PAT > my_password.txt
   cat my_password.txt | docker login --username $DOCKERHUB_USERNAME --password-stdin

   docker build -t $DOCKER_IMAGE_LABEL
   docker tag $DOCKER_IMAGE_LABEL $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>
   docker push $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>
   ```

   :::tip Variables and expressions

   The variables referenced in this command, such as `$DOCKERHUB_PAT`, refer to [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables) that reference string values or [Harness text secrets](/docs/platform/secrets/add-use-text-secrets).

   These commands also use `<+pipeline.sequenceId>`, which is a [Harness expression](/docs/platform/variables-and-expressions/harness-variables) that prints the incremental build identifier.

   :::

### Wait for the container to initialize

When the build runs and the container starts, the software inside the container takes time to initialize and start accepting connections. Give the service adequate time to initialize before trying to connect. To do this, you can use a `while` loop in your **Command**, such as:

```
while ! docker ps ;do
      echo "Docker not available yet"
done
echo "Docker Service Ready"
docker ps
```

You can also add steps to your pipeline that [run health checks on background services](/docs/continuous-integration/use-ci/manage-dependencies/health-check-services).

## DinD and Docker container logs

When you run your pipeline, you can review the step logs on the [Build details page](../viewing-builds.md).

## Pipeline YAML example

The following YAML example defines a pipeline that:

* Uses a [Kubernetes cluster build infrastructure](#kubernetes-cluster-build-infrastructure-required).
* Has a [Background step that runs DinD](#add-a-dind-background-step)
* Has a [Run step that runs a series of commands on a Docker image](#add-a-docker-run-step).

This example doesn't use a default codebase (`cloneCodebase: false`). Instead, the codebase is cloned by commands in the `Run` step.

```yaml
pipeline:
  name: dind-background-step-demo
  identifier: dindbackgroundstepdemo
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: build
        identifier: build
        type: CI
        spec:
          cloneCodebase: false
          execution:
            steps:
              - step:
                  type: Background
                  name: Background
                  identifier: Background
                  spec:
                    connectorRef: account.harnessImage
                    image: docker:dind
                    shell: Sh
                    privileged: true
              - step:
                  type: Run
                  name: Run
                  identifier: Run
                  spec:
                    connectorRef: account.harnessImage
                    image: docker:run_step_image
                    shell: Sh
                    command: |-
                      while ! docker ps ;do
                            echo "Docker not available yet"
                      done
                      echo "Docker Service Ready"
                      docker ps

                      apk add git
                      git --version
                      git clone https://github.com/john-doe/$GITHUB_REPO
                      cd $GITHUB_REPO

                      echo $DOCKERHUB_PAT > my_password.txt
                      cat my_password.txt | docker login --username $DOCKERHUB_USERNAME --password-stdin

                      docker build -t $DOCKER_IMAGE_LABEL .
                      docker tag $DOCKER_IMAGE_LABEL $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>
                      docker push $DOCKERHUB_USERNAME/$DOCKER_IMAGE_LABEL:<+pipeline.sequenceId>
                    privileged: false
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_K8S_CLUSTER_CONNECTOR_ID
              namespace: YOUR_K8S_NAMESPACE
              nodeSelector: {}
              os: Linux
          sharedPaths:
            - /var/run
            - /var/lib/docker
        variables:
          - name: DOCKERHUB_USERNAME
            type: String
            description: ""
            value: jdoe
          - name: DOCKERHUB_PAT
            type: Secret
            description: ""
            value: jdoedockerhubpat
          - name: GITHUB_USERNAME
            type: String
            description: ""
            value: j-doe
          - name: GITHUB_REPO
            type: String
            description: ""
            value: codebaseAlpha
          - name: GITHUB_PAT
            type: Secret
            description: ""
            value: jdoegithubpat
          - name: DOCKER_IMAGE_LABEL
            type: String
            description: ""
            value: dind-bg-step
```
