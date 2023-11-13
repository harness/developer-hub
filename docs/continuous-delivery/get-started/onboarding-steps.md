---
title: CD Onboarding Steps
description: A self-service onboarding guide for Harness CD & GitOps
sidebar_position: 2
---

| **Steps**                                              | **Details**                                                      | **Documentation Link**                                                                                                                | **Demo Video**                                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Account & Entities Setup                               | Create Organization, Project, Invite Initial Users               | [Create organizations and projects](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization/)    | N/A                                                                                            |
| Installing Delegate                                    | Kubernetes, Docker                                               | [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/)                 | [Watch Video](https://developer.harness.io/docs/platform/delegates/install-delegates/overview/) |
| Installing Secret Manager / Migrating Existing Secrets | AWS KMS, HashiCorp, Azure Key vault, Google KMS                  | [Add a secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-secrets-manager/)                    | N/A                                                                                            |
| Adding Artifact Source                                 | Docker Registry, GCR, GCS, ACR, Azure DevOps Artifacts, ECR, etc | [CD artifact sources](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/)        | N/A                                                                                            |
| Service Definition and Variables                       | Runtime Inputs or expressions                                                         | [Create services](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/)             | [Watch Video](https://youtu.be/02RIvOGd0zg?si=HnK4wHaxLUWEkoFK) |
| Environment Definitions                                | Service Override                                        | [Create environments](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/) | [Watch Video](https://youtu.be/02RIvOGd0zg?si=HnK4wHaxLUWEkoFK) |
| Simple Pipeline                                        | stage, service, environment, infrastructure                      | [CD pipeline modeling overview](https://developer.harness.io/docs/continuous-delivery/get-started/cd-pipeline-modeling-overview/)     | [Watch Video](https://youtu.be/k-f1nbgGkww?si=_EW6Lcr1qxzrQNVM) |
| Deployment Strategy                                    | Rollback, Blue Green, Canary                                        | [Deployment concepts and strategies](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/)   | [Watch Video](https://youtu.be/VJjDbwoxLfM?feature=shared)                                      |
| Triggers & Input Sets                                  | SCM triggers, Artifact triggers                                  | [Pipeline Triggers](https://developer.harness.io/tutorials/cd-pipelines/trigger/)                                                     | [Watch Video](https://youtu.be/nIPjsANiKRk?si=euQzhaYGfnPaacUe) |
| Approvals                                              | Harness Approval, JIRA Approval                                  | [Approvals](https://developer.harness.io/tutorials/cd-pipelines/approvals/)                                                           | [Watch Video](https://youtu.be/KtE6f5-QHrI?si=zYhrXnedmf2j0bUi) |
| Templatization                                         | Templates                                                        | [Templates overview](https://developer.harness.io/docs/platform/templates/template/)                                                  | [Watch Video](https://youtu.be/U-n3VK_RoQc?si=dfokJq6pa6017mqX) |
| RBAC                                                   | Principals, Resource Groups, Roles                               | [Role-based access control (RBAC) in Harness](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/)  | [Watch Video](https://youtu.be/vIQfpRrES44?si=Du5OAej2t2Phu7Hg) |
| SSO                                                    | SAML SSO with Harness, Okta, etc                                 | [Single Sign-On (SSO) with SAML](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/)                      | N/A                                                                                            |

## STEP-1: Account & Entities Setup

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

## STEP-2: Installing Delegate

Harness Delegate is a service you run in your local network or VPC to connect your artifacts, infrastructure, collaboration, verification, and other providers, with Harness Manager. The first time you connect Harness to a third-party resource, Harness Delegate is installed in your target infrastructure, for example, a Kubernetes cluster. After the delegate is installed, you connect to third-party resources. The delegate performs all operations, including deployment and integration.

Please follow the [Install Harness Delegate on Kubernetes or Docker](https://developer.harness.io/tutorials/platform/install-delegate/) article to install delegate in your kubernetes cluster or docker container.

## SETP-3: Installing Secret Manager / Migrating Existing Secrets

Harness includes a built-in Secret Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Connectors and Pipelines. Follow the [Add a secret manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-secrets-manager/) article to add a secret manager.

Looking for specific secret managers? Go to:

- [Add an AWS KMS Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager)
- [Add a HashiCorp Vault Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-hashicorp-vault)
- [Add an Azure Key Vault Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/azure-key-vault)
- [Add Google KMS as a Harness Secret Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager)
- [Add an AWS Secrets Manager](https://developer.harness.io/docs/platform/secrets/secrets-management/add-an-aws-secret-manager)

## STEP-4: Adding Artifact Source

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

## STEP-5: Service Definition and Variables

Services represent your microservices and other workloads. Each service contains a Service Definition that defines your deployment artifacts, manifests or specifications, configuration files, and service-specific variables. Follow [this](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/#create-a-service) article to create your own service.

Services are often configured using runtime inputs or expressions, so you can change service settings for different deployment scenarios at pipeline runtime. To use runtime input services with inputs and epressions, take a look at [this](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/create-services/#using-runtime-input-services-with-inputs-and-expressions).

<details>
<summary>Here's the YAML for a demo service:</summary>
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

## STEP-6: Environment Definitions

Environments represent your deployment targets (QA, Prod, etc). Each environment contains one or more Infrastructure Definitions that list your target clusters, hosts, namespaces, etc. To create your own environments, go through the [Create environments](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/environments/create-environments/) article.

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

## STEP-7: Simple Pipeline
To create a simple CD pipeline, follow the steps:
- Create a pipeline.
- Add a CD stage.
- Define a service.
- Target an environment and infrastructure.
- Select execution steps.
- You can model visually, using code, or via the REST API.

## STEP-8: Deployment Strategy
You have likely heard terms like blue/green and canary when it comes to deploying code and applications into production. These are common deployment strategies, available in Harness CD as stage strategies, along with others.

The deployment strategies provided by Harness are:
- Rolling Deployment
- Blue Green Deplomyment
- Canary Deployment
- Basic Deployments
- Multi0service Deployments

Read the [Deployment concepts and strategies](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/) article to learn more about these strategies and decide what strategy is best for you.

## STEP-9: Triggers & Input Sets
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

## STEP-10: Approvals

- **Harness Approval**
You can specify Harness User Group(s) to approve or reject a Pipeline at any point in its execution. During deployment, the User Group members use Harness Manager to approve or reject the Pipeline deployment manually.

- **JIRA Approval**
Jira issues can be used to approve or reject a pipeline or stage at any point in its execution. During deployment, the pipeline evaluates the fields in the Jira ticket based on criteria you define. Its approval or rejection determines if the Pipeline or stage may proceed. You can add the Jira Approval step in Approval stages or in CD stages. The Jira Approval step prevents the stage execution from proceeding without an approval.

Learn more about Approvals in [this](https://developer.harness.io/tutorials/cd-pipelines/approvals/) article.

## STEP-11: Templatization

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

## STEP-12: RBAC
Role-based access control (RBAC) lets you control who can access your resources and what actions they can perform on the resources. To do this, a Harness account administrator assigns resource-related permissions to members of user groups.

RBAC Components:
- Principals
- Resource Groups
- Roles

Take a look at [this](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#configure-rbac-in-harness) article to configure RBAC in Harness

## STEP-13: SSO
Harness supports Single Sign-On (SSO) with SAML, integrating with your SAML SSO provider to enable you to log your users into Harness as part of your SSO infrastructure. [This](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/) document explains how to set up SAML authentication.