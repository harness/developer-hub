---
title: Resources are duplicated in the UI when Migrating to Armory Agent
---

## Issue
Admins and users may notice that after deploying Armory Agent, as a part of the process, customers will need to then remove the previous accounts set up in Clouddriver.  After removing the accounts from Clouddriver, resources appear duplicated on Deck. The UI would show something similar to the following example:

In this case, nothing was changed on the Kubernetes clusters, and the resources present are the same.
 

## Cause
Spinnaker would normally clean up any caching issues of unknown objects periodically as noted on these [OSS docs](https://spinnaker.io/docs/setup/productionize/persistence/clouddriver-sql/#configure-clouddriver-to-use-mysql)However, this issue is a known symptom where Spinnaker not performing a refresh of its cache.  As a result, the previous settings that were in Clouddriver and the cached values will remain even after migrating the Kubernetes accounts from Clouddriver to Agent.  The objects are persisted in the both old and the new cache of Clouddriver. 

