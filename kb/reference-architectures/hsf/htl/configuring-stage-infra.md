---
title: Configuring Stage Infrastructure
description: We have documented reusable code snippets that can be used for allowing user customization when writing pipeline template and Template workflows.
---
Within the Harness Platform, there are certain modules - CI, STO, IACM, or IDP - that require the user to configure infrastructure. When developing a pipeline with these modules a user must choose a build infrastructure type: Kubernetes or Cloud. We have documented reusable code snippets that can be used for allowing user customization when writing pipeline template and Template workflows.

## IDP Template Workflow
The following can be used for both pipeline infrastructure or step/group infrastructure.

```
    - title: How should the pipeline run?
      properties:
        build_infrastructure_type:
          title: Choose your Build Farm Infrastructure configuration
          type: string
          default: build_farm
          enum:
            - build_farm
            - cloud
            - custom
          enumNames:
            - Central Build Farm Infrastructure Only
            - Leverage Harness CI Cloud Infrastructure
            - Self-Hosted Kubernetes Infrastructure
        infra_defaults:
          title: infra_defaults
          type: object
          ui:widget: hidden
          properties:
            kubernetes_connector:
              type: string
              default: account.buildfarm_infrastructure
            kubernetes_namespace:
              type: string
              default: default
            kubernetes_override_image_connector:
              type: string
              default: ""
            kubernetes_node_selectors:
              type: string
              default: ""
      dependencies:
        build_infrastructure_type:
          allOf:
            - if:
                properties:
                  build_infrastructure_type:
                    const: "custom"
              then:
                required:
                  - kubernetes_connector
                  - kubernetes_namespace
                properties:
                  kubernetes_connector:
                    title: Existing Kubernetes Infrastructure Connector Reference
                    type: string
                    description: Enter the existing Kubernetes connector if local K8s execution should be used when running the Execution pipeline.  Must exist before execution.
                  kubernetes_namespace:
                    title: Existing Kubernetes Infrastructure Namespace
                    type: string
                    description: Enter the existing Kubernetes namespace if local K8s execution should be used when running the Execution pipeline.  Must exist before execution
                  kubernetes_override_image_connector:
                    title: Existing Override Image Container Connector Reference
                    type: string
                    description: Enter an existing Container Registry connector to use which overrides the default connector.  Must exist before execution
                  kubernetes_node_selectors:
                    title: Map of Kubernetes Node Selectors (Must be in key:value JSON)
                    type: object
                    description: Optional Kubernetes Node Selectors
                    additionalProperties:
                      type: string 
```

Then pass these parameters to your Terraform:
```
steps:
    - id: configure_workspace
      name: Configuring Harness Workspace
      action: trigger:harness-custom-pipeline
      input:
        url: ${{ parameters.solutions_factory_details.harness_account_url }}/ng/account/${{ parameters.solutions_factory_details.harness_account_id }}/all/orgs/${{ parameters.solutions_factory_details.harness_org_id }}/projects/${{ parameters.solutions_factory_details.harness_project_id }}/pipelines/Create_and_Manage_IACM_Workspaces/pipeline-studio?storeType=INLINE
        inputset:
          RESOURCE_VARS:
            kubernetes_connector: ${{ "skipped" if (parameters.build_infrastructure_type == "cloud") else ( parameters.infra_defaults.kubernetes_connector if (parameters.build_infrastructure_type == "build_farm") else parameters.kubernetes_connector ) }}
            kubernetes_namespace: ${{ "default" if (parameters.build_infrastructure_type == "cloud") else ( parameters.infra_defaults.kubernetes_namespace if (parameters.build_infrastructure_type == "build_farm") else parameters.kubernetes_namespace ) }}
            kubernetes_node_selectors: ${{ "{}" if (parameters.build_infrastructure_type == "cloud") else ( parameters.kubernetes_node_selectors if parameters.kubernetes_node_selectors else parameters.infra_defaults.kubernetes_node_selectors ) }}
            kubernetes_override_image_connector: ${{ "skipped" if (parameters.build_infrastructure_type == "cloud") else ( parameters.kubernetes_override_image_connector if parameters.kubernetes_override_image_connector else parameters.infra_defaults.kubernetes_override_image_connector ) }}
```

And create variables in your Terraform to retrieve them:
```
## Pipeline Infrastructure Variables
variable "kubernetes_connector" {
  type        = string
  description = "[Required] Enter the existing Kubernetes connector if local K8s execution should be used when running the Execution pipeline.  Must exist before execution"
  default     = "skipped"
}

variable "kubernetes_namespace" {
  type        = string
  description = "[Optional] Enter the existing Kubernetes namespace if local K8s execution should be used when running the Execution pipeline.  Must exist before execution"
  default     = "default"
}

variable "kubernetes_node_selectors" {
  type        = map(any)
  description = "[Optional] Optional Kubernetes Node Selectors"
  default     = {}
}

variable "kubernetes_override_image_connector" {
  type        = string
  description = "[Optional] Enter an existing Container Registry connector to use which overrides the default connector.  Must exist before execution"
  default     = "skipped"
}
```

Add a template file to your Terraform templates directory `templates/pipelines/snippets/`:
```
%{~ if KUBERNETES_CONNECTOR != "skipped" ~}
          sharedPaths:
            - /var/run
            - /opt/docker_cache
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: ${KUBERNETES_CONNECTOR}
              namespace: ${KUBERNETES_NAMESPACE}
              automountServiceAccountToken: true
              %{~ if KUBERNETES_NODESELECTORS != "{}" ~}
              nodeSelector:
                ${KUBERNETES_NODESELECTORS}
              %{~ endif ~}
              os: Linux
              %{~ if KUBERNETES_IMAGE_CONNECTOR != "skipped" ~}
              harnessImageConnectorRef: ${KUBERNETES_IMAGE_CONNECTOR}
              %{~ endif ~}
          %{~ else ~}
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
%{~ endif ~}
```

Then add a spot for the snippet to be rendered in your pipeline:
```
pipeline:
  identifier: ${PIPELINE_IDENTIFIER}
  name: ${PIPELINE_NAME}
  orgIdentifier: ${ORGANIZATION_ID}
  projectIdentifier: ${PROJECT_ID}
  description: "Create a new catalog yaml and push it to the target git repository."
  tags:
    ${indent(4, TAGS)}
  stages:
    - stage:
        name: example
        identifier: example
        description: ""
        type: IDP
        spec:
${STAGE_INFRASTRUCTURE}
```

Finally, when rendering your pipeline with `templatefile` just pass the inputs from the workflow:
```
  yaml = templatefile(
    "${path.module}/templates/pipelines/some_template.yaml",
    {
      STAGE_INFRASTRUCTURE : templatefile(
        "${path.module}/templates/pipelines/snippets/pipeline_infrastructure.yaml",
        {
          KUBERNETES_CONNECTOR : var.kubernetes_connector
          KUBERNETES_NAMESPACE : var.kubernetes_namespace
          KUBERNETES_NODESELECTORS : (var.kubernetes_node_selectors != {} ? yamlencode(var.kubernetes_node_selectors) : "skipped")
          KUBERNETES_IMAGE_CONNECTOR : var.kubernetes_override_image_connector
        }
      )
    }
)
```