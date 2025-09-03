---
title: What's Supported by Harness DB DevOps
description: Explore supported database platforms, source control providers, and feature flags available in Harness DB DevOps.
sidebar_label: What's supported
sidebar_position: 2
keywords:
  - supported databases
  - dbops compatibility
  - harness db devops support
  - supported scm providers
  - feature flags
  - harness platform support
  - early access features
  - database devops
  - harness dbops
tags:
  - harness-db-devops
  - supported-platforms
  - compatibility
  - feature-flags
  - database-support
---

This page describes supported platforms and technologies for Harness DB DevOps specifically.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](https://developer.harness.io/docs/platform/platform-whats-supported).

## Harness DB DevOps supported platforms and technologies

Harness Database DevOps currently supports several database platforms, including:

1. **Oracle**
2. **MongoDB**
3. **Microsoft SQL Server**
4. **PostgreSQL**
5. **MySQL**
6. **Google Cloud Spanner**
7. **CockroachDB**

It's worth noting that **MongoDB** is a NoSQL database which brings some limitations to your experience of Harness DB DevOps if this is your database of choice. 

One of the limitations being: 

 - You cannot enforce policy against SQL initially. 

Additionally, for sources to read the change log from, Harness Database DevOps supports:

- **Git**
- **GitHub**
- **BitBucket**
- **GitLab**
- **Azure Repo**
- **Artifactory Registry**

These platforms allow users to manage database changes effectively within their pipelines, integrating database operations with application code management.

## Harness DB DevOps features

Some Harness DB DevOps features are released behind feature flags to get feedback from a subset of customers before releasing the features to general availability.

You can opt-in to the early access features for Harness DB DevOps described in the following table. Contact [Harness Support](mailto:support@harness.io) to enable specific early access features in your Harness account. Include the feature flag or name with your request.

For more information about early access features, including early access features for the Harness Platform, delegate, and other Harness modules, go to [Early access features](/release-notes/early-access).


| Flag | Description |
| ---  | ----------- |
| `CDS_CONTAINER_STEP_DELEGATE_SELECTOR_PRECEDENCE` | Enable to avoid any impact to your [Database DevOps environments](/docs/database-devops/get-started/onboarding-guide.md). |
| `DBOPS_ENABLED` | Enable to access Harness Database DevOps in your environment. |
| `CDS_EXECUTION_LIST_CARD_VIEW` | Enable to access details of schemas applied to instances in Harness Pipeline execution list in your environment. |
