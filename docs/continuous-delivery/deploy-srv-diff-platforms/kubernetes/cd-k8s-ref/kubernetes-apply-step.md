---
title: Kubernetes Apply step
description: How to deploy independent workloads.
sidebar_position: 2
helpdocs_topic_id: xd6o61wp8u
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes settings for the Kubernetes Apply step.

The Apply step is used to deploy workloads outside of the primary and sidecar workloads of the deployment.

For example, you might want to deploy an additional resource only after Harness has verified the deployment of the main resources in the **Manifests** section.

For the topic on using the step, go to [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step).

## What workloads can I deploy?

Go to [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes) for more information.

## Rolling vs Apply

The following table lists the differences between the Rolling Deployment step (default in a Rolling strategy) and the Apply step (which may be used with any strategy).

|  | **Jobs** | **Rollback** |
| --- | --- | --- |
| **Rolling Deployment step** | No | Yes |
| **Apply step** | Yes | No |

## Name

The name for the Apply step.

The step Id is automatically generated from the name and used to reference the step using its Fully Qualified Name (FQN), like `<+execution.steps.[step Id].name>`.

For example, if the step Id is **Apply**, the FQN for the step settings are:

* `<+execution.steps.Apply.name>`
* `<+execution.steps.Apply.spec.filePaths>`
* `<+execution.steps.Apply.spec.skipDryRun>`
* `<+execution.steps.Apply.spec.skipSteadyStateCheck>`
* `<+execution.steps.Apply.timeout>`

## File path

Enter the path to a manifest file.

**File Path** has the following requirements:

* The path to the manifest for the Apply step must be subordinate to the path for the manifest in the **Manifests** section of the Service Definition. The manifest cannot be in the same folder as **Manifests**.
* The path must include the folder name and the file name.

In the following example, the path used in the **Manifests** section of the Service Definition is `default-k8s-manifests/Manifests/Files/templates/`. The **Apply** step uses a Job manifest in the subfolder `jobs/job.yaml`.

![](./static/kubernetes-apply-step-00.png)

You can enter multiple file paths in File Path. Simply click **Add file**

## Timeout

How long Harness should run this step before failing it. Enter a minimum of 10m to account for network activity in your target environment.

## Skip dry run

By default, Harness uses the `--dry-run` flag on the `kubectl apply` command during the **Initialize** step of this command, which prints the object that would be sent to the cluster without really sending it.

If the **Skip Dry Run** option is selected, Harness will not use the `--dry-run` flag.

## Skip steady state check

By default, Harness checks to see if a deployed workload has reached steady state.

If you select this option, Harness will not check that the workload has reached steady state.

## Skip K8s manifest(s) rendering

By default, Harness uses Go templating and a values.yaml for templating manifest files. 

In some cases, you might not want to use Go templating because your manifests use some other formatting.

Use the **Skip K8s Manifest(s) Rendering** option if you want Harness to skip rendering your manifest files using Go templating.

For details, go to [Deploy Manifests Separately using Apply Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/deploy-manifests-using-apply-step).

## See also

* [Add a Kubernetes Sidecar Container](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-kubernetes-sidecar-container)

