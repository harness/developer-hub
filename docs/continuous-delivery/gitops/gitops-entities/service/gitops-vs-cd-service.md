---
title: GitOps vs CD Services
description: Understand how GitOps services differ from traditional CD services in Harness.
sidebar_position: 20
---

Before diving into the differences between GitOps and CD services, let’s clarify what a service is in Harness and how it fits into the deployment process.

A **service** in Harness defines what you’re deploying — typically a microservice, application, or workload. Every service bundles the essential configuration required to deploy your software across environments such as development, staging, or production.

Every service includes:

- **Service Definition**: Specifies the deployment type (Kubernetes, Helm, Serverless, etc.).
- **Manifests**: Point to deployment specs like Kubernetes manifests, Helm charts, and more.
- **Artifacts**: Reference container images, packages, or binaries to deploy.
- **Variables**: Store configuration values specific to the service.
- **Config Files**: Include application config files (if needed).

Services are reusable, so you can deploy the same definition to multiple environments using different pipelines and stages.

## Two Approaches for Deploying Kubernetes Services

Harness supports two main models for deploying Kubernetes services—each suited to different operational needs:

### Traditional CD (Continuous Delivery)

CD is a push-based approach. When you execute a pipeline, the Harness Delegate fetches manifests and artifacts, then applies them directly to your Kubernetes cluster. You control each deployment step, timing, and strategy (rolling update, canary, blue-green, etc.).

### GitOps

GitOps uses a pull-based workflow, where **your Git repository is the source of truth** for every deployment. Instead of pipelines pushing changes directly to Kubernetes, you update configuration files in Git (via pull requests, for example). A GitOps Agent (based on Argo CD) watches for changes in Git and continuously syncs your cluster to reflect the desired state.

**Key GitOps principles:**
- **Declarative:** Everything is described and managed through configuration in Git.
- **Versioned and immutable:** Git histories provide complete audit trails.
- **Pulled automatically:** Agents fetch the desired state from Git and make sure your cluster matches.
- **Continuously reconciled:** Any drift from the Git state gets auto-corrected by the agent.

The **GitOps toggle** in your Kubernetes service setup switches between these models. Enabling it changes what you configure and how deployments run.

**This choice is permanent.** When you create a service, you choose between GitOps and traditional CD at creation time, and this cannot be changed afterwards. Plan carefully based on your deployment needs.

:::tip Learn More About GitOps

