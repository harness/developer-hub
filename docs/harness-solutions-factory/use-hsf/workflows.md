---
title: HSF Workflows
description: Start using HSF by understanding and executing workflows in IDP.
sidebar_position: 2
redirect_from: 
    - /kb/reference-architectures/hsf/hsf-workflows
---
## Default Workflows
These are the workflows that are automatically created when HSF is deployed into your account:

### Harness Organization Setup
A template to request a new Harness Organization to be created or managed
**Resources created:** 1 organization

### Harness Project Setup
A template to request a new Harness Project to be created or managed
**Resources created:** 
- 3 environments (dev, prod, test)
- 6 user groups
- 4 user groups
- 2 roles
- 7 user bindings

|  | approvers | project_admins | project_engineers | all project users |
| --- | --- | --- | --- | --- |
| project viewer | ✅ | ✅ | ✅ | ✅ |
| project admin | ❌ | ✅ | ❌ | ❌ |
| developer | ❌ | ✅ | ✅ | ❌ |

### Harness Central Build Farm Setup
Configures the connectors for a centralized build farm configuration 

### Deploy Harness SAST & SCA Templates
Configures and deploys a series of templates for SCA and SAST scanners.

### Harness CI Image Factory 
The Harness CI Image Factory is a pipeline designed to mirror and replicate the lifecycle of images used by Harness CI module steps.

### Harness Delegate Image Factory 
The Harness Delegate Images Factory is a robust Harness pipeline designed to create and manage the lifecycle of customized Harness Delegate Images.

## Executing a Workflow 
1. Go to **IDP**, then select **Workflows** to see available workflows or deploy a workflow.

   <DocImage path={require('../static/hsf-execute-workflow-1.png')} title="Click to view full size image" />

2. Click **Execute** and follow the prompts to add in additional configurations. 

   <DocImage path={require('../static/hsf-execute-workflow-2.png')} title="Click to view full size image" />

For this example, we are going to create a new project managed by HSF.

### Debug or monitor workflows
3. Click create to run the workflow, and select **Show Logs** to see the output. 

   <DocImage path={require('../static/hsf-execute-workflow-3.png')} title="Click to view full size image" />

4. Scroll down to see another link that will direct you to the **Create and Manage IACM Workspaces** pipeline that is being run to start the workflow.

   <DocImage path={require('../static/hsf-execute-workflow-4.png')} title="Click to view full size image" />

5. After this pipeline is done, it will kick off the **Execute IACM Workspace** pipeline. 

   <DocImage path={require('../static/hsf-execute-workflow-5.png')} title="Click to view full size image" />

To see the logs, navigate to the running instance of the pipeline and monitor it.

   <DocImage path={require('../static/hsf-execute-workflow-6.png')} title="Click to view full size image" />