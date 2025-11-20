---
title: Pod details do not show for some pods
---

## Issue
In the Spinnaker Console UI, Pod details are not showing up on the right panel for some pods.
This issue is observed indefinitely on some pods, and can be seen with other deployments on the same cluster.  The element issue can happen suddenly. Previously the pod details could be viewed for the same deployments. The UI shows the following:
 
The issue can also manifest itself in applications when attempting to list the namespace in the Kubernetes account.  The other namespaces are not seen on the Infrastructure tab.
The UI shows the following:

## Cause
 This issue is tied to reaching limits in ```tp caching```, ```performance```, or a combination of both.  It may also be tied back to changes to the permissions applied on the Kubernetes Service Account

