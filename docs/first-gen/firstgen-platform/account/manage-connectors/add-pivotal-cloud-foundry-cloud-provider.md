---
title: Add Tanzu Application Service (TAS) Cloud Provider
description: Connect the Pivotal Cloud Foundry cloud provider where you will deploy your services using Harness.
# sidebar_position: 2
helpdocs_topic_id: v0x32ks1kp
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Connect the Tanzu Application Service (TAS, formerly PCF) cloud provider where you will deploy your services using Harness.

You add cloud providers to your Harness Account and then reference them when defining deployment environments.

In this topic:

* [Before You Begin](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#before_you_begin)
* [Visual Summary](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#visual_summary)
* [Review: TAS Permissions](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#review_tas_permissions)
* [Step 1: Add the Cloud Provider](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#step_1_add_the_cloud_provider)
* [Step 2: Endpoint URL](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#step_2_endpoint_url)
* [Step 3: Username and Password](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#step_3_username_and_password)
* [Step 4: Skip Validation](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#step_4_skip_validation)
* [Step 5: Usage Scope](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#step_5_usage_scope)
* [Artifact Support for Download and Copy](https://docs.harness.io/article/v0x32ks1kp-add-pivotal-cloud-foundry-cloud-provider#artifact_support_for_download_and_copy)

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).

### Visual Summary

Here's an example configuration of TAS as Cloud Provider in Harness.

![](https://files.helpdocs.io/kw8ldg1itf/articles/v0x32ks1kp/1623889012248/clean-shot-2021-06-16-at-17-16-37.png)### Review: TAS Permissions

TAS user account with Admin, Org Manager, or Space Manager role. The user account must be able to update spaces, orgs, and applications.

For more information, see [Orgs, Spaces, Roles, and Permissions](https://docs.pivotal.io/pivotalcf/2-3/concepts/roles.html) from Tanzu.

### Step 1: Add the Cloud Provider

To add a cloud provider to your Harness account, do the following:

1. Click **Setup**, and then click **Cloud Providers**.
2. Click **Add Cloud Provider** and select **Tanzu Application Service**.

The **Add Tanzu Application Service Cloud Provider** panel appears.

### Step 2: Endpoint URL

Enter the API endpoint URL, without URL scheme. For example, **api.run.pivotal.io**. Omit **http://**.For more information, see [Identifying the API Endpoint for your PAS Instance](https://docs.pivotal.io/pivotalcf/2-3/opsguide/api-endpoint.html) from TAS.

### Step 3: Username and Password

Username and password for the TAS account to use for this connection.

You can use an inline username or a Harness [Encrypted Text secret](/article/ygyvp998mu-use-encrypted-text-secrets).

For the password, select or create a new Harness Encrypted Text secret.

### Step 4: Skip Validation

If you do not have a specific Endpoint URL or credentials set up, you can skip validation and add the Cloud Provider as is.

Enable this option during *creation* of the Cloud Provider only.Later, when you create an Infrastructure Definition as part of your Harness setup, Harness will need to validate. Return to this Cloud Provider and disable **Skip Validation**.

### Step 5: Usage Scope

Usage scope is inherited from the secret you selected for **Select Encrypted Password**.

### Artifact Support for Download and Copy

See [Service Types and Artifact Sources](/article/qluiky79j8-service-types-and-artifact-sources).

