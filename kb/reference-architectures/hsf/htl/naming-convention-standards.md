---
title: Naming Convention Standards
description: As new resources are created by various members of the team and sources, we need to ensure that we stick to a standard process to create and manage the resources. 
---
As new resources are created by various members of the team and sources, we need to ensure that we stick to a standard process to create and manage the resources. 

## Solutions Factory

### Factory Templates
New factory templates (also referred to as stack templates or stacks) are designed to act as standalone solutions to be delivered to a customer.

When adding new stacks to the Solutions Factory, consider the following:
- Choose a clear, concise name for the stack - e.g `harness-projects`, `maven-cicd-k8s`, `delegate-fleet-management`, etc
- Use lowercase characters and hyphens to separate words
- Use only common and well-known abbreviations
- Document full stack names in the stack README file

### Factory Modules
When a factory template (aka stack) requires a Terraform Module to be included, the expectation is that the module should be included within the stack directory.

When new inline Terraform Modules are included in a stack template, consider the following:
- Modules should live as children of the directory `modules` located in the root of the stack template directory
- Choose a clear, concise name for the module denoting its purpose - e.g. `code_repository`, `sto_scanner`, `container_registry`, etc
- Use lowercase characters and underscores to separate words
- Use only common and well-known abbreviations
- Include a full README for each module created
- Create a link in the stack README file to the module README file

### Harness Templates
New Harness Templates should adhere the following conventions:
- Prefix all Harness Templates with the correct type based on the chart below
- Use lowercase characters and underscores to separate words
- Use the file extension `.yaml` for all YAML files

| Prefix | Type | Stack Template Path |
| --- | --- | --- |
| art | Artifact Source | `<stack>/templates/artifacts/art_resource_name.yaml.tpl` |
| dpl | Deployment | `<stack>/templates/deployments/dpl_resource_name.yaml.tpl` |
| mns | Monitored Service | `<stack>/templates/monitored_services/mns_resource_name.yaml.tpl` |
| pipe | Pipeline | `<stack>/templates/pipelines/pipe_resource_name.yaml.tpl` |
| stm | Secrets Manager | `<stack>/templates/secrets_managers/stm_resource_name.yaml.tpl` |
| sta | Stage | `<stack>/templates/stages/sta_resource_name.yaml.tpl` |
| stp | Step | `<stack>/templates/steps/stp_resource_name.yaml.tpl` |
| stg | Step Group | `<stack>/templates/step_groups/stg_resource_name.yaml.tpl` |

## Customer Resources

### Customer specific project
When creating custom code or pipelines, a new project should be added to the `Implementation_Engineering_Repositories` organization for each customer. This process will help to centralize examples and solutions delivered to customers. When creating a new project, consider the following:
- Projects should be named based on the customer name or common abbreviation
- Each project should have the following description - e.g _This project will house the repositories, pipelines, and samples created for `customer_name`_

### Custom specific Template Library repositories
Never update the Harness Template Library with customer specific changes. It is important that a new repository is created for each customer to maintain the isolation of their specific customizations from the general pool of templates. When creating these repositories, consider the following:
- Use lowercase characters and hyphens to separate words
- Prefix the repository name with the _project_identifier_ followed by _-harness-template-library_ - e.g. `cust-harness-template-library`
- Include a clear description for the repository
- Ensure that the standard security rules and branch protections have been added to the repository
- Only add customized factory templates to the repository
- New custom factory templates should follow all guidelines for global factory templates
