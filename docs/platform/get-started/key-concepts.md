---
title: Key concepts
description: Key concepts of the Harness Platform
sidebar_position: 3
helpdocs_topic_id: hv2758ro4e
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/get-started/platform-overview
  - /docs/getting-started/key-concepts
  - /docs/get-started/key-concepts
---

Get familiar with these key terms and concepts that are common to the Harness Platform and the Harness modules.

## Platform and modules

The *Harness Platform* refers to the common structure underlying the *Harness modules*.

Harness modules include Harness Continuous Integration (CI), Harness Continuous Delivery (CD), Harness Security Testing Orchestration (STO), and so on.

The Harness Platform includes features and functionality like your Harness account, organizations, projects, delegates, RBAC, global settings, and more. The Harness Platform provides a common framework underlying these modules to help you onboard and enable diverse teams leveraging different modules for different use cases.

### Product modules

Your project can add Harness products as modules, such as Continuous Integration or Continuous Delivery.

CD concepts:
#### Services

A service represents your microservices and other workloads logically.

A service is a logical entity to be deployed, monitored, or changed independently.

#### Service instance

Service instances represent the dynamic instantiation of a service you deploy via Harness.

For example, for a service representing a Docker image, service instances are the number of pods running with the Docker image.

#### Service definitions

Service definitions are the actual files and variable values that represent the artifacts, manifests, and variables of a service. You can propagate and override a service by selecting its name in the subsequent stages' service settings.

For more information, go to [Monitor Deployments and Services in CD Dashboards](../continuous-delivery/monitor-deployments/monitor-cd-deployments.md).

#### Environments

Environments represent your deployment targets logically (QA, Prod, etc). You can add the same environment to as many stages as you need.

#### Infrastructure definition

Infrastructure definitions represent an environment's infrastructure physically. They are the actual clusters, hosts, etc.

#### Deployments

Deployments make developed artifacts available for use in test or production. They release applications for access by users or systems, and can be manual or automated. In Harness pipelines, deployments are modeled using services, environments, and execution steps.

For more information, go to [Deployment concepts and strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts) and [Deploy services on different platforms](/docs/category/deploy-services-on-different-platforms).

#### GitOps

GitOps is an approach to managing and automating deployment and management of infrastructure and applications using Git. The desired state of the apps and infrastructure is stored in a Git repo as code. Harness automation tools monitor the Git repo for changes and synchronize the actual state with the desired state.

For more information, go to [Harness GitOps basics](/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics).

##### Why are Deployments and GitOps different

In GitOps, changes are managed via Git files and Agents, without requiring pipelines. Deployments refer to executed pipelines in Harness.

This difference is why you see **Deployments** and **GitOps** separated in the Harness UI.











## Account Overview

The Account Overview page lists your Harness Account Name, Account ID, Harness SaaS Cluster (which is hosting your account) as well as the various Harness Modules you are currently subscribed to. You will need this information to configure your Delegate, Terraform Provider, CLI and other automation tools that help in administering your account.

Docs: 
[Account Overview](/docs/platform/get-started/view-account-info-and-subscribe-to-alerts)

A Harness account is the top-level entity, containing organizations and projects. Resources can be added at all levels, and are available to all lower levels. Teams can manage resources independently with projects, without relying on account admins.

![](./static/learn-harness-key-concepts-04.png)


## Organizations and Projects

A Harness Organization models a Business Unit inside your company while a Harness Project models an application development team inside a Business Unit. You can delegate administration of Organizations and Projects to their respective administrators using RBAC (see below). Thereafter, these administrators can invite the developers on their own team and ensure that they are able to independently create/manage their use of Harness CD & GitOps (see the next section) without any possibility of accidentally misconfiguration for another team.

Docs: 
[Organizations & Projects](/docs/platform/organizations-and-projects/projects-and-organizations)


### Organizations

