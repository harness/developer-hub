---
title: Git Experience vs Configuration as Code FAQs
description: Learn about Git Experience in NextGen and Config as code in FirstGen.

---

## What is Git Experience in NextGen?

- With the Git Experience, you can store configurations for resources, like pipelines and templates, in one of the following: 
  - Git repository
  - Harness database

- You can edit any configuration saved in Git using the Harness UI.
- You can store the following configurations in Git using the Git Experience in NextGen: 
    - Pipelines
    - Templates
    - Input Sets

In the Git Experience, Git acts as the primary source of truth. As a result, Harness does not keep a record of any resources other than the pipeline name, identifier, and configuration required to retrieve the pipeline from Git. Moreover, Harness does not perform reconciliation or cross-synchronization of resources. Instead, it leverages the native capabilities of Git, such as branching, managing files in different repositories, and prioritizing the state of the file in Git above all other sources.

For more information, go to [Git Experience](https://developer.harness.io/docs/category/git-experience).


## What is Configuration as Code in FirstGen?

You can use Configuration as Code to configure pipelines, triggers, workflows, environments, and services and perform nearly all the same actions in YAML as in the Harness UI. With Configuration as Code, you can add and manage all configurations in Git. Harness stores your Git configuration in its database and automatically updates its local copy with any Git changes. Additionally, it receives updates from the UI and updates the database record, then synchronizes the changes with Git. 


:::note
You cannot choose a non-default branch to test changes for any entity. Also, configurations can only be managed in a central Git repository.
:::

For More details on the Harness First Gen Configuration as Code, go to [Configuration as Code](https://developer.harness.io/docs/category/configuration-as-code).

:::important
Configuration as Code is not the same as Git Experience.
:::


## Does the Configuration as Code support matrix include entities supported by Git Experience?

Here is the comparison matrix for Harness FirstGen Continuous Deployment vs Harness NextGen Continuous Deployment:

| **Feature**                    | **Configuration as Code** | **Git Experience** |
|--------------------------------|---------------------------|--------------------|
| **Service**                    | Yes                       | No                 |
| **Service Definition**         | Yes                       | No                 |
| **Environment**                | Yes                       | No                 |
| **Infrastructure Definition**  | Yes                       | No                 |
| **Trigger**                    | Yes                       | No                 |
| **Pipeline**                   | Yes                       | Yes                |
| **Input Set**                  | N/A                       | Yes                |
| **Workflow**                   | Yes                       | N/A                |
| **Templates**                  | Yes                       | Yes                |
| **Application**                | Yes                       | N/A                |
| **Infrastructure Provisioner** | Yes                       | N/A                |


## How does the Harness Git Experience compare to other products?

The nesting and relational constructs of Continuous Deployment entities make them difficult to manage as code. Correlations and changes between the interdependent entities are difficult to process and prone to user error. However, with Harness, you can manage your code and repositories as per your needs. 

| **Feature**                   | **Harness** | **Gitlab** | **Git Actions** | **Azure DevOps** | **Jenkins** | **Google Deploy** |
|-------------------------------|-------------|------------|--------------------|------------------|-------------|-------------------|
| **Service**                   | No          | No         | No                 | No               | No          | No                |
| **Environment**               | No          | No         | No                 | No               | No          | No                |
| **Infrastructure Definition** | No          | No         | No                 | No               | No          | No                |
| **Pipeline**                  | Yes         | Yes        | Yes                | Yes              | Yes         | Yes               |
| **Trigger**                   | No          | No         | No                 | No               | No          | No                |
| **Template**                  | Yes         | Yes        | No                 | No               | Yes         | No                |
| **Input Set**                 | Yes         | No         | No                 | No               | No          | No                |


## What is the difference between Git Experience and Config as Code?

In FirstGen, Harness retained a copy of all the changes in its database to read all configurations. This means the changes you made in the UI or Git would first apply to the database before showing up in their respective destinations (i.e. UI or Git). These frequent changes caused sync conflicts with the Harness database and Git. 

The Git Experience in NextGen is designed to have one source of truth which is Git. Harness only reads Git and pulls the latest or a specific branch. The Git Experience gives more flexibility in branching strategies and testing pipelines, templates, and input sets than the Configuration as Code experience in FirstGen.

## Why did Harness reduce the number of supported entities backed by Git?

There were Git sync issues with Configuration as Code while maintaining the correct and stable state of Harness entities like service, environment, infrastructure definitions, workflows, pipelines, and workflows. The Git state was overwritten by Harness' current state which was often not the correct state. Focusing on core platform entities like pipelines, templates, and input sets, the Git Experience provides multi-branch, multi-version support to manage your resources.

For more information, go to:

- [Pipelines](https://developer.harness.io/docs/platform/git-experience/manage-a-harness-pipeline-repo-using-git-experience/)
- [Input Set](https://developer.harness.io/docs/platform/Git-Experience/manage-input-sets-in-simplified-git-experience)
- [Templates](https://developer.harness.io/docs/platform/Templates/templates-best-practices#remote-template-versioning)

## Why doesn't the Git Experience support services, environments and infrastructure definitions?

Applications no longer manage services, environments, and infrastructure definitions in a single repository. The Git Experience gives you the flexibility to manage these resources in any repo and branch.

Frequent conflicts and sync errors in Configuration as Code made it difficult to scale. Terraform Provider solves this problem by allowing you to configure and manage resources via code.

In the Git Experience, pipelines, templates, and input sets are powerful constructs to manage.  However, modifications to services, environments, and infrastructure definitions after initial configuration are minimal. These entities are metadata and pointers to the service configuration. You can modify and audit changes to these entities through code using the Terraform Provider.

Entities like services, environments, and infrastructure definitions are highly interdependent. The Git Experience in NextGen supports entity storage in multiple branches and versions, which can result in breaking changes in the interdependent files. Such files are not automatically reconciled and do not have the latest working changes.


## Why does Harness support the storage of only a few entities in Git?

You can store the following configurations in Git using the Git Experience: 
- Pipelines
- Templates
- Input Sets

Implementing pipelines as code is an industry standard. The most recommended practice for Continuous Integration and Continuous Deployment is to manage the pipeline state in Git. 

Following are some benefits of implementing pipelines as code:

- Facilitates the sharing of pipeline configurations between different teams.
- Ability to manage configurations in Git and track changes using Git's commit and audit capabilities.
- Ability to test different versions of the pipeline before promoting to the main or stable version.

The above benefits apply to both Continuous Integration and Continuous Deployment. Harness extends these benefits to entities like templates and input sets because they are part of the pipeline. They would benefit from similar capabilities as pipeline as code.

In Harness, services and environments reside outside the pipeline. Managing them separately increases the risk of misconfiguration. Pipelines fail if changes are not resolved or propagated correctly from the core entity to the pipeline.

Following are some challenges of managing Continuous Deployment Constructs in Git:

* Services depend on the manifest configuration, variables, artifacts, and config files corresponding to the service. To manage and leverage them together, you need to use a nested structure in their Git repositories. When entities are moved or distributed between different repositories or locations, this would break. Services have their own life cycle outside the pipeline.

* Environments have similar constraints. They depend on their corresponding infrastructures. You need to use a specific folder structure for environment variables and service-specific overrides and group them in a single repository. Any modifications to such entities can result in breaking changes. Others who consume that environment as a target deployment location cannot use the configuration. Environments and infrastructures have their own cycles that reside outside the pipeline.


## What is an alternative to manage other entities in Git?

Harness recommends leveraging the Harness Terraform Provider or APIs to automate the management of your configurations like services, environments, and infrastructure definitions. Terraform is the industry standard for managing and updating configurations. You can manage your Harness resources as code via corresponding Terraform configuration files through the Terraform Provider. Modules that generate and update services may use a `tfvars` file to pass in the proper and configurable parameters. Harness orchestrates the process to make the change reliably without conflict using pipelines. While the Harness database remains the source of truth, you can vet and publish changes through automation.

You can automate YAML configurations in Git and pass them to API calls for CRUD operations. Using pipelines, you can integrate Harness APIs or build your own onboarding and automation applications (via a containerized application or serverless functions).

For more information on Harness Terraform Provider, go to: 

- [Terraform Provider Quickstart](https://developer.harness.io/docs/platform/terraform/harness-terraform-provider-overview/)
- [Terraform Provider Automated Onboarding Guide](https://developer.harness.io/docs/platform/Terraform/automate-harness-onboarding)
- [Terraform Provider Scaling Automation Guide](https://developer.harness.io/docs/platform/Terraform/advanced-terraform-onboarding)
- [Terraform Registry for Harness Provider](https://registry.terraform.io/providers/harness/harness/latest/docs)


For more information on Harness APIs, go to:

- [Get started with Harness APIs](/docs/platform/Resource-Development/APIs/api-quickstart)
- [API Docs](https://apidocs.harness.io/)


## How can I use the Git Experience with Terraform?

Harness recommends using the Git Experience to manage pipelines, input sets, and templates. These are the core `Pipeline as Code` constructs Harness offers. You can update and track changes to these entities in Git and view them in the Harness UI. The state of the pipeline must have the proper contractual relationship between the template that it references and the input set when changes are made to one of these entities. Changes to the pipeline or template must be reflected in the input set and the location of other entities.

Harness recommends Terraform Provider for external resources managed separately from the pipeline. Using Terraform, you can manage and audit Harness Continuous Deployment configurations. Additionally, you can automate the definition of service, environment, and infrastructure life cycles via Harness pipelines.
 
For more information, go to [Terraform Provider Automated Onboarding Guide](https://developer.harness.io/docs/platform/Terraform/automate-harness-onboarding).
