---
title: High number of GitHub emails after every Dinghyfile update
---

## Issue
After enabling the [Dinghy GitHub notifier](https://docs.armory.io/armory-enterprise/installation/armory-operator/op-manifest-reference/armory/#dinghy-parameters), users may find that there is additional comments in a Pull Request.  This is so that Dinghy can provide more robust feedback information to the persons initiating the Pull Request to allow them to make decisions on the PR.  
A consequence is that users may experience a high number of emails generated after every update to a module that occurs.  This is because module updates may have chain reactions to the multiple Dinghyfiles that may be using them.

## Cause
After an update to a commonly used module, all of the associated pipelines are re-rendered, triggering a potentially high amount of API calls to Github.
This in turn generates a lot of emails from Github and may potentially manifest itself by triggering rate-limits.

