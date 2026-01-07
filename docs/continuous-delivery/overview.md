---
title: Overview
description: Learn about Continuous Delivery, its benefits, and what Harness CD offers
sidebar_position: 1
helpdocs_topic_id: cqgeblt4uh
helpdocs_category_id: dxej4ug0n5
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/continuous-delivery/cd-onboarding/key-concepts
  - /docs/continuous-delivery/get-started/key-concepts
  - /docs/continuous-delivery/getting-started/key-concepts
  - /docs/continuous-delivery/get-started/cd-pipeline-basics
  - /docs/continuous-delivery/cd-onboarding/services-and-environments-overview
  - /docs/continuous-delivery/onboard-cd/cd-concepts/cd-pipeline-basics
  - /docs/continuous-delivery/get-started/services-and-environments-overview
---

This page provides an overview of Continuous Delivery, its importance in modern software development, and the key concepts you need to know when working with Harness Continuous Delivery.

## What is Continuous Delivery?

Continuous Delivery (CD) is a software development practice where code changes are automatically prepared for release to production. It extends Continuous Integration by deploying all code changes to a testing or staging environment after the build stage. When properly implemented, teams can deploy applications at any time with confidence.

At its core, CD automates the entire deployment process, enabling teams to release applications quickly, securely, and reliably. This automation spans from testing your code to pushing it through various environments, orchestrating complex multi-service deployments, and providing the safety net of quick rollbacks if something goes wrong. Throughout this process, you get complete visibility into deployment metrics and performance, allowing you to continuously improve your delivery pipeline.

## Why is Continuous Delivery needed?

Modern software development demands speed, reliability, and quality—often all at the same time. Continuous Delivery addresses these challenges by fundamentally changing how we think about releasing software.

The most immediate benefit is **speed to market**. Instead of waiting weeks or months for deployment windows, teams can deploy multiple times per day, responding to market demands and user feedback while opportunities are still fresh. This acceleration comes with **reduced risk** through a counterintuitive approach: deploying more frequently, but in smaller increments. When changes are small, they're easier to troubleshoot. Automated testing catches issues before production, and quick rollback capabilities minimize impact when problems do slip through.

**Quality improvements** compound over time through consistent, repeatable processes. Every change goes through the same automated validation, creating continuous feedback loops that help teams learn and improve. Automation also eliminates human error—no more missed steps during late-night deployments. Beyond the technical benefits, CD **transforms team collaboration** by breaking down silos between development and operations, creating shared responsibility and clear visibility into the deployment pipeline.

Finally, the **cost efficiency** often surprises organizations. While there's an upfront investment in automation, returns come quickly through reduced manual effort, fewer production incidents, and optimized resource utilization.

## What Harness CD offers

Harness CD is a cloud-native software delivery platform designed to simplify and accelerate continuous delivery for modern applications. Whether you're deploying microservices to Kubernetes, serverless functions to the cloud, or traditional applications to VMs, Harness provides a unified platform that handles the complexity for you.

The platform's **intelligent deployment automation** stands out with its versatility. You can deploy to virtually any platform—Kubernetes, serverless environments, VMs, or cloud services—using pre-built integrations that just work. Harness supports multiple deployment strategies including rolling updates, canary deployments, blue-green deployments, and even custom strategies you define yourself. With reusable deployment templates, teams can standardize their processes while still maintaining flexibility where needed.

What really sets Harness apart is its **built-in verification and governance**. The Continuous Verification (CV) feature uses machine learning to analyze data from your APM and logging tools, automatically detecting anomalies in your deployments. When something looks wrong, Harness can intelligently roll back your deployment before users are impacted. Beyond verification, you get OPA-based policy enforcement for governance and compliance, plus integrated approval workflows that work seamlessly with tools like Jira and ServiceNow.

For teams embracing **GitOps**, Harness provides first-class support with declarative deployments that treat Git as the single source of truth. ApplicationSets let you deploy to multiple clusters and environments simultaneously, while drift detection helps you identify and remediate when your actual state diverges from what's defined in Git. Pull request pipelines even let you preview and validate changes before they're merged.

