---
title: Self Service Workflows Overview
description: Self-Service Workflows enable a developer to spawn new software applications easily while following the company's best practices.
sidebar_position: 1
sidebar_label: Overview
redirect_from:
  - /docs/internal-developer-portal/features/service-onboarding-pipelines
---

Service onboarding in today’s tech world is slow and tedious. Developers often spend days—or even weeks—setting up new software and completing Day 2 operations. This inefficiency arises from either waiting for ticket resolutions (TicketOps) or manually handling repetitive tasks, which results in a poor developer experience and decreased productivity.

Harness IDP addresses these challenges with **Self-Service Workflows**.

Workflows enable developer self-service by automating manual tasks and processes. Using Workflows, platform engineering teams can:
- Automate new service onboarding.
- Simplify Day 2 operations for developers.
- Provide developers with **golden paths** to production that include guardrails and best practices.

## Workflow Basics 
Let’s get started with the fundamental steps to understand, build and configure a Workflow from scratch.

### Ideal Workflow Lifecycle
Here’s an overview of the typical lifecycle of a Workflow in Harness IDP:
1. **Platform engineer registers a Workflow** using the ```workflow.yaml``` file configuration.
2. **Developer executes the Workflow** and provides input details as defined in the configuration by the platform team.
3. **Inputs are processed, triggering backend actions** and executing Harness Pipelines. Tasks are executed according to the Workflow logic.
4. **Outputs are generated**, as specified in the workflow.yaml configuration.

### Understanding workflow.yaml 
Workflow is defined using a YAML configuration file, typically named `workflow.yaml`, which contains all the metadata required for the Workflow. This file is stored in the root directory of the source code repository in your connected Git provider.

#### **Components of `workflow.yaml`**
The `workflow.yaml` file is divided into three key components:

1. **Frontend**: Defines the input fields required for the Workflow.  
2. **Backend**: Configures the actions to be triggered and the orchestration pipelines to be executed during the Workflow.  
3. **Outputs**: Specifies the output variables to be used after backend execution.  



:::info
#### Get Started
Ready to start using Workflows? Follow our Quickstart guide and create your first Workflow in just a few minutes.
:::

## Key Capabilities
Workflows allow developers to focus on building features while platform engineers simplify complex processes and enforce standards. 

Backstage offers basic automation through its Scaffolder, which focuses on creating and registering new components in its Catalog. 

Harness goes beyond this with comprehensive developer automation. Here’s how:
- **Harness Pipelines**: A powerful YAML-based automation workflow engine derived from Harness’s CI/CD modules.
- **Prebuilt integrations**: Connect seamlessly with tools like ServiceNow, Jira, Slack, and other DevOps solutions.
- **Version control**: Manage Workflows and Pipelines in Git for easy collaboration and rollback.
- **Pipeline Studio**: An intuitive visual interface for creating and editing Pipelines within Harness IDP.


