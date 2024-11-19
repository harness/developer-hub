---
title: Supported Workflows Actions
description: These Workflows Actions are supported in Harness IDP
sidebar_position: 4
---

## Introduction

The Workflows come with several built-in actions for fetching content, registering in the catalog and of course actions for creating and publishing a git repository.

There are several repository providers supported out of the box such as **GitHub**, **Azure**, **GitLab** and **Bitbucket**.


## How To View Supported Actions

A list of all registered Workflow actions can be found under 

`Workflows/Create/Self Service` -> `Installed Actions`

![](./static/create_neww.png)

![](./static/fetch-actions.png)

![](./static/installed-actions.png)


## Harness Specific Workflow Actions

### 1. `trigger:harness-custom-pipeline`

:::info

This action currently supports [IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage) along with the [Deploy Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage#add-a-stage), [Custom Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage)(**Available with Harness CD License or Free Tier usage**), Pipelines using [Pipeline Templates](https://developer.harness.io/docs/platform/templates/create-pipeline-template/) and [codebase disabled](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages) **Build Stage(Only Available with Harness CI License)** with [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings).

:::

This Worfklow action requires **variables of type pipeline, stage or step** as input along with the **pipeline url**(for pipelines using [Git Experience](https://developer.harness.io/docs/platform/git-experience/git-experience-overview) make sure your URL includes `branch` and `repoName` e.g., `https://app.harness.io/ng/account/accountID/module/idp/orgs/orgID/projects/projectID/pipelines/pipelineID?repoName=repo-name&branch=branch`), and then trigger the pipeline based in the `inputset` obtained from the user. 

```YAML
...
## Example
steps:
  - id: trigger
      name: Creating your react app
      action: trigger:harness-custom-pipeline
      input:
      url: "https://app.harness.io/ng/account/vpCkHKsDSxK9_KYfjCTMKA/home/orgs/default/projects/communityeng/pipelines/IDP_New_NextJS_app/pipeline-studio/?storeType=INLINE"
      inputset:
          project_name: ${{ parameters.project_name }}
          github_repo: ${{ parameters.github_repo }}
          cloud_provider: ${{ parameters.provider }}
          db: ${{ parameters.db }}
          cache: ${{ parameters.cache }}
      apikey: ${{ parameters.token }}
      showOutputVariables: true
output:
  text:
    - title: Output Variable
      content: |
        Output Variable **test2** is `${{ steps.trigger.output.test2 }}` 
    - title: Another Output Variable
      content: |
        Output Variable **test1** with fqnPath is `${{ steps.trigger.output['pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1'] }}`      
...
```

In the YAML example above, under `inputset`, values such as `project_name` and `github_repo` are placeholders for pipeline variable names. You can use the reference format `<+pipeline.variables.VARIABLE_NAME>` directly within the `inputset` **key-value pairs**. For example, instead of simply specifying the variable name, you can reference the pipeline variable like this:

```YAML
...
inputset:
  pipeline.variables.project_name: ${{ parameters.project_name }}
  pipeline.variables.github_repo: ${{ parameters.github_repo }}
  ...
...
```
To obtain these references, simply copy the variable path from the Harness Pipeline Studio UI. Please make sure to remove `<+` & `>` from the expression copied from UI. 
 
![](./static/pipeline-variable.png)

#### Support for Stage, Step Variables and Pipeline Templates

In addition to pipeline variables, you can also reference **stage, step group, service, and environment variables** within the `inputset`. Here’s how each type of variable can be referenced:

- Stage variable reference: `pipeline.stages.STAGE_IDENTIFIER.variables.VARIABLE_NAME`
- Step variable reference: `pipeline.stages.STAGE_IDENTIFIER.spec.execution.steps.STEP_IDENTIFIER.VARIABLE_NAME`
- Step group variable reference: `pipeline.stages.STAGE_IDENTIFIER.spec.execution.steps.STEP_GROUP_IDENTIFIER.steps.STEP_IDENTIFIER.VARIABLE_NAME`

If you need to reference lower-level variables (such as stage, step group, and step variables) from outside their original scope, you must include the relative path to that variable. For instance, if you want to reference a stage variable from a different stage, you should use the format, `pipeline.stages.originalStageID.variables.variableName`

Instead of the simpler `stage.variables.variableName`. This fully qualified path ensures the correct variable is referenced across stages, step groups, or steps.

```YAML
inputset:
  pipeline.variables.project_name: ${{ parameters.project_name }}
  pipeline.stages.originalStageID.variables.github_repo: ${{ parameters.github_repo }}
  pipeline.stages.TempStage.spec.execution.steps.demostepgroup.steps.ShellScript_1.cloud_provider: ${{ parameters.provider }}
```
To obtain these references, simply copy the variable path from the Harness Pipeline Studio UI.

![](./static/stage-variable.png)

> Note: **This is the only way to reference stage and step variables under `inputset`, without the fully qualified path, the input isn't valid.**

:::info 

In the above example the `apikey` parameter takes input from Harness Token which is specified under spec as a mandatory parameter as mentioned below

```YAML
...
token:
    title: Harness Token
    type: string
    ui:widget: password
    ui:field: HarnessAuthToken
    ...

```
Without the above parameter input the pipeline won't be executed. [Take a look at this example](https://github.com/harness-community/idp-samples/blob/eb9988020d3917c0bca7daccb354ba670626221b/tutorial-self-service-flow-template.yaml#L64-L68) 

:::

The `token` property we use to fetch **Harness Auth Token** is hidden on the **Review Step** using `ui:widget: password`, but for this to work the token property needs to be mentioned under the first `page` in-case you have multiple pages.

```YAML
# example workflow.yaml
...
parameters:
  - title: <PAGE-1 TITLE>
    properties:
      property-1:
        title: title-1
        type: string
      property-2:
        title: title-2
    token:
      title: Harness Token
      type: string
      ui:widget: password
      ui:field: HarnessAuthToken
  - title: <PAGE-2 TITLE>
    properties:
      property-1:
        title: title-1
        type: string
      property-2:
        title: title-2
  - title: <PAGE-n TITLE>  
...
```

#### Output

1. `Title` : Name of the Pipeline. 
2.  `url` : Execution URL of the Pipeline e.g.: `https://app.harness.io/ng/account/********************/module/idp-admin/orgs/default/projects/communityeng/pipelines/uniteddemo/executions/**********/pipeline?storeType=INLINE`

Once you create the workflow with this Workflow action, you can see the pipeline URL running in the background and executing the flow. 

![](./static/flow-ca-1.png)

You can now optionally remove the pipeline URL from the workflow execution logs, for this you need to use the boolean property `hidePipelineURLLog` and set the value as `true`.

```YAML
## Example
steps:
- id: trigger
    name: Creating your react app
    action: trigger:harness-custom-pipeline
    input:
    url: "Pipeline URL"
    hidePipelineURLLog: true
    inputset:
        project_name: ${{ parameters.project_name }}
    apikey: ${{ parameters.token }}
```

3. You can as well configure the output to display the pipeline [output variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#input-and-output-variables), by setting the `showOutputVariables: true` under `inputs`and adding `output` as shown in the example below:

```YAML
...
output:
  text:
    - title: Output Variable
      content: |
        Output Variable **test2** is `${{ steps.trigger.output.test2 }}` 
    - title: Another Output Variable
      content: |
        Output Variable **test1** with fqnPath is `${{ steps.trigger.output['pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1'] }}` 
...
```

:::info

Only **user defined output variables** are allowed, but you can as well use the system generated variables by assigning them as a new variable under shell script step as displayed below. For e.g. we have mentioned the system generated output as `jira_id` and under **Optional Configuration** added a **test-var** which becomes a user defined output variable and could be displayed as output in the IDP workflows.

![](./static/output-variable.png)

:::

There are two ways in which you can add the output variable to the template syntax. 

1. You can directly mention the output variable name `${{ steps.trigger.output.test2 }}`, here `test2` is the output variable name we created in the pipeline. 

2. You can copy the JEXL expression of the output variable and remove the JEXL constructs, `${{ steps.trigger.output['pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1'] }}`, here the part `pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1` comes from `<+pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test2>` copied from execution logs. 

![](./static/output-variables.png)

### 2. `trigger:trigger-pipeline-with-webhook`

This Workflow action could be used to trigger a pipeline execution based on the **input-set identifier** and a webhook name. Usually a single deployment pipeline has different input-set as per the environment it's going to be deployed and developers can just specify the input-set ID aligning with the environment name to trigger the deployment pipeline. 

![](static/input-set-list.png)

Developers need to mention the input set identifier instead of the name in the workflows input, usually identifier are names devoid of any special characters and spaces, e.g., `input set-test` name would have an identifier as `inputsettest`. It is suggested to provide all the available input-set as `enums` in the template to avoid any ambiguity by developers.  

![](static/inputsetidentifier.png) 

Here's an example workflow based on this [source](https://github.com/harness-community/idp-samples/blob/main/workflows-ca-inputset.yaml). 

![](static/input-form-ca.png)

```YAML
## Example
...
steps:
  - id: trigger
    name: Creating your react app
    action: trigger:trigger-pipeline-with-webhook
    input:
      url: "YOUR PIPELINE URL"
      inputSetName: ${{ parameters.inputSetName }}
      triggerName: ${{ parameters.triggerName }}
      apikey: ${{ parameters.token }}
...

```

:::info 

In the above example the `apikey` parameter takes input from Harness Token which is specified under spec as a mandatory parameter as mentioned below

```YAML
...
token:
    title: Harness Token
    type: string
    ui:widget: password
    ui:field: HarnessAuthToken
    ...

```
Without the above parameter input the pipeline won't be executed. [Take a look at this example](https://github.com/harness-community/idp-samples/blob/eb9988020d3917c0bca7daccb354ba670626221b/tutorial-self-service-flow-template.yaml#L64-L68) 

:::

#### Output

1. `API URL:` : The webhook URL used to execute the pipeline. 
2. `Pipeline Details` : Redirects you to the pipeline in Harness Pipeline Editor. 
3. `UI URL`: Lists all the recent executions of the pipeline. 

Once you create the workflow with this Workflow action, you can see the pipeline URL running in the background and executing the flow. 

![](static/output-ca.png)


### 3. `harness:create-secret`

### 4. `harness:delete-secret`



### Workflow Actions Usage Limitations

| **Workflow Actions**                      | **Pipelines and Stages**    |
|----------------------------------------|-----------------------------|
| trigger:harness-custom-pipeline        | Supports only [IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage) along with the [Deploy Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage#add-a-stage), [Custom Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage)(**Available with Harness CD License or Free Tier usage**), Pipelines using [Pipeline Templates](https://developer.harness.io/docs/platform/templates/create-pipeline-template/) and [codebase disabled](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md#disable-clone-codebase-for-specific-stages) **Build Stage(Only Available with Harness CI License)** with [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings) |
| trigger:trigger-pipeline-with-webhook  | Supports all the pipelines with a custom webhook based trigger          | 

