# Microsoft Entra ID SAML SSO for Harness: End-to-End Setup, Validation, and Troubleshooting

## Overview

This guide expands on the standard Harness and Microsoft documentation for customers who want a practical, end-to-end walkthrough for setting up SAML single sign-on (SSO) between Harness and Microsoft Entra ID.

The goal is to cover:

- the **happy path** for a clean deployment
- the **exact values** customers usually need to exchange between Harness and Entra
- the most common **misconfigurations and troubleshooting checks**
- when to use **manual user creation**, **JIT provisioning**, or **SCIM provisioning**

This article is intended for administrators who may not already be familiar with SAML terminology or Microsoft Entra enterprise application behavior.

---

## Before you start

You will typically need:

- A **Harness Account Admin** (or equivalent access to Authentication settings)
- A Microsoft Entra administrator with one of the roles typically used for enterprise app setup, such as:
  - **Cloud Application Administrator**
  - **Application Administrator**
  - **Application Owner**
- A test user that exists in Microsoft Entra ID
- At least one emergency/admin user with the right Harness permissions for **Local Login**
- A plan for how users will exist in Harness:
  - **manually invited users**, or
  - **JIT provisioning**, or
  - **SCIM provisioning**

### Important behavior to understand first

#### Keep Harness Local Login available as a safety net

Before enabling SAML for production use, make sure you have validated **Harness Local Login** access for at least one admin user.

Why this matters:

- it helps prevent an admin lockout during rollout
- it gives you a recovery path if SAML settings are incorrect
- it lets you sign in and roll back or correct authentication settings if users become blocked

Typical Local Login URL for Harness SaaS:

`https://app.harness.io/auth/#/local-login`

For prod-3, Harness documents:

`https://app3.harness.io/auth/#/local-login`

### Important notes for Local Login

- Harness says Local Login signs the user into their **default account**
- if the user belongs to multiple Harness accounts, the **default account must be correct** before using Local Login
- the required admin access should be assigned **directly to the user**, not only through a group assignment
- Local Login can be disabled with the `DISABLE_LOCAL_LOGIN` feature flag

### Recommended prerequisite

Before changing SAML settings, test that your designated fallback admin can successfully access Local Login and reach the Authentication settings page.

1. **SAML authentication alone does not automatically create users in Harness by default.**  
   If you only configure SAML, users usually still need to exist in Harness first unless you also enable JIT or SCIM.

2. **The user identity must match between Entra and Harness.**  
   In practice, this usually means the email address sent by Entra must match the Harness user email.

3. **User assignment matters in Entra.**  
   Even if SAML is configured correctly, users who are not assigned to the Enterprise Application may not be able to launch the app.

4. **The default Harness Entity ID is often `app.harness.io`, but some environments use a custom value.**  
   If the customer has multiple SAML apps in the same Entra tenant, it is often better to use a unique custom Entity ID.

---

## Recommended deployment approach

For the smoothest rollout:

1. Configure SAML with **one test user first**
2. Validate **SP-initiated login**
3. Validate **IdP-initiated login** if the customer wants it
4. Decide whether users will be:
   - invited manually,
   - provisioned with JIT, or
   - provisioned with SCIM
5. Expand assignment to broader user/group scope only after the test user works

---

## How the integration works at a high level

In this integration:

- **Harness** acts as the Service Provider (SP)
- **Microsoft Entra ID** acts as the Identity Provider (IdP)
- Harness provides:
  - an **ACS / SAML Endpoint URL**
  - an **Entity ID**
- Entra provides:
  - a **Federation Metadata XML** file
  - the **SAML assertion** containing the user identity and optional claims

Harness validates the SAML response using the metadata from Entra, then maps the incoming identity to a Harness user.

---

## Happy path: step-by-step setup

## Step 1: Prepare the values from Harness

In Harness:

1. Go to **Account Settings**.
2. Open **Authentication**.
3. Choose **SAML Provider**.
4. Start adding a new SAML provider.
5. Select **Microsoft Entra ID / Azure** if presented in the UI.
6. Keep this page open.

From this screen, copy or note the values Harness gives you:

