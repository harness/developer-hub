---
title: Step Library
sidebar_label: Step Library
id: index
slug: /platform/getting-started/steps
description: Harness 3.0 ships with 109+ pre-built step templates across CI, CD, IaCM, CV, and Integration modules — versioned, containerized actions that are the building blocks of pipelines.
---

Harness 3.0 ships with 109+ pre-built step templates across CI, CD, IaCM, and CV modules. Steps are the building blocks of pipelines — each step is a versioned, containerized action that runs inside a pipeline stage. The step library uses a template-based architecture where each step is defined in YAML with typed inputs, layout configuration, and containerized execution.

| | |
|---|---|
| **109+** total steps | **5** categories (CI, CD, IaCM, CV, Integration) |
| **All versioned** (semver) | **Containerized** execution |

---

## CI Steps

Continuous Integration steps handle building, testing, scanning, caching, and publishing artifacts. These steps run inside CI stages and support both Harness Cloud and self-hosted build infrastructure.

See [CI Steps](/3k-docs/platform/getting-started/steps/ci) for the full reference.

| Step Name | Description |
|---|---|
| Build & Push to Docker | Build a Docker image and push to Docker registry |
| Build & Push to ECR | Build and push to AWS ECR |
| Build & Push to GAR | Build and push to Google Artifact Registry |
| Build & Push to Harness AR | Build and push to Harness Artifact Registry |
| Build Intelligence | Auto-cache build outputs for faster builds |
| Git Clone | Clone repository code |
| Run (v2) | Execute shell scripts |
| Bandit Security Scan | Python security vulnerability scanning |
| Gitleaks Security Scan | Secret detection scanning |
| SBOM Orchestration | Generate/ingest Software Bill of Materials |
| Save/Restore Cache (S3) | Cache to/from AWS S3 |
| Save/Restore Cache (GCS) | Cache to/from Google Cloud Storage |
| Save/Restore Cache (Harness) | Cache to/from Harness storage |
| Upload Artifacts to S3 | Upload build artifacts to S3 |
| Upload Artifacts to GCS | Upload build artifacts to GCS |
| Upload to JFrog Artifactory | Upload Docker images to JFrog |

---

## Kubernetes Steps

Kubernetes steps handle deploying, rolling back, and managing applications on Kubernetes clusters across multiple deployment strategies.

See [Kubernetes Steps](/3k-docs/platform/getting-started/steps/kubernetes) for the full reference.

| Step Name | Description |
|---|---|
| K8s Rolling Deploy | Rolling deployment with steady state check |
| K8s Rolling Rollback | Rollback a rolling release |
| K8s Blue-Green Deploy | Create services and pods for blue-green |
| K8s Blue-Green Swap | Swap service selectors between stages |
| K8s Blue-Green Scale Down | Scale down stage environment |
| K8s Canary Deploy | Deploy canary subset of pods |
| K8s Canary Delete | Clean up canary deployment |
| K8s Apply | Apply manifests to cluster |
| K8s Delete | Delete resources from cluster |
| K8s Scale | Scale workloads up/down |
| K8s Patch | Patch workload resources |
| K8s Diff | Compare cluster state with manifests |
| K8s Dry Run | Validate manifests without applying |
| K8s Steady State Check | Check workload status |
| K8s Traffic Routing | Shift traffic between versions |
| Helm Deploy Basic | Deploy chart with basic strategy |
| Helm Blue-Green Deploy | Blue-green Helm deployment |
| Helm Canary Deploy | Canary Helm deployment |
| Helm Rollback | Roll back a Helm release |
| Helm Delete | Uninstall a Helm release |

---

## Cloud Steps

Cloud steps handle deploying and managing applications on cloud-native services including ECS, Google Cloud Run, Azure Functions, AWS CDK, SAM, and Serverless Framework.

See [Cloud Steps](/3k-docs/platform/getting-started/steps/cloud) for the full reference.

