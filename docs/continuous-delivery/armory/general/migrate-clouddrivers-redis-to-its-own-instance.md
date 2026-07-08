---
title: Migrate Clouddriver's Redis To Its Own Instance
---


* Take a snapshot of your existing Redis cluster* Create a new cluster with the snapshot from the previous step. This will include all the keys from the previous cluster that you can clear out later.Configure Clouddriver to use the new cluster. In your ```/opt/spinnaker/config/clouddriver-local.yml``` add the following:
```
redis:
  connection: redis://${YOUR_REDIS_HOST}:6379​
```
* Redeploy your Spinnaker instance