The **enterprise-grade features** ensure Harness scales with your organization. Fine-grained RBAC and SSO integration give you control over who can do what. Secrets management integrates with popular tools like HashiCorp Vault, AWS Secrets Manager, and Azure Key Vault. Complete audit trails provide visibility into all changes and deployments, and multi-tenancy support lets you organize everything across accounts, organizations, and projects.


Finally, the **observability and insights** capabilities help you understand and improve your deployments over time. Real-time deployment dashboards give you instant visibility, while DORA metrics help you track key performance indicators like deployment frequency, lead time, and failure rates. You can build custom dashboards for your specific needs and integrate notifications with Slack, MS Teams, email, and other tools your team already uses.

All of this works seamlessly with major cloud providers, artifact repositories, monitoring tools, and deployment platforms, providing a truly unified platform for all your deployment needs.

## Key concepts

Now that you understand what Continuous Delivery is and what Harness offers, let's explore the core concepts that form the foundation of the Harness CD platform. These concepts define the building blocks you'll use to create and manage your deployment pipelines.

The following table shows how Harness CD concepts align with generic continuous delivery workflow components:

| Generic CD workflow concept | Harness CD concept |
| ---- | ---- |
| What you deploy | Service and Service Definition  |
| Where you deploy it | Environment and Infrastructure Definition |
| How you deploy it | Steps and Failure Strategy  |
| When you deploy it | Triggers  |
| Who approves the deployment | Approval Steps and Stages |

For general Harness concepts, go to [Harness Platform key concepts](/docs/platform/get-started/key-concepts.md).

Let's dive into each of these concepts in detail.

### Deployments

Deployments make developed artifacts available for use in test or production. They release applications for access by users or systems, and can be manual or automated. In Harness pipelines, deployments are modeled using services, environments, and execution steps.

For more information, go to [Deployment concepts and strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts) and [Deploy services on different platforms](/docs/category/deploy-services-on-different-platforms).

:::tip Best Practice

Each deployment stage should only have one deployment step. Deploying more than once per stage could cause unexpected behavior.

:::

### Service

A Harness Service is a logical construct that represents your microservices and other workloads. Each Service can be deployed, monitored, or changed independently.

Services represent what you're deploying. They contain a **Service Definition** that defines your deployment artifacts, manifests or specifications, configuration files, and service-specific variables. You can create services at an account, organization, or project level, and reuse them across multiple pipelines.

:::note Prerequisites
Before you start deploying with Harness CD, ensure you have your **artifacts ready and available** in a container registry (Docker Hub, ECR, GCR, etc.) or artifact repository (Artifactory, Nexus, S3, etc.). Harness CD focuses on deployment—it pulls pre-built artifacts and deploys them to your infrastructure. If you need to build artifacts, consider using [Harness CI](/docs/continuous-integration) or integrate with your existing CI tool.
:::

When a Service is added to a stage in a Pipeline, you define its Service Definition. Service Definitions represent the real artifacts, manifests, and variables of a Service. They are the actual files and variable values. You can also propagate and override a Service in subsequent stages by selecting its name in that stage's Service settings.

**Key features of services:**
- Create services inside or outside pipelines
- Clone services across different scopes (project, organization, account)
- Store services inline in Harness or remotely in Git repositories
- Use runtime inputs and expressions for dynamic configuration
- Apply RBAC to control who can deploy specific services

:::tip Best Practice

Define one Harness Service for every micro service that you want to deploy. We do not recommend overloading one Harness Service for multiple deployments.

:::

For detailed information about services, go to [Services overview](./x-platform-cd-features/services/services-overview.md).

For examples, go to:

* [Kubernetes Services](./deploy-srv-diff-platforms/kubernetes/kubernetes-services.md)
* [Propagate and Override CD Services](./x-platform-cd-features/services/propagate-and-override-cd-services.md)

#### Service Instance

A logical Service when deployed onto the infrastructure of choice comes into existence in the form of service instances. For example, a Kubernetes service when deployed with a replica count of 3 leads to creation of 3 service instances. Hence, the **Service Instance** term in Harness represents the number of instances of a service running at any given moment (pods in case of Kubernetes, hosts in case of SSH-based deployments, etc).

Harness periodically tracks the count of running Service Instances every 10 minutes and stores it in the Harness database.

Harness uses a Service-based license model to charge Harness customers using its Continuous Delivery module.

