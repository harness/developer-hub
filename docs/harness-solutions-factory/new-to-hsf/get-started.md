---
title: Get started with HSF
sidebar_label: Get Started
description: Onboarding guide for HSF
sidebar_position: 20
---

Welcome to the HSF onboarding guide. Discover how Harness accelerate onboarding and adoption by reducing setup time and maintaining best practices

## Pre Deployment of HSF
### Prerequisites

Before beginning, ensure you have: 

- Access to a Harness Account
- Ability to create an admin level token

If you do not meet all these prerequisites but think your organization could benefit from HSF, please reach out to your account team.

## Post Deployment of HSF
Now that HSF has been deployed, what’s next? 

### Create an Organization
1. Go into IDP → Workflows → Execute `Harness Organization Setup` → Enter name and description → Next → Review → Create
    <DocImage path={require('../static/getting-started1.png')} title="Click to view full size image" />
    - **Why?** Assuming that HSF was the first thing that was deployed into your account it is important for you to have a place to learn and start development.
    - In this example we are creating a `Lab` Organization
    - By default this workflow requires an approval from someone in the HSF Admins group.
        <DocImage path={require('../static/getting-started2.png')} title="Click to view full size image" />
    - Approve to review even though there is nothing to be seen yet. Then you will wait for the second approval. Approve what is being added.
    - Once completed click Access Harness Organization. You can also go into IDP → Catalog → Resources

### Create Projects
1. Go into IDP → Workflows → Execute `Harness Project Setup` → Select the organization we created, enter name and description → Next → Review → Create
2. Just like creating an organization, click Approve to review even though there is nothing to be seen yet. Then wait for the second approval. Approve what is being added.
    - Below are the resoures that are now currently in the account - one organization named Lab and two projects named infrastructure and workshop both in the Lab organization. 
    <DocImage path={require('../static/getting-started3.png')} title="Click to view full size image" />

### Customize your Project configuration and apply it
1. Clone `harness-template-library` and `custom-harness-template-library` locally
2. Copy the `harness-project` directory from `harness-template-library` and into `custom-harness-template-library`
    <DocImage path={require('../static/getting-started4.png')} title="Click to view full size image" />
3. In the Harness Console go into Account Settings → Variables → Find and copy the Ids for `Custom Template Library Repo` and `Custom Template Library Connector`
    <DocImage path={require('../static/getting-started5.png')} title="Click to view full size image" />
4. In `custom-harness-template-library/harness-project/.harness` go into `catalog_template.yaml` and find the properties `template_library_connector` and `template_library_repo` and paste in the Ids from above after “variable.account.” It should look like this:
    <DocImage path={require('../static/getting-started7.png')} title="Click to view full size image" />
5. Change `properties: repo_source: default: ` to `custom`
    <DocImage path={require('../static/getting-started8.png')} title="Click to view full size image" />
6. Go into the `idp_registration_mgr.yaml` file
     - add in:   
                ``` 
                  - org: Harness_Platform_Management
                    project: Solutions Factory
                    workflow: 
                         - name: harness-project
                ```
    <DocImage path={require('../static/getting-started9.png')} title="Click to view full size image" />
7. Commit and push these changes
8. Go to Pipelines → Run `Register Custom IDP Templates`
    <DocImage path={require('../static/getting-started10.png')} title="Click to view full size image" />
        - After this runs, you can verify by going into the workflow → View Raw YAML and you will see that the source change to `custom-template-library`
    <DocImage path={require('../static/getting-started11.png')} title="Click to view full size image" />
9. Create a new project using the new custom workflow:
    - Go into IDP → Workflows → Harness Project Setup
10. Make a change in the custom workflow - let’s create a new security group called “Security Champions”
    - Go back into `custom-harness-template-library` and create a new file called `Security_Champions.yaml` under `harness-project/templates/roles` that includes what privileges this group should have. Sample permission sets are included under the `permission_sets` directory. It should look something like this:
        <DocImage path={require('../static/getting-started12.png')} title="Click to view full size image" />
    - Create a new file under `harness-project/templates/groups` that tags the new group. For our example our group will have project viewer and all the privileges that we included in the role. It will look like this:
        <DocImage path={require('../static/getting-started13.png')} title="Click to view full size image" />
    - Commit and push these changes.
    - Some sample permission sets are included in permission_sets
6. Apply the new project custom template to all the projects that are in your account 
    - Run a drift check on the project you crated in step 4. Workspaces → Lab_customized_project → Check for Drift
    - After it runs you will see new resources that need to be created
        <DocImage path={require('../static/getting-started14.png')} title="Click to view full size image" />
    - You will see the workspace for the customized project to be apply needed
        - **Why?** This is a new change in the source code not a modifications that exist on the system
    - Click Provision and Run the pipeline to apply the change
    - If you go into user groups for the customized project you will see the new Security_Champions group!

### Bulk Update Workspaces to Use New Configurations
1. For the projects you created before switching over to use the `custom-harness-template-library` — Go to Pipelines and run `Bulk Workspace Management`
    <DocImage path={require('../static/getting-started16.png')} title="Click to view full size image" />
    - The `workspace_type` will be type assigned to the workspace
    <DocImage path={require('../static/getting-started15.png')} title="Click to view full size image" />
    - `workspace_change_source` should be changed to “yes”
    - Set the `workspace_action` to “apply”
2. Approve the Provision pipelines that get started - this will change the tags and source to use the custom template library and apply the changes. For this example the Security Champions group will be added to all the projects.
    - The approval was added for an extra layer of protection where you can check to make sure a breaking change won’t be added.

There will be a lot of resources that are created into your account once HSF is deployed. Be sure to review [this document](../use-hsf/created-resources.md) to understand what was created and where it all lives. 
