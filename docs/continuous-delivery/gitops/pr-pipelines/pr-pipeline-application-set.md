---
title: ApplicationSets and PR Pipeline
description: Learn about creating appplications via ApplicationSet through Harness GitOps PR Pipeline
sidebar_position: 1
---

## Understanding Application Set in GitOps

ApplicationSet is an Argo CD feature that automates the creation and management of multiple applications from a single configuration. It enables dynamic application creation based on template-driven definitions. In our case, the ApplicationSet will detect the new environment configuration in the repo and automatically instantiate a new application with the desired configuration.

This approach ensures consistency, reduces manual effort, and enables streamlined deployments across environments using a GitOps-driven workflow.

Learn more about [Application Set](https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/appset-basics).

We have multiple ways of creating Application Set in GitOps:-

- Git Generator
- List Generator
- Cluster Generator
- Matrix Generator
- Merge generator
- SCM Provider generator
- Pull Request generator
- Cluster Decision Resource generator
- Plugin Generator

Learn more about each [Generator Type](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators/). We are going to discuss creating Application Set by using Git Generator.

---


## Git Generator

At its core, ArgoCD's Git generator allows for dynamic creation of ArgoCD Application resources from templates using parameters sourced from a Git repository. This functionality enables applications to be defined once in a template and instantiated multiple times with different configurations. The Git generator ensures version control and traceability by pulling environment or application-specific configurations directly from a Git repository.

While the Git generator supports various methods, one of its standout features is the file-oriented approach, specifically using `config.json` files.

#### Benefits of using a Git Generator

- **Arbitrary Key Updates**: With the file version of the Git generator, users can define key-value pairs in `config.json` that directly overrides or supplements values in the target application's configuration. This provides unparalleled flexibility in updating configurations on-the-fly without altering the core template.
- **Decoupling Configuration from Template**: By using a separate `config.json` for overrides, the core application template remains untouched. This separation ensures that base configurations are consistent, reducing errors and ensuring that changes are traceable to specific configuration files.
- **Version Control and Auditability**: Since configurations are stored in Git, every change to `config.json` is versioned. This provides a clear audit trail, making it easy to track when a configuration change was made and by whom.
- **Dynamic Application Generation**: The Git generator, especially with `config.json` files, allows for the dynamic creation of applications based on varying configurations. For instance, one could have a base template for a microservice but instantiate it differently for development, staging, and production environments using different `config.json` files.
- **Centralized Management**: Storing all `config.json` files in a single Git repository or organized structure ensures centralized management. Teams can collaboratively update configurations, propose changes through pull requests, and review configurations collectively.

---

## PR Pipeline Workflow

To help you get started with creating applications using ApplicationSet through PR pipelines in Harness, we’ve provided a working [sample](https://github.com/harness-community/Gitops-Samples/tree/main/Application-Set).

### Scenario

We have multiple environments, and we want to deploy an application with a unique configuration for each new environment. Using a PR pipeline, we will:

- **Create a new configuration file** for the target environment using **Update Release Repo**, specifying any necessary application-specific changes.
- **Approve the changes** using **Harness Approval Step**.
- **Merge the PR** using **Merge PR step** to merge this configuration into the repository.
- **Approve the deployment** of AppSet.
- **Sync the ApplicationSet** using **GitOpsSync step**, which detects the new configuration and dynamically generates a new Harness GitOps application for the environment.
- **Fetch the Linked Application** using **Fetch Linked Apps step** to check the new application created.

---

## Conclusion

Using ApplicationSets with Harness GitOps PR Pipelines enables a powerful and scalable way to manage multi-environment deployments. By leveraging Argo CD’s Git generator and Harness pipeline steps, you can dynamically provision new environments, reduce manual overhead, and ensure consistency across deployments.

This approach aligns perfectly with GitOps best practices—treating configuration as code, enabling version control, and streamlining collaboration through PRs. Whether you're scaling microservices or managing multiple tenant environments, ApplicationSets provide the flexibility and control you need.

Feel free to experiment with the sample, adapt it to your use case, and contribute improvements. Happy GitOps-ing! 🚀