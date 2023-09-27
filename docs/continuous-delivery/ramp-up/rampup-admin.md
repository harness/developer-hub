---
title: Admin role ramp-up guide
description: Set up an account in just a few steps 
sidebar_position: 2
---

This guide is intended to get users in the **Admin role** started with Harness CD. The intended audience is an administrator or anyone who will be configuring and/or piloting Harness on behalf of their organization.

Most of the items in this guide align with the onboarding wizard that is shown within the application, and we include additional suggested configurations and setups in [Next Steps](#next-steps).


## Set up a delegate at the account level

The Harness delegate is a service you run in your local network or VPC to connect Harness SaaS with your artifacts, infrastructure, collaboration, verification, and other providers. 

The first time you connect Harness to a third party resource, the Harness delegate is installed in your target infrastructure, such as a Kubernetes cluster. 

After the delegate is installed and registers with Harness, you connect Harness to third party resources. 

The delegate performs all operations on your behalf, including deployment and integration.

<docimage path={require('./static/f4548d9674e6e466144e588570cf43766f9c78f5d39aea7ecfa48724b47f2428.png')} width="60%" height="60%" title="Click to view full size image" />  

For more information, go to [Delegate overview](https://developer.harness.io/docs/platform/delegates/delegate-concepts/delegate-overview/#install-a-delegate) and [Delegate installation overview](https://developer.harness.io/docs/platform/delegates/install-delegates/overview/).

## Configure the account structure (project and organization setup)

Harness uses a three level hierarchy of account, organizations, and projects. Accounts contains organizations, and organizations contain projects.

### Projects overview

A project is everything an application team needs to get started with Harness.

A project is a group of services that serves the same business goal (several components for the same application, for example) and it is usually managed by the same development team. The idea is to treat the project as a common space for teams of similar or related technologies to be managed.

For example, imagine Customer A has 1 application that is comprised of numerous microservices. These microservices leverage the same Git connector, the same secrets managers, and deploy the same way. All of the components for deployment, the pipelines, stages, resources, and infrastructure, are shared across the microservices. 

In this scenario, the entire application can be managed in one project. Each of these microservices can be owned by different teams, however, as they all work on the same project.

For more information, go to [What is a project?](https://developer.harness.io/docs/platform/organizations-and-projects/projects-and-organizations/#what-is-a-project).


### Organizations overview

An organization allows users to group several projects that share the same objective. For example, different business units, divisions, etc. 

Within an organization, users can create several projects using resources that are scoped at the organization level. This scoping allows child projects to leverage the resources provided at their parent organization level.

Users can invite people to an organization to gain membership and start leveraging resources based on specific roles and permissions. These roles and permissions are covered in the RBAC section later in this topic.

For more information, go to [What is an organization?](https://developer.harness.io/docs/platform/organizations-and-projects/projects-and-organizations/#what-is-an-organization).

### Account overview

Account level resources are available globally for all projects and organizations to access and leverage in their respective scopes.

For more information, go to [View account info and subscribe to downtime alerts](https://developer.harness.io/docs/platform/get-started/view-account-info-and-subscribe-to-alerts/).

## Configure the Harness connectors your teams needs to get started

Once you have set up the delegate, project, organization, account structure, you can now begin to integrate into the Harness platform. 

Harness connectors are access points used by Harness to connect to a specific tool to perform an action on the user’s behalf.

Please see our connectors documentation to add connectors for your integrations:

- [Kubernetes connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector).
- [Full list of connectors](https://developer.harness.io/docs/category/connectors).

## Configure RBAC

Once you have configured your project, organization, and account structure, you can begin configuring the RBAC model. 

You can model how developers and teams access the delegate and connectors you have created in the above steps. 

By default, Harness provides some default roles to get you started. As you operationalize Harness, you can customize these roles and make them more granular.

For more information, go to [Manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).

## Onboard and invite your team members

You have finally spun up your first delegate, configured your account, and added a few connectors. You can now onboard your existing teammates and get them building their pipelines within a project. 

To help you onboard users and user groups from your tool of choice, Harness supports provisioning with SCIM, and SSO with LDAP, SAML, and OAuth.

For more information, go to [Manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).

## Next Steps

By now, you should have done a basic walkthrough of Harness, including setting up a delegate, a few connectors, a project, and an organization. Getting started on software delivery is now at your fingertips!

To experience the full power of Harness Continuous Delivery, we recommend the following next steps:

1. [Build your first pipeline](/docs/category/deploy-services-on-different-platforms).
   1. Harness suggests you build your first pipeline in a project and get it deploying successfully before expanding into other areas of the product. 
   2. Add various steps and integrations to model the pipeline to your specifications and deployment needs.
   3. Harness supports various deployment types, so feel free to explore the ones that match your business needs.
2. [Template your pipelines and configurations](/docs/platform/templates/template/).
   1. After building your first pipeline, we recommend templating and building generic delivery components for other projects and organizations to leverage. 
3. [Add your services](/docs/continuous-delivery/x-platform-cd-features/services/create-services). 
4. [Add your environments](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments). 
5. Automate your onboarding of teams:
   1. After the initial team is onboarded, Harness recommends automating onboarding for the next set of teams.
   2. Using the Harness [Terraform Provider](https://developer.harness.io/tutorials/platform/onboard-terraform-provider/), you can automate your onboarding of projects, orgs, connectors, services, pipelines, etc. 
   3. Using Harness [Git Experience](/docs/platform/git-experience/git-experience-overview), you can manage and clone pipelines and templates in Git and share across projects. 
6.  Automate your pipeline deployments and experiment with steps and conditions.
    1.  Harness offers triggers and APIs to automate the execution of pipelines. Harness recommends you automate the pipeline execution once the pipeline design and structure is relatively mature and not going to change. For more information on triggers and APIs, go to:
        1.  [Git event based triggers](/docs/platform/triggers/triggering-pipelines).  
        2.  [General triggers information](/docs/category/triggers).  
        3.  [API](https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetList). 
    2.  You can customize you pipelines further by adding steps such as approvals, policy checks, Jira change management, etc. For more information, go to:
        1.  [Jira Approval step](/docs/platform/approvals/adding-jira-approval-stages). 
        2.  [Verify step](/docs/continuous-delivery/verify/cv-getstarted/configure-first-cv) (integrating logging and application monitoring tools). 
7.  Configure deployment dashboards.
    1.  Harness provides out of the box dashboards for development teams to track their deployed services. For more information, go to [Monitor deployments and services in CD dashboards](/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments). 
    2.  You can also customize the dashboards and build your own via our [custom dashboards](/docs/platform/dashboards/create-dashboards). 

If there are questions at any time, please reach out to our [Support team](mailto:support@harness.io), the [Adoption team](mailto:customeradoption@harness.io), or the Harness account manager that is working with you. 