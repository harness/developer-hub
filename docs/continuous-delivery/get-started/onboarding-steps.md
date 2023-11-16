---
title: CD Onboarding Path
description: Get your first Harness CD pipeline ready in no time
sidebar_position: 2
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Get your first Harness CD pipeline ready in no time.

| **Step**                                              | **Details**                                                      | **Documentation Link**                                                                                                                | **Demo Video**                                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Account & Entities Setup                               | Create Organization, Project, Invite Initial Users               | [Create organizations and projects](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization/)    |                                                                                             |
| Installing Delegate                                    | Kubernetes, Docker                                               | [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/)                 | [Watch Video](https://developer.harness.io/docs/platform/delegates/install-delegates/overview/) |
| Installing Secret Manager / Migrating Existing Secrets | AWS KMS, HashiCorp, Azure Key vault, Google KMS                  | [Add a secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-secrets-manager/)                    |                                                                                             |
| Adding Artifact Source                                 | Docker Registry, GCR, GCS, ACR, Azure DevOps Artifacts, ECR, etc | [CD artifact sources](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/)        |                                                                                             |
| Service Definition and Variables                       | Runtime Inputs or expressions                                                         | [Create services](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/)             | [Watch Video](https://youtu.be/02RIvOGd0zg?si=HnK4wHaxLUWEkoFK) |
| Environment Definitions                                | Service Override                                        | [Create environments](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/) | [Watch Video](https://youtu.be/02RIvOGd0zg?si=HnK4wHaxLUWEkoFK) |
| Simple Pipeline                                        | stage, service, environment, infrastructure                      | [CD pipeline modeling overview](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-modeling-overview/)     | [Watch Video](https://youtu.be/k-f1nbgGkww?si=_EW6Lcr1qxzrQNVM) |
| Deployment Strategy                                    | Rollback, Blue Green, Canary                                        | [Deployment concepts and strategies](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/)   | [Watch Video](https://youtu.be/VJjDbwoxLfM?feature=shared)                                      |
| Triggers & Input Sets                                  | SCM triggers, Artifact triggers                                  | [Pipeline Triggers](https://developer.harness.io/tutorials/cd-pipelines/trigger/)                                                     | [Watch Video](https://youtu.be/nIPjsANiKRk?si=euQzhaYGfnPaacUe) |
| Approvals & Governance (OPA)                                              | Harness Approval, JIRA Approval                                  | [Approvals](https://developer.harness.io/tutorials/cd-pipelines/approvals/)                                                           | [Watch Video](https://youtu.be/KtE6f5-QHrI?si=zYhrXnedmf2j0bUi) |
| RBAC                                                   | CoE, Distributed Center of DevOps                   | [Role-based access control (RBAC) in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/)  | [Watch Video](https://youtu.be/vIQfpRrES44?si=Du5OAej2t2Phu7Hg) |
| Continuous Verification                                                   | Auto, Rolling Update, Canary, Blue Green, Load Test | [Harness Continuous Verification (CV) overview](https://developer.harness.io/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step/)  |  |
| SSO                                                    | SAML SSO with Harness, Okta, etc                                 | [Single Sign-On (SSO) with SAML](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/)                      |                                                                                             |
| Templatization & Automation                                         | Templates                                                        | [Templates overview](https://developer.harness.io/docs/platform/templates/template/)                                                  | [Watch Video](https://youtu.be/U-n3VK_RoQc?si=dfokJq6pa6017mqX) |

## Phase 1: Deploy to QA
### Step 1. Account & Entities Setup

Harness Organizations (Orgs) allow you to group projects that share the same goal. For example, all projects for a business unit or division.

A Harness project is a group of Harness modules and their pipelines. For example, a project might have a Harness CI pipeline to build code and push an image to a repo and a Harness CD pipeline to pull and deploy that image to a cloud platform.

- **Create a Harness org**

1. In Harness, in Account Settings click Organizations.
2. Click **+ New Organization**. The new organization settings appear.
3. In Name, enter a name for your organization.
4. Enter Description, and Tags for your new org.
5. Click Save and Continue.

- **Invite collaborators**

1. In Invite People to Collaborate, type a member's name and select it.
2. In Role, select the role the member will have in this org, such as Organization Admin or Organization Member.
3. Click Add.
   Members receive invites via their email addresses.
   You can always invite more members from within the Org later.
4. Click Finish. The Org is added to the list in Account Settings Organizations.

- **Create a project**

1. In Harness, go to Home and click Projects.
2. Click +Project.
3. Name the project, and select a color. The Id of the project is generated automatically. See Harness Entity Reference.
4. In Organization, select the org you created.
5. Add a description and tags, and then click Save and Continue.
6. In Invite Collaborators, type a member's name and select it.
7. Select a role for the member, and click Add.
8. Click Save and Continue to create the project.

### Step 2. Installing Delegate

Harness Delegate is a service you run in your local network or VPC to connect your artifacts, infrastructure, collaboration, verification, and other providers, with Harness Manager. The first time you connect Harness to a third-party resource, Harness Delegate is installed in your target infrastructure, for example, a Kubernetes cluster. After the delegate is installed, you connect to third-party resources. The delegate performs all operations, including deployment and integration.

Please follow the [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/) article to install delegate in your kubernetes cluster or docker container.

### Step 3. Installing Secret Manager / Migrating Existing Secrets

Harness includes a built-in Secret Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Connectors and Pipelines. Follow the [Add a secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-secrets-manager/) article to add a secret manager.

Looking for specific secret managers? Go to:

- [Add an AWS KMS Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager)
- [Add a HashiCorp Vault Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault)
- [Add an Azure Key Vault Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/azure-key-vault)
- [Add Google KMS as a Harness Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager)
- [Add an AWS Secrets Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-an-aws-secret-manager)

### Step 4. Adding Artifact Source

In DevOps, an artifact source is a location where the compiled, tested, and ready-to-deploy software artifacts are stored. These artifacts could be container images, compiled binary files, executables, or any other software components that are part of the application.

To add an artifact source, you add a Harness connector to the artifact platform (DockerHub, GCR, Artifactory, etc.) and then add an artifact source to a Harness service that defines the artifact source name, path, tags, and so on.

The list of atifact sources that you can use in your Harness services are listed below:

- [Docker](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#docker)
- [Google Container Registry (GCR)](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#google-container-registry-gcr)
- [Google Cloud Storage (GCS)](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#google-cloud-storage-gcs)
- [Google Artifact Registry](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#google-artifact-registry)
- [Azure DevOps Artifacts](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#azure-devops-artifacts)
- [Azure Container Registry (ACR)](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#azure-container-registry-acr)
- [Amazon Elastic Container Registry (ECR)](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#amazon-elastic-container-registry-ecr)
- [Amazon S3 Cloud Storage](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#amazon-s3-cloud-storage)
- [Amazon EC2 AMIs](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#amazon-ec2-amis)
- [Nexus](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#nexus)
- [Artifactory](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#artifactory)
- [Bamboo](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#bamboo)
- [Github packages](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#github-packages)
- [Custom artifact source](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#custom-artifact-source)

### Step 5. Service and Environments Definition

- **Services** represent your microservices and other workloads. Each service contains a Service Definition that defines your deployment artifacts, manifests or specifications, configuration files, and service-specific variables. Follow [this](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/#create-a-service) article to create your own service.

Services are often configured using runtime inputs or expressions, so you can change service settings for different deployment scenarios at pipeline runtime. To use runtime input services with inputs and epressions, take a look at [this](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/#using-runtime-input-services-with-inputs-and-expressions).

<details>
<summary>Here's the YAML for a Kubernetes service:</summary>
<br />

```yaml
service:
  name: Account_level_Service
  identifier: Account_level_Service
  tags: {}
  serviceDefinition:
    spec:
        manifests:
            - manifest:
				identifier: Kubernetes
				type: K8sManifest
				spec:
                  store:
					type: Github
					spec:
						connectorRef: account.Public_Github
						gitFetchType: Branch
						paths:
							- content/en/examples/application/nginx-app.yaml
							repoName: kubernetes/website
							branch: main
							skipResourceVersioning: false
                    type: Kubernetes
```

</details>

:::info note
Given below are some example ECS Fargate Deployment Services
:::

```mdx-code-block
<Tabs>
<TabItem value="Create Service">
```

```yaml
launchType: FARGATE
serviceName: <+stage.variables.serviceName>
desiredCount: <+stage.variables.desiredCount>
networkConfiguration:
  awsvpcConfiguration:
    securityGroups:
    - sg-afc848e7 
    subnets:
    - subnet-9757dc98
    assignPublicIp: ENABLED 
deploymentConfiguration:
  maximumPercent: 100
  minimumHealthyPercent: 0
loadBalancers:
- targetGroupArn: <+targetGroupArn>
  containerName: nginx
  containerPort: 8080
```

```mdx-code-block
</TabItem>
<TabItem value="Put Scaling Policy">
```

```yaml
scalableDimension: ecs:service:DesiredCount
serviceNamespace: ecs
policyName: P1
policyType: TargetTrackingScaling
targetTrackingScalingPolicyConfiguration:
  targetValue: 60
  predefinedMetricSpecification:
    predefinedMetricType: ECSServiceAverageCPUUtilization
  scaleOutCooldown: 300
  scaleInCooldown: 300
```

```mdx-code-block
</TabItem>
<TabItem value="Register Task Definition">
```

```yaml
ipcMode:
executionRoleArn: arn:aws:iam::479370281431:role/ecsTaskExecutionRole
containerDefinitions:
- dnsSearchDomains:
  environmentFiles:
  logConfiguration:
    logDriver: awslogs
    secretOptions:
    options:
      awslogs-group: "/aws/ecs/containerinsights/ecs-cluster-3/performance"
      awslogs-region: us-east-1
      awslogs-stream-prefix: ecs
  entryPoint:
  portMappings:
  - hostPort: 8080
    protocol: tcp
    containerPort: 8080
  command:
  linuxParameters:
  cpu: 0
  environment: []
  resourceRequirements:
  ulimits:
  dnsServers:
  mountPoints: []
  workingDirectory:
  secrets:
  dockerSecurityOptions:
  memory:
  memoryReservation: 128
  volumesFrom: []
  stopTimeout:
  image: <+artifact.image>
  startTimeout:
  firelensConfiguration:
  dependsOn:
  disableNetworking:
  interactive:
  healthCheck:
  essential: true
  links:
  hostname:
  extraHosts:
  pseudoTerminal:
  user:
  readonlyRootFilesystem:
  dockerLabels:
  systemControls:
  privileged:
  name: nginx
placementConstraints: []
memory: '512'
taskRoleArn: arn:aws:iam::479370281431:role/ecsTaskExecutionRole
family: <+stage.variables.taskName>
pidMode:
requiresCompatibilities:
- FARGATE
networkMode: awsvpc
runtimePlatform:
cpu: '256'
inferenceAccelerators:
proxyConfiguration:
volumes: []
```

```mdx-code-block
</TabItem>
<TabItem value="Register Scalable Target">
```

```yaml
serviceNamespace: ecs
scalableDimension: ecs:service:DesiredCount
minCapacity: 1
maxCapacity: 3
```

```mdx-code-block
</TabItem>
</Tabs>
```

- **Environments** represent your deployment targets (QA, Prod, etc). Each environment contains one or more Infrastructure Definitions that list your target clusters, hosts, namespaces, etc. To create your own environments, go through the [Create environments](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/) article.

- **Service Override** ([Article Link](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/#create-service-overrides))
  In DevOps, it is common to have multiple environments, such as development, testing, staging, and production. Each environment might require different configurations or settings for the same service. For example, in the development environment, a service may need to use a local database for testing, while in the production environment, it should use a high-availability database cluster. To enable the same service to use different environment settings, DevOps teams can override service settings for each environment.

<details>
<summary>Example environment.yaml</summary>
<br />

```yaml
environment:
  name: Global Example
  identifier: Global_Example
  tags: {}
  type: PreProduction
  variables: []
```

</details>

### Step 6. Simple Pipeline
To create a simple CD pipeline, follow the steps:
- Create a pipeline.
- Add a CD stage.
- Define a service.
- Target an environment and infrastructure.
- Select execution steps.
- You can model visually, using code, or via the REST API.

<docvideo src="https://www.youtube.com/watch?v=irDr4JlbmLY" />

Here's a simple CD pipeline having a Kubernetes type deployment:

<details>
<summary>CD Pipeline YAML</summary>
<br />

```yaml
pipeline:
  name: Rolling Deployment
  identifier: Rolling_Deployment
  stages:
    - stage:
        name: stage-1
        identifier: stage1
        type: Deployment
        spec:
          serviceConfig:
            serviceDefinition:
              type: Kubernetes
              spec:
                artifacts:
                  primary:
                    type: Gcr
                    spec:
                      connectorRef: org.GCRConnectorForAutomationTest
                      imagePath: qa-target/todolist
                      tag: v4.1
                      registryHostname: us.gcr.io
                  sidecars: []
                manifests:
                  - manifest:
                      identifier: manifestIdentifier
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            repoName: ""
                            paths:
                              - ng-automation/k8s/templates/
                        skipResourceVersioning: ""
                      type: K8sManifest
                  - manifest:
                      identifier: valuesmanifest
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            repoName: ""
                            paths:
                              - ng-automation/k8s/valuesWithClusterTypeService.yaml
                      type: Values
            service:
              name: service2
              identifier: service2
          infrastructure:
            infrastructureDefinition:
              type: KubernetesDirect
              spec:
                connectorRef: org.KubernetesConnectorForAutomationTest
                namespace: cdp-k8s-qa-sanity
                releaseName: releasename-985388
            environment:
              name: env2
              identifier: env2
              type: Production
            allowSimultaneousDeployments: true
          execution:
            steps:
              - step:
                  type: K8sRollingDeploy
                  name: K8sRolling
                  identifier: K8sRolling
                  spec:
                    skipDryRun: false
                  timeout: 5m
            rollbackSteps: []
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        variables:
          - name: resourceNamePrefix
            type: String
            default: ""
            value: cdpsanitysuites-rollingdeploy
  projectIdentifier: K8s_Pipelines
  orgIdentifier: Ng_Pipelines_K8s_Organisations
```

</details>

## Phase 2: Deploy to Staging

### Step 1. Deployment Strategy
You have likely heard terms like blue/green and canary when it comes to deploying code and applications into production. These are common deployment strategies, available in Harness CD as stage strategies, along with others.

<docvideo src="https://www.youtube.com/watch?v=o3MoWAY27wE" />

The deployment strategies provided by Harness are:
- Rolling Deployment
- Blue Green Deplomyment
- Canary Deployment
- Basic Deployments
- Multi-service Deployments

:::info note
If you are using Canary Deployment, make sure you heat up your resources because the canary deployment strategy will not deploy on the existing cluster, rather it will spin up a new cluster and deploy it there.
:::

```mdx-code-block
<Tabs>
<TabItem value="Rolling">
```

```yaml
pipeline:
  name: Rolling Deployment
  identifier: Rolling_Deployment
  stages:
    - stage:
        name: stage-1
        identifier: stage1
        type: Deployment
        spec:
          serviceConfig:
            serviceDefinition:
              type: Kubernetes
              spec:
                artifacts:
                  primary:
                    type: Gcr
                    spec:
                      connectorRef: org.GCRConnectorForAutomationTest
                      imagePath: qa-target/todolist
                      tag: v4.1
                      registryHostname: us.gcr.io
                  sidecars: []
                manifests:
                  - manifest:
                      identifier: manifestIdentifier
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            repoName: ""
                            paths:
                              - ng-automation/k8s/templates/
                        skipResourceVersioning: ""
                      type: K8sManifest
                  - manifest:
                      identifier: valuesmanifest
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            repoName: ""
                            paths:
                              - ng-automation/k8s/valuesWithClusterTypeService.yaml
                      type: Values
            service:
              name: service2
              identifier: service2
          infrastructure:
            infrastructureDefinition:
              type: KubernetesDirect
              spec:
                connectorRef: org.KubernetesConnectorForAutomationTest
                namespace: cdp-k8s-qa-sanity
                releaseName: releasename-985388
            environment:
              name: env2
              identifier: env2
              type: Production
            allowSimultaneousDeployments: true
          execution:
            steps:
              - step:
                  type: K8sRollingDeploy
                  name: K8sRolling
                  identifier: K8sRolling
                  spec:
                    skipDryRun: false
                  timeout: 5m
            rollbackSteps: []
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
        variables:
          - name: resourceNamePrefix
            type: String
            default: ""
            value: cdpsanitysuites-rollingdeploy
  projectIdentifier: K8s_Pipelines
  orgIdentifier: Ng_Pipelines_K8s_Organisations
```

```mdx-code-block
</TabItem>
<TabItem value="Blue Green">
```

```yaml
pipeline:
  name: Blue Green Deployment
  identifier: Blue_Green_Deployment
  description: ""
  tags: {}
  stages:
    - stage:
        name: stage1
        identifier: stage1
        description: ""
        type: Deployment
        spec:
          serviceConfig:
            serviceDefinition:
              spec:
                artifacts:
                  sidecars: []
                  primary:
                    type: Gcr
                    spec:
                      connectorRef: org.GCRConnectorForAutomationTest
                      imagePath: qa-target/todolist
                      tag: v4.1
                      registryHostname: us.gcr.io
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
                            branch: master
                            paths:
                              - ng-automation/k8s/templates/
                  - manifest:
                      identifier: values
                      type: Values
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            paths:
                              - ng-automation/k8s/valuesWithClusterTypeService.yaml
              type: Kubernetes
            service:
              name: service3
              identifier: service3
            stageOverrides:
              manifests: []
          infrastructure:
            environment:
              name: env3
              identifier: env3
              type: PreProduction
            allowSimultaneousDeployments: true
            infrastructureDefinition:
              type: KubernetesDirect
              spec:
                connectorRef: org.KubernetesConnectorForAutomationTest
                namespace: cdp-k8s-qa-sanity
                releaseName: releasename-356323
          execution:
            steps:
              - step:
                  name: Stage Deployment
                  identifier: stageDeployment
                  type: K8sBlueGreenDeploy
                  timeout: 5m
                  spec:
                    skipDryRun: false
              - step:
                  name: Swap primary with stage service
                  identifier: bgSwapServices
                  type: K8sBGSwapServices
                  timeout: 5m
                  spec: {}
            rollbackSteps:
              - step:
                  name: Swap primary with stage service
                  identifier: rollbackBgSwapServices
                  type: K8sBGSwapServices
                  timeout: 5m
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
            value: cdpsanitysuites-trybg
  projectIdentifier: K8s_Pipelines
  orgIdentifier: Ng_Pipelines_K8s_Organisations
```

```mdx-code-block
</TabItem>
<TabItem value="Canary">
```
```yaml
pipeline:
  name: Canary Deployment
  identifier: Canary_Deployment
  description: ""
  tags: {}
  stages:
    - stage:
        name: stage1
        identifier: stage1
        description: ""
        type: Deployment
        spec:
          serviceConfig:
            serviceDefinition:
              spec:
                artifacts:
                  sidecars: []
                  primary:
                    type: Gcr
                    spec:
                      connectorRef: org.GCRConnectorForAutomationTest
                      imagePath: qa-target/todolist
                      tag: v4.1
                      registryHostname: us.gcr.io
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
                            branch: master
                            paths:
                              - ng-automation/k8s/templates/
                  - manifest:
                      identifier: values
                      type: Values
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            paths:
                              - ng-automation/k8s/valuesWithClusterTypeService.yaml
              type: Kubernetes
            service:
              name: service4
              identifier: service4
            stageOverrides:
              manifests: []
          infrastructure:
            infrastructureDefinition:
              type: KubernetesDirect
              spec:
                connectorRef: org.KubernetesConnectorForAutomationTest
                namespace: cdp-k8s-qa-sanity
                releaseName: releasename-641764
            environment:
              name: env4
              identifier: env4
              type: PreProduction
            allowSimultaneousDeployments: true
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
                        timeout: 5m
                        spec:
                          skipDryRun: false
                          instanceSelection:
                            type: Count
                            spec:
                              count: "1"
                    - step:
                        name: Canary Delete
                        identifier: canaryDelete
                        type: K8sCanaryDelete
                        timeout: 5m
                        spec: {}
              - stepGroup:
                  name: Primary Deployment
                  identifier: primaryDepoyment
                  steps:
                    - step:
                        name: Rolling Deployment
                        identifier: rollingDeployment
                        type: K8sRollingDeploy
                        timeout: 5m
                        spec:
                          skipDryRun: false
                  rollbackSteps:
                    - step:
                        name: Rolling Rollback
                        identifier: rollingRollback
                        type: K8sRollingRollback
                        timeout: 5m
                        spec: {}
            rollbackSteps: []
        tags: {}
        variables:
          - name: resourceNamePrefix
            type: String
            value: cdpsanitysuites-trycanary
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  projectIdentifier: K8s_Pipelines
  orgIdentifier: Ng_Pipelines_K8s_Organisations
```

```mdx-code-block
</TabItem>
<TabItem value="Basic">
```
```yaml
pipeline:
  name: Pipeline deployment with K8s Apply Step
  identifier: Pipeline_deployment_with_K8s_Apply_Step
  description: ""
  tags: {}
  stages:
    - stage:
        name: stage 1
        identifier: stage_1
        description: ""
        type: Deployment
        spec:
          serviceConfig:
            serviceDefinition:
              spec:
                artifacts:
                  sidecars: []
                  primary:
                    type: Gcr
                    spec:
                      connectorRef: org.GCRConnectorForAutomationTest
                      imagePath: qa-target/todolist
                      tag: v4.1
                      registryHostname: us.gcr.io
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
                            branch: master
                            paths:
                              - ng-automation/k8s/templates/
                  - manifest:
                      identifier: values
                      type: Values
                      spec:
                        store:
                          type: Git
                          spec:
                            connectorRef: org.GitConnectorForAutomationTest
                            gitFetchType: Branch
                            branch: master
                            paths:
                              - ng-automation/k8s/valuesWithClusterTypeService.yaml
              type: Kubernetes
            service:
              name: service1
              identifier: service1
            stageOverrides:
              manifests: []
          infrastructure:
            environment:
              name: env1
              identifier: env1
              type: PreProduction
            allowSimultaneousDeployments: true
            infrastructureDefinition:
              type: KubernetesDirect
              spec:
                connectorRef: org.KubernetesConnectorForAutomationTest
                namespace: cdp-k8s-qa-sanity
                releaseName: releasename-148682
          execution:
            steps:
              - step:
                  type: K8sApply
                  name: apply step
                  identifier: apply_step
                  timeout: 5m
                  spec:
                    filePaths:
                      - namespace.yaml
                      - service.yaml
                    skipDryRun: false
                    skipSteadyStateCheck: false
            rollbackSteps: []
        tags: {}
        variables:
          - name: resourceNamePrefix
            type: String
            value: cdpsanitysuites-qwerandom
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback
  projectIdentifier: K8s_Pipelines
  orgIdentifier: Ng_Pipelines_K8s_Organisations
```

```mdx-code-block
</TabItem>
</Tabs>
```


Read the [Deployment concepts and strategies](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/) article to learn more about these strategies and decide what strategy is best for you.


### Step 2. Triggers & Input Sets
Triggers in a Harness Continuous Delivery (CD) pipeline are used to automatically initiate pipeline stages or actions based on specific events or conditions, such as Git events, new Helm Charts, new artifacts, or specific time intervals. Triggers in Harness CD enable faster feedback cycles, enhanced efficiency, and decreased reliance on manual intervention during the deployment process.

Let us take a look at how the YAML filelooks like for new artifact trigger and GitHub filechange trigger:

<details>
<summary>Trigger on New Artifact YAML</summary>
<br />

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

</details>


<details>
<summary>GitHub Filechange Trigger</summary>
<br />

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

</details>

## Phase 3: Deploy to Production

### Step 1. Approvals & Governance (OPA)

- **Harness Approval**
You can specify Harness User Group(s) to approve or reject a Pipeline at any point in its execution. During deployment, the User Group members use Harness Manager to approve or reject the Pipeline deployment manually.

- **JIRA Approval**
Jira issues can be used to approve or reject a pipeline or stage at any point in its execution. During deployment, the pipeline evaluates the fields in the Jira ticket based on criteria you define. Its approval or rejection determines if the Pipeline or stage may proceed. You can add the Jira Approval step in Approval stages or in CD stages. The Jira Approval step prevents the stage execution from proceeding without an approval.

- [Freeze Deployments](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/)

Learn more about Approvals in [this](https://developer.harness.io/tutorials/cd-pipelines/approvals/) article.

### Step 2. RBAC
Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. To do this, a Harness account administrator assigns resource-related permissions to members of user groups. The **Center of Excellence** strategy and **Distributed Center of DevOps** strategy are the two most popular RBAC access control strategies used.

RBAC Components:
- Principals
- Resource Groups
- Roles

Take a look at [this](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#configure-rbac-in-harness) article to configure RBAC in Harness

### Step 3. Continuous Verification
Harness CV is a critical step in the deployment pipeline that validates deployments. Harness CV integrates with APMs and logging tools to verify that the deployment is running safely and efficiently. Harness CV applies machine learning algorithms to every deployment for identifying normal behavior. This allows Harness to identify and flag anomalies in future deployments. During the Verify step, Harness CV automatically triggers a rollback if anomalies are found.

## Phase-4: Deploy at Scale

### Step 1. SSO
Harness supports Single Sign-On (SSO) with SAML, integrating with your SAML SSO provider to enable you to log your users into Harness as part of your SSO infrastructure. The user can choose between a variety of SSO integrations according to their needs.

- [SAML SSO with Harness](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#saml-sso-with-harness)
- [SAML SSO with Okta](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#saml-sso-with-harness)
- [SAML SSO with Microsoft Entra ID](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#saml-sso-with-microsoft-entra-id)
- [SAML SSO with OneLogin](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#saml-sso-with-onelogin)
- [SAML SSO with Keycloak](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#saml-sso-with-keycloak)

[This](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/) document explains how to set up SAML authentication.

### Step 2. Templatization & Automation

Harness enables you to add templates to create re-usable logic and Harness entities (like steps, stages, and pipelines) in your pipelines. You can link templates in your pipelines or share them with your teams for improved efficiency.

Templates enhance developer productivity, reduce onboarding time, and enforce standardization across the teams that use Harness. Here's an example template that builds a JavaScript application, runs unit tests and pushes to docker registry.

<details>
<summary>Example Template YAML</summary>
<br />

```yaml
template:
  name: remote_template
  type: Stage
  spec:
    type: CI
    spec:
      cloneCodebase: true
      platform:
        os: Linux
        arch: Amd64
      runtime:
        type: Cloud
        spec: {}
      execution:
        steps:
          - step:
              type: Run
              identifier: build_javascript_app
              name: Build JavaScript App
              spec:
                shell: Sh
                command: |-
                  echo "Welcome to Harness CI"
                  echo <+pipeline.name>_<+pipeline.executionId>

                  node --version
                  npm install
                  npm run build --if-present
          - step:
              type: BuildAndPushDockerRegistry
              name: BuildAndPushDockerRegistry_1
              identifier: BuildAndPushDockerRegistry_1
              spec:
                connectorRef: account.Pritish_Harness
                repo: pritishharness/harness_test
                tags:
                  - <+pipeline.name>_<+pipeline.executionId>
  identifier: remote_template
  versionLabel: V1
```
</details>

- Terraform Automation

<details>
<summary>Terraform Automation YAML</summary>
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

:::info note
You need to have Terraform CLI installed in-order to carry out this automation
:::