---
title: AWS CDK Image Builder
description: Build production-ready Docker images for the AWS CDK plugin across multiple runtime environments.
sidebar_position: 7
---

#### Introduction

The AWS CDK Plugin Image Builder is a Harness CI/CD pipeline designed to create production-ready Docker images for the AWS CDK plugin across multiple runtime environments. This pipeline combines pre-built CDK plugin binaries with runtime-specific base images to produce optimized container images for Python, Java, .NET, and Go environments.

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

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  projectIdentifier: <project_identifier>
  orgIdentifier: <org_identifier>
  tags:
    GitOps: ""
    Owner: CDS
  stages:
    - stage:
        name: CombineAndPushImages
        identifier: CombineAndPushImages
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: <service_identifier>
          environment:
            environmentRef: <environment_identifier>
            infrastructureDefinitions:
              - identifier: <infrastructure_identifier>
          execution:
            steps:
              - stepGroup:
                  name: BuildAllRuntimes
                  identifier: BuildAllRuntimes
                  steps:
                    - step:
                        type: Run
                        name: buildAndPushCDKImages
                        identifier: buildAndPushCDKImages
                        spec:
                          connectorRef: <connector_identifier>
                          image: gcr.io/kaniko-project/executor:debug
                          shell: Sh
                          command: |-
                            #!/bin/sh
                            set -e

                            # Set up variables
                            VERSION="<+pipeline.variables.VERSION>"
                            AWS_CDK_VERSION="<+pipeline.variables.AWS_CDK_VERSION>"
                            ARCH="<+pipeline.variables.ARCH>"

                            # Hardcoded registry URLs and credentials
                            SOURCE_REGISTRY=<pipeline.variables.SOURCE_REGISTRY>
                            TARGET_REGISTRY=<+pipeline.variables.REGISTRY_URL>
                            REGISTRY_USERNAME=<+pipeline.variables.REGISTRY_USERNAME>
                            REGISTRY_PASSWORD=<pipeline.variables.REGISTRY_PASSWORD>

                            # Get runtime info from matrix
                            IMAGE_TAG_PREFIX="<+matrix.CDK_RUNTIME_COMBINATIONS.IMAGE_TAG_PREFIX>"
                            BASE_IMAGE="<+matrix.CDK_RUNTIME_COMBINATIONS.BASE_IMAGE>"

                            SCRATCH_IMAGE="${SOURCE_REGISTRY}/base-scratch-test-${ARCH}:${VERSION}"
                            TARGET_IMAGE="${TARGET_REGISTRY}/harness-cdk-plugin:${IMAGE_TAG_PREFIX}-${VERSION}-linux-${ARCH}"
                            TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

                            # Create authentication config for Kaniko
                            mkdir -p /kaniko/.docker
                            AUTH_STRING=$(echo -n "${REGISTRY_USERNAME}:${REGISTRY_PASSWORD}" | base64 -w 0)

                            cat > /kaniko/.docker/config.json << EOF
                            {
                              "auths": {
                                "pkg.qa.harness.io": {
                                  "username": "${REGISTRY_USERNAME}",
                                  "password": "${REGISTRY_PASSWORD}",
                                  "auth": "${AUTH_STRING}"
                                }
                              }
                            }
                            EOF

                            # Create Dockerfile with proper runtime handling
                            cat > /kaniko/Dockerfile << EOF
                            FROM ${SCRATCH_IMAGE} AS scratch-content
                            EOF

                            # Add runtime-specific multi-stage builds if needed
                            case ${IMAGE_TAG_PREFIX} in
                              "go")
                                cat >> /kaniko/Dockerfile << 'EOF'
                            FROM golang:1.22-alpine AS go-runtime
                            EOF
                                ;;
                            esac

                            cat >> /kaniko/Dockerfile << EOF
                            ARG BASE_IMAGE=${BASE_IMAGE}
                            FROM \${BASE_IMAGE}

                            # Copy the CDK plugin binary from correct location in scratch image
                            COPY --from=scratch-content /opt/harness/plugin /usr/local/bin/harness-cdk-plugin
                            RUN chmod +x /usr/local/bin/harness-cdk-plugin

                            # Install Node.js and npm first (essential for CDK)
                            RUN apk add --no-cache nodejs npm

                            # Verify Node.js installation
                            RUN node --version && npm --version
                            EOF

                            # Add runtime-specific configurations
                            case ${IMAGE_TAG_PREFIX} in
                              "python")
                                cat >> /kaniko/Dockerfile << 'EOF'
                            # Python runtime setup
                            RUN apk add --update --no-cache python3 py3-pip
                            RUN pip3 install --upgrade pip
                            EOF
                                ;;
                              "java")
                                cat >> /kaniko/Dockerfile << 'EOF'
                            # Java runtime setup
                            RUN apk add --no-cache openjdk11-jre curl
                            RUN java -version
                            ARG MAVEN_VERSION=3.9.11
                            RUN curl -LO https://dlcdn.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
                                && tar -xzf apache-maven-${MAVEN_VERSION}-bin.tar.gz -C /usr/local \
                                && rm apache-maven-${MAVEN_VERSION}-bin.tar.gz
                            ENV PATH=/usr/local/apache-maven-${MAVEN_VERSION}/bin:$PATH
                            RUN mvn -v
                            EOF
                                ;;
                              "dotnet")
                                cat >> /kaniko/Dockerfile << 'EOF'
                            # .NET runtime setup
                            RUN apk add --no-cache bash icu-libs krb5-libs libgcc libintl libssl1.1 libstdc++ zlib
                            RUN apk add --no-cache libgdiplus --repository https://dl-3.alpinelinux.org/alpine/edge/testing/
                            EOF
                                ;;
                              "go")
                                cat >> /kaniko/Dockerfile << 'EOF'
                            # Go runtime setup
                            COPY --from=go-runtime /usr/local/go/ /usr/local/go/
                            ENV PATH="/usr/local/go/bin:$PATH"
                            RUN go version
                            EOF
                                ;;
                            esac

                            # Install AWS CDK and finalize - ensure npm is still available
                            cat >> /kaniko/Dockerfile << EOF

                            # Verify npm is still available and install AWS CDK
                            RUN which npm && npm --version
                            RUN npm install -g aws-cdk@${AWS_CDK_VERSION}
                            RUN cdk --version

                            LABEL org.label-schema.build-date="${TIMESTAMP}"
                            LABEL org.label-schema.vcs-ref="cdk-build"
                            LABEL org.label-schema.runtime="${IMAGE_TAG_PREFIX}"
                            LABEL org.label-schema.cdk-version="${AWS_CDK_VERSION}"

                            ENTRYPOINT ["/usr/local/bin/harness-cdk-plugin"]
                            EOF

                            echo "=== Generated Dockerfile ==="
                            cat /kaniko/Dockerfile

                            echo "=== Building and pushing image with Kaniko ==="
                            /kaniko/executor \
                              --dockerfile=/kaniko/Dockerfile \
                              --context=/kaniko \
                              --destination="${TARGET_IMAGE}" \
                              --build-arg BASE_IMAGE="${BASE_IMAGE}" \
                              --cache=false \
                              --cleanup

                            echo "Successfully built and pushed: ${TARGET_IMAGE}"
                        strategy:
                          matrix:
                            CDK_RUNTIME_COMBINATIONS:
                              - DOCKERFILE_NAME: Dockerfile-python
                                IMAGE_TAG_PREFIX: python
                                BASE_IMAGE: alpine:3.18
                              - DOCKERFILE_NAME: Dockerfile-java
                                IMAGE_TAG_PREFIX: java
                                BASE_IMAGE: alpine:3.18
                              - DOCKERFILE_NAME: Dockerfile-dotnet
                                IMAGE_TAG_PREFIX: dotnet
                                BASE_IMAGE: alpine:3.18
                              - DOCKERFILE_NAME: Dockerfile-go
                                IMAGE_TAG_PREFIX: go
                                BASE_IMAGE: alpine:3.18
                          maxConcurrency: 2
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: <connector_identifier>
                      privileged: false
                      resources:
                        limits:
                          memory: 4Gi
                          cpu: "1"
            rollbackSteps: []
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  variables:
    - name: VERSION
      type: String
      description: Version of the plugin
      required: true
      value: <+input>
    - name: AWS_CDK_VERSION
      type: String
      description: AWS CDK version to install
      required: true
      value: <+input>.default(2.1016.1)
    - name: ARCH
      type: String
      description: Architecture to build for
      required: true
      value: <+input>.default(amd64).allowedValues(amd64,arm64)
    - name: REGISTRY_URL
      type: String
      description: Target registry URL
      required: true
      value: your registry url
    - name: REGISTRY_USERNAME
      type: String
      description: Registry username
      required: true
      value: your registry username
    - name: REGISTRY_PASSWORD
      type: String
      description: Registry password
      required: true
      value: your pat token
    - name: SOURCE_REGISTRY
      type: String
      description: ""
      required: false
      value: Harness-source-registry
  identifier: cdkplugin_combine_and_push
  name: CDK Plugin - Combine and Push Images

