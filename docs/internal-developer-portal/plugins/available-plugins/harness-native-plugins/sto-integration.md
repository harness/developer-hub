---
title: Harness Security Testing Orchestration Integration with IDP
description: Complete guide to integrating Security Testing Orchestration (STO) with the Internal Developer Portal (IDP) - from setup to viewing vulnerabilities and creating security scorecards.
sidebar_position: 2
sidebar_label: Security Testing Orchestration 
tags:
  - Security Testing
  - Developer Portal
  - Integration
  - Vulnerability Management
  - STO
  - IDP STO 
  - IDP
  - Scorecards
  - Security Insights
  - DevSecOps
  - Security Visualization
keywords:
  - harness sto integration guide
  - security testing orchestration platform
  - internal developer portal security
  - security integration best practices
  - vulnerability management developer tools
  - security scanning automation workflow
  - developer portal security insights
  - sto idp configuration setup
  - view sto vulnerabilities in idp
  - harness idp security tab guide
  - create security scorecards harness
  - sto vulnerability summary card
  - measure software security posture
  - developer portal security dashboard
  - idp sto security integration steps
  - automated vulnerability management developer portal
  - devsecops security testing orchestration
  - add sto annotations to catalog entity
  - linking multiple sto test targets idp
  - surface security data in developer portal
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocImage from '@site/src/components/DocImage';

# Harness Security Testing Orchestration (STO) and IDP 



:::info
This is a **Harness IDP native feature**. It is **not a Backstage plugin** and does not require any third-party extensions. All functionality described here is built directly into Harness IDP.
:::

Harness Internal Developer Portal (IDP) integrates with Security Testing Orchestration (STO) to bring security insights directly into the developer workflow.

With this integration, vulnerabilities identified by STO scanners are surfaced inside the IDP Software Catalog. Developers can view issues such as CVEs from static or dynamic scans directly alongside their services, projects, and components.

By displaying security data within the Catalog UI, the integration minimizes context switching, speeds up triage, and encourages earlier remediation during the development process.

STO supports a wide range of scanners, including Trivy, Snyk, and Aqua. Once test targets are configured in STO, relevant findings are automatically mapped to catalog entities in IDP.

<DocImage path={require('./static/sto-integrated-idp.png')} />

## Prerequisites

Before you can view security insights from STO inside the Internal Developer Portal, a few platform-level configurations must be in place.

Harness IDP and STO must both be enabled on your account. Additionally, the STO integration feature in IDP is controlled via a feature flag and requires activation by Harness Support.

#### What you need:

* **Harness IDP enabled** in your account
* **STO module enabled**, with at least one pipeline or scanner configured
* **STO-IDP integration feature flag** turned on (contact Harness Support)

:::info

This feature is available behind the feature flag IDP_STO_INTEGRATION. If you want to try out this feature, please reach out to the IDP team. We would love to work with you and take feedback.

:::

## What this Integration enables

The integration between Harness Internal Developer Portal (IDP) and Security Testing Orchestration (STO) brings contextual security visibility directly into the developer and service management experience.

With this integration enabled:

* Security vulnerabilities such as CVEs from static and dynamic scans are surfaced **within the IDP Software Catalog**, directly alongside services, components, and projects.
* Teams gain a **central view of security issues** without needing to switch tools or dig into separate reports.
* Vulnerability findings from supported scanners—like Trivy, Snyk, and Aqua—are **automatically linked to catalog entities** in IDP using simple annotations.
* These insights appear in the form of **dedicated UI elements** (tabs or cards) within the service detail page, making it easy to triage and act.
* Security data becomes part of your **developer self-service workflows**, encouraging earlier remediation during development.
* Platform teams can incorporate STO findings into **Scorecards**, enabling organization-wide tracking of security posture and compliance.

This integration makes security a first-class citizen in the IDP ecosystem, improving visibility, ownership, and velocity across engineering and security teams.

### Related Resources

