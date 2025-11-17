---
title: Pods Running Jobs or Scripts Remain After Completed State
---

## Issue
Pods launched and completed for running jobs or scripts remain even after completion state.  They do not automatically clean themselves after completion

## Cause
Kubernetes doesn't have an automated way to clean up jobs without enabling a feature flag on the master (which isn't possible on *most* managed Kubernetes services).
Spinnaker project also opted to *not* clean up jobs on completion because we found that our primary users didn't have any logging infrastructure in place to view logs after the fact which means that debugging jobs would be impossible for some users.

