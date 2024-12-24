---
title: How do I allow FME to work in my environment?
sidebar_label: How do I allow FME to work in my environment?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006954331-How-do-I-allow-Split-to-work-in-my-environment </button>
</p>

## Question

What URLs or IP addresses do I need to allow in order to have my internal systems connect to Split's cloud platform?

## Answer

If you have to add the Split servers to the allow-list in your proxy server to establish the communication between your data centers and Split you will want to allow the following addresses:

* SDK: https://sdk.split.io
* These are Fastly's IP addresses. You can find them here: https://api.fastly.com/public-ip-list 
* REST API: https://api.split.io 
* Impressions/events/SDK metrics: https://events.split.io
* Websocket Streaming feature: https://auth.split.io, https://streaming.split.io
* CDN: cdn.split.io
* Telemetry: telemetry.split.io

If you have systems on-premise that need to integrate with Split, such as Webhook service, you'll likely need IP addresses for our services to connect. If you hit this URL below you can find the list of our IP addresses.

https://our-ips.split.io/

You will see something like this:

![](https://help.split.io/hc/article_attachments/26312681189005)

"Active" is our primary region and "Passive" is our secondary region,

Inbound for incoming traffic and Outbound for outgoing traffic from Split.

Please note the list above might change in case of an issue that requires failover to other servers, please subscribe to Split Status Page to get notifications on issues.

Email invites: We use a third-party Sendgrid, to send emails inviting users to join an account.  If your spam blocker doesn't accept those emails you can allow our dedicated IP address: 
* 168.245.9.60 