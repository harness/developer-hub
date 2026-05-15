---
title: Upgrade to service and environment v2
description: Historical reference for the v1 to v2 migration that completed in 2023
sidebar_position: 4
sidebar_label: Service and Environment V2 Migration (Archived)
keywords:
  - service v2
  - environment v2
  - migration
  - eol
  - v1 to v2
tags:
  - continuous-delivery
  - archived
redirect_from:
  - /docs/continuous-delivery/cd-onboarding/upgrading/upgrade-cd-v2
  - /docs/continuous-delivery/get-started/upgrading/upgrade-cd-v2
---

:::warning This migration completed in 2023

Service and environment v2 became the default experience on January 31, 2023. All Harness accounts now use v2. This page is retained for historical reference only.

For current v2 documentation:
- Go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview) to learn about v2 services.
- Go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) to learn about v2 environments.

:::

To provide the best software delivery experience for our customers, Harness introduced an enhanced experience for service and environment entities in the CD NextGen platform. We named this enhanced experience **service and environment v2**.

**The v2 experience went into effect as the default experience on January 31, 2023.**

The v1 experience was removed from all accounts on that date.

---

## What you will learn

This page describes the service and environment v1 to v2 migration that occurred in 2023. It is retained for historical reference only.

- **What changed:** The architectural changes from v1 to v2 services, environments, and infrastructure definitions.
- **Why the change was made:** The benefits of the v2 experience (service variables, independent infrastructure definitions, environment groups).
- **How migration worked:** The migration APIs that were used to upgrade accounts from v1 to v2.
- **YAML changes:** Examples of v1 to v2 YAML structure changes for services, environments, infrastructure definitions, stages, pipelines, and templates.

---

## Why make the change?

The v2 experience has more robust service and environment entities. V2 has service variables, independent infrastructure definitions, environment groups, and file and variable overrides.

With v2, you will notice a major reduction in the configuration included in pipelines. These changes are also reflected in the Harness APIs.

All new deployment types (ECS, Deployment Template, SSH, WinRM, etc.) are available in v2 only. New innovations such as [Enterprise GitOps](/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics), multi-services and multi-environments, and [environment groups](/docs/continuous-delivery/x-platform-cd-features/environments/create-environment-groups) are in v2 only.

The new v2 experience was designed to provide users and organizations with simpler configurations and an improved ability to scale.

---

## Customer impact

Here is a summary of the impact to Harness accounts:

- The changes only impacted the CD module. No other modules were impacted.
- No impact on any existing pipelines using v1 services and environments during the transition period.
- After January 31, 2023, when you create a new CD stage in an existing pipeline, the v2 experience became the default.

:::note

Any new services and environments created in Harness after January 31, 2023 use the v2 experience.

:::

---

## Important dates

Review these important historical dates:

- Service and environment v1 APIs were deprecated in March 2023.
- On the official EOL date (January 31, 2023), v1 services and environments continued to work as before. After March 2023, pipelines with v1 services and environments might have experienced issues or failures because Harness did not update v1 with fixes or enhancements after that date.
- Harness globally enabled service and environments v2 APIs for all customers at the end of January 2023.
- The forced change reduced the migration effort needed for users.
- Harness provided an automated tool to help migrate services and environments from v1 to v2.

For questions or comments about this migration, contact `support@harness.io` or your CSM.

---

## API changes

Harness introduced the following new APIs to support the v2 experience:

