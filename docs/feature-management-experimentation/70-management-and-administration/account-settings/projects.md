---
title: Projects
sidebar_position: 10
---

## Overview

Projects allow you to separately manage your feature flags and experiments across your different business units, product lines, and applications. When you first create your account, you're  provided with one project named Default. This project has two [environments](/docs/feature-management-experimentation/management-and-administration/fme-settings/environments) and one [traffic type](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types) created underneath it. You can rename and edit these environments and traffic types and add more to the Default project. 

The following objects are also located in a project. Refer object model map below for reference:

* [Feature flags](/docs/feature-management-experimentation/feature-management/setup/create-a-feature-flag/)
* [Segments](/docs/feature-management-experimentation/feature-management/targeting/segments)
* [Metrics](/docs/feature-management-experimentation/release-monitoring/metrics/)
* [Event types](/docs/feature-management-experimentation/release-monitoring/events/)
* [API keys](/docs/feature-management-experimentation/management-and-administration/account-settings/api-keys)  

When you onboard different business units to Harness FME, you can add up to 20 projects within your account to allow each team to have a separated space to manage their experiments and feature flags. You can manage your projects from your Admin Settings page. Here, you can add new projects or edit existing ones. 

![](../static/projects.png)

## Creating projects

To create a project, do the following: 

1. From the left navigation, click on the **profile button** at the bottom.
2. Click **Admin settings**, then **Projects**. The Create a project appears.
3. To create a project, click **Create project** at the top right. The Create project page appears.
   
   ![](../static/create-project.png)
 
4. Enter a name for the project.
5. On the Required comments checkbox, optionally check whether you’re requiring titles and comments for feature flags, segments, and metric changes.

   :::info[note]
   When you check this box, it affects approval flows.
   :::

6. In the project permissions area, select the desired control access by doing the following:
  * **Anyone has access**. Allows anyone to have access to this particular project.
  * **Restrict who can access**. Allows you to select which users, groups, and Admin API keys have access to a particular project.
7. Click **Create** to create a new project.

## Setting project permissions

You can set view permissions to your projects or projects you have administrator rights to and any objects within the project. This allows you more granular control over which users, groups, and API keys can access the objects in projects to support access requirements within an account. 

These objects include feature flags, segments, metrics, traffic types, and environments. This also allows you to determine who can see if a certain project exists.

Each Split project has a project permissions setting which you can use to restrict access to that project to specific users, groups, or API keys. If a user, group, or API key is not granted access to a restricted project, they cannot see the project name nor determine whether that project exists.

Project view restrictions can be used to protect sensitive (i.e., confidential) projects, or to improve user experience by showing a small number of relevant projects to each user.

## Viewing or updating project permissions

An Admin can view or edit a project's permissions by following these steps:

1. Navigate to **Admin settings**.
1. On the **Projects** page, click the **View** link for a project.
1. Click the **Actions** button on the top left and select **Edit project**. The **Edit project** pane will appear.
1. On the **Edit project** pane, you can view project permissions. You can also restrict access to the project to some users, groups, and Admin API Keys.

### Data export restrictions

An administrator may restrict the export of data from Split to a subset of users or user groups at the environment level. For more information, see [Permissions](/docs/feature-management-experimentation/management-and-administration/fme-settings/permissions#setting-environment-level-permissions).

A list of all environments in a workspace, showing at a glance whether data export restrictions are in place for each environment, is available to admins. See [Viewing projects](#viewing-projects).

## Editing a project

When you are viewing a project, you can edit a project by doing the following:
1. From the left navigation, click on the **profile button** at the bottom.
2. Click **Admin settings**, then **Projects**. A list of projects appears.
3. On the selected project you want to edit, click **View** in the Action column.
4. Click the **Actions** button and then **Edit project** from the menu list. The Edit project page appears. 
   
   ![](../static/edit-project.png)

5. In the Name field, optionally change the name.
6. On the Required comments checkbox, optionally check whether you’re requiring titles and comments for feature flags, segments, and metric changes.

   :::info[note]
   When you check this box, it affects the approval flows.
   :::

7. In the project permissions area, optionally select the desired control access by doing the following:
  * **Anyone has access**. Allows anyone to have access to this particular project.
  * **Restrict who can access**. Allows you to select which users, groups, and admin API keys have access to a particular project.
8. Click **Save** to save your changes. The changes appear in the admin audit logs.

## Viewing projects

To view projects, do the following:

1. From the left navigation, click on the **profile button** at the bottom.
2. Click **Admin settings**, then **Projects**. A list of projects appears. 
3. Select **View** on the desired project. From here, you can see the environment name, ID, type of project it is, permissions setting, and data export permission settings. 

   ![](../static/view-project.png)

## Requesting access to projects

If you have no access to a project, you need to request access from the administrator of that project. 

## Navigating between projects

You can navigate between projects by doing the following:

1. From the left navigation, click on the **profile button** at the top.
2. **Search or select the project** you would like to switch to. You can see the environments, feature flags, segments, and metrics under that project.

## Managing your projects

To manage your projects, go to the **projects** tab in your **Admin Settings** page. On this page you can:

* See a list of all your existing projects.
* Manage the [environments](/docs/feature-management-experimentation/management-and-administration/fme-settings/environments) and [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types) in a project by clicking **View** in the Actions column for selected projects.

## Deleting a project

To delete a project, follow these steps:

* Make sure all feature flags, segments, and metrics are deleted from the project for all environments.

* To delete a feature flag, delete all the definitions from its environments.

  ![](../static/delete-targeting-rules.png)

* Then, delete the feature flag.
  
  ![](../static/delete-feature-flag.png)

* To delete a segment, first select all its keys.
  
  ![](../static/select-users.png)

* Then, delete the keys.
  
  ![](../static/delete-users.png)

* Then, delete the segment definition and repeat these steps for all environments.
  
  ![](../static/delete-definition.png)

* Finally, delete the segment.
  
  ![](../static/delete-segment.png)

* To delete metrics, click on the upper top right (...) icon to delete it.
  
  ![](../static/delete-metric-definition.png)

* In the Admin page, under the **API keys** page, Make sure all Admin API and SDK keys are revoked for the project environments. For example the screenshot below shows the SDK API key for the "default" project.
  
  ![](../static/api-keys.png)

* In Admin settings, in the left menu, click **Projects**.
* In the list of available projects, click the **View** link of the project you want to delete.
  
  ![](../static/view-projects.png)

* You will see a list of environments for the selected project, now you can delete each environment using the **Delete** link.
* The user interface will allow you to delete all environments except the last one, as each project is required to have at least one environment.
* Click the **Actions** button in the top right corner and choose the Delete project option, which will allow you to delete it.

  ![](../static/delete-project.png)