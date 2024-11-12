---
title: Dinghy webhook shows an HTML response, rather than a JSON response
---

## Issue
A webhook set up in an organization to push events. A completion on a pull request for Github does not result in a Dinghy Event in the Armory Spinnaker UI as seen below:

It is expected that a JSON response would be provided, but instead, an HTML response is provided, like the example below:

## Cause
This can be due to ```webhook-auth``` being active.
Further information on utilizing Webhooks in Spinnaker Pipelines is available at: [https://docs.armory.io/docs/spinnaker-user-guides/webhooks/](https://docs.armory.io/docs/spinnaker-user-guides/webhooks/)

