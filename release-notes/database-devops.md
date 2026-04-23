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

## April 2026

### Release 1.89.x
The `1.89.x` release expands database support, enabling teams to manage schema changes and migrations for additional cloud-native data platforms.

#### Key Highlights

* **Feature Enhancements**
 - Added support for BigQuery, allowing teams to integrate and manage BigQuery schemas within DB DevOps workflows.

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.30.0-4.33            | 1.29.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.30.0-4.33-mongo      | 1.29.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.30.0-4.33-spanner    | 1.29.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.30.0-4.33-snowflake  | 1.29.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.30.0-4.33-percona    | 1.29.0-4.33-percona          |
| plugins/drone-liquibase-cloudsql  | 1.30.0-4.33-cloudsql   | 1.29.0-4.33-cloudsql         |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.7.16-rootless              |

### Release 1.88.x

No customer-facing updates were introduced in this release.

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.29.0-4.33            | 1.28.3-4.33                  |
| plugins/drone-liquibase-mongo     | 1.29.0-4.33-mongo      | 1.28.3-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.29.0-4.33-spanner    | 1.28.3-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.29.0-4.33-snowflake  | 1.28.3-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.29.0-4.33-percona    | 1.28.3-4.33-percona          |
| plugins/drone-liquibase-cloudsql  | 1.29.0-4.33-cloudsql   | 1.28.3-4.33-cloudsql         |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.7.16-rootless              |

### Release 1.87.x
The `1.87.x` release expands database support and improves authentication reliability across DB DevOps workflows.

#### Key Highlights

* **Feature Enhancements**
  - Added support for IBM DB2, enabling teams to manage schema changes and migrations for DB2 databases within DB DevOps.

* **Bug Fixes**
  - Resolved issues with session and local storage handling for auth tokens, improving stability of authenticated workflows.

#### Image Upgrades


| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.28.3-4.33            | 1.28.2-4.33                  |
| plugins/drone-liquibase-mongo     | 1.28.3-4.33-mongo      | 1.28.2-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.28.3-4.33-spanner    | 1.28.2-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.28.3-4.33-snowflake  | 1.28.2-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.28.3-4.33-percona    | 1.28.2-4.33-percona          |
| plugins/drone-liquibase-cloudsql  | 1.28.3-4.33-cloudsql   | 1.28.2-4.33-cloudsql         |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.7.16-rootless              |

## March 2026

### Release 1.86.x
The `1.86.x` release focuses on improving security and execution reliability, ensuring safer and more stable pipeline operations.

#### Key Highlights

* **Bug Fixes & Security**
  - Upgraded gRPC and execution images to address critical vulnerabilities, improving overall platform security.
  - Fixed issues affecting retry behavior for in-progress executions during AI-assisted change authoring, ensuring more consistent pipeline runs.

#### Image Upgrades


| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.28.2-4.33            | 1.27.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.28.2-4.33-mongo      | 1.27.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.28.2-4.33-spanner    | 1.27.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.28.2-4.33-snowflake  | 1.27.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.28.2-4.33-percona    | 1.27.0-4.33-percona          |
| plugins/drone-liquibase-cloudsql  | 1.28.2-4.33-cloudsql   | 1.27.0-4.33-cloudsql         |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.7.16-rootless              |

### Release 1.85.x
The `1.85.x` release enhances execution stability and AI-assisted workflows, improving reliability across database operations.

#### Key Highlights

* **Bug Fixes**
  - Resolved issues with Flyway image selection in execution configuration, ensuring correct runtime behavior.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.27.0-4.33            | 1.26.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.27.0-4.33-mongo      | 1.26.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.27.0-4.33-spanner    | 1.26.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.27.0-4.33-snowflake  | 1.26.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.27.0-4.33-percona    | 1.26.0-4.33-percona          |
| plugins/drone-liquibase-cloudsql  | 1.27.0-4.33-cloudsql   | 1.26.0-4.33-cloudsql         |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.6.4-rootless               |

### Release 1.84.x
The `1.84.x` release improves database compatibility and pipeline validation, reducing execution failures and expanding supported environments.

#### Key Highlights

