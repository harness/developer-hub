---
title: CI Steps Reference
sidebar_label: CI Steps
description: Reference for all Harness CI step templates — building, testing, scanning, caching, and publishing artifacts within CI pipelines.
---

Harness CI steps provide purpose-built actions for building, testing, scanning, and publishing artifacts within your pipelines. Each step is a versioned template referenced using the `uses:` keyword with a set of typed inputs.

---

## Build & Push to Docker

**Template:** `buildAndPushToDocker@1.0.0` · Module: CI

Build a Docker image from a Dockerfile and push it to a Docker registry. Uses buildx (with caching enabled) or kaniko (without caching). Supported on Linux only.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (Docker) | Yes | Select the Harness Docker connector |
| `repo` | string | Yes | Docker repository (format: `hub-user/repo-name`) |
| `tags` | array | Yes | One or more tags for the Docker image |
| `caching` | boolean | Yes (default: `true`) | Enable Docker layer caching |
| `dockerfile` | string | No | Dockerfile name (default: root folder Dockerfile) |
| `context` | string | No | Build context directory |
| `target` | string | No | Docker target build stage |
| `buildargs` | key-value-pairs | No | Docker build-time variables (`--build-arg`) |
| `labels` | key-value-pairs | No | Metadata labels for the image |
| `cacherepo` | string | No | Remote cache repository name |
| `baseimageconnector` | connector (Docker) | No | Authenticated connector for base images |
| `envvars` | key-value-pairs | No | Environment variables |

```yaml title="example.yaml"
steps:
  - name: Build and Push
    uses: buildAndPushToDocker@1.0.0
    with:
      connector: account.dockerhub
      repo: myorg/myapp
      tags:
        - latest
        - <+pipeline.sequenceId>
      caching: true
      dockerfile: Dockerfile
      context: .
      buildargs:
        NODE_ENV: production
```

:::info Caching Behavior
When caching is enabled, the step uses buildx with layer caching for faster builds. When disabled, it falls back to kaniko.
:::

---

## Build & Push to ECR

**Template:** `buildAndPushToECR@1.0.0` · Module: CI

Build a Docker image and push to AWS Elastic Container Registry. Supported on Linux only.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (AWS) | Yes | AWS connector |
| `repo` | string | Yes | ECR repository name |
| `tags` | array | Yes | Image tags |
| `region` | string | Yes | AWS region |
| `account_id` | string | Yes | AWS account ID |
| `caching` | boolean | Yes | Enable layer caching |
| `dockerfile` | string | No | Dockerfile name |
| `context` | string | No | Build context directory |
| `target` | string | No | Docker target build stage |
| `buildargs` | key-value-pairs | No | Docker build-time variables (`--build-arg`) |
| `labels` | key-value-pairs | No | Metadata labels for the image |

```yaml title="example.yaml"
steps:
  - name: Push to ECR
    uses: buildAndPushToECR@1.0.0
    with:
      connector: account.aws_prod
      repo: myapp
      region: us-east-1
      account_id: "123456789012"
      tags:
        - <+pipeline.sequenceId>
```

---

## Build & Push to GAR

**Template:** `buildAndPushToGAR@1.0.0` · Module: CI

Build a Docker image and push to Google Artifact Registry. Supported on Linux only.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (GCP) | Yes | GCP connector |
| `repo` | string | Yes | GAR repository (format: `region-docker.pkg.dev/project/repo`) |
| `tags` | array | Yes | Image tags |
| `project` | string | Yes | GCP project ID |

```yaml title="example.yaml"
steps:
  - name: Push to GAR
    uses: buildAndPushToGAR@1.0.0
    with:
      connector: account.gcp
      repo: us-docker.pkg.dev/my-project/my-repo/myapp
      project: my-project
      tags:
        - latest
```

---

## Build & Push to Harness Artifact Registry

**Template:** `buildAndPushToHarness@1.0.0` · Module: CI

Build a Docker image and push to Harness Artifact Registry. Supports Linux only.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (Docker) | Yes | Harness Docker connector |
| `repo` | string | Yes | Harness artifact repository |
| `tags` | array | Yes | Image tags |

```yaml title="example.yaml"
steps:
  - name: Push to Harness AR
    uses: buildAndPushToHarness@1.0.0
    with:
      connector: account.harness_docker
      repo: myorg/myapp
      tags:
        - <+pipeline.sequenceId>
```

---

## Build Intelligence

**Template:** `BuildIntelligence@1.0.2` · Module: CI

Automatically caches build outputs to improve build times. Supported on Cloud and Kubernetes build infrastructure. Runs as a background step that sets up the Harness cache server alongside your build.

- Runs as a background step
- Sets up a cache server container (`harness/harness-cache-server`)
- Supports Gradle plugin integration (v0.0.4)
- Works on Cloud and Kubernetes infrastructure

```yaml title="example.yaml"
steps:
  - name: Build Intelligence
    uses: BuildIntelligence@1.0.2
```

:::tip Background Service
Build Intelligence runs as a background service. Add it at the beginning of your stage before other build steps to enable automatic caching.
:::

