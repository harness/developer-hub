---
title: Canary Delete step
description: Clean up deployed Kubernetes workloads.
sidebar_position: 5
helpdocs_topic_id: 922mtcvank
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the **Canary Delete** step.

The **Canary Delete** step is used to clean up the workload deployed by the [Canary Deployment](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/canary-deployment-step) step.

The Canary Delete step usually follows a Canary Deployment step.

If the **Canary Deployment** step is successful, the stage will move onto the Primary step group and the Rolling Deployment step. The workload created by the **Canary Deployment** step is no longer needed.

## Canary Delete step vs Kubernetes Delete step

The **Canary Delete** step is only used to delete resources created using the **Canary Deployment** step. To delete any Kubernetes resources, use the Kubernetes Delete step. For details, go to [Delete Kubernetes Resources with the Kubernetes Delete Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/delete-kubernetes-resources).

## Name

Enter a name for the step.

## Timeout

How long Harness should run this step before failing it. Enter a minimum of 10m to account for network activity in your target environment.

## Advanced

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/Governance/Policy-as-code/harness-governance-overview)

## See Also

* [Canary Deployment Step](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/canary-deployment-step)

