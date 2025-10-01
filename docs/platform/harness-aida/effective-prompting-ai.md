---
title: Effective Prompting
description: How to write good prompts for Harness AI
sidebar_position: 13
---

# Effective Prompting with Harness AI

Harness AI generates various entities in the Harness Platform from natural language.  
This guide shows you how to write **effective prompts** with examples of weak vs. strong phrasing.

---

## Why Prompting Matters

Harness AI performs best when prompts are **clear, detailed, and specific**.  
For DevOps use cases, the difference between “create a pipeline” and “create a CI→CD pipeline that builds a Docker image and deploys to Kubernetes” is the difference between vague production-ready pipelines. 

---

## Prompting Guidelines

- **Be specific**: Name repos, branches, connectors, services, perspectives and deployment strategies.  
- **Use action words**: Start with *Generate*, *Create*, *Define*.  
- **Provide inputs**: List parameters like `IMAGE_TAG`, `REPLICA_COUNT`.  
- **Focus**: One resource per prompt is more reliable.  
- **Iterate**: Begin broad, refine with more detail.  

---

## Pipeline Prompts

| Weak Prompt | Strong Prompt | Why It’s Better |
|-------------|---------------|-----------------|
| `Create a pipeline for my app` | `Generate a Harness CI→CD pipeline that builds a Docker image and pushes to Dockerhub. Add a CD stage to deploy a Kubernetes service to namespace dev on cluster co[...]` | More detailed, includes build, push, and deployment targets. |
| `Make a pipeline` | `Create a pipeline that runs unit tests for python, builds with Dockerfile, scans image with semgrep and deploys to staging using a Rolling strategy. Use GitHub connector rohan-git.` | Specifies language, build, scan, deploy, strategy, and connector. |

---

## Service Prompts

| Weak Prompt | Strong Prompt | Why It’s Better |
|-------------|---------------|-----------------|
| `Make a Kubernetes service` | `Generate a Kubernetes service definition named portal using Helm with chart path /cd/chart/portal. Expose variables: IMAGE, TAG, REPLICA_COUNT. Include artifact references.` | Names, chart path, exposed variables, artifact refs. |
| `Create a Lambda service` | `Create a serverless (AWS Lambda) service named router with runtime nodejs18.x, artifact from runtime input, and environment variables LOG_LEVEL, STAGE.` | Adds runtime, artifact source, and environment variables. |

---

## Environment Prompts

| Weak Prompt | Strong Prompt | Why It’s Better |
|-------------|---------------|-----------------|
| `Create an environment` | `Generate an Environment named staging (type: PreProduction)` | Defines name and environment type explicitly. |
| `Make prod environment` | `Create a Production environment named prod` | Clear scope for production use. |

---

## Secret Prompts

 **Important:** Harness creates the secret object **without values**. You must add values manually in the UI. Secret values are never sent to AI.

| Weak Prompt | Strong Prompt | Why It’s Better |
|-------------|---------------|-----------------|
| `Add a secret` | `Create a Secret Text named docker-hub-token. Store in default Secret Manager.` | Includes type, name, and storage location. |

---

## Connector Prompts

| Weak Prompt | Strong Prompt | Why It’s Better |
|-------------|---------------|-----------------|
| `Make a Docker connector` | `Generate a Docker Registry connector named canary-docker pointing to harness/canary with credentials from secret refs usernameRef: canary and passwordRef: docker-hub-token.` | Names, repo, and credential refs. |
| `Create a Vault connector` | `Create a HashiCorp Vault connector, called dev-vault and default the rest of the values.` | Identifies type, name, and defaults. |

---

## Template Prompts

| Weak Prompt | Strong Prompt | Why It’s Better |
|-------------|---------------|-----------------|
| `Use a template` | `Create a Pipeline with the Deploy to K8s Stage Template.` | Directly references a stage template by name. |
| `Add template` | `Create a Pipeline with the Golden K8s Pipeline Template.` | Specifies which pipeline template to reuse. |

---

## Additional Prompting Guidelines for Harness AI

Beyond the basics, here are more advanced prompting techniques to get consistent and high-quality results from Harness AI.

---

## Other Prompting Guidelines

### 1. State the Resource Scope
Always specify whether the resource should be created at the **Account**, **Org**, or **Project** level. Also identify the **resource name** that you want to reference or use in your pipeline.

**Example**

```text
Generate a pipeline at the Project scope that uses the staging environment and GitHub connector rohan-git.
```

For Cost, specify the actual resource scope.

```text
Could you create a Cost Perspective rules based on Team/Department costs?
```

### 2. Include Runtime Inputs

Call out variables you want parameterized with `<+input>`.

**Example**

```text
Create a Kubernetes service with IMAGE and TAG as runtime inputs, defaulting to `<+input>`.
```

### 3. Specify Deployment Strategies

Explicitly mention strategies such as Rolling, Blue/Green, or Canary.

**Example**

```text
Create a production pipeline with a Canary deployment using 25%-75% rollout strategy.
```

### 4. Chain Stages Clearly

Describe the order of stages and include gating conditions.


**Example**

```text
Generate a CI pipeline with build → test → deploy stages, 
add a manual approval before deploy, 
and notify Slack after success.
```

### 6. Add Verification or Notifications

Ask AI to extend pipelines with observability or collaboration integrations.

**Example**

```text
Extend the staging deployment pipeline to run a health check verification step 
and post results to Slack channel #deployments.
```

### 7. Use Iterative Prompting

Start with a basic resource and refine by adding details in follow-up prompts.

**Example**

First Prompt

```text
Create a pipeline that builds and deploys to staging.
```

Follow up Prompt

```text
Add a canary rollout strategy to the deployment stage.
```

## Best Practice Checklist

- Mention target platform (Kubernetes, ECS, Lambda, VM, AWS, GCP)
- Include connector names and secret references
- Add environment and service details
- Specify deployment strategy (Rolling, Canary, Blue/Green) for DevOps use cases
- Use variables for flexibility (`IMAGE_TAG`, `SERVICE_NAME`)
  



