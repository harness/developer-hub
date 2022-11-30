---
title: Organizations and Projects Overview
description: This topic explains Organizations and Projects in Harness. In this topic --  Before you begin. Visual Summary. What is an Organization?. What is a Project?. What is a Product Module?. Resources Across S…
# sidebar_position: 2
helpdocs_topic_id: 7fibxie636
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic explains Organizations and Projects in Harness.

### Before you begin

* [Harness Role-Based Access Management Overview](../4_Role-Based-Access-Control/1-rbac-in-harness.md)

### Visual Summary

Harness enables you to manage access control at the following [scopes](../4_Role-Based-Access-Control/1-rbac-in-harness.md#rbac-scope):

* Account
* Organization
* Project

![](./static/projects-and-organizations-04.png)
### What is an Organization?

Harness Organizations (Orgs) allow you to group Projects that are related and share the same goals. For example, all projects for a business unit or division.

You can create multiple Organizations within an Account. Any resource that you create within the Organization's scope is available for use in all the Projects created within this Organization.

![](./static/projects-and-organizations-05.png)
Within each Org you can add several Harness Projects.

![](./static/projects-and-organizations-06.png)
To create a new Organization, make sure you have the **Create** permissions for Organizations. For more information, see [Create a Harness Org](../1_Organizations-and-Projects/2-create-an-organization.md#step-1-create-a-harness-org).

### What is a Project?

A Harness Project is a group of Harness modules, their Pipelines and resources. For example, a Project might have a Harness CI Pipeline to build code and push an image and a Harness CD Pipeline to deploy that image to a cloud platform

Think of projects as a common space for managing teams working on similar technologies. A space where the team can work independently and not need to bother Account admins or even Org admins when new entities like Connectors, Delegates, or secrets are needed.

You can create multiple Projects within an Organization.

![](./static/projects-and-organizations-07.png)
To create a new Project, make sure you have the **Create** permissions for Projects. For more information, see [Create a Project](../1_Organizations-and-Projects/2-create-an-organization.md#step-3-create-a-project).

Much like Account-level roles, project members can be assigned Project Admin, Member, and Viewer roles.

![](./static/projects-and-organizations-08.png)
### What is a Product Module?

Your Project can add Harness products as modules, such as Continuous Integration or Continuous Delivery.

![](./static/projects-and-organizations-09.png)
### Resources Across Scopes

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

