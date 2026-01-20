Authentication is the process of verifying a user’s identity before granting access to an account. In Harness, administrators can configure authentication settings to control how users sign in and manage access to the organization’s account. 

For additional details, refer to the [Authentication Overview](/docs/platform/authentication/authentication-overview).


| SSO Type                                                                    | SSO Providers      | Authentication Supported | Authorization Supported (Group Linking) | SCIM Provisioning |
|-----------------------------------------------------------------------------|--------------------|--------------------------|-----------------------------------------|-------------------|
| [SAML 2.0](/docs/platform/authentication/single-sign-on-saml.md)            | Okta               | Yes                      | Yes                                     | Yes               |
|                                                                             | Microsoft Entra ID | Yes                      | Yes                                     | Yes               |
|                                                                             | Others             | Yes                      | Yes                                     | No                |
|                                                                             | OneLogin           | Yes                      | Yes                                     | Yes               |
| [OAuth 2.0](/docs/platform/authentication/single-sign-on-sso-with-oauth.md) | Github             | Yes                      | No                                      | N/A               |
|                                                                             | GitLab             | Yes                      | No                                      | N/A               |
|                                                                             | Bitbucket          | Yes                      | No                                      | N/A               |
|                                                                             | Google             | Yes                      | No                                      | N/A               |
|                                                                             | Azure              | Yes                      | No                                      | N/A               |
|                                                                             | LinkedIn           | Yes                      | No                                      | N/A               |
| LDAP (Delegate connectivity needed)                                         | Active Directory   | Coming soon              | Coming soon                             | N/A               |
|                                                                             | Open LDAP          | Coming soon              | Coming soon                             | N/A               |
|                                                                             | Oracle LDAP        | Coming soon              | Coming soon                             | N/A               |
