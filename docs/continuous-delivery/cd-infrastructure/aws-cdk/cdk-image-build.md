---
title: AWS CDK Image Builder
description: Build production-ready Docker images for the AWS CDK plugin across multiple runtime environments.
tags: 
  - aws-cdk-plugin
  - plugin-builder
sidebar_position: 2
---

## Overview

The AWS CDK Plugin Image Builder is a Harness CI/CD pipeline designed to create production-ready Docker images for the AWS CDK plugin across multiple runtime environments. This pipeline combines pre-built CDK plugin binaries with runtime-specific base images to produce optimized container images for Python, Java, .NET, and Go environments.

## Runtime Image Build and Push

- Pulls base plugin image from [Harness CDK repo](https://hub.docker.com/r/harness/aws-cdk-plugin/tags)
- Builds runtime images per language with:
  - OS base: `node:20-alpine3.16` for supported Node.js version.
  - Copy plugin binary and scripts from base image.
  - Install language runtimes, `git`, and AWS CDK CLI.
  - Set executable permissions and entrypoint script.
- Tags runtime images as:  
  `harness/aws-cdk-plugin:<VERSION>-<RUNTIME>-<AWS_CDK_VERSION>-linux-<ARCH>`

**Runtime Images Include:**

| Runtime | Key Components Installed                          |
| ------- | ------------------------------------------------ |
| Python  | Python3, pip, bash, curl, git, Node.js 20, CDK CLI |
| Java    | OpenJDK 11, Maven 3.9.11, bash, curl, git, Node.js 20, CDK CLI |
| Dotnet  | .NET dependencies, bash, icu-libs, git, Node.js 20, CDK CLI |
| Go      | Bash, curl, git, Node.js 20, CDK CLI             |


## Initial Pipeline Configuration

Before running the pipeline for the first time, ensure the following configuration is in place:

- **Service and Environment**: Create and configure the Kubernetes service and environment in Harness, specifying correct references.
- **Connectors**: Define and configure connector references for Docker registries (`account.dockerhub` or your own), Kubernetes clusters, and Git repositories.
- **Step Group Connector**: Set up step group connectors for executing pipeline steps with appropriate permissions.
- **Secrets and Variables**: Populate required secret variables such as Docker registry credentials and Git tokens securely in Harness secrets management.
- **Pipeline Variables**: Set pipeline variables like `VERSION`, `AWS_CDK_VERSION`, `ARCH`, and `TARGET_REPO` with appropriate default values or CI/CD inputs.


### Checking and Using the Latest AWS CDK CLI Version

The pipeline installs the AWS CDK CLI version specified by the variable `AWS_CDK_VERSION`. To use the latest stable version, check the official npm page:

- [AWS CDK Toolkit CLI - NPM](https://www.npmjs.com/package/aws-cdk)

## Quick Start

1. Copy the pipeline yaml provided and paste it in your Harness Project.
2. Add an empty/do nothing service to the pipeline.
3. Add a kubernetes environment to the pipeline.
4. In the execution section, Enable container based execution and add the kubernetes cluster connector to the pipeline. Save the pipeline.
5. Click **Run Pipeline**
6. Enter the required parameters:
   - **VERSION**:  Version number of Harness base image (e.g., `1.4.0`). VERSION represent specific code changes in the Harness repository. With each new code change, we push a new tag and publish new Docker images with these tags, allowing users to access specific versions of the plugin. The VERSION variable corresponds to these tags.
   - **AWS_CDK_VERSION**: AWS CDK version to install (default: `2.1016.1`)
   - **ARCH**: Target architecture (`amd64` or `arm64`)

### Environment Variables

| Variable         | Description                        | Example                   |
| ---------------- | -------------------------------- | ------------------------- |
| `VERSION`        | Plugin version without prefix     | `1.4.0`                   |
| `AWS_CDK_VERSION`| AWS CDK CLI version to install    | `2.1016.1`                |
| `ARCH`           | Architecture for image build      | `amd64` or `arm64`        |
| `TARGET_REPO`    | Docker repository                 | `harness/aws-cdk-plugin`  |
| `DOCKER_USERNAME`| Docker registry username          | `vishalav95`              |
| `DOCKER_PASSWORD`| Docker registry token/password    | *(kept secret)*           |

### Build Process

The pipeline performs the following steps for each runtime:

1. **Authentication Setup**: Creates Docker config for registry authentication
2. **Dockerfile Generation**: Dynamically creates a Dockerfile with:
   - Multi-stage build starting with the scratch image
   - Runtime-specific base image
   - CDK plugin binary copied from scratch image
   - Runtime-specific package installations
   - Node.js and npm installation
   - AWS CDK installation
   - Metadata labels and entrypoint configuration
3. **Image Build and Push**: Uses Docker to build and push the final image

### Pipeline YAML 

This pipeline helps you build custom serverless plugin images using Harness, enabling integration of the Harness plugin with supported AWS Lambda runtimes. The pipeline YAML is available below.

<details>
<summary>Pipeline YAML</summary>

Parameters you need to change:

- `projectIdentifier`: Your Harness project identifier
- `orgIdentifier`: Your Harness organization identifier
- `connectorRef`: Your Kubernetes cluster connector identifier
- `your_k8s_connector`: Your Kubernetes cluster connector identifier

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
      value: <+input>.default(2.1016.1)
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

The pipeline produces four runtime-specific images:

1. **Python Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:python-{VERSION}-linux-{ARCH}`
2. **Java Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:java-{VERSION}-linux-{ARCH}`
3. **DotNet Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:dotnet-{VERSION}-linux-{ARCH}`
4. **Go Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:go-{VERSION}-linux-{ARCH}`