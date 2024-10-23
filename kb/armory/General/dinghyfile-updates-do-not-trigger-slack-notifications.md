---
title: Dinghyfile updates do not trigger Slack notifications
---

## Issue
Dinghy has been configured to send pipeline update results to a Slack channel, but while updating the ```dinghyfile``` successfully creates pipeline changes - no notifications are being sent to the Slack channel.

## Cause
Dinghy's Slack notifications do not send if Dinghy's notifications are not explicitly enabled.  This was a result of some changes made to code once Github Notifications became an option for Dinghy. 
As a result, customers will need to ensure that Dinghy notifications are enabled before setting Slack notifications. Once enabled, customers will want to also consider if they want to explicitly turn off GitHub Notifications as by default, they will be enabled.  For some customers, depending on the size of Dinghy's repository, it may be desirable to keep Github notifications turned off, as per [the possible High number of GitHub emails generated after every Dinghyfile update](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010558).

