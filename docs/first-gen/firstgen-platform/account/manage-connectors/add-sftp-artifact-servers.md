---
title: Add SFTP Artifact Servers
description: Connect your SFTP artifact servers with Harness.
# sidebar_position: 2
helpdocs_topic_id: 3d1awjkw57
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---
```mdx-code-block
import image_1 from './static/add-sftp-artifact-servers-11.png'
```

You can share files and folders on your network and use them for an SFTP Artifact Server connection.

In this topic:

* [Before You Begin](#before-you-begin)
* [Visual Summary](#visual-summary)
* [Step 1: Select SFTP Artifact Server](#step-1-select-sftp-artifact-server)
* [Step 2: Display Name](#step-2-display-name)
* [Step 3: SFTP URL](#step-3-sftp-url)
* [Step 4: Domain](#step-4-domain)
* [Step 5: Username and Password](#step-5-username-and-password)
* [Review: Adding SFTP Artifact Source in a Service](#review-adding-sftp-artifact-source-in-a-service)
* [Next Steps](#next-steps)

## Before You Begin

* See [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md).

## Visual Summary

Here's an example configuration of SFTP Artifact Source.

![](./static/add-sftp-artifact-servers-10.png)

The SFTP dialog has the following fields.

## Step 1: Select SFTP Artifact Server

To connect to an artifact server, do the following:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Artifact Servers**.
4. Click **Add Artifact Server**.
5. In **Type**, click **SFTP**.

## Step 2: Display Name

Enter a name for the SFTP Server. This is the name you will use to identify this connection when adding an Artifact Source to a Harness Service.

## Step 3: SFTP URL

Ensure that the value contains the `sftp:\\` scheme followed by the hostname or IP address. For example, `sftp:\\23.100.87.22`.

If you want to specify a folder in the URL, you can enter the folder using the `\myFolder` format, such as `sftp:\\23.100.87.22\myFolder`. Typically, you will specify the folder when you use the SFTP Artifact Server as an Artifact Source for a Service.

## Step 4: Domain

Enter the domain where the SFTP server is located.

## Step 5: Username and Password

Use a user account that has permissions to access the SFTP server.

For secrets and other sensitive settings, select or create a new [Harness Encrypted Text secret](../../security/secrets-management/use-encrypted-text-secrets.md).

Usage Scope is determined by the secret you selected.

Click **Submit**.

## Review: Adding SFTP Artifact Source in a Service

When you use the SFTP Artifact Server as an Artifact Source for a Service, you can specify a file or a folder for the artifact. This allows a folder to be copied to the deployment target host by the Harness Delegate. Here is the SFTP Artifact Source dialog:

```mdx-code-block
<img src={image_1} height="300" width="500" />
```


In **Artifact Path**, you can specify a file or folder by name or using wildcards. The following are example for different files and folders:

* todo-\*zip - All matching files, such todo-1.0.zip, todo-2.0.zip.
* test/\*zip - All zip files under **test** folder.
* test/1\* - All folders under **test** folder starting with 1.
* test/\* - All folders under **test** folder.

