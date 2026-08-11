---
title: Subscriptions and licenses
sidebar_label: Subscriptions & Licenses
description: Storage, repository, file size, and bandwidth limits for Harness Code Repository, and how they relate to your Harness CI subscription.
keywords:
  - subscription
  - license
  - storage limit
  - bandwidth limit
  - usage limits
tags:
  - code-repository
  - get-started
  - subscriptions
sidebar_position: 30
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Harness Code Repository is available to all customers of the Harness Continuous Integration (CI) module, and your Harness CI subscription determines its usage limits. The number of users who can access Code Repository is independent of your CI subscription, but storage and bandwidth limits follow your subscription tier.

Go to [Harness CI subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt) to review your current subscription.

---

## Usage limits

The following limits apply to storage and network transfer used by Harness Code Repository on Harness Cloud. Customers on paid plans can request an increase to either limit. To request an increase, contact [Harness Sales](https://www.harness.io/company/contact-sales) or your account manager.

### Storage

Harness stores Git repository data and Git Large File Storage (LFS) data in Harness-managed storage. The aggregate size of all repositories on disk must not exceed the account storage limit. When an account exceeds the limit, Harness blocks Git push operations until you reduce usage.

The account storage limit depends on your plan:

| Plan | Account storage limit | Per-repository limit |
| --- | --- | --- |
| Free | 10 GB | 4 GB |
| Paid | 250 GB | 10 GB |

:::info

Every file stored in Git is limited to 100 MB by default, regardless of plan. You can change this limit per repository through the [repository general settings API](https://apidocs.harness.io/repository/updategeneralsettings).

:::

<!-- TODO(SME): State what happens when a single repository exceeds its per-repository limit while the account remains under the account limit. The page currently describes the account-level block only. -->

### Bandwidth

The network transfer limit applies to data transferred from Harness Cloud to customer-managed storage. Aggregate inbound and outbound network traffic must not exceed the bandwidth limit for a given calendar month. When an account exceeds the limit, Harness blocks network requests and returns a `429 Too Many Requests` HTTP error.

The monthly bandwidth limit depends on your plan:

| Plan | Monthly bandwidth limit |
| --- | --- |
| Free | 50 GB |
| Paid | 250 GB |

<!-- TODO(SME): Confirm whether the bandwidth counter resets on the calendar month or on the subscription billing period, and state where a customer can view current storage and bandwidth consumption in the UI. -->

:::warning

If Harness determines that your bandwidth usage is significantly excessive relative to other users of similar features, Harness reserves the right to suspend your account, throttle your file hosting, or otherwise limit your activity until you reduce your bandwidth consumption. On the free tier, Harness further reserves the right, after providing advance notice, to delete repositories that place undue strain on the infrastructure.

:::

---

## Troubleshooting

<Troubleshoot
  issue="Git push to a Harness Code repository is blocked because the account storage limit is exceeded"
  mode="docs"
  fallback="Reduce repository size by removing large objects or moving them to Git LFS, or contact Harness Sales to request a storage increase on a paid plan."
/>

<Troubleshoot
  issue="Harness Code repository operations return HTTP 429 Too Many Requests"
  mode="docs"
  fallback="The account has exceeded its monthly bandwidth limit. Requests are blocked until the next calendar month, or until you request a bandwidth increase on a paid plan."
/>

<Troubleshoot
  issue="A file larger than 100 MB is rejected when pushing to a Harness Code repository"
  mode="docs"
  fallback="The default per-file limit is 100 MB. Raise it for a specific repository through the repository general settings API, or store the file with Git LFS."
/>

---

## Next steps

You know the storage, file size, and bandwidth limits that apply to your plan and what happens when you reach them. Plan repository layout and large file handling accordingly.

- [Git LFS](/docs/code-repository/work-in-repos/git-lfs): Store large files outside the main Git object store.
- [Harness CI subscriptions and licenses](/docs/continuous-integration/get-started/ci-subscription-mgmt): Review the CI subscription that governs these limits.
- [Clone](/docs/code-repository/work-in-repos/clone-repos): Use partial and shallow clone to reduce bandwidth consumption.
