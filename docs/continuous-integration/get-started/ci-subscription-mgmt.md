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

You can upgrade from the Free plan to [Paid plans](https://www.harness.io/pricing) through the Harness Platform.

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

## Harness Cloud billing and Cloud credits

Harness Cloud provides Harness-managed VMs for executing various tasks, such as builds, and security tests. This section explains billing and credit consumption for Harness Cloud.

[Learn more about Harness Cloud](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).


### Credit consumption

Each minute of execution on Harness Cloud consumes credits. The rate per minute, and the resulting credits consumption, depends on the target environment (such as OS type, machine resources, and so on) that you use for the Harness Cloud execution.

Users can choose between two models: **Flex** and **Custom**.

**Flex Model**: When using the Flex resource class, Harness provides the maximum available resources based on current capacity in Harness Cloud.

**Custom Model**: Users can select specific resource classes tailored to their needs, with defined CPU allocations.

#### Rate Tables
The following tables outline the minute multipliers for each model as of August 2023:

##### Flex Model 
| **Resource Class**  | **CPU** | **Minute Multiplier** |
|------------|-----------|-----------------------|
| **Linux**  |           |                       |
| flex | max per capacity    | 2                     |
| **Windows**|           |                       |
| flex | max per capacity    | 8                     |
| **macOS**    |           |                       |
| flex | max per capacity    | 60                    |
##### Custom Model 

| **Resource Class**  | **CPU** | **Minute Multiplier** |
|------------|-----------|-----------------------|
| **Linux**  |           |                       |
| small      | 4     | 2                     |
| medium     | 8     | 5                     |
| large      | 16    | 10                    |
| xlarge     | 30    | 20                    |
| **Windows**|           |                       |
| small| 4     | 8                     |
| **macOS**    |           |                       |
| small | 6     | 60                    |

Credits for Cloud minutes are calculated by multiplying the execution time (measured in minutes, rounded to the nearest minute) by the minute multiplier of the selected resource class.

Examples for credit consumption, based on the values in the table above:

* 1000 Linux, 4-core build minutes consumes 2000 cloud credits.
* 1000 Windows build minutes consumes 8000 cloud credits.
* 1000 macOS build minutes consumes 60000 cloud credits.
* Using multiple machines that utilize 500 Linux, 4-core build minutes and 1000 macOS build minutes, a total of 61000 cloud credits are consumed.

To learn how to select a resource class, please see [Using resource classes](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#using-resource-classes)

### Credit allowance by plan tier

**Free plans** receive 2000 free credits every month. Any free credits that are unused at the end of the month expire automatically and do not roll over from one month to the next.

Customers on **paid plans** can purchase Harness Cloud credits. These purchased credits can be rolled over from one month to the next, but generally expire one year from purchase, unless specified otherwise in signed an Order Form with Harness.

Harness notifies you when you are running low on cloud credits, and Harness can invoice in arrears for overages. For more information, go to [Credit overages (overuse)](#credit-overages-overuse).

Free plans may require credit card validation to use Harness Cloud. If you don't want to provide a credit card, you can use [local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) with your free plan.

Cloud credits can be consumed by all users within the account registered to run pipelines on Harness Cloud.


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

Harness stores cached data used by [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence.md) in Harness managed storage. The maximum amount of cache data that you can store depends on the plan you are subscribed to:

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

As a courtesy, Harness notifies you when you are running low on [cloud credits](#credit-allowance-by-plan-tier). When you receive such a notification, Harness strongly recommends that you purchase additional credits through your account manager.

To allow you to continually execute your builds, Harness will allow you to continue using Harness Cloud even if you do not have enough credits in your account to cover your total build execution time, but Harness will invoice you in arrears for all credits owed.

:::warning

Harness reserves the right to automatically suspend your access to Harness Cloud and suspend all Harness Cloud builds if you do not promptly pay for all credits utilized by your account.

To restore your access to Harness Cloud and continue executing Harness Cloud builds, you must complete payment for your additional usage, and you must also purchase enough additional credits to cover all the Harness Cloud builds you intend to execute during the remainder of your License Term.

Harness will invoice you for charges due, and all amounts are due in full within 30 days of the invoice date.

Harness reserves the right to suspend your access to Harness Cloud and suspend all Harness Cloud builds if you are overdue on any amounts owed.

:::

For more information, contact Harness Sales or your account manager.
