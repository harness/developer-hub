---
title: Feature Parity
description: Detailed comparison of features between the new delegate and the legacy delegate
sidebar_position: 1
sidebar_label: Feature Parity
---

:::warning Closed Beta

The new Harness Delegate is currently in closed beta. Features and capabilities are actively being developed and expanded. This page reflects the current state and will be updated as new features become available.

:::

This page compares the new and legacy delegates, including details on supported features, planned enhancements, and architectural differences. This information can help determine which delegate is appropriate for specific workflows and use cases.

## Architectural differences

The new delegate and legacy delegates are built on different architectural foundations, reflecting various design goals and execution models.

### Execution models

The legacy delegate uses a task-based execution model where each operation is an independent task. Tasks are assigned to delegates based on capability checks, during which they verify they can access the required external systems before accepting work. This model has been effective for supporting the broad range of Harness modules and integrations.

The new delegate uses a transaction-based execution model, treating each stage as an atomic unit of work. A transaction consists of initialization, execution, and cleanup phases that are guaranteed to execute on the same delegate. This model provides stronger guarantees about resource cleanup and state consistency within a stage.

### Task routing

The legacy delegate implements capability-based routing. When a task is created, Harness Manager queries available delegates to determine which ones have connectivity to the required external systems. Tasks are automatically routed to delegates that pass capability checks.

The new delegate implements selector-based routing exclusively. Delegates are tagged with selectors during installation, and tasks specify which selectors are required. There are no automatic capability checks; routing is purely based on matching selectors. This simplified routing model reduces coordination overhead but requires explicit configuration.

For more information about configuring selectors, go to [Use delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).

### Capacity management

Both delegates support capacity limits, but at different levels of granularity. The legacy delegate uses `DELEGATE_TASK_CAPACITY` to limit the total number of concurrent tasks across all types. The new delegate uses `MAX_STAGES` to limit concurrent CI stage executions. When capacity limits are reached, additional work is queued until capacity becomes available.

## Module support

Module support depends on how you deploy the new delegate — hosted (Harness Cloud) or self-hosted (local machine or Kubernetes).

### Hosted cloud (Harness Cloud)

When running on Harness Cloud, the new delegate has full parity across all Harness modules. This includes Continuous Delivery (CD), Cloud Cost Management (CCM), Security Testing Orchestration (STO), Chaos Engineering, Feature Management and Experimentation (FME), Service Reliability Management (SRM), Infrastructure as Code Management (IaCM), and Continuous Integration (CI).

### Self-hosted (local or Kubernetes)

