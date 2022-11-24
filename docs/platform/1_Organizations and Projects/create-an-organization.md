---
title: Create Organizations and Projects
description: Harness Organizations (Orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division. A Harness Project is a group of Harness modules and their…
# sidebar_position: 2
helpdocs_topic_id: 36fw2u92i4
helpdocs_category_id: 3trbf8xckk
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Organizations (Orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division.

A Harness Project is a group of Harness modules and their Pipelines. For example, a Project might have a Harness CI Pipeline to build code and push an image to a repo and a Harness CD Pipeline to pull and deploy that image to a cloud platform.

You can add an unlimited number of Harness Projects to an Org. All Projects in the Org can use the Org's resources.

This topic describes how to create an Org, invite Harness Users to it as members, and create a Project within the Org.

### Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)

### Prerequisites

* Make sure you have the **Create** permissions for Organizations to create an Org.
* Make sure you have the **Create** permissions for Project to create a Project.

### Visual Summary

Within a Harness account, you have Orgs, and within Orgs you have Projects.

![](https://files.helpdocs.io/i5nl071jo5/articles/36fw2u92i4/1614902717126/image.png)The resources in the Org are available to all of its Projects.

### Step 1: Create a Harness Org

1. In Harness, in **Account Settings** click **Organizations**.
2. Click **+New Organization**. The new Organization settings appear.![](https://files.helpdocs.io/i5nl071jo5/articles/36fw2u92i4/1648718357033/screenshot-2022-03-31-at-2-48-46-pm.png)
3. In **Name**, enter a name for your Organization.
4. Enter **Description**, and [Tags](/article/i8t053o0sq-tags-reference) for your new Org.
5. Click **Save and Continue**.

### Step 2: Invite Collaborators

The Org and any Projects added to it are used by their members only.

You don't have to add the same members to an Org and its Projects. You can add Org-level members, and then add Project-level members later when you set up or edit a Project.

1. In **Invite People to Collaborate**, type a member's name and select it.
2. In **Role**, select the role the member will have in this Org, such as Organization Admin or Organization Member.![](https://files.helpdocs.io/i5nl071jo5/articles/36fw2u92i4/1648718846633/screenshot-2022-03-31-at-2-54-26-pm.png)
3. Click **Add**.

Members receive invites via their email addresses.

You can always invite more members from within the Org later.

1. Click **Finish**. The Org is added to the list in Account Settings Organizations.

### Step 3: Create a Project

You can create Projects in the Org from the Projects section of Harness, or from within the Org. In this example, we'll create Projects in **Projects**.

1. In Harness, go to **Home** and click **Projects**.
2. Click **+Project**.
3. Name the Project, and select a color. The ID of the project is generated automatically. See [Harness Entity Reference](/article/tygjin99y9-harness-entity-reference).
4. In **Organization**, select the Org you created.
5. Add a description and tags, and then click **Save and Continue**.
6. In Invite Collaborators, type a member's name and select it.
7. Select a role for the member, and click **Add**.
8. Click **Save and Continue** to create the Project.

### Step 4: Add Modules

Next, the Harness modules appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/36fw2u92i4/1639730357778/screenshot-2021-12-17-at-2-07-34-pm.png)1. Select the modules you want to use in your Project. You can select more at any time.
2. Close the modules and open your Project in Projects or in its Organization.
3. When you open the Project, all of the modules are displayed.
4. Pick a module and click **Create New Pipeline** to get started!

### See Also

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts)
* [Harness Role-Based Access Control Overview](/article/vz5cq0nfg2-rbac-in-harness)

