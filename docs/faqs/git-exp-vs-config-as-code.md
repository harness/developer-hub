---
title: Git Experience FAQs
description: Learn about Git Experience.
sidebar_position: 8
---

## What is Git Experience?

- With the Git Experience, you can store configurations for resources, like pipelines and templates, in one of the following: 
  - Git repository
  - Harness database

- You can edit any configuration saved in Git using the Harness UI.
- You can store the following configurations in Git using the Git Experience: 
    - Pipelines
    - Templates
    - Input sets
    - Services
    - Environments
    - Infrastructure Definitions

In the Git Experience, Git acts as the primary source of truth. As a result, Harness does not keep a record of any resources other than the pipeline name, identifier, and configuration required to retrieve the pipeline from Git. Moreover, Harness does not perform reconciliation or cross-synchronization of resources. Instead, it leverages the native capabilities of Git, such as branching, managing files in different repositories, and prioritizing the state of the file in Git above all other sources.

For more information, go to [Git Experience](/docs/category/git-experience).


## How does the Harness Git Experience compare to other products?

The nesting and relational constructs of Continuous Deployment entities make them difficult to manage as code. Correlations and changes between the interdependent entities are difficult to process and prone to user error. However, with Harness, you can manage your code and repositories as per your needs. 

| **Feature**                   | **Harness** | **Gitlab** | **Git Actions** | **Azure DevOps** | **Jenkins** | **Google Deploy** |
|-------------------------------|-------------|------------|--------------------|------------------|-------------|-------------------|
| **Service**                   | Yes         | No         | No                 | No               | No          | No                |
| **Environment**               | Yes         | No         | No                 | No               | No          | No                |
| **Infrastructure Definition** | Yes         | No         | No                 | No               | No          | No                |
| **Pipeline**                  | Yes         | Yes        | Yes                | Yes              | Yes         | Yes               |
| **Trigger**                   | No          | No         | No                 | No               | No          | No                |
| **Template**                  | Yes         | Yes        | No                 | No               | Yes         | No                |
| **Input Set**                 | Yes         | No         | No                 | No               | No          | No                |


## Why did Harness reduce the number of supported entities backed by Git?

There were Git sync issues with Configuration as Code while maintaining the correct and stable state of Harness entities like service, environment, infrastructure definitions, workflows, pipelines, and workflows. The Git state was overwritten by Harness' current state which was often not the correct state. Focusing on core platform entities like pipelines, templates, and input sets, the Git Experience provides multi-branch, multi-version support to manage your resources.

For more information, go to:

- [Pipelines](/docs/platform/git-experience/manage-a-harness-pipeline-repo-using-git-experience/)
- [Input Set](/docs/platform/git-experience/manage-input-sets-in-simplified-git-experience)
- [Templates](/docs/platform/templates/templates-best-practices#remote-template-versioning)
- [Services](/docs/platform/git-experience/manage-services-using-git-experience.md)

## Why does Harness support the storage of only a few entities in Git?

You can store the following configurations in Git using the Git Experience: 
- Pipelines
- Templates
- Input sets
- Services
- Environment 
- Infrastructure Definitions

Implementing pipelines as code is an industry standard. The most recommended practice for Continuous Integration and Continuous Deployment is to manage the pipeline state in Git. 

Following are some benefits of implementing pipelines as code:

- Facilitates the sharing of pipeline configurations between different teams.
- Ability to manage configurations in Git and track changes using Git's commit and audit capabilities.
- Ability to test different versions of the pipeline before promoting to the main or stable version.

The above benefits apply to both Continuous Integration and Continuous Deployment. Harness extends these benefits to entities like templates and input sets because they are part of the pipeline. They would benefit from similar capabilities as pipeline as code.

## What is an alternative to managing other entities in Git?

Harness recommends leveraging the Harness Terraform Provider or APIs to automate the management of your configurations like services, environments, and infrastructure definitions. Terraform is the industry standard for managing and updating configurations. You can manage your Harness resources as code via corresponding Terraform configuration files through the Terraform Provider. Modules that generate and update services may use a `tfvars` file to pass in the proper and configurable parameters. Harness orchestrates the process to make the change reliably without conflict using pipelines. While the Harness database remains the source of truth, you can vet and publish changes through automation.

You can automate YAML configurations in Git and pass them to API calls for CRUD operations. Using pipelines, you can integrate Harness APIs or build your own onboarding and automation applications (via a containerized application or serverless functions).

For more information on Harness Terraform Provider, go to: 

- [Terraform Provider Quickstart](/docs/platform/automation/terraform/harness-terraform-provider-overview)
- [Terraform Provider Automated Onboarding Guide](/docs/platform/automation/terraform/automate-harness-onboarding)
- [Terraform Provider Scaling Automation Guide](/docs/platform/automation/terraform/advanced-terraform-onboarding)
- [Terraform Registry for Harness Provider](https://registry.terraform.io/providers/harness/harness/latest/docs)


For more information on Harness APIs, go to:

- [Get started with Harness APIs](/docs/platform/automation/api/api-quickstart)
- [API Docs](https://apidocs.harness.io/)


## How can I use the Git Experience with Terraform?

Harness recommends using the Git Experience to manage pipelines, input sets, and templates. These are the core `Pipeline as Code` constructs Harness offers. You can update and track changes to these entities in Git and view them in the Harness UI. The state of the pipeline must have the proper contractual relationship between the template that it references and the input set when changes are made to one of these entities. Changes to the pipeline or template must be reflected in the input set and the location of other entities.

Harness recommends Terraform Provider for external resources managed separately from the pipeline. Using Terraform, you can manage and audit Harness Continuous Deployment configurations. Additionally, you can automate the definition of service, environment, and infrastructure life cycles via Harness pipelines.
 
For more information, go to [Terraform Provider Automated Onboarding Guide](/docs/platform/automation/terraform/automate-harness-onboarding).
