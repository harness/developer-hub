---
title: Manage Self Hosted Gitspaces
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 5
sidebar_label: Manage Self Hosted Gitspaces
---

Once you have configured your infrastructure and established a healthy connection between the **Harness Control Plane** and the **Harness Delegate**, you are all set to create and manage your **Self Hosted Gitspaces**.

## Prerequisites

1. Ensure you have completed all the necessary steps to get started with Self Hosted Gitspaces. Refer to [Fundamentals of Self Hosted Gitspaces](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md#get-started-with-self-hosted-gitspaces) for a detailed walkthrough.

2. Verify that the **Gateway Group Health** status for the added region is marked as **Healthy** before creating any Self Hosted Gitspaces. Learn more in the [Manage Gitspace Infrastructure](/docs/cloud-development-environments/self-hosted-gitspaces/steps/gitspace-infra-ui.md#assess-gateway-group-health-for-gitspace-infrastructure) guide.

## Create Self Hosted Gitspaces

Once your infrastructure is configured, follow the steps below to begin creating Self Hosted Gitspaces.

### Add Machines in Gitspace Infrastructure

You must add **Machines** to your Gitspace Infrastructure to create and manage **Machine Types** for your Self Hosted Gitspaces. These machines allocate the necessary compute resources required for running Gitspaces. Adding Machines is **mandatory**. Without them, you will not be able to create Self Hosted Gitspaces.

Follow the given steps to add Machines:

1. After configuring your infrastructure and setting up the Delegate, navigate to the **Infrastructure Details** UI.
2. In the **Locations and Machines** section, click on **New Machine**.
3. Fill in the required machine details and click **Create**.

This action will register a new machine in your Gitspace Infrastructure, enabling it to host Self Hosted Gitspaces.

### Select Delegate from Delegate Selector

Once you’ve installed and configured your Delegate, you must enter the specific **Delegate Name** in the **Delegate Selector** field within your Gitspace Infrastructure UI.

Follow the given steps to select a Delegate:

1. Navigate to the **Infrastructure Details** UI after configuring your infrastructure and setting up the Delegate.
2. //TBD (Add steps once flow is finalized.)

### Create Gitspace

Here's how you can create a Self Hosted Gitspace:

1. Navigate to the desired **Organization** and **Project**.
2. Click on **Gitspaces** in the left navigation panel.
3. Click on **New Gitspace**.
4. Enter the required Gitspace details. Refer to this [documentation](/docs/cloud-development-environments/manage-gitspaces/create-gitspaces.md) for field descriptions.
5. Under **Infra Provider Type**, select the infrastructure you configured earlier. You can identify it by the **Infrastructure Name** you provided.
6. Choose the **Region**, populated from the region details configured in your infrastructure.
7. Select the **Machine Type**, populated from the machines you added to the infrastructure.
8. Click **Create Gitspace**.

And that’s it, your Self Hosted Gitspace is now up and running entirely within your own infrastructure.

## Manage Self Hosted Gitspaces

To learn how to manage your Gitspaces (start, stop, delete, etc.), refer to the [Manage Gitspaces](/docs/category/manage-gitspaces) documentation.

> // Confirm and add whether Start/Stop/Delete is possible directly from GCP or only via Harness UI?
