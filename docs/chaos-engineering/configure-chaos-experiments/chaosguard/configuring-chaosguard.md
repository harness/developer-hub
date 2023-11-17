---
title: Configuration
sidebar_position: 3
---
This section walks you through the configuration of ChaosGuard and how to enable it to mitigate potential security threats from chaos-enabled users with malicious intent.

## Before you begin

[Harness RBAC](./introduction-to-chaosguard) (role-based access control) serves as a prerequisite to understanding [Chaosguard](./chaosguard-concepts), which serves as an execution-time security evaluation. 

## Configuring conditions
Conditions describe a set of constraints that are applied to an execution context. To configure a condition,

1. Click **ChaosGuard** on the left-hand side of the **Chaos** homepage.

![chaosguard-page](./static/configure-chaosguard/chaosguard-page.png)

2. Click **Conditions** on the top right corner of the ChaosGuard page. 

![condition](./static/configure-chaosguard/new-condition-chaosguard.png)

3. Click **New condition**.

![new-condition](./static/configure-chaosguard/new-condition.png)

4. Provide a name, a description (optional), and tags (optional).

![edit-condition](./static/configure-chaosguard/edit-condition.png)

5. Click Save.

![save-condition](./static/configure-chaosguard/save-condition.png)

This creates a blank canvas, and you can define the constraints for the condition using a YAML manifest or using the visual editor. 

## Configuring rules

Rules consist of one or more **conditions** that are evaluated as a first step in the experiment run. To configure a rule,

1. On the top right corner of the ChaosGuard page, click **Rules**.

![](./static/configure-chaosguard/new-rule-select.png)

2. Click **New rule**.

![](./static/configure-chaosguard/new-rule.png)

3. Specify parameters such as name, description (optional), tags (optional), user group to apply the rule (you can apply the rule to multiple user groups), and time window to apply the rule.

![](./static/configure-chaosguard/add-params-rule.png)

4. Click Next.

![](./static/configure-chaosguard/click-next.png)

5. Select a condition (or multiple conditions) that you wish to apply. Click Done.

![](./static/configure-chaosguard/select-condition.png)

:::note
You can apply the rule to multiple user groups for a project, organization or account, or create a new user group if you have the necessary permissions.
![](./static/configure-chaosguard/select-multiple-user-groups.png)
:::

## Enable and disable rules

The image below shows the two different states of a rule (enable and disable).

![chaosguard-rules](./static/configure-chaosguard/chaosguard-rules.png)
