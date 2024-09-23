---
sidebar_position: 2
---

# User Management

A user is either an administrator, or a regular user. User management is only accessible to administrators.

## Administrators

Administrators have full access to all users, projects and repositories in a Harness Open Source instance.

:::caution

By default, the first user to login to a Harness Open Source instance will be configured as an administrator.

This behavior can be overridden by [GITNESS_PRINCIPAL_ADMIN_PASSWORD](../installation/settings#gitness_principal_admin_password).

:::

## Users

Users can create their own projects and access existing projects where they are a [member](./project-management.md).

:::caution

By default, anyone who can access the Harness Open Source instance can create a user account.

This behavior can be overridden by [GITNESS_USER_SIGNUP_ENABLED](../installation/settings#gitness_user_signup_enabled).

:::

## Add a new user

1. Select __User Management__ from the menu on the left, then select __New User__
2. Add the required details and select __Create User__
3. Harness Open Source will automatically generate a random password, share this password with the user

## Set admin access

1. Open the __User Management__ view from the menu on the left, then locate the user in the list
2. From the [vertical ellipsis](https://en.wikipedia.org/wiki/Ellipsis) menu on the right, select __Set as admin__, then select __Confirm__

## Remove admin access

1. Open the __User Management__ view from the menu on the left, then locate the user in the list
2. From the [vertical ellipsis](https://en.wikipedia.org/wiki/Ellipsis) menu on the right, select __Remove admin__, then select __Confirm__

## Reset a user's password

1. Open the __User Management__ view from the menu on the left, then locate the user in the list
2. From the [vertical ellipsis](https://en.wikipedia.org/wiki/Ellipsis) menu on the right, select __Reset password__, then select __Confirm__
3. Harness Open Source will generate a new random password, share this password with the user

## User account settings

Users can manage their Harness Open Source profile by selecting their username from the menu on the left.

Users can also reset their password from this view.

## Generate user token

Users can interact with the Harness Open Source [API](../reference/api/overview) via authentication tokens.

1. Select your username from the menu on the left
2. Select __New token__ and give the token a name
3. Choose a number of days the token will be valid from the __Expiration__ menu, then select __Generate token__

:::caution

Tokens carry many privileges; treat your user tokens as passwords and store them securely.

:::
