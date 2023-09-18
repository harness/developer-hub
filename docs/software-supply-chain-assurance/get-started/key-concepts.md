---
title: Harness SSCA key concepts
sidebar_label: Key concepts
description: Basic terminology and concepts related to SSCA
sidebar_position: 2
---

This topic covers basic terminology and concepts related to the Harness Software Supply Chain Assurance (SSCA) module.

## Software supply chain security

A *software supply chain* comprises almost anything involved in developing, building, and publishing software artifacts. This can include components, libraries, tools, processes, and more. *Software supply chain security* includes the measures and processes required to secure these elements.

[Supply-chain Levels for Software Artifacts (SLSA)](https://slsa.dev/) provides industry-wide standards and frameworks for software supply chain security. The Harness SSCA module helps you meet these standards and otherwise secure your software supply chain.

It is a best practice in software supply chain security to produce declarations about your supply chain inventory or security, including:

* **Software Bill of Materials (SBOM):** An inventory of components used in producing an artifact.
* **SLSA Provenance:** A description of how an artifact was produced.
* **Attestation:** A digitally signed SBOM or SLSA Provenance that can be verified for authenticity.

For a detailed explanation of software supply chain security concepts and terms, go to the [SLSA terminology documentation](https://slsa.dev/spec/v1.0/terminology).

## SBOM generation and management

```mdx-code-block
import SbomAbout from '/docs/software-supply-chain-assurance/shared/sbom-about.md';
```

<SbomAbout />

## Policy management and enforcement

With the Harness SSCA module, you can define and enforce policies governing the use of open-source components within your software artifacts. This policy management and enforcement capability helps you ensure compliance with your security, legal, and operational requirements.

### Policy definitions

You can create custom policies to define rules for open-source component usage based on criteria such as component name, version, license, PURL, and supplier.

### Policy types

The SSCA module supports these policy types:

* **Deny list policies:** Define components, or combinations of component attributes, that are not allowed. If an artifact includes a component that is part of the deny list, the artifact's policy evaluation fails.
* **Allow list policies:** Define components or combinations of component attributes that are allowed. If an artifact includes a component that *is not* part of the allow list, the artifact's policy evaluation fails.

### Policy enforcement

The SSCA module enforces policies in the CI and CD stages of the software development lifecycle, ensuring that you build and deploy only compliant software artifacts. When an artifact moves through the CI and CD stages of your [pipelines](#pipelines), the SSCA module checks the artifact and its associated SBOM against your defined policies. You can review any detected policy violations on the **Execution details** page in Harness. For more information, go to [View attestations and violations](../ssca-view-results.md).

<!-- Future: If any violations are detected, response actions are activated based on your policy configurations. -->

<!--H2 Comprehensive visibility

The SSCA module provides several ways to review your software supply chain's health and security.

* **SSCA Dashboard:** Provides an overview of open-source component usage, policy violations, and license usage across your software artifacts. Use this dashboard to quickly understand and monitor your software supply chain's health at a high level.
* **Component View:** Provides a detailed perspective of the open-source components used within your software artifacts. By offering in-depth component information, the Component View helps you better understand your software supply chain and more effectively manage component-related risks.
* **Artifact View:** Provides a detailed perspective on individual software artifacts, including associated open-source components and deployment environments. By offering in-depth artifact information, the Artifact View helps you better understand your software supply chain and more effectively manage artifact-related risks. -->

<!-- H2 Remediation workflows

You can use remediation flows in the SSCA module to respond quickly and effectively to newly discovered zero-day vulnerabilities. With remediation flows, you can quickly assess all usage of vulnerable components in different artifacts and understand where they are deployed, thereby creating a targeted remediation effort. The SSCA module provides the following features to help you effectively and efficiently respond to incidents:

* **Actively monitor threats by subscribing to various vulnerability feeds.** Upon detecting new vulnerabilities, automatically assess the impact, generate a list of impacted, and generate a list of environments where the impacted artifacts are deployed.
* **Generate alert notifications.** Notifications can include information about incidents and impacted artifacts. You can define rules about when to send notifications and who to notify.
* **Search components based on name, version, CVE, and so on.** Quickly filter through lists of impacted artifacts and environments.
* **Trigger and monitor remediation workflows.** Initiate remediation workflows in response to incidents and track the remediation's progress.
* **Automatically add components to deny lists.** Prevent further use of impacted components by automatically adding the impacted component to the deny list. -->

## SLSA compliance

With the Harness SSCA module, you can achieve SLSA Level 2 compliance by generating SLSA Provenance according to the [SLSA v1.0 spec](https://slsa.dev/).

Provenance attestations are stored as `.att` files in the artifact repository along with the image. You can also find the SLSA Provenance on the **Execution details** page in Harness. For more information, go to [View attestations and violations](../ssca-view-results.md).

## Harness Platform components

The Harness SSCA module leverages integrates with other Harness modules and uses components that are common to the Harness Platform. For more information about Harness Platform terminology and concepts, go to [Harness key concepts](../../get-started/key-concepts.md).

### Pipelines

You add SSCA steps to your CI (build) and CD (deploy) stages in your Harness pipelines.

A pipeline is an end-to-end workflow that, for example, pulls code from a codebase, builds an artifact, runs tests or other actions on the artifact or code, and then uploads or deploys the artifact to storage or a container registry.

To learn more about CI and CD pipelines go to:

* [CI key concepts](../../continuous-integration/get-started/key-concepts.md)
* [CD key concepts](../../continuous-delivery/get-started/key-concepts.md)

Pipelines are comprised of stages and steps.

* **Stages:** A stage is a subset of a pipeline that contains one major segment of the workflow. For example, a CI (build) stage includes steps for building, pushing, and testing your code.
* **Steps:** A stage contains one or more steps. Each step is a series of commands that perform a task. For example, you can use an **SSCA Orchestration** step to generate SBOM.

### Connectors

[Connectors](/docs/category/connectors) contain the information necessary to integrate and work with third-party tools, such as Git providers and artifact repos. For example, a GitHub connector authenticates with a GitHub account and/or repo and fetches files as part of a deploy stage. Harness uses connectors at pipeline runtime to authenticate and run operations in external tools.

Connectors require different permissions depending on your build environment and the tasks your pipeline performs. For example, if your pipeline builds and pushes an image to Docker Hub, you need a connector that can connect to your Docker Hub repo and push images.

:::info

For SSCA, you must use [Docker Registry connectors](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) configured for Docker-compliant container registries, such as Docker Hub, Docker-compliant Amazon ECR, or Docker-compliant GCR.

If you're using Docker-compliant ECR or GCR repos, you must configure your [Docker Registry connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) connector as a valid [artifact source](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).

* For ECR, go to [Use Docker Registry for ECR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#amazon-elastic-container-registry-ecr).
* For GCR, go to [Use Docker Registry for GCR](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#google-container-registry-gcr)

:::

### Delegates

The Harness Delegate is a software service you install in an environment, such as a Kubernetes cluster, that connects to the Harness Manager and performs tasks using your container orchestration platforms, artifact repositories, monitoring systems, and so on.

The delegate uses the credentials set up in the connectors used by the pipeline to perform deployment tasks. Additionally, the delegate needs permissions in the target environment to execute build tasks. These permissions are granted in the delegate config file or the environment account you use when installing the delegate.

For more information, go to the Harness Platform documentation on [delegates](/docs/category/delegates).

### Variables and expressions

You can add and reference [built-in and custom variables and expressions](/docs/category/variables-and-expressions) in pipelines and stages. They're available across the pipeline. You can propagate and override their values in later stages.