```

</details>

## Pipeline Variables

The pipeline uses various types of variables to control the build process:

| Variable | Description | Default |
|----------|-------------|---------|
| `VERSION` | Version number for your plugin | - |
| `AWS_CDK_VERSION` | AWS CDK version to install | `2.1016.1` |
| `ARCH` | Target architecture | `amd64` |
| `SOURCE_REGISTRY` | Source registry for scratch images | Harness Public Docker Registry |
| `REGISTRY_URL` | Target registry URL | Your private registry url where you want these images to be pushed |
| `REGISTRY_USERNAME` | Registry username | Your private registry username |
| `REGISTRY_PASSWORD` | Registry password | Your private registry password |

### Variable Usage

- **Pipeline Variables**: Define core configuration like version, architecture, and registry settings
- **Matrix Variables**: Enable parallel building of multiple runtime images with specific configurations
- **Script Variables**: Constructed within the build script to create image names and paths

## Build Process

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
3. **Image Build and Push**: Uses Kaniko to build and push the final image

## Output Images

The pipeline produces four runtime-specific images:

1. **Python Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:python-{VERSION}-linux-{ARCH}`
2. **Java Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:java-{VERSION}-linux-{ARCH}`
3. **DotNet Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:dotnet-{VERSION}-linux-{ARCH}`
4. **Go Runtime**: `{Target_REGISTRY_URL}/harness-cdk-plugin:go-{VERSION}-linux-{ARCH}`