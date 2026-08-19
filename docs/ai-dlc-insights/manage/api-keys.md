---
title: Harness AIDI API Keys
description: Learn how to create and manage Harness AIDI API keys for integrations and data ingestion at the project level.
sidebar_label: API Keys
sidebar_position: 3
---

API Keys in AI DLC Insights enable programmatic access to SEI resources. You can create these keys to automate developer identity management, integrate external systems, and ingest engineering data into AI DLC Insights.

## API key roles

API keys are created and managed at the **project level** within your Harness account. Each key can be assigned an AIDI role to control its access scope and capabilities.

| Role | Description | Recommended Use |
|---|---|---|
| **AIDI Admin** | Grants full control over AIDI configurations and data at both the account and project levels. Includes permissions to manage data settings, teams, profiles, and KPIs. | Use for administrative automation or integrations that configure Harness AIDI or sync metadata. |
| **AIDI Ingestion** | Grants limited access to submit or update engineering data (such as developer identities or metric events) without allowing configuration changes. | Use for continuous data ingestion or integration pipelines. |

Each AIDI API key is scoped to a specific project and inherits the permissions of its assigned role. For more information, see [Harness RBAC in AI DLC Insights](/docs/ai-dlc-insights/get-started/rbac).

## Create an AIDI API key

To create an API key in AI DLC Insights:

1. From the Harness AIDI navigation menu, click **Account Management** > **API Keys**.
1. Click **Create API Key**.
1. Enter a name and description for the API key.
1. Select a role to assign to the API key (`Admin` or `Ingestion`). 
1. Click **Create**.
1. Copy the generated key. Store this securely; it won't appear again.

You can use this key to authenticate API requests by including it in the `Authorization` header. 

For example:

```bash
curl -X GET \
  # Replace BASE_URL with your Harness cluster URL (e.g. https://app.harness.io)
  "${BASE_URL}/gateway/sei/api/v2/developers/schema" \ 
  -H "authorization: ApiKey <YOUR_API_KEY>" 
```

## Manage AIDI API keys

Manage your API keys to ensure your AIDI integrations remain secure and maintain least-privilege access. 

Follow these best practices when managing your AIDI API keys:

- Use least privilege: Assign the **Ingestion** role for data ingestion use cases whenever possible.
- Rotate regularly: Recreate keys periodically or when a team member leaves.
- Avoid sharing keys: Each integration or automation should use its own dedicated key.
- Revoke unused keys: Delete keys that are no longer needed to reduce exposure risk.

You can view and delete keys from the **API Keys** page when they are no longer needed or have been compromised. 

![](../static/delete-keys.png)

Click the **Delete** icon next to the key you want to remove. Once deleted, the key is invalidated and cannot be recovered.