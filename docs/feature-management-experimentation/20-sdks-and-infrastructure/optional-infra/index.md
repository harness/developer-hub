---
title: Customer-deployed Components
redirect_from:
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-optional-infra/running-evaluator-proxy-synchronizer-k8/
  - /docs/feature-management-experimentation/sdks-and-infrastructure/faqs-optional-infra/
---

## Overview

Customer-deployed components allow you run parts of the Harness FME infrastructure within your own environment.  

This gives you more control over data flow, network latency, and compliance by hosting core services locally or in your private cloud.

By deploying one or more of these components, you can:

- Meet strict data residency or security requirements
- Reduce latency by keeping evaluation close to your users or services
- Integrate FME into custom delivery architectures or service meshes
- Manage SDK connections and feature flag evaluations without direct client-to-cloud communication

## Running the Split Evaluator, Split Proxy, or Split Synchronizer with Kubernetes

Harness FME provides three containerized applications that can be run on your own infrastructure. These apps can handle specific use cases for feature flagging and experimentation with our SDKs and APIs. 

For architectural diagrams and sample configuration files to run the Split Evaluator, Split Proxy, and Split Synchronizer in Kubernetes, see the [Kubernetes and Split blog post](https://www.harness.io/blog/kubernetes-and-split).

import { Section, optionalInfra } from '@site/src/components/Docs/data/fmeSDKSData';

## Get started

Select a component you want to deploy.

<Section items={optionalInfra} />