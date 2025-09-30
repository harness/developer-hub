---
title: Create with Harness AI
description: Learn how to create Harness resources using Harness AI
sidebar_position: 12
---

# Getting Started with Harness AI 

Harness AI lets you generate pipelines, services, environments, connectors, secrets, and template-based pipelines directly from **natural-language prompts**.  
Use these confirmed sample prompts to quickly create YAML configurations inside Harness.

---

## How it works

1. Open Harness AI in your project.  
2. Copy a sample prompt and adjust values (connectors, namespaces, repo names, etc.).  
3. Review the generated YAML, save it, and run your pipeline.

> **Tip:** Be as specific as possible in your prompt—include details like deployment strategy, connector names, or namespaces for best results.

---

## Example Prompts

### Create Pipelines

Pipelines define how you build, test, and deploy applications. Harness AI can generate CI pipelines, CD pipelines, or hybrid flows with approvals and rollouts.


```text
Generate a Harness CI→CD pipeline that builds a Docker image and pushes to Dockerhub. Add a CD stage to deploy a Kubernetes service to namespace dev on cluster connector k8s-dev. Include variables for IMAGE_TAG and REPLICA_COUNT, and output only valid YAML
```

Use case: Combines security scanning into the CI/CD process for Python applications.

```text
Create a pipeline that runs unit tests for python, builds with Dockerfile, scans image with semgrep and deploys to staging using a Rolling strategy. Use GitHub connector rohan-git, Docker connector harness docker hub, and K8s connector k8s-dev.
```

Use case: Enables GitHub PR validation and continuous delivery on merge events.

```text
Generate a PR-triggered pipeline: on pull_request to main, run a pylint command + python test command, post summary to GitHub Checks, and skip CD. On merge to main, promote image harness:lastest and deploy to dev. Use runtime inputs for tag.
```

Use case: Standard enterprise promotion pipeline with manual approvals and safer canary rollout.

```text
Create a multi-environment pipeline with a single CI stage and two CD stages: staging → production with a manual approval gate and canary rollout in prod. Parameterize SERVICE_NAME, IMAGE, REPLICAS.
```

Use case: Parallel testing across multiple Python versions plus Helm-based deployment.

```text
Create a pipeline that uses cache, parallel matrix builds for python versions 2, 3, 3.2 , publishes artifacts to harness:docker, and then deploys a Helm chart with values file values-dev.yaml.
```

### Create Service

Services define what you deploy (application configuration, runtime, artifacts). AI can generate services for Kubernetes, ECS, Lambda, and more.

#### Prompts

Use case: Standardize Kubernetes services using Helm.

```text
Generate a Kubernetes service definition named portal using Helm with chart path /cd/chart/portal. Expose variables: IMAGE, TAG, REPLICA_COUNT. Include artifact reference to <+input> and config files section.
```

Use case: Build serverless microservices with runtime and configuration baked in.

```text
Create a serverless (AWS Lambda) service named router with runtime nodejs18.x, artifact from <+input>, and environment variables LOG_LEVEL, STAGE.
```


Use case: ECS-based deployment with resource settings and logging integrations.

```text
Define an ECS service named payments using task def family prod-payment, container harness/payment, CPU 0.25/MEM 2GB, and image harness/payment:latest. Configure logging to CloudWatch group prod_log.
```


### Create  Environments

Environments represent where applications run (dev, staging, prod). Harness AI can scaffold them for you.

#### Prompt 

Use case: Quickly spin up a non-prod environment to test services.

```text
Generate an Environment named staging (type: PreProduction)
```

Use case: Quickly spin up a prod environment to deploy services. 

```text
Create a Production environment named prod
```

### Create Secret

#### Important Security Notes

- When creating secrets, Harness will create the Secret object without a value.
- You must navigate to the created secret in the listing page to provide the value.
- Harness does not send secret values to the AI model. Sensitive data is stripped before any AI request.

#### Prompt

Use case: Create a reusable DockerHub token secret for image pulls.

```text
Create a Secret Text named docker-hub-token. Store in default Secret Manager.
```

### Create Connectors

Connectors integrate Harness with external systems (Git, Docker, AWS, Vault, etc.). AI can help bootstrap these definitions.

#### Prompts

Use case: Automates DockerHub connector creation tied to secrets.

```text
Generate a Docker Registry connector named canary-docker pointing to harness/canary with credentials from secret refs usernameRef: canary and passwordRef: docker-hub-token.
```

Use case: Simplifies Vault integration for secret management.

```text
Create a HashiCorp Vault connector, called dev-vault and default the rest of the values
```

Use case: Enables IRSA-based AWS authentication via Harness delegate.


```text
Produce an AWS connector using IRSA with role ARN and delegate selectors.
```

### Reference Pipeline Templates

Templates allow you to standardize steps and stages across multiple pipelines. Harness AI can reference existing templates by name.

#### Prompts

Referencing a Stage Template:

```text
Create a Pipeline with the Deploy to K8s Stage Template.
```

Referencing a Pipeline Template:

```text
Create a Pipeline with the Golden K8s Pipeline Template
```
### What’s Not Supported

Currently, Harness AI does not support generating:

- Infrastructure Definition Creation
- Template Creation and Update
- GitOps Application Creation and Update


