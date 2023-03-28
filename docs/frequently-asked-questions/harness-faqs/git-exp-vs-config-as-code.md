---
title: Frequently Asked Git Experience and Configuration as Code Questions
description: Learn about Git experience in NextGen and Config as code in FirstGen.

---

## What is Git experience in NextGen?

- You can store the configurations for your resources like pipelines, templates etc. in one of the following: 
  - Git repository
  - Harness database

- You can use the Harness UI to edit configs and store them back in Git, even if the configurations are kept in Git.
- Using Git experience, you can store the following configurations in Git: 
    - Pipelines
    - Templates
    - Input Sets
    - Feature Flags

In the Git Experience, Git is the source of truth for the Git backed objects. This means Harness doesn't maintain any record of those objects besides the pipeline name, identifier, and Git backed configuration to fetch the pipeline from Git. We do not do any reconciliation or cross sync'ing of the resources.We honor native Git capabilities like branching, managing files in different repositories, and honoring the state of the file in Git over anything else.

For more information, go to [Git Experience](https://developer.harness.io/docs/category/git-experience).


## What is Configuration as Code in FirstGen?

Configuration As Code allows you to configure Pipelines, Triggers, Workflows, Environments, and Services in Harness using YAML. Nearly everything you can do in the Harness First Gen platform GUI, you can do in YAML as well.

All Harness Configurations can be added and managed in Git. Harness maintains a state of your git configuration in its database and reads the changes from Git to update its local copy. It also takes changes from the UI and updates the DB record and syncs down to your Git. You can't choose your branch, and you cannot test changes for any of the objects, and it can only be managed in a central git repository. 


For More details on the Harness First Gen Configuration as Code, go to [overview](https://developer.harness.io/docs/first-gen/firstgen-platform/config-as-code/configuration-as-code).


## Does the Configuration as Code support matrix include Git Experience entity?

For Harness First Gen Continuous Deployment vs Harness Next Gen Continuous Deployment here is the comparison matrix for the Git Experience:

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


### How does Harness Git Experience compare to other products?

If we review the current offering in the market, we see that due to the nesting and relational constructs of Continuous Deployment entities it makes it difficult to truly manage them as code. As a platform, we never want to enforce constructs on how users manage their repositories and code. To be able to process correlation and change between these interdependent objects is difficult and prone to user self caused breaking changes.

| **Feature**                   | **Harness** | **Gitlab** | **Git Actions** | **Azure DevOps** | **Jenkins** | **Google Deploy** |
|-------------------------------|-------------|------------|--------------------|------------------|-------------|-------------------|
| **Service**                   | No          | No         | No                 | No               | No          | No                |
| **Environment**               | No          | No         | No                 | No               | No          | No                |
| **Infrastructure Definition** | No          | No         | No                 | No               | No          | No                |
| **Pipeline**                  | Yes         | Yes        | Yes                | Yes              | Yes         | Yes               |
| **Trigger**                   | No          | No         | No                 | No               | No          | No                |
| **Template**                  | Yes         | Yes        | No                 | No               | Yes         | No                |
| **Input Set**                 | Yes         | No         | No                 | No               | No          | No                |


## Git Experience vs Config-as-Code FAQ

### What's the difference between Git Experience and Config as Code?

In First Gen, Harness retained a copy in its DB that was where Harness was reading all the configuration from. This meant user's would make changes in the UI or Git and they would all first go to the DB before showing up in their respective destinations (i.e. UI or Git). These frequent changes caused a lot of sync conflicts with Harness DB state and the user's Git. We designed the Git Experience so that it would have 1 source of truth which is Git. Harness will only read from Git and pull the latest or a specific branch. Harness gives more flexibility in branching strategies and testing Pipelines, Templates and Inputsets compared to the Harness First Gen Configuration as code experience.

### Why did Harness reduce the number of supported entities backed by Git?

In the Harness First Gen, we had lots of Git Sync issues while maintaining the state of the correct and stable state of Harness objects like Service, Environment, Infrastructure Definitions, Workflows and Pipelines. As a result, user's would see their Git State being overwritten by Harness' current state which may not be the correct state. We decided to focus on our core platform entities Pipeline, Templates and Inputsets to provide a solid multi branch, multi version experience for users to manage their resources.

**For more details please see the following docs:**

- [Pipelines](https://developer.harness.io/docs/platform/git-experience/manage-a-harness-pipeline-repo-using-git-experience/)
- [Input Set](https://developer.harness.io/docs/platform/Git-Experience/manage-input-sets-in-simplified-git-experience)
- [Templates](https://developer.harness.io/docs/platform/Templates/templates-best-practices#remote-template-versioning)

### Why are there no service, environments and infrastructure definitions backed by Git?

The Management of Service, Environments and Infrastructure definitions are no longer managed in one repo per application. Git Experience gives the flexibility to manage these resources in any repo and branch.

`Configuration as Code != Git Experience`

It's a fundamentally different mechanism. A majority of our base didn't get much value at out of the configuration as code experience, and couldn't operationalize it at scale due to the frequent sync errors and conflicts. What happened was the birth of the Terraform Provider which allowed users to configure and manage resources in code via  Terraform.

Pipelines, Templates and Input Sets are powerful constructs to manage in Git Experience but how often are users tweaking their services, environments and infrastructure definitions after initial configuration. It's minimal these objects (service, environment, and infrastructure) are just metadata and pointers to a real service configuration.

User's want their Services, Environments and Infrastructure Objects in Git but operationally not as a DB record, they want to actually make tweaks and audit those changes via code. The terraform provider does that in a more consistent fashion. User's can purely manage their service and environments as code.

Service, Environment, Infrastructure Definitions are Harness constructs that carry lots of dependencies on one another. The Git Experience doesn't restrict one to be in the location of the others, this results in the risk of breaking changes  to occur files that are dependent on others aren't automatically reconciled, and it doesnt  ensure the pipeline has the latest working changes (addition of variables, updating of pipeline, impacts to templates and inputsets being used with pipeline).


### What was the decision to only store Pipeline, Input Sets, and Templates are managed in Git?

Pipeline as code is an industry standard. Best practices for Continuous Integration and Continuous Deployment is to manage the pipeline state in Git.

The benefits are:

1. Makes sharing pipeline configurations easy between different teams
2. User's can manage these configuration in Git and use Git's user commit and auditing capabilities to track changes
3. Being able to test different versions of the pipeline out before promoting to main or stable version

The above benefits apply for both Continuous Integration and Continuous Deployment. We decided to extend these benfits to Harness constructs like Templates and Input Sets because they too are part of the pipeline and would benefit from similar pipeline as code capabilities.

Service and Environments are seperate objects that reside outside of the Pipeline in Harness. They are managed independently and that makes the misconfiguration risk even greater. If changes aren't properly resolved or propagated from core object to pipeline, it results in a failed pipeline. 

The challenges with core Continuous Deployment Constructs being managed in Git:

1. Services have dependencies on the manifest configuration, variables, artifacts and config files that all need associated with the service. To ensure that they can be managed together and be leveraged together, user's would need to adhere to a nested construct in their Git repo that would break if those objects were moved or distributed across different locations in a single repo or via multiple repos. Services have their own lifecycle that resides outside of the pipeline.

2. Environments would have the similar construct restraints, it has dependencies on the infrastructures that are associated with it, the environment variables and any service specific overrides would need to be enforced and grouped in a singular repo in a structured folder structure. Any moving or updating of this object can result in a breaking change. The configuration would no longer be usable by others who consume that environment as a target deployment location. Environments and Infrastructures have their own lifecylce that reside outside of the pipeline. 


### What is an alternative to manage these other objects in Git?

We recommend our user's leveraging the Harness Terraform Provider or our APIs to automate the management their Configuration in Harness like Services, Environments and Infrastructure Definitions. Terraform is an industry standard in how business manage and update their configuration as code. The Terraform Provider has been leveraged to manage these Harness resources as code via corresponding Terraform Configuration files. Users may have a module that just generates and updates services and they use a tfvars file to pass in the proper and configurable parameters. Using Harness pipelines, Harness can orchestrate the process to make the change reliably without any state conflict. Harness DB remains the source of truth for the UI while users can vet and publish changes via their automation.

For our APIs we have user's building their own custom automation that lets them manage our  Harness configuration YAML in Git and pass it to the API call for creation and updating the configuration. We have seen user's create Harness Pipelines that integrate with our APIs or even build their own onboarding and automation applications (via containerized application or a set of serverless functions) to update and manage Harness configuration.

Below are some key docs for our terraform provider:

- [Terraform Provider Quickstart](https://developer.harness.io/docs/platform/terraform/harness-terraform-provider-overview/)
- [Terraform Provider Automated Onboarding Guide](https://developer.harness.io/docs/platform/Terraform/automate-harness-onboarding)
- [Terraform Provider Scaling Automation Guide](https://developer.harness.io/docs/platform/Terraform/advanced-terraform-onboarding)
- [Terraform Registry for Harness Provider](https://registry.terraform.io/providers/harness/harness/latest/docs)


Below are some doc:

- [Harness API Quickstart](https://developer.harness.io/docs/platform/apis/api-quickstart/)
- [API Docs](https://apidocs.harness.io/)


### How can I use Git Experience with Terraform?

We recommend leveraging the Harness Git Experience to manage the Pipelines, Input Sets and Templates. These are the core "Pipeline as Code" constructs that we offer with our platform. They can be updated and audited in Git and user's can make changes to them. Harness will reflect the changes in its User Interface. Often changes to one of these objects requires changes to the others because the pipeline needs state needs to have the proper contract between the template that its referencing and inputset. If something is added to the pipeline or template it needs to be updated in the inputset and the other objects location.

For the external resources that are managed seperate of the Pipeline, we recommend using Harness Terraform Provider. Terraform can manage the state of Harness Continuous Deployment configurations and user's can audit the lifecycle of them. User's can also provide an automated process around via Harness Pipelines to manage the lifecyle of the Service, Environment and Infrastructure Definition. See [Terraform Provider Automated Onboarding Guide](https://developer.harness.io/docs/platform/Terraform/automate-harness-onboarding) for more details.