Harness Organizations (Orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division.

Within each org you can add several Harness Projects.

For more information, go to [Projects and Organizations](../platform/organizations-and-projects/projects-and-organizations.md).

### Projects

A Harness Project contains Harness pipelines, users, and resources that share the same goal. For example, a project could represent a business unit, division, or simply a development project for an app.

Projects are a shared space where teams can work independently on similar technologies without relying on account or org admins for new entities.

Much like account-level roles, project members can be assigned Project Admin, Member, and Viewer roles.

Project users have at least view access to all configuration and runtime data of a project and share the same assets (environments, services, infrastructure, and so on).


## User & User Group Management
Harness provides a comprehensive feature set for user and user group management.

User: A Harness User is any individual registered with Harness with a unique email address. You can add/remove users manually or via automated user provisioning integrations using Okta SCIM, Microsoft Entra ID SCIM, OneLogin SCIM and just-in-time SAML. Additionally, these users can authenticate into their Harness account using one or more of the following mechanisms, as allowed by the Account Administrators.
- Username & Password
- Public OAuth Providers like Google, GitHub, GitLab, LinkedIn, Azure & BitBucket
- SAML Providers like Azure, Okta & OneLogin
- LDAP

User Group: A collection of users can be grouped into a User Group. User Groups then act as a principal for role assignment (see next section) as well as a notification receiver. Notifications can be configured with email/alias, Slack Webhook, Microsoft Teams Webhook and PagerDuty as channels.

Docs: 
- [User Management](/docs/platform/role-based-access-control/add-users) 
- [User Group Management](/docs/platform/role-based-access-control/add-user-groups)

## Role-Based Access Control (RBAC)
RBAC enables users and user groups to be assigned resource-specific permissions. The specific list of resources is grouped into a resource group. The assignment of a role to a resource group makes the role actionable and is known as a role binding. Role bindings act on the scope of the entire Account, only the shared resources of an Account, one or more Organizations, and one or more Projects. 

Docs: 
[RBAC](/docs/platform/role-based-access-control/rbac-in-harness)

## Connectors
Connectors enable the integration of the Harness Platform with external systems by managing the authentication and authorization settings needed. 

Docs: [Connectors](/docs/category/connectors)
- [Source Code Repositories](/docs/category/code-repositories)
- [Artifact Repositories](/docs/category/artifact-repositories)
- [Cloud Providers](/docs/category/cloud-providers)
- [Monitoring & Logging Systems](/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems)
- [Ticketing Systems](/docs/category/ticketing-systems-1)
- [Secret Managers](/docs/platform/secrets/secrets-management/harness-secret-manager-overview)

### Connectors

Connectors contain the information necessary to integrate and work with 3rd party tools. Harness uses connectors at pipeline runtime to authenticate and perform operations with a third-party tool.

For example, a GitHub connector authenticates with a GitHub account and repo and fetches files as part of a build or deploy stage in a pipeline.

For more information, go to [Connectors](/docs/category/connectors).

## Secrets management

Harness includes built-in secrets management to store your encrypted secrets, such as access keys, and use them in your Harness account. Harness integrates with all popular secrets managers.

For more information, go to [Harness secrets management overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview).

## Service Accounts & API Keys
Service accounts are similar to users but without any human user association since they are meant for external systems to integrate with Harness Platform. You assign roles and resource groups to service accounts, and then you create API keys for the service account. These API keys are used to authenticate and authorize remote services attempting to perform operations in Harness through Harness APIs. The API keys inherit the role bindings assigned to the service account.

Docs:
[Manage service accounts](/docs/platform/role-based-access-control/add-and-manage-service-account)

## Delegates
Harness Delegate is a lightweight worker process that is installed on your infrastructure and communicates only via outbound HTTP/HTTPS to the Harness Platform. This enables the Harness Platform to leverage the delegate to execute CD pipeline and other tasks on your behalf, without any of your secrets leaving your network. You can install the Harness Delegate on either Docker or Kubernetes.

Docs:
[Delegate Overview](/docs/platform/delegates/delegate-concepts/delegate-overview)
[Install Delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate)

## Governance using Policy as Code
Adding governance guardrails with Open Policy Agent (OPA) based policies is easy. Edit one of the policy-as-code samples or writer your own.

Docs:
[Policy as Code overview](/docs/platform/governance/policy-as-code/harness-governance-overview)

## Pipelines

Typically, a pipeline is an end-to-end process that delivers a new version of your software. But a pipeline can be much more: a pipeline can be a cyclical process that includes integration, delivery, operations, testing, deployment, real-time changes, and monitoring.

For example, a pipeline can use the CI module to build, test, and push code, and then a CD module to deploy the artifact to your production infrastructure.

###  Pipeline Studio

You build pipelines in the Pipeline Studio. Pipeline Studio guides you in setting up and running your pipelines with ready-to-use steps.

### Visual and YAML pipeline editors

Scripting pipelines can be time-consuming and tedious. It may be difficult to envision the sequence of events in more complex pipelines. Harness CI's Pipeline Studio provides both a YAML editor and a graphical, visual editor. In the visual editor, you can easily add, remove, edit, and rearrange steps and stages. You can also use the YAML editor, which functions similarly to any other IDE, to configure your pipelines-as-code. You can also switch between the two for a combined approach.

For more information about YAML in Harness, go to [Write pipelines in YAML](../platform/pipelines/harness-yaml-quickstart.md).



### Stages

A stage is a subset of a pipeline that contains the logic to perform one major segment of the pipeline process. Stages are based on the different milestones of your pipeline, such as building, approving, and delivering.

Some stages, like a deploy stage, use strategies that automatically add the necessary steps.

For more information, go to [Add a Stage](../platform/pipelines/add-a-stage.md).

### Steps and step groups

A step is an individual operation in a stage.

Steps can be run in sequential and parallel order.

A step group is a collection of steps that share the same logic such as the same rollback strategy.

For more information, go to [Run Steps in a Step Group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups/)

## Templates
Templates enhance developer productivity, reduce onboarding time, and enforce standardization across the teams that use Harness. You can create re-usable logic for managing Harness entities like steps, stages, and pipelines. You can link templates in your pipelines or share them with your teams for improved efficiency.

Docs:
[Templates overview](/docs/platform/templates/template)

Tutorials:
[Pipeline templates](/docs/platform/templates/create-pipeline-template)

## Automation
You can automate the management of Harness entities in your account using one or more of the following approaches.

Docs:
- [Terraform Provider](/docs/category/terraform-provider)
- [CLI](/docs/category/cli)
- [API](/docs/category/api)

## Git Experience

You can sync your Harness account, orgs, and projects with your Git repo to manage Harness entirely from Git.

Harness can respond to Git events to trigger pipelines and pass in event data.

For more information, go to [Harness Git Experience overview](/docs/platform/git-experience/git-experience-overview/).