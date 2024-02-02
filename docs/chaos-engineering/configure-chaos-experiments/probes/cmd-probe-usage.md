---
title: Using command probe in various modes 
sidebar_position: 4
description: Guide to using the command probe in inline mode and source mode
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section guides you through steps to use the [**command probe**](/docs/chaos-engineering/technical-reference/probes/cmd-probe) in **inline mode** and **source mode**.

## Before you begin

* [Probe overview](/docs/chaos-engineering/configure-chaos-experiments/probes/overview)
* [Command probe](/docs/chaos-engineering/technical-reference/probes/cmd-probe)

## Enter command probe details

1. Provide a name for the probe, and other parameters like chaos interval, timeout, and so on. 

2. Enter a command in the **Command** section.

![Step 1](./static/cmd-probe-usage/source-mode-3.png)

<Tabs>
  <TabItem value="Inline">

To use the command probe in the **inline** mode:

3. Enter the **Type**, **Comparison criteria**, **Value**. Toggle to switch off the **Source** mode. Click **Setup probe**.

![Step 2](./static/cmd-probe-usage/inline-3.png)

</TabItem>
  <TabItem value="Source">

To use the command probe in the **source** mode:

3. Enter the **Type**, **Comparison criteria**, **Value**. Toggle to switch oon the **Source** mode. Click **Setup probe**.

![Step 2](./static/cmd-probe-usage/source-mode-4.png)


</TabItem>
</Tabs>

4. Click **Confirm** to create the probe with the parameters you entered. 

![Step 3](./static/cmd-probe-usage/confirm-5.png)
