---
title: Single Sign-On with LDAP
sidebar_position: 11
sidebar_label: Single Sign-On with LDAP
description: Configure single sign-on with Lightweight Directory Access Protocol (LDAP) in Harness, including Active Directory and OpenLDAP.
helpdocs_topic_id: 142gh64nux
helpdocs_category_id: fe0577j8ie
helpdocs_is_private: false
helpdocs_is_published: true
keywords:
  - LDAP
  - LDAP SSO
  - LDAP authentication
  - LDAP single sign-on
  - Active Directory SSO
  - LDAP configuration
  - LDAP directory
  - Bind DN
  - LDAP user sync
  - directory service
  - LDAP server
  - secure LDAP
  - LDAP ports
  - ldapsearch
  - LDAP query
  - Base DN
  - search filter
  - user attributes
  - group membership
  - LDAP authorization
  - Windows Active Directory
  - LDAP bind operation
tags:
  - Authentication
  - SSO
  - LDAP
  - Active Directory
  - Directory Services
---

import DocImage from '@site/src/components/DocImage';

Harness supports single sign-on (SSO) with [Lightweight Directory Access Protocol (LDAP)](https://ldap.com/) implementations, including Active Directory and OpenLDAP. When you integrate your Harness account with an LDAP directory, your LDAP users can log into Harness using their existing LDAP email addresses and passwords.

You can link a Harness user group to your LDAP directory. Harness automatically synchronizes the users and groups. After you enable LDAP SSO, Harness verifies each user's credentials against the LDAP provider at login.

---

## What will you learn in this topic?

By the end of this topic, you will be able to:
- Add an LDAP provider and configure connection settings.
- Link Harness user groups to LDAP directory groups for automatic user synchronization.
- Enable LDAP SSO method and verify user login.
- Configure sync schedules and delink user groups.

---

## Before you begin

Before you integrate your Harness account with an LDAP directory, ensure you have the following:

- **Active Harness delegate**: An active delegate for Harness to communicate with your LDAP server. Go to <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank">Delegate overview</a> to install and verify a delegate.
- **LDAP server access**: Access to your LDAP server (Active Directory or OpenLDAP) with the hostname, port, and a Bind DN (distinguished name) account that has read permissions to the directory.
- **Account administrator permissions**: Account administrator access in Harness to configure SSO providers and manage user groups. Go to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a> to review roles and permissions.

### Required ports

Confirm that the required ports are open and that the LDAP account has the necessary permissions and network access for the Harness delegate to reach your LDAP server on the required ports.

The Harness delegate connects to your LDAP server using the following ports:

| Protocol | Port |
| --- | --- |
| **HTTPS** | 443 |
| **LDAP (without SSL)** | 389 |
| **Secure LDAP (LDAPS)** | 636 |

:::info Secure LDAP traffic
By default, LDAP transmits traffic without encryption. For Windows Active Directory, you can secure LDAP traffic using SSL/TLS by installing a certificate from a Microsoft certification authority (CA) or a non-Microsoft CA.
:::

### Required permissions

Authentication with an LDAP server uses the [Bind operation](https://ldap.com/the-ldap-bind-operation/), which exchanges credentials between the LDAP client (Harness delegate) and your LDAP server. The security semantics of this operation are defined in [RFC 4513](https://www.rfc-editor.org/info/rfc4513).

When you configure Harness with LDAP, you enter a Bind DN (distinguished name) for the LDAP directory account used to authenticate. The permissions required depend on your directory service:

- **Windows Active Directory**: By default, all Active Directory users in the Authenticated Users group have read permissions to the entire Active Directory infrastructure. If you have restricted this, assign **Read MemberOf** rights on **User** objects to the account that connects Harness to Active Directory. Go to <a href="https://docs.microsoft.com/en-us/windows-server/manage/windows-admin-center/configure/user-access-control" target="_blank">Configure User Access Control and Permissions</a> to review Microsoft documentation.
- **OpenLDAP**: The default access control policy allows read access for all clients. If you have changed this default, grant the Authenticated Users entity to the account that connects Harness to OpenLDAP. Go to <a href="https://www.openldap.org/doc/admin24/access-control.html" target="_blank">Access Control</a> to review OpenLDAP documentation.

### Test LDAP connectivity

Before configuring Harness, query your LDAP directory to verify connectivity and discover the correct configuration values. This optional (but recommended) step helps you:

- Test network connectivity between the Harness delegate and your LDAP server.
- Identify Base DNs for users and groups.
- Discover attribute names (email, group membership, and display names).
- Validate search filters before entering them in Harness.
- Troubleshoot connection failures during setup.

Use one of the following tools to query your directory:  

- **Linux/Mac**: `ldapsearch` command-line tool
- **Windows**: <a href="http://www.ldapadmin.org/" target="_blank">LDAP Admin</a>, `dsquery` command-line tool, Active Directory Users and Computers, or <a href="https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-R2-and-2008/ee617195(v=technet.10)" target="_blank">Windows PowerShell</a>

**Example queries:**

- The following `ldapsearch` example queries an Active Directory LDAP directory on an AWS EC2 instance and returns LDAP Data Interchange Format (LDIF) output:

   ```bash
   ldapsearch -h example.com -p 389 -x -b "DC=example,DC=com"
   ```

      The output includes the distinguished names, object classes, and canonical names for objects in the directory.

- The same query using `dsquery` for Active Directory is:

   ```bash
   dsquery * -limit 0 >>all-objects.txt
   ```

- To query for all users using `dsquery`:

   ```bash
   dsquery * -limit 0 -filter "&(objectClass=User)(objectCategory=Person)" -attr * >>all-users.txt
   ```

---

## Set up LDAP SSO in Harness

The following diagram shows the high-level setup flow.

<DocImage path={require('./static/single-sign-on-sso-with-ldap-21.png')} width="60%" height="60%" title="Click to view full size image" />

To set up Harness SSO with LDAP, complete the following steps:

1. Add LDAP as an SSO provider in Harness. This involves connecting to your LDAP server and defining user and group queries.
2. Link a Harness user group to your LDAP directory for automatic synchronization.
3. Enable LDAP as the SSO provider in Harness.
4. Verify login using a synchronized LDAP user account.

### Step 1: Add LDAP as SSO provider

In this step, you establish a connection from the Harness delegate to your LDAP directory and define how Harness queries for users and groups.

If you experience frequent delegate timeout errors, set the LDAP response timeout to 2 minutes and set the sync interval to the default value of 1 hour.

To add your LDAP directory as a Harness SSO provider, do the following:

1. In your Harness account, go to **Account Settings** -> **Authentication**.
   
   The **Authentication** configuration page appears.

2. Select **LDAP Provider**.

   The LDAP Provider settings appear.

   <DocImage path={require('./static/single-sign-on-sso-with-ldap-22.png')} width="60%" height="60%" title="Click to view full size image" />


3. Enter a name for your LDAP provider in the **Name** field.
4. To synchronize LDAP users into linked Harness user groups, select **Enable Authorization**. Harness synchronizes LDAP users into the user group only when authorization is enabled.
5. Click **Continue**.

   The **Connection Settings** page appears.


### Step 2: Configure connection

To configure connection settings, do the following:

1. In **Host**, enter the hostname for the LDAP server. Harness uses DNS to resolve the hostname. You can also use the public IP address of the host.
2. In **Port**, enter `389` for standard LDAP. To connect over Secure LDAP (LDAPS), enter `636` and enable the **Use SSL** setting.
3. Select **Enable Referrals** if you have referrals configured for your LDAP authentication.
4. In **Max Referral Hops**, enter the number of referral hops.
5. In **Connection Timeout**, enter the timeout in milliseconds. For example, `5000` equals 5 seconds.
6. To disable nested LDAP queries and optimize group sync performance, clear the **Recursive Membership Search** checkbox. Harness then performs a flat group search instead of a nested query.
7. In **Response Time**, enter the response timeout in milliseconds. For example, `5000` equals 5 seconds.
8. In **Bind DN**, enter the distinguished name of the directory object used for the Bind operation. This is typically the administrator user object. For example:

   ```text
   cn=Administrator,CN=Users,DC=example,DC=com
   ```

   Harness uses this account for all LDAP queries.

9. In **Password**, enter the password associated with the Bind DN account.

    <DocImage path={require('./static/single-sign-on-sso-with-ldap-23.png')} width="60%" height="60%" title="Click to view full size image" />

10. Select **Test Connection**.
11. After the connection succeeds, select **Continue**.

      The **Delegates Setup** page appears.

12. Select **Only use Delegates with all of the following tags** and select the delegate that you have set up earlier.

      <DocImage path={require('./static/delegate-setup-ldap.png')} width="60%" height="60%" title="Click to view full size image" />

13. Click **Save and Continue**.

      The **User Queries (Optional)** page appears.

### Step 3: Configure a user query

The user query defines the scope within which Harness searches for users in your LDAP directory. Harness adds the matching users.

1. In the **User Queries (Optional)** page, select **New User Query**.
2. In **Base DN**, enter the relative distinguished name (RDN) for the Users object in the directory.

   If you are logged into the Active Directory server, run `dsquery user` at the command line to see a user distinguished name such as:

   ```text
   CN=John Doe,CN=Users,DC=mycompany,DC=com
   ```

   The Base DN is the portion after the user common name (CN). Typically, enter:

   ```text
   CN=Users,DC=mycompany,DC=com
   ```

   To verify that this Base DN returns the expected user attributes, run:

   ```bash
   dsquery user dc=mycompany,dc=com | dsget user -samid -fn -ln -dn
   ```

3. In **Search Filter**, enter the filter for the attribute used to find users in the Base DN. Typically, this is `(objectClass=user)` or `(objectClass=person)`.

   To verify the correct filter in `dsquery`, run:

   ```bash
   dsquery * -filter "(objectClass=user)"
   ```

4. In **Name Attribute**, enter the common name attribute for the users in your LDAP directory. Typically, this is `cn`.

   To list all attributes for a specific user, run:

   ```bash
   dsquery * "CN=users,DC=mycompany,DC=com" -filter "(samaccountname=*user_name*)" -attr *
   ```

5. In **Email Attribute**, enter the LDAP attribute that contains user email addresses. Harness uses email addresses to identify users. Typical values are `userPrincipalName` (most common), `email`, or `mail`.
6. In **Group Membership Attribute**, enter `memberOf` to return a list of all groups each user belongs to.

   To query group memberships for a specific user (for example, john.doe), run:

   ```bash
   dsquery user -samid john.doe | dsget user -memberof | dsget group -samid
   ```

7. Select **Test**.

   <DocImage path={require('./static/single-sign-on-sso-with-ldap-24.png')} width="60%" height="60%" title="Click to view full size image" />

8. After the test succeeds, select **Continue**.

      The **Group Queries (Optional)** page appears.

### Step 4: Configure a group query

The group query defines the scope within which Harness searches for user groups in your LDAP directory.

1. In **Base DN**, enter the distinguished name of the LDAP group you want to add. This group should contain the users you defined in the user query.

   To list all groups in your LDAP directory, run:

   ```bash
   dsquery group -o dn DC=mycompany,DC=com
   ```

   To verify that the group contains the expected members, run:

   ```bash
   dsget group "CN=Group_Name,CN=Users,DC=mycompany,DC=com" -members | dsget user -samid -upn -desc
   ```

   Typically, set the Base DN to the Users group for a wide search scope. For example:

   ```text
   CN=Users,DC=mycompany,DC=com
   ```

   When you search for LDAP groups later (while linking group members to Harness), the search runs within the scope of this Base DN.

2. In **Search Filter**, enter `(objectClass=group)`.
3. In **Name Attribute**, enter `cn`.
4. In **Description Attribute**, enter `description` to sync the LDAP group description.

   To view group descriptions in your LDAP directory, run:

   ```bash
   dsquery * -Filter "(objectCategory=group)" -attr sAMAccountName description
   ```

5. Select **Test**.

   <DocImage path={require('./static/single-sign-on-sso-with-ldap-25.png')} width="60%" height="60%" title="Click to view full size image" />

6. After the test succeeds, click **Continue**.

   The **LDAP User Sync Schedule** page appears. 

### Step 5: Configure an LDAP user sync schedule

The default LDAP user synchronization interval is 1 hour. You can customize this interval using a cron expression.

The page displays a tabular breakdown of the cron expression for verification. The **Cron expression** field indicates whether the expression is valid.

**Supported cron format**

The **Cron Expression** field accepts a Quartz CronTrigger string consisting of six or seven subexpressions (fields). Unix cron expressions with five subexpressions are not supported.

Sample Quartz expression:

```text
0 0 4 7 ? 2014
| | | | |  |
| | | | |  \-------- YEAR (2014)
| | | | \----------- DAY_OF_WEEK (NOT_SPECIFIED)
| | | \------------- MONTH (JULY)
| | \--------------- DAY_OF_MONTH (4th)
| \----------------- HOUR (0 - MIDNIGHT LOCAL TIME)
\------------------- MINUTE (0)
```

Go to <a href="https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm" target="_blank">Cron Expressions</a> to review the Oracle documentation on Quartz cron syntax.

1. To configure a synchronization schedule, modify the default cron expression in the **Enter a custom cron expression** field.

2. Click **Save**. Review the LDAP User Sync Schedule and click **Confirm**.

   Your new LDAP provider appears in the SSO Providers list.

      <DocImage path={require('./static/single-sign-on-sso-with-ldap-26.png')} width="60%" height="60%" title="Click to view full size image" />

### Step 6: Link a Harness user group to LDAP

After you configure the LDAP SSO provider, create a Harness user group and link it to your LDAP directory for automatic synchronization.

If you do not enable authorization now, Harness does not synchronize LDAP users into linked user groups periodically, and the manual synchronization option is unavailable. You can enable authorization later.

To link a Harness user group to LDAP, do the following:

1. In your Harness account, go to **Account Settings** -> **Access Control**.
2. Select **User Groups** -> **New User Group**.
3. Enter a name for the user group.
4. Select **Save**.

   The user group appears in the User Groups list.

5. Select your user group.
6. Select **Link to SSO Provider Group**.
7. Search for and select your LDAP provider.
8. In **LDAP Group Search Query**, search for your LDAP group.

    <DocImage path={require('./static/single-sign-on-sso-with-ldap-27.png')} width="60%" height="60%" title="Click to view full size image" />

   :::info
   LDAP group names are case-sensitive. For example, "QA", "Qa", and "qA" each create separate groups in Harness.
   :::

9. Select your LDAP group from the list.
10. Select **Save**.

    Users added to the LDAP-linked Harness user group are also added as Harness users.

      :::info note 
      Synchronization begins immediately but may take a few minutes to complete. Harness synchronizes with the LDAP server at the interval you configured. New users added to your LDAP directory appear in Harness at the next scheduled synchronization.
      :::

### Step 7: Enable LDAP SSO in Harness

After you link a user group to LDAP, enable LDAP as the SSO method in Harness.

Before you enable LDAP SSO and log out to test, confirm that your LDAP users have the passwords associated with their email addresses. If they do not, they are locked out of Harness. Active Directory stores passwords using non-reversible encryption.

To test safely, add a new user to your LDAP group, record the password, wait for the next LDAP sync interval, and then log in with that user.

Contact Harness Support at <a href="mailto:support@harness.io">support@harness.io</a> if a lockout occurs.

To enable the LDAP provider, do the following:

1. In your Harness account, go to **Account Settings** -> **Authentication**.
2. Select **Login via LDAP**.
3. In **Verify and Enable LDAP Configuration**, enter your email address and password.
4. Select **Test**.
5. After the test succeeds, select **Enable**.

After you enable LDAP SSO and users in this group log into Harness, Harness verifies their email addresses and passwords against the LDAP provider.

**Single LDAP provider limit**: After you set up and enable LDAP in Harness, you cannot add a second LDAP SSO entry. Harness disables the option to add LDAP in the UI.

**LDAP-provisioned users and SAML**: Users provisioned through LDAP are added at the account scope and receive an email invitation to log into Harness. If SAML is also configured, these users can log in through SAML. Go to <a href="/docs/platform/authentication/single-sign-on-saml/overview" target="_blank">Single sign-on (SSO) with SAML</a> to review SAML configuration.


After you enable LDAP SSO, users in the linked LDAP group can log into Harness using their LDAP credentials.

---

## Synchronize LDAP users manually

Harness provides an option to synchronize LDAP users with a Harness user group on demand. The user group must be linked to the LDAP SSO configuration before you synchronize.

To synchronize LDAP users manually, do the following:

1. In your Harness account, go to **Account Settings** -> **Authentication**.
2. In the **Login via LDAP** section, select the three-dot menu on the LDAP SSO configuration.
3. Select **Synchronize User Groups**.
4. To verify the synchronization, go to **Account Settings** -> **Access Control** -> **User Groups**.
5. Select the user group linked to the LDAP SSO configuration and confirm that the LDAP users appear in the group.

---

## Delink a user group from LDAP

To delink a Harness user group from its linked LDAP provider, do the following:

1. In your Harness account, go to **Account Settings** -> **Access Control** -> **User Groups**.
2. Select the user group you want to delink.
3. Select **Delink Group**.

   The delink confirmation dialog appears.

   <DocImage path={require('./static/single-sign-on-sso-with-ldap-28.png')} width="60%" height="60%" title="Click to view full size image" />

4. To keep the existing members in the Harness user group, select **Retain all members in the User Group**.

   If LDAP SSO is enabled, these users can still log into Harness. If LDAP SSO is disabled, they cannot log in.

5. Select **Save**.

Delinking a user group removes users from the LDAP-linked group but does not delete user accounts from Harness. These users remain in Harness with the following behavior:

- Harness continues to verify their credentials against the LDAP provider at login.
- You can add them to other Harness user groups.
- To delete a user permanently, go to **Account Settings** -> **Access Control** -> **Users** and delete the individual user account.


---

## Harness local login

To prevent lockouts, a user in the Harness Administrators group can use the [local login URL](/docs/platform/authentication/single-sign-on-saml/advanced-saml-configuration#harness-local-login) to log in and update LDAP settings.

---

## Related articles

- <a href="/docs/platform/authentication/authentication-overview" target="_blank">Authentication overview</a> - Review all supported authentication methods in Harness.
- <a href="/docs/platform/authentication/single-sign-on-saml/overview" target="_blank">Single sign-on (SSO) with SAML</a> - Configure SAML-based SSO for different identity providers such as Okta, Microsoft Entra ID, Keycloak, and OneLogin.
- <a href="/docs/platform/authentication/single-sign-on-sso-with-oauth" target="_blank">Single sign-on (SSO) with OAuth</a> - Configure OAuth-based SSO with supported providers.
- <a href="/docs/platform/authentication/two-factor-authentication" target="_blank">Two-factor authentication</a> - Add an extra layer of security for user logins.