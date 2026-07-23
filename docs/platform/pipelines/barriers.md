---
title: Barriers
description: Use Barrier steps in Harness pipelines to synchronize execution across parallel stages or step groups.
---

In complex pipelines that orchestrate interdependent services or components, you may need to coordinate the execution flow across different stages or step groups. For example, you might want to verify a group of services only after all of them are deployed successfully.

Harness provides **Barriers** to help with this kind of synchronization. A barrier pauses execution at defined points so that multiple parallel entities, such as stages or step groups, proceed only after all required parts reach the same barrier.

:::note
Barrier steps are only supported inside **Deploy** and **Custom** stage types.
:::

## How barriers work

Barriers follow these rules:

- Barriers take effect only when **two or more stages or step groups use the same barrier name** (configured through the **Barrier Reference** field in the Barrier step) **and are executed in parallel**.
- All stages or step groups referencing the same barrier must reach the barrier point. Only then do they all proceed simultaneously past that point.
- If any one of the stages or step groups fails **before** reaching the barrier, the remaining ones are signaled to fail as well.
- Each stage or step group then follows its configured failure strategy.

:::note
Barriers are also supported across **child pipelines**. A parent pipeline can define and use a barrier, and any child pipeline can reference and synchronize using the same barrier.

Currently, this feature is behind the feature flag `PIPE_BARRIERS_FOR_CHAINED_PIPELINES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Barriers can also be used with looping strategies. Additional constraints apply when you use barriers in looped parallel executions. Go to [Using barriers with looping strategies](/docs/continuous-delivery/x-platform-cd-features/cd-steps/flow-control/synchronize-deployments-using-barriers#using-barriers-with-looping-strategies) to review those constraints.

## Example

Here is a visualization of how barriers synchronize parallel stages:

- **Stage A** and **Stage B** both wait at **Barrier X** and proceed only when both reach it.
- **Stage B** and **Stage C** both wait at **Barrier Y** and proceed together once both are ready.

<div align="center"><DocImage path={require('./static/barriers.png')} alt="Diagram showing stages synchronizing at shared barriers" width="60%" /></div>

This allows you to control complex coordination logic within a pipeline without resorting to manual delays or checks.

## Add a barrier

A barrier is a name added in a pipeline's **Flow Control** settings.

Perform the following steps to add a barrier:

1. In your pipeline, select **Flow Control**.

   <div align="center"><DocImage path={require('./static/barriers-2.png')} alt="Flow Control option in a pipeline" width="50%" /></div>

2. In **Flow Control**, select **Add Barrier**.

   <div align="center"><DocImage path={require('./static/barriers-3.png')} alt="Add Barrier button in Flow Control" width="50%" /></div>

3. In **Barrier Name**, enter a unique name, and then click outside of the settings. The barrier is created.

   <div align="center"><DocImage path={require('./static/barriers-4.png')} alt="Entering a unique barrier name" width="50%" /></div>

Next, select the name using the **Barrier** step in the stages where you want to synchronize.

## Use a barrier in a step

Perform the following steps to apply a barrier:

1. In your stage, under **Execution**, select **Add Step**, and then select **Barrier**.

   <div align="center"><DocImage path={require('./static/barriers-5.png')} alt="Adding a Barrier step under Execution" width="50%" /></div>

2. Enter a name for the step.

3. In **Timeout**, enter the timeout period in milliseconds. For example, `600000` milliseconds is 10 minutes. The timeout period determines how long each stage with a barrier must wait for the other stages to reach the barrier point. When the timeout expires, it is considered a deployment failure.

4. Barrier timeouts are not hard timeouts. A barrier can fail anytime between the timeout value and `timeout + 1 minute`.

5. In **Barrier Reference**, select the name of an existing barrier.

   <div align="center"><DocImage path={require('./static/barriers-6.png')} alt="Selecting an existing barrier in Barrier Reference" width="50%" /></div>

6. Select **Apply Changes**.

## Avoid rollback barrier cycles

Do not reuse the same **Barrier Reference** in both the normal execution flow and a rollback section. A barrier waits for every position that shares its reference, including any position in a rollback section. Because rollback steps run only when the normal flow fails, that rollback position never arrives during a successful run, so the barrier keeps standing and the pipeline hangs until the step timeout.

For example, if the reference `wall3` is used in the normal steps of two parallel stages and also in the rollback steps of one stage, the two normal-flow positions reach the barrier and wait for the rollback position. The rollback position does not execute unless the stage fails, so the pipeline stalls and eventually times out.

To synchronize a rollback flow, use a dedicated barrier reference for rollback instead of the one used in the normal flow.

<details>
<summary>Barrier reference cycle (anti-pattern) and the corrected configuration</summary>

```yaml
# Anti-pattern: barrier "wall3" is referenced in both normal and rollback steps
pipeline:
  stages:
    - parallel:
        - stage:
            name: deploy
            spec:
              execution:
                steps:
                  - step:
                      type: Barrier
                      spec:
                        barrierRef: wall3        # normal flow
                rollbackSteps:
                  - step:
                      type: Barrier
                      spec:
                        barrierRef: wall3        # rollback flow -> cycle
        - stage:
            name: deploy2
            spec:
              execution:
                steps:
                  - step:
                      type: Barrier
                      spec:
                        barrierRef: wall3        # normal flow
  flowControl:
    barriers:
      - identifier: wall3
```

```yaml
# Corrected: use a dedicated reference for the rollback flow
  flowControl:
    barriers:
      - identifier: wall3            # normal flow
      - identifier: wall3_rollback   # rollback flow
# Set barrierRef: wall3_rollback in the rollback step so it no longer shares "wall3".
```

</details>

Harness detects this anti-pattern and fails validation with a `Barrier Deadlock Detected` error that names the barrier reference and whether it was found in the normal flow, the rollback flow, or both. The check runs both when you save the pipeline and when it starts running, so a barrier reference supplied as a runtime input is caught at execution time. To resolve the error, give the rollback barrier a different reference.

```text
Barrier Deadlock Detected: 'wall3' (mixed in normal flow and rollback flow)

Problem:
Barriers with the same reference must execute concurrently (at the same time).
Your pipeline has barriers with 'wall3' that execute sequentially,
creating a deadlock where each barrier waits for the others that haven't started yet.
```

The same validation applies to any barriers that share a reference but cannot execute concurrently, such as the same reference reused across sequential stages. Barriers that share a reference and run in parallel remain valid.

:::note
This validation is behind the feature flag `PIPE_DETECT_BARRIER_CYCLES`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::
