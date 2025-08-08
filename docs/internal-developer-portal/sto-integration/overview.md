---
title: STO Integration Overview
description: Learn how to integrate Harness STO (Security Testing Orchestration) with the Internal Developer Portal (IDP) for comprehensive security insights in your software catalog.
sidebar_position: 1
sidebar_label: Overview
redirect_from: /docs/internal-developer-portal/sto-integration
helperCards:
  - title: Setup STO Integration
    description: Configure STO integration with IDP
    url: /docs/internal-developer-portal/sto-integration/setup
  - title: View Security Results
    description: Access security scan results in your catalog
    url: /docs/internal-developer-portal/sto-integration/results
tags:
  - Security Testing
  - Developer Portal
  - Integration
  - Vulnerability Management
  - STO
  - IDP STO 
  - IDP
keywords:
  - harness sto integration guide
  - security testing orchestration platform
  - internal developer portal security
  - security integration best practices
  - vulnerability management developer tools
  - security scanning automation workflow
  - developer portal security insights
  - sto idp configuration setup
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

# STO and IDP Integration 

Harness Internal Developer Portal (IDP) integrates with Security Testing Orchestration (STO) to bring security insights directly into the developer workflow.

With this integration, vulnerabilities identified by STO scanners are surfaced inside the IDP Software Catalog. Developers can view issues such as CVEs from static or dynamic scans directly alongside their services, projects, and components.

By displaying security data within the Catalog UI, the integration minimizes context switching, speeds up triage, and encourages earlier remediation during the development process.

STO supports a wide range of scanners, including Trivy, Snyk, and Aqua. Once test targets are configured in STO, relevant findings are automatically mapped to catalog entities in IDP.


### Prerequisites

Before you can view security insights from STO inside the Internal Developer Portal, a few platform-level configurations must be in place.

Harness IDP and STO must both be enabled on your account. Additionally, the STO integration feature in IDP is controlled via a feature flag and requires activation by Harness Support.

#### What you need:

* **Harness IDP enabled** in your account
* **STO module enabled**, with at least one pipeline or scanner configured
* **STO-IDP integration feature flag** turned on (contact Harness Support)


## What This Integration Enables

The integration between Harness Internal Developer Portal (IDP) and Security Testing Orchestration (STO) brings contextual security visibility directly into the developer and service management experience.

With this integration enabled:

* Security vulnerabilities such as CVEs from static and dynamic scans are surfaced **within the IDP Software Catalog**, directly alongside services, components, and projects.
* Teams gain a **central view of security issues** without needing to switch tools or dig into separate reports.
* Vulnerability findings from supported scanners—like Trivy, Snyk, and Aqua—are **automatically linked to catalog entities** in IDP using simple annotations.
* These insights appear in the form of **dedicated UI elements** (tabs or cards) within the service detail page, making it easy to triage and act.
* Security data becomes part of your **developer self-service workflows**, encouraging earlier remediation during development.
* Platform teams can incorporate STO findings into **Scorecards**, enabling organization-wide tracking of security posture and compliance.

This integration makes security a first-class citizen in the IDP ecosystem, improving visibility, ownership, and velocity across engineering and security teams.


* [Scorecards Overview](https://developer.harness.io/docs/internal-developer-portal/scorecards/scorecard/)
* [Getting Started with STO](https://developer.harness.io/docs/security-testing-orchestration/get-started/overview/)
* [Create Test Targets in STO](https://developer.harness.io/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines/)



## How It Works

Once the STO integration is enabled in your Harness account and catalog entities are correctly annotated, vulnerability data begins flowing from STO to the Internal Developer Portal automatically.

Here’s a high-level overview of the data flow and supported tooling:

**Data Flow Overview:**

1. **STO Pipelines** run scanners like Trivy, Aqua, or Snyk against defined test targets (e.g., container images, source repos, manifests).
2. **Findings** from these scanners are collected and stored within the STO module.
3. Harness **maps these findings** to your software catalog components in IDP, based on annotations in their `catalog-info.yaml` files.
4. Inside IDP, **vulnerability details appear** in a security tab or card on the entity’s detail page, depending on your catalog layout configuration.

**Supported Scanners and Sources:**

* Static Application Security Testing (SAST)
* Software Composition Analysis (SCA)
* Container scanning
* Infrastructure-as-code scanning

You’re absolutely right to check! My prior mention of supported test target types (like Docker images, Git repos, etc.) didn’t cite sources. Let’s make this accurate and grounded in the official documentation.

**Supported Scan Target Types**

* **Repository** — e.g., a git codebase
* **Container** — e.g., Docker images, container registries
* **Instance** — e.g., running workloads or artifacts reachable by STO
* **Configuration** — e.g., infrastructure, IaC scans, manifests, or other config-defined targets

When these targets are defined in STO and properly annotated in IDP, scan results automatically link to the appropriate catalog entities.

<DocImage path={require('./static/sto-integrated-idp.png')} />


