---
title: Artifact Registry and Continuous Delivery
description: Learn how Harness Artifact Registry integrates with Continuous Delivery pipelines for artifact storage, management, and deployment across your software delivery lifecycle.
sidebar_position: 10
sidebar_label: Continuous Delivery
tags:
  - artifact-registry
  - har
  - cd
  - integrations
  - kubernetes
  - aws-lambda
keywords:
  - harness artifact registry integrations
  - continuous delivery with artifact registry
  - deploy docker artifacts to Kubernetes
  - deploy generic artifacts to AWS Lambda
  - aws lambda deployment with har
  - artifact traceability and deployments
---

import DocImage from '@site/src/components/DocImage';

Harness Artifact Registry (HAR) integrates with Harness Continuous Delivery (CD) pipelines, enabling you to store, manage, and deploy artifacts across your software delivery lifecycle. This integration provides a unified experience for artifact management and deployment, ensuring traceability from build to production.

---

## Before you begin

Make sure you have the following:

- **Harness account** with both Artifact Registry and Continuous Delivery modules enabled.
- **Artifacts stored in HAR:** Go to [Create a registry](/docs/artifact-registry/manage-registries/create-registry) to set up your registry and push artifacts.
- **CD pipeline:** Go to [CD overview](/docs/continuous-delivery/get-started/cd-pipeline-basics) to understand pipeline fundamentals.

---

## Supported CD swimlanes

Harness Artifact Registry works with a wide range of CD swimlanes. Go to [CD integrations](/docs/continuous-delivery/cd-integrations) to view the complete list of supported swimlanes and artifact types.

---

## Configure CD services with Harness Artifact Registry

Once you have artifacts stored in your Harness Artifact Registry, configure your CD services to use HAR as the artifact source:

1. In your CD service configuration, select **Harness Artifact Registry** as the artifact source.
2. Specify the registry and repository details.
3. Define your artifact selection criteria (tags, versions, or latest).

Once configured, your service is ready to be deployed. The CD pipeline automatically fetches artifacts from HAR during execution.

Go to [Use artifacts from Harness Artifact Registry](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#use-artifacts-from-harness-artifact-registry) to follow detailed step-by-step instructions on configuring services.

---

## Deployment workflow

Once your CD service is configured with Harness Artifact Registry, the deployment pipeline automatically authenticates with HAR, pulls the specified artifact version, and deploys it to your target environment.

<DocImage path={require('./static/cd-deploy.png')} />

---

## Benefits of HAR and CD integration

The native integration between HAR and CD provides several advantages:

- **Unified platform experience:** Consistent authentication, permissions, and audit logging across artifact management and deployment workflows.
- **Automated artifact selection:** Configure pipelines to automatically select artifact versions based on tags, labels, or runtime inputs.
- **Security and compliance:** Ensure only approved artifacts are deployed with built-in access controls and audit trails.

---

## Next steps

After configuring your CD services with Harness Artifact Registry:

- Go to [CD integrations](/docs/continuous-delivery/cd-integrations) to review supported swimlanes and deployment types.
- Go to [Artifact sources in CD services](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#use-artifacts-from-harness-artifact-registry) to configure artifact sources for your pipelines.
- Go to [Artifact Registry best practices](/docs/artifact-registry/ar-best-practices) to optimize your registry configuration.
