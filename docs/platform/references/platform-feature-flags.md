---
title: Platform feature flags reference
description: Reference of commonly-requested platform feature flags for beta and advanced features.
sidebar_position: 99
sidebar_label: Feature Flags Reference
tags: [feature-flags, beta, platform]
---

Some Harness features are gated behind feature flags during beta or early access periods. These flags are not self-serve; you need to contact Harness Support to enable them on your account.

This page lists commonly requested feature flags across modules. It is not an exhaustive list. If you need a flag that is not listed here, contact [Harness Support](mailto:support@harness.io) with your account ID and the flag name.

## Feature flags by module

| Flag | Module | Description | Prerequisites |
|------|--------|-------------|---------------|
| `CI_ENABLE_OUTPUT_SECRETS` | CI | Enables output secret support for plugin steps, required for OIDC plugin credential passthrough. | `CI_SKIP_NON_EXPRESSION_EVALUATION`, `CI_ENABLE_PLUGIN_OUTPUT_SECRETS` |
| `PL_ENABLE_MULTIPLE_IDP_SUPPORT` | Platform | Enables multiple SAML identity provider support for SSO configurations. | None |
| `PL_PROJECT_MOVEMENT_ENABLED` | Platform | Enables moving projects between organizations within an account. | None |
| `OPA_IMPORT_FROM_GIT` | Platform | Enables importing OPA policies from Git repositories instead of inline-only definitions. | None |
| `CDS_AZURE_OIDC_AUTHENTICATION` | CD | Enables Azure OIDC authentication for CD connectors, allowing passwordless auth with Azure services. | None |
| `PL_ENABLE_USER_IMPERSONATION` | Platform | Enables user impersonation for troubleshooting access issues (Beta). | None |

## How to request feature flag enablement

To enable a feature flag on your account:

1. Open a ticket with [Harness Support](mailto:support@harness.io).
2. Include your **Harness Account ID** (found in **Account Settings > Overview**).
3. Specify the **exact flag name** you want enabled.
4. If the flag has prerequisites (see the table above), request all prerequisite flags at the same time.

Harness Support typically enables feature flags within one business day. Some flags may require additional review or approval.

:::info
This reference covers commonly requested flags based on support interactions. It is not a complete list of all feature flags in the platform. If you are looking for a specific feature that you believe is behind a flag, contact [Harness Support](mailto:support@harness.io) to confirm availability and request enablement.
:::
