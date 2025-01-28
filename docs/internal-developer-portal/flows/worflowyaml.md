---
title: Understanding workflow.yaml
description: 
sidebar_position: 2
sidebar_label: Workflow YAML
---

Workflows are stored in the Software Catalog under the kind **“Template”.** You can create and configure your own workflows in Harness IDP using a YAML file typically named **```workflow.yaml```.** This YAML file acts as the single source of truth, describing the workflow and its metadata. Below is an overview of its configuration.

## What is ```workflow.yaml```?
A workflow is defined through a YAML configuration file, usually named ```workflow.yaml```, which contains all the workflow’s metadata. This file resides in the root directory of the source code repository in your connected Git provider.

The syntax and guidelines for writing this YAML configuration file are governed by Backstage. Learn more about the [backstage guidelines](https://backstage.io/docs/features/software-templates/writing-templates/#specparameters---formstep--formstep) here.

## Components of ```workflow.yaml```
The ```workflow.yaml``` has three main components:
1. **Frontend**: Configures the input fields required for the workflow.
2. **Backend**: Configures the actions to be triggered and the orchestration pipelines to be executed.
3. **Outputs**: Configures output variables to be used after backend execution.

These components work together to facilitate workflow execution. Let’s dive deeper into each.

### Workflow Frontend 
The frontend of Harness IDP workflows is customizable to accept different types of input fields based on custom requirements. This frontend serves as the entry point, where users fill in the necessary details to execute the workflow using the input parameters described.

#### How to define the Workflow Frontend?
You can configure the frontend using the ```spec.parameters``` field in your YAML configuration. 

**Example Syntax**:
```
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
```

### Workflow Backend
The backend of Harness IDP workflows includes a library of steps and actions to define the workflow logic. These steps are core execution units used to trigger actions and orchestration pipelines. Input details from the frontend are passed to the backend for task execution.

#### How to define the Workflow Backend?
You can configure the backend using the spec.steps field in your YAML configuration. 

**Example Syntax**:
```
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
  output:
    links:
      - title: Pipeline Details
        url: ${{ steps.trigger.output.PipelineUrl }}
```

### Workflow Outputs
After backend execution, each step can produce output variables, which can be displayed in the frontend. These outputs can include links to newly created resources like Git repositories, documentation pages, or CI/CD pipelines.

**Example Syntax**:
```
links:
  - title: "Repository Link"
    url: "${{ steps['repo-create'].output.repoUrl }}"
  - title: "Pipeline Dashboard"
    url: "${{ steps['deploy-pipeline'].output.pipelineUrl }}"
```

## Example of ```workflow.yaml```
Here's an example of a single-page workflow:
```
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
  owner: d.p@harness.io
  type: service
  parameters:
    - title: Service Details
      required:
        - project_name
        - template_type
        - public_template_url
        - repository_type
        - repository_description
        - repository_default_branch
        - direct_push_branch
        - slack_id
      properties:
        # This field is hidden but needed to authenticate the request to trigger the pipeline
        # DO NOT Remove this field.
        token:
          title: Harness Token
          type: string
          ui:widget: password
          ui:field: HarnessAuthToken
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
        repository_description:
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
  #steps that are executed in series in the Workflow backend
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


## Syntax Essentials



