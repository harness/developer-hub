---
title: Add a custom certificate to Harness Platform
description: This topic explains how to add your own signed custom certificate.
sidebar_position: 1
sidebar_label: Add a custom certificate
---
:::info note
Currently, this feature is behind the feature flag `PL_CENTRAL_CERTIFICATES_MANAGEMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

The Custom Certificate feature offers a robust solution for managing the lifecycle of certificates at all hierarchical levels within Harness, including accounts, organizations, and projects. This feature is designed to bolster security measures and simplify the process of digital certificate management across the Harness platform.

## Key features

- **Scope Availability**: Enables the creation and management of certificates at all hierarchical levels within Harness, including account, organization, and project scopes.
- **Lifecycle Management**: Offers comprehensive certificate management capabilities, encompassing creation, viewing, editing, and deletion.
- **Integration with Connectors**: Provides specialized support for integration with HashiCorp Vault connectors, ensuring secure connections and streamlined operations within external systems. This will be followed up with more connectors integration.



## Create a certificate

You can create a certificate at the account, organization, or project scope. In this example, we'll create a certificate at the account scope.
To add a new certificate, do the following:

1. Sign in to Harness.
2. Select **Account Settings**.
3. Under **Account-level resources**. The Account Settings page opens.
4. Select **Certificates**. The action Certificate Management page opens, where you can view all existing certificates under the selected scope.

5. Select **New Certificate**.

6. In the **Overview** section, enter the certificate's **Name**, and optionally add **Tags** and a **Description**. 
7. Select **Continue**. The **Details** page opens.

8. Input the **TLS Certificate** in the **X.509 Format**. This section also provides the option to chain multiple certificates, offering enhanced flexibility for certificate management. Ensure that the certificate details are correctly entered and conform to the **X.509** standard.

9. Select **Save** to finalize the creation of the certificate. A confirmation notification appears, indicating **Certificate [certificateName] created successfully**. The certificate has been successfully created and is now part of your Harness environment.

   ![](./static/TLSCertFormat.png)

:::info note
If the certificate details fail validation, an error message will be displayed: `Invalid request: Certificate is not a valid X509 Certificate`.

:::

Editing and deletion options are available for each certificate. However, certificates currently in use by connectors cannot be directly deleted to avoid service disruptions. Future updates will introduce a forced deletion option for comprehensive management.

## Use certificates in connectors

Integrating certificates with connectors is essential for securing communications and operations. Currently, Harness supports certificate integration exclusively with the HashiCorp Vault connector.

### Add a certificate to a connector
You can add a certificate to a HashiCorp Vault connector at the account, organization, or project scope. In this example, we'll add a certificate to a HashiCorp Vault connector at the account scope.

To add a certificate to a HashiCorp Vault connector, do the following:
1. Sign in to Harness.
2. Select **Account Settings**. The Account Settings page opens.
3. Under **Account-level resources**, select **Connectors**. The Account Resources: Connectors page opens.
4. Select the desired HashiCorp Vault connector for certificate integration.
5. Select **Edit Details**.
6. Go to the **SSL/TLS Certificate** section.
7. In the **SSL/TLS certificate for this connector** dropdown, select the certificate you want to add to the connector.
8. Apply the selection, continue through the setup, and perform a connection test to confirm the integration's success.

   ![](./static/connectorAddCert.png)

:::important note
For configurations using a root token, you must set the **Renewal Interval** to `0`.

:::
