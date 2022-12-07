---
title: Add SFTP Artifact Servers
description: Connect your SFTP artifact servers with Harness.
# sidebar_position: 2
helpdocs_topic_id: 3d1awjkw57
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

You can share files and folders on your network and use them for an SFTP Artifact Server connection.

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Step 1: Select SFTP Artifact Server](#step_1_select_sftp_artifact_server)
* [Step 2: Display Name](#step_2_display_name)
* [Step 3: SFTP URL](#step_3_sftp_url)
* [Step 4: Domain](#step_4_domain)
* [Step 5: Username and Password](#step_5_username_and_password)
* [Review: Adding SFTP Artifact Source in a Service](#review_adding_sftp_artifact_source_in_a_service)
* [Next Steps](#next_steps)

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).

### Visual Summary

Here's an example configuration of SFTP Artifact Source.

![](https://files.helpdocs.io/kw8ldg1itf/articles/7dghbx1dbl/1587762357577/image.png)The SFTP dialog has the following fields.

### Step 1: Select SFTP Artifact Server

To connect to an artifact server, do the following:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Artifact Servers**.
4. Click **Add Artifact Server**.
5. In **Type**, click **SFTP**.

### Step 2: Display Name

Enter a name for the SFTP Server. This is the name you will use to identify this connection when adding an Artifact Source to a Harness Service.

### Step 3: SFTP URL

Ensure that the value contains the `sftp:\\` scheme followed by the hostname or IP address. For example, `sftp:\\23.100.87.22`.

If you want to specify a folder in the URL, you can enter the folder using the `\myFolder` format, such as `sftp:\\23.100.87.22\myFolder`. Typically, you will specify the folder when you use the SFTP Artifact Server as an Artifact Source for a Service.

### Step 4: Domain

Enter the domain where the SFTP server is located.

### Step 5: Username and Password

Use a user account that has permissions to access the SFTP server.

For secrets and other sensitive settings, select or create a new [Harness Encrypted Text secret](/article/ygyvp998mu-use-encrypted-text-secrets).

Usage Scope is determined by the secret you selected.

Click **Submit**.

### Review: Adding SFTP Artifact Source in a Service

When you use the SFTP Artifact Server as an Artifact Source for a Service, you can specify a file or a folder for the artifact. This allows a folder to be copied to the deployment target host by the Harness Delegate. Here is the SFTP Artifact Source dialog:

![](https://files.helpdocs.io/kw8ldg1itf/articles/7dghbx1dbl/1547593762735/image.png)In **Artifact Path**, you can specify a file or folder by name or using wildcards. The following are example for different files and folders:

* todo-\*zip - All matching files, such todo-1.0.zip, todo-2.0.zip.
* test/\*zip - All zip files under **test** folder.
* test/1\* - All folders under **test** folder starting with 1.
* test/\* - All folders under **test** folder.

