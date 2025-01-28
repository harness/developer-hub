---
title: Managing Workflows
description: 
sidebar_position: 3
sidebar_label: Managing Workflows
---

## Workflows in Software Catalog
Once a workflow is registered, it is stored in the Software Catalog under the kind **“Template”**.

### Accessing Workflows
1. Navigate to the **“Catalog”** page in Harness IDP.
2. Select **“Template”** from the catalog component filter to view all workflows.

You can inspect the catalog metadata for a workflow by clicking on the three dots in the top-right corner and selecting “Inspect Entity”.

## Managing Workflows 
You can manage your workflows from Harness IDP directly. Let's dive deeper into specific functions.

### Registering Workflows 
You can register a new workflow just like you register a new entity in your software catalog, refer to this guide for more details. 
1. Create a ```workflow.yaml``` file in your source code repository.
2. Go to the **“Workflows”** page in Harness IDP and click **“Register a new workflow”**.
3. Provide the URL of the ```workflow.yaml``` file. Learn more about registering workflows.

### Updating Workflows
You can update/edit your workflows from your Harness IDP by updating your workflow.yaml file: 
1. In the workflows page, click the three dots on the desired workflow.
2. Select **“Edit Workflow”** to modify the YAML file.
3. Save changes by committing the updated YAML file.
4. Refresh the workflow in Harness IDP to apply changes.

### Deleting Workflows
You can delete your workflow as well: 
1. Select the workflow from the software catalog view.
2. Click the three dots in the top-right corner and choose “Delete.”

### Executing Workflows
You can launch workflows directly from the **“Workflows”** page in Harness IDP. Users will be prompted to provide input details via the configured frontend, and the workflow will execute accordingly.




