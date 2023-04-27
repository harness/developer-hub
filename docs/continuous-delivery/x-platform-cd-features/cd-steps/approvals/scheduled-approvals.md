---
title: Schedule automatic approvals
description: Schedule an approval step to automatically approve by a specific time.
sidebar_position: 3
---

You can use the approval step's **Timeout** and [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/) settings to schedule an automatic approval.

This method works for all Harness approval steps (manual, Jira, ServiceNow, and Custom).

## Set timeout

To schedule the automatic approval, do the following:

1. In the step's **Timeout** setting, enter when you want the automatic approval to happen. You can't set a specific date, but you can set the timeout based on when the step is initially executed.

  You can use:

     - `w` for weeks.
     - `d` for days.
     - `h` for hours.
     - `m` for minutes.
     - `s` for seconds.
     - `ms` for milliseconds.

     The maximum is `53w`.

<docimage path={require('./static/72e1545547eb18f0c873bcca60d3051bc93763990d9b558d747a779a0e68607e.png')} width="60%" height="60%" title="Click to view full size image" />

## Set failure strategy

To automatically approve the step when the **Timeout** setting is reached, use the **Mark As Success** failure strategy.

1. In the approval step, select **Advanced**.
2. In **Failure Strategy**, select **Add**.
3. In **On failure of type**, select **Timeout Errors**.
4. In **Perform Action**, select **Mark As Success**.

<docimage path={require('./static/f8765723607901c028f471137b1555a179817d77ac8374300e69b18af4cd5ecf.png')} width="60%" height="60%" title="Click to view full size image" />

That's it. Now, when the Timeout is reached the approval step will automatically approve.