- [Environments](https://apidocs.harness.io/tag/Environments#operation/createEnvironmentV2)
- [Services](https://apidocs.harness.io/tag/Services#operation/createServiceV2)

Go to [Migrating from v1 services and environments to v2](#migrating-from-v1-services-and-environments-to-v2) to learn how these APIs were used for migration. 


---

## Terraform Provider automation

Customers using the Harness Terraform Provider needed to update their service and environment automation to use the v2 plugin resources:

- [harness_platform_service (Resource)](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service)
- [harness_platform_environment (Resource)](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment)
- [harness_platform_infrastructure (Resource)](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_infrastructure)

Go to [Changelog since service and environment v1 release](#changelog-since-service-and-environment-v1-release) to see Terraform Provider examples.


---

## Changelog since service and environment v1 release

This section contains all the v1 to v2 changes for each of the impacted entity types.

---

### Services

The following changes apply to services:

- To use the service in a pipeline, service definitions must be configured via API/UI/YAML.
- The service definition is a configuration mapped to the service irrespective of the pipelines where it is used.
- For details on service v2, go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview).
- The service entity is now moved from the pipeline to a standalone entity. The service contains the following components:
  - **Name**, **Description**, **Tag**, **Id**. These are the same as in the service v1 experience.
  - Manifests and artifacts. The service manifests and artifacts are now mapped in the service. They are moved out of the pipeline **Service** tab.
  - Service variables. Service variables are now associated with the Service and can be overridden at the environment level.


#### Service YAML updates

Here is a YAML sample that demonstrates the changes in v2.

```yaml
service:
  name: nginx-canary
  identifier: nginxcanary
  
## SERVICE v2 UPDATE
## In v2, a service definition needs to be provided with the service in order for it to be used in a pipeline 

  serviceDefinition:
    type: Kubernetes
    spec:
    
## SERVICE v2 UPDATE  
## You will need to provide a path to your service manifests (i.e. kubernetes manifests)

      manifests:
        - manifest:
            identifier: nginx
            type: K8sManifest
            spec:
              store:
                type: Github
                spec:
                  connectorRef: ProductManagementRohan
                  gitFetchType: Branch
                  paths:
                    - traffic-shifting-nginx/backend/deployment.yaml
                    - traffic-shifting-nginx/backend/service.yaml
                    - traffic-shifting-nginx/backend/nginx.yaml
                    - traffic-shifting-nginx/frontend/ui.yaml
                  repoName: Product-Management
                  branch: main
              valuesPaths:
                - traffic-shifting-nginx/values.yaml
              skipResourceVersioning: false
              
## SERVICE v2 UPDATE
## You will need to add an artifact if you want to pass an image tag in at pipeline runtime 
## this is also associated with the service configuration

      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: public_dockerhub
                imagePath: library/nginx
                tag: <+input>
              identifier: nginx
              type: DockerRegistry
            
 ## SERVICE v2 UPDATE
 ## NEW CAPABILITY: We now have service variables that are mapped and managed with the service no longer defined in the pipeline
 ## This can be overwritten when deploying the service to different environments
 
 
      variables:
        - name: canaryName
          type: String
          description: ""
          value: colors-canary
        - name: host
          type: String
          description: ""
          value: nginx-canary.harness.io
        - name: name
          type: String
          description: ""
          value: colors
        - name: stableName
          type: String
          description: ""
          value: colors-stable
  gitOpsEnabled: false

```

#### REST API updates

When creating a service via the Harness REST API, there is a new [service endpoint](https://apidocs.harness.io/tag/Services/#operation/createServicev2).

#### Sample payload request

```json
{
  "identifier": "string",
  "orgIdentifier": "string",
  "projectIdentifier": "string",
  "name": "string",
  "description": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  
// NEW PART OF THE SERVICE API PAYLOAD
// The YAML is optional when using the API for service creation
// The YAML is mandatory if the service will be used in a pipeline
// YAML is the service definition YAML passed as a string

  "yaml": "string" 
}
```

#### Sample payload response

```json
{
  "status": "SUCCESS",
  "data": {
    "service": {
      "accountId": "string",
      "identifier": "string",
      "orgIdentifier": "string",
      "projectIdentifier": "string",
      "name": "string",
      "description": "string",
      "deleted": true,
      "tags": {
        "property1": "string",
        "property2": "string"
      },
      "yaml": "string"
    },
    "createdAt": 0,
    "lastModifiedAt": 0
  },
  "metaData": {},
  "correlationId": "string"
}
```

---

#### Terraform Provider

Review the changes to the Harness Terraform Provider service resource.

- The Harness Terraform Provider [service resource endpoint](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service) did not change.
- The service resource payload had a new field added for service creation: `yaml`.
- `yaml` is not mandatory for service object creation.
- When creating a service without `yaml` defined, the Terraform Provider creates a skeleton service that cannot be used for immediate deployment.
- The `yaml` field defines the actual definition of the service so it can be used in a pipeline for deployment.

```yaml
resource "harness_platform_service" "example" {
  identifier  = "identifier"
  name        = "name"
  description = "test"
  org_id      = "org_id"
  project_id  = "project_id"
  
## SERVICE v2 UPDATE
## We now take in a YAML that can define the service definition for a given service
## It is not mandatory for service creation 
## It is mandatory for service use in a pipeline

  yaml        = <<-EOT
                service:
                  name: name
                  identifier: identifier
                  serviceDefinition:
                    spec:
                      manifests:
                        - manifest:
                            identifier: manifest1
                            type: K8sManifest
                            spec:
                              store:
                                type: Github
                                spec:
                                  connectorRef: <+input>
                                  gitFetchType: Branch
                                  paths:
                                    - files1
                                  repoName: <+input>
                                  branch: master
                              skipResourceVersioning: false
                      configFiles:
                        - configFile:
                            identifier: configFile1
                            spec:
                              store:
                                type: Harness
                                spec:
                                  files:
                                    - <+org.description>
                      variables:
                        - name: var1
                          type: String
                          value: val1
                        - name: var2
                          type: String
                          value: val2
                    type: Kubernetes
                  gitOpsEnabled: false
              EOT
}
```

---

### Environments

The following changes apply to v2 environments:

- Environments are now standalone objects with global environment variables and manifest configurations.
- V2 **Environment Service Overrides** and **Environment Variables** can override service variables when the service is deployed into a given environment. Based on the variable name, Harness can override the service variable with the environment variable value.
- Harness has introduced service-specific environment overrides where users can define specific services and variables they want to override for a given environment.
- For details on environments v2, go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview).


#### Environment groups

V2 introduces environment groups. You can now aggregate environments and manage them at scale. 

Environment groups are simply a list of environments. You can deploy to a subset of environments within the group or to all of them.

For details on environment groups, go to [Create environment groups](/docs/continuous-delivery/x-platform-cd-features/environments/create-environment-groups).

#### Environment YAML updates

```yaml
environment:
  name: staging
  identifier: staging
  tags: {}
  type: PreProduction
  orgIdentifier: default
  projectIdentifier: Rohan

## ENVIRONMENT v2 UPDATE
## Environments now have variables
## These variables are globally defined and can be accessed when the environment is referenced in the pipeline

  variables:
    - name: db_host
      type: String
      value: postgres-staging
      description: ""
    - name: DB_PASS_STAGING
      type: Secret
      value: Rohan_QA
      description: ""
 
 ## ENVIRONMENT v2 UPDATE    
 ## Environment-specific property files like values.yaml can now be mapped to the environment as well as in the manifest block

  overrides:
    manifests:
      - manifest:
          identifier: staging
          type: Values
          spec:
            store:
              type: Github
              spec:
                connectorRef: ProductManagementRohan
                gitFetchType: Branch
                paths:
                  - cdng/staging-values.yaml
                repoName: Product-Management
                branch: main

```

#### Environment REST API updates

When creating a service via the Harness REST API, there is a new [enviroment endpoint](https://apidocs.harness.io/tag/Environments#operation/createEnvironmentv2).

Here are a few important details:

- The `yaml` parameter is not required for environment creation or usage in a pipeline.
- Harness has a new [environment groups API endpoint](https://apidocs.harness.io/tag/EnvironmentGroup#operation/postEnvironmentGroup).
- Harness has a new [service specific environment overrides API endpoint](https://apidocs.harness.io/tag/Environments#operation/upsertServiceOverride).

##### Environment REST Request changes

```json
{
  "orgIdentifier": "string",
  "projectIdentifier": "string",
  "identifier": "string",
  "tags": {
    "property1": "string",
    "property2": "string"
  },
  "name": "string",
  "description": "string",
  "color": "string",
  "type": "PreProduction",
  
// ENVIRONMENT v2 UPDATE
// You can now pass in the environment variables and overrides via YAML payload 
// NOTE: This field is not mandatory for environment creation or usage in a pipeline

  "yaml": "string"
}
```

---

#### Terraform Provider

Review the changes to the Harness Terraform Provider environment resource.

- The Harness Terraform Provider [environment resource endpoint](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment) has not changed.
- The environment resource payload has a new field added for environment creation: `yaml`.
- `yaml` is not mandatory for environment object creation.
- Harness has a new [resource endpoint for environment groups](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment_group).
- Harness has a new [resource endpoint for environment service configuration overrides](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment_service_overrides).

##### New Terraform Provider environment resource

```yaml
resource "harness_platform_environment" "example" {
  identifier = "identifier"
  name       = "name"
  org_id     = "org_id"
  project_id = "project_id"
  tags       = ["foo:bar", "baz"]
  type       = "PreProduction"

## ENVIRONMENT v2 Update
## The YAML is needed if you want to define the environment variables and overrides for the environment
## Not mandatory for environment creation or pipeline usage

  yaml       = <<-EOT
               environment:
         name: name
         identifier: identifier
         orgIdentifier: org_id
         projectIdentifier: project_id
         type: PreProduction
         tags:
           foo: bar
           baz: ""
         variables:
           - name: envVar1
             type: String
             value: v1
             description: ""
           - name: envVar2
             type: String
             value: v2
             description: ""
         overrides:
           manifests:
             - manifest:
                 identifier: manifestEnv
                 type: Values
                 spec:
                   store:
                     type: Git
                     spec:
                       connectorRef: <+input>
                       gitFetchType: Branch
                       paths:
                         - file1
                       repoName: <+input>
                       branch: master
           configFiles:
             - configFile:
                 identifier: configFileEnv
                 spec:
                   store:
                     type: Harness
                     spec:
                       files:
                         - account:/Add-ons/svcOverrideTest
                       secretFiles: []
      EOT
}
```

---

### Infrastructure definition

Harness took the infrastructure definition that was originally defined in the pipeline and moved it to the environment. Go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) to learn about infrastructure definitions in v2.

Here are the changes to infrastructure definition:
 
- The infrastructure definition can be associated with one environment only.
- The infrastructure definition is required to run a pipeline execution. 
- Users now need to pick an environment and infrastructure definition.

The infrastructure definition configuration now contains:

- **Name**, **Description**, **Tag**, **Deployment Type**.
- Connector details.
- Deployment target details.

#### Infrastructure definition YAML updates

V2 has the following infrastructure definition changes:

- The infrastructure definition is now a standalone object not defined in a pipeline.
- When configuring the infrastructure definition you will associate the infrastructure definition with the environment where you want to use it. For example, the actual cluster in the environment where you want to deploy.

```yaml
infrastructureDefinition:
  name: product-staging
  identifier: productstaging
  description: ""
  tags: {}
  orgIdentifier: default
  projectIdentifier: Rohan
  
## NOTE: the Environment reference maps the infrastructure definition to the environment

  environmentRef: staging
  deploymentType: Kubernetes
  type: KubernetesDirect
  spec:
    connectorRef: pmk8scluster
    namespace: <+input>.allowedValues(dev,qa,prod)
    releaseName: release-<+INFRA_KEY_SHORT_ID>
  allowSimultaneousDeployments: false
```

#### Infrastructure definition Terraform Provider

Harness has released a new Terraform Provider [resource for infrastructure definitions](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_infrastructure).

##### New Terraform Provider infrastructure definition resource

```yaml
resource "harness_platform_infrastructure" "example" {
  identifier      = "identifier"
  name            = "name"
  org_id          = "orgIdentifer"
  project_id      = "projectIdentifier"
  env_id          = "environmentIdentifier"
  type            = "KubernetesDirect"
  deployment_type = "Kubernetes"
  yaml            = <<-EOT
        infrastructureDefinition:
         name: name
         identifier: identifier
         description: ""
         tags:
           asda: ""
         orgIdentifier: orgIdentifer
         projectIdentifier: projectIdentifier
         environmentRef: environmentIdentifier
         deploymentType: Kubernetes
         type: KubernetesDirect
         spec:
          connectorRef: account.gfgf
          namespace: asdasdsa
          releaseName: release-<+INFRA_KEY_SHORT_ID>
          allowSimultaneousDeployments: false
      EOT
}
```

---

### Stages

The stage definition changed when the service and environment v2 update was enabled.

Stages now have a deployment type, a service reference, an environment reference, and an infrastructure definition. These settings must be defined along with the **Execution** steps of the stage.

```yaml
    - stage:
        name: Deploy
        identifier: Deploy
        description: ""
        type: Deployment
        spec:
        
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## deploymentType. This scopes the stage config to one of the deployment types that Harness offers 
 ## Steps, services, environments, infrastructure definitions are all scoped to the stage's deployment type. This prevents incompatible config usage
 
          deploymentType: Kubernetes
          
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## serviceref. This is now a reference to the service object that is configured and managed outside the pipeline
 ## serviceInputs. These are the runtime inputs that users provide for the artifact when they deploy the particular service
 
          service:
            serviceRef: nginxcanary
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
                      
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## environmentref. This is now a reference to the environment object that is configured and managed outside the pipeline
 ## infrastructureDefinitions. This object is defined outside of the pipeline and is referenced via the identifier. The YAML is inserted into the stage definition once defined
 
          environment:
            environmentRef: staging
            deployToAll: false
  
            infrastructureDefinitions:
              - identifier: productstaging
                inputs:
                  identifier: productstaging
                  type: KubernetesDirect
                  spec:
                    namespace: <+input>.allowedValues(dev,qa,prod)
          execution:
            steps:
              - stepGroup:
                  name: Canary Deployment
                  identifier: canaryDepoyment
                  steps:
                    - step:
                        name: Canary Deployment
                        identifier: canaryDeployment
                        type: K8sCanaryDeploy
                        timeout: 10m
                        spec:
                          instanceSelection:
                            type: Count
                            spec:
                              count: 1
                          skipDryRun: false
                    - step:
                        name: Canary Delete
                        identifier: canaryDelete
                        type: K8sCanaryDelete
                        timeout: 10m
                        spec: {}
              - stepGroup:
                  name: Primary Deployment
                  identifier: primaryDepoyment
                  steps:
                    - step:
                        name: Rolling Deployment
                        identifier: rollingDeployment
                        type: K8sRollingDeploy
                        timeout: 10m
                        spec:
                          skipDryRun: false
            rollbackSteps:
              - step:
                  name: Canary Delete
                  identifier: rollbackCanaryDelete
                  type: K8sCanaryDelete
                  timeout: 10m
                  spec: {}
              - step:
                  name: Rolling Rollback
                  identifier: rollingRollback
                  type: K8sRollingRollback
                  timeout: 10m
                  spec: {}
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

---

### Pipelines

The following changes applied to pipelines:

- The pipeline entity changes with the service and environment v2 update.
- The combination of service, environment, and infrastructure definitions are no longer defined in the pipeline. These entities are now managed outside of the pipeline.
- Pipelines use identifiers to reference the service, environment, and infrastructure definitions used in the pipeline.
- Each stage now has a reference to the service, environment, and infrastructure definition entities.

#### Sample v2 pipeline YAML

```yaml
pipeline:
  name: Nginx Colors Canary
  identifier: Nginx_Colors_Canary
  projectIdentifier: Rohan
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Deploy
        identifier: Deploy
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## serviceref. This is now a reference to the service object that is configured and managed outside the pipeline.
 ## serviceInputs. These are the runtime inputs that users provide for the artifact when they deploy the particular service.
 
          service:
            serviceRef: nginxcanary
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
                      
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## environmentref. This is now a reference to the environment object that is configured and managed outside the pipeline.
 ## infrastructureDefinitions. This object is defined outside of the pipeline and is referenced via the identifier. The YAML is inserted into the stage definition once defined.
 
          environment:
            environmentRef: staging
            deployToAll: false
  
            infrastructureDefinitions:
              - identifier: productstaging
                inputs:
                  identifier: productstaging
                  type: KubernetesDirect
                  spec:
                    namespace: <+input>.allowedValues(dev,qa,prod)
          execution:
            steps:
              - stepGroup:
                  name: Canary Deployment
                  identifier: canaryDepoyment
                  steps:
                    - step:
                        name: Canary Deployment
                        identifier: canaryDeployment
                        type: K8sCanaryDeploy
                        timeout: 10m
                        spec:
                          instanceSelection:
                            type: Count
                            spec:
                              count: 1
                          skipDryRun: false
                    - step:
                        name: Canary Delete
                        identifier: canaryDelete
                        type: K8sCanaryDelete
                        timeout: 10m
                        spec: {}
              - stepGroup:
                  name: Primary Deployment
                  identifier: primaryDepoyment
                  steps:
                    - step:
                        name: Rolling Deployment
                        identifier: rollingDeployment
                        type: K8sRollingDeploy
                        timeout: 10m
                        spec:
                          skipDryRun: false
            rollbackSteps:
              - step:
                  name: Canary Delete
                  identifier: rollbackCanaryDelete
                  type: K8sCanaryDelete
                  timeout: 10m
                  spec: {}
              - step:
                  name: Rolling Rollback
                  identifier: rollingRollback
                  type: K8sRollingRollback
                  timeout: 10m
                  spec: {}
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

---

### Templates

The following changes applied to v2 templates:

- Templates are impacted by the service and environments v2 update.
- Your existing templates in the service and environments v1 experience will run until v1 EOL (see [Important dates](#important-dates)).
- When migrating to v2 service and environments, you must create a new stage template that references the v2 service and environment.

#### Sample stage template

```yaml
template:
  name: Deploy
  identifier: Deploy
  type: Stage
  projectIdentifier: Rohan
  orgIdentifier: default
  tags: {}
  spec:
    type: Deployment
    spec:
 
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## deploymentType. This scopes the stage config to a Harness deployment type.
 ## Steps, services, environments, and infrastructure definitions are all scoped to the stage's deployment type. This prevents incompatible config usage.
 
      deploymentType: Kubernetes
      
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## serviceref. This is now a reference to the service object that is configured and managed outside the pipeline.
 ## serviceInputs. These are the runtime inputs that users provide for the artifact when they deploy the particular service.
 
      service:
        serviceRef: <+input>
        serviceInputs: <+input>
        
 ## SERVICE + ENVIRONMENT v2 UPDATE
 ## environmentref. This is now a reference to the environment object that is configured and managed outside the pipeline.
 ## infrastructureDefinitions. This object is defined outside of the pipeline and is referenced using the identifier. The YAML is inserted into the stage definition once defined.
 
      environment:
        environmentRef: <+input>
        deployToAll: false
        environmentInputs: <+input>
        infrastructureDefinitions: <+input>
      execution:
        steps:
          - step:
              name: Rollout Deployment
              identifier: rolloutDeployment
              type: K8sRollingDeploy
              timeout: 10m
              spec:
                skipDryRun: false
                pruningEnabled: false
          - step:
              type: ShellScript
              name: Shell Script
              identifier: ShellScript
              spec:
                shell: Bash
                onDelegate: true
                source:
                  type: Inline
                  spec:
                    script: kubectl get pods -n <+infra.namespace>
                environmentVariables: []
                outputVariables: []
              timeout: 10m
          - step:
              type: Http
              name: HTTP
              identifier: HTTP
              spec:
                url: https://google.com
                method: GET
                headers: []
                outputVariables: []
              timeout: 10s
        rollbackSteps:
          - step:
              name: Rollback Rollout Deployment
              identifier: rollbackRolloutDeployment
              type: K8sRollingRollback
              timeout: 10m
              spec:
                pruningEnabled: false
    failureStrategies:
      - onFailure:
          errors:
            - AllErrors
          action:
            type: StageRollback
  versionLabel: "2.0"

```

---

## Migrating from v1 services and environments to v2

:::note

The user(s) running the APIs for migration must have had standard Harness RBAC permissions to update pipelines, services, environments, and templates (if used).

:::

To support automated migration of services and environments, Harness created two APIs.

The APIs copy over the v1 `serviceDefinition` from a pipeline stage and update the existing service with this `serviceDefinition`. 

The APIs also create an infrastructure definition by using the details from the `infrastructure.infrastructureDefinition` in the YAML of the pipeline stage.

Regardless of whether the pipeline uses templates, the API updates the pipeline YAML also. 

### Pipeline migration

The API will migrate services and environments for all CD stages that exist in a pipeline. It can update pipeline YAML also (optional). The API will migrate the CD stages of a pipeline to v2 one by one.

#### Sample cURL command for pipeline level migration

The `<base_url>` is usually `app.harness.io`.

```curl
curl --location --request POST 'https://<base_url>/gateway/ng/api/service-env-migration/pipeline?accountIdentifier=account_identifier' \
--header 'content-type: application/yaml' \
--header 'Authorization: auth_token' \
--data-raw '{
 "orgIdentifier": '\''org_identifier'\'',
 "projectIdentifier": '\''project_identifier'\'',
 "infraIdentifierFormat": '\''<+stage.identifier>_<+pipeline.identifier>_infra'\'',
 "pipelineIdentifier": '\''pipeline_identifier'\'',
 "isUpdatePipeline": true,
 "templateMap" : 
      {
          "source_template_ref@ source_template_version": {
              "templateRef" : "target_template_ref",
              "versionLabel" : "target_template_version"
          }
      },
      "skipInfras": ["abc"],
      "skipServices": ["abc"],
}'
```

#### Sample response for pipeline level migration API

```json
{
    "status": "SUCCESS",
    "data": {
        "failures": [
            {
                "orgIdentifier": "org_identifier",
                "projectIdentifier": "project_identifier",
                "pipelineIdentifier": "pipeline_identifier",
                "stageIdentifier": "stage_identifier",
                "failureReason": "service of type v1 does not exist in stage yaml"
            }
        ],
        "pipelineYaml": "yaml",
        "migrated": false
    },
    "metaData": null,
    "correlationId": "9ed00aca-d788-441e-a636-58661ef36efe"
}
```

### Input fields for account level migration

- `Authorization`. The auth bearer token. It can be extracted from header of network calls from the browser after logging into Harness.
- `accountIdentifier`. The user account identifier.
- `orgIdentifier`. Organization identifier of the pipeline you want to migrate.
- `projectIdentifier`. Project identifier of the pipeline you want to migrate.
- `infraIdentifierFormat`. The format for the infrastructure definition identifier. Harness will replace the expressions in this string with actual values and use it as an identifier to create an infrastructure definition.
- `templateMap`. Mapping of source template to target template.
  - `source template`. This refers to a stage template that exists in a CD stage's YAML.
  - `target template`. This refers to a stage template that replaces the existing source template in a CD stage's YAML.
  - `skipInfras`. The list of infrastructure identifiers to skip during migration. This allows you to omit infrastructures you don't want to upgrade.
  - `skipServices`. The list of service identifiers to skip during migration. This allows you to omit services you don't want to upgrade.
  - `isUpdatePipeline`. The pipeline YAML is updated with the new service and environment framework if this label is `true`. Otherwise, the pipeline YAML is not updated.

### Output fields for account level migration

- `failures`. List of causes for migration failure.
- `pipelineYaml`. Updated pipeline YAML with new service and environment framework.
- `migrated`. This is `true` if the pipeline was updated. Otherwise it is `false`.

## Project level migration

The API will migrate services and enviroments for all existing pipelines in a project. It can update pipeline YAML also.

### Sample request for project level migration API

The `<base_url>` is usually `app.harness.io`.

```curl
curl --location --request POST 'https://<base_url>/gateway/ng/api/service-env-migration/project?accountIdentifier=account_id' \
--header 'content-type: application/yaml' \
--header 'Authorization: auth_token' \
--data-raw '{
 "orgIdentifier": '\''org_identifier'\'',
 "projectIdentifier": '\''project_identifier'\'',
 "infraIdentifierFormat": '\''<+stage.identifier>_<+pipeline.identifier>_infra'\'',
  "isUpdatePipeline": true,
  "templateMap" : 
      {
          "source_template_ref@ source_template_version": {
              "templateRef" : "target_template_version",
              "versionLabel" : "v1"
          }
      },
      "skipInfras": ["abc"],
      "skipServices": ["abc"],
      "skipPipelines": ["def"]
}'
```

### Sample response for project level migration request

```json
{
    "status": "SUCCESS",
    "data": {
        "failures": [
            {
                "orgIdentifier": "org_identifier",
                "projectIdentifier": "project_identifier",
                "pipelineIdentifier": "pipeline_identifier",
                "stageIdentifier": "stage_identifier",
                "failureReason": "service of type v1 does not exist in stage yaml"
            }
        ],
        "migratedPipelines": ["def"]
    },
    "metaData": null,
    "correlationId": "9ed00aca-d788-441e-a636-58661ef36efe"
}
```

### Additional input fields for project level migration request

- `skipPipelines`. The list of pipeline identifiers to skip during migration. If you don't want to migrate a pipeline, then add the pipeline identifier to this list.

### Output fields for project migration

- `failures`. List of causes for migration failure.
- `migrated`. This is `true` if the pipeline was updated. Otherwise it is `false`.

---

## Related concepts

This migration completed in 2023. All Harness accounts now use service and environment v2.

- Go to [Services overview](/docs/continuous-delivery/x-platform-cd-features/services/services-overview) to learn about v2 services.
- Go to [Environments overview](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) to learn about v2 environments.
- Go to [Create environment groups](/docs/continuous-delivery/x-platform-cd-features/environments/create-environment-groups) to group environments.
- Go to [Infrastructure definitions](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview#infrastructure-definitions) to define deployment targets.


