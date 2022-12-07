---
title: Add Application Stacks
description: Add an application stack or catalog to define the solution stack to use when deploying your service.
# sidebar_position: 2
helpdocs_topic_id: g26sp2ay68
helpdocs_category_id: iu2v9nlefv
helpdocs_is_private: false
helpdocs_is_published: true
---

Use an application stack or catalog as the solution stack when deploying your application, such as Tomcat 7. You can add an application stack in one of the following ways:


* Add the application stack when you create your Harness Service from the Harness built-in application stack. Harness includes several common application stacks, such as Tomcat 7.
* Add your own application stack from the **Setup** option.


In this topic:


* [Before You Begin](#before_you_begin)
* [Review: Permissions](#review_permissions)
* [Option 1: Add an Application Stack when Adding Service](#option_1_add_an_application_stack_when_adding_service)
* [Option 2: Add an Application Stack from the Setup](#option_2_add_an_application_stack_from_the_setup)


### Before You Begin


* [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts)
* [Services](https://docs.harness.io/article/eb3kfl8uls-service-configuration)


### Review: Permissions


In order to manage Application Stacks in Harness, a Harness User must belong to a User Group that has the Account Permission **Manage Application Stacks** enabled.


See
 [Managing Users and Groups (RBAC)](/article/ven0bvulsj-users-and-permissions).


### Option 1: Add an Application Stack when Adding Service


Add the application stack when you create your Harness Service.




![](https://files.helpdocs.io/kw8ldg1itf/articles/g26sp2ay68/1579911948110/image.png)

You can choose to include your application stack as part of the artifact you attach to your Harness Service. In this case, when you create a Service, leave the **Application Stack** field empty (do not choose any of the options in that list).


The **Application Stack** dialog has the following fields.




|  |  |
| --- | --- |
| **Field** | **Description** |
| **Family** | Click the name of the application stack family. |
| **Version** | Enter the version number, such as Tomcat 6. |
| **Name** | Enter a name for the application stack. |
| **Description** | Enter a description for the application stack. |
| **App Stack Archive File** | Upload the app stack file. For example, here are the Tomcat app stack files for
 [Apache](https://tomcat.apache.org/download-80.cgi).
The file must be in TAR or ZIP format. |
| **MD5** | Enter the checksum to ensure transition and storage. |



### Option 2: Add an Application Stack from the Setup


To add an application stack or catalog, do the following:


1. Click **Setup**.
2. In **Account**, click **Application Stacks**.
3. Click **Add Application Stack**.


The **Application Stack** dialog appears.




![](https://files.helpdocs.io/kw8ldg1itf/articles/c0s1dwlqyv/1586107105618/screenshot-2020-04-05-at-10-48-00-pm.png)

Refer to the table in Option 1 for details on each of the settings.

