---
title: Database DevOps release notes
sidebar_label: Database DevOps
date: 2024-09-25T08:09:25
tags: ["dbdevops", "database devops"]

sidebar_position: 9
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import HarnessApiData from '../src/components/HarnessApiData/index.tsx';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/infrastructure-as-code-management/rss.xml" />

These release notes describe recent changes to Harness Database DevOps.

:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.
:::

## October 2025
### Release 1.60.x
The `1.60.x` release introduces enhanced logging capabilities, empowering teams to capture and analyze detailed execution-level insights for improved auditing and troubleshooting.

#### Key Highlights:
* **Feature Enhancements**
  - Harness Database DevOps can now log additional execution details to a file by configuring the log-level and log-file Liquibase global parameters under Global Settings in pipeline steps. This enhancement enables customers to capture raw SQL statements and server responses, providing richer context for debugging and compliance audits.

**Minimum Supported Versions:**
  - `dbservice` – 1.60.x
  - `ng-manager` – 1.110.x (required)

## September 2025

### Release 1.59.x
The `1.59.x` release enhances migration flexibility, allowing teams to select the migration type per schema and improving the underlying instance structures for smoother operations.

#### Key Highlights:
* **Feature Enhancements**
  - Updated Instance Structure which aligns with new schema types, improving consistency and forward compatibility.

**Minimum Supported Versions:**
  - `dbservice` – 1.59.x

### Release 1.58.x
The `1.58.x` release expands schema type management, enabling full CRUD operations and better validation while simplifying the UI for database administration.

#### Key Highlights:
* **Feature Enhancements**
  - All CRUD operations supported for the new schema type.
  - Validation Checks ensures consistency for new and default schema types.

**Minimum Supported Versions:**
  - `dbservice` – 1.58.x

### Release 1.57.x
The `1.57.x` release delivers key reliability improvements and backend optimizations, strengthening pipeline execution in concurrent and multi-schema scenarios. It also includes version upgrades for enhanced stability and validation consistency.

#### Key Highlights:
* **Feature Enhancements**
  - Upgraded Drone-Liquibase to v1.10.0-4.33, improving validation workflows and compatibility.

* **Bug Fixes**
  - Fixed an issue where validation commands occasionally returned nil responses in plugin handlers.
  - Resolved an issue where concurrent executions using matrix or list-based looping could fail due to shared clone directories. Each iteration now clones into a distinct directory to ensure successful parallel runs.

**Minimum Supported Versions:**
- `dbservice` – 1.57.x

### Release 1.56.x
The `1.56.x` release focuses on improving pipeline reliability, secure credential management, and change tracking for safer database operations.

#### Key Highlights:
* **Feature Enhancements**
  - Optimized Update & Rollback Flow for faster and more reliable execution.
  - Comma-Separated Secrets to simplify secure credential rotation.
  - ChangeSetMetadata API Enhancements now include executed SQL commands for better visibility.

**Minimum Supported Versions:**
- `dbservice` – 1.56.x

### Release 1.55.x
The `1.55.x` release enhances visibility in the Migration State view, making it easier for teams to track deployments and understand which changes were tagged.

#### Key Highlights:
* **Feature Enhancements**
  - "Deployed with Tag" label is added to Migration State view for improved release traceability.

**Minimum Supported Versions:**
- `dbservice` – 1.55.x

## August 2025

### Release 1.54.x
The `1.54.x` release focuses on improving usability in the schema overview experience. Previously, the schema dropdown on the Overview page only displayed a limited subset of schemas, making it difficult to navigate in environments with many schemas. With this update, customers now get a searchable dropdown that scales better for large environments, simplifying schema selection and improving visibility into migration states.

#### Key Highlights:
**Bug Fixes**
  - Added a searchable schema dropdown on the Overview page, resolving limitations with subset display and missing pagination/infinite scroll.

**Minimum Supported Versions:**
- `dbservice` – 1.54.x

### Release 1.53.x
The `1.53.x` release focuses on improving database schema management workflows and stabilizing the Liquibase integration. Customers editing schemas can now select a primary instance directly from the UI. Customers editing schemas can now select a primary instance directly from the UI. Certain upcoming features will use this instance for development and validation use cases.

#### Key Highlights:

* **Feature Enhancements:**
  - Select a primary instance directly while editing a DB schema with a new dropdown in the UI.
* **Bug Fixes:**
  - DB Test and Preview steps now return detailed messages that appear in the chat UI, improving debugging visibility.

**Minimum Supported Versions:**
- `dbservice` – 1.53.x

### Release 1.52.x
The `1.52.x` release expands the platform’s authoring and validation capabilities. Teams can now author database changesets directly from the UI with a built-in YAML renderer and execution status visibility. This reduces reliance on external editors and brings change management closer to the deployment workflow. At the same time, we’ve added support for the Liquibase validate command, helping teams catch invalid changes early in the pipeline.

:::note Beta Feature
The YAML authoring and validation functionality is currently in **beta** and gated behind a non-GA feature flag.  
Please contact [Harness Product Manager](https://support.harness.io) if you would like to be added to the beta for this functionality.
:::

#### Key Highlights:

* **Feature Enhancements:**
  - A new YAML renderer and execution status plugin allow teams to create and review changesets directly from the UI.
  - Added support for the Liquibase `validate` command, ensuring changes are verified before deployment.
* **Bug Fixes:**
  - Fixed execution URL display and added PR link support in the UI.

**Minimum Supported Versions:**
- `dbservice` – 1.52.x

### Release 1.51.x
The `1.51.x` release strengthens rollback flexibility and control. For scenarios where teams need to customize how rollbacks are applied, this release introduces support for Custom Rollback SQL. Customers can now define custom rollback logic for complex cases where auto-generated SQL may not suffice. This includes onboarding and storing step outputs for UpdateSQL and RollbackSQL, along with a dedicated CustomUpdateSQL step for better pipeline integration.

#### Key Highlights:

* **Feature Enhancements:**
  - Custom Rollback SQL: Teams can now onboard and store step outputs for UpdateSQL and RollbackSQL, with a dedicated CustomUpdateSQL step in dbops-service.

**Minimum Supported Versions:**
- `dbservice` – 1.51.x

## July 2025

### Release 1.49.x
The `1.49.x` release introduces key improvements across schema discovery, rollback tracking, and platform extensibility. Additionally, the platform now supports optional Primary DB instanceId, streamlining deployments across multi-instance environments.

#### Key Highlights:

* **Feature Enhancements:**
  - Rollbacks now generate detailed metadata entries, helping teams understand when and why a rollback occurred, especially when using `rollback-by-count`.
  - The platform now supports optional Primary DB instanceId, streamlining deployments across multi-instance environments.

**Minimum Supported Versions:**
- `dbservice` – 1.49.x

### Release 1.48.x

This release brings several critical feature enhancements and extended support across various database types and integrations.

#### Key Highlights:

* **New Features:**
  - Deployed state now includes changesetFQN
  - You can now view the changeset details by clicking on the change-id in the deployed state tab on the apply or rollback step.

* Added TLS support for the following databases: Postgres, MySQL, Oracle, SQL Server, MongoDB.
* OPA and OPA rollback support across key Databases.
* Private Registry support verified for MySQL.
* Metadata fields such as comments, labels, and authors now visible.

**Minimum Supported Versions:**
- `dbservice` – 1.48.0
