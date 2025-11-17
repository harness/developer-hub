---
title: Dinghy Slack Notifications not working - java.lang.NoSuchMethodError- void org.jsoup
---

## Issue
Customers may find that after upgrading to 2.27.x cannot get Slack Notifications even though it was working previously.  This can occur, for example, after setting up [Slack notifications in Dinghy](https://docs.armory.io/armory-enterprise/armory-admin/dinghy-enable/#slack-notifications)
Upon investigating Echo logs, customers may see the following error in Echo:
``````org.springframework.web.util.NestedServletException: Handler dispatch failed; nested exception is java.lang.NoSuchMethodError: 'void org.jsoup.select.NodeTraversor.(org.jsoup.select.NodeVisitor)'``````
with a further reference to:
``````Caused by: java.lang.NoSuchMethodError: 'void org.jsoup.select.NodeTraversor.(org.jsoup.select.NodeVisitor)'``````

## Cause
The issue was caused by recent upgrades to the ```jinjava``` package in Spinnaker, which caused an issue with a dependency in jsoup.  

