---
title: Allowlist Harness domains and IPs
description: Harness SaaS Delegates only need outbound access to the Harness domain name (most commonly, app.harness.io) and, optionally, to logging.googleapis.com.
sidebar_position: 1
helpdocs_topic_id: ooelo06uy5
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/references/whitelist-harness-domains-and-ips
---


Harness SaaS Delegates only need outbound access to the Harness domain name (typically **app.harness.io**) and, optionally, to **logging.googleapis.com** (used to provide logs to Harness support).

The URL `logging.googleapis.com` is used to send log files to Harness support. Use the environment variable `STACK_DRIVER_LOGGING_ENABLED` to disable this functionality.

For more information, go to [Delegate environment variables](/docs/platform/delegates/delegate-reference/delegate-environment-variables/#stack_driver_logging_enabled).

## Harness Manager

Users of the Harness Manager browser client need access to **app.harness.io** and **static.harness.io**. This is not a Harness Delegate requirement. It's simply for users to use the browser-based Harness Manager.

## Vanity URL

If you are using a Harness vanity URL, like **mycompany.harness.io**, you can allowlist it also.

## Allowlist Harness SaaS IPs

The following list is optional. You can allowlist these IPs if needed.

```
35.201.91.229
34.120.225.85
34.110.203.189
34.149.33.161
34.160.153.7
34.82.155.149
34.168.179.66
```

:::caution
Harness will not change IPs without 30 days notice to all customers. If a security emergency requires a change, all customers are notified.
:::

