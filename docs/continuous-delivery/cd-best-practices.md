---
title: CD Best Practices
description: Best practices for Harness Continuous Delivery deployments — strategy selection, environment management, rollback, governance, and operational safety.
keywords:
  - continuous delivery
  - best practices
  - deployment strategies
  - rollback
  - blue-green
  - canary
  - rolling
  - deployment freeze
  - governance
  - OPA
tags:
  - cd-best-practices
  - deployments
  - deployment-strategies
---

Harness Continuous Delivery gives teams the building blocks to ship software reliably — deployment strategies, environment modeling, rollback automation, governance policies, and concurrency controls. How you combine those building blocks determines whether releases are smooth or stressful.

This page collects deployment-focused best practices drawn from production patterns across Kubernetes, Helm, ECS, serverless, and traditional platforms. Use it as a checklist when designing new pipelines or hardening existing ones.

## Choose the Right Deployment Strategy

Every deployment strategy trades off between speed, safety, and infrastructure cost. Pick the one that matches your risk tolerance and traffic profile.

- **Rolling:** Updates instances in batches. Good for stateless workloads where a brief mix of old and new versions is acceptable. This is the default for most Kubernetes Deployments and DaemonSets.
- **Blue-Green:** Runs two identical environments and switches traffic atomically. Ideal when you need instant rollback and cannot tolerate mixed versions. Works across [Kubernetes](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment), [ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial), [ASG](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial), [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial), and [Tanzu](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart).
- **Canary:** Routes a small percentage of traffic to the new version first, then gradually increases. Best when you want to validate real user behavior before full rollout. Harness supports [phased canary with traffic shifting](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/traffic-shifting-step) on Kubernetes, ECS, and Helm.
- **Basic:** Deploys to all targets at once. Suitable for non-production environments or internal tooling where downtime is acceptable.

For a deeper comparison of these strategies, see [Deployment concepts and strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts). For platform-specific blue-green differences (selector swap vs. traffic shifting vs. slot swap), see [Blue-green across platforms](/docs/continuous-delivery/manage-deployments/blue-green-across-platforms).

:::tip start with rolling, graduate to canary
If you are new to Harness CD, start with rolling deployments. Once you have confidence in your pipeline, add a canary phase in front of the rolling phase so a small slice of traffic validates the release before the full rollout.
:::

## Build Once, Deploy Everywhere

The artifact you test in your lower environment should be the exact same artifact that reaches production. Rebuilding introduces drift and makes it harder to reproduce issues.

Use the Harness [propagate service](/docs/continuous-delivery/x-platform-cd-features/services/propagate-and-override-cd-services) feature to carry the same service definition and artifact version across multiple stages. Pair it with [service overrides](/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides) to swap only environment-specific values (endpoints, secrets, replica counts) without changing the artifact or manifest structure.

## Keep Environments Consistent

Differences between staging and production are the most common source of "works on my machine" failures at deploy time. Minimize those differences with these practices.

- **Model environments explicitly.** Create distinct [Harness environments](/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview) for each tier (dev, staging, production) with matching infrastructure definitions. Mark production environments as `Production` type so RBAC and governance policies can target them.
- **Use overrides instead of forked manifests.** Rather than maintaining separate manifests per environment, define a single base manifest and apply [environment-level or infrastructure-level overrides](/docs/continuous-delivery/x-platform-cd-features/overrides-v2) for values that change.
- **Scope infrastructure to services.** When multiple teams share a project, [scope infrastructure definitions to specific services](/docs/continuous-delivery/x-platform-cd-features/environments/scope-infra-to-services) to prevent accidental cross-deployment.

## Design for Rollback from Day One

Rollback should never be an afterthought. Harness automatically adds rollback steps to deployment stages, but you can strengthen the safety net further.

- **Understand default rollback behavior.** For Kubernetes, Harness performs a `kubectl rollout undo` on failure. For Helm, it runs `helm rollback`. Blue-green deployments revert traffic to the previous environment by swapping selectors or routes. Review the details in [Kubernetes rollback](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-rollback) and [Helm rollback](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/step-reference/helm-rollback).
- **Customize failure strategies.** The default stage-level failure strategy is to roll back the stage. You can override this per step or step group — for example, retrying a flaky integration test before falling back to a full rollback. See [Failure strategy settings](/docs/continuous-delivery/x-platform-cd-features/executions/step-failure-strategy-settings).
- **Enable post-deployment rollback.** For supported deployment types (Kubernetes, Native Helm, ECS, ASG, Tanzu), Harness lets you [roll back a completed, successful deployment](/docs/continuous-delivery/manage-deployments/rollback-deployments) to a previous version — even after the pipeline has finished.

