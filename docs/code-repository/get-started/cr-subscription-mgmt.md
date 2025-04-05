---
title: Subscriptions and licenses
description: CR subscription usage limits.
sidebar_position: 6
---

Harness Code Repository (CR) is available for all customers of the Harness Continuous Integration (CI) module. Your subscription for Harness CI determines the usage limits for Code Repository. Please refer to the documentation for [Harness Continous Integration](/docs/continuous-integration/get-started/ci-subscription-mgmt) to see your current subscription. 

The number of users for CR is determined by your CI subscription, however there are additional limits on Code Repository for storage and bandwidth based on your subscription tier.

### Usage limits

The following sections describe limits for storage and network transfer used by Harness Code Repository on Harness Cloud. Customers on paid plans can request to increase bandwidth or storage limits. For more information, contact [Harness Sales](https://www.harness.io/company/contact-sales) or your account manager.

#### Storage

Harness stores data for git repositories and large file storage (LFS) in Harness-managed storage. The aggregate size of all repositories on disk must not exceed the defined storage limit. If an account exceeds the storage limit, the system will block git push operations until resolved. 

The maximum amount of data that you can store depends on the plan you are subscribed to:
* Free: 10 GB
* Paid: 250 GB

Additionally, each repository is subject to default storage limits based on your plan:
* Free: 4 GB
* Paid: 10 GB

:::info

All files stored in git are limited to 100 MB in size by default, regardless of plan. This file-size limitation can be modified per repository via the [API](https://apidocs.harness.io/tag/repository#operation/updateGeneralSettings).  

:::

#### Bandwidth

The network transfer limit applies to the data transferred from Harness Cloud to customer managed storage. The aggregate inbound and outbound network traffic must not exceed the defined bandwidth limit for the given calendar month. If an account exceeds the bandwidth limit, their network requests will be blocked and return a “429 Too Many Requests" HTTP error code.

The bandwidth limit depends on the plan you are subscribed to:
* Free: 50 GB
* Paid: 250 GB

:::warning

If we determine your bandwidth usage to be significantly excessive in relation to other users of similar features, we reserve the right to suspend your Account, throttle your file hosting, or otherwise limit your activity until you can reduce your bandwidth consumption. If you are using our free tier, we further reserve the right—after providing advance notice—to delete repositories that we determine will place undue strain on our infrastructure.

:::

For more information, contact Harness Sales or your account manager.
