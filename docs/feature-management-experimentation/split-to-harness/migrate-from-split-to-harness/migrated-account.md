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

:::warning Harness Base URL
Most users will access their migrated account at `app.harness.io`. If your account is hosted in a different Harness cluster (for example, Prod 3), your base URL may differ (for example, `app3.harness.io`). 

For a comprehensive list of Harness base URLs, see [Split and Harness](/docs/feature-management-experimentation/getting-started/split-and-harness#harness-clusters-and-base-urls).
:::

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
