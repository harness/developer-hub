---
title: Docker binding to matching repositories breaking pipelines
---

## Issue
A pipeline may break due to Spinnaker ignoring any matching image artifacts available in the pipeline.  Spinnaker instead uses the tag specified in the manifest image.

## Cause
Since the merge of [PR #4874](https://github.com/spinnaker/clouddriver/pull/4874), Clouddriver will now bind all Docker artifacts based on ***repo name***, not ***repo+image***.
This may break any non-trivial Kubernetes pipelines, especially anything with a Canary deployment. The current behavior is that Spinnaker will end up binding a random assortment of Docker images, depending on an unknown precedence order.

