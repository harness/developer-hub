---
title: How to configure your Workflows Backend
description: Instructions to integrate individual workflows with actions available and configure the output
sidebar_position: 3
sidebar_label: How to configure your Workflows Backend
---

## Introduction

In Harness IDP, every Workflow has a Harness Pipeline as its backend. Once you’ve created a [Workflows form](/docs/internal-developer-portal/flows/flows-input) to collect inputs from users, these values are passed into the Pipeline through a Workflow Action. This action triggers specific steps in the Pipeline, which can do things like launching a CI/CD process, registering a service in the catalog, or setting up infrastructure.

## Harness Pipeline as Orchestrator

Harness Pipelines serve as powerful orchestrators for Workflows. In this setup you can trigger Harness pipelines directly through a [Workflow Action](/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline). This action accepts the Harness pipeline URL as input, alongside an automatically inserted authentication token under the parameters section just like other inputs required for the pipeline execution. This seamless integration is enabled by Harness IDP being part of the broader Harness SaaS ecosystem, allowing users to even manage Workflows through pipelines RBAC.

We have also built a native [IDP Stage](/docs/internal-developer-portal/flows/idp-stage) to help with Git cloning, cookiecutter templating, repository creation, catalog creation, catalog registration, Slack notifications, and resource creation using Harness IaCM powered by OpenTofu.

