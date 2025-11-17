---
title: Errors in deploying Dinghy while using AWS elastic cache with encryption in transit
---

## Issue
When attempting to deploy Dinghy while using AWS elastic cache with ***encryption in transit***, the following error is seen
```level=fatal msg="Redis Server at rediss:// could not be contacted: dial tcp: address rediss://: too many colons in address```

## Cause
Currently, encryption over transit is not supported.  Specifically, SSL secure connection (rediss://) is not supported, and as such the redis:// connection may be utilized.