- **SAML Endpoint URL / ACS URL**
- **Entity ID**
  - default is often `app.harness.io`
  - use a **custom Entity ID** if you need a unique identifier in Entra

### When to use a custom Entity ID

Use a custom Entity ID when:

- the tenant already has another Harness enterprise app
- the customer has multiple Harness environments
- the customer wants stronger separation between environments

Whatever Entity ID you use in Entra must match what you configure in Harness.

---

## Step 2: In Microsoft Entra ID, create the Enterprise Application

In Microsoft Entra admin center:

1. Go to **Enterprise applications**.
2. Select **New application**.
3. Search the gallery for **Harness**.
4. Add the application.
5. Open the newly created Enterprise Application.
6. Go to **Single sign-on**.
7. Select **SAML**.

### Note about the gallery app

Microsoft documents that the Harness gallery integration uses a fixed application identifier pattern and notes that only one instance can be configured in one tenant in the standard gallery-based scenario. If the customer needs more than one Harness SAML configuration in the same tenant, plan the Entity ID carefully and validate whether a custom setup is required.

---

## Step 3: Configure Basic SAML Configuration in Entra

In **Basic SAML Configuration**, configure the following:

### Identifier (Entity ID)

Use the **Harness Entity ID**.

Examples:

- `app.harness.io` for a standard SaaS setup
- a **custom Entity ID** if the customer configured one in Harness

### Reply URL (ACS URL)

Use the **Harness SAML Endpoint / ACS URL** copied from Harness.

Typical pattern:

`https://app.harness.io/gateway/api/users/saml-login?accountId=<HARNESS_ACCOUNT_ID>`

The actual value should always be copied from Harness whenever possible.

### Sign-on URL

This is commonly used for **SP-initiated login**.

Typical value:

`https://app.harness.io/`

For self-managed or custom-domain environments, use the customer’s actual Harness base URL.

### Practical guidance

- **Reply URL** is the most critical value
- **Identifier** must match exactly between Entra and Harness
- **Sign-on URL** is commonly added even if the customer mainly uses IdP-initiated login

---

## Step 4: Configure User Attributes & Claims in Entra

This is one of the most common areas where deployments fail.

In **User Attributes & Claims**:

- Make sure **NameID** is mapped to a value Harness can match to the user
- In most environments, the safest choice is the user’s **email address**

### Recommended setup

Use a NameID that resolves to the same email value used by the Harness user account.

Common examples:

- `user.mail`
- `user.userprincipalname` when the UPN is the same as the user’s actual email address

### Important caveat

Many customers assume `userprincipalname` is always the same as email. That is not always true.

Examples of where this causes problems:

- UPN is `jsmith@corp.local`, but email is `john.smith@company.com`
- guest/B2B users have unexpected identity formats
- synced on-prem users have legacy UPN values

### Best practice

If the Harness user email is `john.smith@company.com`, the SAML identity coming from Entra should resolve to that same value.

---

## Step 5: Download the Federation Metadata XML from Entra

Still in the SAML setup page in Entra:

1. Go to **SAML Signing Certificate**
2. Download **Federation Metadata XML**

This metadata file contains the signing certificate and IdP configuration that Harness uses to validate SAML responses.

---

## Step 6: Upload Entra metadata into Harness

Return to the Harness SAML provider configuration:

1. Upload the **Federation Metadata XML** downloaded from Entra
2. Enter a display name for the provider if needed
3. If required, add the **custom Entity ID** so it matches Entra
4. Save / submit the provider

At this point, Harness has the metadata needed to trust SAML assertions coming from Entra.

---

## Step 7: Assign users or groups in Entra

In the Entra Enterprise Application:

1. Go to **Users and groups**
2. Assign the test user first
3. Assign groups later after validation

### Why this matters

A common failure pattern is:

- SAML configuration is correct
- the user exists in Harness
- but the user was never assigned to the Enterprise Application in Entra

Result: sign-in may fail or the app may not appear where expected.

---

## Step 8: Make sure the user exists in Harness

Choose one model:

### Option A: Manual invitation

