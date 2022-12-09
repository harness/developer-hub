---
title: Canary Deployment Step
description: Define pods count for a canary deployment.
sidebar_position: 1
helpdocs_topic_id: 17wrdeuv0x
helpdocs_category_id: 85tr1q4hin
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the CD **Canary Deployment** step.

## Review: What Workloads Can I Deploy?

See [What Can I Deploy in Kubernetes?](what-can-i-deploy-in-kubernetes.md).

## Canary Deployment

In this step, you will define how many pods are deployed for a Canary test of the configuration files in your Service Definition **Manifests** section.

See [Create a Kubernetes Canary Deployment](../../cd-execution/kubernetes-executions/create-a-kubernetes-canary-deployment.md).

## Name

Enter the name for the step.

## Instances

In **Instances**, select **Instance Count** or **Percentage**.

In **Instances**, enter the number of pods to deploy.

If you selected **Instance Count**, enter the number of pods.

If you selected **Percentage**, enter a percentage of the pods defined in your Service Definition **Manifests** files to deploy.

For example, in you have `replicas: 4` in a manifest in Service, and you enter **50** in **Instances**, then 2 pods are deployed in this Phase step.

## Timeout

How long Harness should run this step before failing it. Enter a minimum of 10m to account for network activity in your target environment.

## Skip Dry Run

By default, Harness uses the `--dry-run` flag on the `kubectl apply` command during the **Initialize** step of this command, which prints the object that would be sent to the cluster without really sending it.

If the **Skip Dry Run** option is selected, Harness will not use the `--dry-run` flag.

## Advanced

See the following topics for these settings:

* [Step Skip Condition Settings](https://docs.harness.io/article/i36ibenkq2-step-skip-condition-settings)
* [Step Failure Strategy Settings](https://docs.harness.io/article/htrur23poj-step-failure-strategy-settings)
* [Select Delegates with Selectors](https://docs.harness.io/article/nnuf8yv13o-select-delegates-with-selectors)

## See Also

* [Canary Delete Step](kubernetes-delegate-step.md)

