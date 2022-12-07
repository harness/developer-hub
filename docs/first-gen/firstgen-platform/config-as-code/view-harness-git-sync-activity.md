---
title: View Harness Git Sync Activity
description: View activity between Harness and the Git repos it syncs with.
# sidebar_position: 2
helpdocs_topic_id: zdk5xsdk72
helpdocs_category_id: 2ea2y01kgz
helpdocs_is_private: false
helpdocs_is_published: true
---

Once you have synched your Harness account or Applications with your Git repo(s), you can view bi-directional activity between Harness and your repos using **Git Sync Activity**.

While Git repo providers include activity and webhook information, they do not provide a way to view Harness-specific activity, by account, Application, and YAML file history.

Git Sync Activity provides you with a granular, commit-by-commit audit of every change and ensures that you are fully aware of all Git activity with your Harness account and Applications.

For information on fixing Git sync errors, see [Diagnose Git Sync Errors](/article/0ralbeajno-diagnose-git-errors).In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Step 1: Open Git Sync Activity](#step_1_open_git_sync_activity)
* [Step 2: Select Account-level Activity (Setup)](#step_2_select_account_level_activity_setup)
* [Step 3: Select Application-level Activity (App)](#step_3_select_application_level_activity_app)
* [Option 1: Select Activity to View](#option_1_select_activity_to_view)
* [Step 4: View Details](#step_4_view_details)
* [Step 5: Search by Status and Filename](#step_5_search_by_status_and_filename)
* [Step 6: View File Content](#step_6_view_file_content)
* [Step 7: View File History](#step_7_view_file_history)
* [Review: Status and Error Messages](#review_status_and_error_messages)
* [Review: RBAC with Git Sync Activity](#review_rbac_with_git_sync_activity)
* [See Also](#see_also)

### Before You Begin

Before you can view any Git activity in Harness, you must connect Harness with your Git repo(s).

Next, your Harness account or Applications must be synced with your Git repo using the webhook Harness provides.

To connect Harness with your Git repo and sync your Harness account and Applications, see the following topics:

1. Connect Harness with your Git repo(s).
* See the following topics:
	+ [Add a GitHub Repo](/article/sip9rr6ogy-add-github-repo)
	+ [Add a GitLab Repo](/article/od1u7t4vgq-add-a-gitlab-repo)
	+ [Add a Bitbucket Repo](/article/etl0yejzsm-add-bitbucket-repo)
	+ [Add a CodeCommit Repo](/article/o6w4vvzgdg-add-a-code-commit-repo)
1. Sync your Harness account and/or Applications with your Git repo.
* See the following topic for an overview and steps on your Harness account and/or Application:
	+ [Configuration as Code](/article/htvzryeqjw-configuration-as-code)

### Visual Summary

For a visual overview of how Harness and Git sync works, see [Configuration as Code](/article/htvzryeqjw-configuration-as-code).

Here is an example of some of the information available in **Git Sync Activity**:

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590188960624/image.png)Here is some of the information available in each activity record:

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590188908629/image.png)### Step 1: Open Git Sync Activity

1. In Harness, click **Setup**, and then click **Configuration as Code**.
2. Click **Git Sync Activity**.

If account-level synch has been set up, the default view shows all of the activity at the account level. Otherwise, the synced Applications are listed alphabetically.

Git sync activity is divided into Harness account-level activity and Application-level activity.

For a quick review of the difference between account and Application git syncing, see [Configuration as Code](/article/htvzryeqjw-configuration-as-code) and [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).

### Step 2: Select Account-level Activity (Setup)

The **Setup** filter option includes git sync activity at the Harness account level, as opposed to the Harness Application level. For your Git activity to show up here, your Harness account must be synced with a Git repo.

To view git activity for all Harness account-level components, do the following:

In **Git Sync Activity**, in **Filter by**, select **Setup**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590190316306/image.png)The **Setup** option is always at the top of the drop-down.The results are ordered by more recent to oldest.

You can sort the results by Activity Type, explained later in this topic.

### Step 3: Select Application-level Activity (App)

The Applications you see in **Filter by** depends on the permissions set in your Harness User Group.

You can view the Git activity for all Applications your User Group has read permissions for. See [Managing Users and Groups (RBAC)](/article/ven0bvulsj-users-and-permissions).

To view Git activity for a Harness Application, do the following:

In **Git Sync Activity**, in **Filter by**, select the name of your Harness Application.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590105148160/image.png)You can simply type in the name to locate the Application.

Harness displays the Application name, repo name, and repo branch name.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590190591797/image.png)The results display all Harness-related Git activity.

If your Git webhook was incorrectly set up or changed in your repo and you committed a change in Git, the activity will not appear in Harness because the webhook failed to connect with Harness.### Option 1: Select Activity to View

Use the Activity Type setting to select the Git activity you want to see. You can sort by **All**, **Git → Harness**, and **Harness → Git**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590105176923/image.png)The sync direction is also displayed in every record.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590190762236/image.png)### Step 4: View Details

Click **View Details** on any record to see what happened.

Each record displays a number of useful details from your Git commit. Here is an example of Git → Harness activity. You can see the commit in Github and in Harness:

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590185634469/image.png)In the above example, you can see a difference in time since activity between Git and Harness records. This is because the initial Git → Harness activity failed due to an incorrect webhook. Once the webhook was fixed, the Git → Harness sync occurred.

### Step 5: Search by Status and Filename

If you have a large commit that involves many files, you can sort the activity by status:

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590105409406/image.png)You can also search by filename. Wildcards are not supported. Simply type any letter in the name and see all matching files.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590105374845/image.png)### Step 6: View File Content

To view the content of a change, click **View Content** on any file. The YAML of the file is displayed.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590105330807/image.png)### Step 7: View File History

