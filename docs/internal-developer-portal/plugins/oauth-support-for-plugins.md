---
title: OAuth support for plugins
sidebar_label: OAuth support for plugin
description: Some plugins in IDP use OAuth to authenticate the logged in user against the plugin provider.
sidebar_position: 30
---

Some plugins and other parts of IDP do not use a fixed API key to communicate to providers like GitHub or Google. These plugins require the user to login using their GitHub/Google accounts and use the user's credentials to fetch data. This is the recommended approach for building Backstage plugins because

1. Access Control is taken care of as the plugin makes requests on behalf of the user, rather than a general-purpose service account.
2. Rate limiting is avoided - using a single token to authenticate all IDP users quickly results in hitting the API rate limit set by the provider.
3. By federating access, there is no need to create one general purpose service account with access to all the systems. This is a safer security practice.

In order to facilitate the OAuth login support for GitHub or Google based plugins, you as a platform engineer, can create GitHub or Google OAuth apps and configure it within IDP.

Navigate to **Admin** -> **OAuth Configurations** page in the IDP module. On this page, you will be able to find clear instructions on how to create either a GitHub OAuth app or a Google OAuth app. After creating the app and setting the client ID and client secret in IDP, plugins depending on OAuth, for example, [GitHub Actions](./list-of-plugins/github-actions.md) will open a **Login to GitHub** popup for the user, when they visit the catalog page with the plugin enabled.

![](./static/oauth%20configurations%20page.png)
