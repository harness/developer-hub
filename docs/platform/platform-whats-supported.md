---
title: What's supported by Harness Platform
description: Technologies supported by Harness Platform
sidebar_label: What's supported
sidebar_position: 1
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This topic lists the supported Harness Platform features and integrations you can use for deploying and verifying your apps.

For a comprehensive list that includes all Harness modules, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).

```mdx-code-block
  <Tabs>
  
  <TabItem value="Access control" label="Access control">
```

import Accessconsup from '/docs/getting-started/shared/access-control-supported.md'

<Accessconsup />

```mdx-code-block
  </TabItem>
  <TabItem value="Accounts/Orgs/Projects/Other resources" label="Accounts Organizations Projects">
```

Harness enables you to manage access control at the following [scopes](/docs/platform/role-based-access-control/rbac-in-harness/#overview-of-the-hierarchical-setup-in-harness).

- Account
- Organization
- Project

```mdx-code-block
  </TabItem>
  <TabItem value="Delegates" label="Delegates">
```

import Delimagetypes from '/docs/platform//2_Delegates/shared/delegate-image-types-intro-table.md'

<Delimagetypes />

- [Deploy delegate on Kubernetes](/docs/platform/Delegates/install-delegates/overview)

- [Deploy delegate on Docker](/docs/platform/Delegates/install-delegates/overview)

- Install delegate minimal image without SDKs

- [Install delegate maximal image without certified SDKs](/docs/getting-started/supported-platforms-and-technologies/#sdks-installed-with-harness-delegate)


```mdx-code-block
  </TabItem>
  <TabItem value="Notifications" label="Notifications">
```

Notification methods supported for various pipeline events are: 

- Slack
- Email
- PagerDuty
- Microsoft Teams

```mdx-code-block
  </TabItem>
  <TabItem value="Secret management" label="Secret management">
```

import Secretmgmtsup from '/docs/getting-started/shared/secret-management-supported.md'

<Secretmgmtsup />


```mdx-code-block
  </TabItem>
  <TabItem value="User management" label="User management">
```

A Harness user is any individual registered with Harness with a unique email address. A User can be a part of multiple accounts. Go to the following topics to learn more about how to add and manage users.

- [Manage user groups](/docs/platform/role-based-access-control/add-user-groups)
- [Manage roles](/docs/platform/role-based-access-control/add-manage-roles)
- [Manage resource groups](/docs/platform/role-based-access-control/add-resource-groups)


```mdx-code-block
  </TabItem>
  <TabItem value="Self-Managed Enterprise Edition" label="Self-Managed Enterprise Edition">
```

import Smp from '/docs/self-managed-enterprise-edition/shared/smp-supported-platforms.md';

<Smp />

```mdx-code-block
  </TabItem>
</Tabs>
```
