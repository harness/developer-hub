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
The `1.49.x` release introduces key improvements across schema discovery, rollback tracking, and platform extensibility. With the new schema list API available via the ingress gateway, customers can now programmatically fetch available schemas for their database account. Rollback operations are now enhanced with richer metadata capture, helping teams trace rollback executions via the `changesetmetadata` model. Additionally, the platform now supports optional Primary DB `instanceId`, streamlining deployments across multi-instance environments. End-to-end sanity has passed across all major integrations, including plugin steps, OPA, and registry-based workflows.

#### Key Highlights:

* **✅ New Features:**
    - Ingress-exposed Schema List API for improved schema discovery
    - Rollback execution now records detailed metadata when using rollback-count
    - Added support for optional Primary DB Instance ID during pipeline execution

* ✅ Verified support across all major pipeline configurations:
    - Repo/Account connectivity
    - Public/Private registries
    - DB types: Postgres, MySQL, Oracle, Mongo (incl. TLS), SQL Server
    - Policy enforcement with OPA and rollback
    - Metadata, overrides, archive paths, and advanced plugin features

**Minimum Supported Versions:**
- `ngmanager` – 1.49.x
- `dbservice` – 1.49.x

### Release 1.48.x

This release brings several critical feature enhancements and extended support across various database types and integrations. The response structure for deployed state APIs has been enriched with `changesetFQN` to improve traceability, and the `changesetDetailDrawer` is now accessible through the Core UI. In addition, DB schema and instance audit flows, plugin inputs, and system APIs have passed E2E sanity. Extensive coverage has also been added across pipeline step types, OPA policy enforcement (including rollback support), archive path handling, and metadata visibility.

#### Key Highlights:

* **✅ New Features:**
  - `mark-next-changeset-ran` step and sync integration
  - Deployed state now includes changesetFQN
  - Core UI exposes changesetDetailDrawer
  - List schemas for an account API

* ✅ Support matrix expanded for multiple DB types (Postgres, MySQL, Oracle, SQL Server, Mongo), including TLS support

* ✅ OPA and OPA rollback support across key Databases

* ✅ Private Registry support verified for MySQL

* ✅ Metadata fields such as comments, labels, and authors now exposed

**Minimum Supported Versions:**
- `ngmanager` – 1.48.0
- `dbservice` – 1.48.0
