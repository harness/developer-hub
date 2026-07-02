---
title: Manage ChaosHub
sidebar_label: Manage ChaosHub
sidebar_position: 2
description: Create and manage ChaosHubs at the project, organization, and account levels
---

Harness Resilience Testing supports creating ChaosHubs at three different levels, each serving specific use cases and providing different levels of access and control.

## Project Level ChaosHub

Project Level ChaosHubs are scoped to individual projects, providing teams with dedicated spaces for their specific chaos engineering needs.

#### Creating a Project Level ChaosHub

1. Navigate to your specific Chaos Engineering project in Harness
2. Go to **Project Settings** → **ChaosHubs**

    ![scope](../../content/chaoshub/static/chaoshub-scopes/project-level-chaoshub.png)

3. Click **New ChaosHub**
4. Enter the ChaosHub details and click **Create**

    ![create](../../content/chaoshub/static/chaoshub-scopes/create-project-level-chaoshub.png)

---

## Organization Level ChaosHub

Organization Level ChaosHubs are available across all projects within a specific Harness organization, providing standardization for teams within that organization.

#### Creating an Organization Level ChaosHub

1. Navigate to **Chaos Engineering** in your Harness account
2. Go to **Organization Settings** → **ChaosHubs**
3. Click **New ChaosHub**
4. Enter the ChaosHub details and click **Create**

---

## Account Level ChaosHub

Account Level ChaosHubs provide the highest scope, available across all organizations and projects within your Harness account, making them ideal for enterprise-wide chaos engineering governance and standardization.

#### Creating an Account Level ChaosHub

1. Navigate to the **Chaos Engineering** in your Harness account
2. Go to **Account Settings** → **ChaosHubs**
3. Click **New ChaosHub**
4. Enter the ChaosHub details and click **Create**

---

## Access Control and Permissions

ChaosHub access is managed through Harness RBAC (Role-Based Access Control):

- **Account Level**: Requires account-level chaos engineering permissions
- **Organization Level**: Requires organization-level chaos engineering permissions  
- **Project Level**: Requires project-level chaos engineering permissions

:::note Permission Requirements
If you don't have the necessary permissions to create ChaosHubs at your desired level, reach out to your Organization admins to request the appropriate chaos engineering permissions for your role.
:::

:::tip Tip
Start with Project-level ChaosHubs for team-specific experiments, then gradually create Account or Organization level hubs as your chaos engineering practices mature and require broader standardization.
:::

## Next Steps

Now that you have created your ChaosHub, you can start building your chaos engineering resources:

- **Create Templates**: Add reusable fault and experiment templates to your ChaosHub. Learn how to [create and manage templates](/docs/resilience-testing/chaos-testing/templates).

- **Build Experiments**: Use the templates from your ChaosHub to create chaos experiments in the new Chaos Studio. Get started with [creating experiments](/docs/resilience-testing/chaos-testing/experiments).