When self-hosted on a local machine or Kubernetes cluster, the new delegate currently supports Continuous Integration (CI) pipelines only, with full CI step parity as described in the [CI step compatibility](#ci-step-compatibility) section below.

The following modules require the legacy delegate when running self-hosted:

- Continuous Delivery (CD)
- Cloud Cost Management (CCM)
- Security Testing Orchestration (STO)
- Chaos Engineering
- Feature Management and Experimentation (FME)
- Service Reliability Management (SRM)
- Infrastructure as Code Management (IaCM)

The self-hosted new delegate is optimized for CI workloads that benefit from direct access to local hardware or licensed software on a specific machine, such as iOS builds requiring Xcode or Android builds requiring Android SDK.

## CI stage routing

To route a CI stage to the new delegate, the stage must be explicitly configured to do so. Two routing mechanisms are available:

- **Per-stage routing**: Set the stage variable `HARNESS_CI_INTERNAL_ROUTE_TO_RUNNER` to `true` for each stage that should use the new delegate.
- **Feature flag routing**: Enable account-level feature flags to route all CI stages for specific infrastructure types. For example, `CI_V0_LOCAL_BUILDS_USE_RUNNER` routes all local (Docker) CI stages to the new delegate when enabled.

Without explicit configuration, all stages are routed to legacy delegates by default.

### Feature flags controlling delegate routing

The transition from legacy delegates to the new delegate is controlled through a series of feature flags that manage task submission and execution workflows. These flags enable the gradual rollout and testing of the new delegate functionality. The following feature flags are available:

**Core routing flags:**

- **`PL_USE_RUNNER`**: Routes connector validation and connection tests to the new delegate. This flag is waiting on Git-sync tests and automations to pass before general availability.

**CI infrastructure routing flags:**

- **`CI_V0_LOCAL_BUILDS_USE_RUNNER`**: Routes v0 local build pipeline operations (Docker infrastructure) to the new delegate. This flag enables the primary use case for the new delegate: local machine execution.

- **`CI_V0_HOSTED_BUILDS_USE_RUNNER`**: Routes v0 hosted build pipeline operations to the new delegate.

- **`CI_V0_FREE_HOSTED_BUILDS_USE_RUNNER`**: Routes hosted builds for non-credit users to the new delegate.

**Optional behavior flags:**

- **`CI_INVALID_SECRET_ERROR`**: When enabled, execution fails if the referred secret is invalid. Earlier in hosted builds, execution never failed for such scenarios, but this was not in line with Kubernetes behavior (which always fails the execution). This ensures consistent behavior across infrastructure types and helps catch secret configuration issues early. Protected by feature flag `CI_RUNNER_FRAMEWORK_SECRET_EVAL` for rollback.

- **`CI_RUNNER_FRAMEWORK_SECRET_EVAL`**: Controls secret evaluation in the new delegate's execution framework. Acts as a rollback protection mechanism for `CI_INVALID_SECRET_ERROR`.

- **`CI_UNIFIED_RUNNER_REPLACE_STEP_ID_BY_TASK_ID_IN_V0_PIPELINES`**: Changes field population in the new delegate's ExecuteRequest to use task IDs instead of step IDs. This affects v0 pipelines only (v1 pipelines always use task IDs with an empty string passed in the Runner Task API). When disabled, v0 pipelines use step ID (legacy behavior). When enabled, v0 pipelines use the task ID.

Feature flags are managed at the account level by Harness and are enabled as part of the closed beta program. Contact your Harness representative to discuss which flags are appropriate for your use case and testing requirements.

## CI step compatibility

All CI steps are fully supported on the new delegate with full parity to the legacy delegate. This includes Git Clone, Run, Run Tests, Test Intelligence, Build Intelligence, Cache Intelligence, Docker Layer Caching, Background, Plugin, Upload to JFrog, and all Build and Push steps (Docker, GAR, GCS, ECR, S3).

## Source code management

All Git connectors are supported for the Git Clone step, including GitHub, GitLab, Bitbucket, Harness Code, and generic Git.

## Secret managers

All secret managers are supported with full parity to the legacy delegate, except custom secret managers which are planned for a future release. Supported secret managers include HashiCorp Vault, AWS Secrets Manager, AWS KMS, Google Secret Manager, GCP KMS, and Azure Key Vault.

:::note HashiCorp Vault
HashiCorp Vault support for all authentication methods requires the feature flag `PL_USE_CGI_FOR_VAULT_IN_RUNNER`. Contact your Harness representative to enable this flag.
:::

## Connector support

The following connectors have been validated for use with the new delegate:

- **Docker Registry (DockerHub)**: Supported for pulling images.
- **JFrog Artifactory**: Supported for artifact uploads.
- **Other registries** (ECR, GCR, ACR, GAR): Planned for future releases.

Connectors for cloud providers (AWS, Azure, GCP), Kubernetes clusters, CI/CD tools (Jenkins), and ticketing systems (Jira, ServiceNow) are not yet supported for connector validation through the new delegate. Support for these connector types is planned for future releases.

## Infrastructure support

The new delegate supports the following infrastructure types for executing CI stages:

- **Harness Cloud (hosted)**: Fully supported across all modules. No local delegate installation required.
- **Local (Docker)**: Executes work on the machine where the delegate runs, using Docker for containerized steps. This is the primary use case for the self-hosted new delegate.
- **Kubernetes**: Executes work in a Kubernetes cluster. Support is more limited than for local infrastructure.
- **VM pools**: Planned for future releases.

Other infrastructure types including cloud VMs are not supported for self-hosted deployments.

## What's coming next

The development roadmap includes enhancements across several areas. Items are categorized by priority based on user demand and architectural dependencies.

### Near-term

These items are currently in active development or scheduled for upcoming releases:

- **Custom secret managers**: The only secret manager integration not yet supported on the new delegate.
- **Platform features**: Complete proxy and custom certificate support. Perpetual task framework for artifact triggers and polling. Delegate sidecar integration for legacy task compatibility.
- **Installation and deployment**: Improved installation experience and packaging for different operating systems.

### Mid-term

These items are planned but not yet in active development:

- **Kubernetes enhancements**: Pod Spec Overlay for customizing pod specifications. Improved debugging and troubleshooting capabilities.
- **Security**: Mutual TLS (mTLS) support for enhanced authentication in zero-trust environments.
- **Infrastructure**: VM pool support for executing builds on dynamically provisioned virtual machines.
- **CI integrations**: Additional plugin support. Alternative Docker runtime support (Rancher, Colima). Enhanced volume mounting capabilities.

### Future

These items are under consideration for future releases:

- **Advanced build features**: Kaniko and Buildx support for container image building. HAR (HTTP Archive) integration for debugging.
- **Platform enhancements**: Support for pipeline executions longer than 24 hours. Secret output variables. Enhanced debug mode. Additional proxy variable support.

The roadmap is subject to change based on user feedback and evolving requirements.

## Choosing between delegates

When deciding which delegate to use, consider the following factors.

**Use the new delegate when:**

- Running workloads on Harness Cloud, where the new delegate provides full parity across all modules.
- Running CI pipelines that benefit from local machine execution, such as iOS builds requiring Xcode or Android builds requiring Android SDK.
- Direct access to specialized hardware or licensed software on specific machines is required.
- The CI steps and connectors needed are supported according to the compatibility sections above.

**Use the legacy delegate when:**

- Running self-hosted deployments that use any Harness module other than CI.
- CI steps or connectors not yet supported by the new delegate are required (self-hosted only).
- Capability-based routing is needed to ensure tasks are automatically sent to delegates with appropriate connectivity.
- Deploying delegates in Kubernetes with standard orchestration and management tools.

Both delegates can coexist in the same account. Different pipelines can be configured to use different delegate types based on their specific requirements. This allows gradual adoption and testing of the new delegate without disrupting existing workflows.

## Comparison with legacy delegate

For comprehensive information about the legacy delegate, including installation, configuration, and management, go to [Legacy delegate documentation](/docs/platform/delegates/delegate-concepts/delegate-overview).

For proxy configuration applicable to both delegate types, go to [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings).