For more information, go to [Service-based Licensing and Usage for CD](./cd-onboarding/service-licensing-for-cd.md).

### Environment

Environments represent your deployment targets logically (QA, Prod, etc). They define where you're deploying your applications. You can add the same Environment to as many Stages as you need.

Each environment contains one or more **Infrastructure Definitions** that list your target clusters, hosts, namespaces, and other infrastructure details. You can create environments at an account, organization, or project level, and configure them with environment-specific settings.

**Key features of environments:**
- **Configuration**: Set default variables, manifests, specifications, and config files for the environment
- **Service Overrides**: Override specific service settings when deploying to this environment
- **Infrastructure Definitions**: Define the actual physical infrastructure (clusters, hosts, namespaces)
- **GitOps Clusters**: Integrate GitOps clusters as deployment targets
- **Environment Groups**: Group multiple environments for easier RBAC management

#### Infrastructure Definition

Infrastructure Definitions represent an Environment's infrastructure physically. They are the actual target clusters, hosts, etc. An environment can have multiple infrastructure definitions, allowing you to deploy the same service to different infrastructure targets within the same environment.

You can also attach tags to infrastructure definitions to categorize them and use these tags in expressions throughout your pipeline for conditional logic.

For detailed information about environments, go to [Environments overview](./x-platform-cd-features/environments/environment-overview.md).

For an example, go to [Kubernetes Infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure.md).

### Pipeline

A CD Pipeline is a series of Stages where each Stage deploys a Service to an Environment. It can perform many additional CD operations, including, but not limited to:

* Propagating Services and their definitions across Stages.
* Approvals using integrations like Jira and ServiceNow.
* Synchronizing stage deployments using barriers.
* Notifications.
* and many other operations.

#### Stage

A CD Stage is a subset of a Pipeline that contains the logic to perform one major segment of the deployment process. Stages are based on the different milestones of your release process, such as dev, qa, and prod releases, and approvals.

See the following:

* [Add a Stage](/docs/platform/pipelines/add-a-stage.md)
* [Add a Stage Template Quickstart](/docs/platform/templates/add-a-stage-template.md)
* [Stage and Step Conditional Execution Settings](/docs/platform/pipelines/step-skip-condition-settings.md)

#### Step

Steps perform the CD operations like applying a manifest, asking for approval, rollback, and so on. Harness automatically adds the steps you need for the deployment strategy you select. You can then add additional steps to perform many other operations. You can run steps in parallel and apply execution conditions and failure strategies to them individually or as step groups.

For examples, go to:

* [Create a Kubernetes Rolling Deployment](./deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment.md)
* [Create a Kubernetes Canary Deployment](./deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment.md)
* [Create a Kubernetes Blue Green Deployment](./deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment.md)
* [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step)
* [HTTP step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step)

### Connectors

Connectors contain the information necessary to integrate and work with 3rd party tools such as Git providers, artifact repos, and target infrastructure.

Harness uses Connectors at Pipeline runtime to authenticate and perform operations with a 3rd party tool.

