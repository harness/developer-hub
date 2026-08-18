---
title: Overview
sidebar_label: Overview
sidebar_position: 1
description: Monitor Git synchronization and webhook activity for your Git-backed Harness entities from the Webhooks page.
keywords:
  - git experience
  - bi-directional sync
  - webhooks
  - sync health
  - observability
tags:
  - git-experience
  - webhooks
  - bi-directional-sync
---

After you connect your Harness entities to a Git repository, you can monitor Git synchronization and webhook activity from the **Webhooks** page.

The **Webhooks** page provides two tabs:

- **Events**: View the history of webhook events processed by Harness, inspect event details, and troubleshoot synchronization issues.
- **Observability**: Monitor repository synchronization health and Git provider API rate-limit consumption to identify configuration issues and maintain reliable synchronization. This tab is available at the **account** scope only.

---

## What you will learn in this topic

This section introduces the monitoring capabilities available on the **Webhooks** page. It covers:

- How to view [webhook sync events](/docs/platform/git-experience/monitor-git-experience/monitor-events).
- How to monitor [repository synchronization health](/docs/platform/git-experience/monitor-git-experience/monitor-repository-sync-health).
- How to monitor [Git provider API rate-limit consumption](/docs/platform/git-experience/monitor-git-experience/monitor-git-provider-rate-limits).

---

## Webhooks page

The **Webhooks** page provides two monitoring views.

### Events

The **Events** tab displays the history of webhook events processed by Harness. You can monitor webhook activity, filter events, inspect payloads, and troubleshoot synchronization failures.

Go to [Monitor webhook events](/docs/platform/git-experience/monitor-git-experience/monitor-events) to view and troubleshoot webhook events.

### Observability

The **Observability** tab provides visibility into the health of Git synchronization and Git provider API usage across your repositories. It is available at the **account** scope only.

It includes:

- **Repository sync health**: View webhook coverage and synchronization status across Git-backed repositories.
- **Rate limit consumption**: Monitor Git provider API rate-limit usage for your Git connectors.

Go to [Monitor repository sync health](/docs/platform/git-experience/monitor-git-experience/monitor-repository-sync-health) and [Monitor Git provider rate limits](/docs/platform/git-experience/monitor-git-experience/monitor-git-provider-rate-limits) to monitor synchronization and connector health.

---

## Next steps

- [Monitor webhook events](/docs/platform/git-experience/monitor-git-experience/monitor-events): Monitor and troubleshoot webhook events.
- [Monitor repository sync health](/docs/platform/git-experience/monitor-git-experience/monitor-repository-sync-health): Monitor webhook coverage and synchronization status.
- [Monitor Git provider rate limits](/docs/platform/git-experience/monitor-git-experience/monitor-git-provider-rate-limits): Monitor Git provider API rate-limit consumption.
- [Set up bi-directional sync](/docs/platform/git-experience/gitexp-bidir-sync-setup): Configure webhooks so Harness stays in sync with changes made directly in Git.
