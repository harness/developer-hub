---
title: Subscriptions and licenses
description: View and manage your CI subscriptions and licenses.
sidebar_position: 70
---

```mdx-code-block
import Admin from '/docs/continuous-integration/shared/subscription-add-billing-admin.md';
import Cancel from '/docs/continuous-integration/shared/subscription-cancel.md';
import Create from '/docs/continuous-integration/shared/subscription-create.md';
import Overview from '/docs/continuous-integration/shared/subscription-overview.md';
import Billing from '/docs/continuous-integration/shared/subscription-update-billing.md';
import Invoice from '/docs/continuous-integration/shared/subscription-view-invoice.md';
import View from '/docs/continuous-integration/shared/subscription-view-subscriptions.md';
import License from '/docs/continuous-integration/shared/subscription-view-usage.md';
```

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

You can upgrade from the Free plan to either the Team or Enterprise plan through the Harness Platform.

If you would like to switch between paid plans or downgrade to the Free plan, you must contact the [Harness Sales team](https://www.harness.io/pricing?module=ci#).

### Cancel your subscription

<Cancel />

## Billing

You can manage your payment method and billing admins in your Harness account. Go to **Account settings** and then select **Billing**.

### Update your billing information

<Billing />

### Add a billing admin

<Admin />

### Request an invoice

<Invoice />

## License and build credit usage

<License />

## Harness Cloud billing and build credits

This section explains billing and credit consumption for Harness Cloud builds.

### Key terms

* A *build on Harness Cloud* occurs when a user runs a pipeline that uses [Harness Cloud build infrastructure](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).
* *Build execution time* is the number of minutes that a build takes to complete, counted by the number of minutes used per machine type, and totaled across all machines and machine types used to complete the build.
* A *build minute* is one minute of build execution time.

### Credits

Each build minute consumes credits. The rate per build minute, and the resulting credits consumption, depends on the target environment (such as OS type, machine resources, and so on) that you use for the Harness Cloud build.

The following table shows the applicable rates for each OS type as of August 2023.

| OS | Cores | Minute multiplier |
| -- | ----- | ----------------- |
| Linux | 4 | 2 |
| Linux | 8 | 5 |
| Linux | 16 | 10 |
| Linux | 32 | 20 |
| Windows | 4 | 8 |
| macOS | 6 | 60 |

Credits for build minutes are calculated based on build execution times (measured in minutes) by infrastructure resource class. Minimum cores guaranteed based on user's selection. Rates in the table above are current as of August 2023. For more information, contact Harness Sales or your account manager.

Based on the values in the table above:

* 1000 Linux, 4-core build minutes consumes 2000 build credits.
* 1000 Windows build minutes consumes 8000 build credits.
* 1000 macOS build minutes consumes 60000 build credits.
* Using multiple machines that utilize 500 Linux, 4-core build minutes and 1000 macOS build minutes, a total of 61000 build credits are consumed.

### Credit allowance by plan tier

All plans receive 2000 free credits every month. These credits can be consumed by all users within the account registered to run builds on Harness Cloud. Any free credits that are unused at the end of the month expire automatically and do not roll over from one month to the next.

Customers on paid (**Team** or **Enterprise**) plans have the option to purchase extra credits, via credit packages. These purchased credits can be rolled over from one month to the next, but generally expire one year from the date the credit package was originally purchased, or, if you have signed an Order Form with Harness, the credits expire on the date stated on your Order Form.

For more information, go to [Credit overages (overuse)](#credit-overages-overuse).

### Usage limits

The following sections describe limits for concurrent builds, Cache Intelligence storage, and network transfers. You can request a higher concurrency limit, network transfer limit, and additional Cache Intelligence storage. For more information, contact Harness Sales or your account manager.

#### Concurrency

The number of concurrent jobs you can run in your account depends on the plan you are subscribed to. Once you reach your concurrency limit, any new jobs are queued.

The following table lists concurrency limits for each OS type and plan tier.

| OS | Free | Team | Enterprise |
| -- | ---- | ---- | ---------- |
| Linux | 20 | 40 | 60 |
| Windows | 1 | 5 | 5 |
| macOS | 1 | 5 | 5 |

#### Storage

Harness stores cached data used by [Cache Intelligence](../use-ci/caching-ci-data/cache-intelligence.md) in Harness managed storage. The maximum amount of cache data that you can store depends on the plan you are subscribed to:

* Free: 2 GB
* Team: 5 GB
* Enterprise: 10 GB

Harness does not directly limit the number of caches you can store, but once you reach your storage limit, Harness continues to save new caches while automatically evicting old caches.

#### Network transfers

The network transfer limit applies to the data transferred from Harness Cloud to customer managed storage. There is no charge for data stored and retrieved within Harness Cloud for Cache Intelligence and other scenarios.

The limit depends on the plan you are subscribed to:

* Free: 1 GB
* Team: 5 GB
* Enterprise: 10 GB

### Credit overages (overuse)

As a courtesy, Harness notifies you when you are running low on [build credits](#credit-allowance-by-plan-tier). When you receive such a notification, Harness strongly recommends that you purchase additional credits through your account manager.

To allow you to continually execute your builds, Harness will allow you to continue using Harness Cloud even if you do not have enough credits in your account to cover your total build execution time, but Harness will invoice you in arrears for all credits owed.

:::info

Harness reserves the right to automatically suspend your access to Harness Cloud and suspend all Harness Cloud builds if you do not promptly pay for all credits utilized by your account.

To restore your access to Harness Cloud and continue executing Harness Cloud builds, you must complete payment for your additional usage, and you must also purchase enough additional credits to cover all the Harness Cloud builds you intend to execute during the remainder of your License Term.

Harness will invoice you for charges due, and all amounts are due in full within 30 days of the invoice date.

Harness reserves the right to suspend your access to Harness Cloud and suspend all Harness Cloud builds if you are overdue on any amounts owed.

:::

For more information, contact Harness Sales or your account manager.
