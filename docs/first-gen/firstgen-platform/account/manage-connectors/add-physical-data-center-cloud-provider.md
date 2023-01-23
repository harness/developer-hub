---
title: Add Physical Data Center as Cloud Provider
description: Connect your physical data center as a cloud provider where you will deploy your services using Harness.
# sidebar_position: 2
helpdocs_topic_id: stkxmb643f
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Connect your physical data center as a cloud provider where you will deploy your services using Harness.

You add cloud providers to your Harness Account and then reference them when defining deployment environments.

In this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Add the Cloud Provider](#step-1-add-the-cloud-provider)
* [Step 2: Display Name](#step-2-display-name)
* [Artifact Support for Download and Copy](#artifact-support-for-download-and-copy)

## Before You Begin

* See [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md).

## Step 1: Add the Cloud Provider

To add a cloud provider to your Harness account, do the following:

1. Click **Setup**, and then click **Cloud Providers**.
2. Click **Add Cloud Provider** and select **Physical Data Center**.

The **Add Physical Data Center Cloud Provider** panel appears.

## Step 2: Display Name

Enter a unique **Display Name**.

For a Physical Data Center Cloud Provider, no credentials are required. Instead, you add an SSH secret in Harness Secrets Management, and select that later in your Harness Environment in **Connection Attributes**. For more information, see [Secrets Management](../../security/secrets-management/secret-management.md).

## Artifact Support for Download and Copy

See [Service Types and Artifact Sources](../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md).