:::warning post-deployment rollback limitations
Post-deployment rollback is available for up to 30 days after a successful execution. It is not available for pipelines that used custom stages or that failed during execution. Review the full constraints in the [rollback deployments](/docs/continuous-delivery/manage-deployments/rollback-deployments) doc.
:::

## Use Deployment Freezes for Change Control

Deployment freezes prevent accidental releases during critical business periods — code freezes, holiday traffic peaks, or compliance windows.

- **Define freeze windows** at the account, org, or project level with specific schedules, recurrence rules, and scope (services, environments, pipelines). See [Deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze).
- **Use exceptions sparingly.** You can exclude specific pipelines or services from a freeze, but every exception weakens the safety guarantee. Document the reason for each exception.
- **Plan for in-flight pipelines.** When a freeze activates, running pipelines complete their current stage and then abort. Account for this in your release scheduling.

## Control Concurrency and Resource Contention

Deploying the same service to the same infrastructure simultaneously can corrupt state or create race conditions. Harness provides three mechanisms to prevent this.

- **Resource constraints (default):** Every service + infrastructure combination gets a unique infrastructure key. By default, only one deployment runs at a time per key. Enable `allowSimultaneousDeployments` only when your deployment type genuinely supports it. See [Deployment resource constraints](/docs/continuous-delivery/manage-deployments/deployment-resource-constraints).
- **Barriers:** Synchronize parallel stages within a single pipeline execution so dependent stages wait for each other before proceeding. See [Synchronize deployments using barriers](/docs/continuous-delivery/manage-deployments/synchronize-deployments-using-barriers).
- **Queue steps:** Serialize executions across pipelines at the account level using a custom resource key. Useful when multiple pipelines target a shared resource like a database migration. See [Queue steps](/docs/continuous-delivery/manage-deployments/control-resource-usage-with-queue-steps).

## Enforce Governance with Policy as Code

Manual reviews don't scale. Use OPA policies to codify your deployment standards and enforce them automatically.

- **Apply policies on save** to validate service definitions, environment configurations, infrastructure definitions, and overrides before they are ever used in a pipeline. See [OPA policies for CD entities](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/opa-policies-for-cd-entities).
- **Apply policies on run** to evaluate pipeline state during execution. This is useful for rules like "production deployments require at least one approval step" or "canary weight must not exceed 25% in the first phase." See [Add a governance policy step](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline).
- **Use RBAC to restrict production access.** Combine resource groups and roles to ensure only authorized users can deploy to production environments. A practical walkthrough is available in [Prevent developers from deploying to higher environments](/docs/continuous-delivery/cd-onboarding/new-user/prevent-devs-deploying-higher-env).

## Integrate Verification into Your Pipeline

Deploying code is only half the job. Verifying that the deployment is healthy before promoting or completing it closes the feedback loop.

- **Add a Verify step** after deployment to connect your APM provider (Datadog, Prometheus, New Relic, Splunk, AppDynamics, etc.) and let Harness analyze metrics and logs for anomalies. See [Verify deployments with the Verify step](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step).
- **Pair verification with canary deployments.** Run the Verify step during the canary phase so anomalies are caught while only a fraction of traffic is exposed. If verification fails, the automatic rollback removes the canary before users are broadly impacted.

## Standardize with Templates

Templates eliminate configuration drift across teams and reduce the maintenance burden of managing dozens of similar pipelines.

- **Create stage templates** for your standard deployment patterns (e.g., "K8s Canary + Verify + Approval" or "Helm Blue-Green"). Teams reference the template and supply only the service and environment inputs. See [Stage templates](/docs/platform/templates/add-a-stage-template).
- **Use pipeline templates** when the entire flow — build, deploy to staging, approve, deploy to production — should be consistent across services.
- **Store templates in Git** so changes go through code review. Harness [Git Experience](/docs/platform/git-experience/configure-git-experience-for-harness-entities) supports remote templates alongside remote pipelines.

For a deeper guide on reusable pipeline design, see the [Pipeline design guide](/docs/continuous-delivery/cd-onboarding/new-user/pipeline-design-guide).

## Manage Pipelines as Code