---

## Git Clone

**Template:** `gitCloneStep@1.0.0` · Module: CI

Clone repository code for use in subsequent pipeline steps.

| Input | Type | Required | Description |
|---|---|---|---|
| `connector` | connector (Git) | Yes | Git connector |
| `repo` | string | Yes | Repository URL |
| `branch` | string | No | Branch to clone |
| `depth` | integer | No | Clone depth (shallow clone) |
| `path` | string | No | Target directory |

```yaml title="example.yaml"
steps:
  - name: Clone Repo
    uses: gitCloneStep@1.0.0
    with:
      connector: account.github
      repo: https://github.com/myorg/myapp
      branch: main
      depth: 1
```

---

## Run Step (v2)

**Template:** `run_v2@1.0.1` · Module: CI

Generic script execution step for running commands in your pipeline. Supports multiple shells and containerized execution. This is the enhanced version of the built-in run step with additional containerization support.

```yaml title="example.yaml"
steps:
  - name: Run Tests
    uses: run_v2@1.0.1
    with:
      script: |
        npm install
        npm test
```

---

## Cache Management Steps

Six steps for saving and restoring caches across pipeline runs, supporting AWS S3, Google Cloud Storage, and Harness-managed storage.

| Step | Template ID | Version | Description |
|---|---|---|---|
| Save Cache to S3 | `saveCacheToS3` | 1.0.0 | Preserve files in AWS S3 |
| Restore Cache from S3 | `restoreCacheFromS3` | 1.0.0 | Restore files from AWS S3 |
| Save Cache to GCS | `saveCacheToGCS` | 1.0.0 | Preserve files in Google Cloud Storage |
| Restore Cache from GCS | `restoreCacheFromGCS` | 1.0.0 | Restore files from Google Cloud Storage |
| Save Cache to Harness | `SaveCacheToHarness` | 1.0.2 | Save cache to Harness storage |
| Restore Cache from Harness | `RestoreCacheFromHarness` | 1.0.2 | Restore cache from Harness storage |

```yaml title="example.yaml"
steps:
  - name: Restore Cache
    uses: RestoreCacheFromHarness@1.0.2
    with:
      key: node-modules-{{ checksum "package-lock.json" }}
      paths:
        - node_modules
  - run: npm test
  - name: Save Cache
    uses: SaveCacheToHarness@1.0.2
    with:
      key: node-modules-{{ checksum "package-lock.json" }}
      paths:
        - node_modules
```

---

## Artifact Upload Steps

Three steps for uploading build artifacts to external storage providers.

| Step | Template ID | Version | Description |
|---|---|---|---|
| Upload to S3 | `uploadArtifactsToS3` | 1.0.0 | Upload artifacts to AWS S3 |
| Upload to GCS | `uploadArtifactsToGCS` | 1.0.0 | Upload artifacts to Google Cloud Storage |
| Upload to JFrog | `uploadArtifactsToJfrogArtifactory` | 1.0.0 | Upload Docker images to JFrog Artifactory |

```yaml title="example.yaml"
steps:
  - name: Upload to S3
    uses: uploadArtifactsToS3@1.0.0
    with:
      connector: account.aws
      bucket: my-build-artifacts
      source: ./dist/**
      target: builds/<+pipeline.sequenceId>/
```

---

## Security Scanning Steps

Integrate security scanning directly into your CI pipelines to detect vulnerabilities and hardcoded secrets early in the development lifecycle.

### Bandit Security Scan

**Template:** `banditStep@1.0.0`

Performs Python security vulnerability scanning using Bandit static analysis. Supports orchestrated scan and manual upload modes. Target types include repository scanning with auto or manual target and variant detection.

### Gitleaks Security Scan

**Template:** `gitleaksStep@1.0.0`

Performs secret detection scanning using Gitleaks. Identifies hardcoded secrets, API keys, and passwords in your codebase. Supports orchestrated scan and manual upload modes.

```yaml title="example.yaml"
steps:
  - name: Python Security Scan
    uses: banditStep@1.0.0
    with:
      mode: orchestratedScan
      type: repository
      detection: auto
  - name: Secret Detection
    uses: gitleaksStep@1.0.0
    with:
      mode: orchestratedScan
      type: repository
      detection: auto
```

---

## SBOM Orchestration

**Template:** `sbomOrchestrationStep@1.0.0` · Module: CI

Generates or ingests Software Bill of Materials (SBOM) with optional attestation and drift detection.

| Input | Type | Required | Description |
|---|---|---|---|
| `mode` | choice | Yes | `generation` or `ingestion` |
| `tool` | choice | Yes | `Syft` or `cdxgen` (visible in generation mode) |
| `format` | choice | Yes | `spdx-json` or `cyclonedx-json` |
| `source` | choice | Yes | `artifact-registry`, `third-party`, `repository`, or `harness` |

```yaml title="example.yaml"
steps:
  - name: Generate SBOM
    uses: sbomOrchestrationStep@1.0.0
    with:
      mode: generation
      tool: Syft
      format: spdx-json
      source: artifact-registry
      image: myorg/myapp:latest
```