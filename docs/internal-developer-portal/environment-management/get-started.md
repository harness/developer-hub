---
title: Get Started with Environment Management
description: Get Started with Environment Management in Harness IDP. 
sidebar_label: Get Started
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

:::info
**Harness IDP Environment Management** feature is currently behind the feature flag `IDP_SSEM`. Contact [Harness Support](mailto:support@harness.io) to enable this feature flag.
:::

Welcome to getting started with **Environment Management**. This document will take you through the environment management capabilities in Harness IDP. To understand the core features and key concepts of environment management in IDP, go to [Overview & Key Concepts](/docs/internal-developer-portal/environment-management/overview.md).

An environment is a collection of software services deployed using CD and executed on infrastructure provisioned through IaCM. Environment Management gives **developers** a self-service way to create and manage environments, while **platform engineers** define the standards behind them. Together, all these modules ensure every environment is consistent, secure, and easy to use. 

![](./static/user-journey.png)

## Prerequisites

Before you begin, ensure you have the following prerequisites setup: 

- A Kubernetes cluster
- Harness Delegates installed on the cluster. In order to read outputs, the Harness Delegate must have jq installed.
- Cloud and Kubernetes connectors created in Harness using the installed Delegates.
- Git Connector to read terraform files for IaCM. Ensure you check “Enable API Access” in the connector settings.
- CD, IaCM and IDP modules enabled in your account.
- The following feature flags for your Harness account are required to be enabled (we can enable this for you)
    - IDP_SSEM
    - IDP_2_0
    - PIPE_DYNAMIC_PIPELINES_EXECUTION
    - IACM_1984_WORKSPACE_TEMPLATES
- Set “Enable Pipeline Dynamic Executions” to True in Account Settings -> Default Settings -> Pipeline 
- Ensure Harness Secret Manager is NOT disabled in your account. SSEM uses the Harness secret manager to store some system-generated keys. Docs
- A new Harness project where you have Project Admin role assigned, where you can create all the necessary Harness resources.

## Get Started

### Provision Infrastructure in IaCM

### Create Services in CD

### Configure Environments in IDP