Treating pipelines as code gives you version history, peer review, and the ability to roll back pipeline changes — not just application changes.

- **Store pipelines in Git** using [Harness Git Experience](/docs/platform/git-experience/configure-git-experience-for-harness-entities). Git becomes the source of truth, and UI edits create commits.
- **Use the Harness Terraform provider** to provision pipelines, services, environments, and connectors programmatically. See [Terraform provider ramp-up](/docs/continuous-delivery/cd-onboarding/new-user/rampup-terraform-provider).
- **Manage input sets at scale** to separate "what to deploy" from "how to deploy." This keeps pipeline definitions stable while runtime parameters change per release. See [Manage input sets at scale](/docs/continuous-delivery/cd-onboarding/new-user/manage-inputsets-at-scale).

## Set Up Notifications and Feedback Loops

Deployments fail silently when no one is watching. Proactive notifications reduce mean time to detection.

- **Configure pipeline notifications** for stage start, success, failure, and approval events. Harness supports Slack, Microsoft Teams, email, PagerDuty, and webhook targets. See [Notify users of pipeline events](/docs/continuous-delivery/x-platform-cd-features/cd-steps/notify-users-of-pipeline-events).
- **Monitor deployment metrics** using Harness dashboards to track lead time, deployment frequency, failure rate, and rollback rate. See [Monitor CD deployments](/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments).

## Design Pipelines Within Platform Guardrails

Harness enforces a set of platform-level guardrails to keep pipelines performant and your account stable. Designing with these boundaries in mind from the start prevents surprises during scale-up.

### Keep pipeline YAML lean

Large, monolithic pipeline definitions can hit the YAML parser's code-point limit, resulting in `The incoming YAML exceeds the limit` errors. Rather than packing dozens of stages or steps into a single pipeline, use [matrix and looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) to generate stages dynamically from a compact definition. This keeps your YAML small while still deploying across many targets.

### Stay within concurrency limits

Harness allows up to **256 parallel stages or steps** per pipeline, but the number that execute simultaneously depends on your plan tier (for example, up to 100 concurrent stages on Enterprise). Anything beyond the concurrent limit is queued automatically — no executions are dropped. When designing high-parallelism pipelines, set `maxConcurrency` on your matrix or multi-service stage to a value that matches your delegate capacity and target infrastructure.

At the account level, the default concurrent active pipeline execution limit is plan-dependent (200–1000 executions). You can view and adjust this under **Account Settings > Default Settings > Pipeline > Concurrent Active Pipeline Executions**. For details, see [Pipeline settings](/docs/platform/pipelines/pipeline-settings).

### Right-size pipeline and stage timeouts

The maximum pipeline timeout is **35 days** on Enterprise and **30 days** on Team plans, but most deployments should complete in minutes, not days. Set explicit, realistic timeouts on stages and steps so stalled executions fail fast instead of consuming a concurrency slot. You can configure timeout defaults at the account, org, or project scope. See [Pipeline settings](/docs/platform/pipelines/pipeline-settings).

### Size your delegates for Helm at scale

Large Helm repositories with heavy `index.yaml` files (15 MB+) cause CPU spikes on the delegate during `helm repo update`. Harness optimizes concurrent Helm commands by reusing output across parallel processes, but delegate resources still matter. The certified benchmarks for a 2 vCPU / 8 GB delegate are:

| index.yaml size | Concurrent deployments supported |
|-----------------|----------------------------------|
| 20 MB           | 15                               |
| 75 MB           | 5                                |
| 150 MB          | 3                                |

If your repository is large, allocate additional CPU and memory to the delegate or split charts across smaller repositories. For more context, see [Native Helm deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart).

### Mind log size boundaries

Deployment step logs are capped at **25 MB per step** (5 MB for CI steps), and the Harness UI displays up to **5,000 lines** per step. Steps that produce excessive output — such as verbose Terraform plans or large manifest diffs — should redirect detailed output to a file or external log store and keep console output focused on actionable information. See [Deployment logs and limitations](/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations).

## Next Steps

These best practices give you a foundation for reliable, governed deployments. As your adoption matures, continue refining your pipelines and processes.

- [Deployment concepts and strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts)
- [Pipeline design guide](/docs/continuous-delivery/cd-onboarding/new-user/pipeline-design-guide)
- [CD onboarding path](/docs/continuous-delivery/cd-onboarding/new-user/onboarding-path)
