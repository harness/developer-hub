To prevent lockouts or in the event of OAuth downtime, you can use the local login URL `https://app.harness.io/auth/#/local-login` to sign in to your default account and update the OAuth settings. 

You can use the local login URL only if you have the admin role assigned on **All Account Level Resources** or **All Resources Including Child Scopes**.

import Local from '/docs/platform/shared/local-login-note.md'

<Local />

For example, for the Harness production cluster `prod-3`, the local login URL is `https://app3.harness.io/auth/#/local-login`. Once you login, you can change the settings to enable users to log in.

### Disable local login
To disable Local login, use the `DISABLE_LOCAL_LOGIN` feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature flag.