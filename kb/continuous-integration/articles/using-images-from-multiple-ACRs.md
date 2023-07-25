---
description: KB - Using Images from multiple ACRs 
---
# If you have multiple ACRs then how you can configure or use images from different ACR?

## Introduction

The harness does not have its own built-in container image registry to store and host container images. Instead, Harness relies on external container image registries, such as Docker Hub, Amazon Elastic Container Registry (ECR), Google Container Registry (GCR), or Azure Container Registry (ACR), to pull images during the deployment process.

When deploying applications using Harness, you typically need to specify the image repository and tag for each service or microservice you want to deploy. Harness then pulls the specified images from the container image registry (e.g., Docker Hub, ECR, GCR, ACR) and deploys them to your target environment.

More information on this here: https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-acr

## Problem statement

If you have multiple ACRs then how you can configure or use images from different ACR?

## Steps to achieve this usecase
The image overrides impact only the initialise step which creates the build pods with the ootb plugin images. 
 
```
Steps to follow:
1. Create a new connector using the same details as the default HarnessImage connector - Harness External Images
2. Modify the default HarnessImage connector to point to the internal container registry
3. Pin the images with their repository path (excluding the registry name) as the customer config
4. All pipelines will still pull from the correct container registry and the override would only be to override when/where needed
5. Pulling new images will need to come from the Harness External Images connector
```

This is how you can configure or use images from different ACR.