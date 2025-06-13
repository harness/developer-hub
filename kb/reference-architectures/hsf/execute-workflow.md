---
title: Executing a Workflow
description: Start using HSF by executing a workflow via IDP.
sidebar_position: 3
---

In order to deploy a workflow or look at the catalog to see what workflows are available go to IDP → Workflows.

   <DocImage path={require('../static/hsf-execute-workflow-1.png')} title="Click to view full size image" />

To execute click ‘Execute’ and follow the prompts to add in additional configurations. 

   <DocImage path={require('../static/hsf-execute-workflow-2.png')} title="Click to view full size image" />

For this example, we are going to create a new project managed by HSF.

### How to debug or monitor workflows
After you click create you will see a workflow being kicked off. You can click ‘Show Logs’ to see the output. 

   <DocImage path={require('../static/hsf-execute-workflow-3.png')} title="Click to view full size image" />

If you scroll down you will see another link that will direct you to the **Create and Manage IACM Workspaces** pipeline that is being run to start the workflow.

   <DocImage path={require('../static/hsf-execute-workflow-4.png')} title="Click to view full size image" />

After this pipeline is done, it will kick off the **Execute IACM Workspace** pipeline. 

   <DocImage path={require('../static/hsf-execute-workflow-5.png')} title="Click to view full size image" />

To see the logs you can navigate to the running instance of the pipeline and monitor it.

   <DocImage path={require('../static/hsf-execute-workflow-6.png')} title="Click to view full size image" />