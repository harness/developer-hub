---
title: Create ServiceNow Tickets in CD Stages
description: Create Service Now tickets in CD Stages.
sidebar_position: 3
helpdocs_topic_id: tjkyd945nh
helpdocs_category_id: qd6woyznd7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes how to create Service Now tickets in CD Stages.

Harness provides the ability to create and manage [ServiceNow change requests](https://docs.servicenow.com/bundle/rome-it-service-management/page/product/change-management/concept/c_ITILChangeManagement.html), [incident tickets](https://docs.servicenow.com/bundle/rome-it-service-management/page/product/incident-management/concept/c_IncidentManagement.html), [change tasks](https://docs.servicenow.com/bundle/rome-it-service-management/page/product/change-management/concept/change-types.html), and [problem type](https://docs.servicenow.com/bundle/rome-it-service-management/page/product/problem-management/concept/c_ProblemManagement.html) from your Pipeline step using the **ServiceNow Create** step.

You can add the Create ServiceNow step to a Harness CD stage or an Approval stage and do the following:

* Automatically create change requests in ServiceNow to track updates to your build, test, and production environments by adding a **ServiceNow Create** step in your Pipeline.
* Automatically create and assign tickets in ServiceNow to triage and resolve incidents quickly in case of Pipeline failures.

## Before You Begin

* [Connect to ServiceNow](../../../platform/7_Connectors/connect-to-service-now.md): you can add a Harness ServiceNow Connector before or during the Create ServiceNow step setup.
* You must install the Harness Application before using templates to create ServiceNow tickets.​
* Make sure you have the following roles:
	+ `x_harne_harness_ap.integration_user_role​`
	+ `itil`​

## Limitations

* While it's not a strict limitation, some users can forget that when you use a ServiceNow Create step, it creates a new, independent ServiceNow ticket every time it is run (as opposed to updating the same issue).  
It is important to remember that you should only add ServiceNow Create to a stage if you want to create a new ServiceNow ticket on every run of the stage.

### UTC Timezone Only

The ServiceNow API only allows date time and time values in the UTC timezone. Consequently, input for any datetime/time fields in Harness ServiceNow steps must be provided in UTC format irrespective of time zone settings in your ServiceNow account.

The timezone settings govern the display value of the settings not their actual value.

The display values in the Harness UI depend on ServiceNow timezone settings.### Review: ServiceNow User Roles

You can install the Harness app in your ServiceNow instance from the ServiceNow [store](https://store.servicenow.com/sn_appstore_store.do#!/store/application/de154a1e1b75851044cbdb58b04bcb11/1.0.1?referer=%2Fstore%2Fsearch%3Flistingtype%3Dallintegrations%25253Bancillary_app%25253Bcertified_apps%25253Bcontent%25253Bindustry_solution%25253Boem%25253Butility%25253Btemplate%26q%3Dharness&sl=sh). For more information, see [Installation Guide](https://store.servicenow.com/appStoreAttachments.do?sys_id=1fc1632b872f4dd0970e2178cebb35ba).

To configure the Harness app in ServiceNow, you must have the following roles:

* `x_harne_harness_ap.integration_user_role​` : to access supported APIs, view Harness support details and access Templates.
* `itil`​: for end-to-end integration with Harness platform.

## Step 1: Add a ServiceNow Create Step

In a Harness CD or Approval stage, in **Execution**, click **Add Step**.

![](./static/create-service-now-tickets-in-cd-stages-05.png)

Click **ServiceNow Create**. The ServiceNow Create settings appear.

![](./static/create-service-now-tickets-in-cd-stages-06.png)

In **Name**, enter a name that describes the step.

In **Timeout**, enter how long you want Harness to try to create the issue before failing (and initiating the stage or step [Failure Strategy](../../../platform/8_Pipelines/define-a-failure-strategy-on-stages-and-steps.md)).

In **ServiceNow Connector**, create or select the [ServiceNow Connector](../../../platform/7_Connectors/connect-to-service-now.md) to use.

In **Ticket Type**, select a ServiceNow ticket type from the list.

![](./static/create-service-now-tickets-in-cd-stages-07.png)

## Option: Configure Fields

Select **Configure Fields** to select or add ServiceNow Fields to your ServiceNow ticket. This option enables you to access multiple custom fields from your ServiceNow integration.

In **Description**, add the ticket description.

In **Short Description**, enter a description of the ticket you are creating. This will be the title of the ticket.

You can use Harness variables in the **Short Description** and **Description** fields.

Click **Fields**. The **Add ServiceNow Fields** settings appear.

![](./static/create-service-now-tickets-in-cd-stages-08.png)

Select **Provide Field List** to add custom fields.

Enter **Key** for the field.

In **Value**, you can write static values, or variables, to these fields.

The properties are specified as key-value pairs, the name being the field name (not the label) in ServiceNow and a valid value.​

Click **Add**.

![](./static/create-service-now-tickets-in-cd-stages-09.png)

Once you are done, this is how the dialog looks:

![](./static/create-service-now-tickets-in-cd-stages-10.png)

## Option: Create From Template

Select **Create From Template** to create a ticket using an existing template.

In **Template Name**, you can either enter the name of an existing template or provide an expression.

![](./static/create-service-now-tickets-in-cd-stages-11.png)

If there are many templates with the same name, the most current one is used to create tickets.Click **Apply Changes**.

Your ServiceNow ticket is now added to your Pipeline.

## Option: Normal and Standard Change Requests

By default, Harness creates Normal Change requests, not Standard Change requests. If you want to create Standard or Emergency type ServiceNow Change request tickets, then do the following:

In **Fields**, select **Type**.

![](./static/create-service-now-tickets-in-cd-stages-12.png)

In **Type**, select **Normal** or **Emergency**.

![](./static/create-service-now-tickets-in-cd-stages-13.png)

## See Also

* [Update ServiceNow Tickets in CD Stages](update-service-now-tickets-in-cd-stages.md)

