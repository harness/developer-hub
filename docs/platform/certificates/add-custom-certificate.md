---
title: Add a custom certificate to Harness Platform
description: This topic explains how to add your own signed custom certificate.
sidebar_position: 1
sidebar_label: Add a custom certificate
---
:::note
Currently, this feature is behind the feature flag `PL_CENTRAL_CERTIFICATES_MANAGEMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

The Custom Certificate feature offers a robust solution for managing the lifecycle of certificates at all hierarchical levels within Harness, including accounts, organizations, and projects. This feature is designed to bolster security measures and simplify the process of digital certificate management across the Harness platform.

## Key features

- **Scope Availability**: Enables the creation and management of certificates at all hierarchical levels within Harness, including account, organization, and project scopes.
- **Lifecycle Management**: Provides complete certificate management functionality, including the ability to create, view, edit, and delete certificates.
- **Integration with Connectors**: Provides specialized support for integration with HashiCorp Vault connectors, ensuring secure connections and streamlined operations within external systems. We plan to integrate more connector integration in future development.



## Create a certificate

You can create a certificate at the account, organization, or project scope.
To add a new certificate, do the following:

1. In Harness, go to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) at which you want to create the certificate.
2. Select **Certificates**. The Certificates management page opens, where you can view all existing certificates under the selected scope.
3. Select **New Certificate**.

4. In the **Overview** section, enter the certificate's **Name**, and optionally add **Tags** and a **Description**. 
5. Select **Continue**. The **Details** page opens.

6. Input the **TLS Certificate** in the **X.509 Format**. This section also provides the option to chain multiple certificates, offering enhanced flexibility for certificate management. Ensure that the certificate details are correctly entered and conform to the **X.509** standard.

7. Select **Save** to finalize the creation of the certificate. A confirmation notification appears, indicating **Certificate [certificateName] created successfully**. The certificate has been successfully created and is now part of your Harness environment.

   ![](./static/TLSCertFormat.png)

:::info note
If the certificate details fail validation, an error message will be displayed: `Invalid request: Certificate is not a valid X509 Certificate`.

:::

Each certificate can be edited or deleted, but those in use by active connectors cannot be deleted directly to prevent service disruptions. In the future, a forced deletion option will be introduced for comprehensive management.

## Use certificates in connectors

Integrating certificates with connectors is essential for securing communications and operations. Currently, Harness supports certificate integration exclusively with the HashiCorp Vault connector.

### Add a certificate to a connector
You can add a certificate to a HashiCorp Vault connector at the account, organization, or project scope.

To add a certificate to a HashiCorp Vault connector, do the following:
1. In Harness, go to **Account Settings**, **Organization Settings**, or **Project Settings**, depending on the [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) at which you want to add a certificate to your connector.
2. Select **Connectors**,  then select the desired HashiCorp Vault connector for certificate integration.
3. Select **Edit Details**.
4. Go to the **SSL/TLS Certificate** section.
5. In the **SSL/TLS certificate for this connector** dropdown, select the certificate you want to add to the connector.
6. Apply the selection, continue through the setup, and perform a connection test to confirm the integration's success.

   ![](./static/connectorAddCert.png)

:::important note
For configurations using a root token, you must set the **Renewal Interval** to `0`.

:::
