---
title: Tenancy
description: Multi-tenant vs Single-tenant SaaS
sidebar_label: Tenancy
---

## Multi-tenant vs Single-tenant SaaS

Harness accounts are by default provisioned on multi-tenant SaaS clusters. The term "account" is synomymous to a tenant from a SaaS cluster perspective.

## Account Migration

Customers can request migration of their account from a multi-tenant SaaS cluster to a single-tenant SaaS cluster at an additional cost. The following are important points to note in the context of account migration.

1. It involves downtime during which regular usage of Harness will not be possible via any means including UI, delegates, APIs and webshooks. 

2. It is only supported for modules running on the Harness NG Platform. This means Harness CD FirstGen accounts cannot be migrated.

The following steps will be followed by Harness and the customer to ensure a smooth migration.

1. Harness and customer will ensure that the account has a vanity URL. If no such URL exists, then Harness will first provision a vanity URL in consultation with the customer.

2. Customer should change all delegates to use the vanity URL before the start of the migration window (see below). The advanteage of this approach is that when the migration is completed, the delegates will get connected and no action will be required from the customer. Same principle applies to API/webhook clients for Harness and these clients should also be updated to use the vanity URL.

2. Harness and customer will agree on a 6-hour migration window. At the beginning of this window, Harness will mark the account to  inactive status so that processing of all pipelines and delegate tasks is stopped. Migration will done from the analytics node to not have any production impact. Migration usually completes within 3 hours but planning for 6-hour migration window allows for rollback if needed.

3. Once the migration is complete, Harness will change the incoming subdomain traffic to route to the new cluster. Thereafter, Harness will mark the account active in the new cluster and perform validation.

4. Harness will notify the customer that migration is complete. At this time, customer will be able to access the UI and initiate regular usage.


