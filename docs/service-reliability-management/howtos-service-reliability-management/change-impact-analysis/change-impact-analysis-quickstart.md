---
title: Create a monitored service
description: Create a monitored servie to correlate change events.
sidebar_position: 10
helpdocs_topic_id: lwi37ku94x
helpdocs_category_id: 7lvetjzo1m
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Change Impact Analysis allows you to get a clear understanding of what has changed, when it changed, why it changed, and the effect it had on your monitored service.  Identifying recent change events in your service around the time when there is deterioration of performance helps in quickly and accurately identifying the root cause of the issue that led to the SLO violations.

These changes might include deployments, infrastructure changes, incidents, and feature flags. Harness Change Impact Analysis helps you: 

- Correlate recent changes in your service and their broader impact on your service.
- Triage the changes quickly and reduce downtime.

This topic describes how to create a monitored service to correlate change events.


## Prerequisites

- Ensure that you have installed a Delegate and it can communicate with Harness, health source, and change source. To learn more about Delegates, go to [Get started with delegates](https://developer.harness.io/docs/category/get-started-with-delegates).
- You must have created an Organization in Harness. To learn more about Organizations in Harness, go to [Create Organizations and Projects](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization).

## Create a project
To create a project, perform the following steps:

1. In Harness, select **Service Reliability** > **Create Project**.
   ![Create Project](./static/change-impact-create-project-navigate.png)
2. In the About the Project page, do the following and then select **Save and Continue**: 
   - **Name**: Enter a name for the project.
   - **Color**: Select a color theme for the project.
   - **Organization**: Select an organization for the project. If you don't yet have an organization in Harness, go to [Create a Harness Org](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization#step-1-create-a-harness-org) to learn how to create an Organization.
3. In the Invite Collaborators (Optional) page, add team members to the project in the **Invite People to Collaborate** field.
4. In the **Role** field, assign a role to the collaborators.
5. Select **Add**.
6. Select **Save and Continue**.  
   Your project is created.


## Create a monitored service

A Harness Monitored Service is a combination of service and environment.

The following steps explain how to create a monitored service, and define service, environments, change source, and health source.


### Navigate to the "Create new monitored service" page

To create a monitored service:

1. In your Harness project, navigate to the **Service Reliability** module and then select **Monitored Services** > **+ New Monitored Service**.

![Navigate to new monitored services page](./static/change-impact-moniterdservice-navigate.png)

The Create new monitored service settings page appears.


### Define monitored service

1. In the **Overview** section, enter the following information:
    * **Type**: Select **Application**.
    * **Create or select a Service**: Select a Harness service that you want to monitor. A Harness service is a logical representation of your microservices and other workloads that you want to monitor.

      To create a new service, perform the following steps:
        
      1. Select **+ Add New**.  
        The New Service dialog appears.
      2. Enter the following information, and then select **Save**:
       
          *  **Name** : Enter a name for the service. For example, _sample_service_.
          *  **Description (Optional)**
          *  **Tag (Optional)** 

    * **Create or Select an Environment**: Choose an appropriate environment. Environments represent your deployment targets such as QA, Prod, and so on.
  
        To create a new environment, perform the following steps:
    
      1. Select **+ Add New**. 
     
         The New Environment dialog appears.
      2. Enter the following information and then select **Save**:

            * **Name**: Enter a name for the environment.
            * **Description (Optional)**
            * **Tag (Optional)**
            * **Environment Type**: Select an environment type. The available options are **Production** and **Non-Production**.

    Harness autopopulates the **Monitored Service Name** field by combining the **Service** and **Environment** names.


### Add change source

A Change Source monitors change events related to deployments, infrastructure changes, and incidents.  

To select an existing change source, do the following:

1. In the **Change Sources** section, select the environment for which you want to monitor the changes. You can either choose an existing change source or create a new change source.  
 
To create a new change source, do the following:

1. Select **+ Add New Change Source**.  
   The Add New Change Source dialog appears.  

2. In the **Provider Type** field, select the change source for which you want to monitor the changes. Following are the available options:  

    - **Deployments**: You can choose either **Harness CD NextGen** or **Harness CD**. If you choose **Harness CD**, then in the **Connect Change Source** section, select the **Application** for which you want to monitor the changes.  
    - **Incident**: Select the incident management tool which monitors your application.

3. In the **Source Name** field, enter a name for the change source that you are configuring.  
The new change source appears in the **Change Sources** list.


### Select a health source

A health source is an APM or log provider using which the Harness Monitored Service collects the metrics and logs of your service. 

Select the health source which monitors the health of your service.

To create a new health source, do the following:  

1. Select **+ Add New Health Source**.  
   The Add New Health Source dialog appears.

2. In the **Define Health Source** tab, select the health source that monitors your service.
   
3. In the **Health Source Name** field, enter a name for the health source.
   
4. In the **Connect Health Source** section, do the following:
    1. **Select Connector**: Select an existing connector. Connectors contain the information necessary to integrate and work with your health source.
    2. **Select Feature**: Select the feature associated with the health source.
   
5. Click **Next**.
   
6. In the **Customize Health Source** tab, the settings are displayed based on the health source you have selected in the **Define Health Source** tab.  
   
   For example, if you have selected AppDynamics as the **Health Source Type**, then the following settings are displayed:

   1. **Find an AppDynamics application**: Displays the list of applications associated with AppDynamics. Select the appropriated application.
   
   2. **Find an AppDynamics tier**: Displays a list of tiers associated with the selected application. Select the appropriate tier.
   
   3. In the **Metrics Packs** section, select the metrics that you want to use for the health source. The options available are **Errors** and **Performance**.
   
7. Select **Submit**.  
   The new health source appears in the **Health Sources** list.
   
8.   On the top right-hand corner select **Save**.  
    You can view the new monitored service in the **Monitored Services** list.

   ![Monitored Service Created](./static/change-impact-moniterdservice-created.png)

## Next steps

Use the Service [Health dashboard](change-impact-analysis-service-health-dashboard.md) and [Changes dashboard](change-impact-analysis-changes-dash-board.md) to correlate change events, and understand their impact on the monitored service.