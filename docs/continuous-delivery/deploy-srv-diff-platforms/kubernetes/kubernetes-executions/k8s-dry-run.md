---
title: Perform a Kubernetes dry run
description: Test your manifests before deployment.
sidebar_position: 9
---


This topic discusses how to set up the Dry Run step for a Kubernetes deployment.

The Dry Run step fetches the Kubernetes manifests or Helm charts in a stage and performs a dry run of those resources. This is the same as running a `kubectl apply --filename=manifests.yaml --dry-run`.

You can use the Dry Run step to check your manifests before deployment. You can follow the step with an [Approval](/docs/category/approvals/) step to ensure the manifests are valid before deployment.

You can reference the resolved manifest from the Dry Run step in subsequent steps using a Harness variable expression.

```
<+pipeline.stages.[Stage_Id].spec.execution.steps.[Step_Id].k8s.ManifestDryRun>
```

:::note

When Harness performs a deployment, it compiles all values YAML files and manifests in the stage as a single manifest and applies it. The Dry Run step performs the dry run using this compiled manifest.

:::

## Limitations

The Dry Run step's resolved manifests are stored in the Harness cloud. There is a storage limit of 5MB per Dry Run step execution.


## Add the Dry Run step

You add the Dry Run step before the deployment step(s) in your stage (such as the Apply, Rolling, Canary, Blue Green deployment steps). 

You can add an [Approval](/docs/category/approvals/) step after the Dry Run step to have a Harness user(s) validate the manifest output before deployment.

For example, here is a stage with a Dry Run step followed by an Approval step and subsequent Rolling Deployment step.

![dry run](static/9feaeaab45b1c59f1ca71b4d1eb9936a03690198586f9f1d752b98710d6ccd6a.png)

To add the Dry Run step, do the following:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```

1. In the CD stage **Execution**, select **Add Step**.
2. Select the **Dry Run** step.
3. Enter a name for the step.
4. In **Timeout**, enter how long this step should run before failing and initiating the step or stage [failure strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings//).

    You can use:

   - `w` for weeks.
   - `d` for days.
   - `h` for hours.
   - `m` for minutes.
   - `s` for seconds.
   - `ms` for milliseconds.

   The maximum is `53w`.

   Timeouts can be set at the pipeline-level also, in the pipeline **Advanced Options**.
5. Select **Apply Changes**.

The Dry Run step is ready.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML">
```

1. In **Pipeline Studio**, select **YAML**.
2. Paste the following YAML example and select **Save**:

```
              - step:
                  type: K8sDryRun
                  name: Output Service Manifests
                  identifier: OutputService
                  spec: {}
                  timeout: 10m
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Step output example

When you run the pipeline, the output of the Dry Run step indicates that the manifest was applied as a dry run using `(dry run)`:

```Sh
Validating manifests with Dry Run
kubectl --kubeconfig=config apply --filename=manifests-dry-run.yaml --dry-run
namespace/dev created (dry run)
configmap/nginx-k8s-config created (dry run)
service/nginx-k8s-svc created (dry run)
deployment.apps/nginx-k8s-deployment created (dry run)

Done.
```

## Using the Dry Run step output in other steps

You can reference the resolved dry run manifest from the Dry Run step using this Harness expression:

```
<+pipeline.stages.[Stage_Id].spec.execution.steps.[Step_Id].k8s.ManifestDryRun>
```

For example, if the stage Id is `Deploy` and the Dry Run step Id is `Dry_Run` the expression would be:

```
<+pipeline.stages.Deploy.spec.execution.steps.Dry_Run.k8s.ManifestDryRun>
```

You can enter the expression in subsequent steps such as the [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts) or [Approval](/docs/category/approvals/) steps.


## Dry Run steps and Skip Dry Run settings

The Apply, Rolling, Canary, and Blue Green deployment steps include a **Skip Dry Run** setting.

By default, Harness uses the `--dry-run` flag on the `kubectl apply` command for all these steps. If the **Skip Dry Run** setting is selected, Harness will not use the `--dry-run` flag.

The **Skip Dry Run** setting is different than the Dry Run step. The Dry Run step only performs a dry run. The Dry Run step does not impact whether or not a deployment step performs a dry run.

