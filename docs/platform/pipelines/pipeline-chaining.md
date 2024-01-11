---
title: Pipeline chaining in Harness
description: Chain your pipelines in Harness to create complex workflows.
sidebar_position: 12
---

Pipeline chaining involves using the output of one pipeline as input for another. You can link multiple processing steps together and execute them sequentially, creating a more complex workflow.

For example, you could have a pipeline that deploys an application to a test environment. This could be followed by a pipeline that runs a set of integration tests and, finally, a pipeline that deploys the application to production. Each pipeline in the chain is triggered by the completion of the previous pipeline. The output of each pipeline is passed to the next pipeline in the chain. This way, you can automate the whole process and make sure that the application is tested properly before deploying to production.

## Important

- Make sure you have read permissions for the child pipeline and edit permissions for the parent pipeline to add a pipeline stage to a parent pipeline.

- Whenever you change the runtime input fields in a chained pipeline, select **Inputs** in the parent pipeline to see the changes.

- The run pipeline form does not support validation of child pipelines during the pre-flight check of the parent pipeline.

- At this time, you cannot define a matrix strategy in the pipeline stage of the parent pipeline.

- The pipeline stage does not support auto expressions in **Outputs**.

## Benefits of pipeline chaining

Chaining pipelines in Harness offers the following benefits:

- Development of complex workflows involving multiple stages of deployment, testing, and verification.

- Ease of handling errors. Visibility into the deployment process makes it easier to identify and troubleshoot issues.

- Faster and more efficient deployment.

- Reusability of the pipeline across multiple applications and environments, reducing the need to recreate the same steps for each deployment.

- Improved collaboration and communication by allowing different teams to work on different stages of the deployment process. 

- Enable greater compliance with regulatory requirements and industry best practices through automatic deployments.

## Chain pipelines 
To chain pipelines in Harness, perform the following steps: 

1. Create your parent [pipeline](../pipelines/add-a-stage.md#step-1-create-a-pipeline) and configure it with the desired settings, such as triggers, environment variables, and deployment steps.

2. To add the child pipeline, select **Add Stage** and then select **Pipeline**.
   
   ![](./static/pipeline-chain-option.png)

3. Select the child pipeline from the list. You can select any pipeline across different orgs and projects corresponding to your access and permissions and chain it to your parent pipeline.
   
   For more information on access, go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness).
   
   :::info note
   You must have execute permissions for the parent and child pipeline to ensure successful execution.
   :::

4. Click **Apply Selected**.
5. In the final chained pipeline, you can add a **Deploy** step to deploy the application to the desired environment.
    
    After you have chained the pipelines, you can run the parent pipeline.
   
Harness recommends testing the pipeline before executing it in production.

## Use a parent output in child pipelines

You can use an output expression in from a parent pipeline as an input expression in a child pipeline stage.

To use the output of a parent pipeline in the child pipeline and its stages, do the following:
   
1. Child pipeline:
   1. In the child pipeline, select **Variables**. You need to create a child pipeline variable so that when you add the child pipeline to the parent pipeline as a stage, the child pipeline stage will have an input you can use to map output variables from the parent pipeline.
   2. Under **Pipeline**, in **Custom Variables**, select **Add Variable**.
   3. Enter a name for the variable and set its value as a *runtime input*, and copy the variable expression.

    ![picture 0](static/3e467b043a7c3ea8faefbbcf184fb304ed068b13898259d91f51015551a53825.png)  

   4. Select **Apply Changes**.
   5. Use the expression in the child pipeline wherever you want to use the parent output variable.
   6. Save the child pipeline.
2. Parent pipeline:
   1. In the parent pipeline, verify that you have an output variable to pass to the child pipeline. For example, a [Shell Script step output variable](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step).
   2.  In the parent pipeline, select/add the child pipeline stage. The runtime pipeline variable you added to the child pipeline appears in the **Inputs** tab.

    ![picture 2](static/19a4d2bba78d439a18512c0981346d5c47b064711cf27046c2025ae012af360b.png)   

   3. In **Inputs**, you should see the runtime input from the child pipeline variable you created.
   4. In **Value**, enter an expression that references the parent pipeline output variable you want to pass to the child pipeline.
 
:::info note
The **Inputs** tab supports auto suggestions.
:::
   
Now, when the parent pipeline is run and the child pipeline is executed, the child pipeline uses its pipeline-level runtime variable. That variable is resolved to the value of the parent pipeline output variable.

Here's an example of a child and parent pipeline where a parent pipeline output expression is mapped and used in a child pipeline stage.

<details>
<summary>Child pipeline</summary>

```yaml
pipeline:
  name: child
  identifier: child
  projectIdentifier: CD_Docs
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: child_output
        identifier: child_output
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo <+pipeline.variables.parent_timeout>
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
          outputs: []
        tags: {}
  variables:
    - name: parent_timeout
      type: String
      description: ""
      required: false
      value: <+input>
```
</details>

<details>
<summary>Parent pipeline with child pipeline stage</summary>

```yaml
pipeline:
  name: parent
  identifier: parent
  projectIdentifier: CD_Docs
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: chained
        identifier: chained
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: timeout=<+pipeline.stages.chained.spec.execution.steps.ShellScript_1.timeout>
                    environmentVariables: []
                    outputVariables:
                      - name: parent_timeout
                        type: String
                        value: timeout
                  timeout: 10m
          outputs: []
        tags: {}
    - stage:
        name: child_pipeline
        identifier: child_pipeline
        description: ""
        type: Pipeline
        spec:
          org: default
          pipeline: child
          project: CD_Docs
          outputs: []
          inputs:
            identifier: child
            variables:
              - name: parent_timeout
                type: String
                value: <+pipeline.stages.chained.spec.execution.steps.ShellScript_1.output.outputVariables.parent_timeout>

```
</details>




:::info note

Consider the following points for executing remote chained pipelines:

- A chained pipeline is fetched from the default branch when the parent pipeline is defined inline, and the chained pipeline is defined remotely.
- When the parent pipeline is defined remotely, and the chained pipeline is defined inline, the parent pipeline is fetched from the corresponding branch, and the chained pipeline is fetched inline.
- When both the chained pipeline and the parent pipeline are defined remotely, but under the same repository, the chained pipeline should belong to the same branch as the parent pipeline.
- A chained pipeline is fetched from the default branch when both the parent and chained pipelines are defined remotely in separate repositories. This is irrespective of the branch of the parent pipeline.

:::

