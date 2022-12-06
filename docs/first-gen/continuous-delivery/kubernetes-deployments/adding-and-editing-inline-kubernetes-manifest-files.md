---
title: Adding and Editing Inline Kubernetes Manifest Files
description: Manage files in your Harness Kubernetes Service.
sidebar_position: 70
helpdocs_topic_id: pfexttk6dr
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/category/qfj6m1k2c4).

Harness provides full file management for your Kubernetes configuration files. You can add, edit, and manage all of the files in your Harness Kubernetes Service.


### Before You Begin

* [Define Kubernetes Manifests](define-kubernetes-manifests.md)
* [Upload Kubernetes Resource Files](upload-kubernetes-resource-files.md)

### Step 1: Manually Add Configuration Files

For information on uploading files, see [Upload Kubernetes Resource Files](upload-kubernetes-resource-files.md). Once the files are uploaded into Harness, you can create more files inline, as described below.

1. In your Harness Kubernetes Service, click the more options button (**︙**) next to any existing file or folder.
   [![](./static/adding-and-editing-inline-kubernetes-manifest-files-55.png)](./static/adding-and-editing-inline-kubernetes-manifest-files-55.png)
   The **Add File** dialog appears.
   [![](./static/adding-and-editing-inline-kubernetes-manifest-files-57.png)](./static/adding-and-editing-inline-kubernetes-manifest-files-57.png)
2. Enter a file name and click **Submit**. To add a folder at the same time, enter the folder name followed by the file name, such **myfolder/service.yaml**.

Now you can edit the file and paste in your manifest.

To add more files to that folder, use the same folder name when you create the files.

### Step 2: Edit Resource Files

1. In your Harness Kubernetes Service **Manifests** section, select a file and click the **Edit** button.
2. Enter your YAML, and then click **Save**.

Harness validates the YAML in the editor at runtime.You can use Go templating for inline manifest files. See [Use Go Templating in Kubernetes Manifests](use-go-templating-in-kubernetes-manifests.md).

The inline values.yaml file used in a Harness Service does not support Helm templating, only Go templating. Helm templating is fully supported in the remote Helm charts you add to your Harness Service.

### Step 3: Create and Manage Folders

1. Click the more options button (︙) and click **Rename File**. The **Rename File** dialog opens.
   [![](./static/adding-and-editing-inline-kubernetes-manifest-files-59.png)](./static/adding-and-editing-inline-kubernetes-manifest-files-59.png)
2. Enter a folder name before the file name, including a forward slash, such as **myfolder/**.
3. Click **SUBMIT**. The folder is created and the file is added to it.

To add other existing files to that folder, rename them and use the same folder name.

### Next Steps

* [Upload Kubernetes Resource Files](upload-kubernetes-resource-files.md)

