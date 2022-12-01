---
title: Create Kubernetes Namespaces with Workflow Variables
description: Pass a Kubernetes namespace into a Workflow during deployment.
sidebar_position: 210
helpdocs_topic_id: nhlzsni30x
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

Namespaces for your Kubernetes deployments are typically set up in the Harness Service and Infrastructure Definition. In some cases, you might want to provide the namespace only at the time of deployment.

You can pass in a Kubernetes namespace as part of a Workflow deployment by using a Workflow variable in the Infrastructure Definition **Namespace** setting.

A value for the namespace Workflow variable can be provided manually or in response to an event using a Trigger.


### Before You Begin

* [Define Kubernetes Manifests](define-kubernetes-manifests.md)
* [Define Your Kubernetes Target Infrastructure](define-your-kubernetes-target-infrastructure.md)
* [Create Kubernetes Namespaces based on InfraMapping](create-kubernetes-namespaces-based-on-infra-mapping.md)

### Step 1: Create the Workflow Variable

1. Create a Workflow variable. For steps on create a Workflow variable, see [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration).

For example, we'll name the variable `namespace`. and give it three allowed values: `qa,stage,prod`.

![](./static/create-kubernetes-namespaces-with-workflow-variables-207.png)

Each time the Workflow is deployed, you manually enter a value for the Workflow namespace variable or use a Trigger to pass in a value, and the `${workflow.variables.namespace}` variable is replaced with a different namespace.

This can happen simultaneously because a different namespace is used each time. You can even update the variable as part of the Pipeline Stage that executes the Workflow.

### Step 2: Use the Variable in the Infrastructure Definition

1. In the Infrastructure Definition used by the Workflow, reference the variable in the **Namespace** setting.

To reference the variable we created, we use the expression `${workflow.variables.namespace}`:

![](./static/create-kubernetes-namespaces-with-workflow-variables-208.png)

### Option 1: Enter a Namespace Manually

1. In your Workflow, click **Deploy**.
2. For **namespace**, select one of the variable's allowed values.

  ![](./static/create-kubernetes-namespaces-with-workflow-variables-209.png)

3. Click **Submit**. The Workflow deploys to the namespace you selected.

### Option 2: Enter a Namespace with a Trigger

1. Create a Trigger for the Workflow.
2. In the Actions section, select the Workflow with the namespace variable. The namespace variable appears.

  ![](./static/create-kubernetes-namespaces-with-workflow-variables-210.png)

3. For **namespace**, select one of the variable's allowed values.  
If your Workflow variable is not limited to allowed values, you can enter custom values. For more information, see [Passing Variables into Workflows and Pipelines from Triggers](https://docs.harness.io/article/revc37vl0f-passing-variable-into-workflows).
4. Click **Submit**. When the Trigger condition is met, the Workflow deploys to the namespace you selected.

### Example: Trigger Parallel Workflow Executions

Typically, when a Workflow is triggered multiple times in succession, deploying on the same Infrastructure Definition, the deployment executions are queued automatically. Queuing prevents deployment collision.

Using the steps in this topic, you can have parallel executions for same Workflow on the same Infrastructure Definition by using Workflow variables to identify separate namespaces.

### Next Steps

* [Harness GitOps](https://docs.harness.io/article/khbt0yhctx-harness-git-ops)
* [Passing Variables into Workflows and Pipelines from Triggers](https://docs.harness.io/article/revc37vl0f-passing-variable-into-workflows)

