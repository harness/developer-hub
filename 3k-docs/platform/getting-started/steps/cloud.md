---
title: Cloud Deployment Steps
sidebar_label: Cloud Steps
description: Reference for cloud deployment step templates in Harness 3.0 — AWS ECS, Google Cloud Run, Azure Functions, AWS CDK, AWS SAM, and Serverless Framework.
sidebar_position: 4
---

Harness 3.0 provides native deployment steps for major cloud services including AWS ECS, Google Cloud Run, Azure Functions, AWS CDK, AWS SAM, and Serverless Framework. Each step is containerized and versioned.

---

## ECS blue-green deployment

Multiple steps for ECS blue-green workflows. These steps work together to enable zero-downtime deployments on Amazon ECS using either target group swap or traffic shift strategies.

| Step Template ID | Version | Description |
|---|---|---|
| `ecsBluegreenDeployStep` | v1.0.0 | Executes ECS blue-green deployment |
| `ecsBluegreenDeployWithSwapStrategy` | v1.0.0 | Blue-green with target group swap |
| `ecsBluegreenDeployWithTrafficShiftStrategy` | v1.0.0 | Blue-green with traffic shift |
| `ecsBluegreenRollbackStep` | v1.0.0 | Rollback ECS blue-green deployment |
| `ecsBluegreenSwapTargetGroupsStep` | v1.0.0 | Swap target groups |
| `ecsBluegreenTrafficShiftStep` | v1.0.0 | Shift traffic between deployments |
| `ecsBluegreenTrafficShiftRollbackStep` | v1.0.0 | Rollback traffic shift |

**Key inputs (deploy step):**

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (AWS) | Yes | AWS connector |
| `cluster` | string | Yes | ECS cluster name |
| `region` | string | Yes | AWS region |
| `task_def_mode` | select | Yes | `Task Definition` or `Task Definition ARN` |
| `task_def` | string | Yes | Path to task definition or ARN |
| `service_def` | string | Yes | Path to service definition |
| `log_level` | select | No | Log level |

ECS blue-green supports two deployment patterns: **Target Group Swap** (deploys to a staging target group, then swaps the production and staging target groups) and **Traffic Shift** (gradually shifts traffic from old to new deployment using weighted target groups).

```yaml title="ecs-bluegreen-deploy.yaml"
steps:
  - name: ECS Blue-Green Deploy
    uses: ecsBluegreenDeployStep@1.0.0
    with:
      connector: account.aws_prod
      cluster: my-ecs-cluster
      region: us-east-1
      task_def: ecs/task-definition.json
      service_def: ecs/service-definition.json
```

---

## ECS run task

**Template:** `ecsRunTaskStep@1.0.2`

Execute a one-off ECS task (not a long-running service).

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (AWS) | Yes | AWS connector |
| `cluster` | string | Yes | ECS cluster |
| `region` | string | Yes | AWS region |
| `task_def` | string | Yes | Task definition path |

```yaml title="ecs-run-task.yaml"
steps:
  - name: Run Migration
    uses: ecsRunTaskStep@1.0.2
    with:
      connector: account.aws
      cluster: my-cluster
      region: us-east-1
      task_def: ecs/migration-task.json
```

---

## Google Cloud Run

Four steps for Google Cloud Run operations including service deployment, rollback, traffic management, and job execution.

| Step Template ID | Version | Description |
|---|---|---|
| `googleCloudRunDeploy` | v1.0.0 | Deploy Cloud Run service |
| `googleCloudRunRollback` | v1.0.0 | Rollback Cloud Run service |
| `googleCloudRunTrafficShift` | v1.0.0 | Shift traffic between revisions |
| `googleCloudRunJob` | v1.0.0 | Execute Cloud Run job |

**Key inputs (deploy step):**

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (GCP) | Yes | GCP connector |
| `region` | string | Yes | GCP region |
| `project` | string | Yes | GCP project |
| `manifest` | string | Yes | Service manifest path |
| `image` | string | No | Container image (default: from artifact) |
| `cmd_options` | string | No | Command options (e.g., `--port=8080`) |
| `cmd_timeout` | string | No | Command timeout (default: `10m`) |

```yaml title="cloudrun-deploy.yaml"
steps:
  - name: Deploy to Cloud Run
    uses: googleCloudRunDeploy@1.0.0
    with:
      connector: account.gcp
      region: us-central1
      project: my-gcp-project
      manifest: cloudrun/service.yaml
      image: gcr.io/my-project/myapp:latest
```

---

## Azure functions

Three steps for Azure Function deployments supporting both ZIP and container-based deployment models.

