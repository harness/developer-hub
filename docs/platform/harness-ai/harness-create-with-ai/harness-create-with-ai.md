---
title: Getting Started with Harness AI Prompts
description: Use these example prompts to create pipelines, services, environments, connectors, and other Harness resources with Harness AI.
sidebar_label: Harness AI Prompts
sidebar_position: 2
keywords:
  - harness ai prompts
  - ai examples
  - devops agent prompts
  - pipeline generation
  - natural language
tags:
  - harness-ai
redirect_from:
  - /docs/platform/harness-aida/harness-create-with-ai
---

Harness AI lets you generate Harness platform resources like <a href="/docs/continuous-delivery/overview#pipeline" target="_blank">pipelines</a>, <a href="/docs/continuous-delivery/overview#service" target="_blank">services</a>, <a href="/docs/continuous-delivery/overview#environment" target="_blank">environments</a>, <a href="/docs/continuous-delivery/overview#connectors" target="_blank">connectors</a>, and <a href="/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective" target="_blank">Cloud Cost Management (CCM) perspectives</a> using natural language prompts. Use these example prompts to quickly create configurations inside Harness by copying and adjusting values for your environment.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Use example prompts to create DevOps resources](#example-prompts-for-devops).
- [Use example prompts to create Cloud Cost Management perspectives](#example-prompts-for-efficiency-and-cost).
- [Understand how to customize prompts for your environment](#how-to-use-these-prompts).

---

## Before you begin

Before you use these example prompts, ensure you have the following:

- **Harness AI enabled**: Harness AI must be active for your account. Go to <a href="/docs/platform/harness-ai/overview#enable-ai" target="_blank">Overview</a> for more information on activating Harness AI.
- **Project access**: Permission to create and manage resources (<a href="/docs/continuous-delivery/overview#pipeline" target="_blank">pipelines</a>, <a href="/docs/continuous-delivery/overview#service" target="_blank">services</a>, <a href="/docs/continuous-delivery/overview#environment" target="_blank">environments</a>, <a href="/docs/continuous-delivery/overview#connectors" target="_blank">connectors</a>) in your Harness project.
- **Connector names**: Know the names of your configured <a href="/docs/continuous-delivery/overview#connectors" target="_blank">connectors</a> (Git, Docker, Kubernetes, cloud providers) to reference in prompts.

---

## Use prompts

Learn how to customize and use these example prompts effectively.

### For DevOps, pipeline, and platform automation use cases

1. Navigate to your Harness project and open Harness AI.
2. Copy an example prompt from this page and adjust values such as connector names, namespaces, repository names, and deployment strategies.
3. Review the generated YAML configuration, save it, and run your pipeline.

:::tip Recommendation
Be specific in your prompt. Include details like deployment strategy, connector names, namespaces, and image tags for best results.
:::

### For Cloud Cost Management use cases

1. Navigate to Harness AI in CCM.
2. Copy an example prompt and adjust parameters for your cloud environment.
3. Review the generated configuration before creating the perspective.

---

## Example prompts for DevOps

Use these example prompts to create pipelines, services, environments, connectors, and other DevOps resources.

### Create pipelines

Pipelines define how you build, test, and deploy applications. Harness AI can generate CI pipelines, CD pipelines, or hybrid flows with approvals and rollouts.

**Use case:** Combine security scanning into the CI/CD process for Python applications.

```text
Generate a Harness CI to CD pipeline that builds a Docker image and pushes to Dockerhub. Add a CD stage to deploy a Kubernetes service to namespace dev on cluster connector k8s-dev. Include variables for IMAGE_TAG and REPLICA_COUNT, and output only valid YAML
```

**Use case:** Enable GitHub PR validation and continuous delivery on merge events.

```text
Create a pipeline that runs unit tests for python, builds with Dockerfile, scans image with semgrep and deploys to staging using a Rolling strategy. Use GitHub connector rohan-git, Docker connector harness docker hub, and K8s connector k8s-dev.
```

**Use case:** Generate a PR-triggered pipeline with conditional deployment.

```text
Generate a PR-triggered pipeline: on pull_request to main, run a pylint command plus python test command, post summary to GitHub Checks, and skip CD. On merge to main, promote image harness:latest and deploy to dev. Use runtime inputs for tag.
```

**Use case:** Create a standard enterprise promotion pipeline with manual approvals and safer canary rollout.

```text
Create a multi-environment pipeline with a single CI stage and two CD stages: staging to production with a manual approval gate and canary rollout in prod. Parameterize SERVICE_NAME, IMAGE, REPLICAS.
```

**Use case:** Enable parallel testing across multiple Python versions plus Helm-based deployment.

```text
Create a pipeline that uses cache, parallel matrix builds for python versions 2, 3, 3.2, publishes artifacts to harness:docker, and then deploys a Helm chart with values file values-dev.yaml.
```

---

### Create services

<a href="/docs/continuous-delivery/get-started/key-concepts#services" target="_blank">Services</a> define what you deploy, including application configuration, runtime, and artifacts. Harness AI can generate service definitions for Kubernetes, ECS, Lambda, and more.

**Use case:** Standardize Kubernetes services using Helm.

```text
Generate a Kubernetes service definition named portal using Helm with chart path /cd/chart/portal. Expose variables: IMAGE, TAG, REPLICA_COUNT. Include artifact reference to <+input> and config files section.
```

**Use case:** Build serverless microservices with runtime and configuration.

```text
Create a serverless (AWS Lambda) service named router with runtime nodejs18.x, artifact from <+input>, and environment variables LOG_LEVEL, STAGE.
```

**Use case:** Create an ECS-based deployment with resource settings and logging integrations.

```text
Define an ECS service named payments using task def family prod-payment, container harness/payment, CPU 0.25/MEM 2GB, and image harness/payment:latest. Configure logging to CloudWatch group prod_log.
```

---

### Create environments

<a href="/docs/continuous-delivery/get-started/key-concepts#environments" target="_blank">Environments</a> represent where applications run, such as dev, staging, and prod. Harness AI can generate environment definitions for you.

**Use case:** Create a non-prod environment to test services.

```text
Generate an Environment named staging (type: PreProduction)
```

**Use case:** Create a production environment to deploy services.

```text
Create a Production environment named prod
```

---

### Create secrets

Create <a href="/docs/platform/secrets/secrets-management/harness-secret-manager-overview" target="_blank">secrets</a> to store sensitive information like credentials and tokens.

#### Important security notes

- When creating secrets, Harness creates the secret object without a value.
- You must navigate to the created secret in the listing page to provide the value.
- Harness does not send secret values to the AI model. Sensitive data is stripped before any AI request.

**Use case:** Create a reusable DockerHub token secret for image pulls.

```text
Create a Secret Text named docker-hub-token. Store in default Secret Manager.
```

---

### Create connectors

<a href="/docs/category/connectors" target="_blank">Connectors</a> integrate Harness with external systems such as Git, Docker, AWS, and Vault. Harness AI can help generate connector definitions.

**Use case:** Automate DockerHub connector creation tied to secrets.

```text
Generate a Docker Registry connector named canary-docker pointing to harness/canary with credentials from secret refs usernameRef: canary and passwordRef: docker-hub-token.
```

**Use case:** Simplify Vault integration for secret management.

```text
Create a HashiCorp Vault connector, called dev-vault and default the rest of the values
```

**Use case:** Enable IRSA-based AWS authentication via Harness delegate.

```text
Produce an AWS connector using IRSA with role ARN and delegate selectors.
```

---

### Create IaCM pipelines

Harness AI DevOps Agent can create <a href="/docs/infrastructure-as-code-management" target="_blank">Infrastructure as Code Management</a> (IaCM) pipelines for provisioning and managing infrastructure using Terraform and other IaC tools.

**Use case:** Provision cloud infrastructure with Terraform via an IaCM pipeline.

```text
Create an IACM Pipeline that provisions AWS Infrastructure with the IACM Steps.
```

**Use case:** Manage a Terraform workspace through a pipeline.

```text
Build a pipeline with an IACM stage to manage my Terraform workspace.
```

**Use case:** Create a Terraform plan and apply workflow.

```text
Create a pipeline that runs Terraform plan and apply for my cloud infrastructure.
```

---

### Create multi-module pipelines

Harness AI supports creating pipelines with stages from multiple Harness modules, including CI, CD, IaCM, IDP, SCS, STO, DB DevOps, and Chaos Engineering.

**Use case:** Create an end-to-end pipeline with security scanning.

```text
Create a pipeline with a CI stage to build my app, an STO stage to scan for vulnerabilities, and a CD stage to deploy to production.
```

**Use case:** Create a pipeline with chaos engineering validation.

```text
Build a pipeline that deploys to staging, runs a Chaos Engineering experiment to validate resilience, then promotes to production with an approval gate.
```

**Use case:** Create a database migration pipeline.

```text
Create a pipeline with a DB DevOps stage to run database migrations before deploying the application with a CD stage.
```

**Use case:** Create a supply chain security pipeline.

```text
Create a pipeline with an SCS stage to generate SBOM and attestation, followed by a CD stage to deploy to production.
```

---

### Reference pipeline templates

<a href="/docs/platform/templates/template" target="_blank">Templates</a> allow you to standardize steps and stages across multiple pipelines. Harness AI can reference existing templates by name.

**Referencing a stage template:**

```text
Create a Pipeline with the Deploy to K8s Stage Template.
```

**Referencing a pipeline template:**

```text
Create a Pipeline with the Golden K8s Pipeline Template
```

---

### GitOps operations

Harness AI can manage 13 <a href="/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics" target="_blank">GitOps</a> resource types, including agents, applications, clusters, repositories, ApplicationSets, and more. You can query status, trigger syncs, create and update resources, inspect events and logs, and generate pipeline snippets. Go to <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent#gitops-operations" target="_blank">GitOps operations</a> for more information on all supported resource types and operations.

**Use case:** List agents and check their health.

```text
List all healthy GitOps agents at account level
```

**Use case:** Check application sync status across your environment.

```text
What applications are out of sync? How long have they been out of sync? Which project are the out-of-sync applications in?
```

**Use case:** Create a new GitOps application.

```text
Create a new app called guestbook pointing at the argocd-example-apps repo on cluster incluster
```

**Use case:** Sync an application with pruning.

```text
Sync the app my-app with pruning enabled
```

**Use case:** Bulk sync multiple applications.

```text
Bulk sync apps app1 and app2 on agent account.myagent
```

**Use case:** Create an ApplicationSet with a list generator.

```text
Create an ApplicationSet using a list generator with dev, staging, and prod environments
```

**Use case:** Inspect events and troubleshoot.

```text
Show recent events for app my-app on agent account.myagent
```

**Use case:** View pod logs for a workload.

```text
Get the last 100 lines of logs from pod web-abc123 in app my-app
```

**Use case:** Discover and run Kubernetes resource actions.

```text
What actions can I run on the web Deployment in app my-app?
```

**Use case:** View the GitOps dashboard summary.

```text
How many GitOps apps are healthy vs degraded?
```

**Use case:** Link a cluster to an environment.

```text
Link cluster incluster to environment staging via agent myagent at account scope
```

---

### Limitations

Harness AI does not currently support generating the following DevOps resources:

- Template creation and update

---

## Example prompts for efficiency and cost

Use these example prompts to create Cloud Cost Management perspectives.

### Create cloud cost perspectives

You can use Harness AI to create <a href="/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives" target="_blank">Cloud Cost Management perspectives</a> to visualize and analyze cloud spending.

**Use case:** Create a perspective for application costs.

```text
Could you create a Cost Perspective rules based on Application costs?
```

**Use case:** Create a perspective for environment costs.

```text
Could you create a Cost Perspective rules based on Environment costs (dev/staging/prod)?
```

**Use case:** Create a service or component cost perspective.

```text
Could you create a Cost Perspective rules based on a service/component?
```

**Use case:** Create a team or department cost perspective to manage team spending.

```text
Could you create a Cost Perspective rules based on Team/Department costs?
```

---

## Next steps

- <a href="/docs/platform/harness-ai/core-capabilities/in-harness-ui/devops-agent" target="_blank">Harness AI DevOps Agent</a>: Create and manage Harness resources with AI. 
- <a href="/docs/platform/harness-ai/harness-create-with-ai/effective-prompting-ai" target="_blank">Effective prompting</a>: Write better prompts for Harness AI.
