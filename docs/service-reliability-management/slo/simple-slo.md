---
title: Simple SLO
description: Learn to create a simple SLO.
sidebar_position: 10
---


Service level objectives (SLOs) specify a target level for the reliability of your service.


## Prerequisites:

You should have installed Harness Delegate. To learn how to install a delegate, go to the  [Delegate overview](https://developer.harness.io/docs/platform/Delegates/delegates-overview).

The following sections explain how to create an SLO. 


## Go to Create SLO screen

In Harness, select **Service Reliability** > **SLOs** > **Create SLO**.

The Create SLO page appears.


## Name your SLO

1. In the **SLO Name** field, enter a name for the SLO. For example, the First SLO.
2. Optionally, you can add a description of the SLO in the **Description (Optional)** field. You can also attach a tag to the SLO. Select the pencil icon next to the **Tags (Optional)** field, type a tag name, and then press enter.


## Create Monitored Service

1. Select **+ New Monitored Service**.

    The Create a Monitored Service dialog appears.

2. In the **Create or Select a Service** dropdown, select **+ Add New**.

    The **New Service** dialog appears.

3. In the Name field, enter a name for the service. For example, the First Service.
4. Optionally, you can add a description of the SLO in the **Description (Optional)** field. You can also attach a tag to the SLO. Select the pencil icon next to the **Tags (Optional)** field, type a tag name, and then press enter. 
5. Click **Save**.
6. In the **Create or select an Environment** field, select **+ Add New.**

    The **New Environment** dialog appears.

7. In the **Name** field, enter a name for the environment. For example, the dev environment.
8. Optionally, you can add a description of the environment in the **Description (Optional)** field. You can also attach a tag to the environment. Select the pencil icon next to the **Tags (Optional)** field, type a tag name, and then press enter.
9. Under **Environment Type**, select an environment. The available options are **Production** and **Non-Production**.
10. Select **Save**.

11. In the **Create a Monitored Service** dialog, select **Save**.

    The Monitored service appears in the **Monitored Service Name** field.


    
:::info note
Harness creates the monitored service name by concatenating the service and environment names. For example, if the service name is First Service and the environment name is Dev Environment, the resulting name is First_Service_Dev_Environment.
:::

12. In the **User Journey** dropdown, select **+ Add New**.
13. Select **Continue** to go to the **SLI** tab.


## Configure health source and metrics

This section explains how to add a health source to the SLI. It also explains how to set up the metrics for measuring the SLI.


### Add a health source and connector

1. Under **Configure SLI Queries**, select **+ New Health Source**.
2. In the **Add New Health Source **slider, select the health source that you use for monitoring the health of your service. For example, AppDynamics.

    Harness currently supports the following APM tools as health service:

    AppDynamics, Google Cloud Operations, Prometheus, NewRelic, Splunk, Datadog, Dynatrace, CustomHealth, ElasticSearch, and CloudWatch.

3. In the **Health Source Name** field, enter a name for the health source. For example, dev environment health.
4. Under **Connect Health Source**, select the **Select Connector** box.

    The  Create or Select an Existing Connector page appears.

5. Select **+ New Connector**.

    The connector details dialog appears. For example, if you have selected AppDynamics as a health source, the **AppDynamics Connector Details** page appears.

6. In the **Name** field, enter a name for the connector.
7. Optionally, in the **Description (Optional)** field, you can add a description for the SLO. You can also attach a tag to the SLO. Select the pencil icon next to the **Tags (Optional)** field, type a tag name, and then press enter.
8. Select **Continue**.
9.  In the Credentials settings page, enter the following details and select **Continue**.
    * Controller URL
    * Account Name
    * Under **Authentication**, enter the authentication details. Harness supports the following authentication types:

    | Authentication type    | Details required            |
    | :--------------------- | :-------------------------- |
    | User Name and Password | User name and Password      |
    | API Client             | Client ID and client secret |


10. On the Delegates Setup page, configure a Harness Delegate by choosing one of the following options:

| Option                                            | Details                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use any available delegate                        | If you select this option, Harness automatically selects one of the available Delegates. To learn more, go to How does Harness Manager pick delegates?                                                                                                                                                                                               |
| Only use delegates with all of the following tags | Select this option for use with specific Delegates. Enter the tag assigned to a Delegate that you want to use. You can enter multiple tags. Harness automatically selects all the Delegates assigned with the tag you have entered. To learn more about using tags to select the Delegates, go to Select delegates with delegate selectors and tags. |                                                                                                                                                                                                                                                                                                                                                  |

1.  Select **Save and Continue**.

    Harness validates the authentication and permissions.

2.  After successful validation, select **Finish**.

    The connector appears in the **Select Connector** field under **Connect Health Source**.

3.  In the **Feature** dropdown, select the APM tool feature you want to use. Based on the APM tool you select, Harness may automatically choose the feature. For example, if you select AppDyanamics as the health source, Harness automatically selects the Application Monitoring option in the Feature dropdown.
4.  Select **Next** to go to the **Customize Health Source** tab.
5.  Under **Applications & Tiers**, select the appropriate application and tier.

    Suppose you select AppDynamics as the Health Source Type. The **Find an AppDynamics application** dropdown and the **Find an AppDynamics tier** dropdown display the list of applications and tiers associated with AppDynamics.

6.  Under** Metric Packs**, select the metrics for the health source. Available options are **Errors** and **Performance**.
7.  Custom Metrics option
8.  Optionally, under **Advanced**, you can configure the events that Harness should consider for analysis. You can also configure the type of events that Harness should ignore. The following table explains the various options:

|Ignore Thresholds       |       |
|  ---  |  ---  |
|     Fail-fast Thresholds  |       |
|       |       |


9.  Select **Submit**.

    The health source that you added appears in the **Health Source for SLI** field.


## Set up metrics for SLI

1. Under **SLI Type - Choose a metric**, select the metric type for measuring the SLI. The available options are **Availablity** and **Latency**.
    * **Latency**: The time it takes for the service to respond to a query.
    * **Availability**: Measures how often the service is online and accessible by users.
2. Under **Pick metrics powering the SLI**, define how Harness should calculate the SLI. The following table describes the available options:

|Option       |Settings       |
|  ---  |  ---  |
|   Threshold based    | <ul><li>Metric for valid requests</li><li>Objective Value</li><li>Consider missing metric data as</li></ul>  |
|   Ratio based    |  <ul><li>Metric for good requests</li><li>Metric for valid requests</li><li>Objective Value</li><li>SLI value is good if</li><li>Consider missing metric data as</li></ul>     |



3. Select Continue to go to the **SLO Target & Error Budget Policy** tab.


## Configure the compliance time period and error budget policy

This section explains how to set up a compliance time period for evaluating the SLO. It also explains how to configure the error budget policy notifications.


## Configure compliance time period

1. Under **Compliance time period for evaluating SLO**, configure the following settings:

|Period Type       |    Period Length   |
|  ---  |  ---  |
|  Rolling: Select this option to measure the compliance from n days ago to now, where n ranges from 1 to 30 days.     |   Specify the number of days. For example, 30 days.    |
|   Calendar: Select this option to measure compliance from date to date.     |  Select a period to measure the SLO. The available options are Weekly, Monthly, or Quarterly.<br/>If you select the Weekly or Monthly options, then in the Window Ends dropdown, specify when the compliance period should end. For example: <ul><li>The day of the week on which the compliance period should end. Example: Monday.</li><li>The day of the month on which the compliance period should end. Example: On the first day of the month.</li></ul>     |

3. In the **SLO Target** field, set a target value for the SLO, and then select **Next**.

    The SLO target value should be greater than zero and less than one hundred. For example, 99.99%.

4. If you wish to configure the error budget policy, select **Next**. Otherwise, select **Save**.

    This completes the SLO creation. The SLO appears on the **Service Level Objectives (SLOs)** page.


## Configure error budget policy (optional)

You can create an error budget policy to alert the team members when the SLO crosses the threshold. To create an error budget policy: 


1. Under **Error Budget Policy (Optional)**, select **+ New Notification Rule**.

    The New Notification page appears.

2. Enter a name for the notification rule and select **Continue**.
3. In the **Condition** dropdown, select an appropriate condition. You can set the following conditions:
    * **Error Budget remaining percentage**: Triggers an alert if the remaining error budget reaches the specified value. For example, trigger an alert if the error budget remaining percentage reaches 10%.
    * **Error budget remaining minutes**: Triggers an alert if the error budget remaining minutes reaches the specified value. For example, trigger an alert if the remaining error budget minutes depletes to 500 minutes.
    * **Error budget burn rate is above**: Triggers an alert if the error budget burn rate reaches the value that you specify. You should also set the **Lookback Duration (min)** value.  For example, trigger an alert if the error budget burn rate is above 10% in the last 800 minutes.

    You can add multiple conditions.

4. In the **Notification Method** dropdown, select an alert method and then select **Continue**.

    The following notification methods are available:

    * **Slack**: Enter the Slack webhook URL.
    * **Email**: Enter the email addresses for sending the alerts.
    * **PagerDuty**: Enter the PagerDuty key.
    * **Microsoft Teams**: Enter the Microsoft Teams webhook URL. You can add more than one webhook URL by selecting **+ Add**.
5. Select **Test** to check if the alert is working correctly.
6.  Select **Finish**.

    The notification rule appears under **Error Budget Policy (optional)**.

7. Enable the notification rule to start sending the alerts.
8. Select **Save** to save the settings.

    This completes the SLO creation. The SLO appears on the **Service Level Objectives (SLOs)** page.


<&lt;folding text>> **Send alerts to user groups**

To send alerts to the Harness user groups, perform the following steps:



1. Select the **Select User Group(s)** box.

    The Select User Group(s) page appears.

2. Select the user groups that you want to alert. You can choose the user groups that are part of the **Project**, **Organization**, or **Account**.
3. In the **Notification Method** dialog, Select **Finish**. 

<&lt;folding text>> **Create a new user group**

To create a new user group, perform the following steps:



1. Select **+ User Group**.

    The New User Group dialog appears.

2. In **Name**, enter a name for the user group.
3. (Optional) In **Description (Optional)**, select the pencil icon and enter a description.
4. (Optional) In **Tags (Optional)**, select the pencil icon and assign a tag. 
5. In **Add Users**, select the users.
6. Select **Save**.

    A new user group is added.