| Step Name | Description |
|---|---|
| ECS Blue-Green Deploy | ECS blue-green with target group swap or traffic shift |
| ECS Run Task | Execute an ECS task |
| Google Cloud Run Deploy | Deploy to Google Cloud Run |
| Google Cloud Run Rollback | Rollback a Cloud Run revision |
| Google Cloud Run Traffic Shift | Shift traffic between Cloud Run revisions |
| Google Cloud Run Job | Execute a Cloud Run job |
| Azure Function Deploy | Deploy Azure Functions |
| Azure Function Rollback | Rollback Azure Functions deployment |
| AWS CDK Deploy | Deploy infrastructure with AWS CDK |
| AWS CDK Destroy | Tear down AWS CDK stacks |
| AWS SAM Build | Build Serverless Application Model artifacts |
| AWS SAM Deploy | Deploy Serverless Application Model stacks |
| Serverless Deploy | Deploy with Serverless Framework |
| Serverless Package | Package Serverless Framework application |
| Serverless Rollback | Rollback Serverless Framework deployment |
| SSH | Execute shell on remote host |
| WinRM | Execute PowerShell on remote host |
| Email | Send email notifications |

---

## IaCM Steps

Infrastructure as Code Management steps handle provisioning and managing infrastructure using Terraform, OpenTofu, and related tooling. These steps provide first-class support for infrastructure lifecycle operations within pipelines.

See [IaCM Steps](/3k-docs/platform/getting-started/steps/iacm) for the full reference.

| Step Name | Description |
|---|---|
| Terraform Step | Run Terraform commands (init, plan, apply, destroy, etc.) |
| OpenTofu Step | Run OpenTofu commands |
| TFLint Step | Run TFLint for Terraform linting |
| Tofu Module Test | Test OpenTofu modules |

---

## Integration Steps

Integration steps connect pipelines with external services for HTTP requests, ticketing systems, approvals, and CI/CD tool orchestration.

See [Integration Steps](/3k-docs/platform/getting-started/steps/integrations) for the full reference.

| Step Name | Description |
|---|---|
| HTTP Step | Execute HTTP requests with assertions and output variables |
| Jira Create | Create Jira issues |
| Jira Update | Update Jira issues |
| Jira Approval | Approve/reject via Jira |
| ServiceNow Create | Create ServiceNow tickets |
| ServiceNow Update | Update ServiceNow tickets |
| ServiceNow Approval | Approve/reject via ServiceNow |
| ServiceNow Import Set | Import records |
| Jenkins Build | Execute Jenkins jobs |
| Bamboo Build | Execute Bamboo plans |
| AI Verify | AI-based verification with intelligent anomaly detection and log analysis |

---

## How Steps Work

Every step in the Harness 3.0 step library follows a consistent template-based architecture. Understanding the anatomy of a step helps you use steps effectively and troubleshoot issues when they arise.

**Versioned Templates** — Each step is a versioned template (semver) stored in the template library. You reference steps by name and version (e.g., `buildAndPushToDocker@1.0.0`).

**Typed Inputs** — Steps declare typed inputs (`string`, `boolean`, `select`, `connector`, `array`, `key-value-pairs`, `list`) that are validated before execution.

**Layout Configuration** — Steps have a layout configuration that controls how the UI renders input fields in the visual pipeline editor.

**Containerized Execution** — Steps execute in containers (Docker images like `plugins/kaniko`, `harnessdev/helm-deploy:0.0.1`, etc.).

**Strategies** — Steps can be composed into strategies (groups of steps for deploy workflows such as rolling, canary, or blue-green).

**Conditional Execution** — Steps support conditional execution via `if` expressions, enabling dynamic pipeline behavior based on runtime context.

### Using a Step in a Pipeline

Reference a step by its template name and version using the `uses` keyword, and pass inputs via the `with` block.

```yaml title="step-usage.yaml"
pipeline:
  stages:
    - name: build
      steps:
        - name: build-docker-image
          uses: buildAndPushToDocker@1.0.0
          with:
            connector: account.dockerhub
            repo: myorg/myapp
            tags:
              - latest
              - <+pipeline.sequenceId>
```

### Step Template Anatomy

Behind every step in the library is a template definition that declares the step's identity, inputs, layout, and container execution configuration. See [Step Templates](/3k-docs/platform/getting-started/steps/templates) for a full reference.

```yaml title="step-template-anatomy.yaml"
template:
  id: stepName
  name: Step Display Name
  version: 1
  module:
    - ci
  inputs:
    connector:
      type: connector
      label: Docker Connector
      required: true
    tags:
      type: array
      label: Tags
      required: true
  layout:
    - connector
    - tags
  step:
    run:
      container:
        image: plugins/kaniko
      env:
        PLUGIN_TAGS: ${{inputs.tags}}
```

:::tip Step Versioning
Each step in the library is independently versioned using semver. Pin specific versions in your pipelines for stability, or use `@latest` for the newest version.
:::