| Step Template ID | Version | Description |
|---|---|---|
| `azureFunctionDeployStep` | v1.0.0 | Deploy Azure Function (ZIP or Container) |
| `azureFunctionRollbackStep` | v1.0.0 | Rollback Azure Function |
| `azureFunctionDeployStrategy` | v1.0.0 | Managed deployment strategy |

**Key inputs (deploy step):**

| Input | Type | Required | Description |
|---|---|---|---|
| `infra` | connector (Azure) | Yes | Azure infrastructure connector |
| `artifact` | connector | Yes | Artifact connector (Azure, Docker, Nexus, Artifactory) |
| `app` | string | Yes | Function app name |
| `slot` | string | Yes | Deployment slot |
| `cmd` | select | Yes | Command type (`deploy` or `rollback`) |
| `deploy_type` | select | Yes | `ZIP` or `CONTAINER` |

```yaml title="azure-function-deploy.yaml"
steps:
  - name: Deploy Azure Function
    uses: azureFunctionDeployStep@1.0.0
    with:
      infra: account.azure
      artifact: account.acr
      app: my-function-app
      slot: production
      deploy_type: CONTAINER
```

---

## AWS CDK

Two steps for AWS Cloud Development Kit infrastructure deployments supporting multiple programming languages.

| Step Template ID | Version | Description |
|---|---|---|
| `awsCdkDeployStep` | v1.0.1 | Deploy infrastructure with AWS CDK |
| `awsCdkDestroyStep` | v1.0.1 | Destroy AWS CDK infrastructure |

**Key inputs (deploy step):**

| Input | Type | Required | Description |
|---|---|---|---|
| `tech_stack` | select | Yes | Language (`java`, `go`, `dotnet`, `python`) |
| `connector` | connector (AWS) | Yes | AWS connector |
| `region` | string | Yes | AWS region |
| `bootstrap` | boolean | No | Execute CDK bootstrap |
| `diff` | boolean | No | Execute CDK diff |
| `synth` | boolean | No | Execute CDK synth only |
| `app_params` | array | No | CDK app parameters |
| `stacks` | array | No | Stack names |

```yaml title="aws-cdk-deploy.yaml"
steps:
  - name: CDK Deploy
    uses: awsCdkDeployStep@1.0.1
    with:
      tech_stack: python
      connector: account.aws
      region: us-east-1
      stacks:
        - MyApiStack
        - MyDatabaseStack
```

---

## AWS SAM

Two steps for AWS Serverless Application Model workflows covering both build and deploy phases.

| Step Template ID | Version | Module | Description |
|---|---|---|---|
| `awsSamBuildStep` | v1.0.1 | CI | Build SAM package |
| `awsSamDeployStep` | v1.0.1 | CD | Deploy SAM package |
| `awsSamDeployStrategy` | v1.0.1 | CD | Managed SAM deployment strategy |

```yaml title="aws-sam-deploy.yaml"
steps:
  - name: SAM Build
    uses: awsSamBuildStep@1.0.1
    with:
      connector: account.aws
      region: us-east-1
  - name: SAM Deploy
    uses: awsSamDeployStep@1.0.1
    with:
      connector: account.aws
      region: us-east-1
      stack_name: my-sam-stack
```

---

## Serverless Framework

Three steps for Serverless Framework deployments covering packaging, deployment, and rollback workflows.

| Step Template ID | Version | Description |
|---|---|---|
| `serverlessPackageStep` | v1.0.1 | Create Serverless package |
| `serverlessDeployStep` | v1.0.1 | Deploy Serverless package |
| `serverlessRollbackStep` | v1.0.1 | Rollback deployment |
| `serverlessDeployStrategy` | v1.0.0 | Managed strategy with rollback |

**Key inputs (deploy step):**

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (AWS) | Yes | AWS connector |
| `region` | string | Yes | AWS region |
| `stage` | string | Yes | Serverless stage |
| `path` | string | No | Path to `serverless.yaml` |
| `work_dir` | string | No | Working directory |
| `client_path` | string | No | CLI path (default: `serverless`) |
| `timeout` | string | No | Command timeout (default: `10m`) |
| `stack` | boolean | No | Get stack details only |

```yaml title="serverless-deploy.yaml"
steps:
  - name: Serverless Deploy
    uses: serverlessDeployStep@1.0.1
    with:
      connector: account.aws
      region: us-east-1
      stage: production
      path: serverless/serverless.yaml
```

:::tip Managed Deploy Strategy
For serverless deployments, consider using the managed strategy (`serverlessDeployStrategy`) which automatically includes rollback support in case of deployment failures.
:::