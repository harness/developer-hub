---
title: Control resource usage with Queue steps
description: This topic describes how to use the Queue step to control the access order to the resources Harness requests during a deployment and prevent multiple Pipelines from requesting the same resources at the same time.
sidebar_position: 3
helpdocs_topic_id: 5n96cc7cyo
helpdocs_category_id: etz0u5kujd
helpdocs_is_private: false
helpdocs_is_published: true
---


This topic describes how to use the **Queue** step to control the access order to the resources Harness requests during a deployment and prevent multiple pipelines from requesting the same resources at the same time.

For example, two Pipelines might be deploying artifacts to a single Kubernetes namespace simultaneously. To avoid collision, and queue deployments, you add a Queue step to each Pipeline.

When the first Pipeline completes, it releases the lock and the second Pipeline can continue.

Queue steps can be used on different Pipelines or even multiple executions of the same Pipeline.

In this topic, you will learn how to use the Queue step to control the order in which Pipelines access resources.

Harness provide multiple options for controlling resource usage and protecting capacity limits. See [Controlling Resource Usage with Barriers, Resource Constraints, and Queue Steps](./controlling-deployments-with-barriers-resource-constraints-and-queue-steps.md).

## Add Queue Steps

1. In the stage **Execution**, determine where you want to queue deployments and click **Add Step**.
2. In **Flow Control**, click **Queue**.
3. Enter a name and timeout for the Queue step.
4. In **Resource Key**, enter a unique key. This is the same key you will add to the Queue steps in other Pipelines.
5. The **Resource Key** supports Fixed Values, Runtime Inputs, and Expressions. See [Fixed Values, Runtime Inputs, and Expressions](/docs/platform/20_References/runtime-inputs.md).
6. In **Run next queued execution after completion of**, select one of the following:
   + **Pipeline:** the entire Pipeline must complete before the queued Pipelines can deploy.
   + **Stage:** the current Stage must complete before the queued Pipelines can deploy.

Queue steps can be used on different Pipelines or even multiple executions of the same Pipeline.

## Advanced settings

In **Advanced**, you can use the following options:

* [Delegate Selector](https://developer.harness.io/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/)
* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/Governance/Policy-as-code/harness-governance-overview)

### Test

Let's look at a simple example to show how Queue steps work.

Here's the YAML for the Pipeline that contains a Custom Stage with a Queue Step followed by a [Shell Script](../x-platform-cd-features/cd-steps/cd-general-steps/using-shell-scripts.md) step that runs a Bash `sleep 30`.

You can copy it and paste it into your Harness Project. You simply need to update the `projectIdentifier` and `orgIdentifier` settings to match your current [Project and Org](../../platform/organizations-and-projects/projects-and-organizations.md).


```yaml
pipeline:  
    name: Queue  
    identifier: Queue  
    projectIdentifier: queuesteptest  
    orgIdentifier: default  
    tags: {}  
    stages:  
        - stage:  
              name: Queue  
              identifier: Queue  
              description: ""  
              type: Custom  
              spec:  
                  execution:  
                      steps:  
                          - step:  
                                type: Queue  
                                name: Queue  
                                identifier: Queue  
                                spec:  
                                    key: "123"  
                                    scope: Pipeline  
                                timeout: 10m  
                          - step:  
                                type: ShellScript  
                                name: Sleep  
                                identifier: Sleep  
                                spec:  
                                    shell: Bash  
                                    onDelegate: true  
                                    source:  
                                        type: Inline  
                                        spec:  
                                            script: sleep 30  
                                    environmentVariables: []  
                                    outputVariables: []  
                                    executionTarget: {}  
                                timeout: 10m  
              tags: {}
```

When you're done the Pipeline will look like this:

![](../cd-deployments-category/static/control-resource-usage-with-queue-steps-04.png)

Open the **Queue** step.

You can see **Run next queued execution after completion of** is set to **Pipeline**. That means that the Pipeline must finish deploying before any other queued Pipeline executions can proceed.

Now let's run this Pipeline twice in a row quickly.

The first run of the Pipeline will run without queuing but the second run of the Pipeline is queued until the first one is complete.

Here's the first run of the Pipeline. It shows the Pipeline execution running (**Running**) and the other Pipeline execution queued.

![](../cd-deployments-category/static/control-resource-usage-with-queue-steps-05.png)

You can click the name of the queued Pipeline to jump to its execution.

Here's the second run of the Pipeline:

![](../cd-deployments-category/static/control-resource-usage-with-queue-steps-06.png)

You can see the Pipeline execution is queued (**Current**) and you the Pipeline execution that is running.

This example used multiple executions of the same Pipeline, but if a Queue step is added to another Pipeline and uses the same Resource Key, the same queuing process is applied to that Pipeline.

Here's another Pipeline, **queue 2**, with the same Queue step Resource Key. You can see it waiting for the **Queue** Pipeline to complete.

![](../cd-deployments-category/static/control-resource-usage-with-queue-steps-07.png)

## Queue Step Scope

Queue steps are account-wide. This ensures that if a Queue step is placed in one Pipeline, it will restrict any other Pipeline in the account from using resources until it is safe to use.

## Barriers, Resource Constraints, and Queue Steps

Harness has a number of ways to control deployments and resource usage. It's important to understand their differences.

See [Controlling Resource Usage with Barriers, Resource Constraints, and Queue Steps](./controlling-deployments-with-barriers-resource-constraints-and-queue-steps.md).

## When to Queue

Queue steps can be added anywhere in your Stage, so it's important to add them whenever the resource you want to protect is being used.

For example, if Pipeline A will perform some Terraform provisioning and Pipeline B will deploy to the provisioned infrastructure, you will want to place the Queue step before the [Terraform Apply](../cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step.md) step in Pipeline A, and before the deployment step in Pipeline B (such as a Kubernetes [Rolling step](../deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment.md)).

