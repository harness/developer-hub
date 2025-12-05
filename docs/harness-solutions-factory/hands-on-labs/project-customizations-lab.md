---
title: Customizing your Harness Project Configuration
sidebar_label: Project Customization Lab
description: Customize the Project Template
sidebar_position: 20
---

:::note
*Before proceeding, ensure that the Harness Solutions Factory has been deployed into your account*
:::

### Modify the Harness Project Setup workflow to source from the Custom Template Library

1. Log into your Harness Account and select `Code Repository`
2. Change your scope to the organization named `Harness Platform Management`
3. Select the repository - `harness-template-library` and clone this locally to your machine
4. Select the repository - `custom-harness-template-library` and clone this locally to your machine
5. Open both repositories in separate VSCode windows. *When prompted, **do not click** `Reopen in Container`. We will do this after the initial copy process*
6. Locally, in the `harness-template-library` repository, find the folder named `harness-project`
7. Copy the folder to the root of the `custom-harness-template-library`
8. Prepare the IDP Resource Manager file
    - Open the `idp_registration_mgr.yaml` in the repository `harness-template-library`
    - Find the `harness-project` entry
        ```
        - org: Harness_Platform_Management
            project: Solutions_Factory
            workflows:
            - name: harness-project
        ```
    - Open the `idp_registration_mgr.yaml` in the repository `custom-harness-template-library`
    - Paste the above code snippet entry under the `entities` key.
        :::note 
        You will need to remove the `[]` at the end of this line `entities: []`
        :::    

9. Reopen the `custom-harness-template-library` in the container
    - On the bottom left corner of VSCode is a blue box `><`, click on this icon to open the DevContainers management panel and choose `Reopen in Container`
10. Now we will modify the Harness IDP workflow for the `harness-project` template - open the file `harness-project/.harness/catalog_template.yaml` in VSCode
    :::note
    There are account level variables that manage the configuration of the Custom Template Library Connector and Repositories. You can access these variables and adjust them by updating the variable in the Account Settings for the platform.
    :::
11. Find and Modify the following `Solutions Factory Details` parameters to match the following values
```
            template_library_connector:
              type: string
              default: <+variable.account.custom_template_library_connector>
              ui:widget: hidden
            template_library_repo:
              type: string
              default: <+variable.account.custom_template_library_repo>
              ui:widget: hidden
            template_library_branch:
              type: string
              default: main
              ui:widget: hidden
```
12. Find and Modify the following `Solutions Factory Options` parameters to match the following values 
```
repo_source: 
        type: string 
        # Used to group by source the workspaces for bulk actions 
        default: custom 
        ui:widget: hidden
```
13. Save and Commit your changes.
    :::note
    For this workshop, we will just commit directly to* `main`*. In a different workshop, we will work through a feature branch upgrade process
    :::
14. Push your changes to Harness Code
15. Find and Execute the pipeline named `Register Custom IDP Templates`:
    - Navigate to the `Solutions Factory` project in your Harness Account
    - Filter your pipelines by typing `idp` in the pipeline search bar
    :::note
    For this execution, we will make no changes to the inputs and accept the default details
    ::: 
16. Navigate to IDP and review the YAML for the workflow `harness-project`
    :::note 
    If you would like to verify that the change has been made, you can click the three dots and choose `View Yaml`. You should see the following annotations:
    :::
    ```
    annotations:
        is_harness_official: "False"
        source: custom-template-library
        created_by: custom
    ```
17. Create a new Project with the name `Custom Project`
    - Wait for the execution to complete.
18. Review the IACM Workspace `Lab_Custom-Project` in the `Solutions Factory` project
    - Select the Configuration Tab
    - Notice the Tags `source:custom` and `type:harness-project`
    - Verify that the Repository Git Connector is `Custom Harness Template Library Repo`

### Customize your Harness Project template

1. Open the `custom-harness-template-library` in VSCode. Make sure you `Reopen in Container`
2. Create the file `harness-project/templates/roles/Security_Admins.yaml`
3. Copy the contents from this file `harness-project/templates/roles/permission_sets/Security_Orchestration.yaml` into the new role file created.
    :::note
    Multiple permissions could be added and interspersed from other permission sets. For the purposes of this exercise, we will just copy the entire set.
    ::: 
4. Create the file `harness-project/templates/groups/Security_Champions.yaml`
5. Copy the contents from this file `harness-project/templates/groups/Project_Viewers.yaml` into the new group file created.
6. Add a new role binding to include our new role. 
    ```
    - role: Security_Admins 
      resource_group: _all_project_level_resources
    ```
7. Save and commit your changes.
    :::note
    For this workshop, we will just commit directly to main. In a different workshop, we will work through a feature branch upgrade process
    ::: 
8. Push your changes to Harness Code
9. Apply customizations to the custom project
    - Navigate to the `Solutions Factory` project in your Harness Account
    - Open the IACM Workspaces and select the workspace `Lab_Custom-Project`
    - Click Provision and Run the pipeline
        :::note 
        This pipeline will require a review to verify the changes to be applied. Based on the changes included, you should see four resources Added
        :::
    - Approve the change and wait for the pipeline to finish
10. Navigate to the `Custom Project` project and look at the new RBAC configuration that was added
11. Apply the change to all the existing workspaces
    -  Navigate to the `Solutions Factory` project in your Harness Account
    - Filter your pipelines by typing `iacm` in the pipeline search bar
    - Run the pipeline `Bulk Workspace Management`
        - WORKSPACE_SOURCE = `official`
        - WORKSPACE_TYPE = `harness-project`
        - WORKSPACE_STATUS = `any`
        - WORKSPACE_CHANGE_SOURCE = `yes`
        - WORKSPACE_ACTION = `apply`
        :::note 
        This pipeline will migrate the original two projects created to use our new custom-template-library changes.
        ::: 
    - After the `Bulk Workspace Management` completes, it will have started new executions of the `Provision Workspace` pipeline for each matching IACM Workspace
    - Approve the changes to the existing workspaces
12. Verify the changes have been applied.
    - The projects should include the new changes
    - The Workspaces will now be `source:custom` and the Repository Git Connector is `Custom Harness Template Library Repo`