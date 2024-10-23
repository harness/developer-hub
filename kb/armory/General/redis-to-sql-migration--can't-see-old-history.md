---
title: Redis to SQL Migration- Can't see old history
---

## Issue
After Migration from Redis to AWS Elasticache SQ, users cannot see the old execution history.   
When going to the Spinnaker UI, the pipelines that have the old history. Get the ```pipeline ID``` by clicking on configure and copying the last part of the URL after ```/configure/```. This will be referred to as ```${PIPELINE-ID}``` in the rest of the article.
The Redis in production needs to have execution keys, and users will need this execution key to proceed.

## Cause
None

