---
title: Tenancy
description: Multi-tenant vs Single-tenant SaaS
sidebar_label: Tenancy
---

## Multi-tenant vs Single-tenant SaaS

Harness accounts are by default provisioned on multi-tenant SaaS clusters. Harness does not provide single-tenant SaaS clusters at this time. The only way to achieve this single tenancy is via the Harness Self-Managed Enterprise Edition (aka SMP).

Note that the term "account" is synomymous to a "tenant" from a SaaS cluster perspective.

## Account Migration

Customers can request migration of their account from one multi-tenant SaaS cluster to another multi-tenant SaaS cluster. The following are important points to note in the context of account migration.

1. It involves downtime during which regular usage of Harness will not be possible via any means including UI, delegates, APIs and webshooks. 

2. It is only supported for modules running on the Harness NG Platform. This means Harness CD FirstGen accounts cannot be migrated.

3. After account migration, Account ID will remain the same.

4. The entire account has to be migrated at once, there is no capability to migrate portions of the account.

The following steps will be followed by Harness and the customer to ensure a smooth migration.

1. Harness and the customer will ensure that the account has a vanity URL. If no such URL exists, then Harness will first provision a vanity URL in consultation with the customer. Follow the steps to [set up a vanity URL](/docs/platform/authentication/authentication-overview/#set-up-vanity-url).

2. The customer should change all delegates to use the vanity URL before the start of the migration window (see below). The advantage of this approach is that when the migration is completed, the delegates will get connected and no action will be required from the customer. The same principle applies to API/webhook clients for Harness and these clients should also be updated to use the vanity URL.

3. Harness and the customer will agree on a 6-hour migration window. At the beginning of this window, Harness will mark the account to inactive status so that processing of all pipelines and delegate tasks is stopped. Migration will be done from the analytics node to not have any production impact. Migration usually completes within 3 hours but planning for a 6-hour migration window allows for rollback if needed.

4. Once the migration is complete, Harness will change the incoming subdomain traffic to route to the new cluster. Thereafter, Harness will mark the account active in the new cluster and perform validation.

5. Harness will notify the customer that migration is complete. At this time, the customer will be able to access the UI and initiate regular usage.


