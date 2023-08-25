The following table lists Harness support for SSO protocols and tools.

Go to [Add and Manage Access Control](/docs/feature-flags/ff-onboarding/ff-security-compliance/manage-access-control.md).

| SSO Type                                                                     | SSO Providers          | Authentication Supported | Authorization (Group Linking) Supported | SCIM Provisioning |
| ---------------------------------------------------------------------------- | ---------------------- | ------------------------ | --------------------------------------- | ----------------- |
| [SAML 2.0](/docs/platform/3_Authentication/3-single-sign-on-saml.md)            | Okta                   | Yes                      | Yes                                     | Yes               |
|                                                                              | Azure Active Directory | Yes                      | Yes                                     | Yes               |
|                                                                              | Others                 | Yes                      | Yes                                     | No                |
|                                                                              | OneLogin               | Yes                      | Yes                                     | Yes               |
| [OAuth 2.0](/docs/platform/3_Authentication/4-single-sign-on-sso-with-oauth.md) | Github                 | Yes                      | No                                      | N/A               |
|                                                                              | GitLab                 | Yes                      | No                                      | N/A               |
|                                                                              | Bitbucket              | Yes                      | No                                      | N/A               |
|                                                                              | Google                 | Yes                      | No                                      | N/A               |
|                                                                              | Azure                  | Yes                      | No                                      | N/A               |
|                                                                              | LinkedIn               | Yes                      | No                                      | N/A               |
| LDAP (Delegate connectivity needed)                                          | Active Directory       | Coming soon              | Coming soon                             | N/A               |
|                                                                              | Open LDAP              | Coming soon              | Coming soon                             | N/A               |
|                                                                              | Oracle LDAP            | Coming soon              | Coming soon                             | N/A               |