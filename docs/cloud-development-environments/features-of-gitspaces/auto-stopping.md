---
title: Auto-Stopping
description: Auto-Stopping of Gitspaces
sidebar_position: 1
sidebar_label: Auto-Stopping
redirect_from:
  - /docs/cloud-development-environment/features-of-gitspaces/auto-stopping
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io

:::

Harness reduces cloud costs and saves compute resources by auto stopping inactive or unused Gitspaces, while offering flexibility by restating them with all the data and changes fully preserved.

Harness monitors the inactivity of each Gitspace and will automatically stop running and time out if left inactive for a certain time. By default, this period of inactivity is 60 minutes. Inactivity, in this context, means no user activity within the Gitspace, particularly in the IDE. Any terminal activity will reset this inactivity period.

Gitspaces stopped in this way preserve all data, changes, and state, allowing you to pick up right where you left off when it’s restarted. This not only saves costs but also reduces the utilization of unused resources.

