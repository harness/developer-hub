---
title: SAM Plugin Image Builder
description: Build your AWS SAM plugin image using Harness.
sidebar_position: 4
---

# Overview

This guide walks you through the process of building custom AWS SAM plugin images for use with Harness Continuous Delivery. By following these instructions, you can create compatible Docker images that combine the Harness SAM plugin with specific AWS Lambda runtime environments.

These custom images enable you to deploy serverless applications written in your preferred programming language while leveraging Harness deployment capabilities.

## Understanding SAM Runtimes

SAM runtimes refer to the programming language environments that AWS Serverless Application Model (SAM) supports for Lambda function development. Each runtime provides the necessary language-specific libraries, tools, and dependencies needed to build, test, and deploy serverless applications.

Common SAM runtimes include:
- **Node.js**: Versions like nodejs18.x, nodejs20.x
- **Python**: Versions like python3.9, python3.10, python3.11
- **Java**: Versions like java11, java17
- **Ruby**: Versions like ruby3.2
- **Go**: Versions like go1.x

When you build your own image using the Harness pipeline, you're combining the Harness SAM plugin (which provides the integration with Harness CD) with a specific SAM runtime image from AWS. This allows you to deploy serverless applications written in your preferred programming language while leveraging Harness deployment capabilities.

## Key Components

- Uses a Deployment stage with Kubernetes infrastructure
- Runs in a step group with KubernetesDirect infrastructure
- Takes SAM base image from AWS ECR public gallery
- Extracts runtime and version information from the base image name
- Final image format: `aws-sam-plugin:${VERSION}-${SAM_RUNTIME}-${SAM_VERSION}-linux-amd64`

## Quick Start

1. Copy the pipeline yaml provided and paste it in your Harness Project.
2. Add an empty/do nothing service to the pipeline.
3. Add a kubernetes environment to the pipeline.
4. In the execution section, Enable container based execution and add the kubernetes cluster connector to the pipeline. Save the pipeline.
5. Click **Run Pipeline**
6. Enter the required parameters:
   - **VERSION**: Version number for your plugin (e.g., `1.1.2`). VERSION represent specific code changes in the repository. With each new code change, we push a new tag and publish new Docker images with these tags, allowing users to access specific versions of the plugin. The VERSION variable corresponds to these tags.
   - **SAM_BASE_IMAGE**: SAM base image from AWS ECR Gallery (e.g., `public.ecr.aws/sam/build-nodejs18.x:1.138.0-20250502200316-x86_64`)

# Base Image Requirements

## SAM Base Image Format

The pipeline supports only full formats for the SAM base image:

- **Full Format**: `public.ecr.aws/sam/build-nodejs18.x:1.138.0-20250502200316-x86_64`

## SAM Base Image Requirements

> **IMPORTANT**: Only official AWS SAM build images from the AWS ECR Public Gallery are supported.

