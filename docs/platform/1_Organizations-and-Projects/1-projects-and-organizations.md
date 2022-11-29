---
title: Organizations and Projects Overview
description: This topic explains Organizations and Projects in Harness. In this topic --  Before You Begin. Visual Summary. What is an Organization?. What is a Project?. What is a Product Module?. Resources Across S…
# sidebar_position: 2
helpdocs_topic_id: 7fibxie636
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains Organizations and Projects in Harness.

### Before you begin

* [Harness Role-Based Access Management Overview](../4_Role-Based-Access-Control/1-rbac-in-harness.md)

### Visual summary

Harness enables you to manage access control at the following [scopes](../4_Role-Based-Access-Control/rbac-in-harness.md#rbac-scope):

* Account
* Organization
* Project

![](https://files.helpdocs.io/i5nl071jo5/articles/7fibxie636/1649088377739/screenshot-2022-04-04-at-9-35-28-pm.png)
### What is an organization?

Harness Organizations (Orgs) allow you to group Projects that are related and share the same goals. For example, all projects for a business unit or division.

You can create multiple Organizations within an Account. Any resource that you create within the Organization's scope is available for use in all the Projects created within this Organization.

![](https://files.helpdocs.io/i5nl071jo5/articles/7fibxie636/1649226361483/screenshot-2022-04-06-at-11-55-26-am.png)Within each Org you can add several Harness Projects.

![](https://files.helpdocs.io/i5nl071jo5/articles/7fibxie636/1649227493167/screenshot-2022-04-06-at-12-14-09-pm.png)To create a new Organization, make sure you have the **Create** permissions for Organizations. For more information, see [Create a Harness Org](../1_Organizations-and-Projects/2-create-an-organization.md#step-1-create-a-harness-org)
### What is a project?

A Harness Project is a group of Harness modules, their Pipelines and resources. For example, a Project might have a Harness CI Pipeline to build code and push an image and a Harness CD Pipeline to deploy that image to a cloud platform

Think of projects as a common space for managing teams working on similar technologies. A space where the team can work independently and not need to bother Account admins or even Org admins when new entities like Connectors, Delegates, or secrets are needed.

You can create multiple Projects within an Organization.

![](https://files.helpdocs.io/i5nl071jo5/articles/7fibxie636/1649229495089/screenshot-2022-04-06-at-12-14-09-pm.png)To create a new Project, make sure you have the **Create** permissions for Projects. For more information, see [Create a Project](../1_Organizations-and-Projects/2-create-an-organization.md#step_3_create_a_project).

Much like Account-level roles, project members can be assigned Project Admin, Member, and Viewer roles.

![](https://files.helpdocs.io/i5nl071jo5/articles/7fibxie636/1649229957368/screenshot-2022-04-06-at-12-54-00-pm.png)
### What is a product module?

Your Project can add Harness products as modules, such as Continuous Integration or Continuous Delivery.

![](https://files.helpdocs.io/i5nl071jo5/articles/7fibxie636/1649230034650/screenshot-2022-04-06-at-12-56-28-pm.png)
### Resources zcross scopes

The following table lists the resources that are available at various scopes in Harness:



|  |  |  |  |
| --- | --- | --- | --- |
| **Resources** | **Account** | **Org** | **Project** |
| **Pipeline** | No | No | Yes |
| **Services** | No | No | Yes |
| **Environments** | No | No | Yes |
| **Git Management** | No | No | Yes |
| **Connectors** | Yes | Yes | Yes |
| **Secrets** | Yes | Yes | Yes |
| **SMTP Configuration** | Yes | No | No |
| **Templates** | Yes | Yes | Yes |
| **Audit Trail** | Yes | Yes | Yes |
| **Delegates** | Yes | Yes | Yes |
| **Governance** | Yes | Yes | Yes |

