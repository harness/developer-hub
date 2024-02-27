---
title: Add a custom certificate to Harness Platform
description: This topic explains how to add your own signed custom certificate.
sidebar_position: 
sidebar_label: Add a custom certificate
---
:::info note
Currently, this feature is behind the feature flag `PL_CENTRAL_CERTIFICATES_MANAGEMENT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

The Custom Certificate Feature offers a robust solution for managing the lifecycle of certificates at all hierarchical levels within Harness, including accounts, organizations, and projects. This feature is designed to bolster security measures and simplify the process of digital certificate management across the Harness platform.

## Key features

- **Scope Availability**: Enables the creation and management of certificates at all hierarchical levels within Harness, including account, organization, and project scopes.
- **Lifecycle Management**: Offers comprehensive management capabilities for certificates, encompassing creation, viewing, editing, and deletion.
- **Integration with Connectors**: Provides specialized support for integration with HashiCorp Vault connectors, ensuring secure connections and streamlined operations within external systems. This will be followed up with more connectors integration.

## Add a custom certificate

To integrate a custom certificate, navigate to the **Account Settings**, **Organization Settings**, or **Project Settings** based on the desired scope for the certificate addition.

## Navigation steps

1. Within the chosen settings page, locate and select the **Certificates** option to access the certificate management page. This page displays all existing certificates under the specified scope.

2. Select **New Certificate** to initiate the creation of a new certificate.

## Create a certificate

1. **Overview Section**: Input the certificate's Name, Tags (optional), and Description (optional). Proceed by selecting **Continue**.
2. **Details Page**: Input the TLS Certificate in X.509 Format. This section also allows the chaining of multiple certificates to enhance flexibility in certificate management. Finalize by selecting **Save**.
3. **Confirmation**: Upon successful creation, a notification will appear: `Certificate [certificateName] created successfully`.

:::info note
If the certificate details fail validation, an error message will be displayed: `Invalid request: Certificate is not a valid X509 Certificate`.

:::

Editing and deletion options are available for each certificate. However, certificates currently in use by connectors cannot be directly deleted to avoid service disruptions. Future updates will introduce a forced deletion option for comprehensive management.

## Use certificates in connectors

Integrating certificates with connectors is essential for securing communications and operations. Currently, Harness supports certificate integration exclusively with the HashiCorp Vault connector.

## Add a certificate to a connector

1. Navigate to the Connectors page and select the desired connector for certificate integration. Enter the edit mode and proceed until reaching the **SSL/TLS Certificate** section.
2. In the **SSL/TLS certificate for this connector** dropdown, select the certificate you wish to associate. Apply the selection, continue through the setup, and perform a connection test to confirm the integration's success.

:::important note
 For configurations using a root token, you must set the **Renewal Interval** to `0`.
 
 :::
