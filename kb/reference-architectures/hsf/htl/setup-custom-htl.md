---
title: Add Custom Template Library
description: This document will walk you through the steps required to setup a new custom Harness Template Library and connect it to your Harness Solutions Factory deployment.
sidebar_position: 4
---

This document will walk you through the steps required to setup a new custom Harness Template Library and connect it to your Harness Solutions Factory deployment.

A Custom Harness Template Library repository is included with the deployment of your Harness Solutions Factory.  This repo contains a copy of this documentation along with additional configuration files intended to help streamline the setup of new or modified Template Library entries.

_**Note**: If you do not have a Custom Harness Template Library repo in the root of your Harness Platform Management organization, then proceed to the documentation on [How to upgrade your Solutions Factory implementation](../upgrading-installation.md)_

_**Note**: When configuring the Solutions Factory implementation for the first time, the custom-harness-template-library will import the original source repository directly into the repo.  The source for this repo can be found in [Github here](https://github.com/harness-solutions-factory/custom-harness-template-library).  Subsequent updates to the Solutions Factory installation will not synchronize any changes in this repository._

## Leverage your own Source Code Manager

In order to leverage your own Source Code Manager, you will be required to configure several pre-requisites prior to utilizing any templates stored in that repository.

_**Note**: The steps detailed here will assume that you have permissions to create and manage repositories within your Source Code Manager and are able to create and configure the necessary connectors_

### Prerequisites

- A new or existing Source Code Manager (SCM) connector with appropriate permissions

    _**Note**: The reuse of an existing connector or the Central Build Farm connector is possible as this does not require a dedicated connector.  The Connector must live within the scope of either the Account or the Organization. While possible to support a connector at the project level, we advise against it in the event that the connections are required across any of the projects within the Harness Platform Management organization_
- The contents of the Custom Harness Template Library repository pushed into the new repository within your SCM

    _**Note**: While not required, we highly advise setting the initial baseline for your custom repository based on the version provided within the Harness Platform Management repository._

- A delegate with access to your SCM

    _**Note**: This is only required for customers hosting their SCM internal to their networks_

### Modify Standard Variables

- Update the Account-level variable `Custom Template Library Connector` to point to the Connector from which your custom repository will come.  The connector should be prefixed with `account.` or `org.` depending on the scope
- Update the Account-level variable `Custom Template Library Repo` to contain the scoped path to your repository based on your connector setup. _**Note**: If you connector points to the root of your SCM, such as https://github.com, then be sure to provide the full repository path excluding the Connector root details._

## Creating a new Template

A Terraform scaffold is included within the baseline repository (`scaffolds/terraform`).  This scaffold includes everything required to begin building out new templates for use with the Solutions Factory.

[Learn more about creating new templates](./new-terraform-templates.md)

## Updating Harness provided samples and baseline templates

Often, the provided samples and baseline templates do not cover 100% of your use cases and require adjustment. In order to customize the Templates, follow the below steps.

1. Clone the Harness Template Library (HTL) repository locally
2. Clone your Custom Template Library (CTL) repository locally
3. Copy the entire template directory from the HTL repository to the root of the CTL repository
4. In your CTL repository, open the directory that you copied to edit the .harness/catalog_template.yaml file

    _**Note**: This file contains the details for the IDP workflow and will need to be adjusted for your SCM repository_

    a. In the yaml, find the property `template_library_connector` and edit the variable.  By default, the value should be adjusted from `<+variable.account.solutions_factory_template_library_connector>` to `<+variable.account.custom_template_library_connector>`

    b. In the yaml, find the property `template_library_repo` and edit the variable.  By default, the value should be adjusted from `<+variable.account.solutions_factory_template_library_repo>` to `<+variable.account.custom_template_library_repo>`

    c. **STOP** If you plan first test the template using a feature branch and not using the `main` branch, then you will need to modify the value for the property `template_library_branch` to point to your specific branch. _**Note**: Make sure to follow the steps in the section titled `Production Readiness` to ensure that all adjustments are ready to be merged into the main branch._

5. Optionally, the `metadata.name` can be modified to support registering a new copy without first having to replace the original version.
6. Commit and push your changes back to your SCM repository.

## Testing and updating IDP with your new workflow
_**STOP**: It is important to note that two templates of the same `metadata.name` cannot be registered at the same time to the same IDP environment. To resolve this, you will need to first unregister the current version of workflow within IDP._

This step is only required when under the following conditions

- Replacing the Harness provided version
- Modifying the source repository branch

When replacing or modifying a worklfow branch, you will need to `Unregister` the template from your IDP environment. If you modified the `metadata.name` to a new value, then skip to `Step 8`

1. Navigate to Internal Developer Portal (IDP) module within your Harness account
2. In the left hand navigation, select `Catalog` and change the Kind dropdown to `Template`
3. Find the workflow that you need to replace and open the template within IDP. _**Note**: Click the hyperlink for the template name. Do not click the edit buttons_
4. Click the three dots in the upper right-hand corner
5. Choose `Unregister Entity`
6. In the pop-up window, choose `Unregister Location`
7. Wait for the unregistration to complete
8. In the left hand navigation, select `Register`
9. Copy the full repository URL to your new `catalog_template.yaml` file.  _**Note:**: This should be the entire HTTPS path._
10. Paste the URL in the field and click Analyze
11. Click `Import` .  _**Note**: If a matching template `metadata.name` is registered or the original template had not been removed, the button will say `Refresh`.  If this is the case, then **STOP** and retry the steps from `Step 2` in this list_
12. After the import completes, you can open the link to the `template:<template-name>` provided.
13. Verify that the `View Source` is pointed to the correct repository and branch.
14. Click `Launch Template` to test the build

## Production Readiness for Custom Templates

_**STOP**: Review the below prior generating a Pull-Request and finalizing your template changes_

As part of the testing of the new template, it is entirely likely that you created these changes on a non-default branch.  Prior to making the final edits, change any `branch` or `metadata.name` changes you have made to the template.
