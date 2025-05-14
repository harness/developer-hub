---
title: Self Service Workflows Overview
description: Get started with Self Service Workflows in Harness IDP. 
sidebar_position: 1
sidebar_label: Overview
redirect_from:
  - /docs/internal-developer-portal/flows/service-onboarding-pipelines
---

**Service and Infrastructure onboarding** in today’s world is slow, manual and tedious. Developers often spend days—or even weeks—setting up new software and completing Day-2 operations. This inefficiency arises from either waiting for ticket resolutions (TicketOps) or manually handling repetitive tasks, which results in a poor developer experience and decreased productivity.

Harness IDP addresses these challenges with **Self-Service Workflows**.

Workflows enable developer self-service by automating manual tasks and processes. Using Workflows, platform engineering teams can:
- Automate new service onboarding.
- Simplify Day 2 operations for developers.
- Provide developers with **golden paths** to production that include guardrails and best practices.

## Workflow Basics 
Let’s get started with the fundamental steps to **understand, build, and configure a Workflow** from scratch.  

### [Get Started with Workflows](/docs/internal-developer-portal/get-started/workflows-2o.md)
Ready to start using Workflows? Follow our [**Quickstart Guide**](/docs/internal-developer-portal/get-started/workflows-2o.md) and **create your first Workflow** in just a few minutes.

1. **Register the Workflow** using the `workflow.yaml` file configuration.  
2. **Execute the Workflow** by providing input details as defined in the configuration.  
3. **Inputs are processed**, **backend actions are triggered**, and **orchestration pipelines** execute tasks according to the Workflow logic.  
4. **Outputs are generated** as specified in the `workflow.yaml` configuration.  

### [Understanding Workflow YAML](/docs/internal-developer-portal/flows/worflowyaml.md) 
Workflow is defined using a **YAML configuration** file, typically named **`workflow.yaml`**, which contains all the metadata required for the Workflow. This file is stored in the **root directory** of the source code repository in your connected Git provider.

#### **Components of `Workflow.yaml`**
The `workflow.yaml` file is divided into three key components:

1. **Frontend**: Defines the **input fields** required for the Workflow.  
2. **Backend**: Configures the **actions** to be triggered and the **orchestration pipelines** to be executed during the Workflow.  
3. **Outputs**: Specifies the **output variables** to be shown to developers after the execution.  

Learn more about the [**Workflow YAML syntax**](/docs/internal-developer-portal/flows/worflowyaml.md) here. 

### Configuring Workflows

You can configure your workflow's **frontend** and **backend** by defining specific **inputs, actions**, and **orchestration pipelines**. Here’s how you can learn more about configuring your workflows:  

- Learn how to [**configure and customize inputs**](docs/internal-developer-portal/flows/flows-input.md) for your workflow’s frontend.  
- Learn how to [**define actions**](docs/internal-developer-portal/flows/custom-actions.md) for your workflow’s backend.  
- Get started with [**setting up your workflow’s backend using Harness Pipelines**](docs/internal-developer-portal/flows/harness-pipeline.md).  


### [Registering Workflows](/docs/internal-developer-portal/flows/manage-workflows.md)
Once your `workflow.yaml` is ready, you can **register a new workflow** directly in Harness IDP. Refer to this [**detailed guide**](/docs/internal-developer-portal/flows/manage-workflows.md) to learn how to create and manage your workflows seamlessly from Harness IDP.


## Key Capabilities
Harness IDP Workflows allow **developers** to focus on **building features** while **platform engineers** simplify **complex processes and enforce standards**. Backstage offers basic automation through its Scaffolder, which focuses on creating and registering new components in its Catalog. 

Harness goes beyond this with comprehensive developer automation. Here’s how:
- **Harness Pipelines**: A powerful YAML-based automation workflow engine derived from Harness’s CI/CD modules.
- **Prebuilt integrations**: Connect seamlessly with tools like ServiceNow, Jira, Slack, and other DevOps solutions.
- **Version control**: Manage Workflows and Pipelines in Git for easy collaboration and rollback.
- **Pipeline Studio**: An intuitive visual interface for creating and editing Pipelines within Harness IDP.

For more details on what **Harness IDP** adds on top of Backstage software templates, please refer to the **[docs here](/docs/internal-developer-portal/harness-vs-backstage.md)**. 

