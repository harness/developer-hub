---
title: terraformer Version doesn't render in pipeline JSON by default
redirect_from:
  - /docs/continuous-delivery/armory/general/terraformerversion-doesn't-render-in-pipeline-json-by-default
---

## Issue
When creating a terraform pipeline, the 'terraformerVersion' doesn't render in pipeline JSON by default. Users have to manually select the dropdown and choose the version even though the default is picked.


## Cause
A bug in Deck causes this issue, and has since been resolved.

