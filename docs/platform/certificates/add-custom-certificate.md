---
title: Adding a custom certificate
description: Doc explaining steps to add your own signed custom certificate.
sidebar_position: 
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: true
helpdocs_is_published: false
---

## Custom Certificate Feature Overview

The Custom Certificate Feature within Harness offers a robust solution for managing the lifecycle of certificates across various organizational scopes, including accounts, organizations, and projects. This feature is designed to bolster security measures and simplify the process of digital certificate management across the Harness platform.

### Key Features

- **Scope Availability**: Enables the creation and management of certificates at all hierarchical levels within Harness, including account, organization, and project scopes.
- **Lifecycle Management**: Offers comprehensive management capabilities for certificates, encompassing creation, viewing, editing, and deletion.
- **Integration with Connectors**: Provides specialized support for integration with HashiCorp Vault connectors, ensuring secure connections and streamlined operations within external systems.

### Adding a Custom Certificate

To integrate a custom certificate, navigate to the `Account Settings`, `Organization Settings`, or `Project Settings` based on the desired scope for the certificate addition.

#### Navigation Steps:

1. Within the chosen settings page, locate and select the `Certificates` option to access the certificate management page. This page displays all existing certificates under the specified scope.

2. Click on the `New Certificate` button to initiate the creation of a new certificate.

#### Certificate Creation Process:

1. **Overview Section**: Input the certificate's Name, Tags (optional), and Description (optional). Proceed by clicking on `Continue`.
2. **Details Page**: Input the TLS Certificate in X.509 Format. This section also allows the chaining of multiple certificates to enhance flexibility in certificate management. Finalize by clicking on `Save`.
3. **Confirmation**: Upon successful creation, a notification will appear: `Certificate [certificateName] created successfully`.

**Note**: Should the certificate details fail validation, an error message will be displayed: `Invalid request: Certificate is not a valid X509 Certificate`.

Editing and deletion options are available for each certificate. However, certificates currently in use by connectors cannot be directly deleted to avoid service disruptions. Future updates will introduce a forced deletion option for comprehensive management.

### Utilizing Certificates in Connectors

Integrating certificates with connectors is essential for securing communications and operations. Currently, Harness supports certificate integration exclusively with the HashiCorp Vault connector.

#### Steps to Add a Certificate to a Connector:

1. Navigate to the `Connectors` page and select the desired connector for certificate integration. Enter the edit mode and proceed until reaching the `SSL/TLS Certificate` section.
2. In the `SSL/TLS certificate for this connector` dropdown, select the certificate you wish to associate. Apply the selection, continue through the setup, and perform a connection test to confirm the integration's success.

**Important Note**: For configurations using a root token, it is mandatory to set the `Renewal Interval` to `0`.
