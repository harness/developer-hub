---
title: Overview
description: Learn about the new Harness Delegate
sidebar_position: 0
sidebar_label: Overview
---

:::warning Closed Beta

The new Harness Delegate is currently in closed beta and is available to select customers only. Access is determined by the product team based on current [supported use cases and steps](./install-delegate-2-0#whats-supported).

:::

The new Harness Delegate is a lightweight service that runs in your infrastructure to execute pipeline work. Unlike the legacy delegate, which is deployed as a container application in Kubernetes or Docker environments, the new delegate uses a transaction-based execution model where stages are executed as a sequence of initialization, execution, and cleanup tasks. This model provides consistent stage execution across different infrastructure types and ensures reliable cleanup of resources created during stage execution.

The new delegate operates alongside the legacy delegate. The legacy delegate continues to support the full range of Harness modules and capabilities, while the new delegate focuses on CI pipelines with a unified task framework optimized for local machine execution.

## Architecture overview

The new delegate implements a multi-layered task execution framework that separates concerns between routing, infrastructure management, and step execution.

### Task execution layers

The delegate task framework consists of three distinct layers:

- **Transportation layer**: Handles routing of tasks to delegates and manages scheduling configuration including timeouts, retries, and cron settings. This layer operates in Harness Manager.
- **Driver layer**: Manages launching and executing tasks on different platforms and infrastructures such as local Docker, VM pools, and Kubernetes clusters. This layer is implemented in the delegate.
- **Task layer**: Executes the actual step logic through module services and plugins. This layer is shared between Harness Manager and the delegate.

This separation ensures each component is responsible for a focused set of concerns, making the system more maintainable and extensible.

### Transactional execution model

The core concept in the new delegate is that each CI stage is modeled as a **transaction**. A transaction provides a shared state boundary for all tasks within a stage and guarantees cleanup of resources created during execution.

Transactional execution is implemented through three task types:

- **Init**: Initializes the execution environment and persisted state. For example, this includes cloning source code repositories, setting up Docker networks and volumes, and establishing shared variables.
- **Execute**: Runs individual pipeline steps using the environment and state created during initialization.
- **Cleanup**: Removes all resources created during initialization and execution, including Docker containers, networks, volumes, and any running subprocesses.

All tasks belonging to the same transaction are assigned the same transaction ID and are routed to the same delegate group, ensuring state consistency throughout the stage lifecycle.

### Infrastructure drivers

The new delegate supports multiple infrastructure drivers for executing transactional workloads:

- **Local driver**: Executes transactions directly on the host machine where the delegate runs. The init phase creates Docker networks and volumes, the execute phase can run commands directly on the host or within containers (including support for containerless execution), and the cleanup phase removes all Docker resources and terminates subprocesses.

- **VM driver**: Executes transactions on virtual machines provisioned from a pool. The init phase provisions a VM and prepares the execution environment, the execute phase forwards work to the provisioned VM, and the cleanup phase releases the VM back to the pool.

- **Kubernetes driver**: Executes transactions within a Kubernetes cluster. The init phase creates the necessary Kubernetes resources (pods, services, volumes), the execute phase forwards work to the initialized containers, and the cleanup phase removes all Kubernetes resources created during initialization.

The driver abstraction allows the same pipeline logic to run across different infrastructure types with consistent behavior.

## Task routing and selection

Tasks are routed to delegates based on routing policies and delegate selectors specified in the task request. The new delegate does not support the capability check framework used by the legacy delegate. When tasks must be routed to delegates with specific configurations or network access, selectors must be explicitly configured to target those delegates.

For more information about selector-based routing, go to [Use delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).

## Secrets management

The new delegate integrates with customer secret engines to fetch and inject secrets into task execution. Secret identifiers are provided as part of the task request, and secret expressions in the task payload are automatically replaced with decrypted values at runtime. Secrets are never persisted to disk or written to logs in plain text. The delegate automatically masks sensitive strings in all log output to prevent accidental disclosure.

## Capacity management and queuing

The new delegate introduces stage-level capacity management through the `MAX_STAGES` configuration setting. This setting limits the number of concurrent stages a delegate can execute. When a delegate reaches its capacity limit, additional stage requests are queued on the server side until capacity becomes available.

This approach prevents resource exhaustion on the host machine and provides predictable performance characteristics. The queuing mechanism ensures work is not lost and will be processed as soon as delegate capacity frees up.

Task cancellation is supported for local (Docker) infrastructure, allowing running tasks to be terminated when a pipeline is aborted or canceled.

## Standalone tasks

Not all delegate tasks fit the transactional model. The new delegate supports standalone tasks through the CGI (Common Gateway Interface) driver. CGI is a protocol for executing binaries through an HTTP interface, suitable for lightweight synchronous operations that don't require the full transaction lifecycle.

Examples of standalone tasks include connector validation tests and Git repository status checks. These operations complete quickly and don't create persistent resources that require cleanup.

## Logging and observability

The new delegate implements structured logging where each request creates a log client that is passed to task handlers. Logs include label context such as task identifiers, transaction IDs, and step names, making it easier to trace execution across distributed systems.

Remote logging to centralized services can be enabled through configuration. All sensitive strings are automatically masked before logs are written. The delegate publishes metrics about task execution, capacity utilization, and system health.

## Legacy task support

When integration with legacy delegate functionality is required, the new delegate can utilize a delegate sidecar mechanism. The sidecar runs alongside the new delegate and handles execution of specific tasks that require legacy delegate implementations. This bridge mechanism enables gradual migration and ensures compatibility during the transition period.

## System requirements

The new delegate runs on infrastructure managed by customers. It requires outbound network access to Harness Manager and to any external systems referenced in pipelines, including source code repositories, artifact registries, secret managers, and deployment targets.

Because the delegate runs directly on the host machine rather than in a container with resource limits, capacity planning should account for the expected workload. Resource consumption depends on the number of concurrent stages configured through `MAX_STAGES` and the resource requirements of the steps being executed.

## Proxy configuration

For environments that require proxy servers for outbound connectivity, the delegate supports standard proxy configuration. Proxy settings can be specified in the delegate configuration file.

For more information about proxy configuration, go to [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings).

## Future enhancements

Several capabilities are planned for future releases:

- **Perpetual tasks**: A framework for long-running background tasks such as artifact polling for triggers. This capability is not yet implemented in the new delegate.
- **Enhanced connector support**: Expanded support for additional source code management systems, artifact repositories, and cloud providers.
- **Mutual TLS**: Support for mutual TLS authentication for enhanced security in zero-trust environments.

## Installation and configuration

For detailed installation instructions and configuration options, go to [Install Harness Delegate](./install-delegate-2-0).

## Feature comparison

Because the new delegate is in closed beta, feature coverage is still expanding. Support varies across connectors, secret managers, infrastructure drivers, and CI step types.

For a detailed comparison with the legacy delegate and information about the development roadmap, go to [Feature Parity](./feature-parity).

For information about the legacy delegate, go to [Legacy delegate documentation](/docs/platform/delegates/delegate-concepts/delegate-overview).
