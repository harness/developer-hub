---
title: Key concepts
description: Before you begin using Harness modules, you should be familiar with the the key concepts. Account. A Harness account is the top-level entity under which everything is organized. Within an account you…
# sidebar_position: 2
helpdocs_topic_id: hv2758ro4e
helpdocs_category_id: kx4hs8bn38
helpdocs_is_private: false
helpdocs_is_published: true
---

Before you begin using Harness modules, you should be familiar with the the key concepts.

### Account

A Harness account is the top-level entity under which everything is organized.

Within an account you have organizations, and within organizations you have projects. You can add resources at the account level, and also at the organization and project levels.

All organizations and projects in the account can use the account's resources.

All projects in the organization can use the org's resources.

**Why is this great?** Each team can manage its resources within its project and not have to bother account admins every time they want to add a Connector or a secret. Projects make teams independent. This is part of Harness' democratization goals for developers.See a visual example![](./static/learn-harness-key-concepts-04.png)

### Organizations and Projects

Harness Organizations (Orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division.

Within each Org you can add several Harness Projects.

See a visual example![](./static/learn-harness-key-concepts-05.png)

A Harness Project contains Harness Pipelines, users, and resources that share the same goal. For example, a Project could represent a business unit, division, or simply a development project for an app.

See a visual example![](./static/learn-harness-key-concepts-06.png)

Think of Projects as a common space for managing teams working on similar technologies. A space where the team can work independently and not need to bother account admins or even org admins when new entities like Connectors, Delegates, or secrets are needed.

Much like account-level roles, project members can be assigned Project Admin, Member, and Viewer roles.

See a visual example![](./static/learn-harness-key-concepts-07.png)

Project users have at least view access to all configuration and runtime data of a Project and share the same assets (Environments, Services, Infrastructure, etc).

See [Projects and Organizations](https://docs.harness.io/article/7fibxie636-projects-and-organizations).

### Product Modules

Your project can add Harness products as modules, such as Continuous Integration or Continuous Delivery.

See a visual example![](./static/learn-harness-key-concepts-08.png)

### Pipelines

Typically, a Pipeline is an end-to-end process that delivers a new version of your software. But a Pipeline can be much more: a Pipeline can be a cyclical process that includes integration, delivery, operations, testing, deployment, real-time changes, and monitoring.

See a visual example![](./static/learn-harness-key-concepts-09.png)

For example, a Pipeline can use the CI module to build, test, and push code, and then a CD module to deploy the artifact to your production infrastructure.

### Pipeline Studio

You build Pipelines in Pipeline Studio.

You can create Pipelines visually or using code, and switch back and forth as needed.

See a visual example

|  |  |
| --- | --- |
| **Visual** | **YAML** |
|  |  |

See [Harness YAML Quickstart](https://docs.harness.io/article/1eishcolt3-harness-yaml-quickstart).

Pipeline Studio guides you in setting up and running your Pipelines with ready-to-use steps.

See a visual example![](./static/learn-harness-key-concepts-10.png)

### Stages

A Stage is a subset of a Pipeline that contains the logic to perform one major segment of the Pipeline process. Stages are based on the different milestones of your Pipeline, such as building, approving, and delivering.

See a visual example![](./static/learn-harness-key-concepts-11.png)

Some stages, like a Deploy stage, use strategies that automatically add the necessary steps.

See a visual example![](./static/learn-harness-key-concepts-12.png)

See [Add a Stage](https://docs.harness.io/article/2chyf1acil-add-a-stage).

### Steps and Step Groups

A step is an individual operation in a stage.

Steps can be run in sequential and parallel order.

A Step Group is a collection of steps that share the same logic such as the same rollback strategy.

See a visual example![](./static/learn-harness-key-concepts-13.png)See [Run Steps in a Step Group](https://docs.harness.io/article/ihnuhrtxe3-run-steps-in-parallel-using-a-step-group).

### Services

A Service represents your microservices and other workloads logically.

A Service is a logical entity to be deployed, monitored, or changed independently.

See a visual example![](./static/learn-harness-key-concepts-14.png)

#### Service Instance

Service Instances represent the dynamic instantiation of a service you deploy via Harness.

For example, for a service representing a Docker image, Service Instances are the number of pods running with the Docker image.

See a visual example![](./static/learn-harness-key-concepts-15.png)

#### Service Definitions

When a Service is added to the stage in a Pipeline, you define its Service Definition. Service Definitions represent the real artifacts, manifests, and variables of a Service. They are the actual files and variable values.

You can also propagate and override a Service in subsequent stages by selecting its name in that stage's Service settings.

See a visual example![](./static/learn-harness-key-concepts-16.png)

See [Monitor Deployments and Services in CD Dashboards](https://docs.harness.io/article/phiv0zaoex-monitor-cd-deployments).

### Environments

Environments represent your deployment targets logically (QA, Prod, etc). You can add the same Environment to as many Stages as you need.

#### Infrastructure Definition

Infrastructure Definitions represent an Environment's infrastructure physically. They are the actual clusters, hosts, etc.

### Connectors

Connectors contain the information necessary to integrate and work with 3rd party tools.

Harness uses Connectors at Pipeline runtime to authenticate and perform operations with a 3rd party tool.

For example, a GitHub Connector authenticates with a GitHub account and repo and fetches files as part of a build or deploy Stage in a Pipeline.

See [Connectors How-tos](https://docs.harness.io/category/o1zhrfo8n5).

### Secrets Management

Harness includes built-in Secrets Management to store your encrypted secrets, such as access keys, and use them in your Harness account. Harness integrates with all popular Secrets Managers.

See a visual example![](./static/learn-harness-key-concepts-17.png)

See [Harness Secrets Management Overview](https://docs.harness.io/article/hngrlb7rd6-harness-secret-manager-overview).

### YAML and Git

You can sync your Harness account, orgs, and projects with your Git repo to manage Harness entirely from Git.

Harness can respond to Git events to trigger Pipelines and pass in event data.

See [Harness Git Experience Overview](https://docs.harness.io/article/utikdyxgfz-harness-git-experience-overview).

### Recap

What you've seen is how Harness integrates with your resources and tools, and how you can build Pipelines.

Harness helps you to model any kind of software development and delivery process in minutes.

It allows for flexibility while making best practices easy to follow and poor practices difficult to implement.

Most importantly, it takes away the pain points of software development, delivery, verification, etc, and gives you confidence in their management and success.

**What's next?** [Sign up for Harness](https://app.harness.io/auth/#/signup/) and then try a [quickstart](quickstarts.md).

