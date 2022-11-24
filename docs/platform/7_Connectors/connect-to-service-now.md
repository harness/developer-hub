---
title: Connect to ServiceNow
description: Connect Harness to ServiceNow as a Harness ServiceNow Connector.
# sidebar_position: 2
helpdocs_topic_id: illz8off8q
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

You can connect Harness to ServiceNow using a Harness ServiceNow Connector. This Connector allows you to approve and reject Pipeline steps.

### Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)

### Limitations

* Your ServiceNow account should ideally have the `admin` role. If this is not possible, it should have at least the `itil_admin` or `itil` role to create and modify tickets.
* Your account should also have the `import_admin` or `import_transformer` role to manage import set transform maps. For details, see ServiceNow's [Base System Roles](https://docs.servicenow.com/bundle/newyork-platform-administration/page/administer/roles/reference/r_BaseSystemRoles.html) documentation.
* Your ServiceNow REST API account must have permission to view tickets.

### Step: Add ServiceNow Connector

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](/article/36fw2u92i4-create-an-organization).

You can add a Connector from any module in your Project in Project setup, or in your Organization, or Account Resources.

This topic shows you how to add a ServiceNow Connector to your Project.

In **Project Setup**, click **Connectors**.

Click **New Connector**, and then click **ServiceNow**. The ServiceNow Connector settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/illz8off8q/1639132495502/screenshot-2021-12-10-at-4-04-20-pm.png)Enter **Name** for this Connector.

You can choose to update the **Id** or let it be the same as your ServiceNow Connector's name. For more information, see [Entity Identifier Reference](/article/li0my8tcz3-entity-identifier-reference).

Enter **Description** and **Tags** for your Connector.

Click **Continue**.

Enter your **Username**.

In **URL**, enter the base URL by which your users will access ServiceNow. For example: `https://example.service-now.com`**.**

Enter your credentials. For **API Key**, use a Harness [Text Secret](/article/osfw70e59c-add-use-text-secrets). 

Click **Continue**.

Select the Harness Delegate(s) to use when making a connection to ServiceNow using this Connector.

Click **Save and Continue**.

Harness tests the connection.

![](https://files.helpdocs.io/i5nl071jo5/articles/illz8off8q/1639414877788/screenshot-2021-12-13-at-10-30-31-pm.png)Click **Finish**.

The ServiceNow Connector is listed in Connectors.

