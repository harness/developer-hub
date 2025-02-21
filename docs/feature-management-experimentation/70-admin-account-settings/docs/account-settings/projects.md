---
title: Projects
sidebar_label: Projects
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360023534451-Projects <br /> ✘ images still hosted on help.split.io </button>
</p>

Projects allow you to separately manage your feature flags and experiments across your different business units, product lines, and applications. When you first create your account, you're  provided with one project named Default. This project has two [environments](https://help.split.io/hc/en-us/articles/360019915771) and one [traffic type](https://help.split.io/hc/en-us/articles/360019916311) created underneath it. You can rename and edit these environments and traffic types and add more to the Default project. 

The following objects are also located in a project. Refer object model map below for reference:

* [Feature flags](https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag)
* [Segments](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment)
* [Metrics](https://help.split.io/hc/en-us/articles/22005565241101-Metrics)
* [Event types](https://help.split.io/hc/en-us/articles/360020585772-Track-events)
* [API keys](https://help.split.io/hc/en-us/articles/360019916211-API-keys)  

When you onboard different business units to Split, you can add up to 20 projects within your account to allow each team to have a separated space to manage their experiments and feature flags. You can manage your projects from your Admin Settings page. Here, you can add new projects or edit existing ones. 

<p>
  <img src="https://help.split.io/hc/article_attachments/30797526728845" alt="projects_diagram.png" />
</p>

## Creating projects

To create a project, do the following: 

1. From the left navigation, click on the **user’s initials** at the bottom.
2. Click **Admin settings**, then **Projects**. The Create a project appears.
3. To create a project, click **Create project** at the top right. The Create project page appears.

  <p>
  <img src="https://help.split.io/hc/article_attachments/30797526730509" alt="projects_creating_projects.png" />
</p>
 
4. Enter a name for the project.
5. On the Required comments checkbox, optionally check whether you’re requiring titles and comments for feature flags, segments, and metric changes.

**Note:** When you check this box, it affects approval flows.

6. In the project permissions area, select the desired control access by doing the following:
  * **Anyone has access**. Allows anyone to have access to this particular project.
  * **Restrict who can access**. Allows you to select which users, groups, and Admin API keys have access to a particular project.
7. Click **Create** to create a new project.

### About setting project permissions

You can set view permissions to your projects or projects you have administrator rights to and any objects within the project. This allows you more granular control over which users, groups, and API keys can access the objects in projects to support access requirements within an account. These objects include feature flags, segments, metrics, traffic types, and environments. This also allows you to determine who can see if a certain project exists.

## Editing a project

When you are viewing a project, you can edit a project by doing the following:
1. From the left navigation, click on the **user’s initials** at the bottom.
2. Click **Admin settings**, then **Projects**. A list of projects appears.
3. On the selected project you want to edit, click **View** in the Action column.
4. Click the **Actions** button and then **Edit project** from the menu list. The Edit project page appears. 

<p>
  <img src="https://help.split.io/hc/article_attachments/30797526732301" alt="projects_editing_a_project.png" />
</p>

5. In the Name field, optionally change the name.
6. On the Required comments checkbox, optionally check whether you’re requiring titles and comments for feature flags, segments, and metric changes.

:::note
When you check this box, it affects the approval flows.
:::

7. In the project permissions area, optionally select the desired control access by doing the following:
  * **Anyone has access**. Allows anyone to have access to this particular project.
  * **Restrict who can access**. Allows you to select which users, groups, and admin API keys have access to a particular project.
8. Click **Save** to save your changes. The changes appear in the admin audit logs.

## Viewing projects

To view projects, do the following:

1. From the left navigation, click on the **user’s initials** at the bottom.
2. Click **Admin settings**, then **Projects**. A list of projects appears. 
3. Select **View** on the desired project. From here, you can see the environment name, ID, type of project it is, permissions setting, and data export permission settings. 

<p>
   src="https://help.split.io/hc/article_attachments/30797516907149" alt="projects_viewing_projects.png">
</p>

## Requesting access to projects

If you have no access to a project, you need to request access from the administrator of that project. 

## Navigating between projects

You can navigate between projects by doing the following:

1. From the left navigation, click on the **user's initials** at the top.
2. **Search or select the project** you would like to switch to. You can see the environments, feature flags, segments, and metrics under that project.

## Managing your projects

To manage your projects, go to the **projects** tab in your **Admin Settings** page. On this page you can:

* See a list of all your existing projects.
* Manage the [environments](https://help.split.io/hc/en-us/articles/360019915771) and [traffic types](https://help.split.io/hc/en-us/articles/360019916311) in a project by clicking **View** in the Actions column for selected projects.

## Deleting projects

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044809051-How-can-I-delete-projects <br /> ✘ images still hosted on help.split.io </button>
</p>

To delete a project:

Make sure all feature flags, segments, and metrics are deleted from the project for all environments.

To delete a feature flag, delete all the definitions from its environments.

![](https://help.split.io/hc/article_attachments/30834559978381)

Then delete the feature flag.

![](https://help.split.io/hc/article_attachments/30834579439245)

To delete a segment, first select all its keys.

![](https://help.split.io/hc/article_attachments/30834579439501)

Then delete the keys.

![](https://help.split.io/hc/article_attachments/30834559979661)

Then delete the segment definition, repeat these steps for all environments.

![](https://help.split.io/hc/article_attachments/30834579440525)

Finally delete the segment.

![](https://help.split.io/hc/article_attachments/30834579441165)

To delete metrics, click on the upper top right (...) icon to delete it

![](https://help.split.io/hc/article_attachments/30834579441677)

In the Admin page, under **API keys** page, Make sure all Admin API and SDK keys are revoked for the project environments. For example the screenshot below shows the SDK API key for the "default" project.

how_can_I_delete_workspaces_008.png

In Admin settings, in the left menu, click **Projects**.
In the list of available projects, click the **View** link of the project you want to delete.

![](https://help.split.io/hc/article_attachments/30834559981709)

You will see a list of environments for the selected project, now you can delete each environment using the **Delete** link.
The user interface will allow you to delete all environments except the last one, as each project is required to have at least one environment.
Click the **Actions** button in the top right corner and choose the Delete project option, which will allow you to delete it.

![](https://help.split.io/hc/article_attachments/30834579443341)