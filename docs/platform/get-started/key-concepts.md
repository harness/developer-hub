---
title: Key concepts
description: Key concepts of the Harness Platform
sidebar_position: 2
redirect_from:
  - /docs/platform/get-started/platform-overview
---

Harness Platform refers to the various common Harness constructs that help you onboard and then enable multiple application development teams looking to leverage the power of Harness modules. Here are a few of the key concepts.

## Account Overview
The Account Overview page lists your Harness Account Name, Account ID, Harness SaaS Cluster (which is hosting your account) as well as the various Harness Modules you are currently subscribed to. You will need this information to configure your Delegate, Terraform Provider, CLI and other automation tools that help in administering your account.

Docs: 
[Account Overview](/docs/platform/get-started/view-account-info-and-subscribe-to-alerts)

## Organizations & Projects
A Harness Organization models a Business Unit inside your company while a Harness Project models an application development team inside a Business Unit. You can delegate administration of Organizations and Projects to their respective administrators using RBAC (see below). Thereafter, these administrators can invite the developers on their own team and ensure that they are able to independently create/manage their use of Harness CD & GitOps (see the next section) without any possibility of accidentally misconfiguration for another team.

Docs: 
[Organizations & Projects](/docs/platform/organizations-and-projects/projects-and-organizations)

## User & User Group Management
Harness provides a comprehensive feature set for user and user group management.

User: A Harness User is any individual registered with Harness with a unique email address. You can add/remove users manually or via automated user provisioning integrations using Okta SCIM, Azure AD SCIM, OneLogin SCIM and just-in-time SAML. Additionally, these users can authenticate into their Harness account using one or more of the following mechanisms, as allowed by the Account Administrators.
- Username & Password
- Public OAuth Providers like Google, GitHub, GitLab, LinkedIn, Azure & BitBucket
- SAML Providers like Azure, Okta & OneLogin
- LDAP

User Group: A collection of users can be grouped into a User Group. User Groups then act as a principal for role assignment (see next section) as well as a notification receiver. Notifications can be configured with email/alias, Slack Webhook, Microsoft Teams Webhook and PagerDuty as channels.

Docs: 
[User Management](/docs/platform/role-based-access-control/add-users) | 
[User Group Management](/docs/platform/role-based-access-control/add-user-groups)

## Role-Based Access Control (RBAC)
RBAC enables users and user groups to be assigned resource-specific permissions. The specific list of resources is grouped into a resource group. The assignment of a role to a resource group makes the role actionable and is known as a role binding. Role bindings act on the scope of the entire Account, only the shared resources of an Account, one or more Organizations, and one or more Projects. 

Docs: 
[RBAC](/docs/platform/role-based-access-control/rbac-in-harness)

## Connectors
Connectors enable the integration of the Harness Platform with external systems by managing the authentication and authorization settings needed. 

Docs:[Connectors](/docs/category/connectors)
- [Source Code Repositories](/docs/category/code-repositories)
- [Artifact Repositories](/docs/category/artifact-repositories)
- [Cloud Providers](/docs/category/cloud-providers)
- [Monitoring & Logging Systems](/docs/platform/Connectors/Monitoring-and-Logging-Systems/connect-to-monitoring-and-logging-systems)
- [Ticketing Systems](/docs/category/ticketing-systems-1)
- [Secret Managers](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview)


## Service Accounts & API Keys
Service accounts are similar to users but without any human user association since they are meant for external systems to integrate with Harness Platform. You assign roles and resource groups to service accounts, and then you create API keys for the service account. These API keys are used to authenticate and authorize remote services attempting to perform operations in Harness through Harness APIs. The API keys inherit the role bindings assigned to the service account.

Docs:
Manage service accounts

## Delegates
Harness Delegate is a lightweight worker process that is installed on your infrastructure and communicates only via outbound HTTP/HTTPS to the Harness Platform. This enables the Harness Platform to leverage the delegate to execute CD pipeline and other tasks on your behalf, without any of your secrets leaving your network. You can install the Harness Delegate on either Docker or Kubernetes.

Docs:
Delegate Overview
Tutorials:
Install Delegate on Kubernetes or Docker

## Governance using Policy-as-Code 

## Templates

## Automation
### Terraform Provider
### CLI
### API
