#### Issuer URL
The Issuer Format will need to be modified depending on the environment cluster in which your account resides.  In `Account Settings` -> `Account Details`, you can see the Harness Cluster that your account resides in.

The Issuer URL format should follow `https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>`.

The hostname should be as follows, (even if a VanityURL is setup for an account).

| Cluster      | HostName               |
|--------------|------------------------|
| Prod1/Prod2  | app.harness.io         |
| Prod3        | app3.harness.io        |
| Prod0/Prod4  | accounts.harness.io    |
| EU clusters  | accounts.eu.harness.io |

You can also test connectivity to the Issuer URI by running a cURL to the URI
```
curl https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>/.well-known/openid-configuration
```

Which should return valid information from the endpoint such as:
```
{"issuer":"https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>","jwks_uri":"https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>/.wellknown/jwks","subject_types_supported":["public","pairwise"],"response_types_supported":["id_token"],"claims_supported":["sub","aud","exp","iat","iss","account_id"],"id_token_signing_alg_values_supported":["RS256"],"scopes_supported":["openid"]}%
```
