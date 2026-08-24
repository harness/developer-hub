---
title: What's Supported
description: Supported deployment targets, manifest stores, and artifact sources for Harness Deployments.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page lists the deployment targets, manifest stores, and artifact sources supported in Harness Deployments.

<Tabs>
<TabItem value="deployments" label="Deployments">

## Kubernetes

**Supported deployment strategies**

| Strategy | Description |
|----------|-------------|
| Rolling | Incrementally replaces pods batch by batch with automatic rollback |
| Canary | Deploys a subset of pods alongside stable pods, then promotes with a rolling deploy |
| Blue-green | Maintains two pod sets and swaps service selectors at cutover |
| Blank canvas | No managed steps — build your own sequence for Jobs, CronJobs, and supporting resources |

**Supported manifest types**

K8s Manifest, Values YAML, Helm Chart, Kustomize, Kustomize Patches, OpenShift Template

**Supported infrastructure providers**

Kubernetes (direct), Google Kubernetes Engine (GKE), Microsoft Azure (AKS), Amazon Elastic Kubernetes Service (EKS), Rancher

**Other**

| Capability | Supported |
|------------|-----------|
| OpenShift (DeploymentConfig, `oc` client) | ✅ |
| Server-side apply | ✅ |
| Manifest pruning | ✅ |
| Automatic rollback on failure | ✅ |
| Kubernetes Steady State Check | ✅ |
| Harness release history tracking | ✅ |
| Delegate 1.0 and Delegate 3.x | ✅ |

---

## Helm

**Supported deployment strategies**

| Strategy | Description |
|----------|-------------|
| Basic deploy | Runs `helm upgrade --install` in a single phase |
| Canary | Deploys a canary Helm release at a specified instance count, then deletes after promotion |
| Blue-green | Deploys to a stage Helm release, swaps traffic, then cleans up the old release |

**Supported Helm versions**

| Version | Support |
|---------|---------|
| Helm V3 | ✅ |
| Helm V2 | Deprecated |

**Supported chart store types**

Harness Code, GitHub, Git, GitLab, Bitbucket, Azure Repos, Amazon S3, Google Cloud Storage, HTTP Helm

**Other**

| Capability | Supported |
|------------|-----------|
| `helm test` after deploy | ✅ |
| Server-side chart rendering | ✅ |
| Automatic rollback on failure | ✅ (via Helm Rollback step) |
| Ignore failed release history | ✅ |
| Manifest pruning | ❌ (Helm manages release state natively) |
| Delegate 1.0 and Delegate 3.x | ✅ |

</TabItem>
<TabItem value="filestore" label="Manifest Sources">

Manifests and config files can be stored in the following sources. The table shows which sources are supported per manifest type.

| Manifest type | Harness Code | GitHub | Git | GitLab | Bitbucket | Azure Repos | AWS S3 | Google Cloud Storage | HTTP Helm | Custom Remote |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| K8s Manifest | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | | | ✅ |
| Values YAML | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | | ✅ |
| Kustomize | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | | | |
| Kustomize Patches | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | | | ✅ |
| OpenShift Template | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | | | ✅ |
| Helm Chart | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | |

</TabItem>
<TabItem value="artifacts" label="Artifacts">

The table shows which artifact sources are supported per deployment type.

| Deployment type | Harness Artifact Registry | Docker Hub | Amazon ECR | GCR* | ACR | Artifactory | Nexus 3 | Google Artifact Registry | GitHub Package Registry | Custom |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Kubernetes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Helm | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | | ✅ | ✅ |

**GCR** is deprecated. Migrate to Google Artifact Registry.

</TabItem>
</Tabs>
