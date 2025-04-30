---
title: Rerun Pipeline with Original Pipeline Definition and Inputs
description: Re-run a pipeline using the exact configuration and inputs from a specific execution.
sidebar_position: 30
---

## Overview

Harness now allows you to rerun a pipeline using the exact same pipeline definition (YAML) and input variables used during the original execution.

This ensures accurate reproducibility of past executions—even if the pipeline definition has changed since the original run.

:::note

Currently, this feature is behind the feature flag `PIPE_USE_ORIGINAL_YAML_FOR_EXECUTION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

## How to enable this feature

To enable this feature:

1. Navigate to Account Settings → Default Settings → Pipeline.
2. Set the **Allow using original pipeline YAML for reruns** to **true**.
3. Click Save.

## How this feature works

Let’s say you have a pipeline that requires input variables and you run it successfully.

Later, you want to rerun the pipeline using the same input values from the original execution. Here’s how:

1. Go to Execution History.
2. Select the desired execution.
3. Click Re-run, then choose **Re-run with original definition**.


<div align="center">
  <DocImage path={require('./static/original-rerun-1.png')} width="50%" height="50%" title="Click to view full size image" />
</div>


With this option selected, Harness will:

- Automatically use the original compiled pipeline YAML from that execution.
- Auto-populate the original input values—no need to re-enter them.

<div align="center">
  <DocImage path={require('./static/original-rerun-2.png')} width="100%" height="100%" title="Click to view full size image" />
</div>

## Example flow

Imagine you have a pipeline that takes a few input variables (like an environment name or version number). You run the pipeline today with a certain set of inputs—let’s say this execution is labeled **Execution ID: 1**.

A few days later, you modify the pipeline YAML—maybe you add a new step or change a stage name—and you run the pipeline again with a new set of input values. This is **Execution ID: 2**.

Now, let’s say something went wrong and you want to rerun the pipeline exactly as it was during Execution ID: 1. Normally, this would be tricky if the pipeline definition has changed.

But with this feature, when you go back to Execution ID: 1 and click **Re-run with original definition**, Harness uses:
- The original YAML that was in place during that specific run.
- The exact same inputs you provided back then.

You don’t need to worry about any recent changes to the pipeline. When you rerun using the original definition, Harness ensures you're reproducing the pipeline exactly as it was during that execution.
However, note that reruns are subject to data retention policies. By default, execution data is retained for 30 days, unless your account has a custom retention setting. You can only rerun executions that are still available within this retention window.

:::note
Re-running Execution ID: 1 this way does not revert or affect the current pipeline state. The new YAML you used for Execution ID: 2 remains intact. You're simply running a point-in-time snapshot of the pipeline as it was.
:::

## How is this different from a regular re-run?

When you use the regular **Re-run Pipeline** or **Re-run from Specific Stage** options, Harness always uses the latest version of the pipeline YAML. That means:

- Any changes made after the original execution will be included in the rerun.
- You'll have to re-enter input variables manually.

But when you use Re-run with original definition, Harness:
- Uses the pipeline YAML from that specific execution.
- Automatically fills in the input variables used at that time.

So you're not just rerunning a pipeline—you're rerunning the exact same configuration and inputs from a past execution. This is especially helpful for debugging, validating reproducibility, or comparing past outcomes with current ones.