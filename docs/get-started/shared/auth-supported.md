The following table lists the supported Authentication features and various ways to authenticate users. Users in Administrator groups can use Authentication Settings to restrict access to an organization's Harness account. The options you choose will apply to all of your account's users.

For more information, go to [Authentication overview](/docs/platform/authentication/authentication-overview).

| SSO Type                                                                     | SSO Providers          | Authentication Supported | Authorization (Group Linking) Supported | SCIM Provisioning |
| ---------------------------------------------------------------------------- | ---------------------- | ------------------------ | --------------------------------------- | ----------------- |
| [SAML 2.0](/docs/platform/authentication/single-sign-on-saml.md)            | Okta                   | Yes                      | Yes                                     | Yes               |
|                                                                              | Azure Active Directory | Yes                      | Yes                                     | Yes               |
|                                                                              | Others                 | Yes                      | Yes                                     | No                |
|                                                                              | OneLogin               | Yes                      | Yes                                     | Yes               |
| [OAuth 2.0](/docs/platform/authentication/single-sign-on-sso-with-oauth.md) | Github                 | Yes                      | No                                      | N/A               |
|                                                                              | GitLab                 | Yes                      | No                                      | N/A               |
|                                                                              | Bitbucket              | Yes                      | No                                      | N/A               |
|                                                                              | Google                 | Yes                      | No                                      | N/A               |
|                                                                              | Azure                  | Yes                      | No                                      | N/A               |
|                                                                              | LinkedIn               | Yes                      | No                                      | N/A               |
| LDAP (Delegate connectivity needed)                                          | Active Directory       | Coming soon              | Coming soon                             | N/A               |
|                                                                              | Open LDAP              | Coming soon              | Coming soon                             | N/A               |
|                                                                              | Oracle LDAP            | Coming soon              | Coming soon                             | N/A               |