Want to go deeper? Check out these Harness blogs:
- [Harness GitOps Product Overview](https://www.harness.io/products/continuous-delivery/harness-gitops)
- [GitOps vs. DevOps: What's the Difference?](https://www.harness.io/blog/gitops-vs-devops-whats-the-difference)
- [Complete Guide for GitOps on Kubernetes](https://www.harness.io/blog/complete-guide-for-gitops-on-kubernetes)
- [Top GitOps Benefits Explained](https://www.harness.io/blog/gitops-benefits)

:::

## How Each Deployment Workflow Works

Let’s walk through how each approach works with a real example—rolling out a new image version `v2.0.0`.

### CD Service Workflow (GitOps Disabled)

**Your service configuration:**

```yaml
artifacts:
  primary:
    sources:
      - identifier: myapp
        type: DockerRegistry
        spec:
          imagePath: myorg/myapp
          tag: <+input>
```

**Steps:**
1. Start the CD pipeline.
2. Select the image tag `v2.0.0` when prompted.
3. The Harness Delegate applies the manifests, deploying `image: myorg/myapp:v2.0.0` to the cluster.

**Result:** The application updates immediately to version `v2.0.0`.

**Key trait:** **Push-based** — Harness acts directly to update your cluster.

### GitOps Service Workflow (GitOps Enabled)

**Your service configuration:**

```yaml
manifests:
  - manifest:
      type: ReleaseRepo
      spec:
        store:
          spec:
            paths:
              - cluster-config/prod/config.json
```

**Before `config.json` update:**

```json
{
  "imageTag": "v1.9.0"
}
```

**Steps:**
1. Run the PR pipeline.
2. Provide the new image tag `v2.0.0` as a variable.
3. The **Update Release Repo** step changes `config.json` to `"imageTag": "v2.0.0"`.
4. **Merge PR** combines the update in Git.
5. The Agent detects the change and syncs your application to match Git.

**After update:**

```json
{
  "imageTag": "v2.0.0"
}
```

**Result:** The application is updated after the Agent completes the sync.

**Key trait:** **Pull-based** — the agent syncs the cluster to Git’s defined state.

## Comparing Pipeline Steps: CD vs GitOps

The pipeline steps you build differ depending on which model you use.

### CD Service Steps (GitOps Disabled)

In traditional CD, pipeline steps interact directly with your cluster:

| Step                        | Purpose                                                   |
|-----------------------------|-----------------------------------------------------------|
| **K8s Rolling Deployment**  | Rolling update of your app                                |
| **K8s Canary Deployment**   | Deploy a canary for safe testing                          |
| **K8s Blue Green Deployment** | Blue-green strategy for zero-downtime rollout          |
| **K8s Apply**               | Apply Kubernetes manifests                                |
| **K8s Scale**               | Scale deployments up/down                                 |
| **K8s Delete**              | Remove K8s resources                                      |

**Example pipeline:**

```yaml
execution:
  steps:
    - step:
        type: K8sRollingDeploy
        name: Rolling Deployment
        spec:
          skipDryRun: false
    - step:
        type: K8sApply
        name: Apply ConfigMap
        spec:
          filePaths:
            - configmap.yaml
```

### GitOps Service Steps (GitOps Enabled)

GitOps pipelines manage changes via Git and rely on the agent to apply those updates.

| Step                   | Purpose                                              |
|------------------------|------------------------------------------------------|
| **Update Release Repo**| Update config files in Git and create pull request   |
| **Merge PR**           | Merge the pull request automatically                |
| **Fetch Linked Apps**  | Get the relevant GitOps applications                |
| **GitOps Sync**        | Manually trigger agent sync (if needed)             |
| **Update GitOps App**  | Change app config like Helm overrides               |
| **Revert PR**          | Roll back by reverting a commit and opening a new PR|

**Example PR pipeline:**

```yaml
execution:
  steps:
    - step:
        type: UpdateReleaseRepo
        name: Update Config
        spec:
          variables:
            - name: imageTag
              value: "v2.1.0"
            - name: replicas
              value: "5"
    - step:
        type: MergePR
        name: Merge Changes
    - step:
        type: FetchLinkedApps
        name: Get Applications
```

**Bottom line:**  
- **CD pipelines** act directly on Kubernetes resources.
- **PR pipelines** update Git, and deployments happen when the agent detects changes.

## Choosing the Right Model

Which approach fits your workload? Here are common scenarios:

### Use CD Services When…

- You need immediate and explicit control over deployment timing and logic.
- Custom strategies like canary and blue-green are essential.
- You must coordinate with external systems (migrations, API calls).
- Non-Kubernetes workloads or legacy apps are in play.
- Real-time deployment feedback is important.

**Example:**  
Deploying a monolithic application that needs a database migration, cache warming, and multiple manual approval steps.

### Use GitOps Services When…

- You want all deployment config managed in Git for easy auditing.
- Automatic drift detection and correction matter.
- You’re running multiple environments, kept in sync by files in Git.
- Active use of Git history and commit traceability is needed.
- You deploy microservices across many clusters with ApplicationSets.

**Example:**  
Managing microservices in dev, staging, and prod, each with distinct config files in Git, and letting the agent ensure clusters stay in sync.

## Summary: Core Differences

The **GitOps toggle** fundamentally changes service behavior:

| What Changes           | CD Service (GitOps Disabled)             | GitOps Service (GitOps Enabled)      |
|-----------------------|------------------------------------------|--------------------------------------|
| **Manifest Options**  | Add K8sManifest, Add Override File       | Add Release Repo, Add Deployment Repo|
| **Manifest Target**   | K8s resources (Deployment, Service, etc.)| Git paths, config files, AppSet templates|
| **Artifact Handling** | Harness injects and deploys from pipeline| Git updated, agent deploys after sync|
| **Pipeline Steps**    | K8s deployment steps                     | PR steps (Update Repo, Merge PR, Fetch Apps)|
| **Deployment Trigger**| Pipeline execution                       | Merge to Git, agent detects/syncs    |
| **Speed**             | Immediate after pipeline runs            | Eventual, when agent syncs Git/cluster|
| **Control Model**     | Push-based (Harness to cluster)          | Pull-based (agent from Git)          |

**Key takeaway:**  
- **CD Services** directly deploy to Kubernetes with each pipeline run.
- **GitOps Services** update config in Git, and the agent syncs clusters to stay aligned.

## Next Steps

- [Create a GitOps Service](/docs/continuous-delivery/gitops/gitops-entities/service/)
- [Create a CD Service](/docs/continuous-delivery/x-platform-cd-features/services/create-services)
- [Learn about PR Pipelines](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines-basics)
- [Understand Kubernetes CD Services](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-services)