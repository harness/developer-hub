---
title: Gitspace Settings
description: Learn more about how you use the reset gitspaces integration to connect Harness to your privately-owned, on-prem assets. 
sidebar_position: 11
sidebar_label: Gitspace Settings
---

Gitspace Settings provide you some general settings to control the Gitspace behavior. With these settings, you can configure Gitspaces behavior to suit your organization standards and policies. This gives you access and grained control over different Gitspace requirements like controlling Gitspace git providers, code editors, image paths, etc. 

This document will take you through all the Gitspace settings available and how you can use them to customize your organization's Gitspaces behaviour. 

---

## Before you begin
Before you begin and start customizing your Gitspace settings, ensure you have the following prerequisites met: 
1. You must have **account-level access** to configure Gitspace settings since these settings are only available at the account level. 
2. You should either have the **CDE admin** role or **account admin** role permissions to be able to configure these settings. Go to [Access Control](/docs/cloud-development-environments/rbac.md) to learn more about configuring RBAC for Harness CDE. 

---

## Gitspace Settings
As an admin, you can configure the following Gitspace settings: 
- **Git Providers**: Manage and control the git providers available for your account's Gitspaces. 
- **Code Editors**: Manage the code editors available for your account's Gitspaces. 
- **Cloud Regions & Machine Types**: Specify the cloud regions and machine types available for your account's Gitspaces. 
- **Gitspace Images**: Specify the gitspace images available for your account's Gitspaces. 

If you have all the prerequisites met, you can access the **Gitspace Settings** from the **Account Settings**. You'll be able to find it under the **General** tab. These Gitspace settings hold true for **all the Gitspaces created in your account**. Only CDE admins can manage and change these settings, CDE users can view these settings but they don't have edit access over the same. 

![](./static/admin-settings-1.png)

Lets deep dive into the Gitspace settings and understand how you can use them to customize your organization's Gitspaces behaviour. 

### Git Providers
With this setting feature, you can **customize the git providers** available for your account's Gitspaces i.e. all CDE users can create Gitspaces only with these specific Git providers configured here. They won't be able to create any Gitspace with any other git provider. 
Once you've added and customised this setting, hit **Save** to save your setting changes. 

![](./static/git-provider-admin-2.png)

### Code Editors
This setting allows you to **manage the code editors** available for your account's Gitspaces. This helps you control the code editor your CDE users can use to write and edit code. 

![](./static/code-editor-admin-2.png)

### Cloud Regions & Machine Types
With this setting feature, you can **control the cloud regions and machine types** for your account's Gitspaces. For all the available infrastructure providers, you can specify and select the cloud regions and machine types for that region. You can select either all the available machines in a region, or can just select a few to be available to your CDE users. 

![](./static/cloudregions-provider-admin3.png)

### Gitspace Images
This setting enables you to **manage and control the images** required to spin up the `devcontainer` for your Gitspaces. 

Currently, you can setup the base for the development container by using either of the two following methods to specify the `image`:  
1. You can add and customise the Gitspace container image by using the `image` property in your `devcontainer.json` file with any public image. Go to [Deep Dive into Gitspaces](/docs/cloud-development-environments/deep-dive-into-gitspaces/gitspace-configuration.md) to learn more about this. 
2. For private Docker images, you can connect Harness to your Artifact Repository and can configure your Gitspace setup with the specific `image` and artifact repository details. Go to [Private Docker Images](/docs/cloud-development-environments/features-of-gitspaces/private-docker-images.md) to learn more about the same.  

This Gitspace setting enables you to **add restrictions over the images that can be used to spin up Gitspaces**. 

![](./static/gitspace-image.png)

#### Default Gitspace Image
With this field, you can specify the **default Gitspace image** that will be used to spin up Gitspaces in the following cases: 
- In case a Gitspace is being created with no `image` path specified in the `devcontainer.json` file.
- In case a Gitspace is being created with a specific public `image` path but the image is not available or accessible. 
- In case a Gitspace is being created with a private Docker image, and the private Docker image is not available in the Artifact Repository. 
- In case a Gitspace is being created with a private Docker image, and the private Docker image is available in the Artifact Repository, but the Artifact Repository is not configured in the Gitspace setup. 

For all the above cases, a default Gitspace image will be used to spin up and create a Gitspace. This default Gitspace image is specified by the **Default Gitspace Image** field. You can use and add any **public image** or **private image** to be used as the default Gitspace image. 

**Public Image**

You can add any **public image path** to be used as the default Gitspace image. 

![](./static/public-gitspace-image.jpg)

**Private Image**

You can also add any **private docker image** as the default Gitspace image by selecting the specific image registry connector and adding the private docker image path. To read more about the artifact registry connectors supported with Harness Gitspaces, go to [Private Docker Images](/docs/cloud-development-environments/features-of-gitspaces/private-docker-images.md).

![](./static/private-gitspace-image.jpg)

#### Allowed Image Paths
This settings allows you to restrict users to be able to create Gitspaces with only specific allowed image paths. You can add and manage the list of all the allowed image paths from this setting field here. You can add as many image paths as required to be allowed. Here's a detailed breakdown of all the valid and invalid expressions for the image paths. 

**Valid Expression Types**

Here's a list of some common valid expression types that can be used in the allowed image paths list: 
| Expression Type | Pattern Example | Description | Matches |
|---|---|---|---|
| Repository Only | `nginx` | Matches any image from the specified repository with any tag or digest | `nginx:latest`, `nginx:1.19`, `nginx@sha256:abc123` |
| Exact Image Tag | `nginx:latest` | Matches only the exact image with specified tag | `nginx:latest` |
| Exact Image Digest | `nginx@sha256:01eb582bca...` | Matches only the exact image with specified digest | `nginx@sha256:01eb582bca...` |
| Wildcard Repository | `repo/*` | Matches any image within the repository namespace | `repo/app:tag`, `repo/sub/app:tag` |
| Wildcard Tag | `repo/image:*` | Matches any tag for the specific image | `repo/image:latest`, `repo/image:v1.0` |
| Wildcard Tag Prefix | `repo/image:dev*` | Matches tags starting with specified prefix | `repo/image:dev123`, `repo/image:dev` |
| Wildcard Repository Prefix | `repo/image*` | Matches repository paths starting with prefix | `repo/image:tag`, `repo/image-extra:tag` |


**Invalid Expression Types**

Here's a list of some common invalid expression types: 

| Invalid Pattern | Example | Reason | Correct Alternative |
|---|---|---|---|
| Multiple Wildcards in Tags | `nginx:*:latest` | Cannot have multiple colons with wildcards | `nginx:*` or `nginx:latest` |
| Wildcard in Middle of Tag | `nginx:*latest`, `nginx:lat*est` | Wildcards must be at the end of expressions | `nginx:lat*` |
| Wildcard at Repository Start | `*nginx:latest` | Wildcards cannot be at beginning of repository names | `*/nginx:latest` |
| Malformed Expressions | `invalid@@@` | Invalid syntax with multiple @ symbols | `invalid@sha256:...` |
| Invalid Characters in Tags | `repo/image:!invalid` | Special characters like `!` not allowed in tags | `repo/image:invalid` |
| Trailing Slash Without Wildcard | `mcr.microsoft.com/devcontainers/` | Trailing slash creates invalid pattern | `mcr.microsoft.com/devcontainers/*` |



