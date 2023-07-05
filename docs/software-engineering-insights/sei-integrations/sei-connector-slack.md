---
title: SEI Slack connector
description: Integrate SEI with Slack.
sidebar_position: 160
sidebar_label: Slack
---

Slack offers many IRC-style features, including persistent chat rooms organized by topic, private groups, and direct messaging.

Use the SEI Slack connector to integrate SEI with Slack.

SEI uses OAuth to connect to Slack.

You can either use the built-in Slack connector, or create your own Slack app.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="connector" label="Slack connector" default>
```

1. In your Harness project, go to the SEI module, and select **Account**.
2. Select **SEI Connectors** under **Data Settings**.
3. Select **Available Connectors**, locate the **Slack** connector, and select **Install**.
4. Configure the connector. You must use OAuth authentication.

```mdx-code-block
  </TabItem>
  <TabItem value="app" label="Slack app">
```

1. Create a [Slack app](https://api.slack.com/start/overview).
2. Under **Interactivity & Shortcuts**:

   * **Interactivity:** Enabled
   * **Request URL:** `https://api.levelops.io/webhooks/slack/interactivity`

3. Under **Event Subscriptions**:

   * **Enable Events:** Enabled
   * **Request URL:** `https://api.levelops.io/webhooks/slack/action-endpoint`

4. Under **Subscribe to bot events**, add the following:

   * `app_mention`: `app_mentions:read`
   * `message.channels`: `channels:history`
   * `message.groups`: `groups:history`
   * `message.im`: `im:history`
   * `message.mpim`: `mpim:history`

5. Under **OAuth Permissions**, configure the following:

   * `app_mentions:read`: View messages that directly mention app in conversations that the app is in.
   * `channels:history`: View messages and other content in public channels that app has been added to.
   * `groups:history`: View messages and other content in private channels that app has been added to.
   * `im:history`: View messages and other content in direct messages that app has been added to.
   * `mpim:history`: View messages and other content in group direct messages that app has been added to.
   * `channels:join`: Join public channels in a workspace.
   * `chat:write`: Send messages as app.
   * `chat:write.customize`: Customize bot name when sending message.
   * `commands`: Add shortcuts and/or slash commands that people can use.
   * `files:write`: Upload, edit, and delete files as app.
   * `im:write`: Start direct messages with people.
   * `users:read`: View people in a workspace.
   * `users:read.email`: View email addresses of people in a workspace.

```mdx-code-block
  </TabItem>
</Tabs>
```
