---
title: Delete a workspace
description: Learn how to delete a workspace.
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In cases where your workspace has become redundant and you no longer need it, you can delete it from your Harness account. As a safeguard, Harness have several confirmation steps to ensure that workspaces aren't mistakenly deleted.

:::warning
Deleting a workspace will remove it from Harness along with all associated resources.
:::

### Prerequisites
- Ensure that the resources associated with your workspace are no longer needed.
- Your workspace must be in an `inactive` status

<Tabs>
    <TabItem value="Interactive guide">
    <iframe 
        src="https://app.tango.us/app/embed/70b44fb7-9de7-44ec-a033-e2cc3296e325" 
        title="Deleting a Workspace in Harness" 
        style={{minHeight:'640px'}}
        width="100%" 
        height="100%" 
        referrerpolicy="strict-origin-when-cross-origin" 
        frameborder="0" 
        webkitallowfullscreen="webkitallowfullscreen" 
        mozallowfullscreen="mozallowfullscreen" 
        allowfullscreen="allowfullscreen"></iframe>
    </TabItem>
    <TabItem value="API">
        If your workspace already has an `inactive` status, you can delete a workspace via the [Harness API destroy-workspace endpoint](https://apidocs.harness.io/tag/workspaces#operation/workspaces_destroy-workspace).

        ```bash
            curl -i -X DELETE \
            'https://app.harness.io/iacm/api/orgs/{org}/projects/{project}/workspaces/{identifier}' \
            -H 'Harness-Account: <YOUR_HARNESS_ACCOUNT_ID>' \
            -H 'x-api-key: <YOUR_API_KEY_HERE>'
        ```
        ---
        :::info deactivate workspace
        If your workspace is still active, deactivate it before calling the above endpoint with a [destroy-workspace pipeline](https://developer.harness.io/docs/infra-as-code-management/use-iacm/provision-workspace#destroy-a-workspace)
        :::
    </TabItem>
</Tabs>