---
title: Webhook - Admin audit log
sidebar_label: Webhook - Admin audit log
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360051384832-Webhook-admin-audit-logs </button>
</p>

Use this outgoing webhook to integrate admin changes into the tools that your team already uses. You can use admin webhooks to make sure you have all the changes that have been made to your team's base config logged within your systems for audit purposes.

Anytime a Split project, environment, API key, traffic type, user, group, security setting, general setting, experiment setting, or integration is modified, we send an HTTP POST payload to the webhook's configured URL. The data sent has the following schema. Any response code other than 200 is marked as failure.

**Note:** In the following JSON example, `any` indicates that a value could be a string, boolean, number, object, array, or null.

```json
{
  "id": string,              // The ID of the change
  "type": "audit_log",       // The type of this object (always the same)
  "auditLogType": string,    // The object type, '.', change type (e.g. "security_settings.updated")
  "editor": {                // The entity that made the change
    "id": string             //   ID of the entity
    "name": string           //   The name of the entity
    "type": string           //   The type of the entity (e.g. "user")
  },
  "createdAt": int64,        // The millisecond that the change was recorded
  "currentObject": null | {  // The current form of the object that changed or null if deleted
    [propName: string]: any  //   Properties of the object
  },
  "changes": {               // The properties of the object that changed
    [propName: string]: {    //   A property of the object that changed (only top level props)
      "from": any,           //   The "before" value, or null if this was a "created" change
      "to": any              //   The "after" value, of null if this was a "deleted" change
    }
  }
}
```

# Retry
 
If Split receives a non-200 response to a webhook POST, Split waits 300 milliseconds and attempts to retry the delivery once. 

# Configuring the webhook

To configure this webhook, do the following: 

1. Click the **user's initials** at the bottom of the left navigation pane and click **Admin settings**.
2. Click **Integrations** and navigate to the Marketplace tab.
3. Find Outgoing webhook (Admin audit logs), click **Add** and select the Split project for which you would like to configure the integration.
4. Enter the URL where the POST should be sent.
5. Click **Save**.

Contact [support@split.io](mailto:support@split.io) if you have any issues with this webhook.
