---
title: Upload Kubernetes Resource Files
description: Upload Kubernetes files and folders and manage them in Harness.
sidebar_position: 80
helpdocs_topic_id: 2vcxg26xiu
helpdocs_category_id: n03qfofd5w
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/category/qfj6m1k2c4).

Harness includes default Kubernetes resource files you can edit and add to, and the ability to [link to remote Git and Helm repo files](link-resource-files-or-helm-charts-in-git-repos.md), but you might also have resource files you want to upload into Harness.

Harness enables you to upload files and folders and manage them in the Service **Manifests** section.

### Before You Begin

* [Adding and Editing Inline Kubernetes Manifest Files](adding-and-editing-inline-kubernetes-manifest-files.md)

### Step 1: Delete the Default Files

1. In your Harness Kubernetes Service, in **Manifests**, click the more options button (**︙**) and click **Delete All Manifest Files**.
2. Click **Confirm**.

### Step 2: Upload Resource Files

1. Click the more options button (**︙**) again, and then click **Upload Inline Manifest Files**. The **Upload Inline Manifest Files** settings appear.
   ![](./static/upload-kubernetes-resource-files-165.png)
2. Click **Choose** and select folders and files or drag and drop files into the dialog. If you select a folder, all subordinate folders and files are copied.
3. Click **SUBMIT**. Your files are added to the **Manifests** section of the Service.

The files are added to the root folder. You can create folders and add the files into them. Simply select a file, click the more options button (︙) and click **Rename File**. Add the folder name before the file name, using a forward slash, like **folderA/filename.yaml**. The file is moved into the folder.

### Option 1: Use Namespace Alternatives

You might have existing manifest files from other deployments that you want to add to your **Manifests** section, but you do not want to use the same namespace settings, such as the namespace in a Service object:


```
apiVersion: v1  
kind: Service  
metadata:  
  name: my-service  
  namespace: prod  
spec:  
  type: ExternalName  
  externalName: my.database.example.com
```
You can remove existing `namespace` settings in the files you upload into Manifests by selecting the **Remove hard-coded namespaces from resource metadata** option in the **Upload Inline Manifest Files** dialog.

[![](./static/upload-kubernetes-resource-files-166.png)](./static/upload-kubernetes-resource-files-166.png)

The uploaded files will have their `namespace` key and value removed. Using our Service example, you can see `namespace: prod` is gone:


```
apiVersion: v1  
kind: Service  
metadata:  
  name: my-service  
spec:  
  type: ExternalName  
  externalName: my.database.example.com
```
Harness will use the namespace you enter in the Infrastructure Definition **Namespace** field as the namespace for these manifests.

Here is an Infrastructure Definition with its **Namespace** field:

![](./static/upload-kubernetes-resource-files-168.png)

You can also use the expression `namespace: ${infra.kubernetes.namespace}` in your manifest files and Harness will use the namespace you enter in the Infrastructure Definition **Namespace** field as the namespace for these manifests.

![](./static/upload-kubernetes-resource-files-169.png)

Another option is to add `namespace: ${infra.kubernetes.namespace}` in the **values.yaml** file and refer it in your manifest with `namespace: {{ .Values.namespace }}`.

### Next Steps

* [Link Resource Files or Helm Charts in Git Repos](link-resource-files-or-helm-charts-in-git-repos.md)

