---
title: Find AMI stage finding images in unrelated account
---

## Issue
When using the Find AMI by Tag stage in Spinnaker, an organization may find that it pulls AMIs from unrelated accounts from the same organization. 
Example, an organizations Production Server can see the AMIs for a Staging or a Test Server. This can cause problems with pipelines as the wrong AMI might be used causing delays and failure to deploys.

## Cause
There have been various causes for this, as it has been an issue for some time with various fixes being implemented.
[https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-23-3/#aws-image-caching](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-23-3/#aws-image-caching)
The current iteration of this issue appears to be related to how Orca, Clouddriver and AWS communicate.
When Orca makes the call to Clouddriver to get the images it doesn’t pass the account, only the tags so it finds first the image available with the requested tags. As organizations can reuse tags on different accounts, this can cause confusion when the Find AMI by Tag stage brings back an AMI from a different account.

