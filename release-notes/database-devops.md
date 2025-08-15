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

## July 2025

### Release 1.49.x
The `1.49.x` release introduces key improvements across schema discovery, rollback tracking, and platform extensibility. Additionally, the platform now supports optional Primary DB instanceId, streamlining deployments across multi-instance environments.

#### Key Highlights:

* **✅ Feature Enhancements:**
  - Rollbacks now generate detailed metadata entries, helping teams understand when and why a rollback occurred, especially when using `rollback-by-count`.
  - The platform now supports optional Primary DB instanceId, streamlining deployments across multi-instance environments.

**Minimum Supported Versions:**
- `ngmanager` – 1.49.x
- `dbservice` – 1.49.x

### Release 1.48.x

This release brings several critical feature enhancements and extended support across various database types and integrations.

#### Key Highlights:

* **✅ New Features:**
  - Deployed state now includes changesetFQN
  - You can now view the changeset details by clicking on the change-id in the deployed state tab on the apply or rollback step.

* ✅ Added TLS support for the following databases: Postgres, MySQL, Oracle, SQL Server, MongoDB.
* ✅ OPA and OPA rollback support across key Databases.
* ✅ Private Registry support verified for MySQL.
* ✅ Metadata fields such as comments, labels, and authors now visible.

**Minimum Supported Versions:**
- `ngmanager` – 1.48.0
- `dbservice` – 1.48.0
