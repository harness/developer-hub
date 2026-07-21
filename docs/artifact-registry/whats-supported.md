---
title: What's Supported with Artifact Registries
sidebar_label: What's Supported
description: The registry types, platform integrations, and regional capabilities available in Harness Artifact Registry.
sidebar_position: 1
keywords:
  - artifact registry
  - supported registry types
  - platform integrations
  - multi-region replication
tags:
  - artifact-registry
  - reference
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';

:::info
To enable Harness Artifact Registry in your account, contact your sales representative or reach out to the team at [ar-interest@harness.io](mailto:ar-interest@harness.io).
:::

---

## What you will learn

- **Supported registry types:** The current list of registry formats you can create in Harness Artifact Registry.
- **Platform integrations:** How Artifact Registry works with RBAC, CI, CD, Dependency Firewall, and the Harness CLI.
- **Storage and replication:** How multi-region replication works and which regions are supported.

---

## Registries
Harness Artifact Registry supports a variety of registry types, and new ones are often added. We currently support the registry types listed below.

### Supported registry types
These are the currently supported registry types.
- **Docker:** Your go-to for container images.
- **Helm:** Perfect for managing Kubernetes applications.
- **Generic:** Flexible for all your needs.
- **Raw File:** Store and manage arbitrary files by path with HTTP-based upload, download, and delete.
- **Maven:** Essential for Java projects.
- **Python:** For your Python packages using **pip**, **Poetry**, or **uv**.
- **NPM:** JavaScript package management.
- **NuGet:** .NET package manager.
- **RPM:** Red Hat package management.
- **Gradle:** Streamline your build automation.
- **SBT (Scala Build Tool):** Tailored for Scala and Java projects.
- **Dart:** For all your Dart and Flutter packages.
- **Swift:** Swift packages with Swift Package Manager (SwiftPM) registry workflows.
- **PHP Composer:** Private Composer packages with Packagist-compatible workflows.
- **Go:** Support for Go modules.
- **Cargo:** Rust package management.
- **Conan:** C and C++ package management with Conan CLI workflows.
- **Hugging Face:** Machine learning models and datasets.
- **Conda:** Python and R packages with Anaconda-compatible workflows.
- **Puppet:** Puppet Forge-compatible modules with `r10k` support.

### Coming soon

- **Alpine:** Alpine Linux packages.
- **RubyGems:** Ruby packages.

---

## Platform support
Harness Artifact Registry (HAR) is seamlessly integrated with the Harness Platform, offering you robust features and capabilities.

### Role-based Access Control (RBAC)
HAR has [full RBAC support](/docs/platform/role-based-access-control/rbac-in-harness). Simply go to your project settings, create a new role, and scroll to the bottom to find the supported HAR resources. 

This comes with 3 roles automatically created for you:
- **Artifact Registry Viewer**: Bind to this role to allow a user to view registries and its contents.
- **Artifact Registry Contributor**: Bind to this role to allow a user to push and pull from registries.
- **Artifact Registry Admin**: Bind to this role to allow a user full admin access to the AR module.

### Continuous Integration (CI)
HAR provides native support for pushing images to Docker registries, eliminating the hassle of managing external connections. To set up, use the **Build and Push to Docker** step in a CI stage and select **Harness Artifact Registry** as your registry type. From there, simply choose the registry and image you want to use from convenient, pre-populated lists in the fields below. 

Learn more about streamlining your CI process with our guide to [Build and Push to Docker](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry)

### Dependency Firewall

**Dependency Firewall** is how Harness Artifact Registry applies **supply chain guardrails** when you use **upstream proxy** registries. External packages are checked against your organization’s policies **before** they are cached in Harness, so you can enforce rules on things like vulnerabilities, licenses, and package age in one place instead of only relying on downstream scans. It is part of the same [Policy as Code](/docs/platform/governance/policy-as-code/harness-governance-overview) model used across the platform.

For a full description of how it works, the dashboard, and how to configure policies, go to [Dependency Firewall](/docs/artifact-registry/dependency-firewall/overview).

### Harness CLI

The **Harness CLI** (`hc`) is the command-line way to work alongside Artifact Registry: you can inspect and manage **registries** and **artifacts**, handle **metadata** and lifecycle operations where supported, **evaluate dependencies** against your registry’s security rules, and **configure local package manager clients** (npm, Maven, pip, NuGet) to talk to Harness registries. It is intended for automation, scripts, and day-to-day tasks without opening the UI for every change.

Install the CLI from [Install the Harness CLI](/docs/platform/automation/cli/install). For Artifact Registry–specific commands and examples, go to [Manage artifacts and registries with the CLI](/docs/artifact-registry/artifact-registry-cli/manage-artifacts-registries).

### Continuous Deployment (CD)
Speed up your deployment process by using HAR as your [Artifact sources in CD](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources) without the need for separate registry connectors. Supported deployment swimlanes include Kubernetes, ECS, and other targets that accept Docker artifact sources.

Learn more about [CD services](/docs/continuous-delivery/x-platform-cd-features/services/services-overview).

### Multi-region replication

When you push an artifact, Harness stores it in your primary region and eagerly replicates it to a disaster recovery bucket. On the first pull from a different region, Harness copies the artifact to the nearest regional bucket; subsequent pulls from that region are served locally.

Supported regions: US-West, US-East, EU-West, EU-East, Asia-Pacific, and Oceania. Proximity detection and regional routing are handled automatically based on client IP; no additional registry configuration is required.

Read requests automatically fail over to the disaster recovery bucket if primary storage becomes unavailable. Write operations require primary storage availability.

---

## Frequently asked questions

<FAQ
  question="Does Harness Artifact Registry support Zarf packages or other non-container OCI artifacts?"
  mode="fallback-only"
  fallback="Zarf packages push and pull successfully through a Harness Artifact Registry Docker registry using the Zarf CLI. The artifact type displays as `undefined` in the Artifact Registry UI because the UI is optimized for container images, but push and pull operations work as expected. Harness has not formally validated support for non-container OCI artifacts other than Zarf. If you plan to use a different tool or artifact type, go to [Harness Support](mailto:support@harness.io) to confirm compatibility."
/>

---

## Related concepts

- Go to [Get Started](/docs/artifact-registry/get-started/overview) to understand Artifact Registry fundamentals.
- Go to [Quickstart](/docs/artifact-registry/get-started/quickstart) to create your first registry.
- Go to [Artifact Registry and Continuous Delivery](/docs/artifact-registry/platform-integrations/cd-ar-integrations) to consume Artifact Registry artifacts in CD pipelines.
- Go to [Artifact Registry and Continuous Integration](/docs/artifact-registry/platform-integrations/ci-ar-integrations) to push and pull artifacts from CI pipelines.
- Go to [Dependency Firewall](/docs/artifact-registry/dependency-firewall/overview) to apply supply-chain policy to upstream artifacts.
