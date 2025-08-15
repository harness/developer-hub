---
title: Customer-deployed Components
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-optional-infra/running-evaluator-proxy-synchronizer-k8/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-optional-infra/
---

## Overview

Customer-deployed components let you run parts of the Harness FME infrastructure within your own environment.  

This gives you more control over data flow, network latency, and compliance by hosting core services locally or in your private cloud.

By deploying one or more of these components, you can:

- Meet strict data residency or security requirements
- Reduce latency by keeping evaluation close to your users or services
- Integrate FME into custom delivery architectures or service meshes
- Manage SDK connections and feature flag evaluations without direct client-to-cloud communication

## Running the Split Evaluator, Split Proxy, or Split Synchronizer with Kubernetes

Harness FME provides three containerized applications that can be run on your own infrastructure. These apps can handle specific use cases for feature flagging and experimentation with our SDKs and APIs.

Learn more by reading the [Kubernetes and Split blog post](https://www.harness.io/blog/kubernetes-and-split), which provides architectural diagrams and sample configuration files to run the Split Evaluator, Split Proxy, and Split Synchronizer in Kubernetes.

## Get started

Select a component you want to deploy.

| **Component** | **Links** |
| --- | --- |
| Split Daemon (`splitd`) | [Docs](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-daemon-splitd), [GitHub](https://github.com/splitio/splitd) |
| Split Evaluator | [Docs](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-evaluator/), [GitHub](https://github.com/splitio/evaluator) |
| Split Proxy | [Docs](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-proxy/), [GitHub](https://github.com/splitio/split-synchronizer) |
| Split Synchronizer | [Docs](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-synchronizer/), [GitHub](https://github.com/splitio/split-synchronizer) |
| Split JavaScript Synchronizer Tools | [Docs](https://developer.harness.io/docs/feature-management-experimentation/sdks-and-infrastructure/optional-infra/split-javascript-synchronizer-tools/), [GitHub](https://github.com/splitio/javascript-sync-tools) |
