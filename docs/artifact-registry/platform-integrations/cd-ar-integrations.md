---
title: Artifact Registry and Continuous Delivery
description: Deep dive into the native integrations between the Artifact Registry and Continuous Delivery module.
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
  - Deploy generic artifacts to AWS Lambda.
  - aws lambda deployment with har
  - artifact traceability and deployments
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DynamicMarkdownSelector from '@site/src/components/DynamicMarkdownSelector/DynamicMarkdownSelector';

Learn how to use Artifact Registry with the Continuous Delivery (CD) module to simplify artifact management, ensure traceability, and streamline deployments—especially for use cases like deploying generic artifacts to serverless platforms.

:::info Why Integrate Artifact Registry with Continuous Delivery?
Integrating Harness Artifact Registry (HAR) with CD enables you to:
- Store and version deployment artifacts in a central, secure location.
- Deploy artifacts to various platforms including serverless (AWS Lambda) and container orchestration (Kubernetes).
- Maintain traceability from artifact creation to deployment.
- Simplify management of deployment assets across environments.
:::

## Supported CD Steps
Artifact Registry is supported as a native artifact source in select CD steps. Currently supported:
- **AWS Lambda**.
- **Kubernetes**.
<!-- Placeholder: More supported CD steps will be added here as they become available. -->

## Integration Guides

<DynamicMarkdownSelector
  options={{
    'AWS Lambda': {
      path: '/artifact-registry/platform-integrations/content/supported/aws-lambda.md',
      logo: 'aws-logo.svg',
      logoSize: 24
    },
    'Kubernetes': {
      path: '/artifact-registry/platform-integrations/content/supported/kubernetes.md',
      logo: 'kubernetes.svg',
      logoSize: 24
    }
  }}
precedingHeadingID="integration-guides"
  disableSort={true}
  toc={toc}
/>


