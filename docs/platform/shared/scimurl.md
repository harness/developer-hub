    The base URL format will follow the following base format:
    `https://app.harness.io/gateway/api/users/saml-login?accountId=[YOUR_ACCOUNT_ID]`, (e.g `https://app.harness.io/gateway/api/users/saml-login?accountId=9999aaaa9999AA`)

    However, this will need to be modified depending on which cluster your account exists within.  You can verify this by going to your Account Settings -> Account Details, in the Harness Cluster Field.

    | Cluster      | URL Format                                                                              |
    |--------------|-----------------------------------------------------------------------------------------|
    | Prod1        | https://app.harness.io/gateway/api/users/saml-login?accountId=[YOUR_ACCOUNT_ID]         |
    | Prod2        | https://app.harness.io/gateway/gratis/api/users/saml-login?accountId=[YOUR_ACCOUNT_ID]  |
    | Prod3        | https://app3.harness.io/gateway/api/users/saml-login?accountId=[YOUR_ACCOUNT_ID]        |
    | Prod0/Prod4  | https://accounts.harness.io/gateway/api/users/saml-login?accountId=[YOUR_ACCOUNT_ID]    |
    | EU clusters  | https://accounts.eu.harness.io/gateway/api/users/saml-login?accountId=[YOUR_ACCOUNT_ID] |

    Please note that if customers select the incorrect cluster, the changes will not show up within their environment, even if there is a successful response from Harness.  

    If you environment is On-Prem (SMP) the URL will use your custom domain name and omits `gateway`. 
    For example, if your On-Prem domain name is `harness.mycompany.com`, then your SCIM base URL would become `https://harness.mycompany.com/ng/api/scim/account/[YOUR_ACCOUNT_ID]`.