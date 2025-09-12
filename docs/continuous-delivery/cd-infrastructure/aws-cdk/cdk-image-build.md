---
title: Building AWS CDK Runtime Images
description: A reusable Harness pipeline to help you build customized AWS CDK plugin images.
tags: 
  - aws-cdk-image
  - plugin-builder
sidebar_position: 2
---

This page provides a Harness CD pipeline designed to help you build your own Docker images for the AWS CDK plugin.  

The purpose of this pipeline is to give you flexibility—so you can adopt newer AWS CDK versions or tailor runtime environments to your needs.

## What This Pipeline Does

This pipeline automates building AWS CDK images for different programming languages using Harness. It enables you to keep up with the latest CDK runtimes and apply customizations as required for your projects.  

You can find the full pipeline YAML in the [Pipeline YAML](#pipeline-yaml) section below.

## Key Pre-requisites

- **Kubernetes Cluster & Connector:** You must have a Kubernetes cluster set up (using `KubernetesDirect` infrastructure). The cluster must allow privileged containers.  
  - *Managed K8s (such as GKE):* Do **not** use GKE Autopilot clusters—use a standard node pool that allows privileged mode.
  - Set up a Kubernetes Cluster connector in Harness referencing your cluster.
- **Docker Registry & Git Connectors:** Properly configure connectors for Docker registries (`account.dockerhub` or your own) and any required Git repos.
- **Secrets & Variables:** Store Docker registry credentials and secret variables in Harness secrets management.
- **Pipeline Variables:** Be ready to set variables like `VERSION`, `AWS_CDK_VERSION`, `ARCH`, and `TARGET_REPO` at runtime or with defaults.

You can get the latest CDK version from the [AWS CDK NPM page](https://www.npmjs.com/package/aws-cdk).

## Supported Runtimes and Base Images

The pipeline builds images for the following runtime environments:

- **Python:** Python3, pip, bash, curl, git, Node.js 20, AWS CDK CLI
- **Java:** OpenJDK 11, Maven 3.9.11, bash, curl, git, Node.js 20, AWS CDK CLI
- **DotNet:** .NET runtime and dependencies, bash, icu-libs, git, Node.js 20, AWS CDK CLI
- **Go:** Bash, curl, git, Node.js 20, AWS CDK CLI

All runtime images derive from the supported Harness [base plugin images](https://hub.docker.com/r/harness/aws-cdk-plugin/tags) and runtime-specific Node.js OS base images.

**Example image tag format**:  
`harness/aws-cdk-plugin:<VERSION>-<RUNTIME>-<AWS_CDK_VERSION>-linux-<ARCH>`

## Pipeline Steps and Execution Flow

1. **Authentication Setup:** Creates Docker config for registry authentication.
2. **Dockerfile Generation:** Dynamically generates Dockerfiles per runtime:
    - Multi-stage (base + runtime image)
    - Plugin and scripts copied from base image
    - Installs language runtimes and AWS CDK
    - Configures Node.js, metadata, and entrypoint
3. **Image Build and Push:** Uses Docker to build and push tagged runtime images.

## Privileged Mode Requirement

Certain pipeline steps (such as Docker-in-Docker for image build and push) require privileged execution.  
**Privileged steps** are not standard pipeline steps—they run with escalated permissions and must be explicitly enabled with `privileged: true` in the pipeline YAML.

**How to enable privileged mode:**  
Set `privileged: true` in your step group or individual step under `spec`.  
Your Kubernetes cluster must be configured to allow privileged containers.

```yaml
stepGroup:
  privileged: true
  name: k8s-step-group
  sharedPaths:
    - /var/run
    - /var/lib/docker
```

For individual steps:
```
step:
  name: dinD
  privileged: true
  ...
```
Without this setting, Docker builds and image pushes may fail due to insufficient permissions inside the container.

## Quick Start

1. Copy the [pipeline YAML](/docs/continuous-delivery/cd-infrastructure/aws-cdk/cdk-image-build#pipeline-yaml) into your Harness Project.
2. Add an empty/do-nothing service to the pipeline.
3. Configure a Kubernetes environment in Harness.
4. In the **Execution section**, enable **container-based execution** in the **step group**. Add the Kubernetes cluster connector inside the container step group. Save the pipeline.
5. Click **Run Pipeline**.
6. Fill in all required variables (see [Pipeline Variables](#pipeline-variables)).

## Pipeline Variables and Runtime Inputs

Here are the variables that you have to set in the pipeline YAML and at runtime.

### Pipeline variables

| Variable         | Description                        | Example                   |
| ---------------- | ---------------------------------- | ------------------------- |
| `TARGET_REPO`    | Docker repository                  | `harness/aws-cdk-plugin`  |
| `DOCKER_USERNAME`| Docker registry username           | `your-dockerhub-username` |
| `DOCKER_PASSWORD`| Docker registry password/token     | *(from secrets)*          |

### Runtime inputs

| Variable         | Description                        | Example                   |
| ---------------- | ---------------------------------- | ------------------------- |
| `VERSION`        | Harness base image version         | `1.4.0`                   |
| `AWS_CDK_VERSION`| AWS CDK CLI version                | `2.1029.1`                |
| `ARCH`           | Image build architecture           | `amd64` or `arm64`        |


<div align="center">
  <DocImage path={require('./static/cdk-image-pipeline.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

## Pipeline YAML

This is the YAML for the AWS CDK image build pipeline. You can copy and paste it into your Harness Project.

This is how the stage would look in the UI:

<div align="center">
  <DocImage path={require('./static/cdk-build-push-2.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

<details>
<summary>Pipeline YAML</summary>

Parameters to change after you copy the pipeline YAML and paste it in your Harness Project:
- `projectIdentifier`, `orgIdentifier`, `environmentRef`, `infrastructureDefinitions`, `connectorRef` - docker-connector, `connectorRef` - k8s-connector.

```yaml
pipeline:
  projectIdentifier: your_project_identifier
  orgIdentifier: your_org_identifier
  tags: {}
  stages:
    - stage:
        identifier: cdk
        type: Deployment
        name: ckd
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
                          connectorRef: your_connector_identifier
                          image: docker:24.0-dind
                          shell: Sh
                          privileged: true
                    - step:
                        type: Run
                        name: Build and push
                        identifier: Run_2
                        spec:
                          connectorRef: your_connector_identifier
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
                        description: Build and push images for all rumtimes
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: your_connector_identifier
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
  identifier: cdk-build-push
  name: cdkbuildandpush
```
</details>

## Output Images

After a successful build, you will have four tagged images in your target Docker repository:  

- **Python:** `{TARGET_REPO}/harness-cdk-plugin:python-{VERSION}-{AWS_CDK_VERSION}-linux-{ARCH}`
- **Java:** `{TARGET_REPO}/harness-cdk-plugin:java-{VERSION}-{AWS_CDK_VERSION}-linux-{ARCH}`
- **DotNet:** `{TARGET_REPO}/harness-cdk-plugin:dotnet-{VERSION}-{AWS_CDK_VERSION}-linux-{ARCH}`
- **Go:** `{TARGET_REPO}/harness-cdk-plugin:go-{VERSION}-{AWS_CDK_VERSION}-linux-{ARCH}`

Each image will include the required runtime, the AWS CDK CLI, and the Harness plugin—ready for production use.
