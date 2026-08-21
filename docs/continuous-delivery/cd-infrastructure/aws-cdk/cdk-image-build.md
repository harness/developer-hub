---
title: Build AWS CDK runtime images
sidebar_label: Build CDK Images
description: A reusable Harness pipeline to help you build customized AWS CDK plugin images.
keywords:
  - aws cdk
  - cdk plugin image
  - image builder
  - docker
  - runtime images
tags:
  - continuous delivery
  - aws
  - infrastructure
sidebar_position: 3
---

This topic provides a Harness Continuous Delivery (CD) pipeline that you can use to build custom Docker images for the AWS Cloud Development Kit (AWS CDK) plugin. The pipeline gives you the flexibility to use newer AWS CDK versions or customize runtime environments to meet your application requirements.

The pipeline builds a separate AWS CDK plugin Docker image for each supported runtime (Python, Java, .NET, and Go) and pushes the images to your Docker repository. You can use this pipeline to build images with an AWS CDK version newer than the version available in the prebuilt Harness images, or to include additional dependencies required by your CDK application.

Go to the [Pipeline YAML](#pipeline-yaml) section to copy the full pipeline.

---

## What will you learn in this topic?

- Understand the [prerequisites](#before-you-begin) for running the pipeline.
- Which [runtimes and base images](#supported-runtimes-and-base-images) the pipeline supports.
- How the [pipeline steps](#pipeline-steps-and-execution-flow) build and push each image.
- How to enable [privileged mode](#privileged-mode-requirement) for the image build steps.
- How to [run the pipeline](#run-the-image-build-pipeline) and set its [variables and runtime inputs](#pipeline-variables-and-runtime-inputs).

---

## Before you begin

- **Kubernetes cluster and connector**: Set up a Kubernetes cluster using `KubernetesDirect` infrastructure that allows privileged containers, and a Harness Kubernetes Cluster connector that references it. For managed Kubernetes such as GKE, do not use GKE Autopilot clusters; use a standard node pool that allows privileged mode. Go to [Kubernetes Cluster connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference) to configure the connector.
- **Docker registry and Git connectors**: Configure connectors for Docker registries (`account.dockerhub` or your own) and any required Git repositories.
- **Secrets and variables**: Store Docker registry credentials and secret variables in Harness secrets management.
- **Pipeline variables**: Be ready to set variables such as `VERSION`, `AWS_CDK_VERSION`, `ARCH`, and `TARGET_REPO` at runtime or with defaults.
- **Base scratch image**: The pipeline pulls the base scratch image `harness/aws-cdk-plugin:<VERSION>-base-<ARCH>`. Confirm this tag exists for your chosen `VERSION` on [Docker Hub](https://hub.docker.com/r/harness/aws-cdk-plugin/tags?name=base) before you run the build.

Go to [AWS CDK on npm](https://www.npmjs.com/package/aws-cdk) to find the latest CDK version.

---

## Supported runtimes and base images

The pipeline builds images for the following runtime environments:

- **Python**: Python3, pip, bash, curl, git, Node.js 20, AWS CDK CLI
- **Java**: OpenJDK 11, Maven 3.9.11, bash, curl, git, Node.js 20, AWS CDK CLI
- **DotNet**: .NET runtime and dependencies, bash, icu-libs, git, Node.js 20, AWS CDK CLI
- **Go**: Bash, curl, git, Node.js 20, AWS CDK CLI

All runtime images derive from the supported Harness [base plugin images](https://hub.docker.com/r/harness/aws-cdk-plugin/tags) and runtime-specific Node.js OS base images.

The pipeline tags each image it builds in the format `<TARGET_REPO>:<RUNTIME>-<VERSION>-<AWS_CDK_VERSION>-linux-<ARCH>`, for example `harness/aws-cdk-plugin:python-1.4.0-2.1029.1-linux-amd64`.

---

## Pipeline steps and execution flow

The pipeline runs the following steps to build and push each runtime image:

1. **Authentication setup**: Creates the Docker config for registry authentication.
2. **Dockerfile generation**: Generates Dockerfiles per runtime, each of which uses a multi-stage build (base plus runtime image), copies the plugin and scripts from the base image, installs the language runtime and AWS CDK, and configures Node.js, metadata, and the entrypoint.
3. **Image build and push**: Uses Docker to build and push the tagged runtime images.

---

## Privileged mode requirement

Certain pipeline steps, such as Docker-in-Docker for image build and push, require privileged execution. Privileged steps are not standard pipeline steps; they run with escalated permissions and must be explicitly enabled with `privileged: true` in the pipeline YAML.

To enable privileged mode, set `privileged: true` under `spec` in your step group or individual step. Your Kubernetes cluster must be configured to allow privileged containers.

```yaml
stepGroup:
  privileged: true
  name: k8s-step-group
  sharedPaths:
    - /var/run
    - /var/lib/docker
```

For individual steps:

```yaml
step:
  name: dinD
  privileged: true
  # ...
```

Without this setting, Docker builds and image pushes can fail due to insufficient permissions inside the container.

---

## Run the image build pipeline

Perform the following steps to run the image build pipeline:

1. Copy the [pipeline YAML](#pipeline-yaml) into your Harness project.
2. Add an empty do-nothing service to the pipeline.
3. Configure a Kubernetes environment in Harness.
4. In the **Execution** section, enable **container-based execution** in the **step group**. Add the Kubernetes Cluster connector inside the container step group, then save the pipeline.
5. Select **Run Pipeline**.
6. Fill in all required variables. Go to [Pipeline variables and runtime inputs](#pipeline-variables-and-runtime-inputs) to review each variable.

---

## Pipeline variables and runtime inputs

Set the following variables in the pipeline YAML and at runtime.

### Pipeline variables

The following variables are set in the pipeline YAML:

| Variable         | Description                        | Example                   |
| ---------------- | ---------------------------------- | ------------------------- |
| `TARGET_REPO`    | Docker repository                  | `harness/aws-cdk-plugin`  |
| `DOCKER_USERNAME`| Docker registry username           | `your-dockerhub-username` |
| `DOCKER_PASSWORD`| Docker registry password or token  | From secrets              |

### Runtime inputs

The following variables are supplied at runtime:

| Variable         | Description                        | Example                   |
| ---------------- | ---------------------------------- | ------------------------- |
| `VERSION`        | Harness base image version         | `1.4.0`                   |
| `AWS_CDK_VERSION`| AWS CDK CLI version                | `2.1029.1`                |
| `ARCH`           | Image build architecture           | `amd64` or `arm64`        |

<div align="center">
  <DocImage path={require('./static/cdk-image-pipeline.png')} alt="Run Pipeline panel showing the VERSION, AWS_CDK_VERSION, and ARCH pipeline variables with example values" width="80%" />
</div>

---

## Pipeline YAML

The following YAML defines the AWS CDK image build pipeline. Copy and paste it into your Harness project.

The stage renders in the UI as shown below:

<div align="center">
  <DocImage path={require('./static/cdk-build-push-2.png')} alt="Pipeline Studio showing the cdkbuildandpush pipeline with a single stage and a build step group containing the dinD and Build and push steps" width="90%" />
</div>

<details>
<summary>Pipeline YAML</summary>

After you copy the pipeline YAML into your Harness project, change the following parameters: `projectIdentifier`, `orgIdentifier`, `environmentRef`, `infrastructureDefinitions`, the Docker `connectorRef`, and the Kubernetes `connectorRef`.

```yaml
pipeline:
  projectIdentifier: your-project-identifier
  orgIdentifier: your-org-identifier
  tags: {}
  stages:
    - stage:
        identifier: cdk
        type: Deployment
        name: cdk
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: service
          environment:
            environmentRef: your_environment_identifier
            deployToAll: false
            infrastructureDefinitions:
              - identifier: your_infrastructure_identifier
          execution:
            steps:
              - stepGroup:
                  identifier: build
                  name: build
                  sharedPaths:
                    - /var/run
                    - /var/lib/docker
                  steps:
                    - step:
                        type: Background
                        name: dinD
                        identifier: Background
                        spec:
                          connectorRef: your_docker_connector   # Replace with your Docker registry connector
                          image: docker:24.0-dind
                          shell: Sh
                          privileged: true
                    - step:
                        type: Run
                        name: Build and push
                        identifier: Run_2
                        spec:
                          connectorRef: your_docker_connector   # Replace with your Docker registry connector
                          image: docker:24.0-dind
                          shell: Sh
                          command: |-
                            #!/bin/bash
                            set -euo pipefail
                            # Install common dependencies once - git/node/python/bash etc.
                            apk add --no-cache bash icu-libs krb5-libs libgcc libintl libssl3 libstdc++ zlib git curl python3 py3-pip bash curl
                            export VERSION="<+pipeline.variables.VERSION>"
                            export AWS_CDK_VERSION="<+pipeline.variables.AWS_CDK_VERSION>"
                            export ARCH="<+pipeline.variables.ARCH>"
                            export TARGET_REPO="<+pipeline.variables.TARGET_REPO>"
                            DOCKER_USERNAME=<+pipeline.variables.DOCKER_USERNAME>
                            DOCKER_PASSWORD=<+pipeline.variables.DOCKER_PASSWORD>
                            SOURCE_REGISTRY="harness/aws-cdk-plugin"
                            # The base scratch image tag is ${VERSION}-base-${ARCH}. Confirm this tag exists for your VERSION on the source registry before you run the build; otherwise the docker pull fails.
                            SCRATCH_IMAGE="${SOURCE_REGISTRY}:${VERSION}-base-${ARCH}"
                            docker version
                            docker info
                            echo "Logging into docker registry"
                            echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                            echo "Pulling base scratch image: ${SCRATCH_IMAGE}"
                            docker pull "${SCRATCH_IMAGE}"
                            # ##### Python image #####
                            PY_IMAGE="${TARGET_REPO}:python-${VERSION}-${AWS_CDK_VERSION}-linux-${ARCH}"
                            cat > Dockerfile.python << EOF
                            FROM ${SCRATCH_IMAGE} as scratch-content
                            FROM node:20-alpine3.16
                            COPY --from=scratch-content /opt/harness/plugin /opt/harness/aws-cdk-plugin
                            COPY --from=scratch-content /opt/harness/scripts /opt/harness/scripts
                            RUN chmod +x /opt/harness/aws-cdk-plugin /opt/harness/scripts/run.sh
                            RUN apk add --no-cache python3 py3-pip bash curl git
                            RUN pip3 install --upgrade pip
                            RUN node --version && npm --version
                            RUN npm install -g aws-cdk@${AWS_CDK_VERSION}
                            RUN cdk --version
                            LABEL org.label-schema.runtime="python"
                            ENTRYPOINT ["/opt/harness/scripts/run.sh"]
                            EOF
                            echo "Building Python runtime image"
                            docker build -t "${PY_IMAGE}" -f Dockerfile.python .
                            echo "Pushing Python runtime image"
                            docker push "${PY_IMAGE}"
                            ##### Java image #####
                            JAVA_IMAGE="${TARGET_REPO}:java-${VERSION}-${AWS_CDK_VERSION}-linux-${ARCH}"
                            MAVEN_VERSION=3.9.11
                            cat > Dockerfile.java << EOF
                            FROM ${SCRATCH_IMAGE} as scratch-content
                            FROM node:20-alpine3.16
                            # Copy plugin binary to expected path matching run.sh
                            COPY --from=scratch-content /opt/harness/plugin /opt/harness/aws-cdk-plugin
                            COPY --from=scratch-content /opt/harness/scripts /opt/harness/scripts
                            RUN chmod +x /opt/harness/aws-cdk-plugin /opt/harness/scripts/run.sh
                            RUN apk add --no-cache openjdk11-jre curl bash git
                            RUN curl -LO https://dlcdn.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz && \\
                                tar -xzf apache-maven-${MAVEN_VERSION}-bin.tar.gz -C /usr/local && \\
                                rm apache-maven-${MAVEN_VERSION}-bin.tar.gz
                            ENV PATH=/usr/local/apache-maven-${MAVEN_VERSION}/bin:\$PATH
                            RUN java -version
                            RUN mvn -v
                            RUN node --version && npm --version
                            RUN npm install -g aws-cdk@${AWS_CDK_VERSION}
                            RUN cdk --version
                            LABEL org.label-schema.runtime="java"
                            ENTRYPOINT ["/opt/harness/scripts/run.sh"]
                            EOF
                            echo "Building Java runtime image"
                            docker build -t "${JAVA_IMAGE}" -f Dockerfile.java .
                            echo "Pushing Java runtime image"
                            docker push "${JAVA_IMAGE}"
                            echo "✅ Java runtime image built and pushed successfully."
                            # ##### Dotnet image #####
                            DOTNET_IMAGE="${TARGET_REPO}:dotnet-${VERSION}-${AWS_CDK_VERSION}-linux-${ARCH}"
                            cat > Dockerfile.dotnet << EOF
                            FROM ${SCRATCH_IMAGE} as scratch-content
                            FROM node:20-alpine3.16
                            COPY --from=scratch-content /opt/harness/plugin /opt/harness/aws-cdk-plugin
                            COPY --from=scratch-content /opt/harness/scripts /opt/harness/scripts
                            RUN chmod +x /opt/harness/aws-cdk-plugin /opt/harness/scripts/run.sh
                            RUN apk add --no-cache bash icu-libs krb5-libs libgcc libintl libssl3 libstdc++ zlib curl nodejs npm git
                            RUN echo "http://dl-3.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
                            RUN apk add --no-cache libgdiplus
                            RUN node --version && npm --version
                            RUN npm install -g aws-cdk@${AWS_CDK_VERSION}
                            RUN cdk --version
                            LABEL org.label-schema.runtime="dotnet"
                            ENTRYPOINT ["/opt/harness/scripts/run.sh"]
                            EOF
                            echo "Building Dotnet runtime image"
                            docker build -t "${DOTNET_IMAGE}" -f Dockerfile.dotnet .
                            echo "Pushing Dotnet runtime image"
                            docker push "${DOTNET_IMAGE}"
                            # ##### Go image #####
                            GO_IMAGE="${TARGET_REPO}:go-${VERSION}-${AWS_CDK_VERSION}-linux-${ARCH}"
                            cat > Dockerfile.go << EOF
                            FROM ${SCRATCH_IMAGE} as scratch-content
                            FROM node:20-alpine3.16
                            COPY --from=scratch-content /opt/harness/plugin /opt/harness/aws-cdk-plugin
                            COPY --from=scratch-content /opt/harness/scripts /opt/harness/scripts
                            RUN chmod +x /opt/harness/aws-cdk-plugin /opt/harness/scripts/run.sh
                            RUN apk add --no-cache bash curl git nodejs npm
                            RUN node --version && npm --version
                            RUN npm install -g aws-cdk@${AWS_CDK_VERSION}
                            RUN cdk --version
                            LABEL org.label-schema.runtime="go"
                            ENTRYPOINT ["/opt/harness/scripts/run.sh"]
                            EOF
                            echo "Building Go runtime image"
                            docker build -t "${GO_IMAGE}" -f Dockerfile.go .
                            echo "Pushing Go runtime image"
                            docker push "${GO_IMAGE}"
                            echo "All runtime images built and pushed successfully."
                        description: Build and push images for all runtimes
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: your_k8s_connector   # Replace with your Kubernetes Cluster connector
            rollbackSteps: []
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        tags: {}
  variables:
    - name: VERSION
      type: String
      description: Version of the plugin (without 'v' prefix)
      required: true
      value: <+input>.default(1.4.0)
    - name: AWS_CDK_VERSION
      type: String
      description: AWS CDK version to install
      required: true
      value: <+input>.default(2.1029.1)
    - name: ARCH
      type: String
      description: Architecture to build for
      required: true
      value: <+input>.allowedValues(amd64,arm64)
    - name: TARGET_REPO
      type: String
      description: Target registry URL
      required: true
      value: your_target_registry_url
    - name: DOCKER_USERNAME
      type: String
      description: Registry username
      required: true
      value: your_registry_username
    - name: DOCKER_PASSWORD
      type: String
      description: Registry password
      required: true
      value: <+secrets.getValue("your-docker-pat")>
  identifier: cdkbuildandpush
  name: cdk-build-push
```
</details>

---

## Output images

After a successful build, you have four tagged images in your target Docker repository. Each tag follows the format the pipeline builds, `<TARGET_REPO>:<RUNTIME>-<VERSION>-<AWS_CDK_VERSION>-linux-<ARCH>`:

- **Python**: `<TARGET_REPO>:python-<VERSION>-<AWS_CDK_VERSION>-linux-<ARCH>`
- **Java**: `<TARGET_REPO>:java-<VERSION>-<AWS_CDK_VERSION>-linux-<ARCH>`
- **DotNet**: `<TARGET_REPO>:dotnet-<VERSION>-<AWS_CDK_VERSION>-linux-<ARCH>`
- **Go**: `<TARGET_REPO>:go-<VERSION>-<AWS_CDK_VERSION>-linux-<ARCH>`

Each image includes the required runtime, the AWS CDK CLI, and the Harness plugin, ready for production use.

---

## Related topics

- Go to [AWS CDK Provisioning](/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-provisioning) to configure CDK steps that run on your custom images.
- Go to [AWS CDK use cases and examples](/docs/continuous-delivery/cd-infrastructure/aws-cdk/aws-cdk-use-cases) to review provisioning modes and code examples.
