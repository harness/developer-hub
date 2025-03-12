---
title: ServiceNow Configuration
sidebar_label: ServiceNow Configuration
sidebar_position: 1
description: Learn how to connect ServiceNow to Harness Incident Response.
---

# ServiceNow Configuration

Harness integrates with ServiceNow through a **ServiceNow Connector**, allowing you to automate ServiceNow approvals and streamline incident response workflows.

## Prerequisites

Before setting up the integration, ensure the following:

- Your ServiceNow account should ideally have the `admin` role. If this is not possible, it must have at least the `itil_admin` or `itil` role to create and modify tickets.
<!--- Your account should also have the `import_admin` or `import_transformer` role to manage import set transform maps. See [ServiceNow Base System Roles](https://docs.servicenow.com/bundle/newyork-platform-administration/page/administer/roles/reference/r_BaseSystemRoles.html) for details. -->
- Your ServiceNow REST API account must have permissions to view tickets.

---

## Add a ServiceNow Connector

This guide assumes you already have a **Harness Project** set up. If not, see [Create Organizations and Projects](../../organizations-and-projects/create-an-organization.md).

The connector can be added from **Project Setup**, **Organization Settings**, or **Account Resources**.

### Steps to Add a Connector

1. In **Project Setup**, navigate to **Connectors**.
2. Click **New Connector**, then select **ServiceNow**.
3. Enter a **Name** for the connector. Optionally, modify the **ID** (or leave it as the default).
4. Provide a **Description** and add **Tags** if needed.
5. Click **Continue**.

---

## Configure the ServiceNow Connector

### 1. Define Connection Details

- **ServiceNow URL** – Enter the base ServiceNow URL (e.g., `https://example.service-now.com`).
- **Authentication Method** – Choose one of the following:
  - **Username & Password**
  - **ADFS Client Credentials with Certificate**
  - **OIDC Refresh Token**

### 2. Authentication Methods

#### **Option 1: Username & Password**
1. Enter your **ServiceNow Username**.
2. Provide the **Password/API Key**. If using an API Key, store it as a [Harness Text Secret](/docs/platform/secrets/add-use-text-secrets).
3. Click **Continue**.

#### **Option 2: ADFS Client Credentials with Certificate**

:::note
- Harness supports **RSA private keys (PKCS8 format)** and **X509 certificates**.
- ServiceNow permissions depend on the configuration of the client application group.
- More details: [AD FS OpenID Connect/OAuth Flows](https://learn.microsoft.com/en-us/windows-server/identity/ad-fs/overview/ad-fs-openid-connect-oauth-flows-scenarios#second-case-access-token-request-with-a-certificate-1).
:::

1. Select or create a **Resource ID Secret** (ServiceNow’s identifier in ADFS).
2. Select or create a **Client ID Secret** (Application ID assigned by AD FS).
3. Upload an **X509 Certificate** for JWT signing.
4. Select or create a **Private Key Secret** (RSA key matching the certificate).
5. Enter the **ADFS URL**.

#### **Option 3: OIDC Refresh Token**

:::note
This feature requires Harness Delegate 799xx or higher.
:::

Harness supports **persistent refresh tokens** for authentication via OpenID Connect (OIDC) using the `refresh_token` grant type. More details: [Refreshing Access Tokens](https://www.oauth.com/oauth2-servers/access-tokens/refreshing-access-tokens/).

1. Select or create a **Client ID Secret** assigned by OIDC.
2. (Optional) Select or create a **Client Secret**.
3. Create a secret for the **Refresh Token**.
4. Enter the **Token URL**, such as:
   - ServiceNow authentication server: `https://<YOUR_DOMAIN>.service-now.com/oauth_token.do`
   - Okta authentication server: `https://<YOUR_DOMAIN>.okta.com/oauth2/v1/token`
5. (Optional) Enter the **Scope** if required by your authentication server.

---

## Set Up Delegates

Select the **Harness Delegate(s)** to use when making a connection to ServiceNow using this connector.

Click **Save and Continue**.

Harness will test the connection.

<!-- Uncomment and update when image is available -->
<!-- ![ServiceNow Connection Test](../../connectors/static/connect-to-service-now-44.png) -->

Click **Finish**.

The ServiceNow connector will now appear in **Connectors**.