* **Feature Enhancements**
 - Added support for CloudSQL execution images, enabling database operations in Cloud SQL environments.

* **Bug Fixes**
  - Added error handling for invalid pipeline configurations to prevent unexpected failures.
  - Resolved issues caused by nil values in scheduled jobs, improving execution stability.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.26.0-4.33            | 1.25.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.26.0-4.33-mongo      | 1.25.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.26.0-4.33-spanner    | 1.25.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.26.0-4.33-snowflake  | 1.25.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.26.0-4.33-percona    | 1.25.0-4.33-percona          |
| plugins/drone-liquibase-cloudsql  | 1.26.0-4.33-cloudsql   | -                            |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.6.4-rootless               |


### Release 1.83.x

No customer-facing updates were introduced in this release.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.25.0-4.33            | 1.24.1-4.33                  |
| plugins/drone-liquibase-mongo     | 1.25.0-4.33-mongo      | 1.24.1-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.25.0-4.33-spanner    | 1.24.1-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.25.0-4.33-snowflake  | 1.24.1-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.25.0-4.33-percona    | 1.24.1-4.33-percona          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.6.4-rootless               |

### Release 1.82.x

No customer-facing updates were introduced in this release.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.24.1-4.33            | 1.24.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.24.1-4.33-mongo      | 1.24.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.24.1-4.33-spanner    | 1.24.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.24.1-4.33-snowflake  | 1.24.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.24.1-4.33-percona    | 1.24.0-4.33-percona          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.7.16-rootless        | 1.6.4-rootless               |

### Release 1.81.x

The `1.81.x` release improves migration state accuracy and enhances the schema/instance onboarding experience.

#### Key Highlights

* **Feature Enhancements**
  - Enhanced the onboarding experience to ensure smoother configuration and setup for schemas and instances.
  - Rollback operations now create proper “in-progress” records in command execution history, ensuring more accurate tracking of rollback activity.

* **Bug Fixes**
  - Corrected deployedAt timestamps for both successful and failed update commands to ensure proper ordering and visibility in migration state views.
  - Updated execution images to resolve issues affecting Percona-based Liquibase workflows.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- |
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.24.0-4.33            | 1.23.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.24.0-4.33-mongo      | 1.23.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.24.0-4.33-spanner    | 1.23.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.24.0-4.33-snowflake  | 1.23.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.24.0-4.33-percona    | 1.23.0-4.33-percona          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.6.4-rootless         | 1.6.4-rootless               |

## February 2026

### Release 1.80.x

This release has been burned.

### Release 1.79.x

The `1.79.x` release improves onboarding experience, rollback accuracy, and adds advanced database configuration support for Liquibase users.

#### Key Highlights

* **Feature Enhancements**
  - Introduced a guided configuration wizard to simplify schema and instance setup, improving onboarding for new users.
  - Added a `usePercona` option in DB Schema configuration (Liquibase type only), enabling selection of a Percona-enabled execution image when required.
  - Enhanced plugin image to support Kerberos authentication for MSSQL and Oracle databases.

* **Bug Fixes**
  - Ensured the latest applied tag is correctly derived from migration state during partial rollback failures.
  - Corrected `deployedAt` timestamps for cancelled or partially failed changesets to maintain proper ordering in migration state views.
  - Resolved an issue where Test & Preview executions could fail due to missing connector scope in delegate selection.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- | 
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.23.0-4.33            | 1.22.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.23.0-4.33-mongo      | 1.22.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.23.0-4.33-spanner    | 1.22.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.23.0-4.33-snowflake  | 1.22.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.23.0-4.33-percona    | 1.22.0-4.33-percona          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.6.4-rootless         | 1.6.4-rootless               |

### Release 1.78.x

The `1.78.x` release enhances Liquibase execution flexibility for Percona users.

#### Key Highlights
* **Feature Enhancements**
  - Added execution configuration and image selection logic based on the `usePercona` schema property (Liquibase type only).

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- | 
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.22.0-4.33            | 1.21.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.22.0-4.33-mongo      | 1.21.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.22.0-4.33-spanner    | 1.21.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.22.0-4.33-snowflake  | 1.21.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.22.0-4.33-percona    | 1.21.0-4.33-percona          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.6.4-rootless         | 1.6.4-rootless               |

