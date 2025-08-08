---
title: How to Set Up Harness STO Integration in IDP
description: Learn how to configure and integrate Harness Security Testing Orchestration (STO) with the Internal Developer Portal (IDP) for automated vulnerability management, DevSecOps, and security insights. Step-by-step instructions for adding STO annotations, linking test targets, and surfacing security data in your developer portal.
sidebar_position: 2
tags:
  - Harness STO
  - Internal Developer Portal
  - Vulnerability Management
  - Security Automation
  - Catalog Entity Configuration
  - Software Security
  - Security Testing Orchestration
  - Developer Security
keywords:
  - harness sto integration setup guide
  - how to configure sto in idp
  - harness security testing orchestration tutorial
  - idp sto security integration steps
  - automated vulnerability management developer portal
  - devsecops security testing orchestration
  - add sto annotations to catalog entity
  - linking multiple sto test targets idp
  - surface security data in developer portal
---

# Setting up STO Integration in IDP
The STO integration brings security test insights directly into the developer experience via the IDP Catalog. Once this integration is enabled, developers can view vulnerability summaries for their services alongside other component metadata.

This guide walks through the steps required to set up that integration, including linking STO test targets to Software Catalog entities, enabling insights in the UI, and understanding how vulnerability metadata is populated and rendered.

Here is an expanded and in-depth explanation of the **STO-related annotations in your catalog-info.yaml** file, incorporating all the context you provided and aligning with Harness Internal Developer Portal (IDP) and STO documentation.


## Source Code Annotation 

This is a standard **annotation** that establishes the source code origin of your component. Harness IDP uses it to show STO scan vulnerability details linked to the repository along with other associated metadata from the repository.

```yaml
annotations:
  backstage.io/source-location: url:https://github.com/vigneswara-propelo/Employee-Management-System
```

**What it does**

* Tells IDP where the source code **lives** (URL).
* Enables linking of code-level insights like SAST or software composition analysis (SCA).
* IDP uses this to correlate findings from Git-based scans with STO-reported vulnerabilities.

> This is essential if your STO pipeline includes Git scans like SAST, secret scanning, or license compliance, because the vulnerabilities will be mapped to specific files and lines in the repo.



## STO Test Target Annotation 

The `harness.io/sto-test-target` annotation links an IDP component to the scan targets that Harness STO processes during its own, separate pipeline executions. These scan targets serve as the bridge between STO’s test results and the corresponding IDP entity, ensuring that findings are accurately associated. 
The targets can be of two types:
1. **Source Code (Git-based)**
2. **Deployed Artifact (Container Image)**

```yaml
metadata:
  annotations:
    harness.io/sto-test-target:
      - name: vigneswara-propelo/Employee-Management-System
        scope: default.IDP_TEST
```

**Purpose**
This annotation ensures the component in the IDP is **mapped** to the right test target, so STO scan results are displayed correctly in the Security tab or card.

#### **Types of Test Targets**

1. **Source Repository Target**

This is the most common. The `name` refers to the git repo having vulnerabilities after scanning in the STO pipeline.

```yaml
annotations:
  harness.io/sto-test-target:
    - name: vigneswara-propelo/Employee-Management-System
      scope: default.IDP_TEST
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
Incorrect or missing scopes will result in the IDP failing to fetch or render security insights. Make sure your test target’s scope matches exactly with where it was defined in STO.



### Multiple Test Targets

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



## Using - Link to Source Code Repository

In the context of STO and vulnerability management, linking your source code repository to the IDP entity ensures that vulnerabilities identified in scans can be traced back to the exact source location.

```yaml
sourceCode:
  monoRepo: false
  provider: Github
  repoName: Employee-Management-System
  connectorRef: account.Vignesh_Github
  branch: main
  monoReposubDirectoryPath: ""
  url: https://github.com/vigneswara-propelo/Employee-Management-System/tree/main
```




#### How This All Connects Together

1. Your pipeline runs STO scans on a Git repository, container image, or other supported target.
2. Your catalog entity in YAML contains specific STO annotations that reference the same scan target.
3. Harness IDP uses these annotations to retrieve relevant STO scan results and display them in the Security section of the Software Catalog.

Developers get a unified view of vulnerabilities, exposed secrets, and compliance findings **directly within IDP**, automatically linked to the exact service they own. This eliminates context switching, speeds up triage, and ensures security insights are always visible in the development workflow.


This integration also enables richer UI elements in the Software Catalog, and many more which we will explore in the [Viewing STO Insights in IDP](/docs/internal-developer-portal/sto-integration/viewing-sto-insights-in-idp) documentation.