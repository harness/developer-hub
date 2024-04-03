---
title: Mark pipeline as failed
description: Mark a pipeline as failed during execution.
sidebar_position: 5
---

:::note
Currently, this feature is behind the feature flag `CDS_MARK_PIPELINE_AS_FAILURE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::
You can use the **Mark as Failed** option to mark an in-progress pipeline as failed.

![](../static/make-pipeline-as-failed.png)

After marking a pipeline as failed, Harness fails `running` and `queued` stages. Completed stages aren't marked as failed.

:::info note
If a pipeline is configured with failure strategy like `Ignore Failure` or `Retry`, in this case the execution may continue even after `Mark as Failure` is sent. 
:::
## Difference between mark stage as failed and mark pipeline as failed

You can mark an entire pipeline as failed or a single stage. Here's the difference between these options:

- If there is only one stage running when you mark either the stage or pipeline as failed, both options have the same impact.
- If parallel stages are running, then using marking the *pipeline* as failed stops all in-progress parallel stages; whereas marking one *stage* as failed only stops that one stage.

![](../static/mark-stage-failed.png)

## Requirements

- You must have `Execute` pipeline permission to be able to mark a pipeline as failed.
- You must enable `Allow users to mark a running Step as failure` in your Harness account's [default settings](/docs/platform/settings/default-settings).

![](../static/mark_pipe_failed_settings.png)