Invite the user into Harness using the same email address that Entra will send in the SAML assertion.

### Option B: JIT provisioning

Enable **JIT provisioning** in Harness if you want users to be created when they first log in, based on a validation claim/value in the SAML assertion.

### Option C: SCIM provisioning

Use **SCIM** if the customer wants lifecycle management from Entra to Harness, including provisioning and deprovisioning behavior.

---

## Step 9: Test login

### Recommended test order

1. Use a fresh browser session or incognito window
2. Test with one assigned user
3. Start with **SP-initiated** login from Harness
4. Then test **IdP-initiated** login from Entra/My Apps if needed

### SP-initiated flow

The user starts from the Harness login page.

### IdP-initiated flow

The user starts from Entra / My Apps / the Enterprise App tile.

### Why incognito matters

Existing Microsoft sessions can mask issues and make it look like SSO is working differently than it really is.

---

## Common scenarios and troubleshooting

## Scenario 1: User gets redirected but cannot sign in to Harness

### Common causes

- The SAML assertion identity does not match the Harness user email
- The user does not exist in Harness and JIT/SCIM is not enabled
- The user is not assigned to the Enterprise Application in Entra

### What to check

- Compare the Harness user email with the NameID/email claim coming from Entra
- Confirm the user is assigned in Entra
- Confirm the user exists in Harness or that JIT/SCIM is configured

---

## Scenario 2: NameID is set to UPN, but login still fails

### Common cause

The Entra `userprincipalname` is not the same as the actual email address used in Harness.

### Fix

Change the NameID source to a value that matches the Harness email, often `user.mail`, or align the Harness user identity with the actual emitted value.

---

## Scenario 3: Customer has multiple Harness environments or multiple SAML apps in the same Entra tenant

### Common cause

The default Entity ID (`app.harness.io`) creates ambiguity or conflicts.

### Fix

Use a **custom Entity ID** in Harness and configure that same exact value in Entra.

### Extra validation

Make sure the Reply URL also points to the correct Harness account/environment.

---

## Scenario 4: IdP-initiated login does not work, but SP-initiated does

### Common causes

- Sign-on URL is missing or not aligned with the customer environment
- The customer expects My Apps launch behavior that was never configured or tested
- The Enterprise App assignment is incomplete

### What to check

- Verify Sign-on URL in Entra
- Verify the user assignment to the application
- Test from Microsoft My Apps with a clean session

---

## Scenario 5: SP-initiated login does not work, but IdP-initiated does

### Common causes

- Harness Reply URL / ACS is correct, but Sign-on URL or application launch path is wrong
- The wrong Harness environment or account is being used
- Browser session/cached login is masking path issues

### What to check

- Start from the correct Harness login URL
- Validate the ACS / Reply URL in Entra matches the Harness account exactly
- Retest in incognito

---

## Scenario 6: Users can log in, but not all expected permissions/groups show up

There are two separate concepts to distinguish:

- **authentication**: user can sign in
- **authorization/group mapping**: user permissions/groups are mapped into Harness

If the customer expects group-driven access, verify whether they are using:

- manual Harness groups
- SAML authorization/group claims
- SCIM group provisioning

### Special Entra limitation

Microsoft Entra limits SAML group emission to **150 groups** in a SAML assertion. If a user belongs to more than 150 groups, Entra can omit the actual groups and send a Graph reference instead.

### Why that matters for Harness

If the customer depends on SAML group claims for authorization, users with large group memberships may not have groups delivered in the token as expected.

### Possible path forward

If the customer uses group-based authorization and some users belong to many groups, evaluate whether they need the additional client credentials flow described in Harness documentation for retrieving group information.

---

## Scenario 7: Test user works, but broader rollout fails

### Common causes

- Only the test user was assigned to the app
- group assignment was added, but the group is not the one users actually inherit access from
- some users have different UPN/email formats
- conditional access or MFA policies apply differently to other users

### What to check

- confirm assignment scope in Entra
- compare a working user and a failing user
- compare emitted claims for both users
- confirm whether guest users or synced users behave differently

---

## Scenario 8: Customer wants users created automatically

### Choose the right model

