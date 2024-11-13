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

## License and Cloud Credit usage

<License />

## Harness Cloud billing and Cloud credits

Harness Cloud provides Harness-managed infrastructure that can be used for various tasks in Harness such as builds, security tests and infrastructure provisioning. This section outlines how billing and credit consumption work for all Harness Cloud executions.

[Learn more about Harness Cloud](../use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md).


### Credit consumption

Credits are deducted for each minute of execution on Harness Cloud, depending on factors such as the operating system and allocated resources. Multiple Harness modules (e.g., CI, Security Testing Orchestration, Infrastructure as Code Management) allow customers to run pipeline stages on Harness Cloud infrastructure, and whenever a stage is executed on Harness Cloud, the corresponding credits are consumed.

**What is build execution time?** 
The build execution time is the number of minutes that a build takes to complete, counted by the number of minutes used per machine type, and totaled across all machines and machine types used to complete the build.

Users can choose between two models: **Flex** and **Custom**:

* **Flex Model**: When using the Flex resource class, Harness provides the maximum available resources based on current capacity in Harness Cloud.

* **Custom Model**: Users can select specific resource classes tailored to their needs, with defined cores allocations.

#### Rate Tables
The following tables outline the minute multipliers for each model as of August 2023:

##### <u>Flex Model</u>
| **Operating system** | **Resource Class Name**  | **Cores** | **Minute Multiplier** |
|------------|------------|-----------|-----------------------|
| **Linux**   | flex | max per capacity    | 2                     |
| **Windows** | flex | max per capacity    | 8                     |
| **macOS**    |  flex | max per capacity    | 60                    |

##### <u>Custom Model</u> 


| **Operating system** | **Resource Class Name** | **Cores** | **Minute Multiplier** |
|-------------|-------------------------|-----------|-----------------------|
| **Linux**   | small                   | 4         | 2                     |
|             | medium                  | 8         | 5                     |
|             | large                   | 16        | 10                    |
|             | xlarge                  | 30        | 20                    |
| **Windows** | small                   | 4         | 8                     |
| **macOS**   | small                   | 6         | 60                    |


Credits for Cloud minutes are calculated by multiplying the execution time (measured in minutes, rounded to the nearest minute) by the minute multiplier of the selected resource class.

Examples for credit consumption, based on the values in the table above:


* 1,000 minutes on a Linux, 4-core (small) machine = 2,000 cloud credits (1,000 minutes × 2).
* 1,000 minutes on a Windows, 4-core (small) machine = 8,000 cloud credits (1,000 minutes × 8).
* 1,000 minutes on a macOS, 6-core (small) machine = 60,000 cloud credits (1,000 minutes × 60).

To learn how to select a resource class, please see [Using resource classes](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#using-resource-classes)

### Credit allowance by plan tier

**Free plans** receive 2000 free credits every month. Any free credits that are unused at the end of the month expire automatically and do not roll over from one month to the next.

Customers on **paid plans** can purchase Harness Cloud credits. These purchased credits can be rolled over from one month to the next, but generally expire one year from purchase, unless specified otherwise in signed an Order Form with Harness.

Harness notifies you when you are running low on cloud credits, and Harness can invoice in arrears for overages. For more information, go to [Credit overages (overuse)](#credit-overages-overuse).

Cloud credits can be consumed by all users within the account registered to run pipelines on Harness Cloud.


### Usage limits

The following sections describe limits for concurrent stage execution on Harness Cloud, Storage used by [Harness CI Intelligence](/docs/continuous-integration/get-started/harness-ci-intelligence.md) features, and network transfers. You can request request to increase concurrency, network transfer, or storage limits. For more information, contact Harness Sales or your account manager.

#### Concurrency

The number of concurrent stages you can run on Harness Cloud in your account depends on the plan you are subscribed to. Once you reach your concurrency limit, any new stages are queued.

The following table lists concurrency limits for each OS type and plan tier.

| OS | Free | Startup | Enterprise |
| -- | ---- | ---- | ---------- |
| Linux | 20 | 40 | 60 |
| Windows | 1 | 5 | 5 |
| macOS | 1 | 5 | 5 |

#### Storage

Harness stores cached data when using cache optimizing [Harness CI Intelligence](/docs/continuous-integration/get-started/harness-ci-intelligence.md) features, in Harness managed storage. The maximum amount of cache data that you can store depends on the plan you are subscribed to:

* Free: 2 GB
* Startup: 5 GB
* Enterprise: 10 GB

Harness does not directly limit the number of caches you can store, but once you reach your storage limit, Harness continues to save new caches while automatically evicting old caches.

#### Network transfers

The network transfer limit applies to the data transferred from Harness Cloud to customer managed storage.

The limit depends on the plan you are subscribed to:

* Free: 1 GB
* Startup: 5 GB
* Enterprise: 10 GB

### Credit overages (overuse)

As a courtesy, Harness notifies you when you are running low on [cloud credits](#credit-allowance-by-plan-tier). When you receive such a notification, Harness strongly recommends that you purchase additional credits through your account manager.

To allow you to continually execute your pipeline using Harness Cloud, Harness will allow you to continue using Harness Cloud even if you do not have enough credits in your account to cover your total execution time, but Harness will invoice you in arrears for all credits owed.

:::warning

Harness reserves the right to automatically suspend your access to Harness Cloud and suspend all Harness Cloud executions if you do not promptly pay for all credits utilized by your account.

To restore your access to Harness Cloud and continue executing Harness Cloud , you must complete payment for your additional usage, and you must also purchase enough additional credits to cover all the Harness Cloud usage you intend to execute during the remainder of your License Term.

Harness will invoice you for charges due, and all amounts are due in full within 30 days of the invoice date.

Harness reserves the right to suspend your access to Harness Cloud and suspend all Harness Cloud executions if you are overdue on any amounts owed.

:::

For more information, contact Harness Sales or your account manager.
