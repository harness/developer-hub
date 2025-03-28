---
title: Trigger pipelines on pushing new tag
description: Trigger pipelines on pushing new tag in your repository.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can set up your pipeline to automatically trigger whenever a new tag is pushed to your repository. This guide walks you through the steps to achieve this using a webhook trigger.

### Pre-Requisite

1. [Code repo connector](/docs/category/code-repo-connectors) that connects to your Git provider account. 
2. Required [Code repo connector permissions for webhook triggers](/docs/platform/triggers/triggers-reference#code-repo-connector-permissions-for-webhook-triggers).
3. Harness CI/CD Pipeline

### Steps to Trigger a Pipeline on a New Tag

1. In your Harness pipeline, create a webhook trigger and configure the [Event](/docs/platform/triggers/triggers-reference#event-and-actions) type as **Push**.

2. When you create and push a new tag (e.g., v1) in your repository, Harness identifies it as a push event and triggers the configured pipeline.

Example: You push a tag v1 to the repository, which triggers the pipeline execution.

![](./static/tag_event_execution.png)

3. Other types of pushes (e.g., commits) can also trigger push [events](/docs/platform/triggers/triggers-reference#event-and-actions). To ensure your pipeline is only triggered when a new tag is pushed, you should configure payload conditions in the webhook trigger. In these cases you will need to add payload conditions to ensure your pipeline is only triggered on a tag push. For example:

<Tabs>
<TabItem value="GitHub">

4. Add a new condition, under **Conditions** -> **Payload Conditions** for your webhook trigger. 
5. Set the payload's **Attribute** to `<+trigger.payload.ref>`.
6. Select **Starts With** as your **Operator**
7. For **Matches Value**, write `refs/tags`.

Optionally, to filter for tag creation vs deletion, add another condition that checks to see if the tag was just created. For example:

1. **Attribute**: `<+trigger.payload.created>`
2. **Operator**: `Equals`
3. **Matches Value**: `true`

</TabItem>
<TabItem value="Bitbucket">

4. Add a new condition, under **Conditions** -> **Payload Conditions** for your webhook trigger. 
5. Set the payload's **Attribute** to `<+trigger.payload.push.changes[0].new.type>`.
6. Select **Equals** as your **Operator**.
7. For **Matches Value**, write `tag`.

</TabItem>
</Tabs>
---

You can verify the payload received by the trigger in the Activity History section of the trigger. An example payload is shown below:

```json
{
  "ref": "refs/tags/v1",
  "before": "0000000000000000000000000000000000000000",
  "after": "0b958e797de7e9c55a4c8875b3d3a86c823cfd4b",
  "repository": {
    "id": 897881853,
    "node_id": "R_kgDONYSW_Q",
    "name": "azure-function-python",
    "full_name": "krishi0408/azure-function-python",
    "private": false,
    "owner": {
      "name": "krishi0408",
      "email": "user@harness.io",
      "login": "krishi0408",
      "id": 109092049,
      "node_id": "U_kgDOBoCc0Q",
      "avatar_url": "https://avatars.githubusercontent.com/u/109092049?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/krishi0408",
      "html_url": "https://github.com/krishi0408",
      "followers_url": "https://api.github.com/users/krishi0408/followers",
      "following_url": "https://api.github.com/users/krishi0408/following{/other_user}",
      "gists_url": "https://api.github.com/users/krishi0408/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/krishi0408/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/krishi0408/subscriptions",
      "organizations_url": "https://api.github.com/users/krishi0408/orgs",
      "repos_url": "https://api.github.com/users/krishi0408/repos",
      "events_url": "https://api.github.com/users/krishi0408/events{/privacy}",
      "received_events_url": "https://api.github.com/users/krishi0408/received_events",
      "type": "User",
      "user_view_type": "public",
      "site_admin": false
    }
  }
}
```
The `ref` field indicates the new tag, in this case, refs/tags/v1.