To view the history of all changes to the file, click **View History**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590186203094/image.png)Each commit ID for the file is shown, along with its activity type, status, and change type.

### Review: Status and Error Messages

Each Git Sync Activity record contains status and error message content to help you understand the context of the activity.

In addition, for every record, the **Change Type** is listed. This is the type of change made in the Git activity, such as ADD or MODIFY.

#### Git Sync Process and Messages

The status and errors message will appear as part of the Git sync process. Below is the Git → Harness process and messages. The messages are the same for the Harness → Git process.

1. A commit is received via a webhook: `QUEUED`.
2. The commit is picked up by a Harness Delegate to be processed: `IN-PROGRESS`.
3. Post processing, the commit goes to a terminal state:
	1. No errors: `COMPLETED`.
	2. Some errors: `PROCESSED`.
	3. Nothing processed: `FAILED`.

####  Status Messages

The records displayed in Git Sync Activity have the following statuses:

* **Completed** — The sync completed in either direction.![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590181664110/image.png)
* **Processed** — Harness successfully pushed or pulled the Git change, but was unable to make the change because of a conflict. For this reason, the activity is marked as Processed instead of Completed.  
For example, a change made to a file in Git made it incompatible with Harness configuration requirements. In the following example, a required value was missing:![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590181841877/image.png)
* **Success** — The number of successful file changes in the Git activity.![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590182015668/image.png)Harness also provides details on activity that fixes errors:![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590182218355/image.png)
* **Failed** — The number of unsuccessful file changes in the Git activity.
* **Skipped** — If there are files in the commit that are not Harness files.

#### Error Messages

If an error occurs during sync, Harness marks the status as Failed and provides details.

In most cases, a sync is failed to prevent issues. For example, when changes to Harness YAML files are incompatible with Harness requirements and might cause your Harness account or Application to experience errors.

Here is an example of some errors:

![](https://files.helpdocs.io/kw8ldg1itf/articles/zdk5xsdk72/1590182475172/image.png)### Review: RBAC with Git Sync Activity

RBAC in Git Sync Activity follows permissions set on the User Group to which you are a member. It follows standard Harness RBAC as described in [Managing Users and Groups (RBAC)](/article/ven0bvulsj-users-and-permissions).

Here are a few things to consider:

* If your User Group does not have permission to read a specific Application, then you are not able to view the Application in **Git Sync Activity**.
* Even if a Harness User Group has Read permissions on only one Application, its users can still read account-level settings. They simply cannot change them. Consequently, in Git Sync Activity, the user can view account-level Git activity using **Setup** in **Filter by**.
* The activity and errors of all account-level files are visible to all users, but a user can only see the content (**View Content**) of the files for which his User Group has permission.

### Notes

* Harness will maintain Git Sync activity records for 1 year.

### See Also

* [Configuration as Code](/article/htvzryeqjw-configuration-as-code)
* [Harness YAML Code Reference](/article/21kgaw4h86-harness-yaml-code-reference)

