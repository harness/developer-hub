To prevent lockouts or in the event of OAuth downtime, a user that has Account Admin assigned on All Account Level Resources or All Resources Including Child Scopes can use the Local login URL `https://app.harness.io/auth/#/local-login` to sign in and update the OAuth settings.

:::important
The user must have this access assigned directly on their Harness user, not via a group assignment.

:::

import Local from '/docs/platform/shared/local-login-note.md'

<Local />

For the Harness production cluster prod-3, the local login URL is `https://app3.harness.io/auth/#/local-login`.

1. Sign in using **Local login**.

   ![](./static/single-sign-on-saml-118.png)

2. Change the settings to enable users to log in.

:::info note
You can disable Local login using the feature flag `DISABLE_LOCAL_LOGIN`. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.
:::