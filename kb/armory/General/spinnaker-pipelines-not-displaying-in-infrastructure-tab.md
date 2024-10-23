---
title: Spinnaker pipelines not displaying in Infrastructure tab
---

## Issue
An organization may notice a behavior where spinnaker pipelines created under common application names do not display in the Infrastructure tab, despite the pipeline deploying correctly.

## Cause
Resources in Spinnaker applications are grouped based on the ```managedBy``` and ```app``` annotations in the ***deployment manifest***. Resources may not be categorized correctly in Spinnaker if they are not correctly annotated in their deployment manifest.

