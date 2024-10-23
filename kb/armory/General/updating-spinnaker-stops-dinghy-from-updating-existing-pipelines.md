---
title: Updating Spinnaker Stops Dinghy From Updating Existing Pipelines
---

## Issue
After updating Dinghy to 2.18.x (from 2.17.x), pre-existing pipelines cease to function. Note: New pipelines are unaffected and will function as usual.  

## Cause
The following change was implemented in 2.18.1 to Dinghy:[https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-18-1/#dinghy-open-core---60cb2f53b0247e](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-18-1/#dinghy-open-core---60cb2f53b0247e)Code Change:[https://github.com/armory/dinghy/commit/1de073e38fbd4de5f1b27216981dc69a19dbece8](https://github.com/armory/dinghy/commit/1de073e38fbd4de5f1b27216981dc69a19dbece8)
As advised in the update, there is a change in how the master branch is referenced and stored as a key in REDIS.  Previously, the ```refs/heads/``` path, was added to the key stored in REDIS, and this was since removed from the keys for cleaner operation.

