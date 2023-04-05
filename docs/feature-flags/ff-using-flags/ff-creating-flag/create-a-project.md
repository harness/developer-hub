---
title: Create a Project
description: Before you can create a Feature Flag, you need to create a Project in the Harness platform. A Feature Flag is available only for the Project the Flag is created in, so you need to create any Flags in…
sidebar_position: 10
helpdocs_topic_id: 47fkt1ric5
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import create_project from './static/1-create-a-project-00.png'
import about_project from './static/1-create-a-project-01.png'
import invite_collabs from './static/1-create-a-project-02.png'
```


Before you can create a Feature Flag, you need to create a project in the Harness platform. A Feature Flag is available only for the project the flag is created in, so you need to create any flags in each project you want to use them for.

This topic describes how to create a project in the Harness Platform. For more information, go to [Harness Platform documentation](/docs/platform).

## Before you begin

Before you create a Feature Flag, you must have [created an Organization](/docs/platform/organizations-and-projects/create-an-organization). It's also useful to know about how Access Control works in Harness, to learn more about this, go to [Manage Access Control](../../ff-onboarding/ff-security-compliance/manage-access-control.md).

## Create a project

1. In **Harness**, click **Feature Flags** and click **Create Project**.

	```mdx-code-block
	<img src={create_project} alt="A screenshot of the Harness Platform that highlights the Create Project button in the Feature Flag module." height="500" width="700" />
	```

	*Figure 1: Create a Project in Feature Flags*

1. In **About the Project**, in **Name**, enter the name for your project and select a color for it.
2. In the **Organization** drop-down menu, select the Organization for your project. If you need to create a new Organization, go to [Create a Harness Organization](../../../platform/organizations-and-projects/create-an-organization.md#step-1-create-a-harness-org) and [Projects and Organizations](../../../platform/organizations-and-projects/projects-and-organizations.md).
3. Click **Save and Continue**.

	```mdx-code-block
	<img src={about_project} alt="A screenshot of the About the Project form." height="500" width="700" />
	```
	*Figure 2: About the Project form*

1. (Optional) In **Invite Collaborators**, in **Invite People to Collaborate**, add team members to the project.
2. (Optional) Assign a role to the collaborators and click **Add**. The roles you can select are:
	* Project Viewer
	* Project Admin
	* Pipeline Executer
	* Gitops Admin Role
	* Feature Flag Manage Role

	For more information about the permissions for each role, go to [Manage Access Control](../../ff-onboarding/ff-security-compliance/manage-access-control.md) and [Permissions Reference](../../../platform/4_Role-Based-Access-Control/ref-access-management/permissions-reference.md).

3. Click **Save and Continue**. Your project is created.

	```mdx-code-block
	<img src={invite_collabs} alt="A screenshot of the Invite Collaborators form when creating a project." height="500" width="700" />
	```

	*Figure 3: Invite Collaborators screen*

4. In your project, click **Feature Flags**.

## Next step

* [Create an Environment](create-an-environment.md) to host your Feature Flags. 



