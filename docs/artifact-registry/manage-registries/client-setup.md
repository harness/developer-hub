---
title: Client Setup
description: Configure your client to pull and push artifact registries
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { FAQ, Troubleshoot } from '@site/src/components/AdaptiveAIContent';


:::tip create a registry
If you haven’t created a registry yet, see [create a registry](/docs/artifact-registry/manage-registries/create-registry).
:::

Client Setup simplifies authentication and ensures proper configuration for different artifact types (e.g., container images, Helm charts). It also helps prevent common misconfigurations when pulling or pushing artifacts.

## Client setup
1. Select **Registries**, then select a container register of type `ARTIFACT REGISTRY`, e.g. Docker or Maven.
2. Select **Set up client**.
3. Follow the on-screen instructions.

### Configuration steps
The Client Setup process provides step-by-step guidance, including:
- Logging in to the registry.
- Generating a password token.
- Pulling an image or package.
- Pushing an image or package.

Now, you should see the artifact appear in your docker registry as well as the **Artifacts** tab in the left navigation panel.

---

## Authentication model

Harness Artifact Registry uses token-based authentication (PAT or service account tokens). The pipeline identity model determines which permissions apply:

- **Manual triggers:** The pipeline uses the triggering user's RBAC permissions.
- **Webhook, IDP (Internal Developer Portal), or schedule triggers:** The pipeline runs as a service/bot principal and uses that bot's RBAC permissions.

This applies to both image pulls (requires read access) and the **Upload Artifacts to HAR** CI step (requires write access). If the triggering principal lacks the appropriate permission, the operation returns a 403 error.

:::note Supported authentication methods

Harness Artifact Registry supports PAT (Personal Access Token) and service account tokens for authentication. These work across all deployment environments including EKS, GKE, and AKS.

:::

---

## Token expiry and management

Tokens generated from the **Setup Client** page are scoped tokens with a **30-day expiry**. For longer-lived tokens, generate them at the project or account level from your account settings.

- **Independent expiry:** Each token expires based on its own creation time. Generating a new token has no effect on existing tokens.
- **Secure by design:** The token value is shown only once at creation time. Copy and store it securely before closing the dialog.
- **Manage tokens:** Go to [Add and manage API keys](/docs/platform/automation/api/add-and-manage-api-keys) to view token names, check expiration dates, or delete tokens. You can also access this from **Profile Overview** (bottom-left icon in the Harness UI).

---

## Troubleshooting

<Troubleshoot
  issue="401 Unauthorized error when pulling images from Harness Artifact Registry"
  mode="docs"
  fallback="The most common cause is an expired token. Tokens generated from the Setup Client page expire after 30 days. Regenerate your token from Setup Client or your account settings, then update your client configuration (Docker config, .npmrc, pip.conf, or settings.xml) with the new token. If using Kubernetes imagePullSecret, update the secret with the new credentials."
/>

<Troubleshoot
  issue="Token regeneration does not revoke existing team member tokens"
  mode="fallback-only"
  fallback="This is expected behavior. Each token has an independent expiry. Generating a new token does not revoke or expire previously generated tokens. To revoke a specific token, go to Profile Overview and delete it manually."
/>