#### Manual invite

Best when:

- only a few users need access
- the customer wants explicit access control in Harness

#### JIT provisioning

Best when:

- users should be created automatically on first login
- the customer can reliably send a validation claim/value in SAML

#### SCIM provisioning

Best when:

- the customer wants centralized lifecycle management from Entra
- create/update/disable behavior should follow Entra assignment state
- group provisioning is also required

---

## JIT provisioning guidance

Harness requires SAML SSO first, then JIT can be enabled. JIT uses a **validation key/value pair** in the SAML assertion to decide whether a first-time user should be created.

### Practical tip

If JIT is enabled but users are still not being created:

- inspect whether the required claim is actually present in the SAML assertion
- check whether the claim name and value match exactly what Harness expects
- confirm the user is still otherwise allowed to access the Enterprise App

---

## SCIM provisioning guidance

Use SCIM when the customer wants a more complete identity lifecycle approach.

Typical Entra SCIM setup for Harness uses:

- Tenant URL patterned as:  
  `https://app.harness.io/gateway/api/scim/account/<HARNESS_ACCOUNT_ID>`
- a Harness API key / token for the SCIM secret

### Important SCIM notes
- Start with one test user
- Use **Test Connection** in Entra before enabling provisioning
- Review **attribute mappings** carefully
- In Entra, users with **Default Access** can be excluded from provisioning depending on the configuration in Microsoft’s tutorial

---

## Common validation checklist

Use this checklist when troubleshooting:

### Harness side
- SAML provider exists and is enabled
- correct metadata XML uploaded
- correct Entity ID configured
- correct account/environment used
- user exists in Harness, or JIT/SCIM is enabled

### Entra side
- Enterprise Application is the correct one
- SAML is the selected SSO method
- Identifier matches Harness Entity ID
- Reply URL matches Harness ACS URL exactly
- Sign-on URL is set as expected
- NameID resolves to the correct email/identity
- user is assigned to the Enterprise Application
- metadata/certificate is current

### User side
- test in incognito
- verify the exact user email in Harness
- verify whether user is guest/B2B/synced/on-prem/hybrid
- verify whether group membership is unusually large

---

## Recommended evidence to collect during troubleshooting

If login still fails, collect:
- screenshot of **Basic SAML Configuration** in Entra
- screenshot of **User Attributes & Claims** in Entra
- confirmation of the exact **Harness user email**
- whether the user was **manually invited**, **JIT-provisioned**, or **SCIM-provisioned**
- whether the user is **assigned** to the Enterprise Application
- whether failure occurs in **SP-initiated**, **IdP-initiated**, or both
- a **HAR file** or browser network trace if the customer is comfortable providing it
- SAML tracing output from a browser extension if deeper claim inspection is needed

---

## Suggested rollout plan for customers

1. Configure SAML for one test user
2. Validate email/NameID matching
3. Test SP-initiated flow
4. Test IdP-initiated flow if required
5. Decide between manual invite, JIT, or SCIM
6. Roll out to a small pilot group
7. Expand to broader user/group assignment

---

## Key takeaways

- The most common root cause is **identity mismatch** between the SAML assertion and the Harness user email
- The second most common root cause is **missing user assignment** in the Entra Enterprise Application
- For customers who want automatic lifecycle management, **SCIM** is usually the best long-term model
- For customers with many groups, be aware of the **150-group SAML limit** in Entra
- Use a **custom Entity ID** when the customer has multiple Harness/SAML integrations in the same tenant

---

## Reference links

- [Harness SAML SSO documentation ](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/)
- [Harness JIT provisioning documentation](https://developer.harness.io/docs/platform/role-based-access-control/provision-use-jit/)
- [Harness Local Login documentation](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#harness-local-login)
- [Microsoft Entra tutorial for Harness SSO](https://developer.harness.io/docs/platform/authentication/single-sign-on-saml/#saml-sso-with-microsoft-entra-id)
- [Microsoft Entra tutorial for Harness provisioning](https://developer.harness.io/docs/platform/role-based-access-control/provision-users-and-groups-using-azure-ad-scim/)