* [Scorecards Overview](https://developer.harness.io/docs/internal-developer-portal/scorecards/scorecard/)
* [Getting Started with STO](https://developer.harness.io/docs/security-testing-orchestration/get-started/overview/)
* [Create Test Targets in STO](https://developer.harness.io/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines/)

## How It Works

Once the STO integration is enabled in your Harness account and catalog entities are correctly annotated, vulnerability data begins flowing from STO to the Internal Developer Portal automatically.

Here's a high-level overview of the data flow and supported tooling:

**Data Flow Overview:**

1. **STO Pipelines** run scanners like Trivy, Aqua, or Snyk against defined test targets (e.g., container images, source repos, manifests).
2. **Findings** from these scanners are collected and stored within the STO module.
3. Harness **maps these findings** to your software catalog components in IDP, based on annotations in their `catalog-info.yaml` files.
4. Inside IDP, **vulnerability details appear** in a security tab or card on the entity's detail page, depending on your catalog layout configuration.

**Supported Scanners and Sources:**

* Static Application Security Testing (SAST)
* Software Composition Analysis (SCA)
* Container scanning
* Infrastructure-as-code scanning

**Supported Scan Target Types**

* **Repository** — e.g., a git codebase
* **Container** — e.g., Docker images, container registries
* **Instance** — e.g., running workloads or artifacts reachable by STO
* **Configuration** — e.g., infrastructure, IaC scans, manifests, or other config-defined targets

When these targets are defined in STO and properly annotated in IDP, scan results automatically link to the appropriate catalog entities.



## Setting up STO Integration in IDP

The STO integration brings security test insights directly into the developer experience via the IDP Catalog. Once this integration is enabled, developers can view vulnerability summaries for their services alongside other component metadata.

This section walks through the steps required to set up that integration, including linking STO test targets to Software Catalog entities, enabling insights in the UI, and understanding how vulnerability metadata is populated and rendered.



### 1. Auto Import using Source Code 

The **Link to Source Code Repository** feature lets you associate a catalog component with its source code repository directly from the Harness IDP UI. This repository link is used to automatically configure several plugins, fetch repository metadata, and is also used in Scorecards.

<DocImage path={require('./static/source-code-link.png')} />

When you select a Git provider from the dropdown and specify the repository, IDP stores the information in the component definition and uses it to power various integrations, including STO vulnerability correlation.

> Source code is valid only if the catalog entity lives at the project scope as that of the STO pipeline.

```yaml
spec:
  sourceCode:
    monoRepo: false
    provider: Github
    repoName: java-service_svc
    connectorRef: account.ShibamDhar
```

**What it does**

* Identifies the repository where the source code resides.
* Enables linking of code-level insights such as SAST or software composition analysis (SCA) results.
* Allows IDP to correlate Git-based scan findings with STO-reported vulnerabilities.
* When set via the UI, IDP automatically updates this annotation without manual YAML editing.


> This is essential if your STO pipeline includes Git scans like SAST, secret scanning, or license compliance, because the vulnerabilities will be mapped to specific files and lines in the repo.

### 2. STO Test Target Annotation 

The `harness.io/sto-test-target` annotation links an IDP component to the scan targets that Harness STO processes during its own, separate pipeline executions. These scan targets serve as the bridge between STO's test results and the corresponding IDP entity, ensuring that findings are accurately associated. You can always know more about [Creating Test Targets in STO](https://developer.harness.io/docs/security-testing-orchestration/get-started/key-concepts/targets-and-baselines/) from our docs.

The targets can be of two types:
1. **Source Code (Git-based)**
2. **Deployed Artifact (Container Image)**

```yaml
metadata:
  annotations:
    harness.io/sto-test-target:
      - name: vigneswara-propelo/Employee-Management-System
        scope: default.IDP_TEST
        variant: develop
```

**Purpose**
This annotation ensures the component in the IDP is **mapped** to the right test target, so STO scan results are displayed correctly in the Security tab or card.

> The `variant` property specifies which branch or variation of the target should be considered for results. For example:
> - `variant: develop` will fetch results specifically for the develop branch.
> - If no `variant` is specified, STO uses the default branch (baseline) for that target.


#### Types of Test Targets

1. **Source Repository Target**

This is the most common. The `name` refers to the git repo having vulnerabilities after scanning in the STO pipeline.

```yaml
annotations:
  harness.io/sto-test-target:
    - name: vigneswara-propelo/Employee-Management-System
      scope: default.IDP_TEST
      variant: develop
```

2. **Image-Based Target**

For container or deployed artifact scans (e.g., in Kubernetes), the test target name is the full image reference.

```yaml
annotations:
  harness.io/sto-test-target:
    - name: myorg/service-backend:1.2.0
      scope: default.myproject
```

**Use Case**
This is used when your pipeline scans a runtime artifact, like a container from Docker Hub or a Kubernetes workload.

> STO test targets **must match exactly** with what the pipeline uses during scan steps. Any mismatch will cause IDP to miss linking the findings.

#### Scoping Rules

In Harness, everything is **hierarchical**: account → org → project. The `scope` field in the STO annotation tells the platform **where** that test target lives.

##### Format

```yaml
scope: <orgIdentifier>.<projectIdentifier>
```

####     Scoping Examples

```yaml
# Project-level (same org & project)
scope: IDP_TEST

# Cross-project reference (when the test target is not in the current context)
scope: org1.sec-tools

# Account-level scope (rare, usually when STO is configured globally)
scope: account
```

#### Rule of Thumb

* If you are inside a **project**, and your test target is in the **same project**, you can just mention the project identifier.
* If your test target is in **another org/project**, then you must use the full form `org.project`.
* If your test target is defined at the **account level**, use `account`.

>  **Why this matters**:
Incorrect or missing scopes will result in the IDP failing to fetch or render security insights. Make sure your test target's scope matches exactly with where it was defined in STO.

### 2.1 Multiple Test Targets

You can define **multiple STO test targets** for a single component. This is useful if:

* The service has multiple parts (e.g., frontend + backend).
* You have multiple scan types configured (e.g., SAST for source, DAST for deployed service).

```yaml
annotations:
  harness.io/sto-test-target:
    - name: my-service/backend
      scope: org1.security
    - name: my-service/frontend
      scope: org1.security
```

This setup allows IDP to display **aggregated** insights from both sources under the same entity, enhancing observability.

## Viewing Vulnerabilities in IDP

After configuring the STO integration, Harness IDP begins to surface security insights directly within the Software Catalog. This allows developers and security teams to view vulnerabilities, track remediation progress, and measure security posture without leaving the developer portal.

In this section, we will explore how Harness Security Testing Orchestration (STO) integrates with the Internal Developer Portal (IDP) to deliver end-to-end visibility of vulnerabilities — from the moment they're detected in a pipeline, to tracking them over time with scorecards.

#### STO Pipeline Context – The Source of Truth

We have a Security Test Orchestration (STO) pipeline that runs scans using Snyk and Aqua Trivy to detect vulnerabilities in our services. Once the scans are completed, the findings are processed and stored within STO, and the pipeline has some vulnerabilities, which will become the source of truth for us. With the integration of STO with IDP in place, these vulnerability insights will be viewed directly inside IDP.

<DocImage path={require('./static/sto-pipeline-vul.png')} />

### Catalog View – High-Level Visibility

Once STO is integrated with IDP entities, the first place you will notice its impact is in the **Software Catalog**. This view lists all registered services in your ecosystem, but now with **real-time security indicators** right alongside them. Just select Tags as `STO`.

Without opening a single service page, you can immediately spot which components may have critical or high-severity vulnerabilities.

<DocImage path={require('./static/sto-catalog.png')} />

### Entity View – Service-Level Detail

When you click on a service in the Catalog that has STO integrated, the entity overview page will show up with a vulnerability card.

Here, you will see:

* A **summary card** showing vulnerability counts by severity (Critical, High, Medium, Low, Info).
* Percentage of each vulnerability type.
* Quick-glance totals that make it easy to prioritize which issues need immediate attention

This view bridges the gap between high-level visibility and actionable insight.

<DocImage path={require('./static/sto-vul-summary.png')} />

### Vulnerabilities Tab of Entity View

When it's time to dig deeper, the **Vulnerabilities tab** provides a complete list of STO scan results for that service.

<DocImage path={require('./static/vulnerabilities.png')} />

From here, you can:

* Filter vulnerabilities by **severity**, **scanner** (e.g., Snyk, Aqua Trivy), or **issue type**
* Click into any vulnerability for **detailed remediation guidance**
<DocImage path={require('./static/sto-vul-details.png')} />

<!-- * Jump straight to the **source code** if it's a Git-based issue, making fixes faster and more accurate -->

This is where developers get exact, actionable details, and security teams can verify fixes directly against scan data.

#### How to Add or Remove the STO Vulnerabilities Tab

You can customize whether the STO Vulnerabilities tab appears for your catalog entities by modifying the layout configuration in the IDP admin UI.

Navigate to **Layout**, then select the appropriate entity kind (e.g., `component`) and entity type (e.g., `service`). Here, you can add or remove tabs for all services.

To **add** the STO Vulnerabilities tab, include the following in your layout YAML:

```yaml
- name: EntitySecurityIssueContent
  path: /security
  title: Vulnerabilities
  contents:
    - component: EntitySecurityIssueContent
```

To **remove** the tab, simply delete or comment out this section from the layout configuration.

<DocImage path={require('./static/vul-tab.png')} />

The highlighted section in the image above shows the configuration for the Vulnerabilities tab. Once added, developers will see a dedicated tab for STO security findings directly on each service's entity page, making it easy to review and act on vulnerabilities in context.

## Scorecards – Measuring Vulnerability

Harness IDP Scorecards let you track your security posture automatically, using data from STO scans. You can set up custom vulnerability checks—like thresholds on critical vulnerabilities—and see compliance at a glance for all your services.

To configure a scorecard check, select the STO data source, choose the metric (e.g., number of active critical vulnerabilities), set your threshold, and apply severity filters as needed.

<DocImage path={require('./static/sto-scorecard-setup.png')} />

Once configured, the Scorecard tab displays the results for all components, showing how many pass or fail your policy, the current status, and improvement trends over time. This makes it easy to prioritize remediation and track progress across your organization.

<DocImage path={require('./static/scorecard.png')} />

By integrating these automated checks into the Software Catalog, security becomes a visible, shared responsibility across development and platform teams.
