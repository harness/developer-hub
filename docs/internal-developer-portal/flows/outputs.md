---
title: Configuring Workflow Outputs
description: Learn more about how to define and generate outputs for your Workflows
sidebar_position: 6
sidebar_label: Workflow Outputs
---

You can configure specific outputs for your workflows. Each step defined in your backend within ```workflow.yaml``` can generate output variables that are used in the frontend after task execution. These outputs can include direct links to newly created resources, such as Git repositories, documentation pages, or CI/CD pipelines, providing developers with immediate access to manage or monitor their onboarded resources.

Here are some use-cases of generating output variables. 

### Links to Generated Resources
The output can generate direct links to newly created resources, such as Git repositories, documentation pages, or CI/CD pipelines. This provides developers with immediate access to manage and monitor their newly onboarded resources efficiently.

``` YAML
output:
  links:
    - title: "Repository Link"
      url: "${{ steps['repo-create'].output.repoUrl }}"
    - title: "Pipeline Dashboard"
      url: "${{ steps['deploy-pipeline'].output.pipelineUrl }}"

```

### Service Metadata and Status
The output can include status messages or metadata from the onboarding process. For example, it can provide details about service registration or track the progress of resource provisioning, including success or failure messages.

```YAML
output:
  text:
    - title: "Service Registration Status"
      content: "Service registration completed with status: `${{ steps['register-service'].output.status }}`
```

### Generate Files and Artifacts
Developers can configure workflows to generate essential files (e.g., README.md, YAML configuration files) or artifacts (e.g., Dockerfiles, Kubernetes manifests) as part of the onboarding process.

```YAML
output:
  links:
    - title: "Generated README"
      url: "${{ steps['create-readme'].output.fileUrl }}"
    - title: "Kubernetes Manifest"
      url: "${{ steps['generate-manifest'].output.fileUrl }}"
```

### Dynamic Outputs Based on Inputs
Outputs can be dynamically generated based on user inputs. For example, if a user selects the "production" environment during onboarding, the output may include production-specific links, such as monitoring dashboards or production CI/CD pipelines.