These connections are always done through a [Harness Delegate](#delegates) for deployment operations.

For example, a GitHub Connector authenticates with a GitHub account and repo and fetches files as part of a deploy Stage.

For example, go to:

* [Add a Kubernetes Cluster Connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector)
* [Docker Connector Settings Reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference)
* [Git Connector Settings Reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

#### Permissions

The third-party credentials used in Harness connectors require different permissions depending on your deployment type (Kubernetes, ECS, Serverless, etc) and the tasks your pipelines will perform in those platforms.

For example, if your Pipeline deploys a Docker image to a Kubernetes cluster, you will need a Connector that can pull the images and any related manifests from their repositories. Also, you will need another Connector that can push the image to the target cluster and create any objects you need (Secrets, Deployments, etc).

#### Secrets

Harness offers built-in secret management for encrypted storage of sensitive information. Secrets are decrypted when needed, and only the private network-connected Harness Delegate has access to the key management system. You can also integrate your own secret management solution. To learn more about secrets in Harness, go to [Secrets Management](/docs/platform/secrets/secrets-management/harness-secret-manager-overview).

:::tip Best Practice
Do not store secrets in plain text, objects, or any other Harness construct other than a secret or secret manager. Doing so could leave you vulnerable to security risks. 
:::

### Delegates

The Harness Delegate is a software service you install in your environment that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, etc.

For deployment operations, a Harness Delegate will always be used.

For more information about Delegates, go to:

* [Delegate overview](/docs/platform/delegates/delegate-concepts/delegate-overview)
* [Install a delegate](/docs/platform/delegates/install-delegates/overview)
* [Delegate types](/docs/platform/delegates/delegate-concepts/delegate-overview/#delegate-types)

#### Credentials and permissions

The Delegate uses the credentials set up in the Connectors used by the Pipeline to perform deployment tasks.

The Delegate also needs permissions in the target environment to execute deployment tasks. These permissions are granted in the Delegate config file or the environment account you use when installing the Delegate.

### Variables

Pipeline and Stage variables are custom variables you can add and reference in your Pipeline and Stage. They're available across the Pipeline. You can propagate and override their values in later stages.

For more information, go to [Built-in Harness Variables Reference](../platform/variables-and-expressions/harness-variables.md).

### Triggers

You can run your Pipelines manually or use triggers to initiate their execution.

You can trigger a Pipeline based on Git events, manifest changes, schedules, new artifacts, etc.

For examples, go to:

* [Trigger Pipelines on a New Artifact](../platform/triggers/trigger-on-a-new-artifact.md)
* [Trigger Pipelines on New Helm Chart](../platform/triggers/trigger-pipelines-on-new-helm-chart.md)
* [Trigger Pipelines using Git Events](../platform/triggers/triggering-pipelines.md)

### Advanced settings

Pipelines, Stages, and steps have advanced settings to control the flow of operations.

#### Input sets and overlays

Harness input sets are collections of runtime inputs for a pipeline provided before execution.

Overlays are groups of input sets. Overlays enable you to provide several input sets when executing a pipeline.

With input sets and overlays, you can make a single pipeline template that can be used for multiple scenarios. Each scenario can be defined in an input set or overlay and simply selected at runtime.

For more information, go to [Input sets and overlays](../platform/pipelines/input-sets.md).

#### Conditional executions

You can set conditions on when you run Stages and steps. For example, `Execute This Stage Only if Prior Pipeline or Stage Failed`.

The stage Conditional Execution applies to all steps that do not have their own Conditional Execution. A step's Conditional Execution overrides its stage's Conditional Execution.

For more information, go to [Define conditional executions for stages and steps](/docs/platform/pipelines/step-skip-condition-settings).

#### Failure strategies

A failure strategy defines how your Stages and steps handle different failure conditions.

The failure strategy contains error conditions that must occur for the strategy to apply, and actions to take when the conditions occur.

Failure strategies are a critical pipeline design component that determine what fails a step or stage and what to do when the failure occurs.

For more information, go to [Step and Stage Failure Strategy References](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps.md).

### GitOps

GitOps is an approach to managing and automating deployment and management of infrastructure and applications using Git. The desired state of the apps and infrastructure is stored in a Git repo as code. Harness automation tools monitor the Git repo for changes and synchronize the actual state with the desired state.

For more information, go to [Harness GitOps basics](/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics).

#### Why are Deployments and GitOps different

In GitOps, changes are managed via Git files and Agents, without requiring pipelines. Deployments refer to executed pipelines in Harness.

This difference is why you see **Deployments** and **GitOps** separated in the Harness UI.

For a detailed comparison of these two approaches, including workflow differences and when to use each model, go to [GitOps vs CD Services](/docs/continuous-delivery/gitops/gitops-entities/service/gitops-vs-cd-service).

## Next steps

Now that you understand the basics of Continuous Delivery and Harness CD concepts, you can:

- **Get started**: [CD and GitOps tutorials](/docs/continuous-delivery/get-started/tutorials/cd-gitops-tutorials)
- **Learn more**: [CD onboarding guide](/docs/category/learning-path)
- **Explore integrations**: [Supported integrations](/docs/continuous-delivery/cd-integrations)
- **Get certified**: [CD certification guide](/docs/continuous-delivery/cd-onboarding/onboarding-guide)

## FAQs

- [CD and GitOps FAQs](/docs/continuous-delivery/kb-articles/faqs)

