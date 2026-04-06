---
title: Account Migrated to Harness
description: Learn about next steps once your Split account has been migrated to Harness.
sidebar_label: Account Migrated to Harness
slug: /feature-management-experimentation/split-to-harness/migrated-account
sidebar_position: 3
---

## Overview

If you see the following message when attempting to log in to Split, your account has been migrated to Harness, and you need to access it from there going forward:

<img src={require('./static/account-migrated.png').default} alt="Account Migrated to Harness" width="500" />

The migration keeps your familiar workflows intact. Non-admin users will work as they did in Split, while administrators will notice a few changes as settings move into Harness platform features.

<details>
<summary>Migrated Split Account?</summary>

When a Split account is migrated to Harness FME, the structure of your [Harness organizations](/docs/feature-management-experimentation/split-to-harness/administering-migrated-account#harness-organizations-and-environments), [projects](/docs/feature-management-experimentation/split-to-harness/administering-migrated-account#projects), and [resource groups](/docs/feature-management-experimentation/split-to-harness/administering-migrated-account#user-groups) depend on whether your account is on the **Free** or **Enterprise Plan** at the time of the migration.

| Plan | Organization created | Project location | Resource group |
|------|----------------------|------------------|----------------|
| **Free** | Default Harness organization | Default organization | `All Project Level Resources` |
| **Enterprise** | `<legacy Split account name> FME` | Dedicated FME organization | `FME All Resources` |

- On the **Free plan**, legacy Split projects are recreated as Harness projects in the default Harness organization.
- On the **Enterprise plan**, a Harness organization named **`<legacy Split account name> FME`** is created, and legacy Split projects are recreated as Harness projects within this organization.

In both cases, each Harness project created by the migration script links to its corresponding legacy Split (FME) project.

Access and permissions are controlled using [Harness RBAC](/docs/feature-management-experimentation/permissions/rbac) and authentication (such as SSO or 2FA) is configured at the [platform level](/docs/platform/authentication/authentication-overview#configure-authentication). [Permissions](/docs/feature-management-experimentation/permissions) granted to users and user groups depend on their associations with resources and resource groups, which are controlled at the account, organization, and project level in Harness.  

</details>

<details>
<summary>Harness clusters and base URLs</summary>

When your account is [migrated from Split to Harness](/docs/feature-management-experimentation/split-to-harness/migrated-account), you will access **Feature Management & Experimentation (FME)** through the Harness platform. Most migrated accounts use `app.harness.io`, but some customers (depending on their cluster) will use a different base URL.

To identify which Harness cluster your account is in, navigate to **Account Settings** and select **Account Details**. 

![](./static/harness-cluster.png)

Your Harness base URL depends on which cluster your account is hosted in. 

| Cluster       | Base URL                 |
| ------------- | ------------------------ |
| Prod1         | `app.harness.io`         |
| Prod2         | `app.harness.io`         |
| Prod3         | `app3.harness.io`        |
| Prod0 / Prod4 | `accounts.harness.io`    |
| EU clusters   | `accounts.eu.harness.io` |

</details>

## Next Steps

### To log in with user/password

1. Go to `app.harness.io`.
1. Attempt to log in with your Split login and a random password.
1. After the login fails, click **Forgot password?**.
1. Enter your Split login email and click **Reset password**.
1. Find the email in your inbox with the subject, “Reset your Harness Platform password”.
1. Click the **Reset Password** button in the email and set your password in the page that appears.
1. Log in to `app.harness.io` with your new password.

### To log in with a single sign-on (SSO) tile

If your administrator has configured SSO for Harness, and you usually click a tile in your portal, look for a new tile named "Harness" or similar and click that.

### To log in with single sign-on (SSO) from the Harness login screen

If your administrator has configured SSO for Harness, and you usually go to `app.split.io` and then log in via SSO, you can now do the same on `app.harness.io`.

## Questions?

If you want to learn more about the migration, have a look at the [Split to Harness Migration Overview](/docs/feature-management-experimentation/split-to-harness).

If you have questions not answered there, or need help accessing your account, drop us a line at support@split.io.