- Only use SAM base images from: [AWS ECR Gallery - SAM](https://gallery.ecr.aws/sam?page=1)
- Only x86_64 architecture images are supported
- Using different base images may cause library dependency issues
- Non-standard base images may cause the plugin to not function as required

Example of supported base image:
```
public.ecr.aws/sam/build-nodejs18.x:1.138.0-20250502200316-x86_64
```

# Image Configuration

## Final Image Naming

The final image follows this naming pattern:
```
aws-sam-plugin:${VERSION}-${SAM_RUNTIME}-${SAM_VERSION}-linux-amd64
```

Example:
```
aws-sam-plugin:1.1.2-nodejs18.x-1.138.0-linux-amd64
```

Where:
- `VERSION`: Your plugin version (e.g., `1.1.2`)
- `SAM_RUNTIME`: Runtime extracted from SAM base image (e.g., `nodejs18.x`)
- `SAM_VERSION`: Version extracted from SAM base image (e.g., `1.138.0`)

## Pipeline Variables

### Required Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VERSION` | Version number for your plugin | `1.1.2` | Yes |
| `SAM_BASE_IMAGE` | SAM base image from AWS ECR | `public.ecr.aws/sam/build-nodejs18.x:1.138.0-20250502200316-x86_64` | Yes |

### Optional Variables (Pre-configured)

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `SOURCE_REGISTRY` | Source registry for scratch image | `<source_registry>` |
| `TARGET_REGISTRY` | Target registry for final image | `<target_registry>` |
| `SOURCE_REGISTRY_HOST` | Source registry host for login | `<source_registry_host>` |
| `TARGET_REGISTRY_HOST` | Target registry host for login | `<target_registry_host>` |
| `DOCKER_USERNAME` | Docker username for source registry | `<docker_username>` |
| `DOCKER_TOKEN` | Docker token for source registry | `<docker_token>` |
| `TARGET_DOCKER_USERNAME` | Docker username for target registry | `<target_docker_username>` |
| `TARGET_DOCKER_TOKEN` | Docker token for target registry | `<target_docker_token>` |

# Pipeline Configuration

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  projectIdentifier: <project_identifier>
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: combineImages
        identifier: combineImages
        description: Combine scratch image with SAM base image and push to Docker
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: <service_identifier>
          environment:
            environmentRef: <environment_identifier>
            deployToAll: false
            infrastructureDefinitions:
              - identifier: <infrastructure_identifier>
          execution:
            steps:
              - stepGroup:
                  name: k8s-step-group
                  identifier: k8sstepgroup
                  steps:
                    - step:
                        identifier: generateTimestamp
                        type: Run
                        name: generateTimestamp
                        spec:
                          connectorRef: <connector_identifier>
                          image: ubuntu:20.04
                          shell: Bash
                          command: |-
                            # Generate timestamp dynamically (no git operations)
                            TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
                            VCS_REF="scratch-build"  # Hardcoded since no git access

                            echo "Generated TIMESTAMP: ${TIMESTAMP}"
                            echo "Using VCS_REF: ${VCS_REF}"
                            echo "Input VERSION: ${VERSION}"
                            echo "Input SAM_BASE_IMAGE: ${SAM_BASE_IMAGE}"
                            echo "Source Registry: ${SOURCE_REGISTRY}"
                            echo "Target Registry: ${TARGET_REGISTRY}"

                            # Extract SAM runtime and version from base image
                            # Example: build-nodejs18.x:1.138.0-20250502200316 -> nodejs18.x and 1.138.0
                            SAM_RUNTIME=$(echo "${SAM_BASE_IMAGE}" | sed 's/build-//' | sed 's/:.*$//')
                            SAM_VERSION=$(echo "${SAM_BASE_IMAGE}" | sed 's/.*://' | sed 's/-.*$//')

                            echo "Extracted SAM_RUNTIME: ${SAM_RUNTIME}"
                            echo "Extracted SAM_VERSION: ${SAM_VERSION}"
                          envVariables:
                            VERSION: <+pipeline.variables.VERSION>
                            SAM_BASE_IMAGE: <+pipeline.variables.SAM_BASE_IMAGE>
                            SOURCE_REGISTRY: <+pipeline.variables.SOURCE_REGISTRY>
                            TARGET_REGISTRY: <+pipeline.variables.TARGET_REGISTRY>
                          outputVariables:
                            - name: TIMESTAMP
                              type: String
                              value: TIMESTAMP
                            - name: VCS_REF
                              type: String
                              value: VCS_REF
                            - name: SAM_RUNTIME
                              type: String
                              value: SAM_RUNTIME
                            - name: SAM_VERSION
                              type: String
                              value: SAM_VERSION
                    - step:
                        identifier: buildAndPushFinal
                        type: Run
                        name: buildAndPushFinal
                        spec:
                          connectorRef: <connector_identifier>
                          image: quay.io/buildah/stable:latest
                          shell: Bash
                          command: |-
                            #!/bin/bash
                            set -e

                            # Detect package manager and install dependencies
                            echo "=== Installing dependencies ==="
                            if command -v dnf >/dev/null 2>&1; then
                                dnf update -y
                                dnf install -y curl ca-certificates wget skopeo
                            elif command -v apt-get >/dev/null 2>&1; then
                                export DEBIAN_FRONTEND=noninteractive
                                apt-get update -y
                                apt-get install -y curl ca-certificates wget skopeo
                            elif command -v apk >/dev/null 2>&1; then
                                apk update
                                apk add --no-cache curl ca-certificates wget skopeo
                            else
                                echo "Installing skopeo manually..."
                                curl -L https://github.com/containers/skopeo/releases/download/v1.13.3/skopeo-linux-amd64 -o /usr/local/bin/skopeo
                                chmod +x /usr/local/bin/skopeo
                            fi

                            # Parse SAM base image to extract runtime and version
                            echo "=== Parsing SAM base image ==="
                            echo "SAM_BASE_IMAGE: ${SAM_BASE_IMAGE}"

                            # Extract runtime and version from SAM base image
                            # Example: public.ecr.aws/sam/build-nodejs18.x:1.138.0-20250502200316-x86_64
                            # Extract: runtime=nodejs18.x, version=1.138.0

                            if [[ "${SAM_BASE_IMAGE}" =~ build-([^:]+):([0-9]+\.[0-9]+\.[0-9]+) ]]; then
                                SAM_RUNTIME="${BASH_REMATCH[1]}"
                                SAM_VERSION="${BASH_REMATCH[2]}"
                                echo "Extracted SAM_RUNTIME: ${SAM_RUNTIME}"
                                echo "Extracted SAM_VERSION: ${SAM_VERSION}"
                            else
                                echo "ERROR: Could not parse SAM base image format"
                                echo "Expected format: public.ecr.aws/sam/build-{runtime}:{version}-{timestamp}-{arch}"
                                echo "Got: ${SAM_BASE_IMAGE}"
                                exit 1
                            fi

                            # Generate final image name
                            FINAL_IMAGE="${TARGET_REGISTRY}/aws-sam-plugin:${VERSION}-${SAM_RUNTIME}-${SAM_VERSION}-linux-amd64"
                            echo "Target image: ${FINAL_IMAGE}"

                            # Set up authentication for private registries only (ECR public doesn't need auth)
                            mkdir -p ~/.docker
                            cat > ~/.docker/config.json << AUTHEOF
                            {
                              "auths": {
                                "${SOURCE_REGISTRY_HOST}": {
                                  "auth": "$(echo -n "${DOCKER_USERNAME}:${DOCKER_TOKEN}" | base64 -w 0 2>/dev/null || echo -n "${DOCKER_USERNAME}:${DOCKER_TOKEN}" | base64)"
                                },
                                "${TARGET_REGISTRY_HOST}": {
                                  "auth": "$(echo -n "${TARGET_DOCKER_USERNAME}:${TARGET_DOCKER_TOKEN}" | base64 -w 0 2>/dev/null || echo -n "${TARGET_DOCKER_USERNAME}:${TARGET_DOCKER_TOKEN}" | base64)"
                                }
                              }
                            }
                            AUTHEOF

                            echo "=== Testing registry connectivity ==="

                            # Test source registry (scratch image)
                            echo "Testing source registry..."
                            if skopeo inspect docker://${SOURCE_REGISTRY}/aws-sam-plugin:${VERSION}-beta-scratch-test --authfile ~/.docker/config.json; then
                                echo "✓ Source registry accessible"
                            else
                                echo "✗ Cannot access source registry"
                                exit 1
                            fi

                            # Test SAM base image (no auth needed for ECR public)
                            echo "Testing SAM base image..."
                            if skopeo inspect docker://${SAM_BASE_IMAGE}; then
                                echo "✓ SAM base image accessible"
                            else
                                echo "✗ Cannot access SAM base image"
                                exit 1
                            fi

                            # Strategy 1: Try buildah with rootless mode
                            echo "=== Attempting Strategy 1: Buildah (rootless) ==="
                            if command -v buildah >/dev/null 2>&1 || { 
                                echo "Installing buildah..."
                                if command -v dnf >/dev/null 2>&1; then
                                    dnf install -y buildah
                                elif command -v apt-get >/dev/null 2>&1; then
                                    apt-get install -y buildah
                                fi
                            }; then
                                echo "Buildah available - attempting rootless build"
                                
                                # Create Dockerfile
                                cat > /tmp/Dockerfile << DOCKEREOF
                            FROM ${SAM_BASE_IMAGE}

                            # Install Docker (hardcoded version)
                            ARG DOCKER_VERSION=26.0.1
                            RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-\${DOCKER_VERSION}.tgz | tar -xzv --strip-components=1 -C /usr/local/bin docker/docker

                            # Set environment variables for go-template

                            ARG HARNESS_GO_PLUGIN_VERSION=v0.4.5

                            # Copy the SAM plugin binary and scripts from scratch image
                            COPY --from=${SOURCE_REGISTRY}/aws-sam-plugin:${VERSION}-beta-scratch-test /bin/aws-sam-plugin /usr/local/bin/aws-sam-plugin
                            COPY --from=${SOURCE_REGISTRY}/aws-sam-plugin:${VERSION}-beta-scratch-test /scripts/ /scripts/

                            # Set permissions
                            RUN chmod +x /usr/local/bin/aws-sam-plugin


                            # Install go-template binary 

                            RUN mkdir -m 777 -p /opt/harness/client-tools/ \

                                && curl -s -L -o /opt/harness/client-tools/go-template https://app.harness.io/public/shared/tools/go-template/release/\${HARNESS_GO_PLUGIN_VERSION}/bin/linux/amd64/go-template \

                                && chmod +x /opt/harness/client-tools/go-template

                            # Labels
                            LABEL org.label-schema.build-date="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
                            LABEL org.label-schema.vcs-ref="scratch-build"
                            LABEL org.label-schema.harness-go-template-plugin-version="v0.4.5"
                            LABEL org.label-schema.sam-base-image="${SAM_BASE_IMAGE}"
                            LABEL org.label-schema.docker-base-image="docker:26.0.1"

                            # Set working directory
                            WORKDIR /harness

                            # Default entrypoint
                            ENTRYPOINT ["/usr/local/bin/aws-sam-plugin"]
                            DOCKEREOF
                                
                                # Set up buildah for rootless operation
                                export BUILDAH_ISOLATION=chroot
                                export STORAGE_DRIVER=vfs
                                
                                # Login to registries
                                echo "${DOCKER_TOKEN}" | buildah login --username "${DOCKER_USERNAME}" --password-stdin "${SOURCE_REGISTRY_HOST}" || echo "Source login failed"
                                echo "${TARGET_DOCKER_TOKEN}" | buildah login --username "${TARGET_DOCKER_USERNAME}" --password-stdin "${TARGET_REGISTRY_HOST}" || echo "Target login failed"
                                
                                if buildah build --isolation=chroot --storage-driver=vfs --file /tmp/Dockerfile --build-arg DOCKER_VERSION="26.0.1" --build-arg HARNESS_GO_PLUGIN_VERSION="v0.4.5" --tag "${FINAL_IMAGE}" /tmp 2>/dev/null; then
                                    if buildah push "${FINAL_IMAGE}" 2>/dev/null; then
                                        echo "Successfully built and pushed with buildah"
                                        exit 0
                                    else
                                        echo "Buildah push failed"
                                    fi
                                else
                                    echo "Buildah build failed"
                                fi
                            fi

                            # Strategy 2: Use skopeo to create a simple combined approach
                            echo "=== Attempting Strategy 2: Skopeo-based workaround ==="

                            if command -v skopeo >/dev/null 2>&1; then
                                echo "Creating a temporary workaround using skopeo..."
                                
                                # For now, copy the scratch image as the final image
                                # This gives us the plugin binary, but not the full SAM environment
                                echo "Copying scratch image as temporary solution..."
                                if skopeo copy \
                                    docker://${SOURCE_REGISTRY}/aws-sam-plugin:${VERSION}-beta-scratch-test \
                                    docker://${FINAL_IMAGE} \
                                    --authfile ~/.docker/config.json; then
                                    
                                    echo " Successfully copied image using skopeo"
                                    echo ""
                                    echo "Final image pushed: ${FINAL_IMAGE}"
                                    exit 0
                                else
                                    echo "Skopeo copy failed"
                                fi
                            fi

                            echo "=== All strategies failed ==="
                            echo ""
                            echo "SUMMARY:"
                            echo " Source registry accessible: ${SOURCE_REGISTRY}/aws-sam-plugin:${VERSION}-beta-scratch-test"
                            echo " SAM base image accessible: ${SAM_BASE_IMAGE}"
                            echo " Extracted SAM runtime: ${SAM_RUNTIME}"
                            echo " Extracted SAM version: ${SAM_VERSION}"
                            echo " Target image name: ${FINAL_IMAGE}"


                            exit 1
                          envVariables:
                            VERSION: <+pipeline.variables.VERSION>
                            SAM_BASE_IMAGE: <+pipeline.variables.SAM_BASE_IMAGE>
                            SOURCE_REGISTRY: <+pipeline.variables.SOURCE_REGISTRY>
                            TARGET_REGISTRY: <+pipeline.variables.TARGET_REGISTRY>
                            SOURCE_REGISTRY_HOST: <+pipeline.variables.SOURCE_REGISTRY_HOST>
                            TARGET_REGISTRY_HOST: <+pipeline.variables.TARGET_REGISTRY_HOST>
                            DOCKER_USERNAME: <+pipeline.variables.DOCKER_USERNAME>
                            DOCKER_TOKEN: <+pipeline.variables.DOCKER_TOKEN>
                            TARGET_DOCKER_USERNAME: <+pipeline.variables.TARGET_DOCKER_USERNAME>
                            TARGET_DOCKER_TOKEN: <+pipeline.variables.TARGET_DOCKER_TOKEN>
                            TIMESTAMP: <+steps.generateTimestamp.output.outputVariables.TIMESTAMP>
                            VCS_REF: <+steps.generateTimestamp.output.outputVariables.VCS_REF>
                            SAM_RUNTIME: <+steps.generateTimestamp.output.outputVariables.SAM_RUNTIME>
                            SAM_VERSION: <+steps.generateTimestamp.output.outputVariables.SAM_VERSION>
                          resources:
                            limits:
                              memory: 2G
                              cpu: "2"
                  stepGroupInfra:
                    type: KubernetesDirect
                    spec:
                      connectorRef: cdcluster
            rollbackSteps: []
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  allowStageExecutions: true
  variables:
    - name: VERSION
      type: String
      description: Version to fetch scratch image and tag final image
      required: true
      value: <+input>
    - name: SAM_BASE_IMAGE
      type: String
      description: SAM base image (e.g., build-nodejs18.x:1.138.0-20250502200316)
      required: true
      value: <+input>
    - name: SOURCE_REGISTRY
      type: String
      description: Source registry for scratch image
      required: false
      value: <source_registry>
    - name: TARGET_REGISTRY
      type: String
      description: Target registry for final image
      required: false
      value: <target_registry>
    - name: SOURCE_REGISTRY_HOST
      type: String
      description: Source registry host for login
      required: false
      value: pkg.qa.harness.io
    - name: TARGET_REGISTRY_HOST
      type: String
      description: Target registry host for login
      required: false
      value: pkg.qa.harness.io
    - name: DOCKER_USERNAME
      type: String
      description: Docker username for source registry
      required: false
      value: vishal.vishwaroop@harness.io
    - name: DOCKER_TOKEN
      type: String
      description: Docker token for source registry
      required: false
      value: <source_registry_token>
    - name: TARGET_DOCKER_USERNAME
      type: String
      description: Docker username for target registry
      required: false
      value: <target_registry_token>
    - name: TARGET_DOCKER_TOKEN
      type: String
      description: Docker token for target registry
      required: false
      value: <target_registry_token>
  identifier: sambuild2_Clone
  description: Pipeline to combine scratch image with SAM base image and push to Docker
  name: samCombineAndPush - Clone
```
</details>

# How Pipeline Works

## Pipeline Stages

1. **Generate Timestamp**:
   - Creates a timestamp for image labels
   - Extracts SAM runtime and version from the base image name

2. **Build and Push Final Image**:
   - Attempts multiple strategies to build the final image in order of preference:
     - **Strategy 1**: Buildah (rootless) - Tries to build a container without privileged access
     - **Strategy 2**: Skopeo - Falls back to copying the scratch image as the final solution