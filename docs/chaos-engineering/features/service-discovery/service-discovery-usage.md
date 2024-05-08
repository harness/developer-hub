---
title: Customize discovery agent
sidebar_position: 2
description: Customize discovery agent
---

This section describes how you can [create](#customize-discovery-agent), [edit](#edit-discovery-agent), and [delete](#delete-discovery-agent) a discovery agent.

## Before you begin, review the following

- [Introduction to service discovery](/docs/chaos-engineering/features/service-discovery/intro-service-discovery.md)

When you are onboarding, one of the steps involves discovering services. HCE creates the discovery agent that automatically discovers services for your application.

If you want to customize the discovery agent, follow the steps below.

### Customize Discovery Agent

1. To customize the discovery agent, navigate to **Chaos** and select **Discovery**. Click **New Discovery Agent**.

    ![](./static/usage/discovery.png)

2. Select an **environment**, **infrastructure**, **Discovery Agent Name** and **namespace**. The next step (optional) requires information such as node selector, blacklisted namespaces, and period of detecting the services. Select **Create New Discovery Agent**.

    ![](./static/usage/add-details-discovery.png)

### Edit Discovery Agent

1. To edit a discovery agent, navigate to the agent and click **Edit**. Make the necessary changes to the required fields.

    ![](./static/usage/edit-dis-agent-1.png)

2. Select **Update Discovery Agent**.

    ![](./static/usage/edit-details-discovery.png)

### Delete Discovery Agent

1. To delete a discovery agent, navigate to the agent you want to delete and select **Delete**.

    ![](./static/usage/delete-1.png)

2. Select **Delete**.

    ![](./static/usage/confirm-2.png)