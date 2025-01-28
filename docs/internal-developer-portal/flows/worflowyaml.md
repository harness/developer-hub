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


## Syntax Essentials



