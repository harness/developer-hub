To prevent lockouts or in the event of OAuth downtime, a user that has Account Admin assigned on All Account Level Resources or All Resources Including Child Scopes can use the Local Login URL `https://app.harness.io/auth/#/local-login` to log in and update the OAuth settings. _The user must have this access assigned directly on their Harness user, not via a group assignment._

import Local from '/docs/platform/shared/local-login-note.md'

<Local />

For the Harness production cluster prod-3, the local login URL is `https://app3.harness.io/auth/#/local-login`.

1. Sign in using **Harness Local Login**.

   ![](./static/single-sign-on-saml-118.png)

2. Change the settings to enable users to log in.

:::info note
You can disable Local Login using the feature flag `DISABLE_LOCAL_LOGIN`. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.
:::