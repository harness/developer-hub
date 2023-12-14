---
title: Add multiple configuration items to ServiceNow change requests 
description: Assign multiple config items as part of the change request.
sidebar_position: 6
---

Harness enables you to add multiple existing configuration items to a existing change request in ServiceNow.

To set up the pipeline, you use two Harness ServiceNow Create steps. The first step creates the change request and obtains a `sys_id`. The second step uses the `sys_id` to get the task and add the config items.

This topic walks you through the setup procedure.

## Pipeline example YAML

You can use the following pipeline YAML as an example of how to set up this solution.

<details>

		<summary>Pipeline example YAML</summary>

```yaml
pipeline:
  projectIdentifier: myproject
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: stage
        identifier: stage
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ServiceNowCreate
                  name: create
                  identifier: create
                  spec:
                    useServiceNowTemplate: false
                    connectorRef: account.service_now_connector
                    ticketType: change_request
                    fields: []
                  timeout: 10m
              - step:
                  type: ServiceNowCreate
                  name: ServiceNowCreate_1
                  identifier: ServiceNowCreate_1
                  spec:
                    useServiceNowTemplate: false
                    connectorRef: account.service_now_connector
                    ticketType: task_ci
                    fields:
                      - name: ci_item
                        value: <+matrix.ci_item>
                      - name: task
                        value: <+pipeline.stages.stage.spec.execution.steps.create.ticket.fields.sys_id>
                  timeout: 10m
                  strategy:
                    matrix:
                      ci_item:
                        - 9ea9e3491bb971100269a608624bcb85
                        - 43b89fa11b6139100269a608624bcb6f
                      maxConcurrency: 2
        tags: {}
  identifier: mypipeline
  name: mypipeline

```

</details>


## Assign multiple config items as part of the change request

Use the following steps to set up the pipeline and ServiceNow Create steps.

### Add the first ServiceNow Create step to a pipeline stage

1. In your pipeline stage (Deploy, Custom, or Approval), add a ServiceNow Create step.
2. In **ServiceNow Connector**, create or select a [Harness ServiceNow connector](/docs/platform/connectors/ticketing-systems/connect-to-service-now) to connector to you ServiceNow server. 
3. In **Ticket Type**, select **Change Request**.
4. Select **Apply Changes**.

When you run the pipeline, this step will output a `sys_id`. You will use a Harness expression to reference this value in the next ServiceNow Create step's **Task** setting. 

The expression follows this format:

```
<+pipeline.stages.stage.spec.execution.steps.STEP_ID.ticket.fields.sys_id>
```

For example:

```
<+pipeline.stages.stage.spec.execution.steps.create.ticket.fields.sys_id>
```

### Add the second ServiceNow Create step to a pipeline stage

1. In your pipeline stage (Deploy, Custom, or Approval), add a ServiceNow Create step.
2. In **ServiceNow Connector**, create or select a [Harness ServiceNow connector](/docs/platform/connectors/ticketing-systems/connect-to-service-now) to connector to you ServiceNow server. 
3. In **Ticket Type**, select the type or enter a custom type. In the YAML example earlier in this topic, we use a custom table named `task_ci`.
4. In **Configure Fields**, select **Fields**.
5. In **Add ServiceNow Fields**, select **Configuration Item** and **Task**, and select **Add**.

  <docimage path={require('./static/b558dcc70b590aee872afa80deb88588b1a462c2c659345bdb13f76560b275ec.png')} width="60%" height="60%" title="Click to view full size image" />  
1. In **Configuration Item**, select **Expression**, and then enter `\<+matrix.ci_item\>`. This expression references the step's looping strategy we will add later.
2. In **Task**, select **Expression**, and then enter the expression that references the sys_id in the previous ServiceNow Create step, using the format `\<+pipeline.stages.stage.spec.execution.steps.STEP_ID.ticket.fields.sys_id\>`. For example, `\<+pipeline.stages.stage.spec.execution.steps.create.ticket.fields.sys_id\>`.
  
  This expression references the `sys_id` value returned when the step in run.
  
  <docimage path={require('./static/ad89de6217ebbf9e4ea20b399379ab1a31bcfb736a7f44465fa904b606c0dfaa.png')} width="60%" height="60%" title="Click to view full size image" />  

Next, we will add the looping strategy for the step.

### Add a matrix looping strategy

The matrix looping strategy will loop through the config items.

1. In the ServiceNow Create step, select **Advanced**.
2. In **Looping Strategy**, enter the following: 
  ```
  matrix:
    ci_item:
      - Config item Id
      - Config item Id
      - etc
    maxConcurrency: number of items
  ```

  For example:

  ```
  matrix:
    ci_item:
      - 9ea9e3491bb971100269a608624bcb85
      - 43b89fa11b6139100269a608624bcb6f
    maxConcurrency: 2
  ```
3. Select **Apply Changes**.

## Run the pipeline

When you run the pipeline, you will see the looping strategy run for each config item Id in the step's matrix.

<docimage path={require('./static/4ee00ab3a83c71ecc5c6af47b9a3dd0d6f4bee0af1d652bfe51bb2a5d04d645d.png')} width="60%" height="60%" title="Click to view full size image" />

Select the link in the step **Output** tab's **ticketUrl** to open a new browser tab and view the config item.

