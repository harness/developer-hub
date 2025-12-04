---
title: SEI Account Decommissioning and Data Retention 
description: Learn how to request SEI account decommissioning, understand data deletion behavior, retention policies, and applicable SLAs.
sidebar_label: Decommissioning and Data Retention
sidebar_position: 5
---

Harness SEI provides a controlled, auditable process for decommissioning the SEI service on a Harness account. This ensures that customer data is removed securely, with full transparency and regulatory compliance.

This documentation walks you through how to request decommissioning an SEI account, what happens during the decommissioning process, SEI data retention and deletion policies, and applicable SLAs and customer responsibilities.

:::info
This page is intended for cybersecurity teams, compliance reviewers, and administrators responsible for managing the SEI account lifecycle.
:::

## Decommission an SEI account

SEI account decommissioning is a manual, request-driven process performed by the Harness SEI Engineering team to ensure data integrity, ownership validation, and regulatory compliance.

Customers typically request decommissioning when consolidating multiple SEI instances or retiring unused or test/sandbox environments.

To request SEI account decommissioning, submit a ticket with [Harness Support](/docs/software-engineering-insights/sei-support) and include the following details:

* **Account Identifier**: Harness Account ID and SEI project name(s).
* **Confirmation Statement**: Explicit approval to delete the SEI service and all associated data.
* **Requested Deletion Date**: Optional. Defaults to the standard SLA window of **up to 30 days** from the date the request is received.
* **Point of Contact**: For verification and closure.

Once the request is received:

1. The SEI Engineering team validates account ownership and confirms the request.
1. The SEI Engineering team performs the decommissioning, which includes:
   
   * Disabling data ingestion
   * Removing integration secrets, webhook listeners, and internal connections
   * Deleting SEI data objects (issues, commits, build and deploy events, metrics, identities, and snapshots)
   * Removing dashboards, insights, configuration artifacts, and account metadata

1. A confirmation is sent to the customer once the process is complete.

## Data retention for SEI

Harness SEI retains all customer data **indefinitely by default** unless an explicit deletion request is submitted.

:::danger
Partial data retention is not supported unless explicitly requested and formally approved. 

Data deletion is **permanent and irreversible**. Once deletion is confirmed and executed, the data cannot be recovered.
:::

Data is deleted only when a customer requests SEI service decommissioning or a customer requests data deletion without decommissioning (rare but supported).

When a deletion request is processed, the following data is permanently removed:

* All ingested data (issues, SCM events, CI/CD events, incident data)
* All computed insights (metrics, timelines, DORA metrics, DevOps metrics, correlations)
* All configuration artifacts (profiles, dashboards, mappings, teams, collections)
* All access tokens and connection metadata

## FAQs

<details>
<summary>Does Harness SEI automatically delete customer data after a set period?</summary>

No. Harness SEI retains data indefinitely unless a formal deletion or decommissioning request is submitted.

</details>
<details>
<summary>Can I export my Harness SEI data before deletion?</summary>

Yes. Customers can export available datasets using existing [Harness SEI export capabilities](/docs/software-engineering-insights/harness-sei/analytics-and-reporting/export) or [public APIs](/docs/software-engineering-insights/harness-sei/api/export-insights) before deletion.

</details>
<details>
<summary>Does decommissioning affect other Harness modules?</summary>

No. Only the SEI service and its associated data are removed. Other Harness modules remain unaffected.

</details>
<details>
<summary>Can I schedule deletion for a future date?</summary>

Yes. Include the preferred deletion date in your support ticket.

</details>