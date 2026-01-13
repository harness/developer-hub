---
title: Connect with GitHub Enterprise Server
description: Integrate SEI with GitHub Enterprise Server
sidebar_position: 3
sidebar_label: Connect with GitHub Enterprise Server
redirect_from:
    - /docs/software-engineering-insights/sei-integrations/github/sei-github-enterprise-server
    - /docs/software-engineering-insights/setup-sei/configure-integrations/github/sei-github-enterprise-server
---

import GithubServer from '@site/docs/software-engineering-insights/shared/integrations/github-server.mdx';

:::info GitHub Commit Ingestion Update (Resolved)
A GitHub Events API change temporarily impacted ingestion of non-PR commits in Harness SEI.

The issue has been resolved, and missing commits have been backfilled for all healthy, non-satellite integrations. Some integrations may require token updates before backfill can complete.

For details, see [GitHub Commit Ingestion Update](/docs/software-engineering-insights/harness-sei/setup-sei/configure-integrations/github/commit-ingestion).
:::

<GithubServer />