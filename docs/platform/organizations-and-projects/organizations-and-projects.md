---
title: Organizations and Projects
description: Learn how to structure your work in Harness using organizations and projects, including creation, management, and moving projects between organizations.
sidebar_label: Overview
sidebar_position: 1
sidebar_class_name: hidden
tags:
  - organizations
  - projects
  - account hierarchy
keywords:
  - organizations
  - projects
  - harness hierarchy
  - create organization
  - create project
redirect_from:
  - /docs/platform/organizations-and-projects/projects-and-organizations
  - /docs/category/organizations--projects
---

Within a Harness account, you organize your work using organizations and projects. This structure helps your teams collaborate effectively while keeping ownership, access, and configuration clearly defined.

---

## What will you learn in this section?

By the end of this section, you will be able to:

- Understand the [Account, Organization, and Project hierarchy](#hierarchy-overview) and how it organizes work in Harness.
- [Create and manage organizations](#organizations) to group related projects and teams.
- [Create and manage projects](#projects) where your teams perform their daily work.

---

## Before you begin

- **Harness account basics**: Understand what a <a href="/docs/platform/get-started/overview#account" target="_blank">Harness account</a> is and how it serves as the top-level container.
- **RBAC fundamentals**: Familiarity with <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">role-based access control</a> helps you understand permission boundaries at each level.
- **Admin permissions**: Creating organizations requires account-level permissions. Creating projects requires organization-level permissions. To check your permissions, go to <a href="/docs/platform/role-based-access-control/add-manage-roles" target="_blank">Manage roles</a>.

---

## Hierarchy overview

Harness uses a three-tier hierarchy to organize your work:

```
Account
 └── Organization
      └── Project
```

**Account** is the highest level for all operations you perform in Harness. It is where you define your organizational structure, manage global settings, and control access across all users and projects.

**Organization** groups projects that share a common purpose or business goal, such as business units, product lines, or departments.

**Project** is where your teams do their day-to-day work, containing pipelines, services, environments, and module-specific resources.

### Resource inheritance

You can create resources such as <a href="/docs/platform/connectors" target="_blank"> connectors</a> at different levels: **account**, **organization**, or **project**. Resources you define at a higher level are automatically available at lower levels, which reduces duplication and keeps configuration consistent.

- **Account-level resources** are available to all organizations and projects.
- **Organization-level resources** are available only to that organization and its projects.
- **Project-level resources** are only available within that specific project.

---


## Organizations

A Harness organization (or *org*) groups together projects that share a common purpose or business goal. Each organization can contain multiple projects and provides a natural boundary for managing your teams, access, and shared resources.

Organizations represent higher-level groupings, such as:

- **Business units:** Sales Engineering, Customer Success, Product Development
- **Product lines:** Payment Platform, Identity Services, Analytics
- **Departments:** Engineering, Operations, Security
- **Geography:** APAC Operations, EMEA Services, Americas

For more information, go to <a href="/docs/platform/get-started/#step-2-create-organization-project-and-invite-collaborators" target="_blank">Create an organization</a> and <a href="/docs/platform/get-started/#invite-collaborators" target="_blank">Invite collaborators</a>.

---


## Projects

A Harness project is where your teams do their day-to-day work. Projects contain the users, pipelines, and the resources needed to build, deploy, test, and operate applications. 

For example, a project might have a Harness CI pipeline to build code and push an image to a repo and a Harness CD pipeline to pull and deploy that image to a cloud platform.

Common project patterns typically represent:

- **Application or service teams:** Payment API, User Service, Analytics Dashboard
- **Platform or infrastructure teams:** Platform Team, Mobile Team, Data Engineering
- **Individual workloads within an organization:** Microservices Backend, Frontend Web App, Batch Processing

Projects give your teams a shared workspace while allowing them to operate independently. You can add an unlimited number of Harness projects to an organization. All projects in the organization can use the organization's resources.

Much like account-level roles, project members can be assigned Project Admin, Member, and Viewer roles.

The ability to create organizations and projects varies based on your account type. 
With a free account:
- A default organization and project are already created for you. 
- You **cannot** create another new organization. However, you can create multiple projects within the default organization, and invite collaborators into the default organization.

Harness recommends creating a sample project with a few pilot users to get familiar with the Platform.

For more information, go to <a href="/docs/platform/get-started/onboarding-guide#create-a-project" target="_blank">Create a project</a>.

---

## Related articles

- <a href="/docs/platform/get-started/key-concepts#organizations-and-projects" target="_blank">Key Concepts: Organizations and Projects</a> - High-level explanation of the hierarchy.
- <a href="/docs/platform/get-started/onboarding-guide" target="_blank">Platform Onboarding Guide</a> - Step-by-step setup including organizations and project creation.
- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> - Understand permissions at account, org, and project scopes.
- <a href="/docs/platform/organizations-and-projects/move-projects/move-projects-across-organization" target="_blank">Move Projects Between Organizations</a> - Transfer projects when ownership changes.
