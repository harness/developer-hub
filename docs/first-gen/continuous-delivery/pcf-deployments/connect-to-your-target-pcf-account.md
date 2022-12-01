---
title: Connect to Your Target Tanzu Account
description: Set up the Harness Delegate in your PCF environment and add the Cloud Provider used to connect to your PCF cloud for deployment.
sidebar_position: 20
helpdocs_topic_id: nh4afrhvkl
helpdocs_category_id: emle05cclq
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic sets up the Harness Delegate in your Tanzu Application Service (TAS, formerly PCF) environment and adds the Cloud Provider used to connect to your Tanzu cloud for deployment.


### Before You Begin

* See [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### Step 1: Set Up the Harness Delegate

The Harness Delegate is a service you run in your local network or VPC to connect your artifact servers, TAS infrastructure, and any other providers with the Harness Manager.

If you are running your TAS Cloud in AWS, you can use a Shell Script Delegate run on an EC2 instance in the same VPC and subnet as your TAS Cloud, or an ECS Delegate run in an ECS cluster in the same VPC.

For information on setting up Harness Delegates, see [Harness Delegate Overview](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation).

If you want to install the CF CLI on the Delegate, use a Harness Delegate Profile and the script shown in [Cloud Foundry CLI](https://docs.harness.io/article/nxhlbmbgkj-common-delegate-profile-scripts#cloud_foundry_cli).

### Step 2: Add the Cloud Foundry CLI

The host running the Harness Delegate must run the CF CLI in order to execute the required commands.

See [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).

#### Using CF CLI 7

By default, Harness uses CF CLI 6. Certain CLI commands have been changed between the CLI versions. See [Upgrading to CF CLI 7](https://docs.cloudfoundry.org/cf-cli/v7.html#table) from Cloud Foundry.

If you enable the **Enable CF CLI 7** option on the Harness Service you are deploying, the Harness Delegate will use that CLI version to execute the correct set of commands.

See [Install Cloud Foundry CLI Versions on the Harness Delegate](install-cloud-foundry-cli-6-and-7-on-harness-delegates.md).

### Step 3: Add the Harness TAS Cloud Provider

A Harness TAS Cloud Provider connects Harness to your TAS account and allows the Harness Delegate to make API calls.

The **TAS Cloud Provider** has the following settings.

#### Display Name

Enter a name for the Cloud Provider. You will use this name when selecting this Cloud Provider in Harness Infrastructure Definitions.

#### Endpoint URL

Enter the API endpoint URL, without URL scheme. For example, **api.run.pivotal.io**. Omit **http://**.For more information, see [Identifying the API Endpoint for your PAS Instance](https://docs.pivotal.io/pivotalcf/2-3/opsguide/api-endpoint.html) from Pivotal.

#### Username / Password

Username and password for the TAS account to use for this connection.

#### Usage Scope

If you want to restrict the use of a provider to specific applications and environments, do the following:

In **Usage Scope**, click the drop-down under **Applications**, and click the name of the application.

In **Environments**, click the name of the environment.

### Review: TAS Permissions

Make sure the TAS user account is assigned Admin, Org Manager, or Space Manager role. The user account must be able to update spaces, orgs, and applications.

For more information, see [Orgs, Spaces, Roles, and Permissions](https://docs.pivotal.io/pivotalcf/2-3/concepts/roles.html) from Tanzu.

For steps on setting up all Cloud Providers, see [Add Cloud Providers](https://docs.harness.io/article/whwnovprrb-cloud-providers).

### Next Steps

* [Add Container Images for Tanzu Deployments](add-container-images-for-pcf-deployments.md).
* [Adding and Editing Inline Tanzu Manifest Files](adding-and-editing-inline-pcf-manifest-files.md).