This [Harness Specific Workflows Actions](/docs/internal-developer-portal/flows/custom-actions#harness-specific-custom-actions) currently support only [IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage) along with the [Custom Stage](https://developer.harness.io/docs/platform/pipelines/add-a-stage/#add-a-custom-stage)**(Only Available with Harness CD License or Free Tier usage)** and [codebase disabled](http://localhost:3001/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages) **CI stage (Only Available with Harness CI License)** with [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings). **All input, except for [pipeline expressions](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#pipeline-expressions), must be [fixed values](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#fixed-values).**

```YAML {42-58}
##Example YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: onboard-services
  title: Create and Onboard a new react app
  description: A Workflow to create and onboard a new react app
  tags:
    - nextjs
    - react
    - javascript
spec:
  owner: debabrata.panigrahi@harness.io
  type: service
  parameters:
    - title: Next.js app details
      required:
        - project_name
        - github_repo
        - github_org
      properties:
        project_name:
          title: Name of your new app
          type: string
          description: Unique name of the app
        github_repo:
          title: Name of the GitHub repository
          type: string
          description: This will be the name of Repository on Github
        github_org:
          title: Name of the GitHub Organisation
          type: string
          description: This will be the name of Organisation on Github
        github_token:
          title: GitHub PAT
          type: string
          ui:widget: password
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  steps:
    - id: trigger
      name: Creating your react app
      action: trigger:harness-custom-pipeline
      input:
        url: "YOUR PIPELINE URL"
        inputset:
          project_name: ${{ parameters.project_name }}
          github_repo: ${{ parameters.github_repo }}
          github_org: ${{ parameters.github_org }}
          github_token: ${{ parameters.github_token }}
        apikey: ${{ parameters.token }}
    # The final step is to register our new component in the catalog.
  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}
```

In the above example there are two parts:

1. Input from the user
2. Execution of pipeline

Let's take a look at the inputs that the Workflow expects from a developer. The inputs are written in the `spec.parameters` field. It has two parts, but you can combine them. The keys in properties are the unique IDs of fields (for example, `github_repo` and `project_name`). These are the pipeline variables that you need to set as runtime inputs while configuring the pipeline. This is what we want the developer to enter when creating their new application.

The `spec.steps` field contains only one action, and that is to trigger a Harness pipeline. It takes the pipeline `url`,`inputset` containing all the runtime input variables that the pipeline needs and the `apikey` as input.

:::info
The syntax `${{ parameters.x }}` is supported exclusively within the `steps` section when configuring the Workflows Backend. It cannot be used within the `properties` section to reference another parameter.

```YAML {16,24-25}
## Example workflows.yaml
...
spec:
  parameters:
    - title: Service Details
      properties:
        projectId:
            title: Project Identifier
            description: Harness Project Identifier
            type: string
            ui:field: HarnessProjectPicker
        template_type:
          title: Type of the Template
          type: string
          description: Type of the Template
          ui:readonly: $${{ parameters.another_field}}  ## NOT SUPPORTED
  steps:
    - id: trigger
      name: Creating your react app
      action: trigger:harness-custom-pipeline
      input:
        url: "https://app.harness.io/ng/account/account_id/module/idp/orgs/org_id/projects/project_id/pipelines/pipeline_id/pipeline-studio/?storeType=INLINE"
        inputset:
          project_id: ${{ parameters.projectId }}  ## SUPPORTED
          template_type: ${{ parameters.template_type }} ## SUPPORTED
...
```
:::

[Steps](/docs/internal-developer-portal/flows/service-onboarding-pipelines#building-the-workflow-backend) is where you integrate the Harness Pipeline as a Backend and are the core execution units within Workflows. Each step runs an action that might involve triggering a CI/CD pipeline, creating a service in a catalog, or provisioning infrastructure resources.

### Manage variables in the pipeline

The above example uses various pipeline variables. The variables are as follows:

- `<+pipeline.variables.project_name>`
- `<+pipeline.variables.github_username>`
- `<+pipeline.variables.github_token>`
- `<+pipeline.variables.github_org>`
- `<+pipeline.variables.github_repo>`

Except for the secrets all the variables should have a [runtime input type](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-inputs/#runtime-inputs) and the variable name should match with the parameter name used in the Workflow as the values would be pre-populated from the values entered as input in the below IDP Workflow.

For e.g.: `<+pipeline.variables.project_name>` variable is pre-populated by `project_name: ${{ parameters.project_name }}` under `inputset` in the above-mentioned example.

You can use the **Variables** button on the floating sidebar on the right-hand side to open the Variables page for the pipeline.

![](./static/pipeline%20variables.png)

You can create any number of pipeline variables and decide their value type. Some variables, such as a GitHub token, a username, and organization, can have a fixed value. The token used in the code above is a Harness secret whose value is decoded during pipeline execution.

Variables such as project name and GitHub repository are runtime inputs. They are needed at the time of pipeline execution. When creating a new variable, you can specify its type in the UI. For more information about reference variables, go to the [reference documentation](/docs/platform/variables-and-expressions/harness-variables/) on pipeline variables.

### Authenticate the request

Once you have written all the inputs that the Workflow requires, you must add the following YAML snippet under `spec.parameters.properties`.

```yaml
token:
  title: Harness Token
  type: string
  ui:widget: password
  ui:field: HarnessAuthToken
```

:::info

The `token` property we use to fetch **Harness Auth Token** is hidden on the Review Step using `ui:widget: password`, but for this to work the token property needs to be mentioned under the first `page` in-case you have multiple pages.

```
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

:::

Also, the token input is used as a parameter under `steps` as `apikey`

```YAML
  steps:
    - id: trigger
      name: ...
      action: trigger:harness-custom-pipeline
      input:
        url: ...
        inputset:
          key: value
          ...
        apikey: ${{ parameters.token }}
```

### Support for Harness Account Variables

In the context of Harness IDP you can use all the **[custom account variables](https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable#define-variables)** and **[account scoped built-in variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-expressions-reference)** in Workflow YAML.

```YAML
...
  steps:
    - id: trigger
      name: <+variable.account.projectIdentifier>
      action: trigger:harness-custom-pipeline
      input:
        url: https://app.harness.io/ng/account/<+account.identifier>/module/idp/orgs/<+variable.account.orgIdentifier>/projects/<+variable.account.projectIdentifier>/pipelines/pipeline_id/pipeline-studio/?storeType=INLINE
...
```

### Fetch Output from Harness Pipeline onto IDP

When using the Workflow action [`trigger:harness-custom-pipeline`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline) can as well configure the output to display the pipeline [output variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#input-and-output-variables), by setting the `showOutputVariables: true` under `inputs`and adding `output` as shown in the example below:

<details>
<summary>Example YAML</summary>

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

</details>

:::info

Only **user defined output variables** are allowed, but you can as well use the system generated variables by assigning them as a new variable under shell script step as displayed below. For e.g. we have mentioned the system generated output as `jira_id` and under **Optional Configuration** added a **test-var** which becomes a user defined output variable and could be displayed as output in the IDP workflows.

![](./static/output-variable.png)

:::

There are two ways in which you can add the output variable to the Workflows syntax.

1. You can directly mention the output variable name `${{ steps.trigger.output.test2 }}`, here `test2` is the output variable name we created in the pipeline.

2. You can copy the JEXL expression of the output variable and remove the JEXL constructs, `${{ steps.trigger.output['pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1'] }}`, here the part `pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1` comes from `<+pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test2>` copied from execution logs.

![](./static/output-variables.png)

### Hide Logs

You can now optionally remove the pipeline URL from the workflow execution logs, for this you need to use the boolean property `hidePipelineURLLog` and set the value as `true`.

```YAML {8}
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

### Hide or mask sensitive data on Review step

Sometimes, specially in custom fields, you collect some data on Create form that
must not be shown to the user on Review step. To hide or mask this data, you can
use `ui:widget: password` or set some properties of `ui:backstage`:

```YAML
- title: Hide or mask values
  properties:
    password:
      title: Password
      type: string
      ui:widget: password # will print '******' as value for property 'password' on Review Step
    masked:
      title: Masked
      type: string
      ui:backstage:
        review:
          mask: '<some-value-to-show>' # will print '<some-value-to-show>' as value for property 'Masked' on Review Step
    hidden:
      title: Hidden
      type: string
      ui:backstage:
        review:
          show: false # wont print any info about 'hidden' property on Review Step
```

### Show Logs After a Successful Workflow Execution

In case of a successful workflow execution in order to view logs, you need to select the three dots on the right corner of the page, and select Show Logs from the dropdown.

![](./static/navigate-logs.png)
![](./static/logs-view.png)

### Use-Case Based Output Examples

1. **Links to Generated Resources**
   The output can generate direct links to newly created resources such as Git repositories, documentation pages, or CI/CD pipelines. This gives the developer immediate access to manage or monitor their newly onboarded resources.

**Example**:

```YAML
output:
  links:
    - title: "Repository Link"
      url: "${{ steps['repo-create'].output.repoUrl }}"
    - title: "Pipeline Dashboard"
      url: "${{ steps['deploy-pipeline'].output.pipelineUrl }}"

```

2. **Service Metadata and Status**
   Output can include status messages or metadata from the onboarding process. For example, details about a service registration or the progress of resource provisioning (success/failure messages) can be returned as output.

**Example**:

```YAML
output:
  text:
    - title: "Service Registration Status"
      content: "Service registration completed with status: `${{ steps['register-service'].output.status }}`
```

3. **Generated Files and Artifacts**
   Developers can configure Workflows to generate files (e.g., README.md, YAML configuration files) or artifacts (e.g., Dockerfiles, Kubernetes manifests) during onboarding.

**Example**:

```YAML
output:
  links:
    - title: "Generated README"
      url: "${{ steps['create-readme'].output.fileUrl }}"
    - title: "Kubernetes Manifest"
      url: "${{ steps['generate-manifest'].output.fileUrl }}"
```

4. **Dynamic Outputs Based on Inputs**
   Outputs can be conditional based on inputs. For instance, if a user selected the "production" environment during onboarding, the output could include production-specific links (e.g., monitoring dashboards, production CI/CD pipelines).

Each individual step can output some variables that can be used in the Workflow frontend for after the job is finished. This is useful for things like linking to the entity that has been created with the backend, linking to the created repository, or showing Markdown text blobs. **[Read more on how to configure output](/docs/internal-developer-portal/flows/flows-output.md)**.

```YAMl
output:
  links:
    - title: Repository
      url: ${{ steps['publish'].output.remoteUrl }} # link to the remote repository
    - title: Open in catalog
      icon: catalog
      entityRef: ${{ steps['register'].output.entityRef }} # link to the entity that has been ingested to the catalog
  text:
    - title: More information
      content: |
        **Entity URL:** `${{ steps['publish'].output.remoteUrl }}`
```

### Use parameters as condition in steps

Example [`workflows.yaml`](https://github.com/harness-community/idp-samples/blob/35341522c0035107a3b610018f42372cebd8a664/workflow-examples/conditional-in-steps.yaml#L25-L45)

<details>
<summary>Example YAML</summary>

```YAML
- name: Only development environments
  if: ${{ parameters.environment === "staging" or parameters.environment === "development" }}
  action: debug:log
  input:
    message: 'development step'

- name: Only production environments
  if: ${{ parameters.environment === "prod" or parameters.environment === "production" }}
  action: debug:log
  input:
    message: 'production step'

- name: Non-production environments
  if: ${{ parameters.environment !== "prod" and parameters.environment !== "production" }}
  action: debug:log
  input:
    message: 'non-production step'
```

</details>

#### The Example Workflow Explained

- Parameters: The user selects the environment from the predefined list: development, staging, production, or prod.

- Steps:

  - Development Step: Executed only if the environment is development or staging.
  - Production Step: Executed only if the environment is production or prod.
  - Non-Production Step: Executed only if the environment is not production or prod.

- Conditionals (if statements): The `if` condition allows execution of steps based on the selected environment.

- Output: A sample output section is included, where you can route the result of any step to view the logs. Replace the URL field with an appropriate log service URL if needed.

This Workflow showcases how you can use conditionals `if` to control which steps run based on the environment selected by the user.

![](./static/conditional-in-step.png)
