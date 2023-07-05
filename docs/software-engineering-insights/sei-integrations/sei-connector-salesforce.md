---
title: SEI Salesforce connector
description: Integrate SEI with Salesforce.
sidebar_position: 150
sidebar_label: Salesforce
---

Use the SEI Salesforce connector to integrate SEI with Salesforce.

SEI uses OAuth 2.0 to connect to Salesforce.

## Configure the SEI user

To transmit data from Salesforce to SEI, you must create an SEI user in your Salesforce instance.

1. In your Salesforce instance, clone the built-in **Read Only** profile, and name the new profile `sei-profile`.
2. Edit the new profile, and select **View All Data** under **Administrative Permissions**.
3. Add a user and assign the `sei-profile` to the user. This user is a service account.

For more information, go to the Salesforce documentation on [creating or cloning profiles](https://help.salesforce.com/s/articleView?id=sf.users_profiles_cloning.htm&type=5) and [adding a single user](https://help.salesforce.com/s/articleView?id=sf.adding_new_users.htm&type=5).

## Create the connector

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Salesforce** connector, and select **Install**.
4. Configure the connector. You must use OAuth authentication.

## Add the Jira mapping

You can link Salesforce tickets to Jira issues by using a custom Jira field.

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Find your [SEI Jira connector](./sei-connector-jira.md) and edit it.
4. Under **Salesforce Mapping**, select the Jira field that contains your Salesforce case IDs.