### Release 1.77.x

The `1.77.x` release expands database compatibility and improves migration tracking accuracy.

#### Key Highlights
* **Feature Enhancements**
  - Added support for Snowflake in execution configuration, including OAuth, PKI, and username/password authentication for apply and rollback steps.
  - Added Snowflake Liquibase Plugin Support. Learn more about it in the [docs](https://developer.harness.io/docs/database-devops/use-database-devops/set-up-connectors/#setting-up-snowflake).

* **Bug Fixes**
  - Corrected logic to use the latest sync tag when determining migration history state.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- | 
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.21.0-4.33            | 1.20.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.21.0-4.33-mongo      | 1.20.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.21.0-4.33-spanner    | 1.20.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.21.0-4.33-snowflake  | 1.20.0-4.33-snowflake        |
| plugins/drone-liquibase-percona   | 1.21.0-4.33-percona    | 1.20.0-4.33-percona          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.6.4-rootless         | 1.6.4-rootless               |

### Release 1.76.x
The `1.76.x` release focuses on security hardening and execution stability.

#### Key Highlights

* **Bug Fixes & Security**
  - Fixed an issue where Test & Preview executions displayed outdated pipeline identifiers.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- | 
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.20.0-4.33            | 1.19.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.20.0-4.33-mongo      | 1.19.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.20.0-4.33-spanner    | 1.19.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.20.0-4.33-snowflake  | 1.19.0-4.33-snowflake        |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.6.4-rootless         | 1.6.4-rootless               |

### Release 1.75.x

No customer-facing updates were introduced in this release.

#### Image Upgrades

| **Image Name**                    |  **Current Version**   | **Past Version**             |
| --------------------------------- | ---------------------- | ---------------------------- | 
| plugins/download-artifactory      | 1.0.0                  | 1.0.0                        |
| plugins/drone-liquibase           | 1.19.0-4.33            | 1.18.0-4.33                  |
| plugins/drone-liquibase-mongo     | 1.19.0-4.33-mongo      | 1.18.0-4.33-mongo            |
| plugins/drone-liquibase-spanner   | 1.19.0-4.33-spanner    | 1.18.0-4.33-spanner          |
| plugins/drone-liquibase-snowflake | 1.19.0-4.33-snowflake  | 1.18.0-4.33-snowflake        |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git                 | 1.6.4-rootless         | 1.6.4-rootless               |

## January 2026

### Release 1.74.x
The `1.74.x` release improves execution reliability and migration state accuracy, addressing issues that could affect pipeline outcomes and dashboard correctness.

#### Key Highlights

* **Bug Fixes**
  - Fixed execution issues for Google Spanner workflows by upgrading the runtime image.
  - Corrected migration state ordering to ensure changes appear in the correct sequence.
  - Fixed incorrect ordering of instance migration records when multiple updates share the same timestamp.
  - Resolved issues in the Edit Instance experience and improved error messaging when required connectors are missing.

#### Image Upgrades

| **Image Name**                  |  **Current Version** | **Past Version**             |
| ------------------------------- | -------------------- | ---------------------------- | 
| plugins/download-artifactory    | 1.0.0                | 1.0.0                        |
| plugins/drone-liquibase         | 1.18.0-4.33          | 1.17.0-4.33                  |
| plugins/drone-liquibase-mongo   | 1.18.0-4.33-mongo    | 1.17.0-4.33-mongo            |
| plugins/drone-liquibase-spanner | 1.18.0-4.33-spanner  | 1.17.0-4.33-spanner          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git               | 1.6.4-rootless       | 1.6.4-rootless               |

### Release 1.73.x
The `1.73.x` release focuses on improving the stability and reliability of schema and instance management flows.

#### Key Highlights
* **Bug Fixes**
  - Fixed issues in schema and instance create/update flows to ensure consistent behavior across the UI.

#### Image Upgrades

| **Image Name**                  |  **Current Version** | **Past Version**             |
| ------------------------------- | -------------------- | ---------------------------- | 
| plugins/download-artifactory    | 1.0.0                | 1.0.0                        |
| plugins/drone-liquibase         | 1.17.0-4.33          | 1.16.0-4.33                  |
| plugins/drone-liquibase-mongo   | 1.17.0-4.33-mongo    | 1.16.0-4.33-mongo            |
| plugins/drone-liquibase-spanner | 1.17.0-4.33-spanner  | 1.16.0-4.33-spanner          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git               | 1.6.4-rootless       | 1.6.4-rootless               |

## December 2025

### Release 1.72.x
No customer-facing updates were introduced in this release.

#### Image Upgrades

| **Image Name**                  |  **Current Version** | **Past Version**             |
| ------------------------------- | -------------------- | ---------------------------- | 
| plugins/download-artifactory    | 1.0.0                | 1.0.0                        |
| plugins/drone-liquibase         | 1.16.0-4.33          | 1.15.0-4.33                  |
| plugins/drone-liquibase-mongo   | 1.16.0-4.33-mongo    | 1.15.0-4.33-mongo            |
| plugins/drone-liquibase-spanner | 1.16.0-4.33-spanner  | 1.15.0-4.33-spanner          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git               | 1.6.4-rootless       | 1.6.4-rootless               |

### Release 1.71.x
The `1.71.x` release delivers targeted fixes that improve reliability and correctness when working with connectors and Flyway dashboards.

#### Key Highlights
* **Bug Fixes**
  - Fixed an issue where Kubernetes connectors were not returned correctly for scopes higher than the project level, improving pipeline configuration reliability.
  - Resolved issues in the Flyway dashboard API to ensure accurate data is displayed for Flyway-managed databases.

#### Image Upgrades

| **Image Name**                  |  **Current Version** | **Past Version**             |
| ------------------------------- | -------------------- | ---------------------------- | 
| plugins/download-artifactory    | 1.0.0                | 1.0.0                        |
| plugins/drone-liquibase         | 1.15.0-4.33          | 1.14.0-4.33                  |
| plugins/drone-liquibase-mongo   | 1.15.0-4.33-mongo    | 1.14.0-4.33-mongo            |
| plugins/drone-liquibase-spanner | 1.15.0-4.33-spanner  | 1.14.0-4.33-spanner          |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git               | 1.6.4-rootless       | 1.6.4-rootless               |

### Release 1.70.x
The `1.70.x` release focuses on improving migration correctness and security across supported database workflows.

#### Key Highlights
* **Bug Fixes & Security**
  - Upgraded the Flyway image to correctly reflect rollback status, ensuring accurate migration state reporting.
  - Upgraded the Liquibase image to address OpenSSL-related security vulnerabilities.

#### Image Upgrades

| **Image Name**                  |  **Current Version** | **Past Version**           |
| ------------------------------- | -------------------- | -------------------------- |
| plugins/download-artifactory    | 1.0.0                | 1.0.0                      |
| plugins/drone-liquibase         | 1.14.0-4.33          | 1.13.1-4.33                |
| plugins/drone-liquibase-mongo   | 1.14.0-4.33-mongo    | 1.13.0-4.33-mongo          |
| plugins/drone-liquibase-spanner | 1.14.0-4.33-spanner  | 1.13.0-4.33-spanner        |
| plugins/drone-flyway              | 1.3.0-11.11.2          | 1.3.0-11.11.2                |
| plugins/drone-flyway-mongo        | 1.3.0-11.11.2-mongo    | 1.3.0-11.11.2-mongo          |
| harness/drone-git               | 1.6.4-rootless       | 1.6.4-rootless             |

### Release 1.69.x
The `1.69.x` release focuses on security hardening and reliability improvements for database change execution and AI-assisted pipeline authoring.

#### Key Highlights
* **Bug Fixes & Security**
  - Upgraded the DB DevOps container image to address OpenSSL-related security.
  - Fixed issues in LLM-authored pipeline YAML, improving correctness and execution reliability when using AI-assisted authoring.
  - Upgraded the DB DevOps container image to address OpenSSL-related security.
  - Fixed issues in LLM-authored pipeline YAML, improving correctness and execution reliability when using AI-assisted authoring.

### Release 1.68.x
The `1.68.x` release improves AI-assisted authoring accuracy and enhances usability for Flyway users.

#### Key Highlights
* **Feature Enhancements**
  - LLM-generated pipelines can now correctly include a primary database instance, reducing manual corrections.
  - Flyway dashboards now display the most recently updated records first, making it easier to track recent changes.
  - LLM-generated pipelines can now correctly include a primary database instance, reducing manual corrections.
  - Flyway dashboards now display the most recently updated records first, making it easier to track recent changes.

### Release 1.67.x
The `1.67.x` release strengthens policy enforcement, security, and visibility into database changes.

#### Key Highlights
* **Feature Enhancements**
  - Migration Script Access for Policies: OPA policies can now evaluate migration scripts directly, enabling stronger governance and pre-deployment validation.
  - SQL Script Visibility: Customers can view SQL scripts associated with migrations, improving transparency during reviews and audits.
  - Migration Script Access for Policies: OPA policies can now evaluate migration scripts directly, enabling stronger governance and pre-deployment validation.
  - SQL Script Visibility: Customers can view SQL scripts associated with migrations, improving transparency during reviews and audits.

* **Bug Fixes & Security**
  - Resolved issues affecting AI-assisted chat interactions and accuracy.
  - To ensure compatibility with the latest version of DB DevOps Plugin Image, memory size needs to be increased to 500MB to avoid OOM issues during large migrations.
  - Resolved issues affecting AI-assisted chat interactions and accuracy.
  - To ensure compatibility with the latest version of DB DevOps Plugin Image, memory size needs to be increased to 500MB to avoid OOM issues during large migrations.

## November 2025

### Release 1.65.x
The `1.65.x` release introduces foundational improvements to ensure Flyway migrations benefit from the same visibility and operational consistency that customers already rely on with Liquibase.

#### Key Highlights:
* **Feature Enhancements**
  - All Flyway-supported commands now supported in DBOPS service, aligning the Flyway experience similar to Liquibase.
  - The Flyway container image has been upgraded to support these new data-sync capabilities, improving reliability and ensuring forward compatibility with upcoming Flyway features in Harness.
  - All Flyway-supported commands now supported in DBOPS service, aligning the Flyway experience similar to Liquibase.
  - The Flyway container image has been upgraded to support these new data-sync capabilities, improving reliability and ensuring forward compatibility with upcoming Flyway features in Harness.

### Release 1.64.x
The `1.64.x` release delivers expanded synchronization capabilities for Flyway users, improving traceability and visibility across environments.

#### Key Highlights:
* **Feature Enhancements**
  - Added synchronization for Flyway migration state and command execution history, ensuring consistent tracking of applied, pending, and failed migrations across all stages.

### Release 1.63.x
The `1.63.x` release expands Flyway coverage across core DB Ops workflows, enabling teams to operationalize Flyway migrations with the same consistency and governance as Liquibase.

#### Key Highlights:

* **Feature Enhancements**
 - Teams can now execute Flyway-based schema changes through DBApplySchema, ensuring alignment with existing deployment pipelines.
 - Added support for defining migration and configuration (TOML) file paths, providing stronger flexibility for multi-directory and modular repository structures.
 - Introduced rollback execution support for Flyway within DB Ops, enabling controlled reversions in line with Flyway’s versioned migration model.

## October 2025

### Release 1.62.x
No customer-facing updates.

### Release 1.61.x
No customer-facing updates.

### Release 1.60.x
The `1.60.x` release introduces enhanced logging capabilities, empowering teams to capture and analyze detailed execution-level insights for improved auditing and troubleshooting.

#### Key Highlights:
* **Feature Enhancements**
  - Harness Database DevOps can now log additional execution details to a file by configuring the log-level and log-file Liquibase global parameters under Global Settings in pipeline steps. This enhancement enables customers to capture raw SQL statements and server responses, providing richer context for debugging and compliance audits.

**Minimum Supported Versions:**
  - `ng-manager` – 1.110.x (required)

## September 2025

### Release 1.59.x
The `1.59.x` release enhances migration flexibility, allowing teams to select the migration type per schema and improving the underlying instance structures for smoother operations.

#### Key Highlights:
* **Feature Enhancements**
  - Updated Instance Structure which aligns with new schema types, improving consistency and forward compatibility.

### Release 1.58.x
The `1.58.x` release expands schema type management, enabling full CRUD operations and better validation while simplifying the UI for database administration.

#### Key Highlights:
* **Feature Enhancements**
  - All CRUD operations supported for the new schema type.
  - Validation Checks ensures consistency for new and default schema types.

### Release 1.57.x
The `1.57.x` release delivers key reliability improvements and backend optimizations, strengthening pipeline execution in concurrent and multi-schema scenarios. It also includes version upgrades for enhanced stability and validation consistency.

#### Key Highlights:
* **Feature Enhancements**
  - Upgraded Drone-Liquibase to v1.10.0-4.33, improving validation workflows and compatibility.

* **Bug Fixes**
  - Fixed an issue where validation commands occasionally returned nil responses in plugin handlers.
  - Resolved an issue where concurrent executions using matrix or list-based looping could fail due to shared clone directories. Each iteration now clones into a distinct directory to ensure successful parallel runs.

### Release 1.56.x
The `1.56.x` release focuses on improving pipeline reliability, secure credential management, and change tracking for safer database operations.

#### Key Highlights:
* **Feature Enhancements**
  - Optimized Update & Rollback Flow for faster and more reliable execution.
  - Comma-Separated Secrets to simplify secure credential rotation.
  - ChangeSetMetadata API Enhancements now include executed SQL commands for better visibility.

### Release 1.55.x
The `1.55.x` release enhances visibility in the Migration State view, making it easier for teams to track deployments and understand which changes were tagged.

#### Key Highlights:
* **Feature Enhancements**
  - "Deployed with Tag" label is added to Migration State view for improved release traceability.

## August 2025

### Release 1.54.x
The `1.54.x` release focuses on improving usability in the schema overview experience. Previously, the schema dropdown on the Overview page only displayed a limited subset of schemas, making it difficult to navigate in environments with many schemas. With this update, customers now get a searchable dropdown that scales better for large environments, simplifying schema selection and improving visibility into migration states.

#### Key Highlights:
**Bug Fixes**
  - Added a searchable schema dropdown on the Overview page, resolving limitations with subset display and missing pagination/infinite scroll.

### Release 1.53.x
The `1.53.x` release focuses on improving database schema management workflows and stabilizing the Liquibase integration. Customers editing schemas can now select a primary instance directly from the UI. Customers editing schemas can now select a primary instance directly from the UI. Certain upcoming features will use this instance for development and validation use cases.

#### Key Highlights:

* **Feature Enhancements:**
  - Select a primary instance directly while editing a DB schema with a new dropdown in the UI.
* **Bug Fixes:**
  - DB Test and Preview steps now return detailed messages that appear in the chat UI, improving debugging visibility.


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

### Release 1.51.x
The `1.51.x` release strengthens rollback flexibility and control. For scenarios where teams need to customize how rollbacks are applied, this release introduces support for Custom Rollback SQL. Customers can now define custom rollback logic for complex cases where auto-generated SQL may not suffice. This includes onboarding and storing step outputs for UpdateSQL and RollbackSQL, along with a dedicated CustomUpdateSQL step for better pipeline integration.

#### Key Highlights:

* **Feature Enhancements:**
  - Custom Rollback SQL: Teams can now onboard and store step outputs for UpdateSQL and RollbackSQL, with a dedicated CustomUpdateSQL step in dbops-service.

## July 2025

### Release 1.49.x
The `1.49.x` release introduces key improvements across schema discovery, rollback tracking, and platform extensibility. Additionally, the platform now supports optional Primary DB instanceId, streamlining deployments across multi-instance environments.

#### Key Highlights:

* **Feature Enhancements:**
  - Rollbacks now generate detailed metadata entries, helping teams understand when and why a rollback occurred, especially when using `rollback-by-count`.
  - The platform now supports optional Primary DB instanceId, streamlining deployments across multi-instance environments.

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