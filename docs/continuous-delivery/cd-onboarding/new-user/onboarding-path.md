---
title: CD onboarding path
description: Ramp up on Harness CD
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the different phases and steps involved in onboarding with Harness CD. Follow these steps to ensure that you have all the settings and resources required for moving forward with your own deployments.

If you are only looking for tutorials, go to [Continuous Delivery & GitOps tutorial](https://developer.harness.io/tutorials/cd-pipelines).

## Overview

This section lists the major onboarding phases and provides links to more details.

:::note

Steps with an asterisk **"\*"** have YAML examples that can be used for setting up the step.

:::

### <a href="#phase-1-initial-setup"> Phase 1: Initial setup</a>

| **Step**                                                                                                                           | **Details**                                        | **Documentation Link**                                                                                                             | **Demo Video**                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| <a href="#step-1-account--entities-setup">Account and entities setup</a>                                                           | Create organization, project, invite initial users | [Create organizations and projects](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization/) |                                                                                                 |
| <a href="#step-2-installing-delegate">Installing delegates</a>                                                                     | Kubernetes, Docker                                 | [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/)              | [Watch Video](https://developer.harness.io/docs/platform/delegates/install-delegates/overview/) |
| <a href="#step-3-installing-secret-manager--migrating-existing-secrets">Installing secret managers, Migrating existing secrets</a> | AWS KMS, HashiCorp, Azure Key Vault, Google KMS    | [Add a secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-secrets-manager/)                 |                                                                                                 |

### <a href="#phase-2-deploy-to-qa"> Phase 2: Deploy to QA </a>

| **Step**                                                             | **Details**                                                       | **Documentation Link**                                                                                                                | **Demo Video**                                                  |
| -------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <a href="#services">Service Definition and Variables</a> \*          | Runtime Inputs or expressions                                     | [Create services](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/)             | [Watch Video](https://youtu.be/02RIvOGd0zg?si=HnK4wHaxLUWEkoFK) |
| <a href="#environments">Environments</a> \*                          | Service Override                                                  | [Create environments](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/) | [Watch Video](https://youtu.be/02RIvOGd0zg?si=HnK4wHaxLUWEkoFK) |
| <a href="#step-2-adding-artifact-source">Adding artifact sources</a> | Docker Registry, GCR, GCS, ACR, Azure DevOps Artifacts, ECR, etc. | [CD artifact sources](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/)        |                                                                 |
| <a href="#step-3-simple-pipeline">Simple pipelines</a> \*            | Stage, service, environment, infrastructure                       | [CD pipeline modeling overview](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-modeling-overview/)     | [Watch Video](https://youtu.be/k-f1nbgGkww?si=_EW6Lcr1qxzrQNVM) |

### <a href="#phase-3-deploy-to-staging"> Phase 3: Deploy to staging </a>

| **Step**                                                              | **Details**                                                      | **Documentation Link**                                                                                                              | **Demo Video**                                                  |
| --------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <a href="#step-1-deployment-strategy">Deployment strategies</a> \*    | Rollback, Blue Green, Canary, Kubernetes Apply, Kubernetes Scale | [Deployment concepts and strategies](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/) | [Watch Video](https://youtu.be/VJjDbwoxLfM?feature=shared)      |
| <a href="#step-2-triggers--input-sets">Triggers and input sets</a> \* | SCM triggers, artifact triggers                                  | [Pipeline triggers](https://developer.harness.io/tutorials/cd-pipelines/trigger/)                                                   | [Watch Video](https://youtu.be/nIPjsANiKRk?si=euQzhaYGfnPaacUe) |

### <a href="#phase-4-deploy-to-production"> Phase 4: Deploy to production </a>

| **Step**                                                                          | **Details**                                         | **Documentation Link**                                                                                                                                 | **Demo Video**                                                  |
| --------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| <a href="#step-1-approvals--governance-opa">Approvals and governance (OPA)</a> \* | Harness Approval, JIRA Approval                     | [Approvals](https://developer.harness.io/tutorials/cd-pipelines/approvals/)                                                                            | [Watch Video](https://youtu.be/KtE6f5-QHrI?si=zYhrXnedmf2j0bUi) |
| <a href="#step-2-rbac">RBAC</a>                                                   | CoE, Distributed Center of DevOps                   | [Role-based access control (RBAC) in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/)                   | [Watch Video](https://youtu.be/vIQfpRrES44?si=Du5OAej2t2Phu7Hg) |
| <a href="#step-3-continuous-verification">Continuous Verification</a>             | Auto, Rolling Update, Canary, Blue Green, Load Test | [Harness Continuous Verification (CV) overview](https://developer.harness.io/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step/) |                                                                 |

### <a href="#phase-5-sso-enabled-devops-with-infrastructure-as-code-iac"> Phase 5: SSO-enabled DevOps with Infrastructure as Code (IaC) </a>

| **Step**                                                                          | **Details**                                          | **Documentation Link**                                                                                           | **Demo Video**                                                  |
| --------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| <a href="#step-1-sso">SSO</a>                                                     | SAML SSO with Harness, Okta, OneLogin, Keycloak, etc | [Single Sign-On (SSO) with SAML](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/) |                                                                 |
| <a href="#step-2-templatization--automation">Templatization and automation</a> \* | Templates, Terraform Automation                      | [Templates overview](https://developer.harness.io/docs/platform/templates/template/)                             | [Watch Video](https://youtu.be/U-n3VK_RoQc?si=dfokJq6pa6017mqX) |

## Phase 1: Initial setup

### Step 1. Account and entities setup

Harness organizations (orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division.

A Harness project is a group of Harness modules and their pipelines. For example, a project might have a Harness CI pipeline to build code and push an image to a repo and a Harness CD pipeline to pull and deploy that image to a cloud platform.

#### Create a Harness org

1. In Harness, in **Account Settings**, select **Organizations**.
2. Select **New Organization**. The new organization settings appear.
3. In **Name**, enter a name for your organization.
4. Select **Save and Continue**.

#### Invite collaborators

1. In **Invite People to Collaborate**, enter a user's name and select it.
2. In **Role**, select the role the member will have in this org, such as **Organization Admin** or **Organization Member**.
3. Select **Add**.
   - Members receive invites via their email addresses.
   - You can always invite more members from within the org later.
4. Select **Finish**. The org is added to the list in **Account Settings** > **Organizations**.

#### Create a project

1. In Harness, go to **Home** and select **Projects**.
2. Select **Project**.
3. Name the project, and select a color. The Id of the project is generated automatically.
4. In **Organization**, select the org you created.
5. Add a description and tags, and then select **Save and Continue**.
6. In **Invite Collaborators**, type a member's name and select it.
7. Select a role for the member, and select **Add**.
8. Select **Save and Continue** to create the project.

### Step 2. Installing Delegate

The Harness delegate is a service you run in your local network or VPC to connect your artifacts, infrastructure, collaboration, verification, and other providers, with Harness Manager.

The first time you connect Harness to a third-party resource, the Harness delegate is installed in your target infrastructure, for example, a Kubernetes cluster. After the delegate is installed and registers with Harness, you can Harness connect to third-party resources. The delegate performs all operations, including deployment and integration.

For more information, go to [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/).

### Step 3. Installing secret managers, migrating existing secrets

Harness includes a built-in secret management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness connectors and pipelines. For more information, go to [Add a secret manager](/docs/platform/secrets/secrets-management/add-secrets-manager).

Looking for specific secret managers? Go to:

- [Add an AWS KMS Secret Manager](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager)
- [Add a HashiCorp Vault Secret Manager](/docs/platform/secrets/secrets-management/add-hashicorp-vault)
- [Add an Azure Key Vault Secret Manager](/docs/platform/secrets/secrets-management/azure-key-vault)
- [Add Google KMS as a Harness Secret Manager](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager)
- [Add an AWS Secrets Manager](/docs/platform/secrets/secrets-management/add-an-aws-secret-manager)

## Phase 2: Deploy to QA

### Step 1. Service and environments

#### Services

Services represent your microservices and other workloads. Each service contains a Service Definition that defines your deployment artifacts, manifests or specifications, configuration files, and service-specific variables. For more information, go to [Create a service](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/#create-a-service).

Services are often configured using runtime inputs or expressions, so you can change service settings for different deployment scenarios at pipeline runtime. To use services with runtime inputs and expressions, go to [Using services with inputs and expressions](/docs/continuous-delivery/x-platform-cd-features/services/create-services). Below are some example Kubernetes and ECS Fargate Harness services:

<Tabs>
<TabItem value="K8s Service">

```yaml
service:
  name: k8s-svc
  identifier: k8ssvc
  serviceDefinition:
    spec:
      release:
        name: release-<+INFRA_KEY_SHORT_ID>
      manifests:
        - manifest:
            identifier: Kubernetes
            type: K8sManifest
            spec:
              store:
                type: Github
                spec:
                  connectorRef: account.YourGitHubConnector
                  gitFetchType: Branch
                  paths:
                    - content/en/examples/application/nginx-app.yaml
                  repoName: kubernetes/website
                  branch: main
              skipResourceVersioning: false
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: account.YourArtifactConnector
                imagePath: bitnami/kafka
                tag: <+input>
                digest: ""
              identifier: artifact
              type: DockerRegistry
    type: Kubernetes
  tags: {}
```

</TabItem>
<TabItem value="ECS Fargate Service">

```yaml
service:
  name: ecs-service
  identifier: ecs_service
  orgIdentifier: default
  projectIdentifier: ECS Deployment
  serviceDefinition:
    type: ECS
    spec:
      manifests:
        - manifest:
            identifier: serviceDefinition
            type: EcsServiceDefinition
            spec:
              store:
                type: Github
                spec:
                  connectorRef: org.YourGitHubConnector
                  gitFetchType: Branch
                  paths:
                    - applications/ecs-fargate-manifests/CreateServiceRequest.yaml
                  repoName: harness-community/developer-hub-apps
                  branch: main
        - manifest:
            identifier: taskDefinition
            type: EcsTaskDefinition
            spec:
              store:
                type: Github
                spec:
                  connectorRef: org.YourGitHubConnector
                  gitFetchType: Branch
                  paths:
                    - ECS/BlueGreenNoVariables/RegisterTaskDefinitionRequest.yaml
                  repoName: harness-community/developer-hub-apps
                  branch: main
        - manifest:
            identifier: scalingPolicy
            type: EcsScalingPolicyDefinition
            spec:
              store:
                type: Github
                spec:
                  connectorRef: org.GitHubConnector
                  gitFetchType: Branch
                  paths:
                    - applications/ecs-fargate-manifests/PutScalingPolicyRequest.yaml
                  repoName: harness-community/developer-hub-apps
                  branch: main
        - manifest:
            identifier: scalabletarget
            type: EcsScalableTargetDefinition
            spec:
              store:
                type: Github
                spec:
                  connectorRef: org.GitHubConnector
                  gitFetchType: Branch
                  paths:
                    - applications/ecs-fargate-manifests/RegisterScalableTargetRequest.yaml
                  repoName: harness-community/developer-hub-apps
                  branch: main
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: org.YourAwsConnector
                imagePath: your-image-path
                tag: latest
                region: us-east-1
              identifier: ECRartifact
              type: Ecr
  gitOpsEnabled: false
```

</TabItem>
</Tabs>

#### Environments

Environments represent your deployment targets (QA, Prod, etc). Each environment contains one or more Infrastructure Definitions that list your target clusters, hosts, namespaces, etc. To create your own environments, go to [Create environments](/docs/continuous-delivery/x-platform-cd-features/environments/create-environments).

<Tabs>
<TabItem value="Environment Definition">

```yaml
environment:
  name: Env_1
  identifier: Env_1
  tags: {}
  type: Production
  orgIdentifier: default
  projectIdentifier: Default_Project
  variables: []
```

</TabItem>
<TabItem value="Infrastructure Definition">

```yaml
infrastructureDefinition:
  name: Infra_1
  identifier: Infra_1
  orgIdentifier: default
  projectIdentifier: Default_Project
  environmentRef: Env_1
  deploymentType: Kubernetes
  type: KubernetesDirect
  spec:
    connectorRef: org.KubernetesConnectorForAutomationTest
    namespace: cdp-k8s-qa-sanity
    releaseName: release-<+INFRA_KEY_SHORT_ID>
  allowSimultaneousDeployments: true
```

</TabItem>
</Tabs>

#### Service Overrides

In DevOps, it is common to have multiple environments, such as development, testing, staging, and production. Each environment might require different configurations or settings for the same service.

For example, in the development environment, a service may need to use a local database for testing, while in the production environment, it should use a high-availability database cluster.

To enable the same service to use different environment settings, DevOps teams can override service settings for each environment.

For more information, go to [Create service overrides](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/#create-service-overrides).

### Step 2. Adding artifact sources

In DevOps, an artifact source is a location where the compiled, tested, and ready-to-deploy software artifacts are stored. These artifacts could be container images, compiled binary files, executables, or any other software components that are part of the application.

To add an artifact source, you add a Harness connector to the artifact platform (DockerHub, GCR, Artifactory, etc.) and then add an artifact source to a Harness service that defines the artifact source name, path, tags, and so on.

For the list of artifact sources that you can use in your Harness services, go to [Artifact Sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).

### Step 3. Create a simple pipeline

To create a simple CD pipeline, follow the steps:

1. Create a pipeline.
2. Add a CD stage.
3. Define a service.
4. Target an environment and infrastructure.
5. Select execution steps.
6. You can model visually, using YAML, or via the REST API.

<DocVideo src="https://www.youtube.com/watch?v=irDr4JlbmLY" />

Here's a simple CD pipeline using a Kubernetes type deployment:

<details>
<summary>K8s Rolling Deployment Pipeline YAML</summary>
<br />

```yaml
pipeline:
  name: K8s Rolling Deployment
  identifier: K8s_Rolling_Deployment
  projectIdentifier: Default Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Rolling Deployment
        identifier: Rolling_Deployment
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Service_1
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: Env_1
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Infra_1
          execution:
            steps:
              - step:
                  name: Rolling Deployment
                  identifier: rolloutDeployment
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

</details>

## Phase 3: Deploy to Staging

### Step 1. Deployment Strategy

You have likely heard terms like blue/green and canary when it comes to deploying code and applications into production. These are common deployment strategies, available in Harness CD as stage strategies, along with others.

<DocVideo src="https://www.youtube.com/watch?v=o3MoWAY27wE" />

The deployment strategies provided by Harness are:

- Rolling
- Blue Green
- Canary
- Basic Deployments
- Multi-service

<Tabs>
<TabItem value="Rolling">

```yaml
pipeline:
  name: K8s Rolling Deployment
  identifier: K8s_Rolling_Deployment
  projectIdentifier: Default Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Rolling Deployment
        identifier: Rolling_Deployment
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Service_1
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: Env_1
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Infra_1
          execution:
            steps:
              - step:
                  name: Rolling Deployment
                  identifier: rolloutDeployment
                  type: K8sRollingDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
```

</TabItem>
<TabItem value="Blue Green">

```yaml
pipeline:
  name: K8s Blue Green Deployment
  identifier: K8s_Blue_Green_Deployment
  projectIdentifier: Default Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Blue Green Deployment
        identifier: Blue_Green_Deployment
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Service_1
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: Env_1
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Infra_1
          execution:
            steps:
              - step:
                  name: Stage Deployment
                  identifier: stageDeployment
                  type: K8sBlueGreenDeploy
                  timeout: 10m
                  spec:
                    skipDryRun: false
                    pruningEnabled: false
              - step:
                  name: Swap primary with stage service
                  identifier: bgSwapServices
                  type: K8sBGSwapServices
                  timeout: 10m
                  spec:
                    skipDryRun: false
            rollbackSteps:
              - step:
                  name: Swap primary with stage service
                  identifier: rollbackBgSwapServices
                  type: K8sBGSwapServices
                  timeout: 10m
                  spec:
                    skipDryRun: false
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        timeout: 10m
        variables:
          - name: resourceNamePrefix
            type: String
            description: ""
            required: false
            value: cdpsanitysuites-trybg
```

</TabItem>
<TabItem value="Canary">

```yaml
pipeline:
  name: K8s Canary Deployment
  identifier: K8s_Canary_Deployment
  projectIdentifier: Default Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Canary Deployment
        identifier: Canary_Deployment
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Service_1
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: Env_1
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Infra_1
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
        variables:
          - name: resourceNamePrefix
            type: String
            description: ""
            required: false
            value: cdpsanitysuites-trycanary
        timeout: 10m
```

</TabItem>
<TabItem value="K8s with Apply">

```yaml
pipeline:
  name: K8s Deployment with Apply Step
  identifier: K8s_Deployment_with_Apply_Step
  projectIdentifier: Default Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Deployment with Apply Step
        identifier: Deployment_with_Apply_Step
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Service_1
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: Env_1
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Infra_1
          execution:
            steps:
              - step:
                  type: K8sApply
                  name: K8s Apply
                  identifier: K8s_Apply
                  spec:
                    filePaths:
                      - namespace.yaml
                      - service.yaml
                    skipDryRun: false
                    skipSteadyStateCheck: false
                    skipRendering: false
                    overrides: []
                  timeout: 10m
            rollbackSteps: []
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        timeout: 10m
        variables:
          - name: resourceNamePrefix
            type: String
            description: ""
            required: false
            value: cdpsanitysuites-qwerandom
```

</TabItem>
<TabItem value="K8s with Scale">

```yaml
pipeline:
  name: K8s Deployment with Scale Step
  identifier: K8s_Deployment_with_Scale_Step
  projectIdentifier: Default Project
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Deployment With Scale Step
        identifier: Deployment_With_Scale_Step
        description: ""
        type: Deployment
        spec:
          deploymentType: Kubernetes
          service:
            serviceRef: Service_1
            serviceInputs:
              serviceDefinition:
                type: Kubernetes
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: Env_1
            deployToAll: false
            infrastructureDefinitions:
              - identifier: Infra_1
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
                  type: K8sScale
                  name: K8sScale_1
                  identifier: K8sScale_1
                  spec:
                    workload: Deployment/<+stage.variables.resourceNamePrefix>-deployment
                    skipSteadyStateCheck: false
                    instanceSelection:
                      type: Count
                      spec:
                        count: 2
                  timeout: 10m
            rollbackSteps:
              - step:
                  name: Rollback Rollout Deployment
                  identifier: rollbackRolloutDeployment
                  type: K8sRollingRollback
                  timeout: 10m
                  spec:
                    pruningEnabled: false
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        variables:
          - name: resourceNamePrefix
            type: String
            description: ""
            required: false
            value: cdpsanitysuites-tryscale
        timeout: 10m
```

</TabItem>
</Tabs>

For more information, go to [Deployment concepts and strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts).

### Step 2. Triggers and input sets

Triggers automatically initiate pipeline execution based on specific events or conditions, such as Git events, new Helm Charts, new artifacts, or specific time intervals. Triggers in Harness CD enable faster feedback cycles, enhanced efficiency, and decreased reliance on manual intervention during the deployment process.

Here are examples of a new artifact trigger and GitHub Webhook trigger:

<Tabs>
<TabItem value="Trigger On New Artifact">

```yaml
trigger:
  name: trigger_on_new_artifact_v2
  identifier: trigger_on_new_artifact_v2
  enabled: true
  tags: {}
  orgIdentifier: default
  projectIdentifier: default_project
  pipelineIdentifier: trigger_on_new_artifact
  stagesToExecute: []
  source:
    type: Artifact
    spec:
      type: DockerRegistry
      spec:
        connectorRef: account.Pritish_Harness
        imagePath: pritishharness/harness_test
        tag: <+trigger.artifact.build>
        eventConditions: []
  inputYaml: |
    pipeline:
      identifier: trigger_on_new_artifact
      stages:
        - stage:
            identifier: test
            type: Deployment
            spec:
              service:
                serviceInputs:
                  serviceDefinition:
                    type: Kubernetes
                    spec:
                      artifacts:
                        primary:
                          sources:
                            - identifier: artifact
                              type: DockerRegistry
                              spec:
                                tag: <+lastPublished.tag>
```

</TabItem>
<TabItem value="GitHub Webhook Trigger">

```yaml
trigger:
  name: github_filechange_trigger
  identifier: github_filechange_trigger
  enabled: true
  encryptedWebhookSecretIdentifier: ""
  description: ""
  tags: {}
  orgIdentifier: default
  stagesToExecute: []
  projectIdentifier: default_project
  pipelineIdentifier: github_filechange_trigger
  source:
    type: Webhook
    spec:
      type: Github
      spec:
        type: PullRequest
        spec:
          connectorRef: account.CIPHERTron
          autoAbortPreviousExecutions: false
          payloadConditions:
            - key: changedFiles
              operator: Equals
              value: README.md
            - key: targetBranch
              operator: Equals
              value: main
          headerConditions: []
          repoName: harness-yarn-demo
          actions:
            - Open
  inputYaml: |
    pipeline:
      identifier: github_filechange_trigger
      properties:
        ci:
          codebase:
            build:
              type: branch
              spec:
                branch: <+trigger.branch>
```

</TabItem>
</Tabs>

## Phase 4: Deploy to production

### Step 1. Approvals and governance (OPA)

#### Approvals

- **Harness manual approvals**: You can specify Harness user group(s) to approve or reject a pipeline at any point in its execution. During deployment, the user group members use Harness Manager to approve or reject the pipeline deployment manually.
- **JIRA approvals**: Jira issues can be used to approve or reject a pipeline or stage at any point in its execution. During deployment, the pipeline evaluates the fields in the Jira ticket based on criteria you define. Its approval or rejection determines if the pipeline or stage may proceed. You can add the Jira Approval step in Approval stages or in CD stages. The Jira Approval step prevents the stage execution from proceeding without an approval.
- **ServiceNow approvals**: You can use ServiceNow tickets to approve or reject a pipeline or stage at any point in its execution. During deployment, a ServiceNow ticket's fields are evaluated according to the criteria you define, and its approval/rejection determines if the Pipeline or stage may proceed.
- **Custom approvals**: Custom approval stages and steps add control gates to your pipelines by allowing you to approve or reject a pipeline or stage at any point during build execution. When you add a Custom Approval step, you add a script to the step, and then use the script results as approval or rejection criteria.

To learn more about approvals, go to: [Approvals](https://developer.harness.io/docs/category/approvals-1).

#### Governance

Harness Policy As Code uses Open Policy Agent (OPA) as the central service to store and enforce policies for the different entities and processes across the Harness platform. You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Here are some Harness governance examples with OPA.

<Tabs>
<TabItem value="Delegate Tag Governance">

```
package pipeline

# Allow pipeline execution only with specific delegate tag selected
deny[msg] {
    # Find all pipeline stages
    stage := input.pipeline.stages[_].stage

    # Find all steps in each stage
    step := stage.spec.execution.steps[_].step

    # Check if the step has a delegate selector
    delegateSelector := step.advanced.delegateSelector

    # Check if the delegate selector has the specific tag
    not contains(delegateSelector.tags, "specific_tag")

    # Show a human-friendly error message
    msg := sprintf("Pipeline '%s' cannot be executed without selecting a delegate with tag 'specific_tag'", [input.pipeline.name])
}
```

::::info note
This policy denies pipeline execution if a step in any stage does not have the specific delegate tag selected in its delegate selector. If the tag is not selected, the policy will show a human-friendly error message.
::::

</TabItem>
<TabItem value="Connectors Governance">

```
package pipeline

# Deny pipeline execution if a specific connector is not selected
deny[msg] {
    # Find all stages ...
    stage = input.pipeline.stages[_].stage
    # ... that have steps ...
    step = stage.spec.execution.steps[_].step
    # ... that use a connector ...
    connector = step.spec.connectorRef.name
    # ... that is not in the allowed list
    not contains(allowed_connectors, connector)
    # Show a human-friendly error message
    msg := sprintf("Pipeline '%s' cannot use connector '%s'", [input.pipeline.name, connector])
}

# Connectors that can be used for pipeline execution
allowed_connectors = ["MyConnector1", "MyConnector2"]
contains(arr, elem) {
    arr[_] = elem
}
```

::::info note
You can customize the `allowed_connectors` list to include the connectors that are allowed for pipeline execution. If a pipeline uses a connector that is not in the `allowed_connectors` list, the policy will deny pipeline execution and display an error message.
::::

</TabItem>
<TabItem value="Environment Governance">

```
package pipeline

# Deny pipelines that do not use allowed environments
# NOTE: Try removing "test" from the 'allowed_environments' list to see the policy fail
deny[msg] {
    # Find all deployment stages
    stage = input.pipeline.stages[_].stage
    stage.type == "Deployment"
    # ... where the environment is not in the allow list
    not contains(allowed_environments, stage.spec.infrastructure.environment.identifier)
    # Show a human-friendly error message
    msg := sprintf("deployment stage '%s' cannot be deployed to environment '%s'", [stage.name, stage.spec.infrastructure.environment.identifier])
}

# Deny pipelines if the environment is missing completely
deny[msg] {
    # Find all deployment stages
    stage = input.pipeline.stages[_].stage
    stage.type == "Deployment"
    # ... without an environment
    not stage.spec.infrastructure.environment.identifier
    # Show a human-friendly error message
    msg := sprintf("deployment stage '%s' has no environment identifier", [stage.name])
}

# Environments that can be used for deployment
allowed_environments = ["dev","qa","prod"]

contains(arr, elem) {
    arr[_] = elem
}
```

::::info note
You can modify the `allowed_environments` list to include the environments where you want the pipeline to be executed. If the pipeline is executed in an environment that is not in the `allowed_environments` list, the policy will fail and display an error message.
::::

</TabItem>
</Tabs>

#### Freeze deployments

A deployment freeze is a period of time during which no new changes are made to a system or application. This ensures that a system or application remains stable and free of errors, particularly in the lead-up to a major event or release. During a deployment freeze, only critical bug fixes and security patches might be deployed, and all other changes are put on hold until the freeze is lifted. Deployment freezes are commonly used in software development to ensure that a system is not destabilized by the introduction of new code in new application versions.

For more information, go to [Freeze deployments](/docs/continuous-delivery/manage-deployments/deployment-freeze).

Here's a sample YAML to set up deployment freeze in Harness:

```yaml
freeze:
  name: test-freeze
  identifier: testfreeze
  entityConfigs:
    - name: project_specific
      entities:
        - type: Project
          filterType: NotEquals
          entityRefs:
            - chaosprjyps
            - CI_QS_yps
            - ypsnativehelm
        - type: Service
          filterType: All
        - type: Environment
          filterType: All
        - type: EnvType
          filterType: Equals
          entityRefs:
            - Production
  status: Disabled
  orgIdentifier: testOrgyps
  windows:
    - timeZone: Asia/Calcutta
      startTime: 2023-11-18 08:39 PM
      duration: 30m
      recurrence:
        type: Monthly
  description: ""
```

### Step 2. RBAC

To perform Role-based access control (RBAC), a Harness account administrator assigns resource-related permissions to members of Harness user groups. The **Center of Excellence** strategy and **Distributed Center of DevOps** strategy are the two most popular RBAC access control strategies used.

<details>
<summary>Center of excellence RBAC strategy</summary>
<br />

| Role Type       | Role Description                                                                                                                                                     | Harness Roles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Harness Resource Groups                                                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Program Manager | Responsible for analyzing and reporting various metrics                                                                                                              | Shared Resources->Dashboards: View & Manage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Shared Resources -> Dashboards                                                                                                                                                                                 |
| Platform Admin  | Responsible for provisioning infrastructure and managing Harness resources like Secrets, Environment, Connectors and Delegates                                       | - Shared Resources -> Secrets: View, Create/Edit, Delete & Access <br/> - Shared Resources -> Connectors: View, Create/Edit, Delete & Access <br/> - Shared Resources -> Delegates: View, Create/Edit & Delete <br/> - Shared Resources -> Delegate Configurations: View, Create/Edit & Delete <br/> - Environments: View, Create/Edit, Delete & Access <br/> - Environment Groups: View, Create/Edit, Delete & Access                                                                                                                                                                                                                                                                                                      | - Shared Resources -> Secrets <br/> - Shared Resources -> Connectors <br/> - Shared Resources -> Delegates <br/> - Shared Resources -> Delegate Configurations <br/> - Environments <br/> - Environment Groups |
| Devops Admin    | Responsible for setting up Policies to adhere to certain organizational standards, managing Users and various other things like Default Settings, Auth Settings, etc | Administrative Functions: All permissions <br/> Services: View, Create/Edit, Delete & Access <br/> Environments: View & Access <br/> Environment Groups: View & Access <br/> Shared Resources -> Templates: View, Create/Edit, Delete, Access & Copy <br/> Shared Resources -> Files: View, Create/Edit, Delete & Access <br/> Shared Resources -> Deployment Freeze: Manage, Override & Global <br/> Shared Resources -> Secrets: View & Access <br/> Shared Resources -> Connectors: View & Access <br/> Shared Resources -> Variables: View, Create/Edit & Delete <br/> Shared Resources -> Delegates: View <br/> Shared Resources -> Delegate Configurations: View <br/> Pipelines: View, Create/Edit, Delete & Execute | Administrative Functions: All Resources under it <br/> Shared Resources: All Resources under it except Dashboards <br/> Services <br/> Environments <br/> Environment Groups <br/> Pipelines                   |
| Devops Engineer | Responsible for managing Services, Templates, Files, Variables, Pipelines, Triggers, Input Sets etc.                                                                 | Services: View, Create/Edit & Access <br/> Environments: View & Access <br/> Environment Groups: View & Access <br/> Shared Resources -> Templates: View, Create/Edit, Access & Copy <br/> Shared Resources -> Secrets: View & Access <br/> Shared Resources -> Connectors: View & Access <br/> Shared Resources -> Variables: View & Create/Edit <br/> Shared Resources -> Files: View & Create/Edit <br/> Pipelines: View, Create/Edit & Execute                                                                                                                                                                                                                                                                          | Shared Resources: All Resources under it except Dashboards <br/> Services <br/> Environments <br/> Environment Groups <br/> Pipelines                                                                          |

</details>

<details>
<summary>Distributed DevOps strategy</summary>
<br />

| Role Type               | Role Description                                                                                                                                                                                                                                                                    | Harness Roles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Harness Resource Groups                                                                     | Resource Scope                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Harness Admin           | Responsible for managing Users and various other things like Default Settings, Auth Settings, etc                                                                                                                                                                                   | Administrative Functions: All permissions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Administrative Functions: All Resources under it                                            | All (including all Organizations and Projects) |
| Project DevOps Admin    | Responsible for provisioning infrastructure and managing Harness resources like Secrets, Environment, Connectors and Delegates, setting up Policies to adhere to certain organizational standards and keeping an eye on all the entities of an Organization within Harness Platform | Services: View, Create/Edit, Delete & Access <br/> Shared Resources -> Templates: View, Create/Edit, Delete, Access & Copy <br/> Shared Resources -> Files: View, Create/Edit, Delete & Access <br/> Shared Resources -> Deployment Freeze: Manage, Override & Global <br/> Shared Resources -> Secrets: View, Create/Edit, Delete & Access <br/> Shared Resources -> Connectors: View, Create/Edit, Delete & Access <br/> Shared Resources -> Delegates: View, Create/Edit & Delete <br/> Shared Resources -> Delegate Configurations: View, Create/Edit & Delete <br/> Environments: View, Create/Edit, Delete & Access <br/> Environment Groups: View, Create/Edit, Delete & Access <br/> Shared Resources -> Variables: View, Create/Edit & Delete <br/> Pipelines: View, Create/Edit, Delete & Execute <br/> Shared Resources -> Dashboards: View & Manage | Shared Resources <br/> Services <br/> Environments <br/> Environment Groups <br/> Pipelines | Specified Organizations (and their Projects)   |
| Project DevOps Engineer | Responsible for managing Services, Templates, Files, Variables, Pipelines, Triggers, Input Sets etc. of an Organization within Harness Platform                                                                                                                                     | Services: View, Create/Edit & Access <br/> Shared Resources -> Templates: View, Create/Edit, Access & Copy <br/> Shared Resources -> Secrets: View & Access <br/> Shared Resources -> Connectors: View & Access <br/> Shared Resources -> Variables: View & Create/Edit <br/> Shared Resources -> Files: View & Create/Edit <br/> Environments: View & Access <br/> Environment Groups: View & Access <br/> Pipelines: View, Create/Edit & Execute <br/> Shared Resources -> Dashboards: View                                                                                                                                                                                                                                                                                                                                                                   | Shared Resources <br/> Services <br/> Environments <br/> Environment Groups <br/> Pipelines | Specified Organizations (and their Projects)   |

</details>

<Tabs>
<TabItem value="Center of Excellence">

<Tabs>
<TabItem value="Program Manager">

**Roles**
![Access Control Roles for Program Manager](static/coe-rbac/account-manager-roles.png)

**Resource Groups**
![Resource Groups for Program Manager](static/coe-rbac/account-manager-resource-groups.png)

</TabItem>
<TabItem value="Platform Admin">

**Roles**
![Access Control Roles for Platform Admin](static/coe-rbac/platform-admin-roles1.png)
![Access Control Roles for Platform Admin](static/coe-rbac/platform-admin-roles2.png)
![Access Control Roles for Platform Admin](static/coe-rbac/platform-admin-roles3.png)

**Resource Groups**
![Resource Groups for Platform Admin](static/coe-rbac/platform-admin-resource-groups.png)

</TabItem>
<TabItem value="DevOps Admin">

**Roles**
![Access Control Roles for DevOps Admin](static/coe-rbac/devops-admin-roles1.png)
![Access Control Roles for DevOps Admin](static/coe-rbac/devops-admin-roles2.png)
![Access Control Roles for DevOps Admin](static/coe-rbac/devops-admin-roles3.png)
![Access Control Roles for DevOps Admin](static/coe-rbac/devops-admin-roles4.png)

**Resource Groups**
![Resource Groups for DevOps Admin](static/coe-rbac/devops-admin-resource-groups1.png)
![Resource Groups for DevOps Admin](static/coe-rbac/devops-admin-resource-groups2.png)

</TabItem>
<TabItem value="DevOps Engineer">

**Roles**
![Access Control Roles for DevOps Engineer](static/coe-rbac/devops-engineer-roles1.png)
![Access Control Roles for DevOps Engineer](static/coe-rbac/devops-engineer-roles2.png)
![Access Control Roles for DevOps Engineer](static/coe-rbac/devops-engineer-roles3.png)

**Resource Groups**
![Resource Groups for DevOps Admin](static/coe-rbac/devops-engineer-resource-groups1.png)
![Resource Groups for DevOps Admin](static/coe-rbac/devops-engineer-resource-groups2.png)

</TabItem>
</Tabs>

</TabItem>
<TabItem value="Distruibuted DevOps">

<Tabs>
<TabItem value="Harness Admin">

**Roles**
![Access Control Roles for Harness Admin](static/dd-rbac/harness-admin-roles.png)

**Resource Groups**
![Resource Groups for Program Manager](static/dd-rbac/harness-admin-resource-groups.png)

</TabItem>
<TabItem value="Project DevOps Admin">

**Roles**
![Access Control Roles for Project DevOps Admin](static/dd-rbac/project-devops-admin-roles1.png)
![Access Control Roles for Project DevOps Admin](static/dd-rbac/project-devops-admin-roles2.png)

**Resource Groups**
![Resource Groups for Project DevOps Admin](static/dd-rbac/project-devops-admin-resource-groups1.png)
![Resource Groups for Project DevOps Admin](static/dd-rbac/project-devops-admin-resource-groups2.png)

</TabItem>
<TabItem value="Project DevOps Engineer">

**Roles**
![Access Control Roles for Project DevOps Engineer](static/dd-rbac/project-devops-engineer-roles1.png)
![Access Control Roles for Project DevOps Engineer](static/dd-rbac/project-devops-engineer-roles2.png)
![Access Control Roles for Project DevOps Engineer](static/dd-rbac/project-devops-engineer-roles3.png)

**Resource Groups**
![Resource Groups for Project DevOps Engineer](static/dd-rbac/project-devops-engineer-resource-groups1.png)
![Resource Groups for Project DevOps Engineer](static/dd-rbac/project-devops-engineer-resource-groups2.png)

</TabItem>
</Tabs>

</TabItem>
</Tabs>

For more information, go to

Take a look at [Role-based access control (RBAC) in Harness](/docs/platform/role-based-access-control/rbac-in-harness/#configure-rbac-in-harness) article to configure RBAC in Harness

### Step 3. Continuous Verification

Harness Continuous Verification (CV) is a critical tool in the deployment pipeline that validates deployments by integrating with APMs and logging tools to verify that the deployment is running safely and efficiently.

Harness CV applies machine learning algorithms to every deployment for identifying normal behavior. This allows Harness to identify and flag anomalies in future deployments. During the **Verify** step, Harness CV automatically triggers a rollback if anomalies are found.

**Deployment strategies for Continuous Verification**:

- Continuous Verification type
  - Auto
  - Rolling Update
  - Canary
  - Blue Green
  - Load Test
- Sensitivity
- Duration
- Artifact tag
- Fail on no analysis
- Health Source

For more information, go to [Configure CV](https://developer.harness.io/docs/category/configure-cv).

## Phase 5: SSO-enabled DevOps with Infrastructure as Code (IaC)

### Step 1. SSO

Harness supports Single Sign-On (SSO) with SAML, integrating with your SAML SSO provider to enable you to log your users into Harness as part of your SSO infrastructure. The user can choose between a variety of SSO integrations according to their needs.

For more information, go to [Authentication](https://developer.harness.io/docs/category/authentication).

### Step 2. Templatization & Automation

#### Templatization

Harness enables you to add templates to create reusable logic and Harness entities (like steps, stages, and pipelines) in your pipelines. You can link templates in your pipelines or share them with your teams for improved efficiency.

Templates enhance developer productivity, reduce onboarding time, and enforce standardization across the teams that use Harness. Here's an example template that builds a JavaScript application, runs unit tests and pushes to docker registry.

<details>
<summary>Sample Golden Deployment Pipeline Template</summary>
<br />

```yaml
template:
  name: Golden Deploy
  identifier: Golden_Deploy
  type: Stage
  projectIdentifier: Platform_Demo
  orgIdentifier: default
  spec:
    type: Deployment
    spec:
      serviceConfig:
        serviceDefinition:
          type: Kubernetes
          spec:
            artifacts:
              sidecars: []
              primary:
                type: Gcr
                spec:
                  connectorRef: TestGCP_inherit
                  imagePath: sales-209522/platform-demo
                  registryHostname: us.gcr.io
                  tag: <+pipeline.sequenceId>
            manifestOverrideSets: []
            manifests:
              - manifest:
                  identifier: HarnessAppDemoManifests
                  type: K8sManifest
                  spec:
                    store:
                      type: Github
                      spec:
                        connectorRef: Platformdemo2
                        gitFetchType: Branch
                        paths:
                          - k8s/manifests/namespace.yml
                          - k8s/manifests/volumeclaim-creation.yml
                          - k8s/manifests/nodeport-deployment.yml
                          - k8s/manifests/ingress-deployment.yml
                          - k8s/manifests/app-deployment.yml
                        branch: main
                    skipResourceVersioning: false
              - manifest:
                  identifier: values
                  type: Values
                  spec:
                    store:
                      type: Github
                      spec:
                        connectorRef: Platformdemo2
                        gitFetchType: Branch
                        paths:
                          - k8s/values/values.yml
                        branch: main
        serviceRef: HarnessPlatformDemoApp
      infrastructure:
        environmentRef: k8sProduction
        infrastructureDefinition:
          type: KubernetesDirect
          spec:
            connectorRef: platformdemok8s
            namespace: <+pipeline.variables.githublogin>
            releaseName: <+pipeline.variables.githublogin>
        allowSimultaneousDeployments: true
        infrastructureKey: ""
      execution:
        steps:
          - step:
              type: HarnessApproval
              name: Approve this version
              identifier: Keep_this_Version
              spec:
                approvalMessage: Please review the following information and approve the pipeline progression
                includePipelineExecutionHistory: false
                approvers:
                  userGroups:
                    - account.Field_Engineering
                    - account.Harness_Partners
                  minimumCount: 2
                  disallowPipelineExecutor: false
                approverInputs: []
              timeout: 30m
              failureStrategies:
                - onFailure:
                    errors:
                      - Authorization
                    action:
                      type: StageRollback
              when:
                stageStatus: Success
          - step:
              name: Rollout Deployment
              identifier: rolloutDeployment
              type: K8sRollingDeploy
              timeout: 10m
              spec:
                skipDryRun: false
          - stepGroup:
              name: Service Reliability
              identifier: Service_Reliability
              steps:
                - step:
                    type: Http
                    name: API Verification
                    identifier: Smart_Verification
                    spec:
                      url: http://<+pipeline.variables.externalDnsName>/<+pipeline.variables.githublogin>/data/api.php?func=verif
                      method: GET
                      headers: []
                      outputVariables:
                        - name: message
                          value: <+json.object(httpResponseBody).message>
                          type: String
                        - name: level
                          type: String
                          value: <+json.object(httpResponseBody).level>
                      assertion: <+json.object(httpResponseBody).level> == "ok"
                      requestBody: test test test
                      inputVariables: []
                    timeout: 30s
                    failureStrategies:
                      - onFailure:
                          errors:
                            - AllErrors
                          action:
                            type: Ignore
                - step:
                    type: Verify
                    name: Logs-Metrics Verification
                    identifier: verify_dev
                    spec:
                      type: Rolling
                      spec:
                        sensitivity: MEDIUM
                        duration: 5m
                        deploymentTag: <+serviceConfig.artifacts.primary.tag>
                    timeout: 2h
                    failureStrategies:
                      - onFailure:
                          errors:
                            - Verification
                          action:
                            type: StageRollback
                            spec:
                              timeout: 2h
                              onTimeout:
                                action:
                                  type: StageRollback
                      - onFailure:
                          errors:
                            - Unknown
                          action:
                            type: ManualIntervention
                            spec:
                              timeout: 2h
                              onTimeout:
                                action:
                                  type: Ignore
                    when:
                      stageStatus: Success
                      condition: <+pipeline.stages.Image_Deployment.spec.execution.steps.Service_Reliability.steps.Smart_Verification.output.outputVariables.level> == "error"
        rollbackSteps:
          - step:
              name: Rollback Rollout Deployment
              identifier: rollbackRolloutDeployment
              type: K8sRollingRollback
              timeout: 10m
              spec:
                skipDryRun: false
      serviceDependencies: []
    failureStrategies:
      - onFailure:
          errors:
            - AllErrors
          action:
            type: StageRollback
    variables: []
    when:
      pipelineStatus: Success
  versionLabel: "6.0"
```

</details>

#### Terraform Automation

The Harness Terraform Provider enables automated lifecycle management of the Harness Platform using Terraform. You can onboard onto Harness on day 1 and also make day 2 changes using this Provider. Currently the following Harness resources can be managed via the Provider.

For more information, go to [Onboard with Terraform Provider](https://developer.harness.io/tutorials/platform/onboard-terraform-provider).

<details>
<summary>Terraform Script to create harness resources (Services, Environments, Pipelines)</summary>
<br />

```yaml
variable "platform_api_key" {}
variable "accountId" {}
variable "endpoint" {}
variable "projectIdentifier" {}
variable "orgIdentifier" {}
variable "connectorIdentifier" {}
variable "k8sMasterUrl" {}
variable "secretIdentifier" {}
variable "secretValue" {}
variable "serviceIdentifier" {}
variable "envIdentifier" {}
variable "infraIdentifier" {}
variable "pipelineIdentifier" {}
terraform {
    required_providers {
        harness = {
            source = "harness/harness"
            version = "0.16.1"
        }
    }
}
provider "harness" {
    endpoint   = "${var.endpoint}"
    account_id = "${var.accountId}"
    platform_api_key    = "${var.platform_api_key}"
}
resource "harness_platform_project" "test" {
  identifier = "${var.projectIdentifier}"
  name       = "${var.projectIdentifier}"
  org_id     = "${var.orgIdentifier}"
  color      = "#0063F7"
}
resource "time_sleep" "wait_30_seconds" {
  depends_on = [harness_platform_project.test]
  create_duration = "30s"
}
resource "harness_platform_secret_text" "inline" {
  depends_on = [harness_platform_project.test, time_sleep.wait_30_seconds]
  identifier  = "${var.secretIdentifier}"
  name        = "${var.secretIdentifier}"
  description = "example"
  tags        = ["foo:bar"]
  org_id      = "${var.orgIdentifier}"
  project_id  = "${var.projectIdentifier}"
  secret_manager_identifier = "harnessSecretManager"
  value_type                = "Inline"
  value                     = "${var.secretValue}"
}
resource "harness_platform_connector_kubernetes" "serviceAccount" {
  depends_on = [harness_platform_project.test, harness_platform_secret_text.inline]
  identifier  = "${var.connectorIdentifier}"
  org_id      = "${var.orgIdentifier}"
  project_id  = "${var.projectIdentifier}"
  name        = "${var.connectorIdentifier}"
  description = "description"
  tags        = ["foo:bar"]
  service_account {
    master_url                = "${var.k8sMasterUrl}"
    service_account_token_ref = "${var.secretIdentifier}"
  }
}
resource "harness_platform_service" "example" {
  depends_on = [harness_platform_project.test]
  identifier  = "${var.serviceIdentifier}"
  org_id      = "${var.orgIdentifier}"
  project_id  = "${var.projectIdentifier}"
  name        = "${var.serviceIdentifier}"
  description = "description"
  tags        = ["foo:bar"]
  yaml = <<-EOT
                service:
                  name: "${var.serviceIdentifier}"
                  identifier: "${var.serviceIdentifier}"
                  tags: {}
                  serviceDefinition:
                    spec:
                      manifests:
                        - manifest:
                            identifier: manifest
                            type: K8sManifest
                            spec:
                              store:
                                type: Git
                                spec:
                                  connectorRef: org.GitConnectorForAutomationTest
                                  gitFetchType: Branch
                                  paths:
                                    - ng-automation/k8s/templates/
                                  branch: master
                              valuesPaths:
                                - ng-automation/k8s/values.yaml
                              skipResourceVersioning: false
                      artifacts:
                        primary:
                          primaryArtifactRef: <+input>
                          sources:
                            - spec:
                                connectorRef: org.DockerConnectorForAutomationTest
                                imagePath: library/nginx
                                tag: latest
                              identifier: artifact
                              type: DockerRegistry
                    type: Kubernetes
            EOT
}
resource "harness_platform_environment" "example" {
  depends_on = [harness_platform_project.test]
  identifier = "${var.envIdentifier}"
  name       = "${var.envIdentifier}"
  org_id     = "${var.orgIdentifier}"
  project_id = "${var.projectIdentifier}"
  tags       = ["foo:bar", "baz"]
  type       = "PreProduction"
  yaml = <<-EOT
                environment:
                  name: "${var.envIdentifier}"
                  identifier: "${var.envIdentifier}"
                  description: ""
                  tags: {}
                  type: PreProduction
                  orgIdentifier: "${var.orgIdentifier}"
                  projectIdentifier: "${var.projectIdentifier}"
                  variables: []
      EOT
}
resource "harness_platform_infrastructure" "example" {
  depends_on = [harness_platform_project.test, harness_platform_environment.example]
  identifier      = "${var.infraIdentifier}"
  name            = "${var.infraIdentifier}"
  org_id          = "${var.orgIdentifier}"
  project_id      = "${var.projectIdentifier}"
  env_id          = "${var.envIdentifier}"
  type            = "KubernetesDirect"
  deployment_type = "Kubernetes"
  yaml            = <<-EOT
                            infrastructureDefinition:
                              name: "${var.infraIdentifier}"
                              identifier: "${var.infraIdentifier}"
                              description: ""
                              tags: {}
                              orgIdentifier: "${var.orgIdentifier}"
                              projectIdentifier: "${var.projectIdentifier}"
                              environmentRef: "${var.envIdentifier}"
                              deploymentType: Kubernetes
                              type: KubernetesDirect
                              spec:
                                connectorRef: org.KubernetesConnectorForAutomationTest
                                namespace: default
                                releaseName: release-<+INFRA_KEY>
                              allowSimultaneousDeployments: true
      EOT
}
resource "harness_platform_pipeline" "example" {
  depends_on = [harness_platform_project.test]
  identifier = "${var.pipelineIdentifier}"
  org_id     = "${var.orgIdentifier}"
  project_id = "${var.projectIdentifier}"
  name       = "${var.pipelineIdentifier}"
  yaml = <<-EOT
                pipeline:
                  name: "${var.pipelineIdentifier}"
                  identifier: "${var.pipelineIdentifier}"
                  projectIdentifier: "${var.projectIdentifier}"
                  orgIdentifier: "${var.orgIdentifier}"
                  tags: {}
                  stages:
                    - stage:
                        name: stage
                        identifier: stage
                        description: ""
                        type: Deployment
                        spec:
                          deploymentType: Kubernetes
                          service:
                            serviceRef: "${var.serviceIdentifier}"
                            serviceInputs:
                              serviceDefinition:
                                type: Kubernetes
                                spec:
                                  artifacts:
                                    primary:
                                      primaryArtifactRef: <+input>
                                      sources: <+input>
                          environment:
                            environmentRef: "${var.envIdentifier}"
                            deployToAll: false
                            infrastructureDefinitions:
                              - identifier: "${var.infraIdentifier}"
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
                            rollbackSteps:
                              - step:
                                  name: Rollback Rollout Deployment
                                  identifier: rollbackRolloutDeployment
                                  type: K8sRollingRollback
                                  timeout: 10m
                                  spec:
                                    pruningEnabled: false
                        tags: {}
                        failureStrategies:
                          - onFailure:
                              errors:
                                - AllErrors
                              action:
                                type: StageRollback
                        variables:
                          - name: resourceNamePrefix
                            type: String
                            description: ""
                            value: qwe
  EOT
}
```

</details>

<details>
<summary>YAML to use the above Terraform script in Harness pipeline as custom stage</summary>
<br />

```yaml
pipeline:
  tags: {}
  stages:
    - stage:
        name: Create Resource
        identifier: Create_Resource
        description: Create harness resources using Harness Terraform Provider
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: TerraformPlan
                  name: TerraformPlan
                  identifier: TerraformPlan
                  spec:
                    provisionerIdentifier: createResource
                    configuration:
                      command: Apply
                      configFiles:
                        store:
                          spec:
                            connectorRef: org.GitHubRepoConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            folderPath: automation/terraform/K8sAutomation
                          type: Github
                      varFiles:
                        - varFile:
                            spec:
                              content: |-
                                platform_api_key = "Your Platform Api Token"
                                accountId = "accountID"
                                endpoint = "https://app.harness.io/gateway"
                                projectIdentifier = "Project Name to be created"
                                orgIdentifier = "Org where you want this project to be"
                                connectorIdentifier = "K8s Connector Identifier"
                                k8sMasterUrl = "K8s Master Url"
                                serviceIdentifier = "Service Identifier"
                                envIdentifier = "Environment Identifier"
                                infraIdentifier = "Infra Definition Identifier"
                                pipelineIdentifier = "Pipeline Identifier"
                                secretIdentifier = "Secret Identifier"
                                secretValue = "K8s ServiceAccount Token Secret Value"
                            identifier: terraformVariables
                            type: Inline
                      secretManagerRef: harnessSecretManager
                  timeout: 10m
              - step:
                  type: TerraformApply
                  name: TerraformApply
                  identifier: TerraformApply
                  spec:
                    configuration:
                      type: InheritFromPlan
                    provisionerIdentifier: createResource
                  timeout: 10m
        tags: {}
  identifier: Harness_Terraform_Provider
  name: Harness Terraform Provider
  delegateSelectors: []
  projectIdentifier: NGPipeAutoterraform_providerVcP4LI2gPm
  orgIdentifier: Ng_Pipelines_K8s_Organisations
```

</details>
