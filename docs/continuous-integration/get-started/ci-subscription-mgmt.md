---
title: Subscriptions and licenses
description: View and manage your CI subscriptions and licenses.
sidebar_position: 6
redirect_from:
  - /docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt
---

import Admin from '/docs/continuous-integration/shared/subscription-add-billing-admin.md';
import Cancel from '/docs/continuous-integration/shared/subscription-cancel.md';
import Create from '/docs/continuous-integration/shared/subscription-create.md';
import Overview from '/docs/continuous-integration/shared/subscription-overview.md';
import Billing from '/docs/continuous-integration/shared/subscription-update-billing.md';
import Invoice from '/docs/continuous-integration/shared/subscription-view-invoice.md';
import View from '/docs/continuous-integration/shared/subscription-view-subscriptions.md';
import License from '/docs/continuous-integration/shared/subscription-view-usage.md';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Overview />

## Subscriptions

You can view and manage your Harness CI subscription in your Harness **Account Settings**.

### View subscriptions

<View />

From the **Subscriptions** page, you can:

* [Upgrade your plan](#upgrade-your-plan).
* [View subscription and license usage details](#license-usage).

### Upgrade your plan

<Create />

### Switch or downgrade your plan

You can upgrade from the Free plan to either the Startup or Enterprise plan through the Harness Platform.

If you would like to switch between paid plans or downgrade to the Free plan, you must contact the [Harness Sales team](https://www.harness.io/pricing?module=ci#).

### Cancel your subscription

<Cancel />

## Billing

You can manage your payment method and billing admins in your Harness account.

In the legacy navigation, go to **Account settings** and then select **Billing**. In nav 2.0, **Billing** is under the **Subscriptions** section.

### Update your billing information

<Billing />

### Add a billing admin

<Admin />

### Request an invoice

<Invoice />

## License and cloud credit usage

<License />

## Harness Cloud billing and cloud credits

This section explains billing and credit consumption for Harness Cloud builds.

* **What is a Harness Cloud build?:** A *build on Harness Cloud* occurs when a user runs a pipeline that uses [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).
* **What is build execution time?:** The *build execution time* is the number of minutes that a build takes to complete, counted by the number of minutes used per machine type, and totaled across all machines and machine types used to complete the build.
* **What is a build minute?:** A *build minute* is one minute of build execution time. Each build minute [consumes credits](#credit-consumption).

### Credit consumption

Each build minute consumes credits. The rate per build minute, and the resulting credits consumption, depends on the target environment (such as OS type, machine resources, and so on) that you use for the Harness Cloud build.

The following table shows the applicable rates for each OS type as of August 2023.

| OS | Cores | Minute multiplier |
| -- | ----- | ----------------- |
| Linux | 4 | 2 |
| Linux | 8 | 5 |
| Linux | 16 | 10 |
| Linux | 30 | 20 |
| Windows | 4 | 8 |
| macOS | 6 | 60 |

Credits for build minutes are calculated based on build execution times (measured in minutes) by infrastructure resource class. Minimum cores guaranteed based on user's selection. Rates in the table above are current as of August 2023. For more information, contact Harness Sales or your account manager.

Based on the values in the table above:

* 1000 Linux, 4-core build minutes consumes 2000 cloud credits.
* 1000 Windows build minutes consumes 8000 cloud credits.
* 1000 macOS build minutes consumes 60000 cloud credits.
* Using multiple machines that utilize 500 Linux, 4-core build minutes and 1000 macOS build minutes, a total of 61000 cloud credits are consumed.

### Credit allowance by plan tier

Plan credits can be consumed by all users within the account registered to run builds on Harness Cloud.

Free plans receive 2000 free credits every month. Any free credits that are unused at the end of the month expire automatically and do not roll over from one month to the next.

Customers on paid (**Startup** or **Enterprise**) plans can purchase credits via credit packages. These purchased credits can be rolled over from one month to the next, but generally expire one year from the date the credit package was originally purchased, or, if you have signed an Order Form with Harness, the credits expire on the date stated on your Order Form.

Harness notifies you when you are running low on cloud credits, and Harness can invoice in arrears for overages. For more information, go to [Credit overages (overuse)](#credit-overages-overuse).

Free plans require credit card validation to use Harness Cloud. If you don't want to provide a credit card, you can use [local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

### Usage limits

The following sections describe limits for concurrent builds, Cache Intelligence storage, and network transfers. You can request a higher concurrency limit, network transfer limit, and additional Cache Intelligence storage. For more information, contact Harness Sales or your account manager.

#### Concurrency

The number of concurrent jobs you can run in your account depends on the plan you are subscribed to. Once you reach your concurrency limit, any new jobs are queued.

The following table lists concurrency limits for each OS type and plan tier.

| OS | Free | Startup | Enterprise |
| -- | ---- | ---- | ---------- |
| Linux | 20 | 40 | 60 |
| Windows | 1 | 5 | 5 |
| macOS | 1 | 5 | 5 |

#### Storage

Harness stores cached data used by [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) in Harness managed storage. The maximum amount of cache data that you can store depends on the plan you are subscribed to:

* Free: 2 GB
* Startup: 5 GB
* Enterprise: 10 GB

Harness does not directly limit the number of caches you can store, but once you reach your storage limit, Harness continues to save new caches while automatically evicting old caches.

#### Network transfers

The network transfer limit applies to the data transferred from Harness Cloud to customer managed storage. There is no charge for data stored and retrieved within Harness Cloud for Cache Intelligence and other scenarios.

The limit depends on the plan you are subscribed to:

* Free: 1 GB
* Startup: 5 GB
* Enterprise: 10 GB

### Credit overages (overuse)

As a courtesy, Harness notifies you when you are running low on [cloud credits](#credit-allowance-by-plan-tier). When you receive such a notification, Harness strongly recommends that you purchase additional credits through your account manager.

To allow you to continually execute your builds, Harness will allow you to continue using Harness Cloud even if you do not have enough credits in your account to cover your total build execution time, but Harness will invoice you in arrears for all credits owed.

:::warning

Harness reserves the right to automatically suspend your access to Harness Cloud and suspend all Harness Cloud builds if you do not promptly pay for all credits utilized by your account.

To restore your access to Harness Cloud and continue executing Harness Cloud builds, you must complete payment for your additional usage, and you must also purchase enough additional credits to cover all the Harness Cloud builds you intend to execute during the remainder of your License Term.

Harness will invoice you for charges due, and all amounts are due in full within 30 days of the invoice date.

Harness reserves the right to suspend your access to Harness Cloud and suspend all Harness Cloud builds if you are overdue on any amounts owed.

:::

For more information, contact Harness Sales or your account manager.
