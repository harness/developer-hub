---
title: Self Service Workflows Overview
description: Self-Service Workflows enable a developer to spawn new software applications easily while following the company's best practices.
sidebar_position: 1
sidebar_label: Overview
redirect_from:
  - /docs/internal-developer-portal/features/service-onboarding-pipelines
---

![](./static/service-onboarding.png)

In Harness IDP, a Self-Service Workflow (also known as a software template in Backstage) enables platform engineers to automate the process of service creation. As a platform engineer, you can create a workflow that prompts developers for details and then generates a repository with a basic setup that includes a CI/CD process. The workflow is defined in a YAML file named `workflow.yaml`. The [syntax](https://backstage.io/docs/features/software-templates/input-examples) of the workflow definition is managed by backstage.io, while the workflow itself runs on a Harness pipeline of your choice.

**Workflows** are stored in the **Catalog** under a **`kind` Template**.

![](./static/workflows-mindmap.png)

<!-- See it in action: Demo video -->

**To get started, check out the tutorial to [create your first Workflow](/docs/internal-developer-portal/get-started/workflow-quickstart).**

## How to write IDP Workflows

Workflows in Harness IDP is powered by the Backstage Software Template. You can create your own Workflows with a small YAML definition which describes the Workflow and its metadata, along with some input variables that your Workflow will need, and then a list of actions which are then executed by the scaffolding service. Here's an example Workflow definition YAML: 

Read More on [Backstage Software Template](https://backstage.io/docs/features/software-templates/writing-templates).


```YAML
##Example YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
# some metadata about the Workflow itself
metadata:
  name: react-app
  title: Create a new service
  description: A Workflow to create a new service
  tags:
    - nextjs
    - react
    - javascript
# these are the steps which are rendered in the frontend with the form input
spec:
  owner: debabrata.panigrahi@harness.io
  type: service
  parameters:
    - title: Service Details
      required:
        - project_name
        - template_type
        - public_template_url
        - repository_type
        - repositoty_description
        - repository_default_branch
        - direct_push_branch
        - slack_id
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
        public_template_url:
          title: Give a Public template URL
          type: string
          description: Give a Public Cookiecutter Template  
        repository_type:
          type: string
          title: Repository Type
          enum:
            - public
            - private
          default: Public
        repositoty_description:
          type: string
          title: Add a description to your repo
          description: Auto-generated using Self-Service-Flow of Harness-IDP     
        owner:
          title: Choose an Owner for the Service
          type: string
          ui:field: OwnerPicker
          ui:options:
            allowedKinds:
              - Group
        # This field is hidden but needed to authenticate the request to trigger the pipeline
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
  # here's the steps that are executed in series in the scaffolder backend
  steps:
    - id: trigger
      name: Creating your react app
      action: trigger:harness-custom-pipeline
      input:
        url: "https://app.harness.io/ng/account/account_id/module/idp/orgs/org_id/projects/project_id/pipelines/pipeline_id/pipeline-studio/?storeType=INLINE"
        inputset:
          project_name: ${{ parameters.project_name }}
          template_type: ${{ parameters.template_type }}
          public_template_url: ${{ parameters.public_template_url }}
        apikey: ${{ parameters.token }}
  # some outputs which are saved along with the job for use in the frontend
  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}
```

## Syntax for Workflows YAML

You might have noticed variables wrapped in `${{ }}` in the examples. These are strings for linking and gluing the different parts of the Workflows together. All the form inputs from the `parameters` section will be available by using this syntax (for example, `${{ parameters.project_name }}` inserts the value of `project_name` from the parameters). This is great for passing the values from the form into different steps and reusing these input variables.

These strings preserve the type of the parameter.

The `${{ parameters.project_name }}` pattern will work in the Workflows file to pass the parameters from the UI to the input of the `trigger:harness-custom-pipeline` step.

As you can see above in the `Outputs` section, `actions` and `steps` can also output things. You can grab that output using `steps.$stepId.output.$property`.

You can read more about all the `inputs` and `outputs` defined in the actions in code part of the `JSONSchema`

It is important to remember that all examples are based on [react-jsonschema-form](https://rjsf-team.github.io/react-jsonschema-form/).


## Using the Workflows Editor

Harness IDP provides an in-built editor to help you build the Workflows, it provides a real-time preview of the corresponding UI based on the YAML definition of the Workflows. Here you can work on building a new workflows along with trying out changes with the existing workflows. **You can't save the changes made here, rather you have to copy the changes made to the YAML and add it to the Workflow definition YAML stored in your git provider**. On the Workflows page go to **Open Playground** -> **Edit Template Form** to open the Workflows Editor. 

![](./static/template-editor-1.png)
![](./static/template-editoer-2.png)
![](./static/template-editor-3.png)


Let's dive in and pick apart what each of these sections do and what they are.

![](./static/yaml-syntax-workflow.png)

## Frontend of the Workflow

**Workflows** are stored in the **Catalog** under a **`kind` Template**. The minimum that is needed to define the frontend of the Workflows is a `workflows.yaml` file with metadata like `parameters`. In a Workflow, the **input parameters** are the first interaction point for developers. They define the structure and types of data needed to initiate the onboarding process.

1. **Parameter Types**:
   Workflow definition can accept a wide range of input types, such as:
   - **String**: Simple text fields used for names, IDs, or environment types.
   - **Integer**: Used for numeric inputs, such as setting a quota or defining age limits.
   - **Array**: Useful for handling multiple inputs, like a list of dependencies or services.
   - **Object**: When using more complex structures, nested fields can be defined using object types.
   
2. **User Interaction and Validation**:
   - Inputs can include UI widgets that make user interaction easier. For example, a string input can have a `ui:field` of [`OwnerPicker`](/docs/internal-developer-portal/flows/flows-input#harness-specific-ui-pickers) to allow users to select team members from a dropdown list. 

   - **Default values**: You can set default values for parameters to guide users on commonly used values, making onboarding quicker and more user-friendly.
   - **Field Dependency**: Input fields can be made dynamic using `anyOf` or `allOf`, where only certain fields become visible based on the user’s previous choices. For instance, selecting a "production" environment could trigger additional input fields for production-specific configurations.
   
3. **Required Fields**:
   Workflows allow developers to enforce required fields. For example, the field `age` or `owner` could be marked as mandatory, ensuring critical data is not skipped during onboarding.

### Where to Add the Frontend Forms 

These `parameters` are Workflow variables which can be modified in the frontend as a sequence. It can either be one `Step` if you just want one big list of different fields in the frontend, or it can be broken up into multiple different steps which would be rendered as different steps in the Workflows Frontend.

Each `Step` is `JSONSchema` with some extra goodies for styling what it might look like in the frontend. For these steps we rely very heavily on this [library](https://github.com/rjsf-team/react-jsonschema-form). They have some [great docs](https://rjsf-team.github.io/react-jsonschema-form/docs/) and a [playground](https://rjsf-team.github.io/react-jsonschema-form) where you can play around with some examples.

There's another option for that library called `uiSchema` which we've taken advantage of, and we've merged it with the existing `JSONSchema` that you provide to the library. These are the little `ui:*` properties that you can see in the step definitions.

**[Read More on building the Workflows UI Form](/docs/internal-developer-portal/flows/flows-input)**

For example if we take the **simple** example from the playground it looks like this:

<details>
<summary>Example json</summary>

```json
// jsonSchema:
{
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
      "default": "Chuck"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "nicknames":{
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}

// uiSchema:
{
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "given-name"
  },
  "lastName": {
    "ui:emptyValue": "",
    "ui:autocomplete": "family-name"
  },
  "nicknames": {
    "ui:options":{
      "orderable": false
    }
  },
  "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}
```
</details>

It would look something like the following in a Workflow definition YAML:

<details>
<summary>Example YAML</summary>

```YAML
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: v1beta3-demo
  title: Test Action Workflow
  description: Workflow Demo
spec:
  owner: backstage/techdocs-core
  type: service

  parameters:
    - title: A registration form
      description: A simple form example.
      type: object
      required:
        - firstName
        - lastName
      properties:
        firstName:
          type: string
          title: First name
          default: Chuck
          ui:autofocus: true
          ui:emptyValue: ''
          ui:autocomplete: given-name
        lastName:
          type: string
          title: Last name
          ui:emptyValue: ''
          ui:autocomplete: family-name
        nicknames:
          type: array
          items:
            type: string
          ui:options:
            orderable: false
        telephone:
          type: string
          title: Telephone
          minLength: 10
          ui:options:
            inputType: tel
```

</details>

### Adding the owner

By default the [owner](https://developer.harness.io/docs/internal-developer-portal/catalog/how-to-create-idp-yaml#spec-owner) is of type **Group** which is same as the **[User Group](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups/#built-in-user-groups)** in Harness. In case the owner is a user you have to mention it as `user:default/debabrata.panigrahi` and it should only contain the user name not the complete email id. 

A simple `workflow.yaml` definition might look something like this:

```YAML {4}
...
# these are the steps which are rendered in the frontend with the form input
spec:
  owner: debabrata.panigrahi@harness.io
  type: service
  parameters:
    - title: Service Details
      properties:   
        owner:
          title: Choose an Owner for the Service
          type: string
          ui:field: OwnerPicker
          ui:options:
            allowedKinds:
              - Group
        # This field is hidden but needed to authenticate the request to trigger the pipeline
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
...

```

## Building the Workflow Backend

### Where to Add the Backend Integration: Action Customization

**Steps** are the core execution units within Workflows. Each step runs an action that might involve triggering a CI/CD pipeline, creating a service in a catalog, or provisioning infrastructure resources. The inputs gathered from the user are passed into these steps, and the outputs are generated based on the results of each step.

Actions within steps can be customized to fit various use cases, such as:

- **Creating Repositories**: Using [`trigger:harness-custom-pipeline`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline) and execute a pipeline with [create-repo stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage#3-create-repo) to generate a new repository based on the provided input.
- **Logging Data**: Using `debug:log` to display or log specific information about the inputs.
- **Triggering Pipelines**: Using [`trigger:harness-custom-pipeline`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline) to pipelines in Harness for various actions like creating repository, [onboarding new service](https://developer.harness.io/docs/internal-developer-portal/flows/create-a-new-service-using-idp-stage), etc. 

These follow the same standard format:

```YAML
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

[Read More](/docs/internal-developer-portal/flows/custom-actions) on the Available Workflow Actions.

### Using Harness Pipeline as an Orchestrator

Harness Pipelines serve as powerful orchestrators for Workflows. In this setup you can trigger Harness pipelines directly through a [Workflow Action](/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline). This action accepts the Harness pipeline URL as input, alongside an automatically inserted authentication token under the parameters section just like other inputs required for the pipeline execution. This seamless integration is enabled by Harness IDP being part of the broader Harness SaaS ecosystem, allowing users to even manage Workflows through pipelines RBAC. [Read More](/docs/internal-developer-portal/flows/flows-output#harness-pipeline-as-orchestrator)

### Configuring the Output

**Example: Links to Generated Resources**
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


## Workflow Registration

A Workflow is a kind of entity that exists in the software catalog. You can create a `workflow.yaml` file and register the URL with the catalog. For information about adding a Workflow, go to [Add a new software component to the catalog](/docs/internal-developer-portal/get-started/register-a-new-software-component).

## Delete/Unregister Workflows

1. Navigate to the **Catalog** page, and select **Template** under Kind.

![](./static/catalog-navigation.png)

2. Select the Workflow Name you want to Unregister.
3. Now on the Workflows overview page, click on the 3 dots on top right corner and select **Unregister Entity**.

![](./static/unregister-entity.png)

4. Now on the Dialog box select **Unregister Location**.

![](./static/Unregister-location.png)

5. This will delete the Workflow.

## Available Workflow Actions

Harness IDP ships the following Harness related built-in actions along with [some others](/docs/internal-developer-portal/flows/custom-actions) to be used in the Workflow `steps`.

- `trigger:harness-custom-pipeline`
- `trigger:trigger-pipeline-with-webhook`
- `harness:create-secret`
- `harness:delete-secret`

Learn more about how to use them in the [service onboarding tutorial](/docs/internal-developer-portal/flows/create-a-new-service-using-idp-stage).

## Available Workflow UI pickers

Harness IDP ships the following [Workflows UI pickers](/docs/internal-developer-portal/flows/custom-actions.md) that can be used in the Workflows form for developers to select from.

- `HarnessOrgPicker`
- `HarnessProjectPicker`
- `HarnessAutoOrgPicker`

You can use these UI fields in the `ui:field` option of your `workflows.yaml` file. Read more about how to use these [Workflows UI Pickers](/docs/internal-developer-portal/flows/flows-input#workflow-ui-pickers).
